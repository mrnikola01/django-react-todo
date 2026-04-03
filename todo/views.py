from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import TodoSerializer, RegisterSerializer
from .services import create_todo, update_todo, delete_todo
from .selectors import get_all_todos, get_todo_by_id

class TodoListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]


    def get(self, request):
        todos = get_all_todos()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        
        if serializer.is_valid():
            todo = create_todo(serializer.validated_data)
            output_serializer = TodoSerializer(todo)

            return Response(output_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TodoDetailView(APIView):   
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, todo_id):
        todo = get_todo_by_id(todo_id)

        if not todo:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
            
        return Response(TodoSerializer(todo).data)
    
    def put(self, request, todo_id):
        todo = get_todo_by_id(todo_id)

        if not todo:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TodoSerializer(data=request.data)
        
        if serializer.is_valid():
            updated_todo = update_todo(todo, serializer.validated_data)
            output_serializer = TodoSerializer(updated_todo)
            return Response(output_serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, todo_id):
        todo = get_todo_by_id(todo_id)

        if not todo:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TodoSerializer(data=request.data, partial=True)
        
        if serializer.is_valid():
            updated_todo = update_todo(todo, serializer.validated_data)
            output_serializer = TodoSerializer(updated_todo)
            return Response(output_serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, todo_id):
        todo = get_todo_by_id(todo_id)

        if not todo:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        
        delete_todo(todo)
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