// each entry should look like this:
// 	<li><input type="checkbox"/> Test me please </li>
//


inputText.focus();
var buttonNew = document.getElementById('buttonAdd');
var saveButton = document.getElementById('saveBut');
var loadButton = document.getElementById('loadBut');
var resetButton = document.getElementById('resetBut');
var list = document.getElementById("todoList");


//listen for Clicks on list item buttons
	list.addEventListener('click', function(e) {
		var el = e.target.parentNode;

		//Cross' out text if lineButton is clicked 
		if (el.childNodes[0].className === 'lineButton') {
			
/*
//--		//ITERATION 1
			
					if (el.parentNode.style.textDecoration === "line-through") {
						el.parentNode.style.textDecoration="none";
					}

					else {
						el.parentNode.style.textDecoration="line-through";
					}
					
			//advised to control through CSS Classes, as opposed to directly setting CSS Rules.

//--		//ITERATION 2

						if (el.parentNode.childNodes[0].className === "textSpan noLinethrough") {
						el.parentNode.childNodes[0].className = "textSpan linethrough";
					}

					else if (el.parentNode.childNodes[0].className === "textSpan linethrough") {
						el.parentNode.childNodes[0].className="textSpan noLinethrough";
					}
					
*/
			//iteration 2 required a specific string from .className, would cause issues when adding extra classes in

			//ITERATION 3

			//store className as string
			var textClassName = el.parentNode.childNodes[0].className;

			//search for "lineThrough" in all CSS class' applied to element
			var searchResultsLineThrough = textClassName.search("linethrough");

			//if lineThrough Class is present
			if (searchResultsLineThrough != -1) {
				el.parentNode.childNodes[0].className = textClassName.replace("linethrough", "noLinethrough");
			}

			//if lineThrough Class is not present
			else if (searchResultsLineThrough = -1) {
				el.parentNode.childNodes[0].className = textClassName.replace("noLinethrough", "linethrough");
			}

		}
		
		//Delete list item, on click of the delete button
		else if (el.childNodes[0].className === 'deleteButton') {
			this.removeChild(el.parentNode);
		}

		//on click of Edit Button - switch list item text to an Input box
		else if (el.childNodes[0].className === 'editButton') {

			// assign current list item
			var a = el.parentNode.childNodes[0];

			//create temp input box
			var b = document.createElement("input");
			b.type = "text";
			b.className = "toDoInput";

			//replace list item with input box
			a.parentNode.replaceChild(b, a);
			b.focus();


			b.onkeyup = function(event)
			{
				
				//On "Enter" - insert new text
				if (event.which==13) {
					
					a.textContent = b.value;
					b.parentNode.replaceChild(a, b);
				}

				//On "Esc" - insert old text
				else if (event.which==27) {
					
					a.textContent = b.value;
					b.parentNode.replaceChild(a, b);
				}
			}

			// execute when user leaves the input box
			b.onblur = function (){

				b.value = b.value.trim();

				//use old text (no current value)
				if (!b.value) {
					b.parentNode.replaceChild(a, b);
				}

				//use new text
				else {
					a.textContent = b.value;
					b.parentNode.replaceChild(a, b);
				}
			} //end onblur
		} //end else if for 'editButton' onclick event
	}); //end entire onclick listener event   

//enter text when pressing enter
	inputText.onkeyup = function(event) {	// event.which 13 = ENTER
		if(event.which == 13){	
			inputToToDo();
		}
	}

//enter text when clicking "add"
	buttonNew.onclick = function () {
		inputToToDo();
	}


//reset/save/load on click of relavent buttons
	resetButton.onclick = function () {
			document.getElementById('todoList').innerHTML = "";
			inputText.focus();
	}

	saveButton.onclick = function () {
		docCookies.setItem('saveCookie', document.getElementById("todoList").innerHTML);
		inputText.focus();	
	}

	loadButton.onclick = function () {
		document.getElementById("todoList").innerHTML = docCookies.getItem('saveCookie');
		inputText.focus();
	}

//take text in input box, convert to todo item.
	function inputToToDo () {

		//get text from input box
		var inputText = document.getElementById("inputText");
		var itemText = inputText.value.trim();

		if (!itemText) 
		{
			document.getElementById("inputText").value	= "";
			inputText.focus();
			return false;
		};

//--	// why not:
		/* 
		else {
			addNewItem(list, itemText);
			document.getElementById("inputText").value	= "";
			inputText.focus();
		}
		*/

		addNewItem(list, itemText);
		document.getElementById("inputText").value	= "";
		inputText.focus();
	};


//creates List elements, adds to DOM
	function addNewItem(list, itemTextA) {
		
		//create <Li> for the ToDo item
		var listItem = document.createElement("li");
		listItem.className = "toDoEach";
		listItem.draggable = "true";
		var span = document.createElement('span');
		listItem.appendChild(span);
//--	span.className = "textSpan noLinethrough";
		span.className = "textSpan" + " " + "noLinethrough";
		span.textContent = itemTextA;

		//create delete <span>

		list.appendChild(listItem);

		/*
		var delItem = document.createElement("a");
		var delImg = document.createElement("img");
		delImg.className = "deleteButton";
		delItem.appendChild(delImg);

		var lineItem = document.createElement("a");
		var lineImg = document.createElement("img");
		linImg.className = "lineButton";
		lineItem.appendChild(lineImg);

		var editItem = document.createElement("a");
		var editImg = document.createElement("img");
		Img.className = "editButton";
		editItem.appendChild(editImg);
		*/

		
//--	//create ToDo List Buttons
		createListItemButton("delete");
		createListItemButton("line");
		createListItemButton("edit");

		function createListItemButton (buttonName) {
			var anchorElement = document.createElement("a");
			var imgElement = document.createElement("img");
			imgElement.className = buttonName + "Button";
			anchorElement.appendChild(imgElement);
			listItem.appendChild(anchorElement);
		}
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