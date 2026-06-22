import fs from 'fs';
import path from 'path';
import { CodePageContent } from './content';

export default function CodePage() {
  const agentsPath = path.join(process.cwd(), '../python-backend/airline/agents.py');
  const guardrailsPath = path.join(process.cwd(), '../python-backend/airline/guardrails.py');
  const toolsPath = path.join(process.cwd(), '../python-backend/airline/tools.py');

  let importsCode = "Code not found.";
  let seatAgentCode = "Code not found.";
  let flightAgentCode = "Code not found.";
  let bookingAgentCode = "Code not found.";
  let refundsAgentCode = "Code not found.";
  let faqAgentCode = "Code not found.";
  let triageAgentCode = "Code not found.";
  let routingCode = "Code not found.";
  let guardrailsCode = "Code not found.";
  let toolsImports = "Code not found.";
  let toolsList: string[] = [];

  try {
    const fullCode = fs.readFileSync(agentsPath, 'utf8');
    const routingToken = "async def on_seat_booking_handoff";
    const routingSplit = fullCode.split(routingToken);
    
    if (routingSplit.length >= 2) {
      const setupCode = routingSplit[0];
      routingCode = (routingToken + routingSplit[1]).trim();
      
      const parts1 = setupCode.split("def seat_services_instructions(");
      importsCode = parts1[0].trim();
      
      const parts2 = ("def seat_services_instructions(" + parts1[1]).split("def flight_information_instructions(");
      seatAgentCode = parts2[0].trim();
      
      const parts3 = ("def flight_information_instructions(" + parts2[1]).split("def booking_cancellation_instructions(");
      flightAgentCode = parts3[0].trim();
      
      const parts4 = ("def booking_cancellation_instructions(" + parts3[1]).split("def refunds_compensation_instructions(");
      bookingAgentCode = parts4[0].trim();
      
      const parts5 = ("def refunds_compensation_instructions(" + parts4[1]).split("faq_agent = Agent[AirlineAgentChatContext](");
      refundsAgentCode = parts5[0].trim();
      
      const parts6 = ("faq_agent = Agent[AirlineAgentChatContext](" + parts5[1]).split("triage_agent = Agent[AirlineAgentChatContext](");
      faqAgentCode = parts6[0].trim();
      
      triageAgentCode = ("triage_agent = Agent[AirlineAgentChatContext](" + parts6[1]).trim();
    } else {
      importsCode = fullCode;
    }
  } catch (e) {
    console.error("Failed to read agents.py", e);
  }

  try {
    guardrailsCode = fs.readFileSync(guardrailsPath, 'utf8');
  } catch (e) {
    console.error("Failed to read guardrails.py", e);
  }

  try {
    const fullToolsCode = fs.readFileSync(toolsPath, 'utf8');
    const tParts = fullToolsCode.split("@function_tool");
    if (tParts.length > 0) {
      toolsImports = tParts[0].trim();
      for (let i = 1; i < tParts.length; i++) {
        toolsList.push(("@function_tool" + tParts[i]).trim());
      }
    }
  } catch (e) {
    console.error("Failed to read tools.py", e);
  }

  return (
    <CodePageContent 
      importsCode={importsCode}
      seatAgentCode={seatAgentCode}
      flightAgentCode={flightAgentCode}
      bookingAgentCode={bookingAgentCode}
      refundsAgentCode={refundsAgentCode}
      faqAgentCode={faqAgentCode}
      triageAgentCode={triageAgentCode}
      routingCode={routingCode} 
      guardrailsCode={guardrailsCode} 
      toolsImports={toolsImports}
      toolsList={toolsList}
    />
  );
}
