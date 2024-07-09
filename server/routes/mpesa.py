import os
from flask import request, jsonify
from flask_restful import Resource
import requests
from requests.auth import HTTPBasicAuth
import base64
from datetime import datetime
from dotenv import load_dotenv

# from dbconfig import app

load_dotenv()

consumer_key = os.getenv('CONSUMER_KEY')
consumer_secret = os.getenv('CONSUMER_SECRET')
shortcode = os.getenv('SHORTCODE')
passkey = os.getenv('PASSKEY')


encoded_credentials = base64.b64encode(f"{consumer_key}:{consumer_secret}".encode()).decode()



def get_access_token():
    url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    headers = {
        'Authorization': f'Basic {encoded_credentials}'  # Replace with your base64 encoded consumer key:secret
    }
    response = requests.request("GET", url, headers=headers)
    print(f"Response Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
    
    if response.status_code == 200:
        return response.json()['access_token']
    else:
        raise Exception("Failed to get access token: " + response.text)
    


class SimulateC2B(Resource):
    def post(self):
        data = request.json
        phone_number = data['phoneNumber']
        amount = data['amount']

        try:
            access_token = get_access_token()  # Retrieves a new access token
            api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
            headers = {"Authorization": f"Bearer {access_token}"}

            timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
            password = base64.b64encode((shortcode + passkey + timestamp).encode('ascii')).decode('ascii')

            # Logging for debugging
            print(f"Shortcode: {shortcode}")
            print(f"Passkey: {passkey}")
            print(f"Timestamp: {timestamp}")
            print(f"Generated Password: {password}")



            request_payload = {
                "BusinessShortCode": shortcode,
                "Password": password,
                "Timestamp": timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": phone_number,
                "PartyB": shortcode,
                "PhoneNumber": phone_number,
                "CallBackURL": "/callback",  # Replace with your callback URL
                "AccountReference": "Test123",
                "TransactionDesc": "Payment for goods"
            }

            response = requests.post(api_url, json=request_payload, headers=headers)
            return jsonify(response.json())

        except Exception as e:
            return jsonify({
                "errorCode": "500",
                "errorMessage": str(e)
            })

class Callback(Resource):
    def post(self):     
        data = request.json
        # Process the payment confirmation here
        print(data)
        return jsonify({"ResultCode": 0, "ResultDesc": "Accepted"})
    