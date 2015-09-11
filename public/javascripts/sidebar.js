(function (global) {
	var $body = $('body');

	function foldOut() {
		$body.addClass('fold-out-pre');
		setTimeout(function() {
			$body.addClass('fold-out');
		}, 1);
	}

	function foldIn() {
		$body.removeClass('fold-out');
		setTimeout(function() {
			$body.removeClass('fold-out-pre');
		}, 800);
	}

	function actionClick (ev) {
		if ($body.hasClass('fold-out')) {
			foldIn();
		}
		else {
			foldOut();
		}
	}

	$('#actions').on('click', 'button', actionClick);

})(app);