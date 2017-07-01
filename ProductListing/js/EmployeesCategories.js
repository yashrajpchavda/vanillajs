( ( App, Global ) => {

    let EmployeeCategoriesList = function EmployeeCategoriesList( url, container, onChangeCallback ) {
        this.url = url;
        this.el = container;
        this.employeeCategories = [];
        this.onChangeCallback = onChangeCallback;
        this.bindEvents();
    }

    EmployeeCategoriesList.prototype.fetchCategories = function() {
        return new Promise( ( resolve, reject ) => {

            let xhr = new XMLHttpRequest();

            xhr.open( 'GET', this.url, true );
            xhr.dataType = 'json';

            xhr.onload = () => {
                if ( xhr.readyState === XMLHttpRequest.DONE ) {
                    if ( xhr.status === 200 ) {
                        const parsedData = JSON.parse( xhr.responseText );
                        this.employeeCategories = parsedData.data;
                        resolve( parsedData );
                    } else {
                        reject( xhr.responseText );
                    }
                }
            }

            xhr.send();

        } );
    }

    EmployeeCategoriesList.prototype.renderItems = function( clearItems ) {

        if ( clearItems ) { this.clearItemsOfEl(); }

        let docFrag = document.createDocumentFragment();

        for ( let category of this.employeeCategories ) {
            let categoryEl = document.createElement( 'option' );
            categoryEl.setAttribute( 'value', category.value );
            categoryEl.innerHTML = category.text;
            docFrag.appendChild( categoryEl );
        }

        this.el.appendChild( docFrag );

    }

    EmployeeCategoriesList.prototype.clearItemsOfEl = function() {
        while( this.el.firstChild ) {
            
        }
    }

    EmployeeCategoriesList.prototype.bindEvents = function() {
        this.el.addEventListener( 'change', this.handleCategoryChange.bind( this ) );
    }

    EmployeeCategoriesList.prototype.handleCategoryChange = function() {
        // console.log( this.el );
        if ( typeof this.onChangeCallback === 'function' ) {
            this.onChangeCallback.call( this, this.el.value );
        }
    }

    App.EmployeeCategoriesList = EmployeeCategoriesList;

} )( App, window );