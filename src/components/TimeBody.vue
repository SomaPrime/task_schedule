<template>
  <draggable v-model="date_list" class="timebody" :group="{ name: 'timeGroupParent', put: false }" :options="parentOptions">
    <div class="timeContainer" v-for="element in date_list" :key="element.id">
        <p class="time">{{element.time}}</p>
        <div class="timelines">
            <div v-bind:class="['min30']">
                <draggable v-model="element.itemList" class="center" group="timeGroup" @start="drag=true" @end="drag=false" :options="options">
                        <mdb-dropdown tag="li" style="display: table-cell" class="nav-item" v-for="(item, index) in element.itemList" :key="item.id">
                            <mdb-dropdown-toggle dark color="primary" slot="toggle" class="item white-text" waves-fixed>{{item.id}}</mdb-dropdown-toggle>
                            <mdb-dropdown-menu>
                                <mdb-dropdown-item @click.prevent="deleteItem(index, element)">Delete</mdb-dropdown-item>
                            </mdb-dropdown-menu>
                        </mdb-dropdown>
                </draggable>
            </div>
        </div>
    </div>
  </draggable>
</template>
<script>
// @ is an alias to /src
// ex: import ComponentName from '@/components/file.name'
import draggable from 'vuedraggable'
import { mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, } from 'mdbvue'
export default {
  name: 'schedule',
  components: {
    draggable,
    mdbDropdown, 
    mdbDropdownToggle, 
    mdbDropdownMenu, 
    mdbDropdownItem
  },
  props: {
      "date_list": Object
  },
  data () {
    return {
        options: {
            group: "timeGroup",
            animation: 0
        },
        parentOptions: {
            group: "timeGroupParent",
            animation: 0,
            disabled: true
        }
    }
  },
  methods: { 
      deleteItem: function(index, element) {
          let target_element_index = this.date_list.indexOf(element);
          this.date_list[target_element_index].itemList.splice(index, 1);
      }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
.timebody{
    display: inline-block;
    height: 100%;
    width: 15%;
    margin-right: 1%;
}
.timeContainer{
    height: 35px;
}
.timelines{
    height: 35px;
    width: 80%;
    border-bottom: 1px dashed #000000;
    display: inline-block;
}
.time{
    display: inline-block;
    margin-right: 3%;
    font-size: 10px;
    width: 10%
}
.min30{
    height: 34px;
    margin-bottom: 1px;
    display: inline-block;
    width: 100%
}
.center {
    display: table;
    margin: 0 auto;
    height: 100%;
    width: 95%;
}
</style>