// each entry should look like this:
// 	<li><input type="checkbox"/> Test me please </li>
//


inputText.focus();
var buttonNew = document.getElementById('buttonAdd');
var saveButton = document.getElementById('saveBut');
var loadButton = document.getElementById('loadBut');
var resetButton = document.getElementById('resetBut');
var deleteClick = document.getElementsByClassName('deleteButton');
var list = document.getElementById("todoList");


//delete line when clicking 'X'
list.addEventListener('click', function(e) {
	var el = e.target;
	if (el.className === 'deleteButton') {

		this.removeChild(el.parentNode);
		
	}
});


//cross out text on clicking '---'
list.addEventListener('click', function(e) {
	var el = e.target;
	if (el.className === 'lineButton') {
		// delete

		if (el.parentNode.style.textDecoration === "line-through") {
			el.parentNode.style.textDecoration="none";
		}

		else {
			el.parentNode.style.textDecoration="line-through";
		}

	}
});



//enter text when pressing enter
inputText.onkeyup = function(event)

{	// event.which 13 = ENTER
	if(event.which == 13)
	{	
		inputToToDo();
	}
}

//enter text when clicking "add"
buttonNew.onclick = function () 
	{
		inputToToDo();
	}

//clear the list when clicking 'reset'
resetButton.onclick = function () {
		document.getElementById('todoList').innerHTML = "";
		inputText.focus();
	}

//save list to cookie
saveButton.onclick = function () {
	var saveToCookie = document.getElementById("todoList").innerHTML;
	docCookies.setItem('saveCookie', saveToCookie);
	document.getElementById("todoList").innerHTML = docCookies.getItem('saveCookie');
	
}

//load list to cookie
loadButton.onclick = function () {

	
	document.getElementById("todoList").innerHTML = docCookies.getItem('saveCookie');

}

function inputToToDo () {

	var inputText = document.getElementById("inputText");
	var itemText = inputText.value.trim();

	if (!itemText) 
	{
		document.getElementById("inputText").value	= "";
		inputText.focus();
		return false;
	};

	addNewItem(list, itemText);
	
	document.getElementById("inputText").value	= "";
	inputText.focus();
};

function addNewItem(list, itemTextA) {
	
	//create toDo item
	var listItem = document.createElement("li");
	listItem.id = "list" + idCount;
	listItem.className = "toDoEach";
	var span = document.createElement('span');
	listItem.appendChild(span);
	span.textContent = itemTextA;

	//create delete span
	var imgItem = document.createElement("span");
	imgItem.id = "delBut" + idCount;
	imgItem.className = "deleteButton";
	imgItem.textContent ="X";

	//create line-through span
	var lineItem = document.createElement("span");
	lineItem.id = "linBut" + idCount;
	lineItem.className = "lineButton";
	lineItem.textContent = "---";

	//create drag button
	var dragItem = document.createElement("img");
	dragItem.id = "dragBut" + idCount;
	dragItem.className = "dragButton";
	listItem.draggable = "true";
	dragItem.src ="./images/drag.png";

	//put items into DOM
	list.appendChild(listItem);
	listItem.appendChild(imgItem);
	listItem.appendChild(lineItem);
	listItem.appendChild(dragItem);
	
	idCount++;
};

var idCount = 0;

//garbage collection
//accessability (img/a)
//storage
//dragging list order - DOM events - drag?


/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path[, domain]])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};