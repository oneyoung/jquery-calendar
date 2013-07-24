
(function ($) {
	$.fn.calendar = function () {
		var _this = this;
		var week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

		_this.init = function () {
			var tpl = '<table class="cal">' +
			'<caption>' +
			'	<span class="prev"><a href="#">&larr;</a></span>' +
			'	<span class="next"><a href="#">&rarr;</a></span>' +
			'	<span class="month"><span>' +
			"</caption>" +
			"<thead>" +
			"	<tr>" +
			"	</tr>" +
			"</thead>" +
			"<tbody>" +
			"</tbody>" + "</table>";
			var html = $(tpl);
			/* add week header -- Mon, Tue, Wed, etc */
			var tHead = $(html).find('thead tr');
			week.forEach(function (name) {
				tHead.append($("<th>" + name + "</th>"));
			});
			_this.append(html);
		};

		_this.init();
		return this;
	};
}($));

