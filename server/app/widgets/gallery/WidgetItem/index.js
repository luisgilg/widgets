(function () {
    Polymer.WidgetMixin(null, true, (superClass) => {
        class WidgetItem extends superClass {
            static get is() { return 'widget-item'; }

            load() {
                super.load();
                this._pushToggleEditElements(this.$.widgetItemSection, 'editing');
            }

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
                    },
                    open: {
                        type: Boolean,
                        notify: true,
                        reflectToAttribute: true
                    }
                });
            }

            static get template() {
                return superClass.extends_template(this, superClass);
            }

            static get observers() {
                return [
                    'isOpenChanged(open)'
                ]
            }

            isOpenChanged(_open) {
                return _open == true
                    ? this.$.widgetItemMenu.setAttribute('open', '')
                    : this.$.widgetItemMenu.removeAttribute('open');
            }

            openMenu(e) {
                e.stopPropagation();
                this.set('open', !this.open);
            }

            connectedCallback() {
                super.connectedCallback();

                document.addEventListener('click', e => {
                    this.set('open', false);
                });
            }


        }
        customElements.define(WidgetItem.is, WidgetItem);
    });
})();
