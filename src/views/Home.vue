<template>
  <div class="home">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <img :src="logo" class="mr-1" style="height: 2.5em"/>
      <b-navbar-brand href="#/home/dashboard">HCCTV</b-navbar-brand>

      <!-- right aligned contents from here -->
      <b-navbar-nav class="ml-auto">
      </b-navbar-nav>
    </b-navbar>

    <b-container fluid id="home-container">
      <b-row>
        <b-col sm="2">
          <b-list-group>
            <b-list-group-item><router-link class="text-reset home-nav" to="/home/dashboard">Dashboard</router-link></b-list-group-item>
            <b-list-group-item><router-link class="text-reset home-nav" to="/home/partitions">Models</router-link></b-list-group-item>
            <!-- <b-list-group-item><router-link class="text-reset home-nav" to="/home/objects">Set</router-link></b-list-group-item> -->
            <b-list-group-item><router-link class="text-reset home-nav" to="/home/settings">Settings</router-link></b-list-group-item>
          </b-list-group>
        </b-col>

        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        logo: require('@/assets/logo.png')
      }
    },
  }
</script>

<style>
#home-container {
  margin-top: 1em;
}
.home-nav {
  font-size: 1.2em;
  font-weight: light;
}
</style>
