FROM python:3.7-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt
COPY . ./
EXPOSE 5060
USER bbh:bbh
CMD python server.py
