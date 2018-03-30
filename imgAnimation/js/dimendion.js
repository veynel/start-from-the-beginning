var m3D = function () {
    var diapo = [],
        imb,
        scr,
        bar,
        selected,
        camera = {x:0, y:0, z:-650, s:0, fov: 500},
        nw = 0,
        nh = 0;

    camera.setTarget = function (c0, t1, p) {
        if (Math.abs(t1 - c0) > .1) {
            camera.s = 1;
            camera.p = 0;
            camera.d = t1 - c0;
            if (p) {
                camera.d *= 2;
                camera.p = 9;
            }
        }
    };
    camera.tween = function (v) {
        if (camera.s != 0) {
            camera.p += camera.s;
            camera[v] += camera.d * camera.p * .01;
            if (camera.p == 10) camera.s = -1;
            else if (camera.p == 0) camera.s = 0;
        }
        return camera.s;
    };

    var Diapo = function (n, img, x, y, z) {
        if (img) {
            this.url = img.url;
            this.title = img.title;
            this.des = img.desciption;
            this.isLoaded = false;
            if (document.createElement("canvas").getContext) {
                this.srcImg = new Image();
                this.srcImg.src = img.src;
                this.img = document.createElement("canvas");
                this.canvas = true;
                scr.appendChild(this.img);
            } else {
                this.img = document.createElement('img');
                this.img.src = img.src;
                scr.appendChild(this.img);
            }
            this.img.onclick = function () {
                if (camera.s) return;
                if (this.diapo.isLoaded) {
                    if (this.diapo.urlActive) {
                        top.location.href = this.diapo.url;
                    } else {
                        camera.tz = this.diapo.z - camera.fov;
                        camera.tx = this.diapo.x;
                        camera.ty = this.diapo.y;
                        $("#dimendionDescription").text(this.diapo.des);
                        $("#dimendionTitle").text(this.diapo.title);
                        if (selected) {
                            selected.but.className = "button viewed";
                            selected.img.className = "";
                            selected.img.style.cursor = "pointer";
                            selected.urlActive = false;
                        }
                        this.diapo.but.className = "button selected";
                        interpolation(false);
                        selected = this.diapo;
                    }
                }
            };
            this.but = document.createElement('div');
            this.but.className = "button";
            bar.appendChild(this.but);
            this.but.diapo = this;
            this.but.style.left = Math.round((this.but.offsetWidth  * 1.2) * (n % 4)) + 'px';
            this.but.style.top  = Math.round((this.but.offsetHeight * 1.2) * Math.floor(n / 4)) + 'px';
            this.but.onclick = this.img.onclick;
            imb = this.img;
            this.img.diapo = this;
            this.zi = 25000;
        } else {
            this.img = document.createElement('div');
            this.isLoaded = true;
            this.img.className = "fog";
            scr.appendChild(this.img);
            this.w = 300;
            this.h = 300;
            this.zi = 15000;
        }
        this.x = x;
        this.y = y;
        this.z = z;
        this.css = this.img.style;
    };

    Diapo.prototype.anim = function () {
        if (this.isLoaded) {
            var x = this.x - camera.x;
            var y = this.y - camera.y;
            var z = this.z - camera.z;
            if (z < 20) z += 5000;
            var p = camera.fov / z;
            var w = this.w * p;
            var h = this.h * p;
            /* 动画 */
            this.css.left   = Math.round(nw + x * p - w * .5) + 'px';
            this.css.top    = Math.round(nh + y * p - h * .5) + 'px';
            this.css.width  = Math.round(w) + 'px';
            this.css.height = Math.round(h) + 'px';
            this.css.zIndex = this.zi - Math.round(z);
        } else {
            this.isLoaded = this.loading();
        }
    };

    Diapo.prototype.loading = function () {
        if ((this.canvas && this.srcImg.complete) || this.img.complete) {
            if (this.canvas) {
                this.w = this.srcImg.width;
                this.h = this.srcImg.height;
                this.img.width = this.w;
                this.img.height = this.h;
                var context = this.img.getContext("2d");
                context.drawImage(this.srcImg, 0, 0, this.w, this.h);
            } else {
                this.w = this.img.width;
                this.h = this.img.height;
            }
            this.but.className += " loaded";
            return true;
        }
        return false;
    };

    //屏幕大小
    var resize = function () {
        nw = scr.offsetWidth * .5;
        nh = scr.offsetHeight * .5;
    };

    var interpolation = function (bicubic) {
        var i = 0, o;
        while( o = diapo[i++] ) {
            if (o.but) {
                o.css.msInterpolationMode = bicubic ? 'bicubic' : 'nearest-neighbor'; // IE8
                o.css.imageRendering = bicubic ? 'optimizeQuality' : 'optimizeSpeed';
            }
        }
    };

    var init = function (data) {
        scr = document.getElementById("screen");
        bar = document.getElementById("bar");
        resize();
        var i = 0,
            o,
            n = data.length;
        while( o = data[i++] ) {
            /* 图片插入 */
            var x = 1000 * ((i % 4) - 1.5);
            var y = Math.round(Math.random() * 4000) - 2000;
            var z = i * (5000 / n);
            diapo.push( new Diapo(i - 1, o, x, y, z));
            /* 阴影插入 */
            var k = diapo.length - 1;
            for (var j = 0; j < 3; j++) {
                var x = Math.round(Math.random() * 4000) - 2000;
                var y = Math.round(Math.random() * 4000) - 2000;
                diapo.push( new Diapo(k, null, x, y, z + 100));
            }
        }
        run();
    };

    var run = function () {
        /* X轴移动 */
        if (camera.tx) {

            if (!camera.s) camera.setTarget(camera.x, camera.tx);
            var m = camera.tween('x');
            if (!m) camera.tx = 0;
            /* Y轴移动 */
        } else if (camera.ty) {
            if (!camera.s) camera.setTarget(camera.y, camera.ty);
            var m = camera.tween('y');
            if (!m) camera.ty = 0;
            /* Z轴移动 */
        } else if (camera.tz) {
            if (!camera.s) camera.setTarget(camera.z, camera.tz);
            var m = camera.tween('z');
            if (!m) {
                camera.tz = 0;
                interpolation(true);
                if (selected.url) {
                    selected.img.style.cursor = "pointer";
                    selected.urlActive = true;
                    selected.img.className = "href";
                } else {
                    selected.img.style.cursor = "default";
                }
            }
        }
        /* 每张图片动画 */
        var i = 0, o;
        while( o = diapo[i++] ) o.anim();
        setTimeout(run, 32);
    }
    return {
        init : init
    }
}();
setTimeout(function() {
    m3D.init(imageData)},500);
