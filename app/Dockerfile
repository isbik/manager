# pull official base image
FROM python:3


ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY ./requirements.txt /requirements.txt

RUN apt-get update \
  && apt-get install -y --no-install-recommends gcc \
  && rm -rf /var/lib/apt/lists/* 

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN mkdir /app
WORKDIR /app
COPY . /app
