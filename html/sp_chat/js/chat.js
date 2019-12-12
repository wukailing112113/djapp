function chat(element,imgSrc,doctextContent,time){
    //判断左右
    var $time = time;
    var $user = element;
    var $doctorHead = imgSrc;
    //获取输入的值
	//  var $textContent = $('.chat-info').html();
	var $textContent = doctextContent;
    //获取传入输入的内容
    var $doctextContent =  doctextContent;
    //获取容器
    var $box = $('.bubbleDiv');
    var $boxHeght = $box.height();
    var $sectionHeght = $(".chat-box").height();
    var $elvHeght = Math.abs($boxHeght-$sectionHeght);
    //左
    if($user === "leftBubble") {
     // $box.append(createdoct(imgSrc,$doctextContent,$time)).animate({scrollTop: $(document).height()}, 300);
	  $box.append(createdoct(imgSrc,$doctextContent,$time)).animate({scrollTop: $box[0].scrollHeight}, 0);
    }
    //右
    else if($user === "rightBubble") {
     // $box.append(createuser(imgSrc,$textContent,$time)).animate({scrollTop: $(document).height()}, 300);
	  $box.append(createuser(imgSrc,$textContent,$time)).animate({scrollTop: $box[0].scrollHeight}, 0);
    }else {
        console.log("请传入必须的参数");
    }

}

function createdoct(imgSrc, $doctextContent,$time ) {
    var $textContent = $doctextContent;
    var $imgSrc = imgSrc;
    var block;
//  if($textContent == ''|| $textContent == 'null'){
//      alert('亲！别太着急，先说点什么～');
//      return;
//  }
    block = '<div class="bubbleItem">' +
            '<div class="doctor-head">' +
            '<img src="'+ imgSrc +'" alt="doctor"/>' +
            '</div>' +
            '<span class="chat_time">'+$time+'</span>'+
            '<span class="bubble leftBubble">' + $textContent + '<span class="topLevel"></span></span>' +
            '</div>';

    return block;
};

function createuser(imgSrc,$textContent,$time ) {
    var $textContent = $textContent;
    var $imgSrc = imgSrc;
    var block;
//  if($textContent == ''|| $textContent == 'null'){
//      alert('亲！别太着急，先说点什么～');
//      return;
//  }
//  block = '<div class="bubbleItem clearfix">' +
//          '<span class="bubble rightBubble">' + $textContent + '<span class="topLevel"></span></span>' +
//          '</div>';
// block = '<div class="bubbleItem clearfix">' +            
//          '<span class="bubble rightBubble">' + $textContent + '<span class="topLevel"></span></span>' +
//          '</div>';
block = '<div class="bubbleItem clearfix">' +
            '<div class="doctor-head1">' +
            '<img src="'+ imgSrc +'" alt="doctor"/>' +
            '</div>' +
            '<span class="chat_time1">'+$time+'</span>'+
            '<span class="bubble rightBubble">' + $textContent + '<span class="topLevel"></span></span>' +
            '</div>';

    return block;
};
