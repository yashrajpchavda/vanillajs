( ( App, j$, global ) => {

    'use strict';

    const peopleAdder = new App.PeopleAdder( {
        listTemplate: j$( '#peopleListTemplate' ).html(),
        people: [ 'James', 'Anderson' ]
    } );

    function peopleChanged( people ) {
        console.log( people );
    }

    App.events.on( 'peopleChanged', peopleChanged );

} )( App, $, window );