from celery import Celery
from depay import depay
import pandas as pd
import numpy as np
import time

# BROKER_URL = 'redis://localhost:6379/0'
# BACKEND_URL = 'redis://localhost:6379/1'

# app = Celery('main', broker=BROKER_URL, backend=BACKEND_URL)

app = Celery('main', broker='redis://redis:6379/0')

# bsc_apikey = ''
linea_apikey = ''
superadmin_apikey = ''

network = 97

@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
            
    sender.add_periodic_task(10.0, fetch_data.s(linea_apikey, superadmin_apikey), name='add every 10')
            

@app.task
def fetch_data(api_key_token, api_key):
    listRequestDeposits_data_new = depay.listRequestDeposits(api_key, 'new')
    listRequestDeposits_data_watching = depay.listRequestDeposits(api_key, 'watching')
    all_listRequestDeposits_data = listRequestDeposits_data_new + listRequestDeposits_data_watching
    # list to dataframe
    all_listRequestDeposits_data = pd.DataFrame(all_listRequestDeposits_data)
    # print("all_listRequestDeposits_data", all_listRequestDeposits_data)
    filtered_lists = []
    filtered_lists_expired = []
    # filter data by network if data is not empty list
    if not all_listRequestDeposits_data.empty:
        all_listRequestDeposits_data = all_listRequestDeposits_data[all_listRequestDeposits_data['network'] == network]
        
        all_listRequestDeposits_data['reqtime'] = pd.to_datetime(all_listRequestDeposits_data['reqtime'])
        all_listRequestDeposits_data['reqtime'] = all_listRequestDeposits_data['reqtime'].dt.strftime('%Y-%m-%d %H:%M:%S.%f')
        all_listRequestDeposits_data['reqtime'] = pd.to_datetime(all_listRequestDeposits_data['reqtime'])

        all_listRequestDeposits_data['endtime'] = all_listRequestDeposits_data['reqtime'] + pd.Timedelta(minutes=10)
        # time zone +7
        all_listRequestDeposits_data['endtime'] = all_listRequestDeposits_data['endtime'] + pd.Timedelta(hours=7)
        all_listRequestDeposits_data['endtime'] = all_listRequestDeposits_data['endtime'].dt.strftime('%Y-%m-%d %H:%M:%S.%f')
        print("all_listRequestDeposits_data__network", all_listRequestDeposits_data)
        # data to list
        all_listRequestDeposits_data = all_listRequestDeposits_data.to_dict('records')
        filtered_lists = all_listRequestDeposits_data
        print("filtered_lists", filtered_lists)
        # loop data to update status from new to watching and from watching to expired
        filtered_list = []
        filtered_list_watching = []
        for i in filtered_lists:
            if i['status'] == 'new':
                depay.updateWatchDeposit(api_key, i['id'], 'watching')
                filtered_list.append(i)

            if i['status'] == 'watching':
                now = pd.to_datetime(pd.to_datetime('now').strftime('%Y-%m-%d %H:%M:%S.%f')) + pd.Timedelta(hours=7)
                if np.where(now.strftime('%Y-%m-%d %H:%M:%S.%f') > i['endtime'], True, False):
                    depay.updateWatchDeposit(api_key, i['id'], 'expired')
                else:
                    filtered_list_watching.append(i)
                    if len(filtered_list_watching) != 0:
                        while (np.where(pd.to_datetime('now').strftime('%Y-%m-%d %H:%M:%S.%f') < i['endtime'], True, False)):
                            time.sleep(3)
                            print("--------------------------------------------------------------------------------------------------------------")
                            print("I'm working...")
                            print("filtered_list_watching", filtered_list_watching)
                            # print(filtered_list_watching[0])
                            # print("now", pd.to_datetime('now').strftime('%Y-%m-%d %H:%M:%S.%f') , "endtime", str(filtered_list_watching[0]['endtime']))
                            print("--------------------------------------------------------------------------------------------------------------")
                            check_deposits = depay.validate_transaction(filtered_list_watching[0]['assestaddress'], filtered_list_watching[0]['address'], filtered_list_watching[0]['reqblock'], api_key_token)
                            print("check_deposits", check_deposits)
                            print("check_deposits != []", check_deposits != [])
                            print("check_deposits != 'Max rate limit reached, rate limit of 5/1sec applied'", check_deposits != 'Max rate limit reached, rate limit of 5/1sec applied')
                            if check_deposits != [] and check_deposits != 'Max rate limit reached, rate limit of 5/1sec applied':
                                print("test", check_deposits != [] and check_deposits != 'Max rate limit reached, rate limit of 5/1sec applied')
                                print("Deposit detected")
                                print(check_deposits)
                                depay.updateWatchDeposit(api_key, filtered_list_watching[0]['id'], 'watched')
                                print("watched")
                                print("merchantcode", filtered_list_watching[0]['merchantcode'])
                                print("asset", check_deposits[0]['tokenSymbol'])
                                print("network", filtered_list_watching[0]['network'])
                                print("hookurl", filtered_list_watching[0]['hookurl'])
                                if filtered_list_watching[0]['hookurl'] is None:
                                    filtered_list_watching[0]['hookurl'] = ""
                                print("hookurl", filtered_list_watching[0]['hookurl'])
                                print("amount", check_deposits[0]['value'])
                                print("trxhash", check_deposits[0]['hash'])
                                print("status", 1)
                                print("web3CommitDeposit")
                                depay.web3CommitDeposit(api_key, filtered_list_watching[0]['merchantcode'], filtered_list_watching[0]['cusid'], check_deposits[0]['tokenSymbol'], filtered_list_watching[0]['network'], filtered_list_watching[0]['hookurl'], check_deposits[0]['value'], check_deposits[0]['hash'], 1)
                                filtered_list_watching.pop(0)
                                print("web3CommitDeposit done")
                    else:
                        print("filtered_list_watching", filtered_list_watching)
            else:
                return ["no deposit"]
        return "done"
    else:
        print("all_listRequestDeposits_data", all_listRequestDeposits_data)
        filtered_lists_expired.append(all_listRequestDeposits_data)

if __name__ == '__main__':
    app.start()
