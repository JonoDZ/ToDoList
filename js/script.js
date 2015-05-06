// each entry should look like this:
// 	<li><input type="checkbox"/> Test me please </li>


inItemText.focus();
var buttonNew = document.getElementById('buttonAdd');
var deleteClick = document.getElementsByClassName('deleteButton');
var list = document.getElementById("todoList");

list.addEventListener('click', function(e) {
	var el = e.target;
	if (el.nodeName === 'IMG') {
		// delete
		this.removeChild(el.parentNode);
	}
});


// Enter key triggers the list addition
inItemText.onkeyup = function(event)

{	// event.which 13 = ENTER
	if(event.which == 13)
	{	
		inputToToDo();
	}
}

// Clicking "add" triggers the list addition
buttonNew.onclick = function () 
	{
		inputToToDo();
	}

function removeEach() {
	var removeThis = getElementById("todoList");
	var child = document.getElementById("list0");
	removeThis.parentNode.removeChild(child);
}

//takes text inputbox, process it, pass it through to "addNewItem"
function inputToToDo () {

	var inItemText = document.getElementById("inItemText")
	var itemText = inItemText.value.trim()

	//check for blank space
	if (!itemText) 
	{
		document.getElementById("inItemText").value	= "";
		inItemText.focus();
		return false;
	};

	addNewItem(list, itemText);
	
	//reset inputbox
	document.getElementById("inItemText").value	= "";
	inItemText.focus();
};

//creates and adds the new item
function addNewItem(list, itemTextA) {
	
	//create toDo DOM item
	var listItem = document.createElement("li");
	listItem.id = "list" + idCount;
	listItem.className = "toDoEach";
	var span = document.createElement('span');
	listItem.appendChild(span);
	span.innerText = itemTextA;

	//create DOM delete button
	var imgItem = document.createElement("img");
	imgItem.id = "cd" + idCount;
	imgItem.className = "deleteButton";
	imgItem.src ="./images/red.png";

	//append HTML
	list.appendChild(listItem);
	listItem.appendChild(imgItem);

	idCount++;
};

//declare variable for generating ID's
var idCount = 0;



//garbage collection
//accessability (img/a)
//storage
//dragging list order - DOM events - drag?

/*

We talked about:
-----
Inheritance and the prototype chain
Delegating events, and DOM events in general (MDN has a great reference)
addEventListener
removeChild


Things for next time:
-----
Missing functions
Drag n drop
Accessibility
Local storage
Garbage collection