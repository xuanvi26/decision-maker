$(document).ready(function() {

    let answerScores = [];
    const answersArr = $('li').toArray();
    answersArr.forEach((answer, index) => {
        answerScores.push({
            name: answer.firstElementChild.innerText,
            score: answersArr.length - index
        })
    });
    console.log(answerScores)

    $( "#sortable" ).sortable({
        stop: function(){
            const answersArr = $('li').toArray();
            let tempArr = [];
            answersArr.forEach((answer, index) => {
                tempArr.push({
                    name: answer.firstElementChild.innerText,
                    score: answersArr.length - index
                })
            answerScores = tempArr;
            })
        console.log(answerScores)    
        }
    });

    $('form').submit(function () {
        console.log(answerScores);
        $.post('/answer/complete', {answers: answerScores});
    });

});