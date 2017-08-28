(function () {

    Polymer.WidgetMixin(null, true, (superClass) => {
        class WidgetContainer extends superClass {
            static get is() { return 'widget-container'; }
            constructor() {
                super();
            }

            load() {
                super.load();
                this._pushToggleEditElements(this.$.widgetContainer, 'editing');
                this._pushToggleEditElements(this.$.widgetContainerSlot, 'editing');
            }

            static get properties() {
                //return super.properties;     
                return superClass.extends_properties(superClass, {
                    config: {
                        type: String,
                        notify: true,
                    },
                    displayName: {
                        type: String,
                        notify: true,
                        computed: '_getDisplayName(parentType, widgetIndex, parentName, name)'
                    },
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

            _getDisplayName(parentType, widgetIndex, parentName, name) {
                return (parentType + ' - ' + (parentName || name || widgetIndex || 0));
            }


        }

        customElements.define(WidgetContainer.is, WidgetContainer);
    });


})();
