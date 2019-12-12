var path=""
apiready=function(){
	$("#title").html(api.pageParam.img+"/"+api.pageParam.img_length);
	path=api.pageParam.path;
}
//反回方法
function goBlack(){
	api.execScript({
		name: 'media_infoHeader',
		frameName: 'media_info',
        script: 'close_photo()'
    });
	api.closeFrame({});
}
//更改图片顺序
function switch_img(img,path_swith){
	img=img*1+1;
	$("#title").html(img+"/"+api.pageParam.img_length);
	path=path_swith;
}
//下载方法
function down(){
	openEnqueue(path);
}