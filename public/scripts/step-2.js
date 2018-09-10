const hardCodedOption = [{
  answer: 'Kantapia',
  description: 'A korean restaurant on Sherbrooke and de Bleury'
}];

$(document).ready(function() {

    const optionBody = rawOption => {
      let optionBody = $(`<div>${rawOption.answer}</div>`).addClass('button-body');
      let optionDescription = $(`<div>${rawOption.description}</div>`).addClass('subtitle');
      optionBody.append(optionDescription);
      return optionBody;
    };
  
    const createOption = rawOption => {
      let optionDiv = $("<div>").addClass("display-row-option");
      let optionButton = $("<button>").addClass("button-container blue bottom-small-margin");
      let optionBody = optionBody(rawOption);
      optionDiv.apend(optionButton);
      optionButton.append(optionBody);
      return option;
    };
  
    const renderOptions = (options) => {
      options.map(option => {
        let option = createOption(option);
        $("#option-container").append(option);
      });
    };
  
    const appendOptions = () => {
      $.get('/createpoll/step/2', function(data) {
        renderOptions(hardCodedOption);
        addHoverAndDelete();
      });
    }

    
    const addHoverAndDelete = () => {
      $("#options-container .button-container").hover(
        function() {
          $(this).css({opacity: '1'});
          $(this).children().css({'text-decoration': 'underline'})
        },
        function() {
          $(this).css({opacity:'0.7'});
          $(this).children().css({'text-decoration': 'none'})
        }
        );
      }
      
    // appendOptions();

    // $('.new-tweet form').submit(function (event) {
    //   event.preventDefault();
    //   const tweetBody = $('.new-tweet form textarea[name="text"]').val();
    //   $.post('/tweets', {text: tweetBody}, function(data) {
    //     appendTweet();
    //     $(".new-tweet textarea").val('');
    //   });
    // });
  
    // const loadTweets = () => {
    //   $.get('/tweets', function(data) {
    //     renderTweets(data);
    //     addHover();
    //   });
    // };
  
    // loadTweets();
  
  });
  