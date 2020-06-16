<template>
    <div>
        <form @submit.prevent="taskSubmit">
            <mdb-input type="text" size="lg" label="Task" v-model="inputTask" outline />
        </form>
        <draggable class="itemlist" v-model="taskList" :group="{ name: 'timeGroup', pull: 'clone', put: false }" @start="drag=true" @end="drag=false" :options="options">
            <mdb-dropdown tag="li" class="nav-item" v-for="(item, index) in taskList" :key="item.id">
              <mdb-dropdown-toggle dark color="primary" slot="toggle" class="item white-text" waves-fixed>{{item.id}}</mdb-dropdown-toggle>
              <mdb-dropdown-menu>
                <mdb-dropdown-item @click.prevent="deleteItem(index)">Delete</mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown>
        </draggable>
        <div class="trashcontainer">
            <draggable class="trash" :group="{ name: 'timeGroup'}" @start="drag=true" @end="drag=false" :options="options">
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, mdbInput } from "mdbvue";

  export default {
    name: "InputsArea",
    props: {
        taskList: Array,
        inputTask: String
    },
    data () {
        return {
            options: {
                animation: 0
            }
        }
    },
    components: {
      draggable,
      mdbInput,
      mdbDropdown, 
      mdbDropdownToggle, 
      mdbDropdownMenu, 
      mdbDropdownItem
    },
    methods: {
      taskSubmit: function () {
        this.taskList.push({id: this.inputTask})
        this.inputTask = ""
      },
      deleteItem(index) {
          this.taskList.splice(index, 1);
      }
    }
  };
</script>

<style>
  .itemlist {
    display: table;
    height: 50px;
  }
  .itemlist .item {
    height: 50px;
    width: 150px;
    font-size: 15px;
  }
  .trashcontainer {
    background-color:rgba(75, 75, 75, 0.25);
    border-radius: 5px;
    height: 30px;
    width: 100%;
  }
  .trash {
    display: table;
    margin: 0 auto;
    height: 100%;
    width: 50%;
  }
  .item {
    display: table-cell;
    width: 100%;
    height: 100%;
    margin-right: 1px;
    padding: 2px;
    border-radius: 5px;
    background-color: #ffffff;
    font-size: 10px;
    vertical-align: middle;
    user-select: none;
  }
  .item:hover {
    cursor: grab;
  }
  .item:active {
    cursor: grabbing;
  }
</style>