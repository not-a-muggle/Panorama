FROM python:3.8.8-buster

WORKDIR /image-service
EXPOSE 30300
COPY . .

RUN pip install -r requirements.txt
CMD ["python", "-u" ,"server.py"]
