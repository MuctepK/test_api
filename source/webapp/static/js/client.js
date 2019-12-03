function getAnswer(){
    let answer = '';
    if ($('#answer').length>0)
        answer = $('#answer');
    else
        answer = $(document.createElement('div'));
    return answer
}
function parseSuccess(response){
    let divContainer = $('.container');
    let answer = getAnswer()
    answer.text(response.answer);
    answer.attr('id', 'answer');
    answer.css('background', 'green');
    divContainer.append(answer);

}

function parseError(response){
    let divContainer = $('.container');
    let answer = getAnswer();
    let answer_text = JSON.parse(response.responseText).answer
    answer.attr('id', 'answer');
    answer.text(answer_text);
    answer.css('background', 'red');
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

let secondInput = $(document.createElement('input',));
secondInput.attr("type","number");
secondInput.attr("name", "B");

divContainer.append(firstInput);
divContainer.append(secondInput);

for (let operation of operations){
    let btn = $(document.createElement("button"));
    btn.data("operation", operation);
    btn.click(sendRequest);
    btn.text(operation);
    divContainer.append(btn);
}

