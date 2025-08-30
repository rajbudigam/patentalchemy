up:
	@echo "Starting API and Web (two terminals recommended)"
	@cd apps/api && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload & \
	cd apps/web && npm run dev

api:
	cd apps/api && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

web:
	cd apps/web && npm run dev
