from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import TodoSerializer, RegisterSerializer, UserSerializer
from .services import create_todo, update_todo, delete_todo
from .selectors import get_all_todos, get_todo_by_id


class TodoListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        todos = get_all_todos()
        return Response(TodoSerializer(todos, many=True).data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            todo = create_todo(
                validated_data=serializer.validated_data,
                user=request.user
            )
            return Response(TodoSerializer(todo).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoDetailView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def check_ownership(self, todo, user):
        if todo.owner != user and not user.is_staff:
            return Response(
                {"error": "Not allowed"},
                status=status.HTTP_403_FORBIDDEN
            )
        return None

    def get(self, request, todo_id):
        todo = get_todo_by_id(todo_id=todo_id)
        return Response(TodoSerializer(todo).data)

    def put(self, request, todo_id):
        todo = get_todo_by_id(todo_id=todo_id)
        denial = self.check_ownership(todo, request.user)
        if denial:
            return denial

        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            updated = update_todo(todo=todo, data=serializer.validated_data)
            return Response(TodoSerializer(updated).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, todo_id):
        todo = get_todo_by_id(todo_id=todo_id)
        denial = self.check_ownership(todo, request.user)
        if denial:
            return denial

        serializer = TodoSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            updated = update_todo(todo=todo, data=serializer.validated_data)
            return Response(TodoSerializer(updated).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, todo_id):
        todo = get_todo_by_id(todo_id=todo_id)
        denial = self.check_ownership(todo, request.user)
        if denial:
            return denial

        delete_todo(todo=todo)
        return Response(status=status.HTTP_204_NO_CONTENT)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "id": user.id,
                    "username": user.username,
                    "message": "User created successfully",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)