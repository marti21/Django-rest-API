from multiprocessing import context
from django.shortcuts import render, get_object_or_404
from django.http import Http404, HttpResponse
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import PostSerializer, UserSerializer, ComentarioSerializer, FriendRequestSerializer
from .models import Post, UserPangolin, Comentario, FriendRequest
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from .forms import PostForm, SignUpForm, UserChangeForm2
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login, logout


def first(request):
    return render(request, 'first.html')

#Vistas de la aplicación
def profile(request, the_user):
    if request.user.is_authenticated:
        if request.user.username != the_user:
            return render(request, 'profile.html')
        else:
            return render(request, 'own_profile.html')
        
    else:
        return login_user(request)

def edit_profile(request):
    if request.user.is_authenticated:
            return render(request, 'change_profile.html')
    else:
        return login_user(request)

def post2(request, the_post):
    if request.user.is_authenticated:
        return render(request, 'post.html')
    else:
        return login_user(request)

def home(request):
    if request.user.is_authenticated:
        return render(request, 'home.html')
    else:
        return login_user(request)

def add_post(request):
    if request.user.is_authenticated:
        return render(request, 'add_post.html')
    else:
        return login_user(request)
    
def add_friends(request):
    if request.user.is_authenticated:
        return render(request, 'AddFriends.html')
    else:
        return login_user(request)
    

def user_Registration(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('/login')

    else:
        form = SignUpForm(request.POST, request.FILES)

    return render(request, 'registration.html',{'form':form})  


def login_user(request):
    form = AuthenticationForm(data=request.POST)
    
    if form.is_valid():
        user = form.get_user()

        login(request, user)
        return redirect('home')

    return render(request, 'login.html', {'form':form})


def login_out_user(request):
    logout(request)
    return redirect('/login')

def edit_post(request, the_post):
    if request.user.is_authenticated:
        return render(request, 'edit_post.html')
    else:
        return login_user(request)


def change_password(request):
    form = PasswordChangeForm(data = request.POST, user = request.user)

    if form.is_valid():
        form.save()
        return redirect('/login')

    context = {
        'form' : form,
    }
    return render(request, 'change_password.html', context)


#Funciones de la api que no se utilizan.
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = UserPangolin.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
# Create your views here.
class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    permission_classes = [permissions.AllowAny]
# Create your views here.
class FriendrequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = [permissions.AllowAny]


#Funciones de la api que se utilizan.
@api_view(['GET', 'DELETE','PUT'])
def PostViewId(request, the_post):
    try:
        post = Post.objects.get(pk=the_post)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializedpost = PostSerializer(post, context={'request':request})
        return Response(data=serializedpost.data, status=status.HTTP_200_OK)

    if request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_200_OK)

    if request.method == 'PUT':
        print(post)
        serializer = PostSerializer(data = request.data, instance = post)
        print(serializer)
        if serializer.is_valid():
            post2 = serializer.save()
            serializedPost = PostSerializer(post2, context={'request':request})
            return Response(data = serializedPost.data, status=status.HTTP_202_ACCEPTED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def PostViewAuthor(request, the_user):
    try:
        #post_objs = Post.objects.filter(author=request.user).order_by('-created_at')
        user = UserPangolin.objects.get(username=the_user)
        post = Post.objects.filter(author=user).order_by('-created_at')
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializedpost = PostSerializer(post, many=True , context={'request':request})
        return Response(data=serializedpost.data, status=status.HTTP_200_OK)
 
    if request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'DELETE','PUT'])
def UserView_FN(request, the_user):
    try:
        user = UserPangolin.objects.get(username=the_user)
    except UserPangolin.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializeduser = UserSerializer(user,context={'request': request})
        return Response(data=serializeduser.data,status=status.HTTP_200_OK)

    if request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_200_OK)

    if request.method == 'PUT':
        print(user)
        serializer = UserSerializer(data = request.data, instance = user)
        ##print(serializer)
        if serializer.is_valid():
            user2 = serializer.save()
            serializedUser = UserSerializer(user2, context={'request': request})
            return Response(data = serializedUser.data, status=status.HTTP_202_ACCEPTED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'DELETE'])
