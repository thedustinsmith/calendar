(function (global) {
	var WEEK_RANGE = 8,
        today = moment();
    function isToday(m) {
        return m.year() === today.year()
            && m.month() === today.month()
            && m.date() === today.date();
    }
	var monthView = Backbone.View.extend({

        template: $('#month-template').html(),
        weekTemplate: $('#week-template').html(),
        
		events: {
			'scroll': 'throttledScroll'
		},

        updateCurrentMonth: _.throttle(function() {
            var m = this.getCurrentMonth();
            this.$('[data-day-month!="' + m.month() + '"].current-month').removeClass('current-month');
            this.$('[data-day-month="' + m.month() + '"]').addClass('current-month');
            this.setMonthHeader(m)
        }, 1500),

		throttledScroll: _.throttle(function (ev) {
			var self = this,
				scroll = self.$el.scrollTop(),
                thresh = (self.weekHeight * 2),
                elHeight = self.$el.height(),
                elScrollHeight = self.$el[0].scrollHeight,
                delta = self.oldScroll - scroll,
                isDown = delta < 0;
            
            if ((scroll < thresh) && !isDown) {
                self.week -= 1;
                self.prependWeek(self.week);
                self.removeWeek(self.week + WEEK_RANGE + 1);
                self.$el.scrollTop(scroll + self.weekHeight);
            }
            else if (isDown && ((scroll + elHeight) > (elScrollHeight - thresh))) {
                self.week += 1;
                self.appendWeek(self.week + WEEK_RANGE);
                self.removeWeek(self.week - 1);
                self.$el.scrollTop(scroll - self.weekHeight);
            }
            self.oldScroll = self.$el.scrollTop();
            self.updateCurrentMonth();
		}, 20),

        getCurrentMonth: function () {
            var self = this,
                months = self.$('[data-day-month]').map(function (ix, d) { return $(d).data('day-month'); }).toArray(),
                monthGrouped = _.sortBy(_.groupBy(months),function (v) { return -1 * v.length; })[0][0];

            var m = parseInt(monthGrouped, 10),
                month = self.today.week(self.week).month(m);
            return month;
        },

		removeWeek: function (w) {
			var $w = this.$week(w),
				$n = $w.next(),
				$p = $w.prev();

			if($n.is('.month')) {
				$n.remove();
			}
			if($p.is('.month')) {
				$p.remove();
			}
			$w.remove();
		},

		getWeekHtml: function (w) {
			var self = this,
				firstDayOfWeek = moment().week(w).day(0),
				days = [],
				html = '',
				dayRenderData;

			for (var i =0; i< 7; i++) {
				days.push(firstDayOfWeek.clone().add(i, 'days'))
			}
			dayRenderData = days.map(function (d) {
				return {
					Num: d.date(),
                    Month: d.month(),
                    IsToday: isToday(d)
				};
			});

            html += Mustache.render(self.weekTemplate, {
                Days: dayRenderData,
                Week: w
            });
            return html;
		},

		appendWeek: function (w) {
			this.$calBody.append(this.getWeekHtml(w));
		},

		prependWeek: function (w) {
			this.$calBody.prepend(this.getWeekHtml(w));
		},

		$week: function (w) {
			return this.$('[data-week="' + w + '"]');
		},

		// $month: function (m) {
		// 	return this.$('[data-month="' + m + '"]');
		// },

        setMonthHeader: function (m) {
            this.$calMonth.html(m.format('MMMM YYYY'));
        },

		renderInitial: function () {
			var self = this;
            self.$calMonth = self.$('.cal-header .cal-month');
			for (var i = 0; i < WEEK_RANGE; i++) {
				self.appendWeek(self.week + i);
			}

			self.weekHeight = self.$week(self.week).height();
			self.$el.scrollTop(self.$week(self.firstDayOfMonth.week()).position().top);
			self.oldScroll = self.$el.scrollTop();
		},

		initialize: function (o) {
			var self = this;
            self.$calBody = self.$('.cal-body');
			self.today = moment();
			self.firstDayOfMonth = self.today.clone().date(1);
			self.firstWeekOfMonth = self.firstDayOfMonth.week();
			self.week = self.firstWeekOfMonth - 2;
			self.renderInitial();
            self.updateCurrentMonth();
		}
	});

	global.monthView2 = monthView;
})(app);

(function (global) {
    var cal = $('#calendar');
    // var View = new global.monthView({
    //     el: cal
    // });
	var View = new global.monthView2({
        el: cal
    });
})(app);