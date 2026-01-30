$(function(){
    $('.gnb_btn').on('click', function() {
        $('.gnb_menu_outer').toggleClass('gnb_open');
        $('.gnb_btn').toggleClass('gnb_btn_on');
    });
    // gnb

    $('.rank_slide').on('click', function (e) {
        e.stopPropagation();
        $('.rank_modal').toggleClass('rank_open');
    });

    $('.rank_modal').on('click', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', function () {
        $('.rank_modal').removeClass('rank_open');
    });

    const rankSlide = $('.rank_slide');
    const rankHeight = 50;
    const rankSpeed = 1000;
    const rankDelay = 5000;

    function rankSlideUp(){
        rankSlide.animate({
            top: -rankHeight + 'px'
        },rankSpeed,
            function() {
                rankSlide.append(rankSlide.children().first());
                rankSlide.css('top', 0);
            }
        );
    }

    setInterval(rankSlideUp, rankDelay);
    // rank

    $('.more').on('click', function(){
        $('.more_product').addClass('more_product_on');
        $('.more').addClass('more_off');
    });
    // more

    $('.quick_top').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    $('.quick_bottom').on('click', function(){
        $('html, body').animate({
            scrollTop: $(document).height() - $(window).height()
        }, 1000);
    });
    // quick_menu
});