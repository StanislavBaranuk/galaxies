<template>
    <div class="container">
        <header class="header">
            <p class="header__title">Named galaxies</p>
            <div class="search">
                <img class="search__icon" src="~/assets/icons/search.svg" alt="search icon">
                <input v-model="search" placeholder="Search galaxies" type="text" class="search__input">
            </div>
        </header>
        <Table
            :headers="headers"
            :items="getFilteredList"
        />
    </div>

</template>

<script>
  import Table from '~/components/Table';
  import CellName from '~/components/cels/CellName';
  import CellText from '~/components/cels/CellText';

  export default {
    name: 'App',
    components: {
      Table,
    },
    data() {
      return {
        search: '',
        headers: [
          {
            text: 'Galaxy Name',
            value: 'name',
            sortable: true,
            sort: (a, b) => {
              return a.name.props.text > b.name.props.text ? -1 : 1
            }
          },
          {
            text: 'Constellation',
            value: 'constellation',
          },
          {
            text: 'Origin of name',
            value: 'originOfName',
          },
        ],
        galaxies: []
      };
    },
    async asyncData({params, $http}) {
      const serverGalaxies = await $http.$get(`${process.env.baseUrl}/galaxies`).then((response) => {
        return response.map(item => ({
          id: item.id,
          name: {
            props: {
              image: item.img,
              text: item.name,
            },
          },
          constellation: {
            props: {
              text: item.constellation,
            },
          },
          originOfName: {
            props: {
              text: item.originOfName,
            },
          },
        }));
      });
      return {serverGalaxies};
    },
    computed: {
      getFilteredList() {
        return this.galaxies.filter((item) => {
          return this.search.length === 0 || item.name.props.text.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        });
      }
    },
    mounted() {
      this.serverGalaxies.map(item => {
        item.name.component = CellName;
        item.constellation.component = CellText;
        item.originOfName.component = CellText;
        this.galaxies.push(item);
      });
    }
  };
</script>
