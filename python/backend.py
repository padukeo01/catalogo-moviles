from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

def leer_catalogo():
    try:
        # Lee el archivo Excel
        df = pd.read_excel('catalogo.xlsx')
        # Convierte el DataFrame a una lista de diccionarios
        return df.to_dict('records')
    except Exception as e:
        print(f"Error al leer el archivo Excel: {e}")
        return []

@app.route('/api/dispositivos', methods=['GET'])
def obtener_dispositivos():
    monto = request.args.get('monto', type=float, default=0)
    dispositivos = leer_catalogo()
    
    if monto > 0:
        dispositivos = [d for d in dispositivos if d['precio'] <= monto]
    
    return jsonify(dispositivos)

if __name__ == '__main__':
    app.run(debug=True, port=5000)