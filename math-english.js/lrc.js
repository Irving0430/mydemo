function load_lrc(a) {
    var b = new Object();
    b.extra_top = 1;
    b.current = -1;
    b.co;
    b.offset = 0;
    b.cs = -1;
    b.nt = -1;
    b.showtime = -1;
    b.lrc_offset = -1;
    b.lrc_height = -1;
    b.lrc = [];
    b.lrcobj = null;
    b.target = 0;
    b._target = 0;
    b.o = document.getElementById(a);
    b.lrc_obj = document.getElementById(a + "lrc");
    b.sl = function() {
        if (typeof b.lrc[b.current + 2] != "undefined") {
            for (var c in b.lrcobj) {
                b.lrcobj[c].className = ""
            }
            b.lrcobj[b.current + 3].className = "current"
        }
        b.cs = b.lrc[b.current];
        b.current++;
        b.co = b.lrcobj[b.current + 2];
        b.nt = b.lrc[b.current];
        b.showtime = b.nt - b.cs;
        b.lrc_offset = b.co.offsetTop;
        b.lrc_height = b.co.offsetHeight;
        b.nf()
    };
    b.cu = function() {
        var c = b.o.currentTime;
        if (c >= b.nt - 0.2) {
            b.sl();
            b.cu()
        }
        if (typeof b.lrc[b.current - 1] != "undefined") {
            b.extra_top = (b.nt - c) / b.showtime
        }
        b.target = Math.round(b.lrc_offset - (600 - b.lrc_height) / 2);
        if (b.target < 0) {
            b.target = 0
        }
    };
    b.updateTime = function() {
        if (b.o.paused) {
            return
        }
        if (b.cs > b.o.currentTime) {
            b.current = -1;
            b.sl();
            b.cu()
        } else {
            b.cu()
        }
    };
    b.nf = function() {
        if (typeof window.requestAnimationFrame != "undefined") {
            window.requestAnimationFrame(b.ss)
        } else {
            if (typeof window.mozRequestAnimationFrame != "undefined") {
                window.mozRequestAnimationFrame(b.ss)
            } else {
                if (typeof window.webkitRequestAnimationFrame != "undefined") {
                    window.webkitRequestAnimationFrame(b.ss)
                } else {
                    return false
                }
            }
        }
        return true
    };
    b.ss = function() {
        if (b._target == b.target) {
            return
        }
        if (Math.abs(b.lrc_obj.scrollTop - b._target) > b.lrc_height) {
            b._target = b.lrc_obj.scrollTop
        }
        if (b.o.paused) {
            b._target = b.ff(b._target * 0.8 + b.target * 0.2)
        } else {
            b._target = b.ff(b._target * 0.99 + b.target * 0.01)
        }
        b.lrc_obj.scrollTop = b._target;
        b.nf()
    };
    b.init = function() {
        b.add_lrc("999999", "");
        b.add_lrc("999999", "");
        b.add_lrc("999999", "");
        b.current = -1;
        b.lrcobj = b.lrc_obj.getElementsByTagName("li");
        b.co = b.lrcobj[0];
        b.sl();
        b.cu();
        b.o.addEventListener("seeked",
        function() {
            b.current = -1;
            b.sl();
            b.cu()
        });
        b.o.addEventListener("durationchange",
        function() {
            b.current = -1;
            b.sl();
            b.cu()
        });
        setInterval(b.updateTime, 100);
        if (!b.nf()) {
            setInterval(b.ss, 5)
        }
    };
    b.add_lrc = function(e, c) {
        b.lrc.push(parseFloat(e) + b.offset);
        console.log(e);
        var d = document.createElement("li");
        d.id=e;
        d.innerHTML = c;

        b.lrc_obj.appendChild(d);
        //跳转到当前点击歌词的位置
        d.onclick = function(){
            
            document.getElementById("id1407853633923").currentTime=d.id;
            b.updateTime(d.id);
            console.log(d.id+">>>>>>>>>>>>>"+document.getElementById("id1407853633923").currentTime);
            
        };
        //鼠标当前指定的歌词时候添加一个样式
        d.onmousemove = function(){
            if(document.getElementById(d.id).className!="current"){
                document.getElementById(d.id).className="onmousemove"; 
            }

        };
        //鼠标移开去掉样式
        d.onmouseout = function(){
            if(document.getElementById(d.id).className!="current"){
                document.getElementById(d.id).className="";
             }  
        }
    };

    b.get_lrc = function(c) {
        if (typeof b.lrc[c] != "undefined") {
            return b.lrc[c][1]
        } else {
            return ""
        }
    };
    b.setoffset = function(c) {
        b.offset = c / 1000;
    };
    b.ff = function(c) {
        return Math.ceil(c * 10) / 10
    };
    return b
};

