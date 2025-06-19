#!/bin/bash

# Definir variáveis
SOURCE_DIR="./files/Patchmanager"
DEST_DIR="/tmp"
SERVERINFO_FILE="serverinfo.json"
UEMS_FILE="UEMS_LinuxAgent.bin"

# Verificar se o arquivo serverinfo.json existe na origem
if [ ! -f "$SOURCE_DIR/$SERVERINFO_FILE" ]; then
  echo "Erro: O arquivo $SERVERINFO_FILE não foi encontrado na pasta $SOURCE_DIR"
  exit 1
fi

# Verificar se o arquivo UEMS_LinuxAgent.bin existe na origem
if [ ! -f "$SOURCE_DIR/$UEMS_FILE" ]; then
  echo "Erro: O arquivo $UEMS_FILE não foi encontrado na pasta $SOURCE_DIR"
  exit 1
fi

# Copiar arquivos para /tmp
echo "Copiando $UEMS_FILE para $DEST_DIR"
cp "$SOURCE_DIR/$UEMS_FILE" "$DEST_DIR/$UEMS_FILE"
chmod 0755 "$DEST_DIR/$UEMS_FILE"  # Torna o arquivo executável

echo "Copiando $SERVERINFO_FILE para $DEST_DIR"
cp "$SOURCE_DIR/$SERVERINFO_FILE" "$DEST_DIR/$SERVERINFO_FILE"
chmod 0755 "$DEST_DIR/$SERVERINFO_FILE"  # Torna o arquivo executável

# Verificar se o arquivo serverinfo.json foi copiado para /tmp
if [ ! -f "$DEST_DIR/$SERVERINFO_FILE" ]; then
  echo "Erro: O arquivo $SERVERINFO_FILE não foi copiado corretamente para $DEST_DIR."
  exit 1
fi

# Verificar se o arquivo UEMS_LinuxAgent.bin foi copiado para /tmp
if [ ! -f "$DEST_DIR/$UEMS_FILE" ]; then
  echo "Erro: O arquivo $UEMS_FILE não foi copiado corretamente para $DEST_DIR."
  exit 1
fi

# Executar UEMS com permissões máximas
echo "Executando $UEMS_FILE"
timeout 15 "$DEST_DIR/$UEMS_FILE"

# Exibir o resultado do comando
if [ $? -eq 0 ]; then
  echo "Comando $UEMS_FILE executado com sucesso."
else
  echo "Erro: O comando $UEMS_FILE falhou."
  exit 1
fi
