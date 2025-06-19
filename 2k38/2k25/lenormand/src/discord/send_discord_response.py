import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Pegando os valores das variáveis do ambiente (GitHub Secrets)
TOKEN = os.getenv('DISCORD_BOT_TOKEN')
CHANNEL_ID_1 = int(os.getenv('DISCORD_CHANNEL_ID_1'))
CHANNEL_ID_2 = int(os.getenv('DISCORD_CHANNEL_ID_2'))
CHANNEL_ID_3 = int(os.getenv('DISCORD_CHANNEL_ID_3'))

# Verificar se as variáveis foram carregadas corretamente
if not TOKEN or not CHANNEL_ID_1 or not CHANNEL_ID_2 or not CHANNEL_ID_3:
    raise ValueError("As variáveis de ambiente DISCORD_BOT_TOKEN, DISCORD_CHANNEL_ID_1, DISCORD_CHANNEL_ID_2 ou DISCORD_CHANNEL_ID_3 não foram encontradas.")

# Definindo mensagens como variáveis
MESSAGE_DOGS = '🐶🐢🐔 alimentados com sucesso!'     
MESSAGE_GRATIDAO = '📿 Gratidao realizada!'   

# Configurar o bot
intents = discord.Intents.default()
bot = commands.Bot(command_prefix='!', intents=intents)

# Dicionário para mapear canais às mensagens
messages_to_send = {
    CHANNEL_ID_1: MESSAGE_DOGS,
    CHANNEL_ID_2: MESSAGE_DOGS,
    CHANNEL_ID_3: MESSAGE_GRATIDAO
}

@bot.event
async def on_ready():
    print(f'Bot {bot.user} está online!')

    for channel_id, message in messages_to_send.items():
        channel = bot.get_channel(channel_id)
        if channel:
            try:
                await channel.send(message)
                print(f'Mensagem enviada para o canal {channel.name}: {message}')
            except Exception as e:
                print(f'Erro ao enviar mensagem para o canal {channel.name}: {e}')
        else:
            print(f'Canal {channel_id} não encontrado.')

    # Encerrar o bot após enviar as mensagens
    await bot.close()

# Iniciar o bot
bot.run(TOKEN)
