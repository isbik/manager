from django_filters import rest_framework as filters
from rest_framework import serializers

from board.models import Card, HabitDay, TextCard, Todo


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """
    def __init__(self, *args, **kwargs):
        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)
        
        fields = None
        
        if 'request' in self.context:
            fields = self.context['request'].query_params.get('fields')

        if fields:
            fields = fields.split(',')
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)



class CardFilter(filters.FilterSet):
    unboard = filters.BooleanFilter(field_name='board_id', lookup_expr='isnull')
    class Meta:
        model = Card
        fields = ['board_id','unboard']
class NoteFilter(filters.FilterSet):
    unboard = filters.BooleanFilter(field_name='board_id', lookup_expr='isnull')
    class Meta:
        model = TextCard
        fields = ['board_id','unboard']


class TodoFilter(filters.FilterSet):
    class Meta:
        model = Todo
        fields = ['task_card_id']


class HabitDayFilter(filters.FilterSet):
    class Meta:
        model = HabitDay
        fields = ['start_week', 'habit_card_id']
