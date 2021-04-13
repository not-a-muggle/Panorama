FROM python:3.8.8-buster

WORKDIR /image-service
EXPOSE 30300
RUN useradd -ms /bin/bash admin

COPY . .
RUN pip install --force-reinstall -r requirements.txt
RUN chown -R admin:admin /image-service
RUN chmod 755 /image-service
USER admin
# RUN pip install -r requirements.txt
CMD ["python", "-u" ,"server.py"]
