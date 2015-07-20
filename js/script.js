// each entry should look like this:
// 	<li><input type="checkbox"/> Test me please </li>
//

//ensure inputBox is focused on when page loads
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

			//store the text's className as string
			var textClassName = el.parentNode.childNodes[0].className;

			//search for "lineThrough" class against current class', store results
			var searchResultsLineThrough = textClassName.search("linethrough");

			//if lineThrough Class is present in search results
			if (searchResultsLineThrough != -1) {
				//remove the lineThrough Class, apply noLineThrough Class
				el.parentNode.childNodes[0].className = textClassName.replace("linethrough", "noLinethrough");
			}

			//if lineThrough Class is not present in search results
			else if (searchResultsLineThrough = -1) {
				//remove the noLineThrough Class, apply lineThrough Class
				el.parentNode.childNodes[0].className = textClassName.replace("noLinethrough", "linethrough");
			}

		}
		
		//when the delete button is clicked:
		else if (el.childNodes[0].className === 'deleteButton') {
			//remove toDoList item
			this.removeChild(el.parentNode);
		}

		//when the delete button is clicked: switch the toDo list text to an Input box
		else if (el.childNodes[0].className === 'editButton') {

			// assign current list item
			var currentLiText = el.parentNode.childNodes[0];

			//create the temporary input box
			var tempLiInputBox = document.createElement("input");
			tempLiInputBox.type = "text";
			tempLiInputBox.className = "toDoInput";

			//replace the toDoList item with the temporary input box
			currentLiText.parentNode.replaceChild(tempLiInputBox, currentLiText);
			tempLiInputBox.focus();

			//when user takes the following actions on the temporary input box
			tempLiInputBox.onkeyup = function(event)
			{
				
				//On "Enter" - insert new text
				if (event.which==13) {
					
					currentLiText.textContent = tempLiInputBox.value;
					tempLiInputBox.parentNode.replaceChild(currentLiText, tempLiInputBox);
				}

				//On "Esc" - insert old text
				else if (event.which==27) {
					
					currentLiText.textContent = tempLiInputBox.value;
					tempLiInputBox.parentNode.replaceChild(currentLiText, tempLiInputBox);
				}
			}

			// execute when user leaves the input box
			tempLiInputBox.onblur = function (){

				tempLiInputBox.value = tempLiInputBox.value.trim();

				//use old text (no current value)
				if (!tempLiInputBox.value) {
					tempLiInputBox.parentNode.replaceChild(currentLiText, tempLiInputBox);
				}

				//use new text
				else {
					currentLiText.textContent = tempLiInputBox.value;
					tempLiInputBox.parentNode.replaceChild(currentLiText, tempLiInputBox);
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

		//get text from input box and trim white space.
		var inputText = document.getElementById("inputText");
		var itemText = inputText.value.trim();

		//stops the function if there is no input text.
		if (!itemText) 
		{
			document.getElementById("inputText").value	= "";
			inputText.focus();
			return false;
		};

		//pass input text into function that creates all toDoList elements, and 
		//inserts them into the DOM
		addNewItem(list, itemText);
		document.getElementById("inputText").value	= "";
		inputText.focus();
	};

	 //creates toDoList elements, then adds them to DOM
	function addNewItem(list, itemTextA) {
		
		//create <Li> for the ToDo item
		var listItem = document.createElement("li");
		listItem.className = "toDoEach";
		listItem.draggable = "true";
		var span = document.createElement('span');
		listItem.appendChild(span);

		//set initial text to not be crossed out
		span.className = "textSpan" + " " + "noLinethrough";
		span.textContent = itemTextA;

		list.appendChild(listItem);
		
		//create ToDo List Buttons
		createToDoItemButton("delete");
		createToDoItemButton("line");
		createToDoItemButton("edit");


		function createToDoItemButton (buttonName) {
			var anchorElement = document.createElement("a");
			var imgElement = document.createElement("img");
			imgElement.className = buttonName + "Button";
			anchorElement.appendChild(imgElement);
			listItem.appendChild(anchorElement);
		}
	};


//below framework to be removed once a suitable alternatative to cookie storage is found. 

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