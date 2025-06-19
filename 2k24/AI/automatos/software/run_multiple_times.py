import subprocess
import time
import os
from dotenv import load_dotenv

# Função para carregar hostnames do arquivo .env
def load_hostnames():
    """Carregar a lista de hostnames do arquivo .env"""
    load_dotenv()  # Carregar as variáveis de ambiente
    hostnames = os.getenv("HOSTNAMES")
    if not hostnames:
        print("Erro: Não foi encontrado a variável 'HOSTNAMES' no arquivo .env.")
        exit(1)
    return [hostname.strip() for hostname in hostnames.split(",")]  # Retorna uma lista de hostnames, removendo espaços extras

def run_script(hostname):
    """Função para chamar o script principal passando o hostname"""
    try:
        # Aqui chamamos o script original e passamos o hostname como argumento
        #print(f"{hostname}")
        result = subprocess.run(["python", "script_original.py", "--hostname", hostname], capture_output=True, text=True)
        
        # Imprime a saída do script original no terminal
        print(f"{result.stdout}")
        if result.stderr:
            print(f"Erros para {hostname}:\n{result.stderr}")
    except Exception as e:
        print(f"Erro ao executar o script para {hostname}: {e}")

def main():
    """Função principal que controla a execução do script para cada hostname"""
    hostnames = load_hostnames()  # Carregar os hostnames
    if not hostnames:
        print("Nenhum hostname encontrado.")
        return

    # Imprimir os hostnames carregados para verificação
    #print(f"Hostnames carregados: {hostnames}")
    
    # Executa o script uma vez para cada hostname
    for hostname in hostnames:
        #print(f"\nIniciando execução para o hostname: {hostname}")
        run_script(hostname)  # Executa o script principal passando o hostname
        
        # Se desejar aguardar um tempo entre as execuções (por exemplo, 2 segundos)
        time.sleep(2)  # Ajuste o tempo conforme necessário

if __name__ == "__main__":
    main()
