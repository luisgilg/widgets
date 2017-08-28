(function () {

    Polymer.WidgetMixin(null, true, (superClass) => {
        class WidgetLoader extends superClass {
            static get is() { return 'widget-loader'; }

            static get properties() {
                //return super.properties;     
                return superClass.extends_properties(superClass, {
                    widgetInfo: {
                        type: Object,
                        notify: true,
                    },
                    widgetIndex: {
                        type: String,
                        notify: true,
                    }
                });
            }

            static get template() {
                return superClass.extends_template(this, superClass);
            }

            onPropertyChanged(e) {
                super.onPropertyChanged(e);
                if (!this._childElement) {
                    return;
                }

                // if(e.detail.property == 'context.isEditing'){
                //     this._childElement.notifyPath('editing');
                // }

                this._childElement.onPropertyChanged(e);
            }

            _createWidget(container, info) {
                if (!info || !info.type) return;

                var elm = document.createElement(info.type);

                elm.set('context', this.context);
                //elm.set('commonClass',this.commonClass);
                elm.set('parentName', this.parentName);
                elm.set('parentContext', this.parentContext);
                elm._setLocalContext(info);

                this._childElement = elm;
                Polymer.dom(container).appendChild(elm);
            }

            ready() {
                super.ready();

            }

            load() {
                super.load();
                this._createWidget(this.$.widgetContainer, this.widgetInfo);
            }

        }

        customElements.define(WidgetLoader.is, WidgetLoader);

    });

})();