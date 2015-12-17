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

			//assign entire current list entry
			var currentLiItem = el.parentNode;
					//watch for click on parent
					// - google deffering a click event / bubbling
					//

/*
	toggle class on tick/return to change hidden class.
-line through to become “completed” Class

editing class for line through/ticked - use to hide/show all aspects of editing

- elements.classlist


*/
			currentLiItem.childNodes[0].classList.toggle("linethrough");

		}
		
		//when the delete button is clicked:
		else if (el.childNodes[0].className === 'deleteButton') {
			//remove toDoList item
			this.removeChild(currentLiItem);
		}

		//when the delete button is clicked: switch the toDo list text to an Input box
		else if (el.childNodes[0].className === 'editButton') {

			//assign current list entry
			var currentLiItem = currentLiItem;

			// assign current list item Text
			var currentLiText = currentLiItem.childNodes[0];

			//create the temporary input box
			var tempLiInputBox = document.createElement("input");
			tempLiInputBox.type = "text";
			tempLiInputBox.className = "toDoInput";

			//replace the toDoList item with the temporary input box
			currentLiItem.replaceChild(tempLiInputBox, currentLiText);

			//remove the edit button
			currentLiItem.removeChild(el);

			//insert confirm and cancel buttons
			createToDoItemButton('confirmChange', currentLiItem);
			createToDoItemButton('cancelChange', currentLiItem);

			tempLiInputBox.focus();

			//when user takes the following actions on the temporary input box
			tempLiInputBox.onkeyup = function(event)
			{
				
				//On "Enter" - insert new text
				if (event.which==13) {
					
					//remove tick/return boxes
					currentLiItem.removeChild(currentLiItem.childNodes[4])
					currentLiItem.removeChild(currentLiItem.childNodes[3])

					//recreate edit box
					createToDoItemButton("edit", currentLiItem);

					//store new text, ready to be inserted
					currentLiText.textContent = tempLiInputBox.value;

					//insert new next into the list
					currentLiItem.replaceChild(currentLiText, tempLiInputBox);	

				}

				//On "Esc" - insert old text
				else if (event.which==27) {
					
				//remove tick/return boxes
					currentLiItem.removeChild(currentLiItem.childNodes[4])
					currentLiItem.removeChild(currentLiItem.childNodes[3])

					//recreate edit box
					createToDoItemButton("edit", currentLiItem);

					//insert new next into the list
					currentLiItem.replaceChild(currentLiText, tempLiInputBox);	
				

				}
			}
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
					
		// Put the ToDoList into Localstorage as string
		localStorage.setItem('ToDoListHTML', JSON.stringify(document.getElementById("todoList").innerHTML));
			//issues with HTML change, look to save each 'item' seperately "seperation of concerns"

		inputText.focus();	
	}

	loadButton.onclick = function () {

		//Parse String, load HTML back into document.
		document.getElementById("todoList").innerHTML = JSON.parse(localStorage.getItem('ToDoListHTML'));
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
		span.className = "textSpan";
		span.textContent = itemTextA;

		list.appendChild(listItem);
		
		//create ToDo List Buttons
		createToDoItemButton("delete", listItem);
		createToDoItemButton("line", listItem);
		createToDoItemButton("edit", listItem);

	};

	function createToDoItemButton (buttonName, listItem) {
		var anchorElement = document.createElement("a");
		var imgElement = document.createElement("img");
		imgElement.className = buttonName + "Button";
		anchorElement.appendChild(imgElement);
		listItem.appendChild(anchorElement);
	};
