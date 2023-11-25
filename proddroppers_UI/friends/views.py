from django.shortcuts import render


def friends(request):
    template = "friends/index.html"
    return render(request, template)
