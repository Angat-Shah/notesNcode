
if (typeof (window) !== 'undefined' && window.performance && window.performance.mark) {
  window.performance.mark('yotpo:loader:loaded');
}
var yotpoWidgetsContainer = yotpoWidgetsContainer || { guids: {} };
(function(){
    var guid = "R4QNK3lQv2Oj9L7hav-W4Q";
    var loader = {
        loadDep: function (link, onLoad, strategy) {
            var script = document.createElement('script');
            script.onload = onLoad || function(){};
            script.src = link;
            if (strategy === 'defer') {
                script.defer = true;
            } else if (strategy === 'async') {
                script.async = true;
            }
            script.setAttribute("type", "text/javascript");
            script.setAttribute("charset", "utf-8");
            document.head.appendChild(script);
        },
        config: {
            data: {
                guid: guid
            },
            widgets: {
            
            },
            guidStaticContent: {},
            dependencyGroups: {}
        },
        initializer: "https://cdn-widgetsrepository.yotpo.com/widget-assets/widgets-initializer/app.v0.4.5-4536.js",
        analytics: "https://cdn-widgetsrepository.yotpo.com/widget-assets/yotpo-pixel/2022-12-06_09-10-14/bundle.js"
    }
    
    
    const initWidgets = function (config, initializeWidgets = true) {
        const widgetInitializer = yotpoWidgetsContainer['yotpo_widget_initializer'](config);
        return widgetInitializer.initWidgets(initializeWidgets);
    };
    const initWidget = function (config, instanceId, widgetPlaceHolder) {
        const widgetInitializer = yotpoWidgetsContainer['yotpo_widget_initializer'](config);
        if (widgetInitializer.initWidget) {
            return widgetInitializer.initWidget(instanceId, widgetPlaceHolder);
        }
        console.error("initWidget is not supported widgetInitializer");
    };
    const onInitializerLoad = function (config) {
        const prevInitWidgets = yotpoWidgetsContainer.initWidgets;
        yotpoWidgetsContainer.initWidgets = function (initializeWidgets = true) {
            if (prevInitWidgets) {
                if (typeof Promise !== 'undefined' && Promise.all) {
                    return Promise.all([prevInitWidgets(initializeWidgets), initWidgets(config, initializeWidgets)]);
                }
                console.warn('[deprecated] promise is not supported in initWidgets');
                prevInitWidgets(initializeWidgets);
            }
            return initWidgets(config, initializeWidgets);
        }
        const prevInitWidget = yotpoWidgetsContainer.initWidget;
        yotpoWidgetsContainer.initWidget = function (instanceId, widgetPlaceHolder) {
            if (prevInitWidget) {
              prevInitWidget(instanceId, widgetPlaceHolder)
            }
            return initWidget(config, instanceId, widgetPlaceHolder);
        }
        const guidWidgetContainer = getGuidWidgetsContainer();
        guidWidgetContainer.initWidgets = function () {
            return initWidgets(config);
        }
        guidWidgetContainer.initWidgets();
    };
    function getGuidWidgetsContainer () {
        if (!yotpoWidgetsContainer.guids) {
            yotpoWidgetsContainer.guids = {};
        }
        if (!yotpoWidgetsContainer.guids[guid]) {
            yotpoWidgetsContainer.guids[guid] = {};
        }
        return yotpoWidgetsContainer.guids[guid];
    }
    const guidWidgetContainer = getGuidWidgetsContainer();
    guidWidgetContainer.config = loader.config;
    if (!guidWidgetContainer.yotpo_widget_scripts_loaded) {
        guidWidgetContainer.yotpo_widget_scripts_loaded = true;
        guidWidgetContainer.onInitializerLoad = function () { onInitializerLoad(loader.config) };
        
        loader.loadDep(loader.analytics, function () {}, 'defer');
        
        
        loader.loadDep(loader.initializer, function () { guidWidgetContainer.onInitializerLoad() }, 'async');
        
    }
})()


