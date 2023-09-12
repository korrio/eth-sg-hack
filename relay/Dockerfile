FROM python:3.9

COPY . /app
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "main.py"]
# Set the command to run your Celery worker
# CMD celery -A main worker --loglevel=info
