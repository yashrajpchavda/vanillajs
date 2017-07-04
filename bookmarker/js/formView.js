( ( App, _, global ) => {

    class FormView extends App.BaseComponent {

        constructor( config ) {
            super( config );
            this.el = document.querySelector( config.container );
            this.compiltedTemplate = _.template( config.template );
        }

        render() {
            this.el.innerHTML = this.compiltedTemplate();
            this.bindEvents();
        }

        bindEvents() {
            let form = this.el.querySelector( '#myForm' );

            form.addEventListener( 'submit', this.handleFormSubmit.bind( this ) );
        }

        handleFormSubmit( e ) {

            // prevent the default behaviour
            e.preventDefault();

            const form = this.el.querySelector( '#myForm' );

            const siteName = form.querySelector( '#siteName' ).value;
            const siteUrl = form.querySelector( '#siteUrl' ).value;

            this.saveData( { siteName, siteUrl } );

            form.reset();

            this.emit( 'newDataSaved', { name: siteName, url: siteUrl } );
            
        }

        saveData( { name, url } ) {

            let bookmarks = localStorage.getItem( 'bookmarks' );

            if ( !bookmarks ) {
                bookmarks = [];
            } else {
                bookmarks = JSON.parse( bookmarks );
            }

            bookmarks.push( {
                name: name,
                url: url
            } );

            localStorage.setItem( 'bookmarks', JSON.stringify( bookmarks ) );

        }

    };

    App.FormView = FormView;

} )( App, _, window );