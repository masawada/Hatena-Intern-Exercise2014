(function() {

  'use strict';

  // main
  var app = new Vue({
    el: '#app',
    data: {
      raw_records: '',
      records: [],
      filterType: [
        {type: 'all', label: 'All'},
        {type: 'path', label: 'Path'},
        {type: 'lt_microsec', label: '<= Req Time'},
        {type: 'gt_microsec', label: '>= Req Time'}
      ],
      currentFilterType: {type: 'all', label: 'All'},
      tabs: [
        {id: '#input-tab', label: 'Input', isActive: true},
        {id: '#search-tab', label: 'Search', isActive: false}
      ]
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
})();
