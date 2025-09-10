from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime

from app.broker.IBClient import client

router = APIRouter()

# Models
class StockOrder(BaseModel):
    symbol: str
    quantity: float
    exchange: str = "SMART"
    currency: str = "USD"

class StockMarketOrder(StockOrder):
    pass

class StockLimitOrder(StockOrder):
    limitPrice: float

# Endpoints
@router.post("/stockMarketOrder")
async def stock_market_order(request: StockMarketOrder):
    try:
        trade = client.order.stock_market_order(
            symbol=request.symbol,
            quantity=request.quantity,
            exchange=request.exchange,
            currency=request.currency,
        )
        return {"status": "success", "orderId": trade.order.orderId}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/stockLimitOrder")
async def stock_limit_order(request: StockLimitOrder):
    try:
        trade = client.order.stock_limit_order(
            symbol=request.symbol,
            quantity=request.quantity,
            limitPrice=request.limitPrice,
            exchange=request.exchange,
            currency=request.currency,
        )
        return {"status": "success", "orderId": trade.order.orderId}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status")
async def get_server_status():
    try:
        return {
            "ib_connected": client.is_connected(),
            "open_orders": len(client.ib.trades()),
            "server_time": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
