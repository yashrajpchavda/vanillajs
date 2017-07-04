( ( App, j$, _, global ) => {

    'use strict';

    class PeopleAdder {
        constructor( { listTemplate, people = [] } ) {
            this._listTemplate = _.template( listTemplate );
            this.people = people;
            this.cacheDom();
            this.bindEvents();
            this._renderItems();
        }

        cacheDom() {
            this.$el = j$( '#peopleAdder' );
            this.$form = this.$el.find( '#addForm' );
            this.$name = this.$form.find( '#name' );
            this.$button = this.$form.find( '#addBtn' );
            this.$list = this.$el.find( '#addedPeopleList' );
        }

        bindEvents() {
            this.$form.on( 'submit', this.handleFormSubmit.bind( this ) );
            this.$button.on( 'click', this.addPerson.bind( this ) );
            this.$list.on( 'click', '.del-item', this.handleDelelteItemFromList.bind( this ) );
        }

        handleDelelteItemFromList( event ) {
            const $target = $( event.target );
            const $li = $target.closest( 'li' );
            const index = $li.index();
            // remove that indexed item from the list
            this.people.splice( index, 1 );

            App.events.trigger( 'peopleChanged', this.people );

            $li.remove();
            this._renderItems();
        }

        handleFormSubmit( event ) {
            // prevent the default behaviour
            event.preventDefault();

            this.addPerson();
        }

        addPerson( event ) {
            const name = $.trim( this.$name.val() );

            if ( !name || name.length === 0 ) return;

            this.people.push( name );

            App.events.trigger( 'peopleChanged', this.people );

            this._renderItems();
            this.$name.val( '' );
        }

        _renderItems() {
            this.$list.html( this._listTemplate( { people: this.people } ) );
        }
    }

    App.PeopleAdder = PeopleAdder;

} )( App, jQuery, _, window );