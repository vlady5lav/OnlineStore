cd ..
docker-compose -f docker-compose.localdev.yml build --no-cache
docker-compose -f docker-compose.localdev.yml up -d
pause
