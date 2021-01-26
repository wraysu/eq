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
  'dojo/domReady!'],
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

      startup: function () {
        this.inherited(arguments)
        this.initgetEQ()
        this.initTabs()
        this.initLayerChooser()
        this.initCharts()
      },
      initgetEQ: function () {
        var eqURL = "https://dataapi.ncdr.nat.gov.tw/NCDRAPI/Opendata/NCDR/EQ";
        fetch("https://cors-anywhere.herokuapp.com/" + eqURL)
          .then(res => {
            return res.json();
          }).then(result => {
            result[0].Data.forEach(item => {
              item.ID = item.WGS84_Lon + '_' + item.WGS84_Lan;
              this.eqID.push(item.WGS84_Lon + '_' + item.WGS84_Lan)
            });
            this.eq = result[0];
            this.eqName.innerHTML = this.eq.EventName;
            this.eqTime.innerHTML = this.eq.EventDateTime.replace("T", " ");
            this.eqMagnitude.innerHTML = this.eq.Magnitude;
            debugger;
            this.filterLayer();
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

      onOpen: function () {
        this.extensionEvent = this.map.on('extent-change', lang.hitch(this, function (evt) {
          this.extensionFilter = evt.extent
          this.gettingLayer()
        }));
      },

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

      gettingLayer: function (oID) {
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
        var featureCollection = {
          "layerDefinition": {
            "geometryType": "esriGeometryPoint",
            "objectIdField": "ObjectID",
            "spatialReference": null,
            "fields": [
              {
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
                "type": "esriFieldTypeSingle"
              }
            ]
          },
          "featureSet": { "features": [] }
        };
        featureCollection.layerDefinition.geometryType = layers[0].geometryType;
        featureCollection.layerDefinition.spatialReference = this.map.spatialReference;
        var tmpFeatureLayer = new FeatureLayer(featureCollection, {
          id: layers[0].id + '_1',
          infoTemplate: new esri.InfoTemplate(
            '${nid}',
            '${Intensity}'
          )
        }
        );
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
              var m = new esri.Graphic(esri.geometry.geographicToWebMercator(new esri.geometry.Point(item.geometry.x, item.geometry.y)));
              m.attributes = item.attributes;
              item.attributes.PGA = fData[0].PGA;
              item.attributes.PGV = fData[0].PGV;
              item.attributes.Intensity = fData[0].Intensity;
              tmpFeatureLayer.add(m);
            }
          })
          var Renderer = {
            type: "unique-value",
            field: "Intensity",
            defaultSymbol: { type: "simple-fill" },
            uniqueValueInfos: [{
              value: 0,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "white"
              }
            }, {
              value: 1,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "#e1ffe0"
              }
            }, {
              value: 2,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "#33fe32"
              }
            }, {
              value: 3,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "yellow"
              }
            }, {
              value: 4,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "$fe8532"
              }
            }, {
              value: 5,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "#ff5232"
              }
            }, {
              value: 6,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "#c53d3d"
              }
            }, {
              value: 7,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "#9b4645"
              }
            }, {
              value: 8,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "#9b4b86"
              }
            }, {
              value: 8,
              symbol: {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: "#b61fea"
              }
            }]
          };
          tmpFeatureLayer.setRenderer(Renderer);
          this.map.addLayer(tmpFeatureLayer)
        }))
        debugger;
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

      onClose: function () {
        this.extensionEvent.remove()
      }
    });
  });
