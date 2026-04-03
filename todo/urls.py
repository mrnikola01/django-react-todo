from django.urls import path
from .views import TodoListCreateView, TodoDetailView

urlpatterns = [
    path('todos/', TodoListCreateView.as_view()),
    path('todos/<int:todo_id>/', TodoDetailView.as_view())
]