<template>
    <div class="table">
        <div class="table__headers">
            <div class="table__headers-box" v-for="(item, index) in $props.headers" :key="index">
                <p v-if="!item.sortable" class="table__headers-content">{{item.text}}</p>
                <button v-else :class="'table__headers-sort' + getSortBoxClassName(item)" @click="() => changeSort(item)">
                    <p class="table__headers-sort-content">{{item.text}}</p>
                    <img class="table__headers-sort-icon" src="~/assets/icons/arrow.svg" alt="search icon">
                </button>
            </div>
        </div>
        <div class="table__content">
            <div class="table__row" v-for="(item, itemIndex) in getSorted" :key="itemIndex">
                <div class="table__row-item" v-for="(header, headerIndex) in $props.headers" :key="headerIndex">
                    <p class="table__mobile-hint">{{header.text}}</p>
                    <component v-bind:is="getItemValueRenderer(item, header.value)" v-bind="getItemValueData(item, header.value)"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      headers: {
        type: Array,
        default: [],
        validator: function (value) {
          return value.some(header => {
            return ['text', 'value'].filter(prop => prop in header).length === 2
          })
        }
      },
      items: {
        type: Array,
        default: [],
      }
    },
    computed: {
      getSorted() {
        const sorted = this.$props.items.sort(this.sortFunction);
        return this.sortStatus !== null && !this.sortStatus ? sorted.reverse() : sorted
      }
    },
    data() {
      return {
        sortKey: null,
        sortFunction: () => {},
        sortStatus: null
      }
    },
    methods: {
      getItemValueRenderer(item, key) {
        try {
          return item[key].component
        } catch (e) {
          return null
        }
      },
      getItemValueData(item, key) {
        try {
          return item[key].props
        } catch (e) {
          return {}
        }
      },
      changeSort(header) {
        this.sortKey = header.value;
        this.sortFunction = header.sort;
        this.sortStatus = !this.sortStatus;
      },
      getSortBoxClassName(item) {
        return ' ' + [
          this.sortKey === item.value && this.sortStatus ? 'up' : 'down',
          this.sortKey === item.value ? 'active' : 'disable'
        ].join(' ');
      }
    },
  };
</script>
