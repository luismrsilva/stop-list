/*
 * (c) 2017 Luís Silva (luismrsilva)
 * */

function Item(items_array, parent, title, minutes){
	this.items_array = items_array;
	this.title = title;
	this.seconds = minutes * 60;
	this.parent = parent;
	this.element = document.createElement("li");
	if(title == null || title.length < 1){
		this.element.innerHTML =
			"<div class='title no_title'>(untitled)</div>";
	}else{
		this.element.innerHTML =
			"<div class='title'>" + title + "</div>";
	}

	var el_desc = document.createElement("div");
	el_desc.className = "desc";
	el_desc.innerHTML = "<div class='time'>" + minutes + "</div>";
	this.element.appendChild(el_desc);

	this.button_remove = document.createElement("button");
	this.button_remove.className = "btn-sq";
	this.button_remove.innerText = "X";

	var leThis = this;
	this.button_remove.onclick = function(){leThis.remove()};
	el_desc.appendChild(this.button_remove);

	this.parent.appendChild(this.element);
}

Item.prototype.getTotalSeconds = function(){
	return this.seconds;
};

Item.prototype.getTitle = function(){
	return this.title;
}

Item.prototype.setActive = function(active){
	this.element.className = "item" + (active ? "_active" : "");
};

Item.prototype.remove = function(){
	var index = this.items_array.indexOf(this);
	this.items_array.splice(index, 1);
	this.parent.removeChild(this.element);
};
