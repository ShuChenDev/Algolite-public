from polygon import RESTClient
import pandas as pd

import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")
POLYGON_API_KEY = os.environ["POLYGON_API_KEY"]

def fetch_stock_candles(ticker, interval, start, end):
    # Get from Polygon.io
    client = RESTClient(api_key=POLYGON_API_KEY)  
    try:
        response = client.get_aggs(
            ticker=ticker, 
            timespan=interval,
            from_=start,
            to=end,
            multiplier=1,
            limit=50000
        )
    except Exception as e:
        print(f"Polygon API error: {e}")
        return
    if not response:
        return

    # Build DataFrame
    df = pd.DataFrame(response)
    df["date"] = pd.to_datetime(df["timestamp"], unit="ms")
    df = df.drop(columns=["timestamp"])
    df = df.rename(columns={
        "o": "open",
        "h": "high",
        "l": "low",
        "c": "close",
        "v": "volume"
    })
    df = df.drop(columns=[col for col in ["vwap", "otc", "transactions"] if col in df.columns], errors="ignore")
    
    # # Normalize Data
    # freq_map = {
    #     "minute": "1min",
    #     "hour": "1H",
    #     "day": "1D"
    # }
    
    # full_index = pd.date_range(
    #     start=pd.to_datetime(start),
    #     end=pd.to_datetime(end) + pd.Timedelta(days=1),
    #     freq=freq_map[interval]
    # )

    # df = df.reindex(full_index)
    # df[["open","high","low","close"]] = df[["open","high","low","close"]].ffill()
    # df["volume"] = df["volume"].fillna(0)

    return df