build-dev:
	docker build -t react-app .

build-local:
	docker build --tag react-app-production:local \
		--build-arg CADDYFILE=Caddyfile.local \
		--build-arg BASE_URL=http://localhost:8000 \
		-f Dockerfile.prod .




build-production:
	docker build \
		-t react-app-production:production \
		--build-arg CADDYFILE=Caddyfile.prod \
		--build-arg BASE_URL=https://mern.mysuperwebsite.com \
		-f Dockerfile.prod .



