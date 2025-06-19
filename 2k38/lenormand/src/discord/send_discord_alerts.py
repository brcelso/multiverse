import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Pegando os valores das variáveis do ambiente (GitHub Secrets)
TOKEN = os.getenv('DISCORD_BOT_TOKEN')
CHANNEL_IDS = {
    "canal1": int(os.getenv('DISCORD_CHANNEL_ID_1')),
    "canal2": int(os.getenv('DISCORD_CHANNEL_ID_2')),
    "canal3": int(os.getenv('DISCORD_CHANNEL_ID_3'))
}

# Verificar se as variáveis foram carregadas corretamente
if not TOKEN or not all(CHANNEL_IDS.values()):
    raise ValueError("As variáveis de ambiente DISCORD_BOT_TOKEN ou DISCORD_CHANNEL_ID_X não foram encontradas.")

# Definir mensagens como variáveis
MESSAGE_1 = 'Olá! Alimentar os bichos! 🐶🐢🐔, \nRealizar tarefas! 👽,\nCentro Espírita Qua20h Dom10h'
MESSAGE_2 = 'Lembrar da Missao Canela e Acucar!!'

# Configurar o bot
intents = discord.Intents.default()
bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'Bot {bot.user} está online!')

    # Enviar mensagens para os canais definidos
    try:
        # Enviar MESSAGE_1 para os canais 1 e 2
        for canal_key in ["canal1", "canal2"]:
            channel = bot.get_channel(CHANNEL_IDS[canal_key])
            if channel:
                await channel.send(MESSAGE_1)
                print(f'Mensagem 1 enviada para o canal {channel.name}.')
            else:
                print(f'Canal {canal_key} não encontrado.')

        # Enviar MESSAGE_2 para o canal 3
        channel = bot.get_channel(CHANNEL_IDS["canal3"])
        if channel:
            await channel.send(MESSAGE_2)
            print(f'Mensagem 2 enviada para o canal {channel.name}.')
        else:
            print('Canal 3 não encontrado.')

    except Exception as e:
        print(f'Erro ao enviar mensagens: {e}')

    # Encerrar o bot após enviar as mensagens
    await bot.close()

# Iniciar o bot
bot.run(TOKEN)
