from django.shortcuts import render
import serial
import time
from django.http import JsonResponse
# Create your views here.
arduino = serial.Serial("COM5", 9600)


def index(request):
    return render(request, 'index.html', context={})


def requestSample(request):
    arduino.write(b's')
    time.sleep(0.7)
    rawString = arduino.readline().decode()
    values= rawString.split(',')[:-1]
    values = [int(x) for x in values]

    return JsonResponse({'data': values})
