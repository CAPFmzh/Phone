/**
 * Created by Administrator on 2016/6/26 0026.
 */
/**
 * Created by Administrator on 2016/6/26 0026.
 */
~function (desW) {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(850);
/*~function (desW) {
    var winH = document.documentElement.clientHeight;
    document.documentElement.style.fontSize = winH / desW * 100 + "px";
}(1440);*/
~function () {
    var step=0;
    new Swiper(".swiper-container", {
        loop: true,
        direction: 'vertical',
        onSlidePrevEnd:changeEnd ,
        //->向下切换结束:swiper.activeIndex当前活动块的索引
        onSlideNextEnd:changeEnd
    });
}();

function changeEnd(swiper) {
    var n = swiper.activeIndex,
        MY=document.getElementById('my'),
        slideAry = swiper.slides;//->获取当前所有的活动块(获取的结果是一个数组)
    [].forEach.call(slideAry, function (slide, index) {
        if (n === index) {
            //slide.id = (n == 1 || n == 3) ? "page1" : "page2";
            if(n===1||n===6){
                slide.id="page1";

                return
            }
            if(n===2){
                slide.id="page2";
                return
            }
            if(n===3){
                slide.id="page3";

                var div=document.getElementById('size');
                div.className='size size1';
                setInterval(function () {
                        div.className='size';
                    setTimeout(function(){
                            div.className='size size1';
                    },2000)
                },3000);
                return
            }
            if(n===4){
                slide.id="page4";
                return
            }
            if(n===5||n===0){
                slide.id="page5";
                return
            }
        }
        slide.id = null;

    });
}

music();
function music(){
    var music = document.getElementById("music"),
        musicAudio = document.getElementById("musicAudio");
    window.setTimeout(function () {
        musicAudio.play();//->让音频播放:浏览器开始下载资源文件,也就是让它播放到出声音还需要一段时间,只有发出声音后我们才会显示音乐的图标
        musicAudio.addEventListener("canplay", function () {
            //->canplay:音频文件已经可以播放了,但是不一定是所有资源都加载完成了,大部分是边播放边界
            music.style.display = "block";
            music.className = "music move";
        }, false);
    }, 1000);
    music.addEventListener("click", function () {
        //->当前是暂停状态我让其播放
        if (musicAudio.paused) {
            musicAudio.play();
            music.className = "music move";
            return;
        }
        //->当前是播放状态我让其暂停
        musicAudio.pause();
        music.className = "music";
    }, false);
}

vdf();
function vdf(){
//canvas init
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

//canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

//snowflake particles
    var mp = 500; //max particles  雪花的密度
    var particles = [];
    for(var i = 0; i < mp; i++)
    {
        particles.push({
            x: Math.random()*W, //x-coordinate
            y: Math.random()*H, //y-coordinate
            r: Math.random()*3, //radius
            d: Math.random()*mp //density
        })
    }

//Lets draw the flakes
    function draw()
    {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        /* ctx.fillStyle = "#FF0000";*/
        ctx.beginPath();
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        update();
    }

//Function to move the snowflakes
//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;
    function update()
    {
        angle += 0.01;
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
//Updating X and Y coordinates
//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
//Every particle has its own density which can be used to make the downward movement different for each flake
//Lets make it more random by adding in the radius
            p.y += Math.cos(angle+p.d) + 1 + p.r/2;
            //p.x += Math.sin(angle) * 2;

//Sending flakes back from the top when it exits
//Lets make it a bit more organic and let flakes enter from the left and right also.
            if(p.x > W || p.x < 0 || p.y > H)
            {
                if(i%3 > 0) //66.67% of the flakes
                {
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                }
                else
                {
//If the flake is exitting from the right
                    if(Math.sin(angle) > 0)
                    {
//Enter fromth
                        particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                    else
                    {
//Enter from the right
                        particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                }
            }
        }
    }

//animation loop
    setInterval(draw, 20);
}













