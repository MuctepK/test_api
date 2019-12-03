import json
from datetime import datetime

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def api_example(request, *args, **kwargs):
    request_data = None
    if request.body:
        request_data = json.loads(request.body)
    data = {
        'method': request.method,
        'time': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'content': request_data
    }
    data_json = json.dumps(data)
    print(data_json)
    response = HttpResponse(data_json)
    response['Content-type'] = "application/json"
    return response


CALCULATOR = {
    '+': lambda a, b: a+b,
    '-': lambda a,b: a-b,
    '*': lambda a,b: a*b,
    '/': lambda a,b: a/b
}


def get_json_response(status, answer):
    return JsonResponse(status = status, data = {"answer": answer})


def validate_and_solve_nums(request_data, operation):
    try:
        num1, num2 = float(request_data.get("A")), float(request_data.get("B"))
    except ValueError:
        return get_json_response(400, "Variables 'A' or 'B' are not numbers")
    except TypeError:
        return get_json_response(400, "Variables 'A' or 'B' are not provided")
    else:
        try:
            answer = CALCULATOR[operation](num1,num2)
        except ArithmeticError as e:
            return get_json_response(400, str(e))
        return get_json_response(200, answer)

@csrf_exempt
def add_view(request, *args, **kwargs):
    if request.method != 'POST':
        return get_json_response(405, "Method not allowed")
    if request.body:
        request_data = json.loads(request.body)
        answer = validate_and_solve_nums(request_data, '+')
        return answer
    else:
        return get_json_response(400, "Data not provided")


@csrf_exempt
def subtract_view(request, *args, **kwargs):
    if request.method != 'POST':
        return get_json_response(405, "Method not allowed")
    if request.body:
        request_data = json.loads(request.body)
        answer = validate_and_solve_nums(request_data, '-')
        return answer
    else:
        return get_json_response(400, "Data not provided")


@csrf_exempt
def multiply_view(request, *args, **kwargs):
    if request.method != 'POST':
        return get_json_response(405, "Method not allowed")
    if request.body:
        request_data = json.loads(request.body)
        answer = validate_and_solve_nums(request_data, '*')
        return answer
    else:
        return get_json_response(400, "Data not provided")


@csrf_exempt
def divide_view(request, *args, **kwargs):
    if request.method != 'POST':
        return get_json_response(405, "Method not allowed")
    if request.body:
        request_data = json.loads(request.body)
        answer = validate_and_solve_nums(request_data, '/')
        return answer
    else:
        return get_json_response(400, "Data not provided")


def index_view(request, *args, **kwargs):
    return render('index.html')
