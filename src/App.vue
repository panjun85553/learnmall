<template>
  <div id="app" class="g-container">
    <div class="g-view-container">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
    <div class="g-footer-container">
      <ctabber/>
    </div>
  </div>
</template>

<script>
  import Ctabber from 'components/tabber/index';

  export default {
    name: 'App',
    components: {
      Ctabber
    }
  };
</script>
