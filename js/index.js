window.onload = function() {
  //播放暂停控制
  $(".play-pause").click(function() {
    var audioId = $(this).data("music");
    var btnId = this.id;
    var audio = $("#" + audioId).get(0);

    //监听播放完成事件
    //此处使用一个匿名函数，定义了函数：播放完成
    audio.addEventListener(
      "ended",
      function() {
        audio.currentTime = 0;
        audio.pause();
        $("#" + btnId + " " + ".play-pause>span")
          .removeClass("icon-pause")
          .addClass("icon-play");
      },
      false
    );

    //改变暂停/播放icon
    if (audio.paused) {
      //更换被暂停歌曲的按钮图标
      var btns = document.getElementsByClassName("play-pause");
      [].forEach.call(btns, function(i) {
        // 将audios中其他的audio全部暂停
        if (i.id != btnId) {
          var btn = i.id;
          $("#" + btn + " " + ".icon-btn")
            .removeClass("icon-pause")
            .addClass("icon-play");
        }
      });
      //改变点击的歌曲的状态
      audio.play();
      $("#" + btnId + " " + ".icon-btn")
        .removeClass("icon-play")
        .addClass("icon-pause");
    } else {
      audio.pause();
      $("#" + btnId + " " + ".icon-btn")
        .removeClass("icon-pause")
        .addClass("icon-play");
    }
  });

  //点击播放，暂停其他所有
  // 获取所有audios
  var audios = document.getElementsByTagName("audio");
  // 暂停函数
  function pauseAll() {
    var self = this;
    [].forEach.call(audios, function(i) {
      // 将audios中其他的audio全部暂停
      i !== self && i.pause();
    });
  }
  // 给play事件绑定暂停函数
  [].forEach.call(audios, function(i) {
    i.addEventListener("play", pauseAll.bind(i));
  });
};
