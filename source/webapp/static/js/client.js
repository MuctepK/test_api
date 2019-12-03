function getAnswer(){
    let answer = '';
    if ($('#answer').length>0)
        answer = $('#answer');
    else
        answer = $(document.createElement('div'));
        answer.attr("class", "answer");
    return answer
}
function parseSuccess(response){
    let divContainer = $('.container');
    let answer = getAnswer()
    answer.text(response.answer);
    answer.attr('id', 'answer');
    answer.css('color', 'green');
    divContainer.append(answer);

}

function parseError(response){
    let divContainer = $('.container');
    let answer = getAnswer();
    let answer_text = JSON.parse(response.responseText).answer
    answer.attr('id', 'answer');
    answer.text(answer_text);
    answer.css('color', 'red');
    divContainer.append(answer);
}
function sendRequest(event){
    let A = firstInput.val();
    let B = secondInput.val();
    let operation = $(event.target).data().operation;
    $.ajax({
        url: `http://localhost:8000/${operation}/`,
        method: 'POST',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({"A": A, "B": B}),
        success: parseSuccess,
        error: parseError
    })
}
let operations = ["add", "subtract", "multiply", "divide"];
let divContainer = $('.container');

let firstInput = $(document.createElement('input',));
firstInput.attr("type","number");
firstInput.attr("name", "A");
firstInput.attr("class", "form-control my-input");

let secondInput = $(document.createElement('input',));
secondInput.attr("type","number");
secondInput.attr("name", "B");
secondInput.attr("class", "form-control my-input");

divContainer.append(firstInput);
divContainer.append(secondInput);

let btns = $(document.createElement("div"));
btns.attr("class", "my-btns");
for (let operation of operations){
    let btn = $(document.createElement("button"));
    btn.data("operation", operation);
    btn.attr("class", "my-btn mx-3 btn btn-info");
    btn.click(sendRequest);
    btn.text(operation);
    btns.append(btn);
}
divContainer.append(btns);

