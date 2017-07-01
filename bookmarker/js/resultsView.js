( ( App, _, global ) => {

    'use strict';

    class ResultsView extends App.BaseComponent {
        constructor( args ) {
            super( args );
            this.el = document.querySelector( args.container );
            this.compiltedItemTemplate = _.template( args.itemTemplate );
            this.data = [];
            this.bindEvents();
        }

        bindEvents() {
            this.el.addEventListener( 'click', this.handleClickEvent.bind( this ) );
        }

        handleClickEvent( event ) {
            const target = event.target;

            if ( target.className.indexOf ( 'delete-btn' ) !== -1 ) {
                // get the url
                const url = target.getAttribute( 'data-url' );
                this.deleteItem( url );

                // remove the node from the dom
                const parentDiv = target.parentElement;

                parentDiv.parentElement.removeChild( parentDiv );
            }

        }

        deleteItem( url ) {
            // search the item in the list and splice the array
            let bookmarks = this.getBookMarksFromStorage();

            let length = bookmarks.length;
            
            for ( let i = 0 ; i < length ; i ++ ) {
                const item = bookmarks[ i ];

                if ( item && item.url === url ) {
                    bookmarks.splice( i, 1 );
                    length--;
                }
            }

            localStorage.setItem( 'bookmarks', JSON.stringify( bookmarks ) );
        }

        getBookMarksFromStorage() {
            let bookmarks = localStorage.getItem( 'bookmarks' );

            if ( bookmarks ) {
                bookmarks = JSON.parse( bookmarks );
            } else {
                bookmarks = [];
            }

            return bookmarks;
        }

        fetchData() {
            let bookmarks = this.getBookMarksFromStorage();

            this.data = bookmarks;
            return this;
        }

        renderAllItems() {

            let fragment = document.createDocumentFragment();

            this.data.forEach( ( item ) => {
                let wrapper = this.getWrapperForItem( item );
                fragment.appendChild( wrapper );
            } );

            this.el.innerHtml = '';
            this.el.appendChild( fragment );
            return this;

        }

        getWrapperForItem( item ) {
            let wrapper = document.createElement( 'div' );
            wrapper.className = 'well';
            wrapper.innerHTML = this.getItemHtml( item.name, item.url );
            return wrapper;
        }

        getItemHtml( name, url ) {
            return this.compiltedItemTemplate( { name, url } );
        }

        appendNewItemToList( name, url ) {
            let wrapper = this.getWrapperForItem( { name, url } );
            this.el.appendChild( wrapper );
        }
    };

    App.ResultsView = ResultsView;

} )( App, _, window );