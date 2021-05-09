# Register your models here.
from django.contrib import admin

from .models import Board, Card, HabitCard, ProgressCard, TextCard

admin.site.register(Board)
admin.site.register(Card)
admin.site.register(TextCard)
admin.site.register(ProgressCard)
admin.site.register(HabitCard)


