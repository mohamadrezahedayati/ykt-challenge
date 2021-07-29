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
        >
      </div>
      <div>
        <label for="">
          {{ getTitles.date }}
        </label>
        <input type="text" v-model="dateQuery">
      </div>
      <div>
        <label for="">
          {{ getTitles.adName }}
        </label>
        <input type="text" v-model="adNameQuery">
      </div>
      <div>
        <label for="">
          {{ getTitles.field }}
        </label>
        <input type="text" v-model="fieldQuery">
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
          <div class="grid">
            <div class="table-cell">{{ item.name }}</div>
            <div class="table-cell">{{ item.date }}</div>
            <div class="table-cell">{{ item.title }}</div>
            <div class="table-cell">{{ item.field }}</div>
            <div class="table-cell">{{ item.old_value }}</div>
            <div class="table-cell">{{ item.new_value }}</div>
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
      dataList: data,
      sort: {
        key: "",
        isAsc: false,
      },
      modifierNameQuery: "",
      dateQuery: "",
      fieldQuery: "",
      adNameQuery: "",
    };
  },
  computed: {
    getChangesList() {
      const list = this.dataList.slice();
      if (this.sort.key) {
        list.sort((a, b) => {
          a = a[this.sort.key];
          b = b[this.sort.key];
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }
      return list.filter((item) => {
        return item
          ? item.name.toLowerCase().includes(this.modifierNameQuery.toLowerCase()) &&
            item.date.toLowerCase().includes(this.dateQuery.toLowerCase()) &&
            item.title.toLowerCase().includes(this.adNameQuery.toLowerCase()) &&
            item.field.toLowerCase().includes(this.fieldQuery.toLowerCase())
          : null;
      });
    },
    getTitles() {
      return resource;
    },
  },
  methods: {
    sortedClass(key) {
      const isSorted = this.sort.key === key;
      return isSorted ? `sorted ${this.sort.isAsc ? "asc" : "desc"}` : null;
    },
    sortBy(key) {
      const isSorted = this.sort.key === key;
      this.sort.isAsc = isSorted ? !this.sort.isAsc : false;
      this.sort.key = key;
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
</style>
