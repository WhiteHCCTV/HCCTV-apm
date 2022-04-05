<template>
  <b-container fluid>
    <b-alert show v-show="error" variant="danger">
      {{ error }}
    </b-alert>

    <b-row>
      <!-- Left column -->
      <b-col sm="12" md="6">
        <b-row>

          <b-col sm="12" class="mb-4">
            <b-card>
              <h5>System metrics</h5>
              <sys-stat-chart/>
            </b-card>
          </b-col>

          <b-col sm="12" class="mb-4">
            <b-card>
              <h5>System info</h5>
              <sys-info :error="error" @error="onError"/>
            </b-card>
          </b-col>

        </b-row>
      </b-col>
      <!-- Right column -->
      <b-col sm="12" md="6">
        <b-row>

          <b-col sm="12" md="6">
            <b-card class="h-100">
              <h5>System status</h5>
              <sys-status :error="error" @error="onError"/>
            </b-card>
          </b-col>
          <b-col sm="12" md="6">
            <b-card class="h-100">
              <h5>Storage summary</h5>
              <storage-summary :error="error" @error="onError"/>
            </b-card>
          </b-col>

          <b-col sm="12" class="mt-4">
            <b-card>
              <h5>Recent events</h5>
              <recent-event query="count=30" :error="error" @error="onError"/>
            </b-card>
          </b-col>

        </b-row>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
  import axios from 'axios';
  import SysStatChart from '@/components/SysStatChart.vue'
  import SysInfo from '@/components/SysInfo.vue'
  import SysStatus from '@/components/SysStatus.vue'
  import StorageSummary from '@/components/StorageSummary.vue'
  import RecentEvent from '@/components/RecentEvent.vue'
  import YesNoText from '@/components/YesNoText.vue'

  export default {
    data() {
      return {
        error: null,
      }
    },
    components: {
      SysStatChart,
      SysInfo,
      SysStatus,
      StorageSummary,
      RecentEvent,
      YesNoText,
    },
    computed: {
    },
    methods: {
      onError(error) {
        this.error = error;
      },
    },
    created() {
      var vm = this;

      axios.get('/ui/api/sys/summary')
        .then(function(resp) {
          vm.summary = resp.data.summary;
        })
        .catch(function(err) {
          console.log(err);
          vm.summary = err.response.data.summary;
        })
    },
  }
</script>

<style>
.chart-container {
  height: 15em;
}

.chart-fill {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
