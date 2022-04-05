<template>
  <b-row class="text-center">
    <b-col>
      <span class="display-4">{{ summary.partitions }}</span>
      <div><router-link to="/home/partitions" class="text-reset">Models</router-link></div>
    </b-col>
    <b-col>
      <div class="display-4">{{ summary.objects }}</div>
      <div><router-link to="/home/objects" class="text-reset">Clients</router-link></div>
    </b-col>
  </b-row>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        summary: {},
      }
    },
    created() {
      var vm = this;

      axios.get('/ui/api/sys/summary')
        .then(function(resp) {
          vm.summary = resp.data.summary;
        })
        .catch(function(err) {
          vm.$emit('error', err);
          vm.summary = err.response.data.summary;
        })
    },
  }
</script>
