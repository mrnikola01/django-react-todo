from .models import Todo

def get_all_todos():
    return Todo.objects.all()

def get_todo_by_id(todo_id):
    return Todo.objects.filter(id=todo_id).first()
