#!/bin/bash

echo "export DATABASE_URL=postgres://postgres@${database_ip}:5432/saas-client" >> /etc/environment

sudo dnf update
sudo dnf install -y docker amazon-ecr-credential-helper

sudo mkdir -p /etc/docker

cat <<'EOF' | sudo tee /etc/docker/daemon.json
{
  "debug": false,
  "experimental": false,
  "exec-opts": ["native.cgroupdriver=systemd"],
  "userland-proxy": false,
  "live-restore": true,
  "log-level": "warn",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
  }
}
EOF

sudo usermod -aG docker $USER
sudo systemctl enable --now docker
sudo systemctl status docker

