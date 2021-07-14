from app.ai.speech2text import SpeechToText
from django.http.response import JsonResponse
import json

speechToText = SpeechToText()

def message(request):
    msg = json.loads(request.body)['message']
    return JsonResponse(data={"content": f"message received: {msg}", "is_user": False})


def get_audio(request):
    blobs = request.FILES  # recorded blobs are in webm format
    msg = speechToText.recognize_webm(blobs['audio'].read())
    req = {"content_type": 1, "content": msg, "is_user": True}
    res = {"content_type": 1, "content": "server response", "is_user": False}
    return JsonResponse(data={"request": req, "response": res})
