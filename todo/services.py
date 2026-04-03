from .models import Todo

def create_todo(data):
    return Todo.objects.create(
        title=data.get('title'),
        description=data.get('description', ''),
        completed=data.get('completed', False)
    )

def update_todo(todo, data):
    todo.title = data.get('title', todo.title)
    todo.description = data.get('description', todo.description)
    todo.completed = data.get('completed', todo.completed)
    todo.save()
    return todo

def delete_todo(todo):
    todo.delete()