'use strict';
(function(){
	var SHOPIFY_APP_HOST = "https://app.sesami.co";
	
	if((window.hasOwnProperty('Shopify') && window.Shopify.designMode) || (window.hasOwnProperty('SesamiShopify') && window.SesamiShopify.hasOwnProperty('initialized'))){
		return
	}
	window.SesamiShopify = window.SesamiShopify || {}
	window.SesamiShopify = {
		initialized : false,
		resources : [],
		sesamiBaseURL : SHOPIFY_APP_HOST,
		shopId : null,
		productId : null,
		shopOrigin : null,
		accessToken : null
	}
	function isSesamiProduct(){
		var url = window.SesamiShopify.sesamiBaseURL+"/storefront/?url="+btoa(window.location.href)
		var targets = document.querySelectorAll('#sesami__buttonWrapper, .sesami__additionalButtonWrapper')
		var shopId = null
		var qs = ""
		if(targets.length){
			for (var i = 0 ; i < targets.length; i++) {
				if(
					targets[i].hasAttribute('data-sesami-product-id')
				){
					qs += "&target["+i+"][productId]="+targets[i].getAttribute('data-sesami-product-id')+"&target["+i+"][variantId]="+targets[i].getAttribute('data-sesami-variant-id')
				}
				if(
					targets[i].hasAttribute('data-sesami-shop-id')
				){
					qs += "&shopId="+targets[i].getAttribute('data-sesami-shop-id')
				}
				if(
					targets[i].hasAttribute('data-sesami-locale')
				){
					qs += "&locale="+targets[i].getAttribute('data-sesami-locale')
				}
			}
		}
		url = url+qs
		httpGet(url, function(resp){
			try{
				var body = JSON.parse(resp.body)
				if(body.status){
					window.SesamiShopify.resources = body.resources
					window.SesamiShopify.shopId = body.shopId
					window.SesamiShopify.productIds = body.productIds
					window.SesamiShopify.shopOrigin = body.shopOrigin
					window.SesamiShopify.accessToken = body.accessToken
					window.SesamiShopify.storefrontButtonLabel = body.storefrontButtonLabel
					window.SesamiShopify.removeBranding = body.removeBranding
					window.SesamiShopify.sesamiBrand = body.sesamiBrand
					window.SesamiShopify.translations = body.translations
					window.SesamiShopify.isRescheduling = body.isRescheduling
				}
				loadScripts()		
			}
			catch(err){
				// console.warn("Error parsing Sesami response:", resp)
			}
		},
		function(err){
			// console.log("err",err);
		})
	}
	function loadScripts() {
		for(var i = 0; i < window.SesamiShopify.resources.length; i++){
			loadScript(window.SesamiShopify.resources[i])
		}
	}
	function loadScript(src){
	  var s,
	      r,
	      t;
	  r = false;
	  s = document.createElement('script');
	  s.type = 'text/javascript';
	  s.src = src;
	  s.onload = s.onreadystatechange = function() {
	    if ( !r && (!this.readyState || this.readyState == 'complete') )
	    {
	      r = true;
	    }
	  };
	  t = document.getElementsByTagName('script')[0];
	  t.parentNode.insertBefore(s, t);
	}
	function httpGet(url, callback, error) {
	    var xhr = new XMLHttpRequest();

	    xhr.open('GET', url);
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

	    xhr.send();
	}
	isSesamiProduct()
})();