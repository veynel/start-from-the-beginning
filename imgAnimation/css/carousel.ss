
.trans3d
{
    -webkit-transform-style: preserve-3d;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform-style: preserve-3d;
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform-style:preserve-3d;
    -ms-transform: translate3d(0, 0, 0);
    transform-style:preserve-3d;
    transform: translate3d(0, 0, 0);
}

#contentContainer
{
    position:relative;
    margin-left:-500px;
    margin-top:-100px;
    left:50%;
    width:1000px;
    height:1000px;
}

#carouselContainer
{
    position:absolute;
    margin-left:-500px;
    margin-top:-500px;
    left:50%;
    top:50%;
    width:1000px;
    height:1000px;
}

.carouselItem
{
    width:320px;
    height:130px;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-160px;
    margin-top:-90px;
    visibility:hidden;
}

.carouselItemInner
{
    width:320px;
    height:130px;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-160px;
    margin-top:-90px;
}
