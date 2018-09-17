$(document).ready(function() {

    const createOptionBody = rawOption => {
      let optionBody = $(`<div>${rawOption.name}</div>`).addClass('button-body bold');
      let optionDescription = '';
      if (rawOption.description) {
        optionDescription = $(`<div>${rawOption.description}</div>`).addClass('subtitle');
      }
      optionBody.append(optionDescription);
      return optionBody;
    };

    const createDeleteButton = () => {
      let button = $('<input type="submit" value="Delete">').addClass('button delete');
      return button;
    }
  
    const createOption = rawOption => {
      let optionDiv = $("<div>").addClass("display-row-option");
      let optionButton = $("<button>").addClass("button blue-container bottom-small-margin");
      let optionBody = createOptionBody(rawOption);
      let deleteButton = createDeleteButton();
      optionDiv.append(optionButton);
      optionButton.append(optionBody);
      optionDiv.append(deleteButton);
      return optionDiv;
    };
  
    const renderOptions = (options) => {
      options.forEach(rawOption => {
        let option = createOption(rawOption);
        $("#options-container").append(option);
      });
    };

    const appendOptions = () => {
      $.get('/polls/2', function(data) {
        renderOptions(data);
      });
    };

    // const addFocus= () => {
    //   // $("#options-container .blue-container").hover(
    //   //   function() {
    //   //     $(this).css({opacity: '1'});
    //   //     $(this).children().css({'text-decoration': 'underline'})
    //   //   },
    //   //   function() {
    //   //     $(this).css({opacity:'0.7'});
    //   //     $(this).children().css({'text-decoration': 'none'})
    //   //   }
    //   //   );
    //   }
      
    appendOptions();

    // $('body form').submit(function (event) {
    //   event.preventDefault();
    //   const optionName = $('body form input[name="answer"]').val();
    //   const description = $('body form textarea[name="description"]').val();
    //   $.post('/createpoll/step/2', {name: optionName, description}, function(data) {
    //     appendOptions();
    //     $("body input[name='answer']").val('');
    //     $("body textarea[name='description']").val('');
    //   })
    // });
  
    // const loadTweets = () => {
    //   $.get('/createpoll/step/2', function(data) {
    //     renderTweets(data);
    //     addHover();
    //   });
    // };
  
    // loadTweets();
  
  });
  