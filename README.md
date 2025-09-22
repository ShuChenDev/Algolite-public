# Algolite

**⚠️ Disclaimer:**  
This is a **personal, experimental project** created for educational and recreational purposes only.  
The author of this repository does **not** take any responsibility for:  
- Financial losses incurred if you use this code for real-world trading.  
- System issues, connection failures, or any other problems arising from its use.  
- Any misuse, misconfiguration, or deployment of this project.  
- Any other potential consequences of using this project.  

Use at your own risk.  

---

## Overview

Algolite is a lightweight algorithmic trading framework designed as a **learning exercise**. It is **not intended for professional production trading** or as financial advice.  

The project focuses on exploring:  
- Generative AI’s role in programming, finance, and algorithmic trading  
- Software development concepts  
- Integration of market data, broker APIs, and historic backtesting  

With years of following discussions on Reddit, I noticed one of the biggest challenges for people interested in quantitative/algorithmic finance is the **technical barrier**. As someone who enjoys both finance and software engineering, I decided to revive a command-line trade bot I built in high school and take it a step further.  

The goal is to create an **easily expandable, maintainable, and scalable full-stack product**, while also experimenting with how generative AI can lower the barrier for aspiring traders — including some of my own family members who are "professional amateur" stock traders.

---

## Features

Due to the experimental nature of this project, **I do not recommend using it for live (non-paper) trading, ever**.  

Algolite is designed as a lightweight trading platform. You are in charge of running the strategy and broker server yourself (for maximum security). You can:  
- Use the built-in **Strategy Template** in the default code  
- Follow the documentation for the Strategy Module and extend it in your own IDE  
- Or leverage **generative AI (GPT-5)** and prompt engineering to help non-coders form a basic, working trading strategy  

---

## Note

🚀 **Strategy Server Avaliable!.**  
Download [`Strategy Server`](https://github.com/ShuChenDev/Algolite-public/releases/tag/Strategy_Server)
More details available in [`/backend/app/main.py`](./backend/app/main.py).  

---

## Setup Guide

1. Download [Interactive Brokers TWS](https://www.interactivebrokers.com/en/trading/ib-api.php) or Gateway and enable API access  
2. Download the latest release of **Strategy Server** and unzip  
3. Enter your **PostgreSQL Database URL** and **Polygon.io API Key** into `config.json` inside the Strategy Server folder  
4. Log in to one of the IBKR applications and select **Paper Trading**  
5. Go to [https://algolite-seven.vercel.app](https://algolite-seven.vercel.app)  
6. Explore and have fun 🚀  

---
