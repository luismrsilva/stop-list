/*
 * (c) 2024 Luís Silva (luismrsilva)
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

function pressButtonOnInputEnter(inputEl, buttonEl){
	inputEl.addEventListener("keydown", (event) => {
		if(event.keyCode == 13 /* enter */){
			buttonEl.click();
		}
	});
}

function secondsToStr(seconds){
	var hours = Math.floor(seconds / 3600);
	var minutes = Math.floor((seconds % 3600) / 60);
	var seconds = Math.floor(seconds % 60);

	return (hours > 0 ? zp(hours) + "h " : "")
					+ zp(minutes) + "m "
					+ zp(seconds) + "s";
}
