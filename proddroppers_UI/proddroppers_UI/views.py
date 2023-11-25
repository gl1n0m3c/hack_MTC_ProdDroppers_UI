from django.shortcuts import render


def start(request):
    template = "index.html"
    return render(request, template)


def friends(request):
    template = "friends/index.html"
    return render(request, template)


def profile(request):
    template = "profile/index.html"
    return render(request, template)


def rooms(request):
    template = "rooms/index.html"
    return render(request, template)


def room(request):
    template = "inroom/index.html"
    return render(request, template)


def main(request):
    template = "main/index.html"
    return render(request, template)


def music(request):
    template = "music/index.html"
    return render(request, template)


def auth(request):
    template = "auth/index.html"
    return render(request, template)
