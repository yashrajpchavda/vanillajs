( ( App, global ) => {

    class BaseComponent extends App.EventEmitter {
        constructor( args ) {
            super( args );
        }
    }

    App.BaseComponent = BaseComponent;

} )( App, window );