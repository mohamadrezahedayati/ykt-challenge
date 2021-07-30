<template>
  <div class="container-header-item">
    {{ getTitles[textProperty] }}
  </div>
</template>

<script>
import resource from "/resource.json";
export default {
  props: {
    textProperty: {
      type: String,
      default: "",
    },
  },
  computed: {
    getTitles() {
      return resource;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-header-item {
  padding: 8px 4px;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
}
</style>