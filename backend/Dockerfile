FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      python3 \
      python3-pip \
      python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app
COPY ./ /app
RUN pip install -Ur ./requirements.txt --no-cache && \
    pip install -e .

ENV FLASK_APP=panel_dashboard.flask_app