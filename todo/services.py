from .models import Todo

def create_todo(*, validated_data: dict, user) -> Todo:
    return Todo.objects.create(**validated_data, owner=user)

def update_todo(*, todo: Todo, data: dict) -> Todo:
    allowed_fields = {'title', 'description', 'completed'}
    for field, value in data.items():
        if field in allowed_fields:
            setattr(todo, field, value)
    todo.save(update_fields=list(data.keys() & allowed_fields))
    return todo

def delete_todo(*, todo: Todo) -> None:
    todo.delete()