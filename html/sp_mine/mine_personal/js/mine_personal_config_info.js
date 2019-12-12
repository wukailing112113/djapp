apiready=function(){
	getCache()//获取缓存
}

//清除缓存
function clearCache(){
    api.clearCache(function( ret, err ){
        if( ret ){
            api.toast({
                msg: '成功清除'+cache+'缓存',
                duration: 2000,
                location: 'middle'
            });
             getCache();//重新获取缓存
        }
    });
}

//获取缓存
function getCache(){
    //获取缓存大小
    api.getCacheSize(function( ret, err ){
        if( ret ){
            cache = (ret.size/1048576).toFixed(1)+"M"
            if(cache=='0.0M'){
            	$('#cache').removeClass('color-33').addClass('color-df');
            }
            $("#cache").html(cache);
        }
    });
}