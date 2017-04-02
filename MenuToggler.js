/* Simple menu toggler using JS and CSS
 * (c) 2017 Luís Silva (luismrsilva) */


function MenuToggler(){
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
	document.body.className += " _menu_hidden";
	this.menuIsHidden = true;
}

MenuToggler.prototype.showMenu = function(){
	document.body.className = document.body.className.replace(/(?:^|\s*)_menu_hidden(?!\S)/g, "");
	this.menuIsHidden = false;
}
