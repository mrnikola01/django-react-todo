from .models import Todo

def create_todo(validated_data, user):
    return Todo.objects.create(
        title=validated_data.get('title'),
        description=validated_data.get('description', ''),
        completed=validated_data.get('completed', False),
        owner=user 
    )

def update_todo(todo, data):
    todo.title = data.get('title', todo.title)
    todo.description = data.get('description', todo.description)
    todo.completed = data.get('completed', todo.completed)
    todo.save()
    return todo

def delete_todo(todo):
    todo.delete()

    