/*
 * Lyric support by kookxiang(http://ikk.me)
 
function load_kk_lrc(a) {
    var b = new Object();
    b.extra_top = 1;
    b.current = -1;
    b.co;
    b.offset = 0;
    b.cs = -1;
    b.nt = -1;
    b.showtime = -1;
    b.lrc_offset = -1;
    b.lrc_height = -1;
    b.lrc = [];
    b.lrcobj = null;
    b.target = 0;
    b._target = 0;
    b.o = document.getElementById("kk_lrc_" + a);
    b.lrc_obj = document.getElementById("kk_lrc_" + a + "_lrc");
    b.sl = function() {
        if (typeof b.lrc[b.current + 2] != "undefined") {
            for (var c in b.lrcobj) {
                b.lrcobj[c].className = ""
            }
            b.lrcobj[b.current + 3].className = "current"
        }
        b.cs = b.lrc[b.current];
        b.current++;
        b.co = b.lrcobj[b.current + 2];
        b.nt = b.lrc[b.current];
        b.showtime = b.nt - b.cs;
        b.lrc_offset = b.co.offsetTop;
        b.lrc_height = b.co.offsetHeight;
        b.nf()
    };
    b.cu = function() {
        var c = b.o.currentTime;
        if (c >= b.nt - 0.2) {
            b.sl();
            b.cu()
        }
        if (typeof b.lrc[b.current - 1] != "undefined") {
            b.extra_top = (b.nt - c) / b.showtime
        }
        b.target = Math.round(b.lrc_offset - (125 - b.lrc_height) / 2);
        if (b.target < 0) {
            b.target = 0
        }
    };
    b.updateTime = function() {
        if (b.o.paused) {
            return
        }
        if (b.cs > b.o.currentTime) {
            b.current = -1;
            b.sl();
            b.cu()
        } else {
            b.cu()
        }
    };
    b.nf = function() {
        if (typeof window.requestAnimationFrame != "undefined") {
            window.requestAnimationFrame(b.ss)
        } else {
            if (typeof window.mozRequestAnimationFrame != "undefined") {
                window.mozRequestAnimationFrame(b.ss)
            } else {
                if (typeof window.webkitRequestAnimationFrame != "undefined") {
                    window.webkitRequestAnimationFrame(b.ss)
                } else {
                    return false
                }
            }
        }
        return true
    };
    b.ss = function() {
        if (b._target == b.target) {
            return
        }
        if (Math.abs(b.lrc_obj.scrollTop - b._target) > b.lrc_height) {
            b._target = b.lrc_obj.scrollTop
        }
        if (b.o.paused) {
            b._target = b.ff(b._target * 0.8 + b.target * 0.2)
        } else {
            b._target = b.ff(b._target * 0.99 + b.target * 0.01)
        }
        b.lrc_obj.scrollTop = b._target;
        b.nf()
    };
    b.init = function() {
        b.add_lrc("999999", "");
        b.add_lrc("999999", "");
        b.add_lrc("999999", "");
        b.current = -1;
        b.lrcobj = b.lrc_obj.getElementsByTagName("li");
        b.co = b.lrcobj[0];
        b.sl();
        b.cu();
        b.o.addEventListener("seeked",
        function() {
            b.current = -1;
            b.sl();
            b.cu()
        });
        b.o.addEventListener("durationchange",
        function() {
            b.current = -1;
            b.sl();
            b.cu()
        });
        setInterval(b.updateTime, 100);
        if (!b.nf()) {
            setInterval(b.ss, 5)
        }
    };
    b.add_lrc = function(e, c) {
        b.lrc.push(parseFloat(e) + b.offset);
        var d = document.createElement("li");
        d.innerHTML = c;
        b.lrc_obj.appendChild(d)
    };
    b.get_lrc = function(c) {
        if (typeof b.lrc[c] != "undefined") {
            return b.lrc[c][1]
        } else {
            return ""
        }
    };
    b.setoffset = function(c) {
        b.offset = c / 1000
    };
    b.ff = function(c) {
        return Math.ceil(c * 10) / 10
    };
    return b
};

*/









