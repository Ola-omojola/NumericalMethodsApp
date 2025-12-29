# NumericalMethodsApp

A full-stack web application for solving numerical methods problems, built with Django REST Framework and React + TypeScript.

## Features

- **Newton-Raphson Method**: Find roots of equations
- **Numerical Integration**: Calculate definite integrals
- **Differential Equations**: Solve ODEs using various methods
- **Interactive UI**: Built with React and TypeScript
- **Real-time Calculations**: Powered by NumPy and SymPy

## Tech Stack

### Backend

- Django 5.2.8
- Django REST Framework
- NumPy
- SymPy
- SQLite (Development) / PostgreSQL (Production)

### Frontend

- React 19
- TypeScript
- Vite
- Axios
- KaTeX (Math rendering)
- React Router

## Local Development

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

Backend will run on http://127.0.0.1:8000/

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on http://localhost:5173/

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## License

MIT License
