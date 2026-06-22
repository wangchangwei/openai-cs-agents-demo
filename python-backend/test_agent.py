import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

from airline.agents import triage_agent
from agents import Runner
from airline.context import AirlineAgentChatContext, create_initial_context

class MockContext:
    def __init__(self):
        self.state = create_initial_context()

async def test_triage_agent():
    print("Testing Triage Agent with Minimax configuration...")
    try:
        mock_ctx = MockContext()
        result = await Runner.run(
            triage_agent,
            "I want to change my seat on flight FLT-123",
            context=mock_ctx
        )
        print("Integration Test Passed!")
        print("Last Agent:", result.last_agent.name)
        print("Final Output:", result.final_output)
    except Exception as e:
        print("Integration Test Failed!")
        print("Error:", e)

if __name__ == "__main__":
    asyncio.run(test_triage_agent())
