.DEFAULT_GOAL := start

start:
	docker-compose up --build -d
stop:
	docker-compose stop
restart:
	make stop && make start
log:
	docker-compose logs -f
seed:
	docker exec encryptor-app yarn seed
