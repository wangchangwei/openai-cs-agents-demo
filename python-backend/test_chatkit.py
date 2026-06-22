import httpx
import asyncio
import json

async def test_chatkit():
    payload = {
        "type": "threads.add_user_message",
        "thread_id": "thr_test_123",
        "params": {
            "input": {
                "content": [{"type": "text", "text": "I want to cancel my flight"}],
                "role": "user"
            },
            "thread_id": "thr_test_123"
        }
    }
    async with httpx.AsyncClient() as client:
        async with client.stream("POST", "http://localhost:8000/chatkit", json=payload) as response:
            async for chunk in response.aiter_text():
                print(chunk, end="")

if __name__ == "__main__":
    asyncio.run(test_chatkit())
