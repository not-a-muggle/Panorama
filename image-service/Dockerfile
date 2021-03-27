FROM python:3.8.8-buster

WORKDIR /image-service

COPY . .
EXPOSE 50060
RUN pip install -r requirements.txt
CMD ["python", "server.py"]