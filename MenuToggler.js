/* Simple menu toggler using JS and CSS
 * (c) 2017 Luís Silva (luismrsilva) */


function MenuToggler(){
	// body most have have empty class (class it will be overridden)
	this.menuIsHidden = false;
}

MenuToggler.prototype.toggleMennu = function(){
	if(this.menuIsHidden){
		this.showMenu();
	}else{
		this.hideMenu();
	}
}

MenuToggler.prototype.hideMenu = function(){
	document.body.className = "_menu_hidden";
	this.menuIsHidden = true;
}

MenuToggler.prototype.showMenu = function(){
	document.body.className = "";
	this.menuIsHidden = false;
}
