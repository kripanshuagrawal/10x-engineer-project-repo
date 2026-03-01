# Use the official Python 3.11 slim image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt into the container
COPY backend/requirements.txt .

# Install the dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application code to the container
COPY backend/ /app/

# Expose the port that the FastAPI app runs on (default is 8000)
EXPOSE 8000

# Define environment variable
ENV PYTHONUNBUFFERED=1

# Set the command to run the application
CMD ["python", "main.py"]
