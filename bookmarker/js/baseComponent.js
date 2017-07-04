( ( App, global ) => {

    class BaseComponent extends App.EventEmitter {
        constructor() {
            super();
        }
    }

    App.BaseComponent = BaseComponent;

} )( App, window );