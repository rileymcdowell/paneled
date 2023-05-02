### Build the static frontend 
FROM alpine:3.17.3 as frontend-builder

RUN apk add --no-cache npm && \
    mkdir /build

COPY /frontend/package* /build
WORKDIR /build
RUN npm ci

COPY frontend/src /build/src
COPY frontend/public /build/public
RUN npm run build

### Build the main image
FROM python:3.10-alpine

# Create a directory for the app to live in
RUN mkdir /app
WORKDIR /app
    
# Install dependencies
COPY server/requirements.txt /app
RUN pip install -Ur requirements.txt --no-cache

# Install the app itself
COPY server/setup.py /app
COPY server/panel_dashboard /app/panel_dashboard
RUN pip install -e .

# Add startup scripts
COPY /server/start_server.sh /app
COPY /server/start_worker.sh /app

# Add a copy of the statically compiled frontend.
COPY --from=frontend-builder /build/build /app/panel_dashboard/frontend

ENV FLASK_APP=panel_dashboard.flask_app
ENV PATH=/app:$PATH
# Default to starting up the API server
CMD start_server.sh

# Add tini so the container responds accurately to signals
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]