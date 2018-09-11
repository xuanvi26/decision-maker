$(document).ready(function () {
    $('.grey-container').hover(
        function() {
            $(this).css({opacity: '1'});
        },
        function() {
            $(this).css({opacity:'0.7'});
        }
    );
    $('.submit, .grey-container, .delete, .copy').hover(
        function() {
            $(this).css({'text-decoration': 'underline'})
        },
        function() {
            $(this).css({'text-decoration': 'none'})
        }
    );
})