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


//cross out text on clicking '---'
list.addEventListener('click', function(e) {
	var el = e.target;
	if (el.className === 'lineButton') {
		// set style

		if (el.parentNode.style.textDecoration === "line-through") {
			el.parentNode.style.textDecoration="none";
		}

		else {
			el.parentNode.style.textDecoration="line-through";
		}
	}
	
	else if (el.className === 'deleteButton') {
		this.removeChild(el.parentNode);
	}

	//on click of Edit Button - switch item to Input box
	else if (el.className === 'editToDoItem') {
		var a = el.parentNode.childNodes[0];
		var aText = a.getElementsByClassName("textSpan").textContent;
		var b = document.createElement("input");
		b.type = "text";
		b.className = "toDoInput";
		a.parentNode.replaceChild(b, a);
		b.focus();
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
	docCookies.setItem('saveCookie', document.getElementById("todoList").innerHTML);
	inputText.focus();
	
}

//load list to cookie
loadButton.onclick = function () {
	document.getElementById("todoList").innerHTML = docCookies.getItem('saveCookie');
	inputText.focus();

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

//creates various DOM elements
function addNewItem(list, itemTextA) {
	
	//create <Li> for the ToDo item
	var listItem = document.createElement("li");
	listItem.className = "toDoEach";
	listItem.draggable = "true";
	var span = document.createElement('span');
	listItem.appendChild(span);
	span.className = "textSpan";
	span.textContent = itemTextA;

	//create delete <span>
	var imgItem = document.createElement("span");
	imgItem.className = "deleteButton";
	imgItem.textContent ="X";

	//create line-through <span>
	var lineItem = document.createElement("span");
	lineItem.className = "lineButton";
	lineItem.textContent = "---";

	//create drag button img
	var dragItem = document.createElement("img");
	dragItem.className = "editToDoItem";
	dragItem.src ="./images/drag.png";

	//put <li> into DOM
	list.appendChild(listItem);

	//put these into <li>
	listItem.appendChild(imgItem);
	listItem.appendChild(lineItem);
	listItem.appendChild(dragItem);

};



/*/////////////////
Frameworks and notes
*//////////////////

//garbage collection
//accessability (img/a)
//storage
//dragging list order - DOM events - drag?

/*
done:
	functionality
		storage - in the form of cookies
			save
			load
		line through - if statement under pre-existing eventlistener
		reset button




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