jQuery.fn.navSlider = function( options ) {

	var defaults = {
		"navMenu" : "#mobNav",
		"content" : "#content",
		"toggleNav" : "#burger",
		"backButton" : ".back",
		"contentPadding" : -30
	};

	var settings = $.extend( {}, defaults, options );

	return this.each( function() {

		// Store the nav menu in a var for later
		var $navMenu = $( this );

		// Grab all our menu items ready for use later
		var $topMenuItems = $( "> ul > li", $navMenu );

		var isNavMenuActive = 0;

		var $contentContainer = $( settings.content );

		var contentSlider = function( $contentContainer, x, y, z ) {
			$contentContainer.attr( "style", "-webkit-transform: translate3d(" + x + ", " + y + ", " + z + " );" );
		}

		// Opens or closes the whole navigation menu
		$( settings.toggleNav ).on( "click", function() {

			//If statement to check if menu is active
			if( isNavMenuActive  === 0 ) { // Menu is inactive
				isNavMenuActive = 1; // Set Menu Active

				// Moves content down dependant on nav menu height
				contentSlider( $contentContainer, 0, ( $navMenu.height() + settings.contentPadding ) + "px", 0 );
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

			contentSlider( $contentContainer, 0, ( $subMenu.height() + settings.contentPadding ) + "px", 0 );

			// Set the active state of sub menu when the back button of that menu is clicked
			$( settings.backButton, $self ).on( "click", function( e ) {
				$subMenu.removeClass( "active" );
				$navMenu.addClass( "active" ).removeClass( "out" );
				contentSlider( $contentContainer, 0, ( $navMenu.height() + settings.contentPadding ) + "px", 0 );
				e.stopPropagation();
			});

			e.stopPropagation();

		});
	});

};