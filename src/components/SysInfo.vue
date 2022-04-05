<template>
  <b-table-simple small borderless class="mb-0">
    <b-tbody>
      <b-tr> <b-td>Version</b-td> <b-td>{{ info.version }}</b-td> </b-tr>
      <b-tr> <b-td>State</b-td> <b-td>{{ info.state }}</b-td> </b-tr>
      <b-tr> <b-td>Hostname</b-td> <b-td>{{ info.hostname }}</b-td> </b-tr>
      <b-tr> <b-td>Host IP</b-td> <b-td>{{ info.hostip }}</b-td> </b-tr>
      <b-tr>
        <b-td>License</b-td>
        <b-td>
          MIT
          <router-link to="/home/settings"><b-icon-gear/></router-link>
        </b-td>
      </b-tr>
      </b-tbody>
    </b-table-simple>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        info: {},
      }
    },
    props: ['error'],
    computed: {
      licenseDate() {
        var valid = this.info.valid_until // unix timestamp
        if (valid && valid != 0) {
          var d = new Date(valid * 1000);
          return "valid until " + d.toLocaleDateString();
        } else {
          return "not set"
        }
      }
    },
    mounted() {
      var vm = this;
      axios.get('/ui/api/sys/info')
        .then(function(resp) {
          if (resp.data.error) {
            vm.error = resp.data.error;
          } else {
            vm.info = resp.data.info;
          }
        })
        .catch(function(err) {
          vm.$emit('error', err);
        })
    },
  }
</script>
