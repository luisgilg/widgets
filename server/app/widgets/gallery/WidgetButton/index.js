(function () {

    Polymer.WidgetMixin(null, true, (superClass) => {
        class WidgetButton extends superClass {
            static get is() { return 'widget-button'; }

            ready() {
                super.ready();
                this._pushToggleEditElements(this.$.widgetAddButton, 'editing');
            }

            static get template() {
                return superClass.extends_template(this, superClass);
            }

        }


        customElements.define(WidgetButton.is, WidgetButton);
    });


})();