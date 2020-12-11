from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import TodoViewSet


todo_list = TodoViewSet.as_view({"get": "list", "post": "create"})

todo_detail = TodoViewSet.as_view(
    {"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}
)

urlpatterns = format_suffix_patterns(
    [
        path("todos/", todo_list, name="todo-list"),
        path("todos/<int:pk>/", todo_detail, name="todo-detail"),
    ]
)
