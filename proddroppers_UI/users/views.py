from django.shortcuts import render


def profile(request):
    template = "profile/index.html"
    return render(request, template)
