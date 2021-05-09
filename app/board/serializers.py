from rest_framework import serializers

from board.models import (Board, Card, HabitCard, HabitDay, ProgressCard,
                          TasksCard, TextCard, Todo)
from board.service import DynamicFieldsModelSerializer


class BoardSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    cards_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Board
        fields ='__all__'
class TextCardSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = TextCard
        fields = ('__all__')    
        

class ProgressCardSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = ProgressCard
        fields = '__all__'    

class TasksCardSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = TasksCard
        fields = '__all__'    
class TodoSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'    
        
class HabitCardSerializer(DynamicFieldsModelSerializer, serializers.ModelSerializer):
    class Meta:
        model = HabitCard
        fields = '__all__'    

class HabitDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitDay
        fields = '__all__'    




class CardSerializer(serializers.ModelSerializer):

    def to_representation(self, value):
        if isinstance(value, TextCard):
            return { **TextCardSerializer(value).data, "type": 1 }
        elif isinstance(value, ProgressCard):
            return { **ProgressCardSerializer(value).data, "type": 2 }
        elif isinstance(value, TasksCard):
            return { **TasksCardSerializer(value).data, "type": 3 }
        elif isinstance(value, HabitCard):
            return { **HabitCardSerializer(value).data, "type": 4 }
        return {}
    class Meta:
        model = Card
        fields = '__all__'    
