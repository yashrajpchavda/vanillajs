( ( App, global ) => {

    'use strict';

    class EventEmitter {
        constructor() {
            this.events = {};
        }

        on( event, listener ) {
            this.events[ event ] = this.events[ event ] || [];
            const events = this.events[ event ];
            events.push( listener );
        }

        off( event, listener ) {
            let listeners = this.events[ event ];

            if ( !listeners ) return;

            if ( !listener ) {
                delete this.events[ event ];
                return;
            }

            for( let i = 0; i < listeners.length; i ++ ) {
                if ( listeners[ i ] === listener ) {
                    listeners.splice( i, 1 );
                }
            }

        }

        trigger( event, ...args ) {
            const listeners = this.events[ event ];

            if ( !listeners ) return;

            for ( let i = 0, len = listeners.length; i < len; i ++ ) {
                listeners[ i ].apply( this, args );
            }
        }
    }

    App.events = new EventEmitter();;

} )( App, window );