FROM python:3
WORKDIR /app
COPY req.txt .
RUN pip install --no-cache-dir -r req.txt
RUN python migrate.py
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
