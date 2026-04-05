from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Todo

User = get_user_model()

class TodoSerializer(serializers.ModelSerializer):
    owner_id = serializers.IntegerField(source='owner.id', read_only=True)
    owner_username = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed', 'owner_id', 'owner_username']
        read_only_fields = ['id']


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
        read_only_fields = ["id"]

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
        fields = ['id', 'username', 'is_staff']
        read_only_fields = ['id', 'is_staff']