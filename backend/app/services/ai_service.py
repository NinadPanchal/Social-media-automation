import os
import uuid
import httpx
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend root (two levels up from this file)
_env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(_env_path)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
HF_TOKEN = os.getenv("HF_TOKEN")

# Directory for generated images
IMAGES_DIR = Path(__file__).parent.parent.parent / "generated_images"
IMAGES_DIR.mkdir(exist_ok=True)

async def generate_social_content(prompt: str) -> list[dict]:
    """
    Generate platform-optimized content for Instagram, Twitter, and LinkedIn, plus hashtags.
    """
    system_prompt = f"""
    You are an expert social media manager. Based on the user's prompt, generate content for 4 platforms.
    Format your response EXACTLY like this with no markdown code blocks, just the text:

    [INSTAGRAM]
    (write the instagram caption here with emojis)
    
    [TWITTER]
    (write the short punchy tweet here)
    
    [LINKEDIN]
    (write the professional linkedin post here)
    
    [HASHTAGS]
    (write 5-8 relevant hashtags here)

    User prompt: {prompt}
    """

    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not configured.")

    content = ""
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    
    try:
        async with httpx.AsyncClient() as client:
            payload = {
                "contents": [{"parts": [{"text": system_prompt}]}]
            }
            response = await client.post(api_url, json=payload, timeout=30.0)
            
            if response.status_code != 200:
                print(f"Gemini API Error: {response.text}")
                raise RuntimeError(f"Gemini API returned status {response.status_code}")
                
            data = response.json()
            try:
                content = data["candidates"][0]["content"]["parts"][0]["text"]
            except (KeyError, IndexError) as parse_err:
                print(f"Gemini response parsing failed. Raw data: {data}")
                raise RuntimeError("Failed to extract text from Gemini response") from parse_err
                
    except Exception as e:
        print(f"Gemini generation failed: {e}")
        raise RuntimeError("Gemini API generation failed.") from e

    return _parse_content(content)


async def generate_image_prompt(user_prompt: str) -> str:
    """Use Gemini to create an optimized image generation prompt from the user's social media topic."""
    if not GEMINI_API_KEY:
        return user_prompt  # Fallback to raw prompt
    
    system_prompt = f"""You are an expert at writing prompts for AI image generators.
    The user wants to create a social media post about the following topic:
    "{user_prompt}"
    
    Write a single, concise, highly descriptive prompt for an AI image generator (like FLUX/Stable Diffusion) 
    that would create a stunning, professional, eye-catching image suitable for social media marketing.
    
    Rules:
    - Output ONLY the image prompt, nothing else
    - Make it vivid and specific (colors, lighting, composition, style)
    - Keep it under 80 words
    - Use a professional, commercial photography or modern graphic design style
    - Do NOT include any text or words in the image description (AI image generators are bad at text)
    """
    
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    
    try:
        async with httpx.AsyncClient() as client:
            payload = {"contents": [{"parts": [{"text": system_prompt}]}]}
            response = await client.post(api_url, json=payload, timeout=15.0)
            if response.status_code == 200:
                data = response.json()
                return data["candidates"][0]["content"]["parts"][0]["text"].strip()
    except Exception as e:
        print(f"Image prompt generation failed, using raw prompt: {e}")
    
    return user_prompt


async def generate_image(prompt: str) -> str:
    """
    Generate an image using HuggingFace FLUX.1-dev via fal-ai provider.
    Returns the filename of the saved image.
    """
    if not HF_TOKEN:
        raise ValueError("HF_TOKEN is not configured. Add your HuggingFace token to backend/.env")
    
    # First, create an optimized image prompt
    image_prompt = await generate_image_prompt(prompt)
    print(f"Image prompt: {image_prompt}")
    
    try:
        from huggingface_hub import InferenceClient
        
        client = InferenceClient(
            provider="nscale",
            api_key=HF_TOKEN,
        )
        
        # Generate the image (returns a PIL.Image object)
        image = client.text_to_image(
            image_prompt,
            model="stabilityai/stable-diffusion-xl-base-1.0",
        )
        
        # Save the image
        filename = f"{uuid.uuid4().hex}.png"
        filepath = IMAGES_DIR / filename
        image.save(str(filepath))
        
        print(f"Image saved: {filepath}")
        return filename
        
    except Exception as e:
        print(f"Image generation failed: {e}")
        raise RuntimeError(f"Image generation failed: {str(e)}") from e


def _parse_content(text: str) -> list[dict]:
    """Parse the specific formatted text into a structured list"""
    platforms = {
        "Instagram Caption": ("[INSTAGRAM]", "[TWITTER]", "#E4405F"),
        "Tweet": ("[TWITTER]", "[LINKEDIN]", "#1DA1F2"),
        "LinkedIn Post": ("[LINKEDIN]", "[HASHTAGS]", "#0A66C2"),
        "Hashtags": ("[HASHTAGS]", None, "var(--color-accent)")
    }
    
    results = []
    
    for platform, (start_marker, end_marker, color) in platforms.items():
        try:
            if start_marker in text:
                start_idx = text.find(start_marker) + len(start_marker)
                end_idx = text.find(end_marker) if end_marker else len(text)
                
                # If end_marker wasn't found, just grab to the end
                if end_idx == -1:
                    end_idx = len(text)
                    
                content = text[start_idx:end_idx].strip()
                
                # Clean up empty generations
                if not content:
                    content = f"Draft {platform.lower()} here..."
                    
                results.append({
                    "platform": platform,
                    "content": content,
                    "color": color
                })
        except Exception as e:
            print(f"Error parsing {platform}: {e}")
            
    # If parsing failed completely, return mock data
    if len(results) == 0:
        return [
            {"platform": "Error", "content": "Failed to parse AI response. Please try again.", "color": "#ff4444"}
        ]
        
    return results

