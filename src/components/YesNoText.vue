<template>
  <span v-if="ok" :class="{ 'text-success': !nocolor }">
    <b-icon-check-circle v-if="!noicon"/> {{ yes }}
  </span>
  <span v-else="!ok" :class="{ 'text-danger': !nocolor }">
    <b-icon-exclamation-circle v-if="!noicon"/> {{ no }}
  </span>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      yn: [String, Boolean],
      yes: [String, Object],
      no: [String, Object],
      nocolor: Boolean,
      noicon: Boolean,
    },
    computed: {
      ok() {
        var x = this.yn;
        if (typeof x === 'string') {
          if (x == 'true') return true;
          else return false;
        } else {
          return x;
        }
      },
    },
  }
</script>

<style>
.yesno-yes {
  color: darkgreen
}
.yesno-no {
  color: red
}
</style>
