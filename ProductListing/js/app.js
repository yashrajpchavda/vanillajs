(( App, Global ) => {
    'use strict';

    let employeeList;
    let categoriesList;

    const initializeAndRenderCategoriesList = () => {
        const container = document.querySelector( '.js-cat-list' );
        const onChangeCallback = ( selectedValue ) => {
            employeeList.refreshItems( selectedValue );
        };

        categoriesList = new App.EmployeeCategoriesList( { container, onChangeCallback } );

        categoriesList.fetchCategories()
            .then( ( response ) => {
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