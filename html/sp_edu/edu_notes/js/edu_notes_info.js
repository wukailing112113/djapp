apiready = function(){
	getEduNotesInfo();//调用（获取学习笔记详情）接口
}
//获取学习笔记详情 接口------------------------------------------------------------
function getEduNotesInfo(){
//alert(api.pageParam.type)
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_notes_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values:{ 
            //"communist_no":localStorage.user_id,
	          "notes_id":api.pageParam.type,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#notes_title').html(clearNull(ret.data.notes_title,'无标题'));//标题
    			$('#add_communist').html(clearNull(ret.data.add_communist,'无'));//上传人
    			$('#notes_type').html(clearNull(ret.data.notes_type,'其他'));//类型
    			$('#add_time').html(clearNull(ret.data.add_time,'0'));//时间
    			$('#notes_content').html(removeHTMLTag(clearNull(ret.data.notes_content,'空')));//内容
    			    			$('#communist_avatar').attr('src',(ret.data.communist_avatar)?(localStorage.url+ret.data.communist_avatar):("../../../statics/images/images_oa/oa_img_head.png"));//头像
    			    			
				if(ret.data.notes_thumb&&ret.data.notes_thumb.length>0){
					$('#imgList').removeClass('di-n')					
					var notesThumb = ret.data.notes_thumb.split(',');									
					for(var i=0;i<notesThumb.length;i++){
						$('#imgList').append(
							'<img onclick="openPhotoBrowser(this)" class="pull-left w-50em h-50em m-8em ml-12em bor-ra-7" src="'+localStorage.url+notesThumb[i]+'" alt="" />'
						)		
			
					}	
				}
				
				//判断视频详情或者文章详情  no=文章详情/yes=视频详情 
				if(ret.data.material.type_video=='no'){
					$('#notes_info_con').append(
						'<div class="edu_notes_info_pic" onclick="openLearnInfo(\'edu_learn_info_header\','+ret.data.material.material_id+')">'+
						'<img class="w-350em h-201em m-a" src='+((ret.data.material.material_thumb!=null)?(localStorage.url+ret.data.material.material_thumb):"../../../statics/images/images_edu/edu_special_default.png")+' alt="" />'+
						'<div class="clearfix pt-12em w-100b pl-12em pr-12em pb-12em">'+
						'<p>'+'<span class="color-376bf5 f-14em f-w">'+"【原文】"+'</span>'+ret.data.material.material_title+'</p>'+						
						'</div>'+

					'</div>'
					)
					
				}else if(ret.data.material.type_video=='yes'){
					$('#notes_info_con').append(
						'<div class="edu_notes_info_pic" onclick="openLearnInfo(\'edu_learn_videoInfo_header\','+ret.data.material.material_id+')">'+
						'<video poster='+(localStorage.url+ret.data.material.material_thumb)+' style="object-fit:fill" class="w-100b h-201em m-a" src='+((ret.data.material.material_vedio!=null)?(localStorage.url+ret.data.material.material_vedio):"../../../statics/images/images_edu/edu_special_learn1.png")+' controls="controls">'+
						'</video>'+
						'<div class="clearfix pt-12em w-100b pl-12em pr-12em pb-12em">'+
						'<p>'+'<span class="color-376bf5 f-14em f-w">'+"【原文】"+'</span>'+ret.data.material.material_title+'</p>'+						
						'</div>'+
						'</div>'
					)
				
				}else if(ret.data.material=='null'){
					//日常笔记 
				}
				
				
			}
			else{
				api.toast({msg: '无更多数据...',duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
    
  
}

//图片放大效果
//function openPhone(This,e){
//  e = e || window.event;
//  e.stopPropagation();
//  $('html body').append(
//      '<div style="width: 100%;height: 100%;background: rgba(0, 0, 0, .75);position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 9999;overflow-y:auto;display: flex;justify-content: center;align-items: center; " onclick="$(this).remove()">'+
//          '<img style="position:absolute;right: 0;left: 0;margin: 0 auto;" src="'+$(This).attr('src')+'" />'+
//      '</div>'
//  )
//}

//图片放大
function openPhotoBrowser(This,e){
    e = e || window.event;
    e.stopPropagation();
	var data1=new Array();	
	them=$(This).attr('src');	
	data1.push(them);
	var photoBrowser = api.require('photoBrowser');
	photoBrowser.open({	
		 images: data1,
		// placeholderImg: 'widget://statics/images/image_public/refresh.png',
		activeIndex:0,
		zoomEnabled:true,
		bgColor: 'rgba(0, 0, 0, .75)'
		}, function(ret, err) {    		
			if(ret.eventType=='click'){
				 photoBrowser.close();
			}
			});
			
				
	}								

//打开文章与视频详情
function openLearnInfo(winName,type){
	api.openWin({
	    name: winName,
	    url: '../edu_learn/header/'+winName+'.html',
	    pageParam:{
	    	type:type
	    }
    });
} 




