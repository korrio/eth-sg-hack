import requests
import pandas as pd
import numpy as np
import time
import json


def get_data(url):
    try:
        response = requests.get(url)
    except requests.exceptions.RequestException as e:
        print(e)
    data = response.json()
    return data

def validate_transaction(contract_address, address, startblock, api_key_token):
    url = "https://api.bscscan.com/api?module=account&action=tokentx&contractaddress={}&address={}&page=1&offset=5&startblock={}&sort=asc&apikey={}".format(contract_address,address,startblock,api_key_token)
    print("url", url)
    data = get_data(url)
    print("validate_transaction", data)
    return data['result']

def listRequestDeposits(api_key, status=None):
    if status == 'new': 
        url = f"https://cryptoapis.finnwork.co/Wallet/listRequestDeposits?status=new"
    elif status == 'watching': 
        url = f"https://cryptoapis.finnwork.co/Wallet/listRequestDeposits?status=watching"
    else:
        url = f"https://cryptoapis.finnwork.co/Wallet/listRequestDeposits" 
    headers = {'Content-Type': 'application/json', 'depay-x-key': api_key}
    response = requests.get(url, headers=headers)
    return response.json()

def updateWatchDeposit(api_key, id, status):
    url = f"https://cryptoapis.finnwork.co/Wallet/updateWatchDeposit/{id}/{status}"
    headers = {'Content-Type': 'application/json', 'depay-x-key': api_key}
    response = requests.get(url, headers=headers)
    return response.json()

def weiToEth(wei):
    wei = int(wei)
    wei = wei / 10**18
    # wei = int(wei)
    return wei

def web3CommitDeposit(api_key, merchantcode, cusid, asset, network, hookurl, amount, trxhash, status):
    url = "https://cryptoapis.finnwork.co/Web3/commitDeposit"
    payload = {
        "merchantcode": merchantcode,
        "cusid": cusid,
        "asset": asset,
        "network": network,
        "hookurl": hookurl,
        "amount": weiToEth(amount),
        "trxhash": trxhash,
        "status": status
    }
    print("payload", payload)
    print("type payload", type(payload))
    # dict to json
    payload = json.dumps(payload, default=str)
    print("payload", payload)
    headers = {'Content-Type': 'application/json', 'depay-x-key': api_key}
    print("headers", headers)
    response = requests.post(url, data=payload, headers=headers)
    print("response", response)
    print("response.json()", response.json())
    return response.json()
