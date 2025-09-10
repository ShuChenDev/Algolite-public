from fastapi import APIRouter, Query
from typing import List, Optional
import datetime

from app.database.db import (
    StockCandle,
    get_stock_candles,
    delete_stock_candles,
)

router = APIRouter()

@router.get("/stocks/{ticker}", response_model=List[StockCandle])
def api_get_candles(
    ticker: str,
    interval: Optional[str] = Query(None),
    start: Optional[datetime.datetime] = Query(None),
    end: Optional[datetime.datetime] = Query(None),
    limit: int = 100,
):
    return get_stock_candles(ticker, interval, start, end, limit)

@router.delete("/stocks/{ticker}")
def api_delete_candles(
    ticker: str,
    interval: Optional[str] = None,
    start: Optional[datetime.datetime] = None,
    end: Optional[datetime.datetime] = None,
):
    deleted = delete_stock_candles(ticker, interval, start, end)
    return {"deleted_rows": deleted}
