build-dev:
	docker-compose -p rr-container -f docker-compose.dev.yaml build 

run-dev: 
	docker-compose -p rr-container -f docker-compose.dev.yaml up -d

build-prod:
	docker-compose -p rr-container -f docker-compose.yaml build 
	
run-prod:
	docker-compose -p rr-container -f docker-compose.yaml up -d