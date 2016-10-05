FROM kibana:latest

RUN apt-get update && apt-get install -y netcat

RUN kibana plugin --install elastic/sense

COPY entrypoint.sh /tmp/entrypoint.sh
RUN chmod +x /tmp/entrypoint.sh

COPY config/ /opt/kibana/config/

CMD ["/tmp/entrypoint.sh"]
