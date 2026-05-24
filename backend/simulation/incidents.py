import asyncio
import random
import time
from typing import Dict, Any

SERVICES = ["Frontend", "API Gateway", "Auth Service", "Payment Service", "Notification Service", "Redis", "PostgreSQL", "Kubernetes Cluster", "CDN", "Load Balancer"]
REGIONS = ["us-east-1", "us-west-2", "eu-central-1", "ap-northeast-1"]
SEVERITIES = ["WARNING", "CRITICAL", "SAFE"]
ISSUES = [
    "CPU spike detected",
    "Memory leak suspected",
    "Database connection exhaustion",
    "Redis timeout threshold exceeded",
    "Deployment anomaly found",
    "High error rate observed",
    "Network latency degraded",
    "Pod crash looping"
]

async def generate_incidents():
    """Generates continuous flowing incidents."""
    incident_id = 1000
    
    while True:
        # Wait a random time before the next incident
        await asyncio.sleep(random.uniform(5.0, 15.0))
        
        incident_id += 1
        service = random.choice(SERVICES)
        severity = random.choices(SEVERITIES, weights=[0.6, 0.3, 0.1])[0]
        
        # If it's safe, maybe it's just a resolution message, but mostly we emit issues
        if severity == "SAFE":
            issue = f"{service} recovered automatically."
            ai_summary = "System stabilized. Auto-recovery workflow succeeded."
            suggested_action = "None required"
            confidence = 0.99
        else:
            issue = random.choice(ISSUES)
            ai_summary = f"Detected {issue.lower()} in {service} across {random.choice(REGIONS)}. Potential impact on upstream services."
            suggested_action = random.choice([
                "Scale up pods immediately",
                "Restart service instance",
                "Rollback latest deployment",
                "Clear Redis cache",
                "Kill long running DB queries"
            ])
            confidence = round(random.uniform(0.65, 0.98), 2)
            
        yield {
            "type": "incident",
            "timestamp": time.time(),
            "data": {
                "id": f"INC-{incident_id}",
                "service": service,
                "region": random.choice(REGIONS),
                "severity": severity,
                "title": issue,
                "ai_summary": ai_summary,
                "suggested_action": suggested_action,
                "confidence_score": confidence,
                "affected_users": random.randint(10, 5000) if severity != "SAFE" else 0
            }
        }
