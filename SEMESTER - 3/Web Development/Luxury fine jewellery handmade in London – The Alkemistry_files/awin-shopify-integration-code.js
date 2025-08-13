(function (w) {
	var APP_VERSION = 'shopifyApp_4.0.0';
	var LIMIT_TO_SEND_CALLS = 5 * 60 * 1000; /* 5 minutes in ms */

	// atb: 23014, 22620
	var S2S_EXCEPTIONS = [
		23014, 22620, 2453, 7586, 7760, 12979, 14850, 15117, 15370, 17038, 17141, 18386, 19574, 19589, 19648, 20086,
		20922, 21051, 21066, 21097, 21130, 21208, 21279, 21321, 21487, 21518, 21526, 21580, 21626, 21671, 21908, 22013,
		22060, 22112, 22127, 22130, 22211, 22246, 22286, 22334, 22397, 22401, 22470, 22594, 22596, 22635, 22675, 22690,
		22697, 22705, 22728, 22742, 22770, 22790, 22801, 22829, 22844, 22860, 22904, 22947, 22967, 23053, 23139, 23176,
		23185, 23246, 23266, 23275, 23400, 23411, 23468, 23485, 23586, 23587, 23707, 23726, 23760, 23771, 23775, 23777,
		23789, 23809, 23855, 24076, 24077, 24080, 24107, 24162, 24211, 24229, 24286, 24355, 24445, 24475, 24540,
	];

	function setCookieDomain() {
		if (document.location.href.indexOf('.myshopify.com') !== -1) {
			var mtCookieDomainScript = document.createElement('script');
			mtCookieDomainScript.innerText = 'var AWIN = AWIN || {};\n';
			mtCookieDomainScript.innerText += 'AWIN.Tracking =  AWIN.Tracking || {};\n';
			mtCookieDomainScript.innerText += 'var domain = document.domain;\n';
			mtCookieDomainScript.innerText += 'AWIN.Tracking.cookieDomain = domain;\n';
			document.body.appendChild(mtCookieDomainScript);
		}
	}

	function getAdvertiserId(url) {
		var rx = new RegExp('[?&](advertiserid|mid|aid)=([^&]+).*$');
		var returnVal = url.match(rx);
		return returnVal === null ? '' : returnVal[2];
	}

	function getS2sEnabled(url) {
		var rx = new RegExp('[?&](s2s)=([^&]+).*$');
		var returnVal = url.match(rx);
		return returnVal === null ? undefined : JSON.parse(returnVal[2]);
	}

	function readCookiesAsString(awRegEx) {
		var aCookies = document.cookie.split(';');
		var cookies = [];
		for (var i = 0; i < aCookies.length; i++) {
			var aParts = aCookies[i].split('=');
			if (awRegEx.test(aParts[0])) {
				cookies.push(aParts[1]);
			}
		}
		return cookies.join(',');
	}

	function getAwc() {
		var rx = new RegExp('[?&]awc=([^&]+).*$');
		var returnVal = document.location.href.match(rx);

		if (returnVal !== null) {
			if (returnVal[1] && returnVal[1].match(/[0-9]+_[0-9]+_[a-zA-Z0-9]+/)) {
				return returnVal[1];
			}
		}
		// cookies
		var awcFromCookie = readCookiesAsString(/_aw_m_\d+/);
		var awcFromSnCookie = readCookiesAsString(/_aw_sn_\d+/);

		if (awcFromCookie.length > 0 && awcFromSnCookie.length > 0) {
			return awcFromCookie + ',' + awcFromSnCookie;
		} else if (awcFromCookie.length > 0) {
			return awcFromCookie;
		} else if (awcFromSnCookie.length > 0) {
			return awcFromSnCookie;
		}

		return '';
	}

	function getSource() {
		var rx = new RegExp('[?&]source=([^&]+).*$');
		var returnVal = document.location.href.match(rx);

		if (returnVal !== null) {
			var validatedValue = returnVal[1].replace(/[^a-zA-Z0-9-_]/g, '');
			return validatedValue;
		}

		var sourceFromCookie = readCookiesAsString(/_aw_channel$/);

		if (sourceFromCookie.length > 0) {
			return sourceFromCookie;
		}

		return '';
	}

	function setSourceCookie(source, expiresOverrideDate) {
		var cookieName = '_aw_channel';
		var expires = new Date();
		if (expiresOverrideDate) {
			expires.setTime(expiresOverrideDate.getTime() + 365 * 24 * 60 * 60 * 1000);
		} else {
			expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
		}

		var cookieValue = source.indexOf('|') !== -1 ? source : source + '|' + Math.round(expires.getTime() / 1000);
		var domain = location.hostname;

		document.cookie =
			cookieName + '=' + cookieValue + ';expires=' + expires.toGMTString() + ';path=/;domain=' + domain;
	}

	function getScriptUrl() {
		var scriptUrl;

		var scripts = document.getElementsByTagName('script');
		for (var n = 0; n < scripts.length; n++) {
			var script = scripts[n];
			if (script.src && script.src.indexOf('/awin-shopify-integration-code.js') !== -1) {
				scriptUrl = script.src;
			}
		}
		return scriptUrl;
	}

	function getOrderLabel() {
		try {
			return document.getElementsByClassName('os-order-number')[0].innerText.trim();
		} catch (e) {}
	}

	function getOrderRef() {
		var ref;
		try {
			var order_label = getOrderLabel();
			if (order_label) {
				var parts = order_label.split(' ');
				if (parts.length > 2) {
					// TODO: decide if this case even makes sense / is applicable => check db for orders /wo '#'
					if (/\s[\d]{4,}/.test(order_label)) {
						var order_number = extractNumber(order_label);
						if (order_number) {
							ref = order_number;
						}
					} else {
						ref = findOrderNumberPart(parts);
					}
				} else {
					ref = findOrderNumberPart(parts);
				}
			}
			if (!ref) {
				ref = window.Shopify.checkout.order_id;
			}
			if (!ref) {
				throw Error('order_ref_error');
			}
		} catch (err) {
			console.log('AWIN: error getting orderRef from page. Using internal order_id.');
			ref = window.Shopify.checkout.order_id;
		}
		return ref;
	}

	function findOrderNumberPart(partsArray) {
		for (var i = 0; i < partsArray.length; i++) {
			if (/[\d]{4,}/.test(partsArray[i])) {
				// works with OUR confirmation id/name as well
				// If (/[\dA-Z]{4,10}/.test(partsArray[i])) {
				return partsArray[i];
			}
		}
	}

	function extractNumber(orderString) {
		var numberMatches = orderString.match(/[\d]{4,}/);
		if (numberMatches.length > 0) {
			return numberMatches[numberMatches.length - 1];
		}
	}

	function setCartNoteAttributes(pAdvertiserId, pAwc, pAppVersion, pSource) {
		var noteAttributes = {
			__awin_advertiserId: pAdvertiserId,
			__awin_version: pAppVersion,
			__awin_channel: pSource,
		};

		if (pAwc) {
			noteAttributes.__awc = pAwc;
		}

		if ('fetch' in window) {
			fetch('/cart/update.js', {
				method: 'POST',
				body: JSON.stringify({
					note: '',
					attributes: noteAttributes,
				}),
				headers: {
					'Content-type': 'application/json',
				},
			});
		}
	}

	function handleCheckout(advertiserId) {
		var source = '';
		var fullSource = getSource();
		if (fullSource.indexOf('|') !== -1) {
			// use source only if from new cookie
			source = fullSource.split('|')[0];
		}

		var orderRef = encodeURIComponent(getOrderRef());
		var checkout = window.Shopify.checkout;
		var preparedItems = getPreparedItemDetails(checkout.line_items);
		var netPrice = getTotalNetPrice(checkout);

		if (orderRef !== 'undefined') {
			var pixelSrc = getPixelUrl(advertiserId, checkout, netPrice, orderRef, source, APP_VERSION);
			var pixel = document.createElement('img');
			pixel.setAttribute('width', '0');
			pixel.setAttribute('height', '0');
			pixel.setAttribute('border', '0');
			pixel.setAttribute('style', 'display: none;');

			pixel.src = pixelSrc;
			document.body.appendChild(pixel);

			var saleObjectString = getSaleObjectString(checkout, netPrice, orderRef, source, APP_VERSION);

			var masterTagCheckoutScript = document.createElement('script');
			masterTagCheckoutScript.innerHTML = saleObjectString;
			document.body.appendChild(masterTagCheckoutScript);
		}

		var basketItemLines = getBasketItemString(advertiserId, checkout, preparedItems);

		var form = document.createElement('form');
		form.style = 'display:none';
		form.name = 'aw_basket_form';

		var textarea = document.createElement('textarea');
		textarea.id = 'aw_basket';
		textarea.wrap = 'physical';

		textarea.innerHTML = basketItemLines.join('\n');

		form.appendChild(textarea);
		document.body.appendChild(form);
	}

	function getSaleObjectString(checkout, netPrice, orderRef, source, appVersion) {
		var scriptAsString = 'var AWIN = AWIN || {};\n';
		scriptAsString += 'AWIN.Tracking =  AWIN.Tracking || {};\n';
		scriptAsString += 'AWIN.Tracking.Sale = {};\n';
		scriptAsString += "AWIN.Tracking.Sale.amount = '" + netPrice + "';\n";
		scriptAsString += "AWIN.Tracking.Sale.channel = '" + source + "';\n";
		scriptAsString += "AWIN.Tracking.Sale.currency = '" + checkout.presentment_currency + "';\n";
		scriptAsString += "AWIN.Tracking.Sale.orderRef = '" + checkout.order_id + "';\n";
		scriptAsString += "AWIN.Tracking.Sale.parts = 'DEFAULT:" + netPrice + "';\n";

		if (checkout.discount) {
			scriptAsString += "AWIN.Tracking.Sale.voucher = '" + checkout.discount.code + "';\n";
		}
		scriptAsString += 'AWIN.Tracking.Sale.test = 0;\n';
		scriptAsString += 'AWIN.Tracking.Sale.custom = ["' + appVersion + '" , "' + orderRef + '" , "mt"];\n';
		scriptAsString += 'AWIN.Tracking.SkipBasketSubmit = true;\n';

		return scriptAsString;
	}

	function getPixelUrl(advertiserId, checkout, netPrice, orderRef, source, appVersion) {
		var pixelSrc = 'https://www.awin1.com/sread.img?tt=ns&tv=2';
		pixelSrc += '&merchant=' + advertiserId;
		pixelSrc += '&amount=' + netPrice;
		pixelSrc += '&ch=' + source;
		pixelSrc += '&cr=' + checkout.presentment_currency;
		pixelSrc += '&ref=' + checkout.order_id;
		pixelSrc += '&parts=DEFAULT:' + netPrice;
		pixelSrc += '&vc=';
		if (checkout.discount) {
			pixelSrc += checkout.discount.code;
		}
		pixelSrc += '&p1=' + encodeURIComponent(appVersion);
		pixelSrc += '&p2=' + orderRef;
		pixelSrc += '&p3=img';

		return pixelSrc;
	}

	function getBasketItemString(advertiserId, checkout, preparedItems) {
		var basketlines = [];
		for (var i = 0; i < preparedItems.length; i++) {
			var line = 'AW:P|';
			line += advertiserId + '|';
			line += checkout.order_id + '|';
			line += preparedItems[i].productId + '|';
			line += preparedItems[i].title + '|';
			line += roundToFixedCommercially(preparedItems[i].itemNetPrice).toFixed(2) + '|';
			line += preparedItems[i].quantity + '|';
			line += preparedItems[i].sku + '|';
			line += 'DEFAULT|';

			basketlines.push(line);
		}
		return basketlines;
	}

	function roundToFixedCommercially(number) {
		return Math.round(number * 100) / 100;
	}

	function getTotalNetPrice(checkout) {
		const subTotal = checkout.subtotal_price;
		return roundToFixedCommercially(subTotal).toFixed(2);
	}

	function getPreparedItemDetails(lineItems) {
		var preparedItems = [];
		for (var i = 0; i < lineItems.length; i++) {
			var itemNetPrice = Number(lineItems[i].price);
			var lineNetPrice = Number(lineItems[i].line_price) || Number(itemNetPrice) * lineItems[i].quantity;

			if (lineItems[i].discount_allocations.length > 0) {
				var lineDiscount = 0;
				for (var index = 0; index < lineItems[i].discount_allocations.length; index++) {
					lineDiscount += Number(lineItems[i].discount_allocations[index].amount);
				}
				lineNetPrice -= lineDiscount;
				itemNetPrice -= lineDiscount / lineItems[i].quantity;
			}

			preparedItems.push({
				productId: lineItems[i].product_id,
				title: lineItems[i].title,
				itemNetPrice: roundToFixedCommercially(itemNetPrice),
				lineNetPrice: roundToFixedCommercially(lineNetPrice),
				quantity: lineItems[i].quantity,
				sku: lineItems[i].sku,
			});
		}
		return preparedItems;
	}

	function addMasterTag(advertiserId) {
		var masterTagScript = document.createElement('script');
		masterTagScript.type = 'text/javascript';
		masterTagScript.setAttribute('defer', 'defer');
		masterTagScript.src = 'https://www.dwin1.com/' + advertiserId + '.js';
		document.body.appendChild(masterTagScript);
	}

	function sendDebugBeacon(advertiserId) {
		try {
			var dbgUrl = 'https://www.wepowerconnections.com/dbg';
			var shopify;
			if (window.Shopify) {
				try {
					var shopifyJson = JSON.stringify(window.Shopify);
					shopify = JSON.parse(shopifyJson);
				} catch (e) {
					shopify = window.Shopify;
				}

				shopify.referer = document.location.href;
				shopify.refLabelOnPage = getOrderLabel();
				shopify.refFromPage = getOrderRef();
				shopify.advertiserId = advertiserId;

				var shopifyObject = JSON.stringify(filterCheckout(shopify));

				navigator.sendBeacon(dbgUrl, shopifyObject);
			}
		} catch (error) {}
	}

	function filterCheckout(shopify) {
		if (shopify.checkout) {
			var checkout = shopify.checkout;
			if (checkout.billing_address) {
				delete checkout.billing_address;
			}
			if (checkout.credit_card) {
				delete checkout.credit_card;
			}
			if (checkout.shipping_address) {
				delete checkout.shipping_address;
			}
			if (checkout.email) {
				delete checkout.email;
			}
			if (checkout.line_items && typeof checkout.line_items === 'object' && checkout.line_items.length) {
				for (var index = 0; index < checkout.line_items.length; index++) {
					var element = checkout.line_items[index];
					if (element.destination_location) {
						delete element.destination_location;
					}
				}
			}
		}
		return shopify;
	}

	function run() {
		var scriptUrl = getScriptUrl();
		if (typeof scriptUrl !== 'undefined') {
			var advertiserId = getAdvertiserId(scriptUrl);
			var s2sEnabled = getS2sEnabled(getScriptUrl());
			var awc = getAwc(advertiserId);
			var fullSourceValue = getSource();

			if (advertiserId) {
				if (
					s2sEnabled === true ||
					(s2sEnabled === undefined && S2S_EXCEPTIONS.indexOf(parseInt(advertiserId)) === -1)
				) {
					if (awc) {
						var source = fullSourceValue.split('|')[0];
						setCartNoteAttributes(advertiserId, awc, APP_VERSION, source);
					}
				}

				if (fullSourceValue !== '') {
					if (fullSourceValue.indexOf('|') !== -1) {
						// refresh from cookie
						var sourceParts = fullSourceValue.split('|');
						var sourceDate = new Date(parseInt(sourceParts[1]) * 1000);
						setSourceCookie(fullSourceValue, sourceDate);
					} else {
						// set newly from qs
						setSourceCookie(fullSourceValue);
					}
				}

				setCookieDomain();

				if (window.Shopify && window.Shopify.checkout) {
					sendDebugBeacon(advertiserId);

					var createdOrderDate = new Date(window.Shopify.checkout.created_at);
					if (isNaN(createdOrderDate) || new Date() - createdOrderDate < LIMIT_TO_SEND_CALLS) {
						handleCheckout(advertiserId);
					}
				}

				addMasterTag(advertiserId);
			}
		}
	}

	w.AWIN = w.AWIN || {};
	w.AWIN.Shopify = {
		run: run,
		handleCheckout: handleCheckout,
		getPreparedItemDetails: getPreparedItemDetails,
		getTotalNetPrice: getTotalNetPrice,
		getSaleObjectString: getSaleObjectString,
		getPixelUrl: getPixelUrl,
		getBasketItemString: getBasketItemString,
		version: APP_VERSION,
	};
})(window);

AWIN.Shopify.run();
