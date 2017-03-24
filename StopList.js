/*
 * (c) 2017 Luís Silva (luismrsilva)
 * */

function StopList(button_start, ul_items, label_current_title, label_now, label_left, label_total_left){
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

	var thisStopList = this;
	this.timer = setInterval(function(){thisStopList.loop()}, 1000);
	this.loop();

	this.audio = new Audio("https://upload.wikimedia.org/wikipedia/commons/0/05/Beep-09.ogg");
}

StopList.prototype.addItem = function(title, minutes){
	var item = new Item(this.itemQueue, this.ul_items, title, minutes, 0);
	this.itemQueue.push(item);
	this.total_seconds_left += item.getTotalSeconds();
};

StopList.prototype.getNextItem = function(){
	return this.itemQueue.shift();
};

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
	if(this.running){
		this.seconds_left--;
		this.total_seconds_left--;
		this.updateCountdown(this.label_left, this.seconds_left);
		this.updateCountdown(this.label_total_left, this.total_seconds_left);

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

StopList.prototype.onFinishItem = function(item){
	this.showWarning();
}

StopList.prototype.onFinishAll = function(){
	this.button_start.style.display = "";
}

StopList.prototype.showWarning = function(){
	document.body.className = "warning";
	this.audio.currentTime = 0;
	this.audio.play();

	if(this.warning_fade){
		clearTimeout(this.warning_fade);
	}
	var leThis = this;
	this.warning_fade = setTimeout(function(){
		document.body.className = "";
		leThis.audio.currentTime = 0;
		leThis.audio.play();
	}, 1500);
}
