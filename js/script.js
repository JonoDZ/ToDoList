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


//cross out line on click
list.addEventListener('click', function(e) {
	var el = e.target;
	if (el.className === 'lineButton') {
		// delete
		el.parentNode.style.textDecoration="line-through";
	}
});



//
inItemText.onkeyup = function(event)

{	// event.which 13 = ENTER
	if(event.which == 13)
	{	
		inputToToDo();
	}
}

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
	listItem.id = "list" + i;
	listItem.className = "toDoEach";
	var span = document.createElement('span');
	listItem.appendChild(span);
	span.innerText = itemTextA;

	//create delete button
	var imgItem = document.createElement("img");
	imgItem.id = "delBut" + i;
	imgItem.className = "deleteButton";
	imgItem.src ="./images/red.png";

	//put items into HTML
	list.appendChild(listItem);
	listItem.appendChild(imgItem);

	i++;
};

var i = 0;

//garbage collection
//accessability (img/a)
//storage
//dragging list order - DOM events - drag?
