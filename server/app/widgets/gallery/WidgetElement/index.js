(function(){
class WidgetElement extends Polymer.Element {
    constructor() {
        super();

        this.set('commonClass', 'widget ' + this.elementName);
        this._toggleEditElements = [];
        this.__localContext = null;

    }

    static get is(){
        return 'widget-element';
    }

    static get Setting() {
        if (WidgetElement.GetSettingPromise) return WidgetElement.GetSettingPromise;

        WidgetElement.GetSettingPromise = new Promise((resolve, reject) => {
            if (WidgetElement._setting) {
                return resolve(WidgetElement._setting);
            }

            if (WidgetElement.GetSettingResolver) {
                resolve(WidgetElement.GetSettingResolver())
            }

            WidgetElement.GetSettingResolver = resolve;
        });

        return WidgetElement.GetSettingPromise;
    }

    static set Setting(_setting) {
        var stx = WidgetElement._setting || _setting;
        WidgetElement._setting = stx;
        if (!WidgetElement.GetSettingResolver) {
            WidgetElement.GetSettingResolver = (() => { return stx })
        }
        return WidgetElement.GetSettingResolver(stx);
    }

    connectedCallback() {
        if (super.connectedCallback) {
            super.connectedCallback();
        }

        this.addEventListener('propertyChanged', this._onPropertyChanged.bind(this));

        var wContext = this.shadowRoot.querySelector('widget-context');
        if (wContext) {
            wContext.addEventListener('contextChanged', this._onPropertyChanged.bind(this));
            //wContext.addEventListener('contextChanged', this._toggleEdit.bind(this));
        }
    }

    disconnectedCallback() {
        if (super.disconnectedCallback) {
            super.disconnectedCallback();
        }

        this.removeEventListener('propertyChanged', this._onPropertyChanged);

        var wContext = this.shadowRoot.querySelector('widget-context');
        if (wContext) {
            wContext.removeEventListener('contextChanged', this._onPropertyChanged);
            //wContext.removeEventListener('contextChanged', this._toggleEdit);

        }
    }

    _onPropertyChanged(e) {
        var lastEvent = this._lastEvent;
        var newEvent = this.mapEvent(e);
        var minTimeStamp = 200;

        if (lastEvent && lastEvent.type == newEvent.type
            && lastEvent.detail && newEvent.detail
            && lastEvent.detail.property && newEvent.detail.property
            && lastEvent.detail.property == newEvent.detail.property
            && lastEvent.detail.value == newEvent.detail.value
            && (newEvent.timeStamp - lastEvent.timeStamp) < minTimeStamp) {

            return;
        }

        this._lastEvent = newEvent;
        setTimeout(() => {
            this._lastEvent = null;
        }, 3 * minTimeStamp);

        return this.onPropertyChanged(e);
    }

    mapEvent(e) {
        return {
            timeStamp: e.timeStamp,
            type: e.type,
            detail: e.detail
        }
    }

    onPropertyChanged(e) {
        this.notifyPath(e.detail.property);

        if (e.detail.property != 'context.isEditing') {
            return;
        }

        this._fireToggleEditElements(e.detail.value);
        this.set('editing', e.detail.value == true);

        this.dispatchEvent(new CustomEvent('toggleEdit', {
            detail: e.detail
        }));
    }

    get elementName() {
        return this.constructor.is;
    }

    _elementName() {
        return this.elementName;
    }

    ready() {
        super.ready();


        Polymer.WidgetContext.Context.then((_context) => {
            this.load();
            this.extendThis();
            //this.set('context', _context);
        });

        //this.firstElementChild.classList.add('widget')
        // When possible, use afterNextRender to defer non-critical
        // work until after first paint.

        Polymer.RenderStatus.afterNextRender(this, function () {

        });
    }

    load() {

    }

    // _remainingExtends(eventId){
    //     eventId = eventId || arguments.callee.caller;
    //     return this._extend_managers._remainingExtends(eventId);
    // }

    // _getExtendsForThis(eventId){
    //     var id = this._id;
    //     if (!id) return;
    //     return this._extend_managers._remainingExtends(id,eventId);
    // }

    extendThis() {
        //var extCtx = _localCtx || _ctx;
        //eventId = eventId || arguments.callee.caller;

        return this._extend_managers.apply(this);


        // if (!extCtx){
        //     return;
        // }

        // if(this._extend_managers._remainingExtends(eventId)>=0) return;

        // var ext = this._extend_managers._remainingExtends(eventId);

        // setTimeout(()=>{
        //     this.
        // },)


    }

    _pushToggleEditElements(elm, cls) {
        this._toggleEditElements.push({
            element: elm,
            class: cls
        });
    }


    _fireToggleEditElements(_isEditing) {
        this._toggleEditElements.forEach((elm) => {
            return (_isEditing == true) ? elm.element.classList.add(elm.class) : elm.element.classList.remove(elm.class);
        });
    }

    // _toggleEdit(e){

    //     if(e.detail.property != 'context.isEditing'){
    //         return;
    //     }

    //     this._fireToggleEditElements(e.detail.value);
    //     this.set('editing', e.detail.value == true);

    //     this.dispatchEvent(new CustomEvent('toggleEdit', {
    //         detail: e.detail
    //     }));
    // }

    static get properties() {
        return {
            parentType: {
                type: String,
                notify: true,
            },
            context: {
                type: Object,
                notify: true,
            },
            name: {
                type: String,
                notify: true,
            },
            type: {
                type: String,
                readOnly: true,
                computed: '_elementName()'
            },
            parentName: {
                type: String,
                notify: true,
            },
            locator: {
                type: String,
                notify: true,
                reflectToAttribute: true
            },
            parentContext: {
                type: Object,
                notify: true,
            },
            localContext: {
                type: Object,
                notify: true,
                computed: '_getLocalContext(context, parentContext, name)'
            },
            fullPath: {
                type: String,
                notify: true,
                computed: '_getFullPath(parentName, name)'
            },
            editing: {
                type: Boolean,
                notify: true,
                reflectToAttribute: true
            },
            commonClass: {
                type: String,
                notify: true
            },
            dynamicClass: {
                type: String,
                notify: true
            },
        };
    }

    _setLocalContext(ctx) {
        this.__localContext = ctx;
        this.notifyPath('localContext');
    }

    _getLocalContext(_context, _parentCtx, _name) {
        if (this.__localContext) {
            return this.__localContext;
        }

        if (_parentCtx && _name) {
            return _parentCtx[_name];
        }

        if (_context && _name) {
            return _context[_name]
        }

        return _context;
    }

    _getFullPath(_parentName, _name) {
        if (_parentName && _name) {
            return _parentName + '.' + _name;
        }
        if (!_parentName && _name) {
            return _name;
        }
        return '';
    }

    _dispatchSetAndEvent(detail, eventName) {
        eventName = eventName || 'propertyChanged';

        this.set(detail.property, detail.value);

        this.dispatchEvent(new CustomEvent(eventName, {
            detail: detail
        }));

    }
}

customElements.define(WidgetElement.is, WidgetElement);
Polymer.WidgetElement = WidgetElement;

})();