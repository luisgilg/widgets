(function () {

    class ExtendsManager {
        constructor(_instance) {
            this._instance = _instance;
        }

        apply() {
            return true;
        }

        static ExtendableWidgetMixin(_superClass) {
            return class extends _superClass {
                constructor() {
                    super();
                }
            }
        }

    }
    Polymer.ExtendsManager = ExtendsManager;
})()