// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","esri/lang"],function(c,d,e,b){return c([],{userRole:null,portalSelf:null,constructor:function(a,b){this.userRole=a;this.portalSelf=b},canPerformAnalysis:function(){var a=!1;this.userRole&&(this.userRole.isAdmin()||this.userRole.isPublisher())?a=!0:this.userRole&&this.userRole.isCustom()&&(a=this.userRole.canCreateItem()&&this.userRole.canPublishFeatures()&&this.userRole.canUseSpatialAnalysis());this.portalSelf&&this.portalSelf.isPortal&&
(a=a&&b.isDefined(this.portalSelf.helperServices.analysis)&&b.isDefined(this.portalSelf.helperServices.analysis.url));return a},canPerformSpatialAnalytics:function(){return b.isDefined(this.portalSelf.helperServices.analysis)&&b.isDefined(this.portalSelf.helperServices.analysis.url)},canPerformGeoAnalytics:function(){var a=b.isDefined(this.portalSelf.helperServices.geoanalytics)&&b.isDefined(this.portalSelf.helperServices.geoanalytics.url);return this.canPerformAnalysis()&&a},canPerformRasterAnalysis:function(){var a=
b.isDefined(this.portalSelf.helperServices.rasterAnalytics)&&b.isDefined(this.portalSelf.helperServices.rasterAnalytics.url);return this.canPerformAnalysis()&&a},hasPrivileges:function(a){return d.isArray(a)?e.every(a,function(a){return"networkanalysis"===a?this._canPerformNetworkAnalysis():"geoenrichment"===a?this._canPerformGeoEnrichment():"elevation"===a?this._canPerformElevationAnalysis():"drivetimearea"===a?this._canPerformDriveAnalysis():"planroutes"===a?this._canPerformPlanRoutesAnalysis():
"od"===a?this._canPerformODAnalysis():"hydro"===a?this._canPerformHydroAnalysis():"loc"===a?this._canPerformLocAllocationAnalysis():!1},this):!0},_canPerformNetworkAnalysis:function(){var a=b.isDefined(this.portalSelf.helperServices.asyncClosestFacility)&&b.isDefined(this.portalSelf.helperServices.asyncServiceArea)&&b.isDefined(this.portalSelf.helperServices.asyncVRP);return this.canPerformAnalysis()&&a&&this.userRole.canUseNetworkAnalysis()},_canPerformGeoEnrichment:function(){var a=b.isDefined(this.portalSelf.helperServices.geoenrichment);
return this.canPerformAnalysis()&&a&&this.userRole.canUseGeoenrichment()},_canPerformElevationAnalysis:function(){var a=b.isDefined(this.portalSelf.helperServices.elevation);return this.canPerformAnalysis()&&a&&this.userRole.canUseElevation()},_canPerformPlanRoutesAnalysis:function(){var a=b.isDefined(this.portalSelf.helperServices.routingUtilities)&&b.isDefined(this.portalSelf.helperServices.asyncVRP);return this.canPerformAnalysis()&&a&&this.userRole.canUseNetworkAnalysis()},_canPerformODAnalysis:function(){var a=
b.isDefined(this.portalSelf.helperServices.routingUtilities)&&b.isDefined(this.portalSelf.helperServices.asyncRoute);return this.canPerformAnalysis()&&a&&this.userRole.canUseNetworkAnalysis()},_canPerformDriveAnalysis:function(){var a=b.isDefined(this.portalSelf.helperServices.routingUtilities)&&b.isDefined(this.portalSelf.helperServices.asyncServiceArea);return this.canPerformAnalysis()&&a&&this.userRole.canUseNetworkAnalysis()},_canPerformNearestAnalysis:function(){var a=b.isDefined(this.portalSelf.helperServices.routingUtilities)&&
b.isDefined(this.portalSelf.helperServices.asyncClosestFacility);return this.canPerformAnalysis()&&a&&this.userRole.canUseNetworkAnalysis()},_canPerformLocAllocationAnalysis:function(){var a=b.isDefined(this.portalSelf.helperServices.routingUtilities)&&b.isDefined(this.portalSelf.helperServices.asyncLocationAllocation);return this.canPerformAnalysis()&&a&&this.userRole.canUseNetworkAnalysis()},_canPerformHydroAnalysis:function(){var a=b.isDefined(this.portalSelf.helperServices.hydrology);return this.canPerformAnalysis()&&
a&&this.userRole.canUseElevation()}})});