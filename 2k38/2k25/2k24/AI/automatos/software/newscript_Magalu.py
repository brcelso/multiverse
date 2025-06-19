import json
import requests
from datetime import datetime
import os
import urllib3

# Suprimir o aviso InsecureRequestWarning
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# Variáveis de entrada
homeV1 = "https://lad1-smartcenter.almaden.app/api/public/api"
automatos_id = ""
security_key = ""
hostname = "WN300NOT703"

url = f"{homeV1}/getAllSoftware/nextpage/desktops?AutomatosId={automatos_id}&Securitykey={security_key}&hostname={hostname}"

response = requests.get(url, verify=False)

if response.status_code == 200:
    data = response.json().get("data", [])

    for item in data:
        machine_id = item.get("machine_id")
        computer_name = item.get("computer_name")
        software_name = item.get("software_name")
        if machine_id and computer_name and "OFFICE" in software_name.upper():
            print(f"Machine ID: {machine_id}, Computer Name: {computer_name}, Software: {software_name}")
    
    #for item in data:
    #    print(json.dumps(item, indent=4))
        

else:
    print(f"Erro na requisição: {response.status_code}")
