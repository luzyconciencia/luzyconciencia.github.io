;(function(){

	var d = document, w = window,
		galleries = d.get('section[data-gallery]'),
		objects = [],
		i = 0, l = galleries.length || 1;

	function Gallery( gallery ){

		var g = gallery, // g = the new gallery.
			views = g.get('div[data-view]'),
			thumb_wrapper = g.get('ul[data-thumbs]'),
			images = g.get('img'),
			// ----------------------------------- //
			i = 0, l = views.length,
			// ----------------------------------- //
			currentView = 0,
			userover = false;


		for(; i<l; i++){
			var thumb = create('li'),
				img = create('img');


			thumb_wrapper.append( thumb );
			thumb.append( img );

			img.setAttributes({
				'src' : images[i].src,
				'alt' : images[i].alt,
				'width': images[i].width,
				'height' : 'auto',
				'style' : 'right: '+images[i].data('thumb-view')
			});

			thumb.addEvent('click',changeView);
		}

		thumb_wrapper.get('li:first-child').addClass('active');

		var thumbnails = thumb_wrapper.get('li');

		var galleryInterval = w.setInterval(changeView,5000);

		views.addEvent('mouseover', cancel_auto_gallery);
		views.addEvent('mouseout', continue_auto_gallery);

		function cancel_auto_gallery(){ userover = true; }

		function continue_auto_gallery(){ userover = false;	}

		function changeView(){

			if( !(userover) ){

				var view = thumbnails.indexOf( this );

				if( !(view) && view !== 0 || (this === w)){
					view = currentView+1;
				} 

				if( view >= thumbnails.length ){
					view = 0;
				}

				if( (view !== currentView) ){				


					thumbnails.removeClass('active');
					views[view].addClass('active');

					views.removeClass('active');
					views[ view ].addClass('active');

					currentView = view;

				}

			}
		}

	};

	for(;i<l;i++){
		objects.push( new Gallery( (galleries[i] || galleries ) ) );
	}

})();