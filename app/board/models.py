from datetime import date

from django.core.exceptions import ValidationError
from django.db import models
from model_utils.managers import InheritanceManager
from users.models import NewUser


class Board(models.Model):
  """Board that contain all cards"""

  name = models.CharField(max_length=256)
  color = models.CharField(max_length=8, default="primary")
  use_color = models.BooleanField(default=False)
  owner_id = models.ForeignKey(NewUser, on_delete=models.CASCADE, blank=True, null=True)

  def __str__(self):
    return self.name


class Card(models.Model):
  """Base card"""
  board_id = models.ForeignKey(Board, on_delete=models.CASCADE, blank=True, null=True)
  owner_id = models.ForeignKey(NewUser, on_delete=models.CASCADE, blank=True, null=True)
  created_at  = models.DateTimeField(auto_now_add=True, blank=True)
  
  objects = InheritanceManager()
  
  

class TextCard(Card):
  name = models.CharField(max_length=2500)

  def __str__(self):
    return "%s - %s " % (self.id, self.name)
  


class ProgressCard(Card):
  """Number card with progress"""

  name = models.CharField(max_length=2500)
  current = models.IntegerField(default=0)
  total = models.IntegerField(default=0)
  has_limit = models.BooleanField(default=True)

  def __str__(self):
    return "%s - %s " % (self.id, self.name)
  

class TasksCard(Card):
  """Todo card"""

  name = models.CharField(max_length=2500)

  def __str__(self):
    return "%s - %s " % (self.id, self.name)
  
class HabitCard(Card):
  """Habits card"""

  name = models.CharField(max_length=256)

  def __str__(self):
    return "%s - %s " % (self.id, self.name)

# Addition tasks cards
class Todo(models.Model):
  task_card_id = models.ForeignKey(TasksCard, on_delete=models.CASCADE)
  name = models.CharField(max_length=256)
  completed = models.BooleanField(default=False)
  owner_id = models.ForeignKey(NewUser, on_delete=models.CASCADE,blank=True, null=True)

class HabitDay(models.Model):
  habit_card_id = models.ForeignKey(HabitCard, on_delete=models.CASCADE)
  start_week = models.DateField(null=False)
  days = models.CharField(max_length=7, blank=True, null=True)

  def save(self, *args, **kwargs):
    if date.weekday(self.start_week) != 0:
        raise ValidationError('Week day must start from monday')
    else:
        super(HabitDay, self).save(*args, **kwargs)

  class Meta:
    unique_together =('habit_card_id', 'start_week')
