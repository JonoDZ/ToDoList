// each entry should look like this:
// 	<li><input type="checkbox"/> Test me please </li>
//


inItemText.focus();
var buttonNew = document.getElementById('buttonAdd');
var deleteClick = document.getElementsByClassName('deleteButton');
var list = document.getElementById("todoList");


//delete line on click
list.addEventListener('click', function(e) {
	var el = e.target;
	if (el.className === 'deleteButton') {

		this.removeChild(el.parentNode);
		
	}
});


//cross out text on click
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
inItemText.onkeyup = function(event)

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

function removeEach() {
	var removeThis = getElementById("todoList");
	var child = document.getElementById("list0");
	removeThis.parentNode.removeChild(child);
}


function inputToToDo () {

	var inItemText = document.getElementById("inItemText")
	var itemText = inItemText.value.trim()

	if (!itemText) 
	{
		document.getElementById("inItemText").value	= "";
		inItemText.focus();
		return false;
	};

	addNewItem(list, itemText);
	
	document.getElementById("inItemText").value	= "";
	inItemText.focus();
};


function addNewItem(list, itemTextA) {
	
	//create toDo item
	var listItem = document.createElement("li");
	listItem.id = "list" + idCount;
	listItem.className = "toDoEach";
	var span = document.createElement('span');
	listItem.appendChild(span);
	span.innerText = itemTextA;

	//create delete span
	var imgItem = document.createElement("span");
	imgItem.id = "delBut" + idCount;
	imgItem.className = "deleteButton";
	imgItem.innerText ="X";

	//create line-through span
	var lineItem = document.createElement("span");
	lineItem.id = "linBut" + idCount;
	lineItem.className = "lineButton";
	lineItem.innerText = "---";

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
