<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view :manage="manage"></router-view>
    </transition>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'AppMain',
    computed: {
      ...mapGetters({
        tokenList: 'tokenList',
      })
    },
    data() {
      return {
        manage: {},
      }
    },
    created() {
      const us = window.localStorage.getItem('user');
      if (us) {
        this.manage = JSON.parse(us);
      }
    }
  }
</script>
