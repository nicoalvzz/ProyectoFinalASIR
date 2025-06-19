#!/bin/bash

# Limpia reglas anteriores
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X

# Política por defecto: DROP todo
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Permitir tráfico de loopback
iptables -A INPUT -i lo -j ACCEPT

# Permitir tráfico establecido y relacionado
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# ✅ Permitir puertos necesarios
iptables -A INPUT -p tcp --dport 22 -j ACCEPT     # SSH
iptables -A INPUT -p tcp --dport 80 -j ACCEPT     # HTTP
iptables -A INPUT -p tcp --dport 443 -j ACCEPT    # HTTPS
iptables -A INPUT -p tcp --dport 8080 -j ACCEPT   # Desarrollo (opcional)
iptables -A INPUT -p tcp --dport 3000 -j ACCEPT   # API
iptables -A INPUT -p tcp --dport 3001 -j ACCEPT   # Frontend
iptables -A INPUT -p tcp --dport 27017 -j ACCEPT  # MongoDB

# (Opcional) permitir ping
iptables -A INPUT -p icmp --icmp-type 8 -j ACCEPT

# Guardar reglas (dependiendo del sistema)
if command -v netfilter-persistent >/dev/null 2>&1; then
    netfilter-persistent save
elif command -v iptables-save >/dev/null 2>&1; then
    iptables-save > /etc/iptables/rules.v4
fi

echo "✅ Reglas de firewall aplicadas."
