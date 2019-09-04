$(function(){
    // 常量
    var music = $('#myMusic')[0];  // 原生
    // 初始化
    init();

    // 方法
    function init(){
        fullpage();
        musicPlay();
    }

    // fullpage初始化
    function fullpage(){
        $('.wp-inner').fullpage({
            drag:true,
            change: function (e) {
                // 移除动画属性
                $('.page').eq(e.cur).find('.animated').each(function() {
                    $(this).removeClass($(this).data('animate'));
                });
            },
            afterChange: function (e) {
                // 添加动画属性
                $('.page').eq(e.cur).find('.animated').each(function () {
                    $(this).addClass($(this).data('animate'));
                });
            }
        });
    }

    // 音乐播放、暂停
    function musicPlay(){
        music.play(); 
    }
    function musicpause(){
        music.pause();
    }

    // 事件
    // 音乐
    $('.bgMusic').tap(function(e){
        $(this).toggleClass('musicStop');
        if( $(this).hasClass('musicStop')){
            musicpause();
        }else{
            musicPlay();
        }
        e.stopPropagation();
    })
    
})
