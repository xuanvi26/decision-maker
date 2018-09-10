$(document).ready(function () {
    $('.button-container').hover(
        function() {
            $(this).css({opacity: '1'});
            $(this).children().css({'text-decoration': 'underline'})
        },
        function() {
            $(this).css({opacity:'0.7'});
            $(this).children().css({'text-decoration': 'none'})
        }
    );
    $('.submit').hover(
        function() {
            $(this).css({'text-decoration': 'underline'})
        },
        function() {
            $(this).css({'text-decoration': 'none'})
        }
    );
})