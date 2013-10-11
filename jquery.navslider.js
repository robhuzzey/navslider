$(function() {

	// Store the nav menu in a var for later
	var $navMenu = $( "#mobNav" );

	// Grab all our menu items ready for use later
	var $topMenuItems = $( "> ul > li", $navMenu );

	var isNavMenuActive = 0;
	//Set variable used for padding on the content
	var contentPadding = -30;

	var $contentContainer = $( "#olCanada" );

	var contentSlider = function( $contentContainer, x, y, z ) {
		$contentContainer.attr( "style", "-webkit-transform: translate3d(" + x + ", " + y + ", " + z + " );" );
	}

	// Toggle the active state of the menu
	$( "#burger, .mobNavClose" ).on( "click", function() {

		//If statement to check if menu is active
		if( isNavMenuActive  === 0 ) { // Menu is inactive
			isNavMenuActive = 1; // Set Menu Active

			// Moves content down dependant on nav menu height
			contentSlider( $contentContainer, 0, ( $navMenu.height() + contentPadding ) + "px", 0 );
			$navMenu.addClass( "active" ).removeClass( "out" );

			// Remove active state on all sub menus
			$( "ul", $topMenuItems ).each(function() {
				$(this).removeClass( "active" ).removeClass( "out" );
			});

		} else { // Menu is active
			isNavMenuActive = 0; //Set Menu inactive

			// Moves content down dependant on nav menu height
			contentSlider( $contentContainer, 0, "0px", 0 );
			$navMenu.removeClass( "active" ).removeClass( "out" );

			// Remove active state on all sub menus and add class Out
			$( "ul", $topMenuItems ).each(function() {
				$(this).removeClass( "active" ).addClass( "out" );
			});
		}
	});

	// When clicking a top level menu, set the active state of the sub menus
	$topMenuItems.on( "click", function( e ) {

		// Store some lookups for easy use
		var $self = $(this);
		var $subMenu = $( "> ul", $self );

		// Moves main menu out
		$navMenu.addClass( "out" ).removeClass( "active" );

		// Sub menu is now active
		$subMenu.addClass( "active" );

		contentSlider( $contentContainer, 0, ( $subMenu.height() + contentPadding + 30) + "px", 0 );

		// Set the active state of sub menu when the back button of that menu is clicked
		$( ".back", $self ).on( "click", function( e ) {
			$subMenu.removeClass( "active" );
		});

		// Sub menu is now active
		$subMenu.addClass( "active" );

		contentSlider( $contentContainer, 0, ( $subMenu.height() + contentPadding + 30) + "px", 0 );

		// Set the active state of sub menu when the back button of that menu is clicked
		$( ".back", $self ).on( "click", function( e ) {
			$subMenu.removeClass( "active" );
			$navMenu.addClass( "active" ).removeClass( "out" );
			contentSlider( $contentContainer, 0, ( $navMenu.height() + contentPadding ) + "px", 0 );
			e.stopPropagation();
		});

		e.stopPropagation();

	});

});