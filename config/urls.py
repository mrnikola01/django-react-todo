from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from todo.views import TodoListCreateView, TodoDetailView, RegisterView, CurrentUserView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/todos/', TodoListCreateView.as_view(), name='todo-list-create'),
    path('api/todos/<int:todo_id>/', TodoDetailView.as_view(), name='todo-detail'),
    path('api/users/me/', CurrentUserView.as_view(), name='users-me'),
]