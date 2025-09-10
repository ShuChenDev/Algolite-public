"""
This package class handles connection to IBKR server via ib_async, with a singleton instance ib
"""

import sys
import io
from ib_async import *
import asyncio


class IBClient:
    def __init__(self):
        self.ib = IB()
        self.order = OrderManager(self.ib)

    def connect(self):
        ports = [7497, 4002]
        host = "127.0.0.1"

        if (self.is_connected()):
            return

        stderr = sys.stderr  # Mute ib_async error message
        sys.stderr = io.StringIO()

        for port in ports:
            try:
                self.ib.connect(host=host, port=port, timeout=5)
                print(f"Connected to IBKR on {host}:{port}")
                return
            except Exception:
                pass
            finally:
                sys.stderr = stderr  # Unmute

        print(f'Connection to IBKR failed, make sure your TWS or Gateway is running on one of the expected ports (7497 or 4002), and API access is enabled.')

    def disconnect(self):
        if (self.ib.isConnected()):
            self.ib.disconnect()
            print("Disconnected from IBKR")

    def is_connected(self):
        return self.ib.isConnected()

    def run(self):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        while True:
            try:
                if not self.is_connected():
                    self.disconnect()
                    self.connect()
                loop.run_until_complete(asyncio.sleep(5))
            except Exception:
                loop.run_until_complete(asyncio.sleep(5))


class OrderManager:
    """
    This class manages and send orders to IBKR, all user orders must go though ib.order
    """

    def __init__(self, ib):
        if not isinstance(ib, IB):
            raise TypeError(
                "OrderManager must be initialized with an IB instance.")
        self.ib = ib

    def stock_market_order(self, symbol: str, quantity: float, exchange='SMART', currency='USD'):
        """
        Place Market Order, positive quantity for buy, negative quantity for sell. Default to US Market
        """
        if not self.ib.isConnected():
            raise Exception("Not connected to IB gateway")

        action = 'BUY' if quantity >= 0 else 'SELL'
        quantity = abs(quantity)

        contract = Stock(symbol, exchange, currency)
        order = MarketOrder(action, quantity)
        trade = self.ib.placeOrder(contract, order)

        print(f'{quantity} Market Order Placed on {symbol}')
        return trade

    def stock_limit_order(self, symbol: str, limitPrice: float, quantity: float, exchange='SMART', currency='USD'):
        """
        Place Limit Order, positive quantity for buy, negative quantity for sell. Default to US Market
        """
        if not self.ib.isConnected():
            raise Exception("Not connected to IB gateway")

        action = 'BUY' if quantity >= 0 else 'SELL'
        quantity = abs(quantity)

        contract = Stock(symbol, exchange, currency)
        order = LimitOrder(action, quantity, limitPrice)
        trade = self.ib.placeOrder(contract, order)
        return trade


#Client global instance, singleton class
client = IBClient()




# Abondoned
# This class gets and handles account and positions
# features:
# Total Account Value
# Total Holdings
# Cash in USD
# Cash in CAD
# """
# class PositionManager:
#     """
#     This class manages positions
#     """
#     pass
# def getNetAccountValue(self, currency='BASE'):
#     for v in self.ib.accountValues():
#         if v.tag == 'NetLiquidationByCurrency' and v.currency == currency:
#             return round(float(v.value),4)
