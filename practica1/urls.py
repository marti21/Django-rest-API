from re import template
from django import views
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views 
from rest_framework import routers
from pangolin import views

router = routers.DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'comentarios', views.ComentarioViewSet)
router.register(r'solicitudes', views.FriendrequestViewSet)

urlpatterns = [
    ##path('', include(router.urls)),
    path('edit_profile', views.edit_profile, name = "edit_profile"),
    path('profile/<str:the_user>', views.profile, name = "profile"),
    path('post2/<int:the_post>', views.post2),
    path('home/', views.home, name = "home"),
    path('registrar/', views.user_Registration, name = "registrar"),
    path('post_add/', views.add_post, name = "add_post"),
    path('add_friends/', views.add_friends, name = "add_friends"),
    path('login/', views.login_user, name = "login"),
    path('edit_post/<int:the_post>', views.edit_post, name = "edit_post"),
    path('change_password', views.change_password, name = "change_password"),
    path('', views.first, name = "first"),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),

    path('post/<int:the_post>', views.PostViewId),
    path('posts/<str:the_user>', views.PostViewAuthor),
    path('user/<str:the_user>', views.UserView_FN),
    path('userId/<int:the_user>', views.UserViewId_FN),
    path('comentarios/<int:the_post>', views.ComentarioView_FN),
    path('friendRequests/<str:to_user>', views.FriendrequestView_FN),
    path('postFriends', views.PostFriendsView_FN),
    path('add_post', views.add_postView),
    path('registrar', views.Registrar),
    path('View_no_friends/<str:the_user>', views.View_no_friends),
    path('add_comment', views.add_comentario),
    path('acceptRequestFriend/<int:requestID>', views.acceptRequestFriend),
    path('rejectRequestFriend/<int:requestID>', views.reject_friend_request),
    path('sendRequestFriend/<str:username>', views.send_friend_request),
    path('see_friends', views.see_friends),
    path('delete_friend/<str:username>', views.delete_friend),

    path('logOut', views.login_out_user, name="logout"),
]

if settings.DEBUG:  
        urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)