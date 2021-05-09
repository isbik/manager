#!/bin/bash
#
# #This is a script that greets the world
# Usage: ./hello

python manage.py makemigrations board
python manage.py migrate board

python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser
