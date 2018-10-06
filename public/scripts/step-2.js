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

    //@TODO implement back end of deletion
    const createDeleteButton = () => {
      let button = $('<input type="submit" value="Delete">').addClass('button delete small-button');
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
  
    const addHover = () => {
      $('.delete').hover(
        function() {
          $(this).css({'text-decoration': 'underline'})
        },
        function() {
          $(this).css({'text-decoration': 'none'})
        }
      )
    };
  
    const renderOption = (rawOption) => {
        let option = createOption(rawOption);
        $("#options-container").append(option);
        addHover();
    };

    $('.form-container').submit(function (event) {
      event.preventDefault();
      const optionName = $('body form input[name="answer"]').val();
      const description = $('body form textarea[name="description"]').val();
      $.post(window.location.pathname, {name: optionName, description}, function(answer) {
        renderOption(answer);
        $("body input[name='answer']").val('');
        $("body textarea[name='description']").val('');
        $(".form-container").toggle('slow');
      })
    });

    $('#submit-poll').click(function (event) {
      event.preventDefault();
      const path = window.location.pathname,
            pathParts = path.split('/'),
            lastPart = pathParts[pathParts.length-1];
      window.location.href = `/createpoll/complete/poll/${lastPart}`;
    })

    $()
  
  });
  