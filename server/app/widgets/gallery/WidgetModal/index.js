(function () {
    Polymer.WidgetMixin(null, true, (superClass) => {
        class WidgetModal extends superClass {
            static get is() { return 'widget-modal'; }

            static get properties() {
                //return super.properties;     
                return superClass.extends_properties(superClass, {
                    modal: {
                        type: Object,
                        notify: true,
                    },
                    open: {
                        type: Boolean,
                        notify: true,
                        reflectToAttribute: true
                    }
                });
            }

            static get observers() {
                return [
                    'isOpenChanged(open)'
                ]
            }

            static get template() {
                return superClass.extends_template(this, superClass);
            }

            isOpenChanged(_open) {
                return _open == true
                    ? this.$.widgetModalSection.setAttribute('open', '')
                    : this.$.widgetModalSection.removeAttribute('open');
            }

            connectedCallback() {
                super.connectedCallback();
                if (this.$.modalDone) {
                    this.$.modalDone.addEventListener('click', e => {
                        if (!this.modal || !this.modal.doneCallback) {
                            return this.set('open', !this.open);
                        }

                        var cb = this.modal.doneCallback || ((_modal, _done) => {
                            return _done(true);
                        });
                        var done = (_isDone) => {
                            var res = _isDone || true;
                            if (res == true) {
                                return this.set('open', !this.open);
                            }
                        }

                        return cb(this.modal, done);
                    });
                }
            }

            disconnectedCallback() {
                super.disconnetedCallback();

            }

        }
        customElements.define(WidgetModal.is, WidgetModal);
    });


})();