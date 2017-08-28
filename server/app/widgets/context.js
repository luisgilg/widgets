(function (w, d, j, s) {
    w.addEventListener('load', ()=> {
        Polymer.WidgetElement.Setting = s;
        Polymer.WidgetContext.Context = j;
    }) 
})(window,document,JSON.parse('{j:0}'),JSON.parse('{s:0}'));