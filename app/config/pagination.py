from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response


class CustomPagination(LimitOffsetPagination):
    def get_paginated_response(self, data):
        headers = {}
        headers['Pagination-Total-Count'] = self.count
        headers['Pagination-Limit'] = self.limit
        headers['Pagination-Offset'] = self.offset
        
        return Response(data, headers=headers)
