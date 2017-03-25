/*
 * (c) 2017 Luís Silva (luismrsilva)
 * */

function Item(stop_list, parent, title, minutes){
	this.stop_list = stop_list;
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

Item.prototype.renew = function(){
};

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
	this.stop_list.removeItem(this);
	this.parent.removeChild(this.element);
};
