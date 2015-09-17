(function (global) {
	var $body = $('body'),
		$actions = $('#actions'),
		$sidebar = $('.sidebar'),
		$iframe = $sidebar.find('iframe'),
		EVENT_EDIT_URL = '/event/edit/';

	function open(eventId) {
		var targetUrl = EVENT_EDIT_URL + (eventId || '');
		if ($iframe.attr('src') !== targetUrl) {
			$iframe.attr('src', targetUrl);
		}
		
		$body.addClass('fold-out-pre');
		setTimeout(function() {
			$body.addClass('fold-out');
		}, 1);
	}

	function close() {
		$body.removeClass('fold-out');
		setTimeout(function() {
			$body.removeClass('fold-out-pre');
		}, 800);
	}

	function actionClick (ev) {
		if ($body.hasClass('fold-out')) {
			close();
		}
		else {
			open();
		}
	}
	log(actions);
	$actions.on('click', 'button', actionClick);

	global.sidebar = {
		open: open,
		close: close
	};
})(app);