# Canteen Menu

A small Canteen Menu stack: Nginx in front of a Node.js API, backed by PostgreSQL. A GitHub Actions workflow starts the whole stack on a Linux runner and checks it through Nginx.

Run it locally with Docker Compose v2:

```bash
export DB_PASSWORD=local-practice-only
docker compose up -d --build --wait --wait-timeout 120
curl http://127.0.0.1:8094/api/menu
docker compose down
```

`DB_PASSWORD` is a throwaway practice value. This stack holds dummy data only. Do not use a real password and do not deploy it.
