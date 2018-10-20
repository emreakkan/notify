/*
* @author Emre AKKAN
* @version V1.0
* @description
* Notify.js
*/

function notify(options) {
	var self = this;
	var defaults = $.extend({
		message: "",
		type: "info",
		placement: {
			from: "bottom",
			align: "right"
		},
		offset: 20,
		delay: 5000,
		duration: false,
		closeBtn: true
	}, options);

	var closeHtml = '';
	var position = defaults.placement.from + ' ' + defaults.placement.align;
	var notifyDiv = $('<div/>');
	var posFrom = 0;

	$('.notifyDiv[data-notify-position="' + position + '"]').each(function () {
		posFrom = Math.max(posFrom, parseInt($(this).css(defaults.placement.from)) + parseInt($(this).outerHeight()) + parseInt(defaults.offset / 2));
	});

	var style = defaults.placement.from + ':' + ((posFrom > 0) ? posFrom : defaults.offset) + 'px; ' + defaults.placement.align + ':' + defaults.offset + 'px;';
	var order = $('[data-notify-position="' + position + '"]').length + 1;

	notifyDiv.attr({
		'class': 'notifyDiv btn-' + defaults.type,
		'style': style,
		'data-notify-position': position,
		'data-notify-order': order
	});

	if(defaults.closeBtn === true){
		closeHtml = '<span class="close" data-notify="dismiss" data-notify-position="' + position + '" data-notify-order="' + order + '">&times;</span>';
	}

	notifyDiv.html(defaults.message + closeHtml);

	$('body').append(notifyDiv);

	$(document).on('click', '[data-notify="dismiss"]', function(){
		self.close($(this));
	})

	if (defaults.duration === true) {
		setTimeout(function () {
			self.close();
		}, defaults.delay);
	}

	self.close = function (item = null) {
		var closeNotify = notifyDiv;

		if(item !== null){
			closeNotify = item.parent('.notifyDiv');
		}

		closeNotify.fadeOut(400, function () {
			$(this).remove();
		});
	}
}