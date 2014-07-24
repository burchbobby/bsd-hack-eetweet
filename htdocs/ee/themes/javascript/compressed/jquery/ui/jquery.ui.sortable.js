/*
 * jQuery UI Sortable 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */

(function(d){d.widget("ui.sortable",d.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1E3},_create:function(){var a=this.options;this.containerCache={};this.element.addClass("ui-sortable");this.refresh();
this.floating=this.items.length?"x"===a.axis||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var a=this.items.length-1;0<=a;a--)this.items[a].item.removeData("sortable-item");return this},_setOption:function(a,b){"disabled"===a?(this.options[a]=
b,this.widget()[b?"addClass":"removeClass"]("ui-sortable-disabled")):d.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(a,b){if(this.reverting||this.options.disabled||"static"==this.options.type)return!1;this._refreshItems(a);var c=null,e=this;d(a.target).parents().each(function(){if(d.data(this,"sortable-item")==e)return c=d(this),!1});d.data(a.target,"sortable-item")==e&&(c=d(a.target));if(!c)return!1;if(this.options.handle&&!b){var f=!1;d(this.options.handle,c).find("*").andSelf().each(function(){this==
a.target&&(f=!0)});if(!f)return!1}this.currentItem=c;this._removeCurrentsFromItems();return!0},_mouseStart:function(a,b,c){b=this.options;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(a);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=
this.helper.css("position");d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();
b.containment&&this._setContainment();if(b.cursor){if(d("body").css("cursor"))this._storedCursor=d("body").css("cursor");d("body").css("cursor",b.cursor)}if(b.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",b.opacity)}if(b.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",b.zIndex)}if(this.scrollParent[0]!=document&&"HTML"!=this.scrollParent[0].tagName)this.overflowOffset=this.scrollParent.offset();
this._trigger("start",a,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!c)for(c=this.containers.length-1;0<=c;c--)this.containers[c]._trigger("activate",a,this._uiHash(this));if(d.ui.ddmanager)d.ui.ddmanager.current=this;d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.dragging=!0;this.helper.addClass("ui-sortable-helper");this._mouseDrag(a);return!0},_mouseDrag:function(a){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;if(this.options.scroll){var b=this.options,c=!1;if(this.scrollParent[0]!=document&&"HTML"!=this.scrollParent[0].tagName){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-a.pageY<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop+b.scrollSpeed;else if(a.pageY-this.overflowOffset.top<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-b.scrollSpeed;if(this.overflowOffset.left+
this.scrollParent[0].offsetWidth-a.pageX<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+b.scrollSpeed;else if(a.pageX-this.overflowOffset.left<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-b.scrollSpeed}else a.pageY-d(document).scrollTop()<b.scrollSensitivity?c=d(document).scrollTop(d(document).scrollTop()-b.scrollSpeed):d(window).height()-(a.pageY-d(document).scrollTop())<b.scrollSensitivity&&(c=d(document).scrollTop(d(document).scrollTop()+
b.scrollSpeed)),a.pageX-d(document).scrollLeft()<b.scrollSensitivity?c=d(document).scrollLeft(d(document).scrollLeft()-b.scrollSpeed):d(window).width()-(a.pageX-d(document).scrollLeft())<b.scrollSensitivity&&(c=d(document).scrollLeft(d(document).scrollLeft()+b.scrollSpeed));!1!==c&&d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||"y"!=this.options.axis)this.helper[0].style.left=this.position.left+"px";
if(!this.options.axis||"x"!=this.options.axis)this.helper[0].style.top=this.position.top+"px";for(b=this.items.length-1;0<=b;b--){var c=this.items[b],e=c.item[0],f=this._intersectsWithPointer(c);if(f&&e!=this.currentItem[0]&&this.placeholder[1==f?"next":"prev"]()[0]!=e&&!d.ui.contains(this.placeholder[0],e)&&("semi-dynamic"==this.options.type?!d.ui.contains(this.element[0],e):1)){this.direction=1==f?"down":"up";if("pointer"==this.options.tolerance||this._intersectsWithSides(c))this._rearrange(a,c);
else break;this._trigger("change",a,this._uiHash());break}}this._contactContainers(a);d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);this._trigger("sort",a,this._uiHash());this.lastPositionAbs=this.positionAbs;return!1},_mouseStop:function(a,b){if(a){d.ui.ddmanager&&!this.options.dropBehaviour&&d.ui.ddmanager.drop(this,a);if(this.options.revert){var c=this,e=c.placeholder.offset();c.reverting=!0;d(this.helper).animate({left:e.left-this.offset.parent.left-c.margins.left+(this.offsetParent[0]==document.body?
0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-c.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){c._clear(a)})}else this._clear(a,b);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null});"original"==this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var a=this.containers.length-1;0<=a;a--)if(this.containers[a]._trigger("deactivate",
null,this._uiHash(this)),this.containers[a].containerCache.over)this.containers[a]._trigger("out",null,this._uiHash(this)),this.containers[a].containerCache.over=0}this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!=this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),d.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?d(this.domPosition.prev).after(this.currentItem):
d(this.domPosition.parent).prepend(this.currentItem));return this},serialize:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[],a=a||{};d(b).each(function(){var b=(d(a.item||this).attr(a.attribute||"id")||"").match(a.expression||/(.+)[-=_](.+)/);b&&c.push((a.key||b[1]+"[]")+"="+(a.key&&a.expression?b[1]:b[2]))});!c.length&&a.key&&c.push(a.key+"=");return c.join("&")},toArray:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[],a=a||{};b.each(function(){c.push(d(a.item||this).attr(a.attribute||
"id")||"")});return c},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,f=d+this.helperProportions.height,g=a.left,h=g+a.width,i=a.top,j=i+a.height,k=this.offset.click.top,l=this.offset.click.left;return"pointer"==this.options.tolerance||this.options.forcePointerForContainers||"pointer"!=this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?d+k>i&&d+k<j&&b+l>g&&b+l<h:g<b+this.helperProportions.width/
2&&c-this.helperProportions.width/2<h&&i<d+this.helperProportions.height/2&&f-this.helperProportions.height/2<j},_intersectsWithPointer:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top,a.height),a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left,a.width),b=b&&a,a=this._getDragVerticalDirection(),c=this._getDragHorizontalDirection();return!b?!1:this.floating?c&&"right"==c||"down"==a?2:1:a&&("down"==a?2:1)},_intersectsWithSides:function(a){var b=
d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top+a.height/2,a.height),a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left+a.width/2,a.width),c=this._getDragVerticalDirection(),e=this._getDragHorizontalDirection();return this.floating&&e?"right"==e&&a||"left"==e&&!a:c&&("down"==c&&b||"up"==c&&!b)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return 0!=a&&(0<a?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-
this.lastPositionAbs.left;return 0!=a&&(0<a?"right":"left")},refresh:function(a){this._refreshItems(a);this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(a){var b=[],c=[],e=this._connectWith();if(e&&a)for(a=e.length-1;0<=a;a--)for(var f=d(e[a]),g=f.length-1;0<=g;g--){var h=d.data(f[g],"sortable");h&&h!=this&&!h.options.disabled&&c.push([d.isFunction(h.options.items)?h.options.items.call(h.element):
d(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h])}c.push([d.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):d(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(a=c.length-1;0<=a;a--)c[a][0].each(function(){b.push(this)});return d(b)},_removeCurrentsFromItems:function(){for(var a=this.currentItem.find(":data(sortable-item)"),b=0;b<this.items.length;b++)for(var c=
0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(a){this.items=[];this.containers=[this];var b=this.items,c=[[d.isFunction(this.options.items)?this.options.items.call(this.element[0],a,{item:this.currentItem}):d(this.options.items,this.element),this]],e=this._connectWith();if(e)for(var f=e.length-1;0<=f;f--)for(var g=d(e[f]),h=g.length-1;0<=h;h--){var i=d.data(g[h],"sortable");i&&i!=this&&!i.options.disabled&&(c.push([d.isFunction(i.options.items)?i.options.items.call(i.element[0],
a,{item:this.currentItem}):d(i.options.items,i.element),i]),this.containers.push(i))}for(f=c.length-1;0<=f;f--){a=c[f][1];e=c[f][0];h=0;for(g=e.length;h<g;h++)i=d(e[h]),i.data("sortable-item",a),b.push({item:i,instance:a,width:0,height:0,left:0,top:0})}},refreshPositions:function(a){if(this.offsetParent&&this.helper)this.offset.parent=this._getParentOffset();for(var b=this.items.length-1;0<=b;b--){var c=this.items[b];if(!(c.instance!=this.currentContainer&&this.currentContainer&&c.item[0]!=this.currentItem[0])){var e=
this.options.toleranceElement?d(this.options.toleranceElement,c.item):c.item;if(!a)c.width=e.outerWidth(),c.height=e.outerHeight();e=e.offset();c.left=e.left;c.top=e.top}}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(b=this.containers.length-1;0<=b;b--)e=this.containers[b].element.offset(),this.containers[b].containerCache.left=e.left,this.containers[b].containerCache.top=e.top,this.containers[b].containerCache.width=this.containers[b].element.outerWidth(),
this.containers[b].containerCache.height=this.containers[b].element.outerHeight();return this},_createPlaceholder:function(a){var b=a||this,c=b.options;if(!c.placeholder||c.placeholder.constructor==String){var e=c.placeholder;c.placeholder={element:function(){var a=d(document.createElement(b.currentItem[0].nodeName)).addClass(e||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!e)a.style.visibility="hidden";return a},update:function(a,d){if(!e||c.forcePlaceholderSize)d.height()||
d.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10)),d.width()||d.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))}}}b.placeholder=d(c.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);c.placeholder.update(b,b.placeholder)},_contactContainers:function(a){for(var b=null,c=null,e=this.containers.length-
1;0<=e;e--)if(!d.ui.contains(this.currentItem[0],this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){if(!b||!d.ui.contains(this.containers[e].element[0],b.element[0]))b=this.containers[e],c=e}else if(this.containers[e].containerCache.over)this.containers[e]._trigger("out",a,this._uiHash(this)),this.containers[e].containerCache.over=0;if(b)if(1===this.containers.length)this.containers[c]._trigger("over",a,this._uiHash(this)),this.containers[c].containerCache.over=
1;else if(this.currentContainer!=this.containers[c]){for(var b=1E4,e=null,f=this.positionAbs[this.containers[c].floating?"left":"top"],g=this.items.length-1;0<=g;g--)if(d.ui.contains(this.containers[c].element[0],this.items[g].item[0])){var h=this.items[g][this.containers[c].floating?"left":"top"];Math.abs(h-f)<b&&(b=Math.abs(h-f),e=this.items[g])}if(e||this.options.dropOnEmpty)this.currentContainer=this.containers[c],e?this._rearrange(a,e,null,!0):this._rearrange(a,null,this.containers[c].element,
!0),this._trigger("change",a,this._uiHash()),this.containers[c]._trigger("change",a,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[c]._trigger("over",a,this._uiHash(this)),this.containers[c].containerCache.over=1}},_createHelper:function(a){var b=this.options,a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a,this.currentItem])):"clone"==b.helper?this.currentItem.clone():this.currentItem;a.parents("body").length||d("parent"!=b.appendTo?
b.appendTo:this.currentItem[0].parentNode)[0].appendChild(a[0]);if(a[0]==this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};(""==a[0].style.width||b.forceHelperSize)&&a.width(this.currentItem.width());(""==a[0].style.height||b.forceHelperSize)&&a.height(this.currentItem.height());return a},_adjustOffsetFromHelper:function(a){"string"==
typeof a&&(a=a.split(" "));d.isArray(a)&&(a={left:+a[0],top:+a[1]||0});if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();"absolute"==this.cssPosition&&
this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(a.left+=this.scrollParent.scrollLeft(),a.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&"html"==this.offsetParent[0].tagName.toLowerCase()&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"==
this.cssPosition){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},
_setContainment:function(){var a=this.options;if("parent"==a.containment)a.containment=this.helper[0].parentNode;if("document"==a.containment||"window"==a.containment)this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d("document"==a.containment?document:window).width()-this.helperProportions.width-this.margins.left,(d("document"==a.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-
this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)){var b=d(a.containment)[0],a=d(a.containment).offset(),c="hidden"!=d(b).css("overflow");this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||
0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(a,b){if(!b)b=this.position;var c="absolute"==a?1:-1,e="absolute"==this.cssPosition&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?
this.offsetParent:this.scrollParent,f=/(html|body)/i.test(e[0].tagName);return{top:b.top+this.offset.relative.top*c+this.offset.parent.top*c-(d.browser.safari&&"fixed"==this.cssPosition?0:("fixed"==this.cssPosition?-this.scrollParent.scrollTop():f?0:e.scrollTop())*c),left:b.left+this.offset.relative.left*c+this.offset.parent.left*c-(d.browser.safari&&"fixed"==this.cssPosition?0:("fixed"==this.cssPosition?-this.scrollParent.scrollLeft():f?0:e.scrollLeft())*c)}},_generatePosition:function(a){var b=
this.options,c="absolute"==this.cssPosition&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);if("relative"==this.cssPosition&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();var f=a.pageX,g=a.pageY;this.originalPosition&&(this.containment&&(a.pageX-this.offset.click.left<this.containment[0]&&(f=this.containment[0]+
this.offset.click.left),a.pageY-this.offset.click.top<this.containment[1]&&(g=this.containment[1]+this.offset.click.top),a.pageX-this.offset.click.left>this.containment[2]&&(f=this.containment[2]+this.offset.click.left),a.pageY-this.offset.click.top>this.containment[3]&&(g=this.containment[3]+this.offset.click.top)),b.grid&&(g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1],g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?
g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g,f=this.originalPageX+Math.round((f-this.originalPageX)/b.grid[0])*b.grid[0],f=this.containment?!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:!(f-this.offset.click.left<this.containment[0])?f-b.grid[0]:f+b.grid[0]:f));return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&"fixed"==this.cssPosition?0:"fixed"==this.cssPosition?-this.scrollParent.scrollTop():
e?0:c.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&"fixed"==this.cssPosition?0:"fixed"==this.cssPosition?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())}},_rearrange:function(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],"down"==this.direction?b.item[0]:b.item[0].nextSibling);this.counter=this.counter?++this.counter:1;var f=this,g=this.counter;window.setTimeout(function(){g==
f.counter&&f.refreshPositions(!d)},0)},_clear:function(a,b){this.reverting=!1;var c=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var e in this._storedCSS)if("auto"==this._storedCSS[e]||"static"==this._storedCSS[e])this._storedCSS[e]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!b&&c.push(function(a){this._trigger("receive",
a,this._uiHash(this.fromOutside))});(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!b&&c.push(function(a){this._trigger("update",a,this._uiHash())});if(!d.ui.contains(this.element[0],this.currentItem[0])){b||c.push(function(a){this._trigger("remove",a,this._uiHash())});for(e=this.containers.length-1;0<=e;e--)d.ui.contains(this.containers[e].element[0],this.currentItem[0])&&!b&&(c.push(function(a){return function(b){a._trigger("receive",
b,this._uiHash(this))}}.call(this,this.containers[e])),c.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this))}}.call(this,this.containers[e])))}for(e=this.containers.length-1;0<=e;e--)if(b||c.push(function(a){return function(b){a._trigger("deactivate",b,this._uiHash(this))}}.call(this,this.containers[e])),this.containers[e].containerCache.over)c.push(function(a){return function(b){a._trigger("out",b,this._uiHash(this))}}.call(this,this.containers[e])),this.containers[e].containerCache.over=
0;this._storedCursor&&d("body").css("cursor",this._storedCursor);this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);this._storedZIndex&&this.helper.css("zIndex","auto"==this._storedZIndex?"":this._storedZIndex);this.dragging=!1;if(this.cancelHelperRemoval){if(!b){this._trigger("beforeStop",a,this._uiHash());for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}return!1}b||this._trigger("beforeStop",a,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
this.helper[0]!=this.currentItem[0]&&this.helper.remove();this.helper=null;if(!b){for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}this.fromOutside=!1;return!0},_trigger:function(){!1===d.Widget.prototype._trigger.apply(this,arguments)&&this.cancel()},_uiHash:function(a){var b=a||this;return{helper:b.helper,placeholder:b.placeholder||d([]),position:b.position,originalPosition:b.originalPosition,offset:b.positionAbs,item:b.currentItem,sender:a?a.element:null}}});d.extend(d.ui.sortable,
{version:"1.8.16"})})(jQuery);