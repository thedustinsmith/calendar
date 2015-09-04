// (function (global) {
//   global.monthModel = Backbone.Model.extend({
//     initialize: function (o) {
//       this.set('month', o.month);
//       this.set('year', o.year);
//     }
//   });
// })(app.models);

(function (global) {
    var monthView = Backbone.View.extend({
        template: $('#month-template').html(),
        weekTemplate: $('#week-template').html(),
        
        renderWeek: function (w, pre) {
            log('rendering', w);
            var day = moment().week(w).day(0), //first day of week
                ix = 0,
                days = [],
                self = this,
                thisDay = day,
                renderDays,
                html = '',
                scrollSave;
            while (ix < 7) {
                days.push(moment(day));
                day.add(1, 'days');
                ix++;
            }
            
            renderDays = days.map(function (d) {
                return {
                    Num: d.date()
                };
            });
            
            if ((days[0].month() !== days[6].month()) || (days[0].date() === 1)) {
                html += '<div class="month" data-month="' + days[0].month() + '">' + days[6].format('MMMM YYYY') + '</div>';
            }
            html += Mustache.render(self.weekTemplate, {
                Days: renderDays,
                Week: w
            });
            
            scrollSave = self.$el.scrollTop();
            if (pre) {
                self.$el.prepend(html);
            }
            else {
                self.$el.append(html);
            }
            self.$el.scrollTop(scrollSave);
        }, 
        
        renderInitial: function () {
            var firstWeekOfMonth = this.firstDayOfMonth.week(),
                firstMonth = this.firstDayOfMonth.month(),
                firstWeek = firstWeekOfMonth - 5,
                weekRange = 16,
                lastWeek = firstWeek + weekRange,
                self = this,
                monthEl,
                weekEl;
            
            if (self.hasBeenRendered) {
                throw 'Trying to renderInitial twice';
            }
            self.hasBeenRendered = true;
            
            for (var i = firstWeek; i < lastWeek; i++) {
                self.renderWeek(i);
            }
            
            monthEl = self.$('.month[data-month="' + firstMonth + '"]');
            weekEl = self.$('.week:first');
            self.weekHeight = weekEl.height();
            self.firstWeek = firstWeek;
            self.lastWeek = firstWeek + weekRange;
            self.$el.scrollTop(parseInt(monthEl.position().top, 10));
        },
        
        onScroll: function () {
            var scroll = this.$el.scrollTop(),
                self = this,
                thresh = (this.weekHeight * 5);
            
            
            
            if (scroll < thresh) {
                self.firstWeek -= 1;
                self.renderWeek(self.firstWeek, true);
            }
            else if ((scroll + self.$el.height()) > (self.$el[0].scrollHeight - thresh)) {
                self.lastWeek += 1;
                self.renderWeek(self.lastWeek);
            }
        },
        
        initialize: function (o) {
            this.currentDay = moment();
            this.firstDayOfMonth = this.currentDay.clone().date(1);
            this.week = this.currentDay.clone().week();
            
            this.renderInitial();
            this.$el.on('scroll', _.throttle(_.bind(this.onScroll, this), 25));
        }
    
    });
    
    global.monthView = monthView;
})(app);

(function (global) {
    var cal = $('#calendar');
    var View = new global.monthView({
        el: cal
    });
})(app);