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
      currentFilterType: {type: 'all', label: 'All'}
    },
    methods: {
      changeTab: function (e) {
        var key = e.target.innerHTML.toLowerCase();

        document.querySelector('.current').classList.remove('current');
        document.querySelector('.active').classList.remove('active');

        e.target.parentNode.classList.add('active');
        if (key === 'input') {
          document.querySelector('#input-tab').classList.add('current');
        } else if (key === 'search') {
          document.querySelector('#search-tab').classList.add('current');
        }

        return false;
      },
      selectTarget: function (target) {
        this.$set('currentFilterType', target.$data);
      },
      reloadRecords: function() {
        var records = parseLTSVLog(this.$get('raw_records'));
        this.$set('records', records);
      }
    }
  });
})();
