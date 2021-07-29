<template>
  <div>
    <div>
      <label for="">
        {{ getTitles.modifierName }}
      </label>
      <input type="text">
    </div>
    <div>
      <label for="">
        {{ getTitles.date }}
      </label>
      <input type="text">
    </div>
    <div>
      <label for="">
        {{ getTitles.adName }}
      </label>
      <input type="text">
    </div>
    <div>
      <label for="">
        {{ getTitles.field }}
      </label>
      <input type="text">
    </div>
  </div>
</template>

<script>
import resource from "/resource.json";
export default {
  computed: {
    getTitles() {
      return resource;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>