
# run:
# 	docker-compose -f docker-compose.yaml up


run:
	docker-compose down && docker-compose build --no-cache && docker-compose up

