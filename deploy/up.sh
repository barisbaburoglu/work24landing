#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${1:-$ROOT/deploy/.env}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Env dosyası yok. VM'de:"
  echo "  cd ~/work24landing"
  echo "  cp deploy/.env.example deploy/.env"
  exit 1
fi

cd "$ROOT"
docker compose --env-file "$ENV_FILE" up -d --build
docker compose --env-file "$ENV_FILE" ps
