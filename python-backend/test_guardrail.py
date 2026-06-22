import asyncio
from dotenv import load_dotenv

load_dotenv()

from airline.guardrails import guardrail_agent
from airline.context import create_initial_context
from agents import Runner

async def test_guardrail():
    print("Testing Guardrail with Minimax...")
    try:
        # Run the relevance guardrail manually
        result = await Runner.run(
            guardrail_agent,
            "I want to change my seat on flight FLT-123"
        )
        print("Guardrail passed:", result.final_output)
    except Exception as e:
        print("Guardrail Error:", type(e), e)

if __name__ == "__main__":
    asyncio.run(test_guardrail())
