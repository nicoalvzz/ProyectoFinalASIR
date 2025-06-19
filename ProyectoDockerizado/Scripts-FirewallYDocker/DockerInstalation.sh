#!/bin/bash

# Salir al encontrar un error
set -e

echo "Actualizando paquetes..."
sudo apt update -y && sudo apt upgrade -y

echo "Instalando dependencias necesarias..."
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

echo "Agregando la clave GPG de Docker..."
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "Agregando el repositorio de Docker a las fuentes de apt..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "Actualizando la lista de paquetes nuevamente..."
sudo apt update

echo "Instalando Docker CE, CLI y Containerd..."
sudo apt install -y docker-ce docker-ce-cli containerd.io

echo "Instalando Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/download/v2.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Verificando las versiones instaladas..."
docker --version
docker-compose --version

echo "Habilitando e iniciando el servicio Docker..."
sudo systemctl enable docker
sudo systemctl start docker

echo "✅ Instalación completa. Docker y Docker Compose están listos para usar."
