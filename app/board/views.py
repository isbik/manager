
from django.db.models import Count, query
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, viewsets

from board.service import CardFilter, HabitDayFilter, NoteFilter, TodoFilter

from .models import (Board, Card, HabitCard, HabitDay, ProgressCard, TasksCard,
                     TextCard, Todo)
from .serializers import (BoardSerializer, CardSerializer, HabitCardSerializer,
                          HabitDaySerializer, ProgressCardSerializer,
                          TasksCardSerializer, TextCardSerializer,
                          TodoSerializer)


class BoardView(viewsets.ModelViewSet):
    serializer_class = BoardSerializer
    queryset = Board.objects.annotate(
            cards_count=Count('card'),
    )
    
    def get_queryset(self):
        return super().get_queryset()


class CardView(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.order_by('-created_at').select_subclasses()
    filter_backends= ( DjangoFilterBackend, )
    filterset_class = CardFilter

class TextCardView(viewsets.ModelViewSet):
    queryset = TextCard.objects.all()
    serializer_class = TextCardSerializer
    filter_backends= ( DjangoFilterBackend, )
    filterset_class = NoteFilter


class ProgressCardView(viewsets.ModelViewSet):
    queryset = ProgressCard.objects.all()
    serializer_class = ProgressCardSerializer

class TasksCardView(viewsets.ModelViewSet):
    queryset = TasksCard.objects.all()
    serializer_class = TasksCardSerializer
class HabitCardView(viewsets.ModelViewSet):
    queryset = HabitCard.objects.all()
    serializer_class = HabitCardSerializer


class TodoListView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    
    filter_backends= ( DjangoFilterBackend, )
    filterset_class = TodoFilter

class TodoDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    
class HabitDayListView(generics.ListCreateAPIView):
    queryset = HabitDay.objects.all()
    serializer_class = HabitDaySerializer
    
    filter_backends= ( DjangoFilterBackend, )
    filterset_class = HabitDayFilter
    
class HabitDayDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HabitDay.objects.all()
    serializer_class = HabitDaySerializer






    
