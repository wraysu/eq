// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:jimu/dijit/templates/_CropImage.html":'\x3cdiv class\x3d"jimu-crop-image"\x3e\r\n\t\x3cimg class\x3d"loading-image" data-dojo-attach-point\x3d"loadingImg" src\x3d""\x3e\r\n\r\n\t\x3cimg class\x3d"base-image hide-status" data-dojo-attach-point\x3d"baseImage" width\x3d"100%" height\x3d"100%" style\x3d"display:none;width:100%;height:100%"\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dojo/_base/html dojo/_base/lang dojo/on jimu/utils dijit/_WidgetBase dijit/_TemplatedMixin dojo/text!./templates/_CropImage.html dojo/NodeList-dom".split(" "),function(a,b,c,d,k,e,f,g){var h=window.Cropper;return a([e,f],{templateString:g,imageSrc:null,type:null,goldenWidth:4,goldenHeight:3,postCreate:function(){this.type||(this.type="image/jpeg");this.setImageSrc(this.imageSrc);this.loadingImg.src=require.toUrl("jimu")+"/images/loading.gif";this.own(d(this.baseImage,"load",
c.hitch(this,function(){b.setStyle(this.loadingImg,"display","none");this._initCropper()})))},_initCropper:function(){this.cropper&&this.cropper.destroy&&this.cropper.destroy();this.cropper=new h(this.baseImage,{aspectRatio:this.goldenWidth/this.goldenHeight,preview:".img-preview"})},setImageSrc:function(a){b.setAttr(this.baseImage,"src",a)},getData:function(){return this.cropper.getCroppedCanvas().toDataURL(this.type||"image/jpeg")},destroy:function(){this.cropper&&this.cropper.destroy&&this.cropper.destroy();
this.inherited(arguments)}})});