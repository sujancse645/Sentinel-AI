from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json

from simulation.metrics import generate_metrics
from simulation.incidents import generate_incidents
from simulation.ai_agents import generate_agent_states
from simulation.security import generate_security_events
from simulation.scaling import generate_scaling_events

app = FastAPI(title="SENTINEL AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception:
                pass

manager = ConnectionManager()

async def metrics_task():
    async for data in generate_metrics():
        await manager.broadcast(json.dumps(data))

async def incidents_task():
    async for data in generate_incidents():
        await manager.broadcast(json.dumps(data))

async def ai_agents_task():
    async for data in generate_agent_states():
        await manager.broadcast(json.dumps(data))

async def security_task():
    async for data in generate_security_events():
        await manager.broadcast(json.dumps(data))

async def scaling_task():
    async for data in generate_scaling_events():
        await manager.broadcast(json.dumps(data))

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(metrics_task())
    asyncio.create_task(incidents_task())
    asyncio.create_task(ai_agents_task())
    asyncio.create_task(security_task())
    asyncio.create_task(scaling_task())

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
