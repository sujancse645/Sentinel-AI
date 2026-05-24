import asyncio
import random
import time

THREATS = [
    "DDoS Volume Spike",
    "Brute Force Authentication",
    "SQL Injection Attempt",
    "Unauthorized S3 Access",
    "Zero-Day Exploit Signature",
    "Abnormal Outbound Traffic"
]

REGIONS = ["us-east-1", "eu-central-1", "ap-northeast-1"]

async def generate_security_events():
    """Generates continuous flowing security events and global threat level."""
    threat_level = 15.0
    
    while True:
        # Threat level drifts
        threat_level = max(5.0, min(95.0, threat_level + random.uniform(-5.0, 6.0) + (15.0 - threat_level) * 0.05))
        
        # Occasionally a major attack
        event = None
        if random.random() < 0.05:
            threat_level = min(100.0, threat_level + random.uniform(30.0, 50.0))
            event = {
                "id": f"SEC-{int(time.time())}",
                "threat": random.choice(THREATS),
                "region": random.choice(REGIONS),
                "severity": "CRITICAL" if threat_level > 80 else "HIGH",
                "ip_source": f"{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}",
                "timestamp": time.time()
            }

        yield {
            "type": "security",
            "timestamp": time.time(),
            "data": {
                "threat_level": round(threat_level, 1),
                "latest_event": event
            }
        }
        await asyncio.sleep(2.0)
