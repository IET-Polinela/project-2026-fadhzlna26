from django.contrib.auth.views import LoginView, LogoutView
from django.contrib import messages
from django.urls import reverse_lazy
from django.views.generic import CreateView
from .forms import RegisterForm

# 🔐 LOGIN
class CustomLoginView(LoginView):
    template_name = 'login.html'

    def form_valid(self, form):
        messages.success(self.request, "Berhasil login!")
        return super().form_valid(form)


# 🚪 LOGOUT
class CustomLogoutView(LogoutView):
    next_page = reverse_lazy('login')

    def post(self, request, *args, **kwargs):
        messages.success(request, "Berhasil logout!")
        return super().post(request, *args, **kwargs)


# 🧑 REGISTER
class RegisterView(CreateView):
    form_class = RegisterForm
    template_name = 'register.html'
    success_url = reverse_lazy('login')

    def form_valid(self, form):
        user = form.save(commit=False)
        user.is_admin = False   # citizen default
        user.is_member = True
        user.save()

        messages.success(self.request, "Registrasi berhasil, silakan login!")
        return super().form_valid(form)