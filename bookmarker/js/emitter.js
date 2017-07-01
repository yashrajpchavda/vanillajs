/* Polyfill EventEmitter. */

( ( App, global ) => {

    class EventEmitter {
        constructor() {
            this.events = {};
        }

        on( event, listener ) {
            if ( typeof this.events[ event ] !== 'object' ) {
                this.events[ event ] = [];
            }

            this.events[ event ].push( listener );
        }

        removeListener( event, listener ) {

            let idx;

            if ( typeof this.events[ event ] === 'object' ) {

                if ( listener ) {
                    idx = this.events[ event ].indexOf( listener );

                    if ( idx > -1 ) {
                        this.events[ event ].splice( idx, 1 );
                    }
                } else {
                    delete this.events[ event ];
                }
                
            }

        }

        emit( event ) {

            let i, listeners, length, args = Array.prototype.slice.call( arguments, 1 );

            if ( typeof this.events[ event ] === 'object' ) {
                listeners = this.events[ event ];
                length = listeners.length;

                for ( i = 0 ; i < length ; i ++ ) {
                    listeners[ i ].apply( this, args );
                }
            }

        }

        once( event, listener ) {
            this.on( event, function g() {
                this.removeListener( event, g );
                listener.apply( this, arguments );
            } );
        }
    };

    App.EventEmitter = EventEmitter;

} )( App, window );

