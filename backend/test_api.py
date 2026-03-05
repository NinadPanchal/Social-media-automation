import httpx
import asyncio

BASE_URL = "http://127.0.0.1:8001"

async def test_api():
    print("Starting API tests...")
    async with httpx.AsyncClient() as client:
        # 1. Health check
        res = await client.get(f"{BASE_URL}/health")
        print(f"Health check: {res.status_code} - {res.json()}")
        
        # 2. Register
        user_data = {"email": "test@example.com", "password": "password123"}
        res = await client.post(f"{BASE_URL}/api/auth/register", json=user_data)
        print(f"Register: {res.status_code}")
        
        # 3. Login
        login_data = {"username": "test@example.com", "password": "password123"}
        res = await client.post(f"{BASE_URL}/api/auth/login", data=login_data)
        print(f"Login: {res.status_code}")
        
        token = res.json().get("access_token")
        headers = {"Authorization": f"Bearer {token}"}
        
        # 4. Get Current User
        res = await client.get(f"{BASE_URL}/api/auth/me", headers=headers)
        print(f"Get User: {res.status_code} - {res.json()}")

        # 5. Generate Content (Fallback/Gemini)
        print("Generating content...")
        prompt_data = {"prompt": "Promote my new app called AutoSocial"}
        res = await client.post(f"{BASE_URL}/api/generate-post", json=prompt_data, headers=headers, timeout=30.0)
        print(f"Generate Content: {res.status_code}")
        if res.status_code == 200:
            print("Successfully received generated content!")

if __name__ == "__main__":
    asyncio.run(test_api())
