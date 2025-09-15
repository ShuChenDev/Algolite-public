# pyinstaller --onefile --name algolite-server run.py --clean ^  --add-data ".env;."  

from dotenv import load_dotenv
import os
import sys
import uvicorn


# !!!!!!!!!!!!!!!!!!!!!! Load env, might need user to define polygon/postgresql APIKEY !!!!!!!!!!!!!!!!!!!!!! 
base_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(base_dir, ".env")
if os.path.exists(env_path):
    load_dotenv(env_path)

sys.path.append(os.path.dirname(__file__))


from app.main import app

if __name__ == "__main__":
    try:
        uvicorn.run(app, host="127.0.0.1", port=8888)
    except Exception:
        import traceback
        traceback.print_exc()
        input("\nPress Enter to exit...")
