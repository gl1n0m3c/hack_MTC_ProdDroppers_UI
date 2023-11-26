from django.shortcuts import render


def start(request):
    template = "index.html"
    return render(request, template)


def friends(request, pk):
    template = "friends/index.html"
    return render(request, template)


def profile(request, pk):
    template = "profile/index.html"
    return render(request, template)


def rooms(request):
    template = "rooms/index.html"
    return render(request, template)


def room(request, pk):
    template = "inroom/index.html"
    return render(request, template)


def main(request):
    template = "main/index.html"
    return render(request, template)


def music(request, pk):
    template = "music/index.html"
    return render(request, template)


def auth(request):
    template = "auth/index.html"
    return render(request, template)
