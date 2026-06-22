import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

from airline.agents import triage_agent
from airline.context import AirlineAgentChatContext, create_initial_context
from agents import Runner

class MockContext:
    def __init__(self):
        self.state = create_initial_context()

async def test_streamed():
    print("Testing streamed Runner with Minimax...")
    mock_ctx = MockContext()
    
    try:
        result = Runner.run_streamed(
            triage_agent,
            "I want to change my seat on flight FLT-123",
            context=mock_ctx
        )
        async for chunk in result.stream_events():
            print("CHUNK:", chunk.type, getattr(chunk, "data", chunk))
        print("Stream completed successfully!")
    except Exception as e:
        print("Stream Error:", type(e), e)

if __name__ == "__main__":
    asyncio.run(test_streamed())
