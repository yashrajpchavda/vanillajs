( ( App, global ) => {
    'use strict';

    let formView = new App.FormView( {
        container: '#formContainer',
        template: document.querySelector( '#formTemplate' ).innerHTML
    } );

    let resultsView = new App.ResultsView( {
        container: '#bookmarksResults',
        itemTemplate: document.querySelector( '#bookmarkItemTemplate' ).innerHTML
    } );

    formView.on( 'newDataSaved', ( data ) => {
        resultsView.appendNewItemToList( data.name, data.url );
    } );

    formView.render();

    resultsView
        .fetchData()
        .renderAllItems();   
    
} )( App, window );