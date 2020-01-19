function CreateList(){
	alert("走");
	this.oWrap = document.createElement("div");
	this.copyright = document.createElement("div");
	this.initialize.apply(this,arguments);
	this.click.call(this);
}
CreateList.prototype = {
	initialize:function(aData){
		var ulObj,liObj,i;
			ulObj = document.createElement("ul");
		if(aData!=null && aData!=undefined && aData.length>0){
			for(i=0;i<aData.length;i++){
				if(aData[i].text!=""){
					liObj = document.createElement("li");
					liObj.innerHTML = "<a href='#'>" + aData[i].text + "</a>";
					var ll = null ,ululObj = null,divObj = null;
					if(aData[i].children.length>0){
						chl = aData[i].children;
						divObj = document.createElement("div");
						ululObj = document.createElement("ul");
						for(var j=0;j<chl.length;j++){
							ll = document.createElement("li");
							ll.innerHTML = "<a href=\"" + chl[j].href + "\"  target=\"_blank\">" + chl[j].text + "</a>";
							ululObj.appendChild(ll);
						}
						liObj.appendChild(divObj);
						divObj.appendChild(ululObj);
				
						divObj.className = "sub_item_box";
					}
				}
				ulObj.appendChild(liObj);
				ulObj.style.height = "31px"
				ulObj.className = "item_box"
			}
			this.oWrap.appendChild(ulObj);
			aData.shift();
			this.oWrap.id = "wrap";
			this.oWrap.style.height = "500px";
			this.oWrap.style.overflow = "auto";
		    document.body.appendChild(this.oWrap);
			console.info("测试");
			console.info(this.oWrap);
		}
		
	},
	click:function(){
		this.oWrap.onclick = function(event) {
			var objects = document.getElementsByClassName("sub_item_box");
			console.info(objects);
			for(var i=0;i<objects.length;i++){
				var item = objects[i];
				item.style.height = "0px";
					console.log(item);
			}
			
			var oEv, oTarget, oParent, i;
			oEv = event || window.event;
			oTarget = oEv.target || oEv.srcElement;
			//oParent = document.querySelector('li div.sub_item_box');
			oParent = oTarget.parentElement || oTarget.parentNode;
			//	oParent = document.querySelector('li div.sub_item_box ul');
			var divParent = oParent.querySelector('div.sub_item_box');
			var ulParent = divParent.querySelector('ul');
			oParent.height = function() {
				var iHeight = 0;
				for(i = 0;i < ulParent.children.length; i++) iHeight += ulParent.children[i].offsetHeight;
				return iHeight
			}();
			console.info(oParent);
				divParent.style.height = oParent.height;
				divParent.style.overflow = "auto";
				divParent.style.MaxHeight = "300px";
			if((oTarget.tagName.toUpperCase() == "A") || (oTarget.tagName.toUpperCase() == "LI")) {
				/*var aSiblings = that.siblings(oParent), count, i;
				for(count = i = 0; i < aSiblings.length; i++) {
					that.startMove(aSiblings[i], oTarget.offsetHeight, "buffer", function() {
						this.children[0].className = "";
						if(++count == aSiblings.length) {
							if(oParent.offsetHeight == oTarget.offsetHeight) {
								oTarget.className = "current";
								that.startMove(oParent, oParent.height, "flex")
							}
							else {
								that.startMove(oParent, oTarget.offsetHeight, "buffer", function() {
									oTarget.className = ""	
								})
							}								
						}	
					})
				}
				console.info(oParent);
				divParent.style.height = oParent.height;
				divParent.style.overflow = "auto";*/
			}
		}
	},
		startMove: function(obj, iTarget, type, callback) {
		var that = this;
		clearInterval(obj.timer);
		obj.iSpeed = 0;
		obj.timer = setInterval(function() {
			that[type].call(that, obj, iTarget, callback)
		}, 30)
	},
	buffer: function(obj, iTarget, callback) {
		obj.iSpeed = (iTarget - obj.offsetHeight) / 5;
		obj.iSpeed = obj.iSpeed > 0 ? Math.ceil(obj.iSpeed) : Math.floor(obj.iSpeed);
		obj.offsetHeight == iTarget ? (clearInterval(obj.timer), callback && callback.call(obj)) : obj.style.height = obj.offsetHeight + obj.iSpeed + "px"
	},
	flex: function(obj, iTarget, callback) {
		obj.iSpeed += (iTarget - obj.offsetHeight) / 6;
		obj.iSpeed *= 0.75;
		if(Math.abs(iTarget - obj.offsetHeight) <= 1 && Math.abs(obj.iSpeed) <= 1) {
			clearInterval(obj.timer);
			obj.style.height = iTarget + "px";
			callback && callback.call(obj)
		}
		else {
			obj.style.height = obj.offsetHeight + obj.iSpeed + "px"
		}
	},
	siblings: function(element) {
		var aTmp = [], oParent = element.parentElement || element.parentNode, i;
		for(i = 0; i < oParent.children.length; i++) element != oParent.children[i] && aTmp.push(oParent.children[i]);
		return aTmp
	}
}