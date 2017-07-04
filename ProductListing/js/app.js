(( App, Global ) => {
    'use strict';

    let employeeList;
    let categoriesList;

    const initializeAndRenderCategoriesList = () => {
        categoriesList = new App.EmployeeCategoriesList( '/data/categories.json', 
            document.querySelector( '.js-cat-list' ),
            function( selectedValue ) {
                employeeList.refreshItems( selectedValue );
            } );

        categoriesList.fetchCategories()
            .then( ( response ) => {
                categoriesList.renderItems();
                initializeAndRenderEmployeeList();
            } );
    }

    const initializeAndRenderEmployeeList = () => {
        employeeList = new App.EmployeeList( '/data/data.json', document.querySelector( '.js-employee-list' ) );
        employeeList.fetchEmployees()
            .then( ( response ) => {
                employeeList.renderItems();
            } );
    }

    
    initializeAndRenderCategoriesList();
    // initializeAndRenderEmployeeList();

    

})( App, window );