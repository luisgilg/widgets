(function () {
    Polymer.WidgetMixin(null, true, (superClass) => {
        class WidgetStackPanel extends superClass {
            static get is() { return 'widget-stack-panel'; }
            constructor() {
                super();
            }

            static get properties() {
                //return super.properties;     
                return superClass.extends_properties(superClass, {
                    addWidgetModal: {
                        type: Object,
                        notify: true,
                    },
                    showAddWidgetModal: {
                        type: Boolean,
                        notify: true
                    }
                });
            }

            static get template() {
                return superClass.extends_template(this, superClass);
            }

            addWidgetCallback(_modal, _done) {
                return _done(true);
            }

            removeWidget(e) {
                var index = e.target.getAttribute('data-widget-index');
                this.splice('localContext.content', index, 1);
            }

            ready() {
                super.ready();
                var _addWidgetModal = {
                    displayTitle: 'Add widget',
                    doneTitle: 'Done',
                    doneIcon: 'icons:done',
                    doneCallback: (_modal, _done) => {
                        this.addWidgetCallback(_modal, _done);
                    }
                };

                this.set('showAddWidgetModal', false);

                this.set('addWidgetModal', _addWidgetModal);

            }

            load() {
                super.load();
                this._pushToggleEditElements(this.$.widgetStackPanelSection, 'editing');
            }

            connectedCallback() {
                super.connectedCallback();
                this.$.addWidgetButton.addEventListener('click', e => {
                    this.set('showAddWidgetModal', !this.showAddWidgetModal);
                });
            }

            disconnectedCallback() {
                super.disconnetedCallback();

            }

            // onPropertyChanged(e){
            //     super.onPropertyChanged(e);
            // if(!this._childElement){
            //     return;
            // }

            // if(e.detail.property == 'context.isEditing'){
            //     this._childElement.notifyPath('editing');
            // }

            // this._childElement.notifyPath(e.detail.property);
            // }

        }

        customElements.define(WidgetStackPanel.is, WidgetStackPanel);
    });


})();