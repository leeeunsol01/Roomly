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

    $('.sub_img_wrap button').on('mouseenter', function(){
        $('.sub_img_wrap button').removeClass('sub_img_on');
        $(this).addClass('sub_img_on');

        let index = $(this).index();

        $('.main_img_wrap .main_img').removeClass('main_img_on');
        $('.main_img_wrap .main_img').eq(index).addClass('main_img_on');
    });
    // main_img_change

    $('.product_select ul li').on('click', function() {
        const menu = $(this).text();

        $(this).closest('.product_select').find('.select_btn').text(menu);
        $(this).parent().slideUp(200);
    });

    $(document).on('click', (e) => {
        if(!(e.target).closest('.product_select').length){
            $('.product_select ul').slideUp(200);
        }
    });

    $('.select_btn').on('click', function(e) {
        e.stopPropagation();
        $(this).next('ul').stop().slideToggle(200);
    });
    // product_select
    

    const BASE_PRICE = 690000;

    updateTotalPrice();

    $('.product_select li').on('click', function () {
        const index = $(this).index(); 
        const text = $(this).text();

        $('.select_btn').text(text);

        const $detail = $('.select_detail').eq(index);

        if ($detail.hasClass('select_detail_on')) return;

        $detail.addClass('select_detail_on');
        $detail.find('.num').text(1);
        $detail.find('.select_price').text(formatPrice(BASE_PRICE) + '원');

        updateTotalPrice();
    });

    $('.plus_btn').on('click', function () {
        const $detail = $(this).closest('.select_detail');
        const $num = $detail.find('.num');

        let count = Number($num.text()) + 1;
        $num.text(count);

        const price = BASE_PRICE * count;
        $detail.find('.select_price').text(formatPrice(price) + '원');

        updateTotalPrice();
    });

    $('.minus_btn').on('click', function () {
        const $detail = $(this).closest('.select_detail');
        const $num = $detail.find('.num');

        let count = Number($num.text());
        if (count <= 1) return;

        count--;
        $num.text(count);

        const price = BASE_PRICE * count;
        $detail.find('.select_price').text(formatPrice(price) + '원');

        updateTotalPrice();
    });

    $('.select_detail .close_img').on('click', function () {
        $(this).closest('.select_detail').removeClass('select_detail_on');
        updateTotalPrice();
    });

    function updateTotalPrice() {
        let total = 0;

        $('.select_detail.select_detail_on').each(function () {
            const priceText = $(this).find('.select_price').text();
            const price = Number(priceText.replace(/[^0-9]/g, ''));
            total += price;
        });

        $('.total_price').text(formatPrice(total) + '원');
    }

    function formatPrice(num) {
        return num.toLocaleString();
    }
    // select_price


    $('.page_nav ul li a').on('click', function (e) {
        e.preventDefault();

        let target = $(this).attr('href');
        let offsetTop = $(target).offset().top;

        $('html, body').stop().animate({
            scrollTop: offsetTop - 250
        }, 1000);
    });

    let sections = [];

    $('.page_nav').last().find('ul li a').each(function () {
        let target = $(this).attr('href');
        sections.push({
            id: target,
            top: $(target).offset().top
        });
    });

    $(window).on('scroll', function () {
        let scrollTop = $(window).scrollTop() + 300; // offset 보정

        let currentId;

        for (let i = 0; i < sections.length; i++) {
            if (scrollTop >= sections[i].top) {
                currentId = sections[i].id;
            }
        }

        if (currentId) {
            let $nav = $('.page_nav').last();
            $nav.find('ul li').removeClass('nav_on');
            $nav.find(`a[href="${currentId}"]`).parent().addClass('nav_on');
        }
    });
    // page_nav


    $('.review_btn').on('click', function(){
        $('.review_overlay').addClass('review_on');
        $('body').css('overflow', 'hidden');
    });

    $('.close_img, .review_txt_btn').on('click', function() {
        $('.review_overlay').removeClass('review_on');
        $('body').css('overflow', '');
    });

    $('.qna_btn').on('click', function(){
        $('.qna_overlay').addClass('qna_on');
        $('body').css('overflow', 'hidden');
    });

    $('.close_img, .qna_txt_btn').on('click', function() {
        $('.qna_overlay').removeClass('qna_on');
        $('body').css('overflow', '');
    });
    // review_qna_modal

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