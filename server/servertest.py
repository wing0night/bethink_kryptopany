#监听POST 接受数据
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

#和Ollama通讯
def communication_with_ollama(update_data):
    url = "http://localhost:11434/api/generate"
    headers = {
        "Content-Type": "application/json"
    }
    promptai = "——————————将以上文本提取关键词，针对他讨论的话题划分为相对应的类别，回答请使用json格式"
    data = {
        "model": "llama3.2",
        "prompt": update_data + promptai,
        "stream": False
    }
    try:
        response = requests.post(url, json=data, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"与Ollama通信时出错: {e}")
        return None
    

@app.route('/post-endpoint', methods=['POST'])
def handle_post():
    try:
        data = request.json
        logging.debug(f"Received data: {data}")
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        wallet_address = data.get('wallet_address')
        update_data = data.get('update_data')

        if not wallet_address or not update_data:
            return jsonify({'error': 'Missing wallet_address or update_data'}), 400

        # 暂时注释掉 Ollama 通信部分
        # ollama_response = communication_with_ollama(update_data)
        ollama_response = "Simulated Ollama response"

        return jsonify({
            'status': 'success',
            'message': 'Data received',
            'wallet_address': wallet_address,
            'result': ollama_response
        })
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # 监听所有网络接口上的5000端口




# import requests
# import sqlite3  
# url = "http://localhost:11434/api/generate"  # 更新为生成请求的API端点
# headers = {
#     "Content-Type": "application/json"
# }
# promptai = "——————————将以上文本提取关键词，针对他讨论的话题划分为相对应的类别，回答请使用json格式"
# data = {
#     "model": "llama3.2",  # 指定模型名称
#     "prompt": update_data+promptai,  # 输入文本 + prompt
#     "stream": False  # 设置为false以获取单个响应
# }
# response = requests.post(url, json=data, headers=headers)

# if response.status_code == 200:
#     print("响应内容：", response.json())
#     conn = sqlite3.connect('user_data.db')
#     cursor = conn.cursor()
#     cursor.execute('''CREATE TABLE IF NOT EXISTS user_data (
#         user_id TEXT,
#         secret_key TEXT,
#         data TEXT,
#         time TEXT,
#         category TEXT
#     )''')
#     # 修复：将 "kaj123" 替换为变量 secret_key，并添加 user_id 和其他字段
#     cursor.execute('''INSERT INTO user_data (user_id, secret_key, data) VALUES (?, ?, ?)''', (user_id, secret_key, response.json()))  # 使用变量 user_id 和 secret_key
#     conn.commit()
#     conn.close()

# else:
#     print("请求失败，状态码：", response.status_code)


#得到数据response 加密

# 添加到数据库里面




