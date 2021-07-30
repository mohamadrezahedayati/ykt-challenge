<template>
  <div>
    <div class="container-filters">
      <BaseInput
        class="filter-item"
        :label="getTitles.modifierName"
        v-model="modifierNameQuery"
        @input="addQueryToRoute({'name':modifierNameQuery})"
      />
      <BaseInput
        class="filter-item"
        :label="getTitles.date"
        v-model="dateQuery"
        @input="addQueryToRoute({'date':dateQuery})"
      />
      <BaseInput
        class="filter-item"
        :label="getTitles.adName"
        v-model="adNameQuery"
        @input="addQueryToRoute({'title':adNameQuery})"
      />
      <BaseInput
        class="filter-item"
        :label="getTitles.field"
        v-model="fieldQuery"
        @input="addQueryToRoute({'field':fieldQuery})"
      />
    </div>
    <Headers @getSorted="setSorted"/>
    <DynamicScroller
      :items="getChangesList"
      :min-item-size="30"
      page-mode
      class="scroller"
    >
      <template v-slot="{ item, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
        >
          <div
            class="list-item"
            @click="addStarToLine(item)"
          >
            <div class="table-cell">{{ item.name }}</div>
            <div class="table-cell">{{ item.date }}</div>
            <div class="table-cell">{{ item.title }}</div>
            <div class="table-cell">{{ item.field }}</div>
            <div class="table-cell">{{ item.old_value }}</div>
            <div class="table-cell">{{ item.new_value }}</div>
            <div
              class="star"
              v-if="item.hasStar"
            >
              <img
                src="@/assets/icon-star.png"
                alt="icon-star"
                title="icon-star"
              >
            </div>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script>
import data from "/data.json";
import Headers from "./Headers/Headers.vue";
import resource from "/resource.json";
import BaseInput from "@/components/Base/BaseInput.vue";

export default {
  components: {
    Headers,
    BaseInput,
  },
  data() {
    return {
      list: data,
      sort: {},
      modifierNameQuery: "",
      dateQuery: "",
      fieldQuery: "",
      adNameQuery: "",
      starredItems: JSON.parse(localStorage.getItem("starredItems")) ? new Set([...JSON.parse(localStorage.getItem("starredItems"))]) : new Set(),
    };
  },
  computed: {
    getChangesList() {
      const sortedList = this.getSortedList();
      const filteredAndSortedList = this.getFilteredList(sortedList);
      return filteredAndSortedList;
    },
    getTitles() {
      return resource;
    },
    getCurrentQueriesFromRoute() {
      return this.$route.query;
    },
  },
  created() {
    this.initialValueFilters();
    this.showStarredItems();
  },
  methods: {
    getSortedList() {
      const list = this.list.slice();
      if (this.sort.col) {
        list.sort((a, b) => {
          a = a[this.sort.col];
          b = b[this.sort.col];
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }
      return list;
    },
    getFilteredList(list) {
      return list.filter((item) => {
        return item
          ? item.name.toLowerCase().includes(this.modifierNameQuery.toLowerCase()) &&
              item.date.toLowerCase().includes(this.dateQuery.toLowerCase()) &&
              item.title.toLowerCase().includes(this.adNameQuery.toLowerCase()) &&
              item.field.toLowerCase().includes(this.fieldQuery.toLowerCase())
          : null;
      });
    },
    addQueryToRoute(newQuery) {
      this.$router.push({
        query: Object.assign({}, this.getCurrentQueriesFromRoute, newQuery),
      });
    },
    initialValueFilters() {
      const { date, name, title, field } = this.getCurrentQueriesFromRoute;
      if (date) this.dateQuery = date;
      if (name) this.modifierNameQuery = name;
      if (title) this.adNameQuery = title;
      if (field) this.fieldQuery = field;
    },
    addStarToLine(item) {
      item.hasStar = true;
      this.starredItems.add(item.id);
      localStorage.setItem(
        "starredItems",
        JSON.stringify([...this.starredItems])
      );
    },
    showStarredItems() {
      const starredIdsList = JSON.parse(localStorage.getItem("starredItems"));
      starredIdsList?.forEach((id) => {
        const item = this.list.find((item) => item.id == id);
        item.hasStar = true;
      });
    },
    setSorted(sort){
      this.sort =sort
    }
  },
};
</script>

<style lang="scss" scoped>
.container-filters {
  display: grid;
  direction: rtl;
  padding: 1rem 0.25rem;
  column-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  .filter-item {
    display: flex;
    flex-direction: column;
  }
}

.list-item {
    direction: rtl;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 2fr 1fr 2fr 3fr;
    border-top: 1px solid black;
    border-right: 1px solid black;
    position: relative;
  .table-cell {
    padding: 8px 4px;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    word-break: break-word;
  }
}

.star {
  position: absolute;
  top: 7px;
  left: 0;
  width: 20px;
  height: 20px;
  display: flex;
}
</style>
