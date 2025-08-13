'use strict';
(function () {
	var SHOPIFY_APP_HOST = "https://app.sesami.co";

	var http = function(url, method, body, callback, error){
	    var xhr = new XMLHttpRequest();
	    xhr.open(method, url);
	    xhr.withCredentials = false;
	    xhr.onreadystatechange = function() {
	        if (xhr.readyState === 4) {
	            if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText !== '')) {
	                callback({
	                    url: url,
	                    status: 200,
	                    body: xhr.responseText || ''
	                });
	            }
	            else {
	                error({
	                    url: url,
	                    status: xhr.status,
	                    body: xhr.responseText || ''
	                });
	            }
	        }
	    };
      if(method.toLowerCase() === "post"){
      	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      	xhr.setRequestHeader("X-Sesami-Origin", (window.Shopify && window.Shopify.shop && 'https://'+window.Shopify.shop) || (window.location && window.location.origin));
	    xhr.send(JSON.stringify(body));
      }else{
        xhr.send();
      }
	}

	var throttle = function(func, limit){
		var inThrottle
		return function(){
			var args = arguments
		    var context = this
		    if (!inThrottle) {
		      func.apply(context, args)
		      inThrottle = true
		      setTimeout(function(){inThrottle = false}, limit)
		    }
		}
	}

	function SesamiCart(){
		this.requestCount = 0
	  	this.check = true
	  	this.locked = false
	    this.timeout = null
	    this.form = null
	    this.initialized = window.SesamiShopify && window.SesamiShopify.verifyCartInitialized
	    this.accessToken = window.SesamiShopify ? window.SesamiShopify.accessToken : null
	    this.rejected = []
	    this.allowed = []
		this.services = []
		this.servicesLoaded = false
	    this.container = null
	}

	SesamiCart.prototype.throttledReset = throttle(function(){
    	this.requestCount = 0;
    	this.debouncedFetch();
    },5000)

	SesamiCart.prototype.init = function(){
    	if(this.initialized){
    		return
    	}
    	this.attachListeners()
		if(!this.accessToken){
			console.error("Sesami: Unable to verify appointments - No access token.")
			return;
		}
		if(window && window.SesamiShopify){
			window.SesamiShopify.verifyCartInitialized = true
		}
		this.initialized = true
    	this.form = this.findCartForm()
    	this.addCSS()
		this.fetchCart()
    }

    SesamiCart.prototype.lock = function(){
    	var event = document.createEvent('Event');
		event.initEvent('sesami:checkout:lock', true, true);
		window.dispatchEvent(event)
    	if(!this.form || this.locked){
    		return
    	}
    	var submitButton = this.findSubmitButton()
		if(submitButton){
			submitButton.setAttribute("disabled","disabled")
			this.locked = true
		}
    }

    SesamiCart.prototype.unlock = function(){
    	var event = document.createEvent('Event');
		event.initEvent('sesami:checkout:unlock', true, true);
		window.dispatchEvent(event)
    	if(!this.locked){
    		return
    	}
    	var submitButton = this.findSubmitButton()
    	if(submitButton){
			submitButton.removeAttribute("disabled")
			this.locked = false
		}
    }

    SesamiCart.prototype.findSubmitButton = function(){
    	if(!this.form){
    		return false
    	}
    	var submitButton = this.form.querySelector("input[name='checkout']") || this.form.querySelector("button[name='checkout']")
		if(submitButton){
			return submitButton
		}
		return false
    }

    SesamiCart.prototype.findCartForm = function(){
		var arr_elms = document.body.getElementsByTagName("form");
		var elms_len = arr_elms.length;
		for (var i = 0; i < elms_len; i++) {
		  if(arr_elms[i].getAttribute("action") != null){  
		  	if(arr_elms[i].getAttribute("action") === "/cart"){
		  		return arr_elms[i]
		  	}
		  }
		}
		return null
	}

	SesamiCart.prototype.renderErrors = function(){
		if(!this.container){
			this.container = document.createElement("div")
			document.body.appendChild(this.container);
		}
		this.container.innerHTML = ''
		if(this.rejected && this.rejected.length){
			var innerContainer = document.createElement("ul")
			innerContainer.className = "sesami__cart_error"
			for(var i = 0; i < this.rejected.length; i++){
				var item = this.rejected[i]
				var thisItemContainer = document.createElement("li")
				thisItemContainer.className = "sesami__cart_error_item"
				var imageMarkup = item.image ? '<img src="'+item.image+'"/>' : ''
				thisItemContainer.innerHTML = '<div class="sesami__cart_error_row"><div class="sesami__cart_error_img_wrapper">'+imageMarkup+'</div><div><strong>'+item.title+'</strong><span>'+item.message+'</span></div></div>'
				innerContainer.appendChild(thisItemContainer)
			}
			this.container.appendChild(innerContainer)
		}
	}
    SesamiCart.prototype.handleResponse = function(response){
    	try{
    		var res = JSON.parse(response.body)
			this.services = res.services
			this.servicesLoaded = true
    		if(!res.allowed || !res.rejected){
    			console.error("Sesami: Bad reponse", res);
    			return;
    		}
    		if(!res.allowed.length && !res.rejected.length){
    			this.rejected = []
    			this.renderErrors()
				this.unlock()
    			return
    		}
    		if(res.rejected.length){
    			if(JSON.stringify(res.rejected) !== JSON.stringify(this.rejected)){
		 			this.rejected = res.rejected
		 			this.renderErrors()
		 		}
    			this.lock()
    		}else{
    			this.rejected = []
    			this.renderErrors()
    			this.unlock()
    		}
    		this.allowed = res.allowed
    		this.debouncedFetch()

    	}catch(err){
    		console.error("Sesami: Error parsing response", err);
    	}
    }

    SesamiCart.prototype.handleError = function(error){
    	console.log("error",error)
    }


    SesamiCart.prototype.attachListeners = function(){
    	window.addEventListener("scroll", this.throttledReset.bind(this))
    	document.addEventListener("click", this.throttledReset.bind(this))
    	document.addEventListener("mousemove", this.throttledReset.bind(this))
    	document.addEventListener("keypress", this.throttledReset.bind(this))
    }

    SesamiCart.prototype.removeListeners = function(){
    	window.removeEventListener("scroll", this.throttledReset.bind(this))
    	document.removeEventListener("click", this.throttledReset.bind(this))
    	document.removeEventListener("mousemove", this.throttledReset.bind(this))
    	document.removeEventListener("keypress", this.throttledReset.bind(this))
    }

    SesamiCart.prototype.fetchCart = function(){
    	this.requestCount++
    	var _this = this
    	http("/cart.js","GET",null,function(cart){
    		try{
    			var parsedResponse = JSON.parse(cart.body)
				var inCartProductIds = parsedResponse.items.map(item => item.product_id)
				var hasSesamiService = inCartProductIds.find(inCartProductId => _this.services.includes(inCartProductId))
	    		if(parsedResponse.item_count && (!_this.servicesLoaded || hasSesamiService)){
		        	http(SHOPIFY_APP_HOST+"/availabilities/verify?accesstoken="+_this.accessToken,"POST",cart,_this.handleResponse.bind(_this),_this.handleError.bind(_this))
	    		}else{
	    			_this.rejected = []
	    			_this.allowed = []
	    			_this.renderErrors()
					_this.unlock()
	    			_this.debouncedFetch()
	    		}
    		}catch(err){
	      		console.log("err:",err)
    		}
	      },function(err){
	      	console.log("err:",err)
	    })
    }

    SesamiCart.prototype.debouncedFetch = function(){
	    clearTimeout(this.timeout);
	    var time = ((this.requestCount*2) + 1) * 1000
	    var context = this

	    this.timeout = setTimeout(function(){
	    	this.fetchCart()
	    }.bind(this), time);
    }
    SesamiCart.prototype._injectCSS = function(input){
		if (this.styleNode == null) {
			this.styleNode = window.document.createElement('style');
			this.styleNode.id = 'sesami_cart__css';
			this.styleNode.innerHTML = '';
			document.getElementsByTagName("head")[0].appendChild(this.styleNode)
		}
		var content = null;
		if (typeof input === 'string') { 
			content = input;
		} else
		if (typeof input === 'function') { 
			content = input.toString().
				replace(/^[^\/]+\/\*!?/, '').
				replace(/\*\/[^\/]+$/, '');
		} else {
			throw 'Type (' + (typeof input) + ') is not supported.';
		}
		
		if (content != null)
			this.styleNode.innerHTML += '\n' + content;
		
		return this.styleNode;
	}
	SesamiCart.prototype.addCSS = function(){
	this._injectCSS(function(){/*
		
		ul.sesami__cart_error {
		    position: fixed;
		    list-style: none;
		    font-size: 16px;
		    margin: 0;
		    font-family: sans-serif;
		    bottom: 16px;
		    left: 16px;
		    right: 16px;
		    max-width: 768px;
		    z-index: 2147483647;
		    background: #fff;
		    padding: 8px;
		    box-shadow: inset 0 3px 0 0 #de3618, inset 0 0 0 0 transparent, 0 0 0 1px rgba(63,63,68,.05), 0 1px 3px 0 rgba(63,63,68,.15);
		    background-color: #fdf3f0;
		}
		li.sesami__cart_error_item:not(:last-child) {
		    margin-bottom: 8px;
		    padding-bottom: 8px;
		    border-bottom: 1px solid rgba(0,0,0,0.1);
		}
		.sesami__cart_error_row {
		    display: flex;
		    align-items: center;
		}
		.sesami__cart_error_row > div {
		    flex-direction: column;
		    display: flex;
		}
		.sesami__cart_error_img_wrapper {
			background: #DDD;
		    max-width: 56px;
		    margin-right: 16px;
		}
		.sesami__cart_error_img_wrapper > img{
			width: 100%;
			height: auto;
		}
		.sesami__cart_error_row > div > strong {
		    font-size: 0.9em;
		}

	*/})
	}
	var sc = new SesamiCart()
	return sc.init();
})();