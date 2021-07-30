<template>
  <div>
    <div>
      <div>
        <label for="">
          {{ getTitles.modifierName }}
        </label>
        <input
          type="text"
          v-model="modifierNameQuery"
          @input="addQueryToRoute({'name':modifierNameQuery})"
        >
      </div>
      <div>
        <label for="">
          {{ getTitles.date }}
        </label>
        <input
          type="text"
          v-model="dateQuery"
          @input="addQueryToRoute({'date':dateQuery})"
        >
      </div>
      <div>
        <label for="">
          {{ getTitles.adName }}
        </label>
        <input
          type="text"
          v-model="adNameQuery"
          @input="addQueryToRoute({'title':adNameQuery})"
        >
      </div>
      <div>
        <label for="">
          {{ getTitles.field }}
        </label>
        <input
          type="text"
          v-model="fieldQuery"
          @input="addQueryToRoute({'field':fieldQuery})"
        >
      </div>
    </div>
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
    <DynamicScroller
      :items="getChangesList"
      :min-item-size="30"
      page-mode
      class="scroller"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="index"
        >
          <div class="grid" @click="addStarToLine(item)">
            <div class="table-cell">{{ item.name }}</div>
            <div class="table-cell">{{ item.date }}</div>
            <div class="table-cell">{{ item.title }}</div>
            <div class="table-cell">{{ item.field }}</div>
            <div class="table-cell">{{ item.old_value }}</div>
            <div class="table-cell">{{ item.new_value }}</div>
            <div class="star" v-if="item.hasStar">
              <img src="@/assets/icon-star.png" alt="">
            </div>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script>
import data from "/data.json";
import HeaderItem from "./HeaderItem/HeaderItem.vue";
import resource from "/resource.json";

export default {
  components: {
    HeaderItem,
  },
  data() {
    return {
      list: data,
      sort: {
        col: "",
        isAsc: false,
      },
      modifierNameQuery: "",
      dateQuery: "",
      fieldQuery: "",
      adNameQuery: "",
      starredItems: JSON.parse(localStorage.getItem("starredItems"))
        ? new Set([...JSON.parse(localStorage.getItem("starredItems"))])
        : new Set(),
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
    this.initialValueSorts();
    this.showStarredItems();
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
          ? item.name
              .toLowerCase()
              .includes(this.modifierNameQuery.toLowerCase()) &&
              item.date.toLowerCase().includes(this.dateQuery.toLowerCase()) &&
              item.title
                .toLowerCase()
                .includes(this.adNameQuery.toLowerCase()) &&
              item.field.toLowerCase().includes(this.fieldQuery.toLowerCase())
          : null;
      });
    },
    addQueryToRoute(newQuery) {
      this.$router.push({
        query: Object.assign({}, this.getCurrentQueriesFromRoute, newQuery),
      });
    },
    initialValueSorts() {
      const { col, isAsc } = this.getCurrentQueriesFromRoute;
      if (col) this.sort.col = col;
      if (isAsc !== undefined) this.sort.isAsc = JSON.parse(isAsc);
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
  },
};
</script>

<style lang="scss" scoped>
.headers {
  background-color: rgb(226, 241, 87);
}

.grid {
  direction: rtl;
  text-align: center;
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr 2fr 1fr 2fr 3fr;
  border-top: 1px solid black;
  border-right: 1px solid black;
  position: relative;
  .table-cell {
    padding: 8px 4px;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
  }
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
.star {
  position: absolute;
  top: 7px;
  left: 0;
  width: 20px;
  height: 20px;
  display: flex;
}
</style>
