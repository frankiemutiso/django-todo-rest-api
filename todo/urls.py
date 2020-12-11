from django.contrib.auth.models import User
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import TodoViewSet, UserViewSet, api_root


todo_list = TodoViewSet.as_view({"get": "list", "post": "create"})

todo_detail = TodoViewSet.as_view(
    {"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}
)

user_list = UserViewSet.as_view({"get": "list"})

user_detail = UserViewSet.as_view({"get": "retrieve"})

urlpatterns = format_suffix_patterns(
    [
        path("", api_root),
        path("todos/", todo_list, name="todo-list"),
        path("todos/<int:pk>/", todo_detail, name="todo-detail"),
        path("users/", user_list, name="user-list"),
        path("users/<int:pk>/", user_detail, name="user-detail"),
    ]
)


urlpatterns += [path("api-auth", include("rest_framework.urls"))]
