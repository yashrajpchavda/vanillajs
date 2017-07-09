( ( App, Global ) => {

    let EmployeeCategoriesList = function EmployeeCategoriesList( { container, onChangeCallback } ) {
        this.el = container;
        this.employeeCategories = [];
        this.onChangeCallback = onChangeCallback;
        this.bindEvents();
    }

    EmployeeCategoriesList.prototype.fetchCategories = function() {

        const promise = App.services.loadCategories();

        promise.then( ( response ) => {
            this.employeeCategories = response.data;
            this.renderItems();
            return promise;
        } );
        
        return promise;

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