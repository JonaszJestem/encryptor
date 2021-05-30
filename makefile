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
	docker exec encryptor-app "yarn seed"
app:
	docker exec -it encryptor-app sh
tests:
	docker-compose exec node yarn test --verbose
tests-e2e:
	docker-compose exec node yarn test:e2e:local --verbose
