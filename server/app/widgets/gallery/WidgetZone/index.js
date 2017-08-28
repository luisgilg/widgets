(function () {
    Polymer.WidgetMixin(null, true, (superClass) => {
        class WidgetZone extends superClass {
            static get is() { return 'widget-zone'; }
            constructor() {
                super();
            }

            static get properties() {
                return superClass.properties;
                //   return extends_properties({
                //       editClass:{
                //           type: String,
                //           notify: true,
                //           computed: '_editClass(context.isEditing)'            
                //       }
                //   });
            }

            static get template() {
                return superClass.extends_template(this, superClass);
            }



            connectedCallback() {
                super.connectedCallback();


            }

            disconnectedCallback() {
                super.disconnetedCallback();

            }


            ready() {
                super.ready();
                this.set('parentContext', this.context);
                this._pushToggleEditElements(this.$.widgetZoneSection, 'editing');
                //  this.set('context',this.context);
                //  this.set('context.isEditing',this.context.isEditing);

                //  this.shadowRoot.querySelectorAll('[widget-listener]').forEach((element)=> {
                //    element.addEventListener('propertyChanged',this._propertyChanged.bind(this));
                //  });


                //  if(this.name && this.parentContext && !this.localContext){
                //       this.set('localContext',this.parentContext[this.name]);
                //   }
                //this.set('localContext',this.parentContext[this.name]);
            }
        }
        customElements.define(WidgetZone.is, WidgetZone);
    });

})();