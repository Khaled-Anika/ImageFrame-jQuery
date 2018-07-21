var images;
$(document).ready(function(){
	images = $(".image-frame1").find('li');
	Render();
	$(window).resize(function () {
        clearInterval(interval);
		Render()
    });
});

function Render(){
     
    var imgCount = images.length;
    var imgsVisible = [];
    $(".image-frame1").find('li').remove();
   
	function ColumnNumber(size){
        var ret = 9;
        if(size >= 1050) 
            ret = 10;
        else if(size >= 850)
            ret = 9;
        else if(size >= 650)
            ret = 8;
        else if(size >= 450) 
            ret = 7;
        else if(size >= 300) 
            ret = 6;
        return ret;
    }

    //imageframe
        var col = ColumnNumber($('#page').width()),
	        imgWidth = $(".header-container").width()/col,
	        contentHeight = $('.header-content').height() + parseInt($('.header-content').css('padding-top'));
	        changeHt = Math.floor(contentHeight / imgWidth) + 1,
	        headerContentHeight = changeHt * imgWidth,
	        imgNmbr = (col  + changeHt) * 2,
	        row = changeHt + 2;
        if(imgsVisible.length < imgNmbr)
        {
            var arrayLen = imgsVisible.length;
            for(var i = 0; i < imgNmbr - arrayLen; i++){
                imgsVisible.push($(images[i % imgCount]).clone());
            }
        } 
        else 
        {
            $(".image-frame1").find('ul').find('li').remove();
            imgsVisible = imgsVisible.splice(0, imgsVisible.length-imgNmbr);
        }

        $(".image-frame1").find('ul').append(imgsVisible);
        var imageList = $(".image-frame1").find('ul').find('li');
        var count = 0;


        var bottomPadding = parseInt($('.header-content').css('padding-bottom')) + headerContentHeight - Math.ceil($('.header-content').innerHeight());
        $('.header-content').css({
            "margin": imgWidth ,
            "padding-bottom": bottomPadding ,
            "box-sizig": "border-box"
        });
        
        $('.header-container').css({
            "height":row * imgWidth +2
        })
        
        for(var i = 0; i < row; i++){
            for(var j = 0; j < col; j++){
                if(i == 0 || i == row -1){
                    imageList.eq(count).css({
	                    "position":"absolute",
	                    "top": i * imgWidth ,
	                    "left": j * imgWidth 
                    });
                    count++;
                } else if(j == 0 || j == col - 1){
	                    imageList.eq(count).css({
	                    "position":"absolute",
	                    "top": i * imgWidth ,
	                    "left": j * imgWidth 
                    });
                    count++;
                }
                
            }
        $(".image-frame1").find('img').attr({"width": imgWidth});
    }	

    function RandomNumber(a,b)
    {
		return Math.floor(Math.random()*(b-a+1)+a);
	}

    function swap()
    {
        var imageList = $(".image-frame1").find('ul').find('li');
        var random = RandomNumber(0, imageList.length-1);
        var imageItem = imageList.eq(random);
        imageList.each(function(index){
            if(index != random){
                var xOffset = Math.floor(parseInt($(this).offset().left) - parseInt(imageItem.offset().left));
                var yOffset = Math.floor(parseInt($(this).offset().top) - parseInt(imageItem.offset().top));
                var imageWidth = Math.floor(imageItem.width());
                if((yOffset == 0 || xOffset == 0) && (yOffset == imageWidth || xOffset == imageWidth))
                {
                    $(this).animate({
                        left : imageItem.css('left'),
                        top : imageItem.css('top')
                    }, 1000)
                    imageItem.animate({
                        left : $(this).css('left'),
                        top : $(this).css('top')
                    }, 1000)

                    return false;   

                }
            }
        })
    }

	 interval = setInterval (function(){ 
                swap(); 
        }, 1000);
    
}