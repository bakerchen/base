(function() {
  var $, $$, WIDGET_CALL_FUNCTION, WIDGET_LIST, widget, _fn, _i, _len;

  $$ = window.BASE;

  $ = window.jQuery;

  /**
   * [WIDGET_CALL_FUNCTION description]
   * @type {[type]}
  */


  WIDGET_CALL_FUNCTION = $$.WIDGET_CALL_FUNCTION = {
    baseUrl: "./javascript/jquery.base.{key}.js"
  };

  WIDGET_LIST = 'accordion buttonSet datePicker dialog dropDownList grid list menu progressBar slide tabs tip tree'.split(' ');

  _fn = function(widget) {
    var argumentsList, key, widgetJSON;
    if (!$.isFunction($.fn[widget])) {
      argumentsList = [];
      key = widget;
      widgetJSON = {
        argumentsList: argumentsList,
        loading: false
      };
      WIDGET_CALL_FUNCTION[key] = widgetJSON;
      return $.fn[key] = function() {
        if (!widgetJSON.loading) {
          return $.ajax({
            url: WIDGET_CALL_FUNCTION.baseUrl.replace('{key}', key),
            dataType: 'script',
            success: function(data) {
              var args, _j, _len1;
              for (_j = 0, _len1 = argumentsList.length; _j < _len1; _j++) {
                args = argumentsList[_j];
                $.fn[key].apply(args.pop(), args);
              }
              return delete WIDGET_CALL_FUNCTION[key];
            }
          });
        }
      };
    }
  };
  for (_i = 0, _len = WIDGET_LIST.length; _i < _len; _i++) {
    widget = WIDGET_LIST[_i];
    _fn(widget);
  }

}).call(this);
