---

# Django + React Todo

A full-stack Todo application. This project features a decoupled architecture with a **Django 6** REST API and a **React 19** frontend powered by **Vite**.

## Tech Stack

### Backend

- **Framework:** [Django 6.0](https://www.djangoproject.com/)
- **API:** [Django REST Framework (DRF)](https://www.django-rest-framework.org/)
- **Authentication:** [SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/) (JSON Web Tokens)
- **Package Manager:** [uv](https://github.com/astral-sh/uv) (Extremely fast Python package installer)
- **CORS:** [django-cors-headers](https://github.com/adamchainz/django-cors-headers)

### Frontend

- **Library:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Components:** [Material UI (MUI)](https://mui.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)

---

## Project Setup

### 1. Backend Setup

Navigate to the root directory (`django-react-todo`):

```bash
# Create a virtual environment using uv
uv venv .venv

# Activate the environment

## Windows:
.venv\Scripts\activate

## Mac/Linux:
source .venv/bin/activate

# Install dependencies
uv pip install -r requirements.txt

# Create migration files based on your models
python manage.py makemigrations

# Apply migrations to create the database schema
python manage.py migrate

# Start the server
python manage.py runserver
```

_The API will be available at: `http://127.0.0.1:8000`_

### 2. Frontend Setup

Open a new terminal window:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

_The UI will be available at: `http://localhost:5173`_

---

### 3. Environment Variables (Frontend)

To allow the React frontend to communicate with the Django API, you must configure the environment variables within the `frontend/` directory:

1. Navigate to the `frontend/` folder.
2. Create a file named `.env`.
3. Add the following line (adjust the port if your Django server uses a different one):

```ini
VITE_API_URL=http://127.0.0.1:8000
```

> **Note:** Vite requires all environment variables to be prefixed with `VITE_` to be accessible in the client-side code via `import.meta.env.VITE_API_URL`.

---

## Authentication Flow

The application uses **JWT** for secure communication and supports user registration:

1. **Registration:** New users can create an account via the `/api/register/` endpoint.
2. **Login:** Users authenticate via the `/api/login/` endpoint to receive an `access` and `refresh` token.
3. **Authorization:** The frontend stores the `access` token and includes it in the header for protected requests:
   `Authorization: Bearer <your_access_token>`
4. **Token Refresh:** When the access token expires, the `/api/token/refresh/` endpoint is used to obtain a new one.

---

## Folder Structure

```text
django-react-todo/
├── config/             # Django project settings & URL routing
├── todo/               # Main Django app (Models, Views, Serializers)
├── frontend/           # React + Vite source code
│   ├── src/            # Components, Hooks, and Styles
│   └── package.json    # Frontend dependencies
├── .venv/              # Virtual environment (ignored by git)
├── manage.py           # Django CLI
└── requirements.txt    # Python dependencies list
```

---

## Development Notes

- **CORS Configuration:** If you change the frontend port, update `CORS_ALLOWED_ORIGINS` in `config/settings.py`.
- **Package Management:** When adding new Python packages, use `uv pip install <package>` and update the file with `uv pip freeze > requirements.txt`.
- **API Configuration:** The application now dynamically pulls the `BASE_URL` from the `.env` file. This ensures that the backend address can be changed (e.g., for deployment) without modifying the source code.

---
