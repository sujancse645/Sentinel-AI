import asyncio
import random
import time

SERVICES = ["Frontend", "API Gateway", "Auth Service", "Payment Service", "Notification Service"]

async def generate_scaling_events():
    """Generates autonomous scaling events."""
    
    capacity = {s: random.randint(3, 10) for s in SERVICES}
    
    while True:
        target_service = random.choice(SERVICES)
        
        # Determine if scaling up or down
        action = "SCALED UP" if random.random() > 0.4 else "SCALED DOWN"
        delta = random.randint(1, 3)
        
        if action == "SCALED DOWN" and capacity[target_service] - delta < 2:
            action = "SCALED UP" # Don't scale below 2
            
        if action == "SCALED UP":
            capacity[target_service] += delta
        else:
            capacity[target_service] -= delta
            
        yield {
            "type": "scaling",
            "timestamp": time.time(),
            "data": {
                "service": target_service,
                "action": action,
                "delta": delta,
                "new_capacity": capacity[target_service],
                "reason": "Traffic spike detected" if action == "SCALED UP" else "Capacity optimization"
            }
        }
        await asyncio.sleep(random.uniform(8.0, 20.0))
