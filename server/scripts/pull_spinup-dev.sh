echo CI/CD Script running:
sudo docker rmi $(sudo docker images 'api-ewe-link' -a -q)
sudo docker stop $(sudo docker ps -a -q  --filter ancestor=api-ewe-link)
sudo docker rm $(sudo docker ps -a -q  --filter ancestor=api-ewe-link)
sudo docker build . -t api-ewe-link
sudo docker run -d -p 4006:4006 api-ewe-link
sudo docker ps  