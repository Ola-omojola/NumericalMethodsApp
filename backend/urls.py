"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from backend import views

# API URL patterns
api_patterns = [
    path('bisection/', views.bisection_view, name='bisection'),
    path('newton-raphson/', views.newton_raphson_view, name='newton_raphson'),
    path('finite-differences/', views.finite_differences_view, name='finite_differences'),
    path('error-calculation/', views.error_calculation_view, name='error_calculation'),
    path('newton-forward-diff/', views.newton_forward_diff_view, name='newton_forward_diff'),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(api_patterns)),
]
