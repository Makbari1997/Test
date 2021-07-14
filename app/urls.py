from django.urls import path
from app import views
from django.views.generic import TemplateView

urlpatterns = [
    path("", TemplateView.as_view(template_name='chat.html'), name='chat'),
    path('message/', views.message, name='message'),
    path('get_audio/', views.get_audio, name='get_audio'),
]
