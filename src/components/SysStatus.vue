<template>
  <b-table-simple small borderless class="mb-0">
    <b-tbody>
      <b-tr>
        <b-td>Database</b-td>
        <b-td><yes-no-text :yn="health.database" yes="OK" no="Down"/></b-td>
      </b-tr>
      <b-tr>
        <b-td>Echo Server</b-td>
        <b-td><yes-no-text :yn="health.server" yes="OK" no="Down"/></b-td>
      </b-tr>
      <b-tr>
        <b-td>Aggregation</b-td>
        <b-td><yes-no-text :yn="health.aggregation" yes="OK" no="Down"/></b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
  import axios from 'axios';
  import YesNoText from '@/components/YesNoText.vue'

  export default {
    data() {
      return {
        health: {},
      }
    },
    props: ['error'],
    components: {
      YesNoText,
    },
    mounted() {
      var vm = this;
      axios.get('/ui/api/healthz')
        .then(function(resp) {          
          vm.health = resp.data.info;
        })
        .catch(function(err) {
          vm.health = err.response.data.info;
        })
    },
  }
</script>
