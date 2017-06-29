// ****** CHECKPOINT 29 ****** Refactor window.onload with the jQuery selector.
var animatePoints = function () {
    var revealPoint = function () {
        // Fade in and up
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
    };
    // Loop through each point and fadin/up
    $.each($('.point'), revealPoint);
};
$(window).load(function () {
    // display selling points
    if ($(window).height() > 950) {
        animatePoints();
    }
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    console.log(scrollDistance);
    console.log($(window).scrollTop());

    $(window).scroll(function (event) {

        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
        }
    });
});