def ComentarioView_FN(request, the_post):
    obj = get_object_or_404(Post, id=the_post)
    comentarios = Comentario.objects.filter(post=obj)

    if request.method == 'GET':
        serializedcomentario = ComentarioSerializer(comentarios, many=True, context={'request':request})
        return Response(data=serializedcomentario.data, status=status.HTTP_200_OK)

    if request.method == 'DELETE':
        comentarios.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def FriendrequestView_FN(request, to_user):
    try:
        user = UserPangolin.objects.get(username=to_user)
        friendRequest = FriendRequest.objects.filter(to_user=user)
    except FriendRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializedFriendRequest = FriendRequestSerializer(friendRequest, many=True, context={'request':request})
        return Response(data=serializedFriendRequest.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def acceptRequestFriend(request, requestID):
    friend_request = FriendRequest.objects.get(pk=requestID)
    userLogeado = get_object_or_404(UserPangolin, username=request.user.username)
    
    if friend_request.to_user == userLogeado:
        friend_request.to_user.friends.add(friend_request.from_user)
        friend_request.from_user.friends.add(friend_request.to_user)
        friend_request.delete()
    
        return Response(status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def reject_friend_request(request, requestID):
    friend_request = FriendRequest.objects.get(id=requestID)
    userLogged = get_object_or_404(UserPangolin, username=request.user.username)
    
    if friend_request.to_user == userLogged:
        friend_request.delete()
    
        return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def send_friend_request(request, username):
    delUsuario = get_object_or_404(UserPangolin, username=request.user.username)
    paraUsuario = get_object_or_404(UserPangolin, username=username)
    friend_request, created = FriendRequest.objects.get_or_create(from_user=delUsuario, to_user=paraUsuario)

    if created:
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def PostFriendsView_FN(request):
    try:
        post_objs = Post.objects.all().order_by('-created_at')
        userLogged = get_object_or_404(UserPangolin, username = request.user.username)
        listaDeAmigos = userLogged.friends.all()

        listaDePosts = []
        for post in post_objs:
            user = UserPangolin.objects.get(username = post.author.username)

            if user in listaDeAmigos or user == userLogged:
                listaDePosts.append(post)

    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializedFriendRequest = PostSerializer(listaDePosts, many=True, context={'request':request})
        return Response(data=serializedFriendRequest.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def UserViewId_FN(request, the_user):
    try:
        user = UserPangolin.objects.get(id=the_user)
    except UserPangolin.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializeduser = UserSerializer(user, context={'request':request})
        return Response(data=serializeduser.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_postView(request):
    serializer = PostSerializer(data = request.data)
    if serializer.is_valid():
        post = serializer.save()
        serializedPost = PostSerializer(post, context={'request':request})
        return Response(data = serializedPost.data, status=status.HTTP_201_CREATED) 
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def Registrar(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        serializedUser = UserSerializer(user, context={'request':request})
        return Response(data = serializedUser.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def View_no_friends(request, the_user):
    try:
        userLogged = get_object_or_404(UserPangolin, username=the_user)
        users_objs = UserPangolin.objects.all()
        listaDeAmigos = userLogged.friends.all()

        listaDeNoAmigos = []
        for user in users_objs:
            if user not in listaDeAmigos and user != userLogged:
                listaDeNoAmigos.append(user)

    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializeduser = UserSerializer(listaDeNoAmigos, many=True , context={'request': request})
        return Response(data=serializeduser.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_comentario(request):
    serializer = ComentarioSerializer(data = request.data)
    if serializer.is_valid():
        commment = serializer.save()
        serializedComment = ComentarioSerializer(commment, context={'request':request})
        return Response(data = serializedComment.data, status=status.HTTP_201_CREATED) 
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def see_friends(request):
    userLogged = get_object_or_404(UserPangolin, username=request.user.username)
    users_objs = userLogged.friends.all()

    serializedUsers = UserSerializer(users_objs, many=True , context={'request': request})

    return Response(data = serializedUsers.data, status=status.HTTP_201_CREATED) 

@api_view(['DELETE'])
def delete_friend(request, username):
    friend = get_object_or_404(UserPangolin, username=username)
    userLogged = get_object_or_404(UserPangolin, username=request.user.username)
  
    userLogged.friends.remove(friend)
    friend.friends.remove(userLogged)
      
    return Response(status=status.HTTP_200_OK) 