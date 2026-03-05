import os
import httpx
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

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
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    
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
