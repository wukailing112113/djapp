var income_amount;//本次需交金额

//获取完整的日期  
var date=new Date;  
var year=date.getFullYear();   
var month=date.getMonth()+1;  
month =(month<10 ? "0"+month:month);   
var mydate = ((year.toString()+'-'+month.toString()).toString());  


apiready = function(){
//	getHrCommunistInfo();
	get_communist_feepay();  //	党费
}

//加载党费缴纳记录
function get_communist_feepay(){
	var url = localStorage.url+"/index.php/Api/Hr/get_communist_feepay";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            communist_no:localStorage.user_id,
	            month:mydate//当前月份
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(1==ret.status){
    			$('#btn').removeClass('di-n');
    			$('#content1').removeClass('di-n');
    			$("#fee").html(ret.dues_info.dues_amount);
    			income_amount = ret.dues_info.dues_amount;//本次需交金额
				$("#myDate").text(income_amount)
			}
			else{
				$('#content2').removeClass('di-n');
			}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}


//缴费操作
function orderAdd(){
	var url = localStorage.url+"/index.php/Api/Fa/get_communist_feepay";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            communist_no:localStorage.user_id,//用户编号
	          	month:mydate//当前月份
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(1==ret.status){
    			//生成订单,并返回数据
				getAliPay(ret.dues_info.dues_id,ret.dues_info.order_no,income_amount,"本月党员费用缴纳","本月党员费用缴纳");
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//调用支付宝接口
function getAliPay(order_id,orderNo,money,title,body){
	var obj = api.require('aliPay');
	obj.pay({
	   subject:title,//交易商品名
	    body:body,//交易商品的简介
	    amount:money,//交易商品的价钱
	    tradeNO:orderNo//交易订单编号
	},function(ret,err) {
//		    api.alert({
//		        title: '支付结果',
//		        msg: ret.code,
//		        buttons: ['确定']
//		    });
	    if(ret.code == 9000){
	    	orderUpdate(order_id);
	    }
	});
}

//修改订单支付状态
function orderUpdate(order_id){
	var url = localStorage.url+"/index.php/Api/Fa/set_communist_fee";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            dues_id:order_id//订单id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(1==ret.status){
    			alert("支付成功");
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

function getHrCommunistInfo(){
//	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Hrcommunist/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
				$("#communist_avatar").append(
					'<img class="w-100b h-100b bor-ra-100b"  src="'+localStorage.url+ret.communist_info.communist_avatar+'" alt="">'
				) //头像
				$("#communist_name").html(ret.communist_info.communist_name); //姓名
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}