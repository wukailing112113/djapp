var index_time;
apiready = function(){
	chat_list();
	setInterval("chat_list_no()",3000);//5s刷新一次
	//获取年月日
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var h = myDate.getHours();//获取当前小时数(0-23)
    var m = myDate.getMinutes();//获取当前分钟数(0-59)
    var s = myDate.getSeconds();//获取当前秒
    var week = myDate.getDay();
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];   
    index_time=year + "-" + mon + "-" + date + " " + h+ ":"+m+ ":"+s;
   
}

/**————————————————————————————获取列表接口——————————————————————————————————————————————*/
function chat_list(){
	$(".bubbleItem").remove();
	var url = localStorage.url+"/Api/public/public_chat";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,
	            //"page":1,
	           // "pagesize":5000
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
				var f_len=ret.data.length-1;	
				$(".f_len").html(ret.data[f_len].chat_id);	
				//alert($(".f_len").html())	
					for(var i=0;i<ret.data.length;i++){				
					if(ret.data[i].status==1){
						//是自己发的 靠右显示
						chat("rightBubble",((ret.data[i].communist_avatar!=null)?(localStorage.url+ret.data[i].communist_avatar):"./../../statics/images/images_oa/oa_img_head.png"),ret.data[i].chat_content,ret.data[i].add_time);
					}else{
						//别人发的  靠左显示
						chat("leftBubble",((ret.data[i].communist_avatar!=null)?(localStorage.url+ret.data[i].communist_avatar):"./../../statics/images/images_oa/oa_img_head.png"),ret.data[i].chat_content,ret.data[i].add_time);
					}
					
					}
				
				}
			}
		}
	});
}

/**————————————————————————————刷新获取列表接口——————————————————————————————————————————————*/
function chat_list_no(){
	var chart2=$(".f_len").html();
	//alert(chart2)
	//$(".bubbleItem").remove();
	var url = localStorage.url+"/Api/public/public_chat_new";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,
	            "chat_id":chart2,
	            
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
			//alert(ret.data.length)
				if(ret.data&&ret.data.length>0){	
				var f_len1=ret.data.length-1;	
				//alert(f_len1);
				//alert(ret.data[f_len1].chat_id);
				$(".f_len").html(ret.data[f_len1].chat_id);	
				//alert($(".f_len").html());
					for(var i=0;i<ret.data.length;i++){				
					if(ret.data[i].status==1){
						//是自己发的 靠右显示
						chat("rightBubble",((ret.data[i].communist_avatar!=null)?(localStorage.url+ret.data[i].communist_avatar):"./../../statics/images/images_oa/oa_img_head.png"),ret.data[i].chat_content,ret.data[i].add_time);
					}else{
						//别人发的  靠左显示
						chat("leftBubble",((ret.data[i].communist_avatar!=null)?(localStorage.url+ret.data[i].communist_avatar):"./../../statics/images/images_oa/oa_img_head.png"),ret.data[i].chat_content,ret.data[i].add_time);
					}
					
					}
				
				}
			}
		}
	});
}
/**————————————————————————————发送按钮——————————————————————————————————————————————*/
$(".send-btn").click(function(){
    //右侧 自己发 调用，只需填一个参数"rightBubble"
    
    var char_text=$(".chat-info").html();
    if(char_text==''){
		alert('亲！别太着急，先说点什么～');
		return false;
	}
	//发送接口
    chat_send(char_text,index_time);
    //清空输入框
    $('.chat-info').html('');

})

/**————————————————————————————信息提交——————————————————————————————————————————————*/
function chat_send(char_text,index_time){
	var url = localStorage.url+"/Api/public/public_chat_add";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,
	            "chat_content":$(".chat-info").html(),
	           
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
			//chat("rightBubble","./../../statics/images/images_oa/oa_img_head.png",char_text,index_time);
			}
		}
	});
}



//刷新
function exec(){
	window.location.reload();
}