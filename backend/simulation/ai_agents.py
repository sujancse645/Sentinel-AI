import asyncio
import random
import time

AGENTS = ["Detection Agent", "Correlation Agent", "Root Cause Agent", "Recovery Agent", "Prediction Agent", "Incident Report Agent"]
STATES = ["Idle", "Analyzing logs...", "Correlating events...", "Isolating root cause...", "Drafting recovery plan...", "Executing recovery...", "Generating report..."]

async def generate_agent_states():
    """Generates states for AI agents."""
    
    agent_states = {agent: {"state": "Idle", "confidence": 1.0, "active": False} for agent in AGENTS}
    
    while True:
        # Occasionally wake up an agent or change its state
        target_agent = random.choice(AGENTS)
        
        if random.random() < 0.3:
            agent_states[target_agent]["state"] = "Idle"
            agent_states[target_agent]["active"] = False
            agent_states[target_agent]["confidence"] = 1.0
        else:
            agent_states[target_agent]["state"] = random.choice([s for s in STATES if s != "Idle"])
            agent_states[target_agent]["active"] = True
            agent_states[target_agent]["confidence"] = round(random.uniform(0.70, 0.99), 2)
            
        # Simulate chain of thought log
        cot_log = ""
        if agent_states[target_agent]["active"]:
            cot_log = f"[{time.strftime('%H:%M:%S')}] {target_agent}: {agent_states[target_agent]['state']} (Confidence: {agent_states[target_agent]['confidence'] * 100}%)"

        yield {
            "type": "ai_agents",
            "timestamp": time.time(),
            "data": {
                "states": agent_states,
                "latest_log": cot_log if cot_log else None
            }
        }
        await asyncio.sleep(random.uniform(1.0, 3.0))
