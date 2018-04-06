//验证jquery是否打开
jQuery.noConflict();
jQuery( document ).ready(function( $ ) {
    $('#masonry-container').imagesLoaded( function(){
        $('#masonry-container').masonry({
            itemSelector: '.item',
            isAnimated: true,
            isFitWidth: true
        });
    });

    $(window).resize(function() {
        $('#masonry-container').masonry({
            itemSelector: '.item',
            isAnimated: true
        }, 'reload');
    });
});


$(window).load(function(){
    var $iw_thumbs			= $('#iw_thumbs'),
        $iw_ribbon			= $('#iw_ribbon'),
        $iw_ribbon_close	= $iw_ribbon.children('span.iw_close'),
        $iw_ribbon_zoom		= $iw_ribbon.children('span.iw_zoom');

    ImageWall	= (function() {
        // window 宽高
        var w_dim,
            // 当前子元素位置
            current				= -1,
            isRibbonShown		= false,
            isFullMode			= false,
            // ribbon / images 动画设置
            ribbonAnim			= {speed : 500, easing : 'easeOutExpo'},
            imgAnim				= {speed : 400, easing : 'jswing'},
            // 初始化
            init				= function() {
                $iw_thumbs.imagesLoaded(function(){
                    $iw_thumbs.masonry({
                        isAnimated	: true
                    });
                });
                getWindowsDim();
                initEventsHandler();
            },
            // 计算窗口宽高
            getWindowsDim		= function() {
                w_dim = {
                    width	: $(window).width(),
                    height	: $(window).height()
                };
            },
            // 事件定义
            initEventsHandler	= function() {

                // 图片点击事件
                $iw_thumbs.delegate('li', 'click', function() {
                    if($iw_ribbon.is(':animated')) return false;

                    var $el = $(this);

                    if(!isRibbonShown) {
                        isRibbonShown = true;

                        $el.data('ribbon',true);

                        // 获取当前子元素位置
                        current = $el.index();

                        showRibbon($el);
                    }
                });

                // ribbon关闭事件
                $iw_ribbon_close.bind('click', closeRibbon);

                // 窗口改变重新计算大小
                $(window).bind('resize', function() {
                    getWindowsDim();
                    if($iw_ribbon.is(':animated'))
                        return false;
                    closeRibbon();
                })
                    .bind('scroll', function() {
                        if($iw_ribbon.is(':animated'))
                            return false;
                        closeRibbon();
                    });

            },
            showRibbon			= function($el) {
                var	$img	= $el.children('img'),
                    $descrp	= $img.next();

                // 其他图片变淡
                $iw_thumbs.children('li').not($el).animate({opacity : 0.2}, imgAnim.speed);

                $img.css('z-index', 100)
                    .data('originalHeight',$img.height())
                    .stop()
                    .animate({
                        height 		: '100px'
                    }, imgAnim.speed, imgAnim.easing);

                //ribbon出现位置及方向
                var ribbonCssParam 		= {
                        top	: $el.offset().top - $(window).scrollTop() - 6 + 'px'
                    },
                    descriptionCssParam,
                    dir;

                if( $el.offset().left < (w_dim.width / 2) ) {
                    dir = 'left';
                    ribbonCssParam.left 	= 0;
                    ribbonCssParam.right 	= 'auto';
                }
                else {
                    dir = 'right';
                    ribbonCssParam.right 	= 0;
                    ribbonCssParam.left 	= 'auto';
                }

                $iw_ribbon.css(ribbonCssParam)
                    .show()
                    .stop()
                    .animate({width : '100%'}, ribbonAnim.speed, ribbonAnim.easing, function() {
                        switch(dir) {
                            case 'left' :
                                descriptionCssParam		= {
                                    'left' 			: $img.outerWidth(true) + 'px',
                                    'text-align' 	: 'left'
                                };
                                break;
                            case 'right' :
                                descriptionCssParam		= {
                                    'left' 			: '-200px',
                                    'text-align' 	: 'right'
                                };
                                break;
                        };
                        $descrp.css(descriptionCssParam).fadeIn();

                        //关闭按钮显示
                        $iw_ribbon_close.show();
                        $iw_ribbon_zoom.show();
                    });

            },

            //关闭按钮点击事件事件
            closeRibbon			= function() {
                isRibbonShown 	= false

                $iw_ribbon_close.hide();
                $iw_ribbon_zoom.hide();

                var $el	 		= $iw_thumbs.children('li').eq(current);

                resetWall($el);

                // 移除ribbon
                $iw_ribbon.stop()
                    .animate({width : '0%'}, ribbonAnim.speed, ribbonAnim.easing);


            },
            resetWall			= function($el) {
                var $img		= $el.children('img'),
                    $descrp		= $img.next();

                $el.data('ribbon',false);

                $img.css('z-index',1).stop().animate({
                    height 		: $img.data('originalHeight')
                }, imgAnim.speed,imgAnim.easing);

                $descrp.fadeOut();

                $iw_thumbs.children('li').not($el).animate({opacity : 1}, imgAnim.speed);
            }				;

        return {
            init : init,
            closeRibbon : closeRibbon
        };
    })();

    ImageWall.init();
});
