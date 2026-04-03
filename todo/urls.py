from django.urls import path
from .views import TodoListCreateView, TodoDetailView, RegisterView, CurrentUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('todos/', TodoListCreateView.as_view(), name='todo-list-create'),
    path('todos/<int:todo_id>/', TodoDetailView.as_view(), name='todo-detail'),
    path('users/me/', CurrentUserView.as_view(), name='users-me'),
]