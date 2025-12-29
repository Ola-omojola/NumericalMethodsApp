# Deployment Guide for NumericalMethodsApp

Complete guide to deploy your Django + React numerical methods application to production.

## 📋 Prerequisites

- ✅ Code pushed to GitHub
- ✅ GitHub account
- ✅ Render account (or Railway/Vercel)

---

## 🚀 Option 1: Deploy to Render (Recommended)

### Part A: Deploy Django Backend

#### Step 1: Create Render Account

1. Go to [render.com](https://render.com/)
2. Sign up with GitHub
3. Click "New +" → "Web Service"

#### Step 2: Connect Repository

1. Click "Connect GitHub"
2. Select your `NumericalMethodsApp` repository
3. Click "Connect"

#### Step 3: Configure Service

Fill in these settings:

- **Name**: `numericalmethod-api` (or your choice)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: Leave empty (root of repo)
- **Runtime**: `Python 3`
- **Build Command**:
  ```bash
  ./build.sh
  ```
- **Start Command**:
  ```bash
  gunicorn backend.wsgi:application
  ```
- **Instance Type**: Free

#### Step 4: Add Environment Variables

Click "Advanced" → "Add Environment Variable":

| Key              | Value                                             |
| ---------------- | ------------------------------------------------- |
| `SECRET_KEY`     | Generate from [djecrety.ir](https://djecrety.ir/) |
| `DEBUG`          | `False`                                           |
| `ALLOWED_HOSTS`  | `.onrender.com`                                   |
| `DATABASE_URL`   | (Render will auto-create PostgreSQL)              |
| `PYTHON_VERSION` | `3.11.7`                                          |

#### Step 5: Add PostgreSQL Database

1. On your service dashboard, click "New +" → "PostgreSQL"
2. Name it `numericalmethod-db`
3. Select Free tier
4. Click "Create Database"
5. Go back to your web service
6. In "Environment", add:
   - Key: `DATABASE_URL`
   - Value: "Internal Database URL" from your PostgreSQL dashboard

#### Step 6: Deploy

1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Your backend will be live at: `https://numericalmethod-api.onrender.com`

---

### Part B: Deploy React Frontend

#### Option B1: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import your `NumericalMethodsApp` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://numericalmethod-api.onrender.com/api`
7. Click "Deploy"
8. Your frontend will be live at: `https://your-app.vercel.app`

#### Option B2: Deploy Frontend to Netlify

1. Go to [netlify.com](https://netlify.com/)
2. "Add new site" → "Import from Git"
3. Select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add environment variable:
   - `VITE_API_URL` = Your Render backend URL
6. Deploy

---

## 🔧 Post-Deployment Configuration

### Update CORS Settings

After deploying frontend, add its URL to your backend:

1. Go to Render dashboard → Your web service → Environment
2. Update `FRONTEND_URL` variable:
   ```
   https://your-app.vercel.app
   ```
3. Save changes (will trigger re-deploy)

---

## 🚀 Option 2: Deploy to Railway

### Backend + Frontend on Railway

1. Go to [railway.app](https://railway.app/)
2. "New Project" → "Deploy from GitHub repo"
3. Select `NumericalMethodsApp`
4. Railway will auto-detect and deploy both:
   - Django backend
   - React frontend

**Environment Variables** (Add in Railway dashboard):

- `SECRET_KEY`: Generate new key
- `DEBUG`: `False`
- `ALLOWED_HOSTS`: `.railway.app`
- Railway provides PostgreSQL automatically

---

## ✅ Verification Checklist

After deployment, test:

- [ ] Backend API is accessible
- [ ] Frontend loads correctly
- [ ] Can perform Newton-Raphson calculations
- [ ] API calls work (check browser console)
- [ ] No CORS errors
- [ ] All numerical methods function properly

---

## 🐛 Troubleshooting

### Backend Issues

**"Application Error" on Render**

- Check build logs for errors
- Verify all environment variables are set
- Ensure `build.sh` has correct permissions

**"500 Internal Server Error"**

- Check if database migrations ran
- Verify `DATABASE_URL` is set correctly
- Check Render logs: Dashboard → Logs

**"Static files not loading"**

- Run `python manage.py collectstatic` in build
- Check `STATIC_ROOT` setting

### Frontend Issues

**"Failed to fetch" or CORS errors**

- Add frontend URL to backend `CORS_ALLOWED_ORIGINS`
- Check `VITE_API_URL` environment variable
- Verify backend is running

**"API calls failing"**

- Check network tab in browser DevTools
- Verify API endpoint URLs match
- Ensure backend URL is correct in `.env`

---

## 📝 Important Notes

- Free tier on Render has cold starts (first request may be slow)
- Database on free tier has row limits
- Keep your `SECRET_KEY` secret
- Don't commit `.env` files to GitHub
- Monitor usage to avoid hitting free tier limits

---

## 🎉 Your App is Live!

Share your deployed URL:

- Backend: `https://your-backend.onrender.com`
- Frontend: `https://your-app.vercel.app`

**Next steps:**

- Add custom domain (optional)
- Set up monitoring
- Add error logging (Sentry)
- Configure CI/CD for automatic deployments
