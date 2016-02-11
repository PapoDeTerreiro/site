$(document).ready(function () {
    var $logoTimer;

    $('#fullpage').fullpage({
        verticalCentered: true,
        sectionsColor: ['#FFFF', '#F9F9F9', '#33B5E5', '#FFFFFF'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        resize: true,
        animateAnchor: true,
        scrollOverflow: true,
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
            if (nextIndex === 2 || nextIndex === 4) {
                $('#innerMenu').addClass('light-page');
            } else {
                $('#innerMenu').removeClass('light-page');
            }

            if ($logoTimer) {
                clearTimeout($logoTimer);
            }
            $logoTimer = setTimeout(function () {
                if (nextIndex > 1) {
                    $('#menuTop #logoTop').fadeIn();
                    $('#menuTop #alsoHome').fadeOut();
                } else {
                    $('#menuTop #logoTop').fadeOut();
                    $('#menuTop #alsoHome').fadeIn();
                }
            }, 1500);

            setTimeout(function () {
                if (index !== 0) {
                    var $elmt = $('#section' + index);

                    if ($elmt.attr('data-loading') === 'false') {
                        $elmt.load('page' + index + '.html', function () {
                            $(".customScrollbar").mCustomScrollbar({
                                theme: 'rounded-dots-dark'
                            });
                            $elmt.attr('data-loading', 'true');
                        });
                    }
                }
            }, 2000);
        }
    });

    $(document).on('scroll', function () {
        if ($logoTimer) {
            clearTimeout($logoTimer);
        }
        $logoTimer = setTimeout(function () {
            if ($(document).scrollTop() > 50) {
                $('#menuTop #logoTop').fadeIn();
                $('#menuTop #alsoHome').fadeOut();
            } else {
                $('#menuTop #logoTop').fadeOut();
                $('#menuTop #alsoHome').fadeIn();
            }
        }, 1000);
    });
});
