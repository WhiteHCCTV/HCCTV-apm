<template>
  <b-container class="index">
    <b-row>
      <b-col>
        <h1>Kangalock Admin</h1>
      </b-col>
    </b-row>
    <b-row>
      <!--
      <b-col>
        <div>
          <router-link to="/home">
            <b-icon-house/>
            <span class="index-menu-item"> Home</span>
          </router-link>
        </div>
        <div>
          <router-link to="/">
            <b-icon-gear/>
            <span class="index-menu-item"> Setup</span>
          </router-link>
        </div>
        <div>
          <router-link to="/">
            <b-icon-info-circle/>
            <span class="index-menu-item"> Info</span>
          </router-link>
        </div>
      </b-col>
      -->
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    created() {
      this.$router.push('/home/dashboard')
    }
  }
</script>

<style>
.index {
  margin-top: 10em;
  text-align: center;
}
.index-menu-item {
  font-size: 1.2em;
}
</style>
