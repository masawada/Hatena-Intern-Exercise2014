(function() {

  'use strict';

  // filters
  var filters = {
    'all': function() {
      return function() {
        return true;
      };
    },
    'path': function(data) {
      return function(record) {
        return record.path.indexOf(data) !== -1;
      };
    },
    'lte_reqtime': function(data) {
      return function(record) {
        return Number(data) <= record.reqtime_microsec;
      };
    },
    'gte_reqtime': function(data) {
      return function(record) {
        return Number(data) >= record.reqtime_microsec;
      };
    },
  };

  // main
  var app = new Vue({
    el: '#app',
    data: {
      raw_records: '',
      records: [],
      filterType: [
        {type: 'all', label: 'All'},
        {type: 'path', label: 'Path'},
        {type: 'lte_reqtime', label: '<= Req Time'},
        {type: 'gte_reqtime', label: '>= Req Time'}
      ],
      currentFilterType: {type: 'all', label: 'All'},
      tabs: [
        {id: '#input-tab', label: 'Input', isActive: true},
        {id: '#search-tab', label: 'Search', isActive: false}
      ],
      filter_data: ''
    },
    ready: function () {
      // set default data
      this.$set('raw_records',
                'path:/	reqtime_microsec:123456\n'+
                'path:/uname	reqtime_microsec:500000\n'+
                'path:/help	reqtime_microsec:234222\n'+
                'path:/	reqtime_microsec:94843\n');
      this.reloadRecords();
    },
    filters: {
      filterRecords: function (records) {
        return records.filter(filters[this.currentFilterType.type](this.$get('filter_data')));
      }
    },
    methods: {
      selectTab: function (target) {
        this.$get('tabs').forEach(function (tab) {
          document.querySelector(tab.id).classList.remove('current');
          tab.isActive = false;
        });
        document.querySelector(target.$data.id).classList.add('current');
        target.$data.isActive = true;
      },
      selectFilter: function (target) {
        this.$set('currentFilterType', target.$data);
      },
      reloadRecords: function() {
        var records = parseLTSVLog(this.$get('raw_records'));
        this.$set('records', records);
      }
    }
  });

  app.filters = filters;
})();
