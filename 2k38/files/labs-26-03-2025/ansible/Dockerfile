# Usa a imagem base do Ubuntu mais recente
FROM ubuntu:latest

# Definir as variáveis de ambiente para evitar a interação durante a instalação do tzdata
ENV DEBIAN_FRONTEND=noninteractive \
    TZ=America/Sao_Paulo

# Atualiza o sistema e instala Ansible, Git, Nano, Net-Tools, SSH, iproute2, e iputils-ping
RUN apt-get update && \
    apt-get install -y software-properties-common ansible git nano net-tools iproute2 iputils-ping tzdata openssh-client && \
    apt-get clean

# Adicionar suporte ao SSH
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh

# Adicionar a chave privada SSH durante o build
ARG SSH_PRIVATE_KEY
RUN echo "$SSH_PRIVATE_KEY" > /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa

# Adicionar o GitLab ao arquivo known_hosts para evitar prompts de verificação
RUN ssh-keyscan gitlab.com >> /root/.ssh/known_hosts

# Define o diretório de trabalho
WORKDIR /ansible

# Copia os scripts Ansible para o contêiner
COPY . .

# Define o comando padrão
CMD ["bash"]
