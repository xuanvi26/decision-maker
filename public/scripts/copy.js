function copyToClipboard() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(document.getElementById('link-to-copy')).html()).select();
    document.execCommand("copy");
    $temp.remove();
    $('.copy').text('Copied!');
};

