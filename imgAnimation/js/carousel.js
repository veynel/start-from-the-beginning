    var speedY = 0.5,
        speedX = 0,
        addY = 0,
        radius,rY,mZ,container,carousel,item;


    $(document).ready(function () {
        init();
    });

    //添加图片
    var createImg = function (data) {
        var o,
            i = 0;
        while(o = data[i++]) {
            var img = document.createElement("img");
            img.src = o.src;
            img.setAttribute("class","carouselItemInner trans3d");
            var li = document.createElement("li");
            li.setAttribute("class","carouselItem trans3d");
            li.appendChild(img);
            document.getElementById("carouselContainer").append(li);
        }
    };

    function init () {
        createImg(imageData);
        container = $( '#contentContainer' );
        carousel = $( '#carouselContainer' );
        item = $( '.carouselItem' );
        rY = 360 / item.length;
        radius = Math.round( (250) / Math.tan( Math.PI / item.length ) );
        mZ = -(radius) +200;

        TweenMax.set(container, {perspective:600});
        TweenMax.set(carousel, {z:-(radius)});


        for ( var i = 0; i < item.length; i++ )
        {
            var $item = item.eq(i);
            var $block = $item.find('.carouselItemInner');

            TweenMax.set($item, {rotationY:rY * i, z:radius, transformOrigin:"50% 50% " + -radius + "px"});
            animateIn( $item, $block );
        }

        ticker = setInterval( looper, 1000/60 );
    }

    function animateIn( $item, $block )
    {
        var $nrX = 360 * getRandomInt(2);
        var $nrY = 360 * getRandomInt(2);

        var $nx = -(2000) + getRandomInt( 4000 );
        var $ny = -(2000) + getRandomInt( 4000 );
        var $nz = -4000 +  getRandomInt( 4000 );

        var $s = 1.5 + (getRandomInt( 10 ) * .1);
        var $d = 1 - (getRandomInt( 8 ) * .1);

        TweenMax.set( $item, { autoAlpha:1, delay:$d } );
        TweenMax.set( $block, { z:$nz, rotationY:$nrY, rotationX:$nrX, x:$nx, y:$ny, autoAlpha:0} );
        TweenMax.to( $block, $s, { delay:$d, rotationY:0, rotationX:0, z:0,  ease:Expo.easeInOut} );
        TweenMax.to( $block, $s-.5, { delay:$d, x:0, y:0, autoAlpha:1, ease:Expo.easeInOut} );
    }


    function looper()
    {
        addY += speedY;
        TweenMax.to( carousel, 1, { rotationY:addY, rotationX:speedX, ease:Quint.easeOut } );
        TweenMax.set(  carousel, {z:mZ } );
    }

    function getRandomInt( $n )
    {
        return Math.floor((Math.random()*$n)+1);
    }
