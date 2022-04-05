<template>
  <div class="" style="height: 23em; overflow: scroll; overflow-x: hidden">
    <div v-show="logs.length == 0" style="color: gray; text-align: center">
      No logs
    </div>
    <div  v-for="log,key in logs" :key="key">
      <hr class="mt-2 mb-2"/>
      <b-row>
        <b-col sm="6" md="3">
          <small><time-text :ts="log.ts"/></small>
        </b-col>
        <b-col>
          <b-row>
            <b-col sm="12">{{ log.msg }}</b-col>
            <b-col sm="12"><small>{{ log.cmd }}</small></b-col>
          </b-row>
        </b-col>
        <b-col sm="6" md="3" class="right-col">
          <small>
            <div v-if="log.accuracy">
              {{ log.accuracy }}
            </div>
          </small>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  import TimeText from '@/components/TimeText.vue';

  export default {
    data() {
      return {
        logs: [],
        parts: {},
      }
    },
    props: ['error', 'query'],
    components: {
      TimeText,
    },
    methods: {
      absoluteTime(ts) {
        return moment(ts * 1000).format('YYYY-MM-DD hh:mm:ss')
      },
      relativeTime(ts) {
        return moment(ts * 1000).fromNow()
      },
      partName(partId) {
        var part = this.parts[partId];
        if (part) {
          return part.label;
        } else {
          return "";
        }
      },
    },
    mounted() {
      var vm = this;
      axios.get('/ui/api/log/last?' + vm.query)
      .then(function(resp) {
        if (resp.data.error) {
          vm.$emit('error', resp.data.error);
        } else {
          vm.logs = resp.data.logs;
        }
      })
      .catch(function(err) {
        vm.$emit('error', err);
      })
    },
  }
</script>
