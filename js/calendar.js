
(function ($) {
	$.fn.calendar = function () {
		var _this = this;
		var week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		var tHead = week.map(function (day) {
			return "<th>" + day + "</th>";
		}).join("");

		_this.init = function () {
			var tpl = '<table class="cal">' +
			'<caption>' +
			'	<span class="prev"><a href="#">&larr;</a></span>' +
			'	<span class="next"><a href="#">&rarr;</a></span>' +
			'	<span class="month"><span>' +
			"</caption>" +
			"<thead><tr>" +
			tHead +
			"</tr></thead>" +
			"<tbody>" +
			"</tbody>" + "</table>";
			var html = $(tpl);
			_this.append(html);
		};

		function daysInMonth(d) {
			var newDate = new Date(d);
			newDate.setMonth(newDate.getMonth() + 1);
			newDate.setDate(0);
			return newDate.getDate();
		}

		_this.update = function (date, active) {
			var mDate = new Date(date);
			mDate.setDate(1); /* star of the month */
			var day = mDate.getDay();
			mDate.setDate(mDate.getDate() - day) /* now mDate is the start day of the table */
			function dateToString(d) {
				/* fix month zero base */
				var year = d.getFullYear();
				var month = d.getMonth();
				if (month == 0) {
					month = 12;
					year -= 1;
				}
				return year + "-" + month + "-" + d.getDate()
			}

			function dateToTag(d) {
				var tag = $('<td><a href="#"></a></td>');
				if (date.getMonth() != d.getMonth()) { // the bounday month
					tag.addClass('off');
				} else if (active && date.getDate() == d.getDate()) { // the select day
					tag.addClass('active');
				}
				var a = tag.find('a');
				a.text(d.getDate());
				a.attr('data-date', dateToString(d));
				return tag;
			};

			var tBody = _this.find('tbody');
			tBody.empty(); /* clear previous first */
			var cols = Math.ceil((day + daysInMonth(date))/7);
			for (var i = 0; i < cols; i++) {
				var tr = $('<tr></tr>');
				for (var j = 0; j < 7; j++, mDate.setDate(mDate.getDate() + 1)) {
					tr.append(dateToTag(mDate));
				}
				tBody.append(tr);
			}

			/* set month head */
			var monthStr;
			if (date.getMonth() == 0) { /* fix month zero base */
				monthStr = (date.getFullYear() - 1) + '-' + 12;
			} else {
				monthStr = date.getFullYear() + '-' + date.getMonth();
			}
			_this.find('.month').text(monthStr)
		};

		_this.getCurrentDate = function () {
			return _this.find(".active a").attr('data-date');
		}

		_this.init();
		_this.update(new Date(), true);

		/* event binding */
		_this.delegate('tbody td', 'click', function () {
			_this.find('.active').removeClass('active');
			$(this).addClass('active');
		});

		function updateTable(monthOffset) {
			var array = _this.find('.month').text().split('-')
			var year = parseInt(array[0]);
			var month = parseInt(array[1]);
			var currentDate = new Date(year, month + monthOffset, 1);
			_this.update(currentDate);
		};

		_this.find('.next').click(function () {
			updateTable(1);

		});

		_this.find('.prev').click(function () {
			updateTable(-1);
		});

		return this;
	};

	$.fn.datePicker = function () {
		var _this = this;
		var picker = $('<div></div>');
		picker.calendar();
		picker.css('display', 'none');  /* default invisable */
		_this.after(picker);

		/* event binding */
		// click outside area, make calendar disappear
		$('body').click(function () {
			picker.css('display', 'none');
		});

		// click input should make calendar appear
		_this.click(function () {
			picker.css('display', '');
			event.stopPropagation(); // stop sending event to docment
		});

		// click on calender, update input
		picker.click(function () {
			_this.val(picker.getCurrentDate());
			event.stopPropagation();
		});

		return this;
	};
}($));

