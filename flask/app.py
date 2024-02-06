from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    api_value = request.args.get('api', '')
    return jsonify({'result': api_value})

if __name__ == '__main__':
    app.run(debug=True)
