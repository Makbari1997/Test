import speech_recognition as sr
import subprocess

class SpeechToText():
    
    def __init__(self):
        self.recognizer = sr.Recognizer()
    
    def recognize_webm(self, audio_blobs):
        """
        convert speech to text for webm audio files
        :param audio_blobs: blobs of webm file received from client web browser
        """

        # write blobs on file
        with open('./file.webm', 'wb') as f:
            f.write(audio_blobs)
            f.close()

        # convert webm format to a understandable format for google speech (wav in this case)
        subprocess.call(
            ['ffmpeg', '-y', '-i', './file.webm', './file.wav'])

        # read converted file
        with sr.AudioFile('./file.wav') as source:
            data = self.recognizer.record(source)

        # convert speech to persian text from audio file and return it
        return self.recognizer.recognize_google(data, language='fa-IR')
