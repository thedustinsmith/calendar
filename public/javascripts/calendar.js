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
      var day = moment().day(0).week(w), //first day of week
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
        html += '<div class="month">' + days[6].format('MMMM YYYY') + '</div>';
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
          firstWeek = firstWeekOfMonth - 1,
          weekRange = 6,
          lastWeek = firstWeek + weekRange,
          self = this,
          monthEl,
          weekEl;
      for (var i = firstWeek; i < lastWeek; i++) {
        this.renderWeek(i);
      }
      //var el = this.$container.find('[data-week="' + firstWeekOfMonth + '"]');
      monthEl = this.$('.month:first');
      weekEl = this.$('.week:first');
      self.weekHeight = weekEl.height();
      self.firstWeek = firstWeek;
      console.log(monthEl.position().top, monthEl);
      this.$el.scrollTop(parseInt(monthEl.position().top, 10));
    },
    
    onScroll: function () {
      var scroll = this.$el.scrollTop(),
          self = this;
      if (scroll < this.weekHeight) {
        self.firstWeek -= 1;
        self.renderWeek(self.firstWeek, true);
      }
      console.log(this.$el.scrollTop(), this.weekHeight);
    
    },
    
    initialize: function (o) {
      this.currentDay = moment();
      this.firstDayOfMonth = this.currentDay.clone().date(1);
      this.week = this.currentDay.clone().week();
      //this.render();
      this.renderInitial();
      this.$el.on('scroll', _.throttle(_.bind(this.onScroll, this), 100));
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