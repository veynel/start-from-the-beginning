#screen
{
    position:absolute;
    width:100%;
    height:100%;
    background:#fff;
    overflow:hidden;
}

#screen img, canvas
{
    position:absolute;
    left:-9999px;
    cursor:pointer;
    image-rendering:optimizeSpeed;
}

#screen .href{
    border:#FFF dotted 1px;
}

#screen .fog
{
    position:absolute;
    background:#fff;
    opacity:0.1;
    filter:alpha(opacity=10);
}

#command
{
    position:absolute;
    left:1em;
    top:1em;
    width:130px;
    z-index:30000;
    background:#fff;
    border:#000 solid 1em;
}

#bar
{
    position:relative;
    left:1em;
    top:1em;
    height:160px;
}

#bar .button
{
    position:absolute;
    background:#222;
    width:20px;
    height:20px;
    cursor:pointer;
}

#bar .loaded
{
    background:#666;
}

#bar .viewed
{
    background:#fff;
}

#bar .selected
{
    background:#f00;
}
