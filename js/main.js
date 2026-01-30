 $(function(){
    $('.banner .close_img').on('click', function(){
        $('.banner').addClass('banner_off');
        $('.gnb_menu_outer').css('top', '142px');
    });

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

    const reviewSlide = $('.user_review_slide');
    let items = reviewSlide.find('.user_review');

    const slideSpeed = 1000;
    const interval = 5000;

    const itemHeight = items.first().outerHeight(); // ✅ 214px

    reviewSlide.prepend(items.last().clone());
    reviewSlide.append(items.first().clone());

    items = reviewSlide.find('.user_review');
    const totalItems = items.length;

    let index = 1;

    const boxHeight = $('.user_review_box').height(); // 300px
    const centerOffset = (boxHeight - itemHeight) / 2; // 43px

    reviewSlide.css({
        transition: 'none',
        transform: `translateY(${-(index * itemHeight) + centerOffset}px)`
    });

    function slideReview(){
        index++;

        reviewSlide.css({
            transition: `transform ${slideSpeed}ms`,
            transform: `translateY(${-(index * itemHeight) + centerOffset}px)`
        });

        if(index === totalItems - 1){
            setTimeout(() => {
                reviewSlide.css('transition', 'none');
                index = 1;
                reviewSlide.css({
                    transform: `translateY(${-(index * itemHeight) + centerOffset}px)`
                });
            }, slideSpeed);
        }
    }
    setInterval(slideReview, interval);
    // user_review

    let bestTab = 0; 

    $('.best_item_tab button').on('click', function() {
        $('.best_item_tab button').removeClass('best_tab_on');
        $(this).addClass('best_tab_on');

        bestTab = $(this).index();
        
        $('.best_item_wrap').removeClass('best_sheet_on');
        $('.best_item_wrap').eq(bestTab).addClass('best_sheet_on');
    });
    // best

    let selectTags = [];

    $('.tag_left button').on('click', function(){
        const tag = $(this).data('img');

        if(selectTags.includes(tag)){
            selectTags = selectTags.filter(v => v !== tag);
            $(this).removeClass('tag_btn_on');
        } else {
            if(selectTags.length < 3){
                selectTags.push(tag);
                $(this).addClass('tag_btn_on');
            }
        }

        if(selectTags.length === 3){
            const sortedTags = selectTags.slice().sort((a,b) => a-b);
            
            $('.tag_right .tag_img').removeClass('tag_img_on');

            let found = false;

            $('.tag_right .tag_img').each(function(){
                const imgComboStr = $(this).find('img').data('combo');

                if(imgComboStr){
                    const comboGroups = imgComboStr
                        .toString()
                        .split(',')
                        .map(v =>
                            v.split('-').map(Number).sort((a,b)=>a-b)
                        );

                    const isMatch = comboGroups.some(combo =>
                        combo.length === sortedTags.length &&
                        combo.every((v, i) => v === sortedTags[i])
                    );

                    if(isMatch){
                        $(this).addClass('tag_img_on');
                        found = true;
                    }
                }
            });

            if(!found){
                $('.tag_right .no_tag').addClass('tag_img_on');
            }
        } else {
            $('.tag_right .tag_img').removeClass('tag_img_on');
            $('.tag_right .tag_img').first().addClass('tag_img_on');
        }
    });

    $('.reset_btn').on('click', function(){
        selectTags = [];
        $('.tag_left button').removeClass('tag_btn_on');
        $('.tag_right .tag_img').removeClass('tag_img_on');
        $('.tag_right .tag_img').first().addClass('tag_img_on');
    });

    let productBox;
    let hideTimer;

    $('.hotspot').on('mouseenter click', function(){
        const name = $(this).data('name');
        const price = $(this).data('price');
        const thumb = $(this).data('thumb');

        if(!productBox){
            productBox = $('<div class="product_box"></div>').appendTo('body');
        }

        productBox.html(`
            <a href="detail_page/detail_page.html">
                <img src="${thumb}" alt="${name}">
                <div class="product_info">
                    <p>${name}</p>
                    <span>${price}</span>
                </div>
            </a>
        `).fadeIn(150);

        const offset = $(this).offset();
        productBox.css({
            top: offset.top - productBox.outerHeight() - 10,
            left: offset.left + 20
        });

        clearTimeout(hideTimer);
    });

    $('.hotspot').on('mouseleave', function(){
        hideTimer = setTimeout(() => {
            productBox.fadeOut(100);
        }, 200);
    });

    // 🔥 product_box 위에 마우스 올려도 유지
    $(document).on('mouseenter', '.product_box', function(){
        clearTimeout(hideTimer);
    });

    $(document).on('mouseleave', '.product_box', function(){
        productBox.fadeOut(100);
    });


    // tag_content

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