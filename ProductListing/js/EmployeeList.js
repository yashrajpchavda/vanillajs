( ( App, Global ) => {

    let EmployeeList = function EmployeeList( url, container ) {
        this.url = url;
        this.employees = [];
        this.employeeViews = [];
        this.el = container;
    }

    EmployeeList.prototype.fetchEmployees = function() {
        return new Promise( ( resolve, reject ) => {

            let xhr = new XMLHttpRequest();
            xhr.dataType = 'json';
            
            xhr.open( 'GET', this.url, true );

            xhr.onload = () => {
                if ( xhr.status === 200 && xhr.readyState === 4 ) {
                    const parsedResponse = JSON.parse( xhr.responseText );
                    this.employees = parsedResponse.data || [];
                    resolve( parsedResponse );
                } else {
                    reject( xhr.responseText );
                }
            }

            xhr.send();

        } );
    }

    EmployeeList.prototype.renderItems = function() {
        
        let documentFrag = document.createDocumentFragment();
        const employeesLen = this.employees.length;

        for ( emp of this.employees ) {
            let empItemView = new App.Employee( emp );
            this.employeeViews.push( empItemView );
            documentFrag.appendChild( empItemView.render().el );
        }

        this.el.appendChild( documentFrag );

    }

    App.EmployeeList = EmployeeList;

} )( App, window );