/*
 * (c) 2017 Luís Silva (luismrsilva)
 * */

function byId(id){
	return document.getElementById(id);
}

/* zero pad */
function zp(num){
	if(num > 9){
		return num;
	}
	return "0" + num;
}

function toggle(el_id){
	var el = byId(el_id);
	if(el.style.display == "none"){
		el.style.display = "";
	}else{
		el.style.display = "none";
	}
}
