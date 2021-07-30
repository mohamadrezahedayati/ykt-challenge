<template>
  <div class="headers grid">
    <HeaderItem
      textProperty="modifierName"
      :class="sortedClass('name')"
      @click.native="sortBy('name')"
    />
    <HeaderItem
      textProperty="date"
      :class="sortedClass('date')"
      @click.native="sortBy('date')"
    />
    <HeaderItem
      textProperty="adName"
      :class="sortedClass('title')"
      @click.native="sortBy('title')"
    />
    <HeaderItem
      textProperty="field"
      :class="sortedClass('field')"
      @click.native="sortBy('field')"
    />
    <HeaderItem
      textProperty="oldValue"
      :class="sortedClass('old_value')"
      @click.native="sortBy('old_value')"
    />
    <HeaderItem
      textProperty="newValue"
      :class="sortedClass('new_value')"
      @click.native="sortBy('new_value')"
    />
  </div>
</template>

<script>
import HeaderItem from "./HeaderItem/HeaderItem.vue";
export default {
  components: {
    HeaderItem,
  },
  data() {
    return {
      sort: {
        col: "",
        isAsc: false,
      },
    };
  },
  computed: {
    getCurrentQueriesFromRoute() {
      return this.$route.query;
    },
  },
  created() {
    this.initialValueSorts();
  },
  methods: {
    sortedClass(col) {
      const isSorted = this.sort.col === col;
      return isSorted ? `sorted ${this.sort.isAsc ? "asc" : "desc"}` : null;
    },
    sortBy(col) {
      const isSorted = this.sort.col === col;
      this.sort.isAsc = isSorted ? !this.sort.isAsc : false;
      this.sort.col = col;
      this.$router.push({
        query: Object.assign({}, this.getCurrentQueriesFromRoute, {
          col: col,
          isAsc: this.sort.isAsc,
        }),
      });
    },
    initialValueSorts() {
      const { col, isAsc } = this.getCurrentQueriesFromRoute;
      if (col) this.sort.col = col;
      if (isAsc !== undefined) this.sort.isAsc = JSON.parse(isAsc);
      this.$emit("getSorted", this.sort);
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  direction: rtl;
  text-align: center;
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr 2fr 1fr 2fr 3fr;
  border-top: 1px solid black;
  border-right: 1px solid black;
  position: relative;
}

.sorted {
  &.asc::after {
    display: inline-block;
    content: "▼";
  }
  &.desc::after {
    display: inline-block;
    content: "▲";
  }
}
</style>
