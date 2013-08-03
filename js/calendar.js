
(function ($) {
	/* "YYYY-MM[-DD]" => Date */
	function strToDate(str) {
		try {
			var array = str.split('-');
			var year = parseInt(array[0]);
			var month = parseInt(array[1]);
			var day = array.length > 2? parseInt(array[2]): 1 ;
			if (year > 0 && month >= 0) {
				return new Date(year, month, day);
			} else {
				return null;
			}
		} catch (err) {}; // just throw any illegal format
	};

	/* Date => "YYYY-MM-DD" */
	function dateToStr(d) {
		/* fix month zero base */
		var year = d.getFullYear();
		var month = d.getMonth();
		if (month == 0) {
			month = 12;
			year -= 1;
		}
		return year + "-" + month + "-" + d.getDate()
	};

	$.fn.calendar = function (options) {
		var _this = this;
		var opts = $.extend({}, $.fn.calendar.defaults, options);
		var week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		var tHead = week.map(function (day) {
			return "<th>" + day + "</th>";
		}).join("");

		_this.init = function () {
			var tpl = '<table class="cal">' +
			'<caption>' +
			'	<span class="prev"><a href="javascript:void(0);">&larr;</a></span>' +
			'	<span class="next"><a href="javascript:void(0);">&rarr;</a></span>' +
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

			function dateToTag(d) {
				var tag = $('<td><a href="javascript:void(0);"></a></td>');
				var a = tag.find('a');
				a.text(d.getDate());
				a.attr('data-date', dateToStr(d));
				if (date.getMonth() != d.getMonth()) { // the bounday month
					tag.addClass('off');
				} else if (active && date.getDate() == d.getDate()) { // the select day
					tag.addClass('active');
					_this.attr('data-date', dateToStr(d));
				}
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
			return _this.attr('data-date');
		}

		_this.init();
		_this.update(opts.date? opts.date: new Date(), true);

		/* event binding */
		_this.delegate('tbody td', 'click', function () {
			_this.find('.active').removeClass('active');
			$(this).addClass('active');
			_this.attr('data-date', $(this).find('a').attr('data-date'));
		});

		function updateTable(monthOffset) {
			var date = strToDate(_this.find('.month').text());
			date.setMonth(date.getMonth() + monthOffset);
			_this.update(date);
		};

		_this.find('.next').click(function () {
			updateTable(1);

		});

		_this.find('.prev').click(function () {
			updateTable(-1);
		});

		return this;
	};

	$.fn.calendar.defaults = {
		date: new Date(),
	};

	$.fn.datePicker = function () {
		var _this = this;
		var picker = $('<div></div>')
			.addClass('picker-container')
			.css('display', 'none')
			.calendar({'date': strToDate(_this.val())});

		_this.after(picker);

		/* event binding */
		// click outside area, make calendar disappear
		$('body').click(function () {
			picker.css('display', 'none');
		});

		// click input should make calendar appear
		_this.click(function () {
			picker.css('display', '');
			return false; // stop sending event to docment
		});

		// click on calender, update input
		picker.click(function () {
			_this.val(picker.getCurrentDate());
			/* date-picker should disappear, so return true */
			return true;
		});

		return this;
	};

	$(window).load(function () {
		$('.jquery-calendar').each(function () {
			$(this).calendar();
		});
		$('.date-picker:text').each(function () {
			$(this).datePicker();
		});
	});
}($));
