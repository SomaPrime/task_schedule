<template>
    <mdb-navbar position="top" dark color="primary" scrolling>
      <router-link :to='"/Home/"'>
        <mdb-navbar-brand>Logo</mdb-navbar-brand>
      </router-link>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <router-link :to='"/Schedule/"'>
            <mdb-nav-item waves-fixed>Schedule</mdb-nav-item>
          </router-link>
          <router-link :to='"/TotalResult/"'>
            <mdb-nav-item waves-fixed>TotalResult</mdb-nav-item>
          </router-link>
        </mdb-navbar-nav>
        
        <form @submit.prevent="inputDateSubmit">
          <mdb-input
            type="text"
            class="text-white"
            placeholder="date"
            aria-label="date"
            label
            navInput
            waves
            waves-fixed
            v-model="inputDate"
          />
        </form>
      </mdb-navbar-toggler>
    </mdb-navbar>
</template>
<script>
  import {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbNavbarBrand,
    mdbInput
  } from "mdbvue";
  export default {
    name: "NavigationPage",
    data() {
      return {
          inputDate: ""
      }
    },
    components: {
      mdbNavbar,
      mdbNavItem,
      mdbNavbarNav,
      mdbNavbarToggler,
      mdbNavbarBrand,
      mdbInput
    },
    methods: {
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar .dropdown-menu a:hover {
    color: inherit !important;
  }
</style>