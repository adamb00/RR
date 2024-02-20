### DEV

build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yaml up

### LOCAL (prod config)

build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-prod.yaml up
		

### PROD

build-production:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build	

run-production:
	ENV=production docker-compose -f docker-compose-prod.yaml up
	
SSH_STRING:=root@68.183.217.16

ssh:
	ssh -i rr-key $(SSH_STRING)

# copy-files:
# 	scp -i rr-key -r /Users/borsodiadam/Documents/Robi_app $(SSH_STRING):/~
copy-files:
	scp -i rr-key -r ./* $(SSH_STRING):/~