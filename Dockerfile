# Use an official NVIDIA CUDA-compatible base image
FROM nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04

# Install required system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    libcurl4-openssl-dev \
    libprotobuf-dev \
    libomp-dev \
    protobuf-compiler \
    libopenblas-dev \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Install ONNX Runtime with GPU support


# Install Python dependencies
WORKDIR /ai
COPY requirements.txt .
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -r requirements.txt

# Copy your application code into the container
COPY . /ai

# Create a non-root user with a specific UID and add permission to access the /AI folder
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /ai
USER appuser

# Expose a port if your application requires it
EXPOSE 8000

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["python3", "main.py"]
