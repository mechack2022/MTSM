# Deployment Configuration

This directory contains deployment-specific configurations.

## Files

- `docker-compose.prod.yml` - Production overrides for docker-compose
- Future: Kubernetes manifests, Terraform configs, etc.

## Usage

### Local Development
```bash
docker compose up
```

### Production
```bash
docker compose -f docker-compose.yml -f deploy/docker-compose.prod.yml up -d
```

## Environment Variables

Ensure all required environment variables are set in production:
- `DB_PASSWORD` - Strong database password
- `JWT_SECRET` - Long random string for JWT signing
- All variables documented in `.env.example`
