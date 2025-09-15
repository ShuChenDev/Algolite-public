"""
This package:

It is designed to run one strategy per Docker container.

Each strategy tracks and manages its own private data (e.g., trades, state, config).

All strategies share access to common market data (e.g., prices, indicators) stored in a centralized PostgreSQL database.

Strategy-specific data is isolated via separate tables or strategy IDs, ensuring clean separation and easier debugging.

This setup enables horizontal scaling by launching multiple containers for multiple strategies.
"""