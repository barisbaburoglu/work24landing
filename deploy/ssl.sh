#!/usr/bin/env bash
set -euo pipefail

# VM'de, host Nginx (WebSiteApp) 80'i bırakınca çalışır.
# Cloudflare turuncu proxy varsa geçici DNS only (gri bulut) yapın.

CERT_DIR="${CERT_DIR:-/home/info/certbot/conf}"

mkdir -p "$CERT_DIR"

docker run --rm -p 80:80 \
  -v "$CERT_DIR:/etc/letsencrypt" \
  certbot/certbot certonly --standalone \
  -d work24.io -d www.work24.io \
  --agree-tos --register-unsafely-without-email --non-interactive

ls -l "$CERT_DIR/live/work24.io"
