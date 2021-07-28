<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <ChangesList />
  </div>
</template>

<script>
import ChangesList from '@/pages/ChangesList.vue'
export default {
  name: 'App',
  components:{
    ChangesList
  }
}
</script>

<style>

</style>
