<template>
  <div>
    <InputArea v-bind="[{taskList: taskList}]"/>
    <div class="schedule" ref="schedule">
      <TimeBody v-bind="[{date_list: list1 == null ? {} : list1}]"/>
      <TimeBody v-bind="[{date_list: list2 == null ? {} : list2}]"/>
      <TimeBody v-bind="[{date_list: list3 == null ? {} : list3}]"/>
      <TimeBody v-bind="[{date_list: list4 == null ? {} : list4}]"/>
      <TimeBody v-bind="[{date_list: list5 == null ? {} : list5}]"/>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// ex: import ComponentName from '@/components/file.name'
import TimeBody from '@/components/TimeBody.vue'
import InputArea from '@/components/InputArea.vue'
import taskScheduleTemplate from '@/assets/taskScheduleTemplate.json'
const request = require('request');

export default {
  name: 'schedule',
  components: {
    TimeBody,
    InputArea
  },
  data () {
      return {
          options: {
              animation: 0
          },
          isInitializedCount: 0,
          templateList: taskScheduleTemplate.list,
          taskSchedules: null,
          list1: null, list1_date: "",
          list2: null, list2_date: "",
          list3: null, list3_date: "",
          list4: null, list4_date: "",
          list5: null, list5_date: "",
          taskList: []
      }
  },
  methods: {
    doRequest(options) {
      return new Promise(function (resolve, reject) {
        request(options, function (error, res, body) {
          if (!error && res.statusCode == 200) {
            resolve(body);
          } else {
            reject(error);
          }
        });
      });
    },
    scrollToElement() {
      let schedule = this.$refs.schedule;
      schedule.scrollTop = 640;
    },
    async listUpdate(target_day) {
      let target_date = new Date(target_day);
      let target_year = target_date.getFullYear();
      let target_month = target_date.getMonth();
      let date = target_date.getDate();
      let day_num = target_date.getDay();
      let target_monday = date - day_num + 1;
      let start_date = new Date(target_year, target_month, target_monday);
      
      this.taskSchedules = await this.getTaskSchedule(this.getDateString((start_date).toDateString()))
      let taskList = await this.getTaskList(this.getDateString((start_date).toDateString()))
      if(taskList != null) {
        this.taskList = taskList
      }

      this.list1_date = this.getDateString((start_date).toDateString())
      start_date.setDate(start_date.getDate() + 1)
      this.list2_date = this.getDateString((start_date).toDateString())
      start_date.setDate(start_date.getDate() + 1)
      this.list3_date = this.getDateString((start_date).toDateString())
      start_date.setDate(start_date.getDate() + 1)
      this.list4_date = this.getDateString((start_date).toDateString())
      start_date.setDate(start_date.getDate() + 1)
      this.list5_date = this.getDateString((start_date).toDateString())

      if(this.taskSchedules != null) {
        this.list1 = this.taskSchedules[this.list1_date]
        this.list2 = this.taskSchedules[this.list2_date]
        this.list3 = this.taskSchedules[this.list3_date]
        this.list4 = this.taskSchedules[this.list4_date]
        this.list5 = this.taskSchedules[this.list5_date]
      }

      if(this.list1 == null) {
        this.list1 = JSON.parse(JSON.stringify(this.templateList))
      }
      if(this.list2 == null) {
        this.list2 = JSON.parse(JSON.stringify(this.templateList))
      }
      if(this.list3 == null) {
        this.list3 = JSON.parse(JSON.stringify(this.templateList))
      }
      if(this.list4 == null) {
        this.list4 = JSON.parse(JSON.stringify(this.templateList))
      }
      if(this.list5 == null) {
        this.list5 = JSON.parse(JSON.stringify(this.templateList))
      }
    },
    getDateString(date) {
      let day = new Date(date)
      return day.getFullYear() + "_" + (day.getMonth() + 1) + "_" + day.getDate()
    },
    async getTaskSchedule(start_date) {
      //ヘッダーを定義
      var headers = {
        'Content-Type':'application/json'
      }

      //オプションを定義
      var options = {
        url: 'http://localhost:3000/api/v1/week/' + start_date,
        method: 'GET',
        json: true,
        headers: headers
      }

      //リクエスト送信
      let body = await this.doRequest(options)
      return body.result
    },
    async getTaskList(start_date) {
      //ヘッダーを定義
      var headers = {
        'Content-Type':'application/json'
      }

      //オプションを定義
      var options = {
        url: 'http://localhost:3000/api/v1/week/task/' + start_date,
        method: 'GET',
        json: true,
        headers: headers
      }

      //リクエスト送信
      let body = await this.doRequest(options)
      return body.result
    },
    async writeTaskSchedule() {
      let data = {
        target_week: this.list1_date,
        schedules: {}
      }
      data.schedules[this.list1_date] = this.list1
      data.schedules[this.list2_date] = this.list2
      data.schedules[this.list3_date] = this.list3
      data.schedules[this.list4_date] = this.list4
      data.schedules[this.list5_date] = this.list5
      var options = {
          url: 'http://localhost:3000/api/v1/weekupdate',
          headers: {
            "Content-type": "application/json",
          },
          method: 'POST',
          json: data
      }

      await this.doRequest(options)
    },
    async writeTaskList() {
      let data = {
        target_week: this.list1_date,
        taskList: this.taskList
      }
      var options = {
          url: 'http://localhost:3000/api/v1/tasklistupdate',
          headers: {
            "Content-type": "application/json",
          },
          method: 'POST',
          json: data
      }

      await this.doRequest(options)
    }
  },
  mounted() {
    this.$nextTick(async function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      await this.listUpdate(new Date().toDateString())
      this.scrollToElement();
    })
  },
  watch: {
    taskList: {
      handler: function () {
        this.writeTaskList()
      },
      deep: true
    },
    list1: {
      handler: function () {
        this.writeTaskSchedule()
      },
      deep: true
    },
    list2: {
      handler: function () {
        this.writeTaskSchedule()
      },
      deep: true
    },
    list3: {
      handler: function () {
        this.writeTaskSchedule()
      },
      deep: true
    },
    list4: {
      handler: function () {
        this.writeTaskSchedule()
      },
      deep: true
    },
    list5: {
      handler: function () {
        this.writeTaskSchedule()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
  .schedule {
    height: 750px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  
</style>