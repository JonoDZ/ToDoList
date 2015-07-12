

window.onload=function setImgSize(){

var list = document.getElementById("backgroundImgList");


	var elementChildren = list.children;
	for (var i = 0; i < list.children.length; i++) {
	    
		var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		var windowHeightString = windowHeight.toString() + "px";
		var windowWidthString = windowWidth.toString() + "px";

		var imgNaturalHeight = list.children[i].naturalHeight;
		var imgNaturalWidth = list.children[i].naturalWidth;
		var imgNaturalRatio = imgNaturalHeight/imgNaturalWidth;

		var widthCompare = windowWidth / imgNaturalWidth;
		var heightCompare = windowHeight / imgNaturalHeight;

		if (widthCompare >= heightCompare) {

			var imgNewHeight = imgNaturalRatio * windowWidth;
			imgNewHeight = Math.round(imgNewHeight);
			imgNewHeight = imgNewHeight.toString() + "px";

			list.children[i].style.width = windowWidthString;
			list.children[i].style.height = imgNewHeight;
		}

		else if (heightCompare > widthCompare) {
			var imgNewWidth = windowHeight / imgNaturalRatio;
			imgNewWidth = Math.round(imgNewWidth);
			imgNewWidth = imgNewWidth.toString() + "px";

			list.children[i].style.height = windowHeightString;
			list.children[i].style.width = imgNewWidth;
		}

	};
};
