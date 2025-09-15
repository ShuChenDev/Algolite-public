# app/api/logs.py
from fastapi import APIRouter, WebSocket
import sys
import asyncio
from typing import List

router = APIRouter()
active_connections: List[WebSocket] = []

class WebSocketStdout:
    """Intercepts print() and forwards text to all WebSocket clients"""
    def write(self, message):
        if message.strip():
            loop = asyncio.get_event_loop()
            for ws in list(active_connections):
                try:
                    loop.create_task(ws.send_text(message))
                except Exception:
                    pass

    def flush(self):
        pass

# Redirect Python's print output
sys.stdout = WebSocketStdout()

@router.websocket("/ws/logs")
async def websocket_logs(ws: WebSocket):
    await ws.accept()
    active_connections.append(ws)
    try:
        while True:
            await ws.receive_text()
    except Exception:
        pass
    finally:
        active_connections.remove(ws)
