(function(){
Polymer.WidgetMixin(null, true, (superClass) => {
    class WidgetEdit extends superClass {
        static get is() { return 'widget-edit'; }

        static get properties() {
            return super.properties;
        }

        ready() {
            super.ready();
            this.set('parentContext', this.context);
            this._pushToggleEditElements(this.$.widgetEditSection, 'editing');

            this.$.widgetEditButton.addEventListener('click', e => {
                this.handleWidgetStartEdit(e)
            });
        }

        static get template(){
            return superClass.extends_template(this, superClass);
        }

        handleWidgetStartEdit(e) {
            var value = !this.context.isEditing;

            var detail = {
                name: this.name,
                parentName: this.parentName,
                fullPath: this.fullPath,
                property: 'context.isEditing',
                value: value
            };

            this._dispatchSetAndEvent(detail);
        }

    }

    customElements.define(WidgetEdit.is, WidgetEdit);
})

    
})();