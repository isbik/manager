from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (BoardView, CardView, HabitCardView, HabitDayDetailView,
                    HabitDayListView, ProgressCardView, TasksCardView,
                    TextCardView, TodoDetailApiView, TodoListView)

app_name = "board"


router = DefaultRouter()
router.register('text-card', TextCardView)
router.register('progress-card', ProgressCardView)
router.register('tasks-card', TasksCardView)
router.register('habit-card', HabitCardView)
router.register('boards', BoardView)
router.register('card', CardView)


urlpatterns = router.urls

urlpatterns += [

    path('todo/', TodoListView.as_view()),
    path('todo/<int:pk>/', TodoDetailApiView.as_view()),
    
    path('habit-day/', HabitDayListView.as_view()),
    path('habit-day/<int:pk>/', HabitDayDetailView.as_view()),

]
