.PHONY: up down logs test migrate psql clean help

# Load environment variables
include .env
export

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Start all services
	docker compose up --build -d

down: ## Stop all services
	docker compose down

logs: ## Follow logs from all services
	docker compose logs -f

logs-backend: ## Follow backend logs only
	docker compose logs -f backend

logs-client: ## Follow client logs only
	docker compose logs -f client

test: ## Run backend tests
	cd backend && ./mvnw test

test-integration: ## Run integration tests with Testcontainers
	cd backend && ./mvnw verify

migrate: ## Run database migrations
	docker compose exec backend ./mvnw flyway:migrate

psql: ## Connect to PostgreSQL
	docker compose exec db psql -U $(DB_USER) -d $(DB_NAME)

clean: ## Clean up containers and volumes
	docker compose down -v
	rm -rf backend/target
	rm -rf client/dist client/node_modules

restart: ## Restart all services
	docker compose restart

backend-shell: ## Open shell in backend container
	docker compose exec backend sh

client-shell: ## Open shell in client container
	docker compose exec client sh

build: ## Build without starting
	docker compose build
