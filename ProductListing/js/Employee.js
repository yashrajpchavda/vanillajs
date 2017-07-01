( ( App, Global ) => {
    
    const employeeHtml = function( employee ) {
        return `<img class="employee-photo" src="${ employee.imageUrl }">
            <div class="employee-name">${ employee.name }</div>
            <div class="employee-location">${ employee.location }</div>`;
    };

    let Employee = function Employee( data ) {
        this.data = data;

        this.el = document.createElement( 'li' );
        this.el.className += 'employee clearfix';
    }

    Employee.prototype.render = function() {
        this.el.innerHTML = employeeHtml( this.data );
        return this;
    }

    Employee.prototype.remove = function() {
        this.el.parentNode.remove( this.el );
    }

    App.Employee = Employee;

} )( App, window );