FROM openjdk:17-jdk

ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME

COPY target/employment-0.0.1-SNAPSHOT.jar .

ADD src/main/resources/static/images application/images

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "employment-0.0.1-SNAPSHOT.jar"]