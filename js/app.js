$(function () {
    const swiper = new Swiper('.swiper-container', {
        navigation:{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop:true,
        autoplay:{
            delay: 3000
        },
        speed:1000,
    })
    // ==========================================
    // スムーズスクロール
    //===========================================
    // href属性が#で始まるアンカーをクリックした場合
    const pageScrollSpeed = 500;//スクロールスピード
    $('a[href^="#"]').on('click',function () {
        // クリックされた要素のhref属性を取得
        const href = $(this).attr('href');
        // スクロール先のJQueryオブジェクト取得
        const $target = $(href === '#' || href === '' ? 'html' : href);
        // スクロール先の数値を取得
        const targetHeight = $target.offset().top;
        // スムーズスクロール
        $('body, html').animate({scrollTop: targetHeight}, pageScrollSpeed, 'swing');
        return false;
    });

    // ==========================================
    // SP版ナビトグル
    //===========================================
    $('.js-toggle-sp-nav').on('click', function () {
        $('.js-toggle-bar-target').toggleClass('active');
        $('.js-toggle-sp-nav-target').toggleClass('active');
    });


    // ==========================================
    // スクロールイベント系(ヒーローバナースライド、コンテンツ(HTML要素)表示)
    //===========================================
    const $slideHeroTarget = $('.js-slide-hero-target');//ヒーローバナー
    const $toggleHeaderTarget = $('.js-toggle-header-target');//ヘッダー

    const effectMove = 50;//表示させるときに動かす距離(px)
    const effectTime = 1000;//エフェクトの所要時間(ms)
    const effectHeight = 100;//画面下部からどの位置でコンテンツを表示させるか(px)
    const $fadeTarget = $('.js-scroll-fade-target');//フェードインさせる要素

    //フェードインさせる前のCSSを定義
    $fadeTarget.css({
        opacity: 0,
        transform: 'translateY('+ effectMove +'px)',
        transition: effectTime + 'ms'
    });
    
    $(window).on('scroll load', function () {
        const scrollTop = $(this).scrollTop();//スクロール位置(ウィンドウ上部)
        const windowHeight = $(this).height();//ウィンドウの縦幅
        const scrollBottom = scrollTop + windowHeight;//スクロール(ウィンドウ下部)
        const effectPosition = scrollBottom - effectHeight;//表示させる位置を取得
        

        $fadeTarget.each(function () {
            let thisPosition = $(this).offset().top;
            // effectPosition(表示させたい位置)が要素の位置を超えた場合
            if(effectPosition > thisPosition){
                $(this).css({
                    opacity: 1,
                    transform: 'translateY(0)'
                });
            }
        });
        
        
        // ヒーローバナーのスライド&ヘッダーの背景色変更
        if (scrollTop >= windowHeight / 4){
            $slideHeroTarget.addClass('active');
            $toggleHeaderTarget.addClass('active')
        }else {
            $slideHeroTarget.removeClass('active');
            $toggleHeaderTarget.removeClass('active');
        }

        
    });




});