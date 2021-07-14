from django import forms

class MessageForm(forms.Form):
    content = forms.CharField()
    is_user = forms.BooleanField()