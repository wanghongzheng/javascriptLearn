function CreateList(){
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
		}
		
	},
	click:function(){
		this.oWrap.onclick = function(event) {
			var objects = document.getElementsByClassName("sub_item_box");
			for(var i=0;i<objects.length;i++){
				var item = objects[i];
				console.info(item.style.height);
				item.style.height = "0px";
			}
			
			var oEv, oTarget, oParent, i;
			oEv = event || window.event;
			oTarget = oEv.target || oEv.srcElement;
			if(oTarget.tagName.toUpperCase() == "A"){
				oParent = oTarget.parentElement || oTarget.parentNode;
			}else if(oTarget.tagName.toUpperCase() == "LI"){
				oParent = oTarget;
			}
			
			var divParent = oParent.querySelector('div.sub_item_box');
			var ulParent = divParent.querySelector('ul');
			oParent.height = function() {
				var iHeight = 0;
				for(i = 0;i < ulParent.children.length; i++) iHeight += ulParent.children[i].offsetHeight;
				return iHeight
			}();
			divParent.style.height = oParent.height;
			divParent.style.overflow = "auto";
			divParent.style.MaxHeight = "300px";
		}
	}
}