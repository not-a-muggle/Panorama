FROM openjdk:11
FROM maven AS build

EXPOSE 50065
WORKDIR /session-log-service

COPY . .

RUN mvn clean compile assembly:single

ENTRYPOINT [ "java", "-jar", "target/session-log-service-1.0-SNAPSHOT-jar-with-dependencies.jar"]