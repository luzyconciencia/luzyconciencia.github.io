;(function(){

	var d = document, w = window,
		galleries = d.get('section[data-gallery]'),
		objects = [],
		i = 0, l = galleries.length || 1;

	function Gallery( gallery ){

		var g = gallery, // g = the new gallery.
			views = g.get('div[data-view]'),
			thumb_wrapper = g.get('ul[data-thumbs]'),
			// ----------------------------------- //
			i = 0, l = views.length,
			// ----------------------------------- //
			currentView = 0,
			animating = false;


		for(; i<l; i++){
			var thumb = create('li');

			thumb_wrapper.append( thumb );
			thumb.addEvent('click',changeView);
		}

		for(i=1;i<l;i++){
			views[i].addClass('gallery-right');
		}

		thumb_wrapper.get('li:first-child').addClass('active');

		var thumbnails = thumb_wrapper.get('li');

		function changeView(){

			var view = thumbnails.indexOf( this ) || (currentView+1);

			if( view >= thumbnails.length ){
				view = 0;
			}

			if( !(animating) && (view !== currentView) ){				

				animating = true;

				thumbnails.removeClass('active');
				this.addClass('active');

				views.removeClass('active');
				views[ view ].addClass('active');

				currentView = view;

			}

			animating = false;

		}

	};

	for(;i<l;i++){
		objects.push( new Gallery( (galleries[i] || galleries ) ) );
	}

})();