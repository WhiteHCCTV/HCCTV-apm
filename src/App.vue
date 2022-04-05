<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

 /* Theme (https://github.c om/thomaspark/bootswatch/) */
  @import '~bootswatch/dist/flatly/_variables.scss';

  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';

  @import '~bootswatch/dist/flatly/_bootswatch.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

.code-box {
  padding: 1em;
  font-family: consolas, monospace, sans-serif;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.right-col { text-align: right; }

.text-double-size { font-size: 1.6em; }
.text-mid-size { font-size: 1.3em; }

</style>
