( ( App, global ) => {

    'use strict';

    App.services = {
        loadCategories() {
            return new Promise( ( resolve, reject ) => {

                let xhr = new XMLHttpRequest();

                xhr.open( 'GET', '/data/categories.json', true );
                xhr.dataType = 'json';

                xhr.onload = () => {
                    if ( xhr.readyState === XMLHttpRequest.DONE ) {
                        if ( xhr.status === 200 ) {
                            const parsedData = JSON.parse( xhr.responseText );
                            resolve( parsedData );
                        } else {
                            reject( xhr.responseText );
                        }
                    }
                }

                xhr.send();

            } );
        }
    };

} )( App, window );