<template>
  <span>
    <b-icon-clock/>&nbsp;
    <span v-b-tooltip:top="absoluteTime">{{ relativeTime }}</span>
  </span>
</template>

<script>
  import moment from 'moment';

  export default {
    data() {
      return {
      }
    },
    props: ['ts'],
    computed: {
      absoluteTime() {
        return moment(this.ts * 1000).format('YYYY-MM-DD hh:mm:ss')
      },
      relativeTime() {
        return moment(this.ts * 1000).fromNow()
      },
    },
  }
</script>
