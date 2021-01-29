define(['dojo/_base/declare',
    'jimu/BaseWidget',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/Deferred',
    'dojo/dom',
    'dijit/form/Select',
    'dijit/form/Button',
    'dijit/layout/TabContainer',
    'dijit/layout/ContentPane',
    './chartJS',
    'esri/layers/FeatureLayer',
    './webMapLayersIds',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'jimu/dijit/TabContainer3',
    'dojo/domReady!'
  ],
  function (declare, BaseWidget, on, lang, Deferred, dom,
    Select, Button, TabContainer, ContentPane,
    chartJS, FeatureLayer, webMapLayersIds,
    Query, QueryTask,
    TabContainer3) {

    return declare([BaseWidget], {

      layer: null,
      fieldX: null,
      fieldY: null,
      url: null,
      type: null,
      lineChart: null,
      barChart: null,
      extensionFilter: null,
      extensionEvent: null,
      eq: null,
      eqID: [],
      eqOID: [],
      Layers : [],

      startup: function () {
    //    this.inherited(arguments)
        this.initgetEQ()
    //    this.initTabs()
        
      },
      initgetEQ: function () {
        var eqURL = "https://dataapi.ncdr.nat.gov.tw/NCDRAPI/Opendata/NCDR/EQ";
        fetch("https://cors-anywhere.herokuapp.com/" + eqURL)
          .then(res => {
            return res.json();
          }).then(result => {
            result[0].Data.forEach(item => {
              item.ID = item.WGS84_Lon + '_' + item.WGS84_Lat;
              this.eqID.push(item.WGS84_Lon + '_' + item.WGS84_Lat)
            });
            this.eq = result[0];
            this.eqName.innerHTML = '<h1>' + this.eq.EventName + '</h1>';
            this.eqTime.innerHTML = '<h1>' + this.eq.EventDateTime.replace("T", " ") + '</h1>';
            this.eqMagnitude.innerHTML = '<h1>' + this.eq.Magnitude + '</h1>';
            this.eqLocation.innerHTML = '<h1>' + this.eq.EQ_WGS84_Lon +',' + this.eq.EQ_WGS84_Lat + '</h1>';
            var picPath;
            picPath = 'https://eocdss.ncdr.nat.gov.tw/web/images/other/Red_glow.gif';
            var PicSymbol = new esri.symbol.PictureMarkerSymbol(picPath, 37, 42);
            var eqPT =  new esri.Graphic(esri.geometry.geographicToWebMercator(new esri.geometry.Point(this.eq.EQ_WGS84_Lon, this.eq.EQ_WGS84_Lat)),PicSymbol); 
            map.graphics.add(eqPT);
            this.filterLayer();
            this.map.removeLayer(this.Layers[0]);
            this.map.removeLayer(this.Layers[1]);
    //        this.initLayerChooser()
    //        this.initCharts()
          });
      },
      initCharts: function () {
        this.lineChart = new chartJS({
          node: this.canvas,
          type: 'line',
          labels: null,
          label: this.fieldY,
          data: null
        })

        this.barChart = new chartJS({
          node: this.barCanvas,
          type: 'bar',
          labels: null,
          label: this.fieldY,
          data: null
        })
      },

      initTabs: function () {
        var lineTab = {
          title: this.nls.lineTitleTab,
          content: this.lineTabNode
        };

        var barTab = {
          title: this.nls.barTitleTab,
          content: this.barTabNode
        };

        var tab = new TabContainer3({
          tabs: [lineTab, barTab]
        }, this.tabNode);
      },

   /*   onOpen: function () {
        this.extensionEvent = this.map.on('extent-change', lang.hitch(this, function (evt) {
          this.extensionFilter = evt.extent
          this.gettingLayer()
        }));
      },
*/
      initLayerChooser: function () {
        var idForChangeEvent = "layerChooserNodeEvent";

        new webMapLayersIds({
          idForChangeEvent: idForChangeEvent,
          layerNode: "layerChooserNode",
          map: this.map,
          geometry: "*"
        });

        this.initSelects(dijit.byId(idForChangeEvent).value);

        dijit.byId(idForChangeEvent).on("change", lang.hitch(this, function (evt) {
          this.options(evt)
        }))
      },

      initSelects: function (layerId) {
        new Select({
          name: "selectFieldX",
          id: "selectFieldX"
        }, this.selectXContainer).startup()

        new Select({
          name: "selectFieldY",
          id: "selectFieldY"
        }, this.selectYContainer).startup()

        var fieldXid = dijit.byId('selectFieldX')
        this.fieldX = fieldXid.value;
        this.own(on(fieldXid, 'change', lang.hitch(this, function (evt) {
          this.fieldX = evt
        })));

        var fieldYid = dijit.byId('selectFieldY')
        this.fieldY = fieldYid.value;
        this.own(on(fieldYid, 'change', lang.hitch(this, function (evt) {
          this.fieldY = evt
        })));

        this.options(layerId)
      },

      options: function (layerId) {
        this.layer = this.map.getLayer(layerId)
        this.url = this.layer.url
        var fields = this.layer.fields

        var map = fields.map(function (record) {
          return dojo.create("option", {
            label: record.name,
            value: record.name
          })
        })

        var selectX = dijit.byId('selectFieldX')
        var selectY = dijit.byId('selectFieldY')

        if (selectX.getOptions()) {
          selectX.options.length = 0
          selectY.options.length = 0
          selectX.addOption(map)
          selectY.addOption(map)
        }
      },

      gettingLayer: function () {
        var query = new Query()
        query.where = "1=1"
        if (!this.extensionFilter) this.extensionFilter = this.map.extent;
        query.geometry = this.extensionFilter
        query.returnGeometry = false;
        query.outFields = ['nid', this.fieldX, this.fieldY]
        //     query.outFields = '*';
        new QueryTask(this.url).execute(query, lang.hitch(this, function (results) {
          this.render(results)
        }))
      },

      filterLayer: function () {
        var layers = [];
        for (var i = 0; i < this.map.graphicsLayerIds.length; i++) {
          var layerObject = this.map.getLayer(this.map.graphicsLayerIds[i]);
          if (layerObject.url) {
            layers.push(layerObject)
          }
        }
        this.Layers = layers;
        //震度圖   
        var featureCollection = {
          "layerDefinition": {
            "geometryType": "esriGeometryPoint",
            "objectIdField": "ObjectID",
            "spatialReference": null,
            "fields": [{
                "name": "fid",
                "alias": "fid",
                "type": "esriFieldTypeOID"
              },
              {
                "name": "nid",
                "alias": "nid",
                "type": "esriFieldTypeString"
              },
              {
                "name": "PGA",
                "alias": "PGA",
                "type": "esriFieldTypeSingle"
              },
              {
                "name": "PGV",
                "alias": "PGV",
                "type": "esriFieldTypeSingle"
              },
              {
                "name": "Intensity",
                "alias": "Intensity",
                "type": "esriFieldTypeInteger"
              }
            ]
          },
          "featureSet": {
            "features": []
          }
        };
        featureCollection.layerDefinition.geometryType = layers[0].geometryType;
        featureCollection.layerDefinition.spatialReference = this.map.spatialReference;
        var tmpFeatureLayer = new FeatureLayer(featureCollection, {
          id: layers[0].id + '_1',
          infoTemplate: new esri.InfoTemplate(
            '${nid}',
            '${Intensity}'
          ),
          //        renderer: Renderer
        });
        this.url = layers[0].url

        var query = new Query()
        query.where = "1=1"
        query.returnGeometry = true;
        query.outFields = ["*"]
        new QueryTask(this.url).execute(query, lang.hitch(this, function (results) {
          console.log(results.features);
          results.features.forEach(item => {
            var fData = this.eq.Data.filter(a => a.ID == item.attributes.nid);
            if (fData.length > 0) {
              var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new esri.Color([0, 0, 0]), 0.1), this.fillCoror(fData[0].Intensity));
              var m = new esri.Graphic(item.geometry);
              m.attributes = item.attributes;
              m.attributes.PGA = fData[0].PGA;
              m.attributes.PGV = fData[0].PGV;
              m.attributes.Intensity = fData[0].Intensity;
              //           var symbol = new  esri.symbol.SimpleFillSymbol(esri.symbols.SimpleFillSymbol.STYLE_SOLID, 
              //             new esri.symbols.SimpleLineSymbol(esri.symbols.SimpleLineSymbol.STYLE_SOLID,
              //             new esri.Color([98,194,204]), 2), new esri.Color([98,194,204,0.5])
              //           );
              m.setSymbol(symbol)
              tmpFeatureLayer.add(m);
            }
          })
          tmpFeatureLayer.setOpacity(.50);
          this.map.addLayer(tmpFeatureLayer)
          //    tmpFeatureLayer.setRenderer(Renderer);

        }))
        layers[0].setVisibility(false)
        //建物加震度
        var buildingfeatureCollection = {
          "layerDefinition": {
            "geometryType": "esriGeometryPoint",
            "objectIdField": "ObjectID",
            "spatialReference": null,
            "fields": [{
                "name": "PGA",
                "alias": "PGA",
                "type": "esriFieldTypeSingle"
              },
              {
                "name": "PGV",
                "alias": "PGV",
                "type": "esriFieldTypeSingle"
              },
              {
                "name": "Intensity",
                "alias": "Intensity",
                "type": "esriFieldTypeInteger"
              }
            ]
          },
          "featureSet": {
            "features": []
          }
        };
        buildingfeatureCollection.layerDefinition.geometryType = layers[1].geometryType;
        buildingfeatureCollection.layerDefinition.spatialReference = this.map.spatialReference;
        layers[1].fields.forEach(item => buildingfeatureCollection.layerDefinition.fields.push(item))
        var buildingLayer = new FeatureLayer(buildingfeatureCollection, {
          id: layers[1].id + '_1',
          infoTemplate: new esri.InfoTemplate(
            '${nid}',
            'city:	${city}<br>town:	${town}<br>address:	${address}<br>totalfloor:	${totalfloor}<br>material:	${material}<br>builtdate:	${builtdate}<br>震度: ${Intensity}'
          ),
        });
        var query = new Query()
        query.where = "1=1"
        query.returnGeometry = true;
        query.outFields = ["*"]
        new QueryTask(layers[1].url).execute(query, lang.hitch(this, function (results) {
          console.log(results.features);
          results.features.forEach(item => {
            var fData = this.eq.Data.filter(a => a.ID == item.attributes.nid);

            var symbol  = new esri.symbol.SimpleMarkerSymbol(
              esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
              new esri.symbol.SimpleLineSymbol(
                esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([0, 0, 0]), 1
              ),
              this.fillCoror((fData.length > 0) ? fData[0].Intensity : 0)
            );
            var m = new esri.Graphic(item.geometry);
            m.attributes = item.attributes;
            if (fData.length > 0) {
              m.attributes.PGA = fData[0].PGA;
              m.attributes.PGV = fData[0].PGV;
              m.attributes.Intensity = fData[0].Intensity;
            } else {
              m.attributes.PGA = 0;
              m.attributes.PGV = 0;
              m.attributes.Intensity = 0;
            }
            m.setSymbol(symbol)
            buildingLayer.add(m);

          })
          this.map.addLayer(buildingLayer)
          //    tmpFeatureLayer.setRenderer(Renderer);
          layers[1].setVisibility(false)
        }))

      },

      render: function (results) {
        var map = []
        var labels = []

        var def = new Deferred()
        def.resolve(':)');
        def.then(lang.hitch(this, function () {
          for (i in results.features) {
            map.push({
              x: results.features[i].attributes[this.fieldX],
              y: results.features[i].attributes[this.fieldY]
            })
          }
        })).then(lang.hitch(this, function () {
          for (i in map) {
            labels.push(map[i].x)
          }
        })).then(lang.hitch(this, function () {
          this.lineChart.updateChart(labels, map)
          this.barChart.updateChart(labels, map)
        }))
      },
      fillCoror: function (int) {
        switch (parseInt(int)) {
          case 0:
            return "white"
            break;
          case 1:
            return "#e1ffe0"
            break;
          case 2:
            return "#33fe32"
            break;
          case 3:
            return "yellow"
            break;
          case 4:
            return "#fe8532"
            break;
          case 5:
            return "#ff5232"
            break;
          case 5.5:
            return "#c53d3d"
            break;
          case 6:
            return "#9b4645"
            break;
          case 6.5:
            return "#9b4b86"
            break;
          case 7:
            return "#b61fea"
            break;
        }
      },
      onClose: function () {
        this.extensionEvent.remove()
      }
    });
  });