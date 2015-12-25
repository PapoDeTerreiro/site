$(document).ready(function () {
    $('#fullpage').fullpage({
        verticalCentered: true,
        sectionsColor: ['#FFFF', '#F9F9F9', '#33B5E5', '#7BAABE'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        resize: false,
        animateAnchor: false,
        scrollOverflow: false,
        autoScrolling: true,
        responsive: 900,
        fitSection: false,
        menu: '#innerMenu',
        navigation: true,
        scrollingSpeed: 1000,
        afterRender: function () {
            $('video').get(0).play();
        },
        onLeave: function (index, nextIndex, direction) {
            if (nextIndex === 2) {
                $('#innerMenu').addClass('light-page');
            } else {
                $('#innerMenu').removeClass('light-page');
            }
        }
    });

    $(".customScrollbar").mCustomScrollbar({
        theme: 'rounded-dots-dark'
    });
});
