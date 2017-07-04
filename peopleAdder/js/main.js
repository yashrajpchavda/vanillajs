( ( App, j$, global ) => {

    'use strict';

    const peopleAdder = new App.PeopleAdder( {
        listTemplate: j$( '#peopleListTemplate' ).html(),
        people: [ 'James', 'Anderson' ]
    } );

    App.events.on( 'peopleChanged', peopleChanged );

    function peopleChanged( people ) {
        console.log( people );
    }

} )( App, $, window );