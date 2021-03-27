#! /bin/bash
cd /var/lib/jenkins/workspace/Build_ReactUI/panorama-ui/react-ui
chmod 755 build.sh
echo "Building dockerfile for react-ui"
echo qwerty | sudo -S docker build -t  react-ui:v9 .
echo qwerty | sudo -S docker run -p 8006:80 react-ui:v9
