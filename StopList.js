/*
 * (c) 2017 Luís Silva (luismrsilva)
 * */

function StopList(button_skip, button_start, ul_items, label_current_title, label_now, label_left, label_total_left){
	this.button_skip = byId(button_skip);
	this.button_start = byId(button_start);
	this.ul_items = byId(ul_items);
	this.label_current_title = byId(label_current_title);
	this.label_now = byId(label_now);
	this.label_left = byId(label_left);
	this.label_total_left = byId(label_total_left);

	this.total_seconds_left = 0;
	this.seconds_left = 0;

	this.itemQueue = new Array();
	this.finishedQueue = new Array();
	this.currentItem = null;

	this.running = false;
	this.paused = false;

	var thisStopList = this;
	this.timer = setInterval(function(){thisStopList.loop()}, 1000);
	this.loop();

	this.audio = new Audio("https://upload.wikimedia.org/wikipedia/commons/0/05/Beep-09.ogg");
}

StopList.prototype.insert = function(item){
	this.itemQueue.push(item);
	this.total_seconds_left += item.getTotalSeconds();
	this.updateTotalLeft();
	this.updateBigButton();
};

StopList.prototype.addItem = function(title, minutes){
	var item = new Item(this, this.ul_items, title, minutes, 0);
	this.insert(item);
};

StopList.prototype.removeItem = function(item){
	var index = this.itemQueue.indexOf(item);
	if(index >= 0){
		this.itemQueue.splice(index, 1);
	}else{
		index = this.finishedQueue.indexOf(item);
		if(index >= 0){
			this.finishedQueue.splice(index, 1);
		}else{
			console.log("ERROR: no such item");
		}
	}
	console.log(item.isEnabled());
	if(item.isEnabled()){
		this.total_seconds_left -= item.getTotalSeconds();
		this.updateTotalLeft();
	}
	this.updateBigButton();
}

StopList.prototype.rewind = function(){
	this.total_seconds_left = 0;
	this.seconds_left = 0;

	var len = this.finishedQueue.length;
	for(var i = 0; i < len; i++){
		var item = this.finishedQueue[i];
		item.renew();
		this.insert(item);
	}
	this.finishedQueue = new Array();
}

StopList.prototype.getNextItem = function(){
	return this.itemQueue.shift();
};

StopList.prototype.updateTotalLeft = function(){
	return this.updateCountdown(this.label_total_left, this.total_seconds_left);
}

StopList.prototype.updateCountdown = function(el, seconds){
	var hours = Math.floor(seconds / 3600);
	var minutes = Math.floor((seconds % 3600) / 60);
	var seconds = Math.floor(seconds % 60);

	el.innerText =	(hours > 0 ? zp(hours) + "h " : "")
					+ zp(minutes) + "m " + zp(seconds) + "s";
};

StopList.prototype.updateNow = function(){
	var now = new Date();
	this.label_now.innerText = zp(now.getHours()) + ":" + zp(now.getMinutes()) + ":" + zp(now.getSeconds());
};

StopList.prototype.loop = function(){
	this.updateNow();
	if(this.isPaused == false && this.running){
		this.seconds_left--;
		this.total_seconds_left--;
		this.updateCountdown(this.label_left, this.seconds_left);
		this.updateTotalLeft();

		if(this.seconds_left <= 0){
			this.start();
		}
	}
};

StopList.prototype.start = function(){
	if(this.currentItem != null){
		this.currentItem.setActive(false);
		this.onFinishItem();

		this.finishedQueue.push(this.currentItem);
		this.currentItem = null;
	}

	this.isPaused = false;
	if(this.itemQueue.length > 0){
		this.currentItem = this.getNextItem();
		this.label_current_title.innerText = this.currentItem.getTitle();
		this.seconds_left = this.currentItem.getTotalSeconds();
		this.currentItem.setActive(true);

		this.running = true;
	}else{
		this.running = false;
		this.onFinishAll();
	}
};

StopList.prototype.bigButtonPress = function(){
	if(!this.running){
		this.start();
	}else{
		this.isPaused = !this.isPaused;
	}
	this.updateBigButton();
};

StopList.prototype.skipButtonPress = function(){
	this.total_seconds_left -= this.seconds_left;
	this.seconds_left = 0;
	this.updateCountdown(this.label_left, this.seconds_left);
	this.updateTotalLeft();
	this.start();
	this.updateBigButton();
}

StopList.prototype.updateBigButton = function(button){
	this.button_start.disabled = !this.running && this.itemQueue.length == 0;

	button_start.innerHTML =	(this.isPaused || this.running == false)
								? "&#9654;" : "&#9646;&#9646;";
	button_start.title =		(this.isPaused || this.running == false)
								? "Start" : "Pause";


	this.button_skip.disabled = !this.running;
};

StopList.prototype.onFinishItem = function(item){
	this.showWarning();
}

StopList.prototype.onFinishAll = function(){
	this.rewind();
	this.updateBigButton();
}

StopList.prototype.showWarning = function(){
	document.body.className += " warning";
	this.audio.currentTime = 0;
	this.audio.play();

	if(this.warning_fade){
		clearTimeout(this.warning_fade);
	}
	var leThis = this;
	this.warning_fade = setTimeout(function(){
		document.body.className = document.body.className.replace(/(?:^|\s*)warning(?!\S)/g, "");
	}, 2000);
}
