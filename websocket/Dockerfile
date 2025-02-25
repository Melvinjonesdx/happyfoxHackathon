FROM python
COPY . /app
WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8765
CMD [ "python" ,"websocket_server.py" ]


