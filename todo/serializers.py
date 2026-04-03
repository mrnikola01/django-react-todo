from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
    write_only=True,
    min_length=6,
    error_messages={
        "min_length": "Password must be at least 6 characters long"
    },
)

    class Meta:
        model = User
        fields = ["id", "username", "password"]

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email'] 