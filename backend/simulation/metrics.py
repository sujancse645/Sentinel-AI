import asyncio
import random
import time

async def generate_metrics():
    """Generates continuous flowing infrastructure metrics."""
    # Base states
    cpu_usage = 45.0
    memory_usage = 60.0
    latency = 45.0
    requests_per_sec = 1200
    
    while True:
        # Add random walk with mean reversion
        cpu_usage = max(10.0, min(99.0, cpu_usage + random.uniform(-5.0, 5.0) + (45.0 - cpu_usage) * 0.1))
        memory_usage = max(20.0, min(98.0, memory_usage + random.uniform(-2.0, 2.0) + (60.0 - memory_usage) * 0.05))
        latency = max(10.0, min(5000.0, latency + random.uniform(-10.0, 15.0) + (45.0 - latency) * 0.1))
        requests_per_sec = max(100, min(10000, requests_per_sec + random.randint(-100, 100) + (1200 - requests_per_sec) * 0.1))
        
        # Rare spikes
        if random.random() < 0.02:
            cpu_usage = min(99.0, cpu_usage + random.uniform(20.0, 40.0))
            latency = latency + random.uniform(100.0, 500.0)

        yield {
            "type": "metrics",
            "timestamp": time.time(),
            "data": {
                "cpu_usage": round(cpu_usage, 2),
                "memory_usage": round(memory_usage, 2),
                "latency_ms": round(latency, 2),
                "requests_per_sec": int(requests_per_sec),
                "system_health": round(100 - (cpu_usage * 0.3 + memory_usage * 0.2 + min(latency / 10, 30)), 2)
            }
        }
        await asyncio.sleep(1.0) # 1 update per second
