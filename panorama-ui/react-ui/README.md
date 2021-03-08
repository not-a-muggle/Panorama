Running React UI app

1. Clone the repo
git clone https://github.com/airavata-courses/Panorama.git

2. Navigate to panorama-ui folder
cd react-ui

3. Install docker on your local machine
For Windows10: https://docs.docker.com/docker-for-windows/install/
For Mac: https://docs.docker.com/docker-for-mac/install/
For Ubuntu: https://docs.docker.com/engine/install/ubuntu/

3. Deploy application on docker container
a) Build docker image
sudo docker build . -t react-ui:v1

b) Verify the image
sudo docker images 

c) Run the container
sudo docker run -p 8000:80 react-ui:v1

d) Verify running container using below command
sudo docker ps

e) Verify the running container in the browser
http://localhost:8000/

