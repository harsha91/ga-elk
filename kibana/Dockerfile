FROM kibana:latest

RUN apt-get update && apt-get install -y netcat

RUN kibana plugin --install elastic/sense

COPY entrypoint.sh /tmp/entrypoint.sh
RUN chmod +x /tmp/entrypoint.sh

COPY config/ /opt/kibana/config/

CMD ["/tmp/entrypoint.sh"]

RUN  /opt/kibana/bin/kibana plugin -i kibi_wordcloud_vis -u https://github.com/sirensolutions/kibi_wordcloud_vis/raw/4.5.3/target/kibi_wordcloud_vis-4.5.3.zip

# Kibana alerting
RUN /opt/kibana/bin/kibana plugin --install kaae -u https://github.com/elasticfence/kaae/releases/download/snapshot/kaae-latest.tar.gz

#HeatMap
RUN /opt/kibana/bin/kibana plugin -i heatmap -u https://github.com/stormpython/heatmap/archive/1.0.0.zip

#TileMap
RUN /opt/kibana/bin/kibana plugin -i vectormap -u https://github.com/stormpython/vectormap/archive/master.zip

#RadarChart
RUN /opt/kibana/bin/kibana plugin -i kibi_radar_vis -u  https://github.com/sirensolutions/kibi_radar_vis/archive/4.5.3.zip

#line 
RUN /opt/kibana/bin/kibana plugin -i line-sg -u https://github.com/sbeyn/kibana-plugin-line-sg/archive/master.zip

#Gauge
RUN /opt/kibana/bin/kibana plugin -i gauge -u  https://github.com/sbeyn/kibana-plugin-gauge-sg/archive/master.zip