from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Support developing the backend on a different port than the frontend.
app.config['JSON_SORT_KEYS'] = False # Not needed in python 3.6+

# Bring in any rest endpoints defined.
from panel_dashboard.rest import *

@app.route('/')
def root():
    return "Hello from the panel dashboard control backend"