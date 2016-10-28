FROM harsha149/galogstash:latest

RUN apt-get update

RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

RUN sudo apt-get install -y nodejs

RUN apt-get install -y vim

COPY config/visApp-fff25e8af4ff.p12 /etc/logstash/conf.d

COPY config/logstash.conf /etc/logstash/conf.d

COPY config/template.json /etc/logstash/conf.d

COPY config/webApp /etc/logstash/conf.d/webApp