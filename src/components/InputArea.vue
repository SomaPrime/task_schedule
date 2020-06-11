<template>
    <div>
        <form @submit.prevent="taskSubmit">
            <mdb-input type="text" size="lg" label="Task" v-model="inputTask" outline />
        </form>
        <draggable class="itemlist" v-model="taskList" :group="{ name: 'timeGroup', pull: 'clone', put: false }" @start="drag=true" @end="drag=false" :options="options">
            <div class="item" v-for="(item, index) in taskList" :key="item.id" @click.right.prevent="deleteItem(index)">{{item.id}}</div>
        </draggable>
        <div class="trashcontainer">
            <draggable class="trash" :group="{ name: 'timeGroup'}" @start="drag=true" @end="drag=false" :options="options">
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mdbInput } from "mdbvue";

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
      mdbInput
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
    user-select: none;
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
    margin-right: 1px;
    padding: 1px;
    border: 1px solid #7f7f7f;
    border-radius: 5px;
    background-color: #ffffff;
    font-size: 10px;
    vertical-align: middle;
  }
  .item:hover {
    cursor: grab;
  }
  .item:active {
    cursor: grabbing;
  }
</style>