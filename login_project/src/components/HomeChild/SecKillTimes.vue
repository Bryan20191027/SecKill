<template>
  <div>
  <div v-if="!ifOver">
    {{h}}:{{m}}:{{s}}
  </div>
  <div v-if="ifOver">
    进行中
  </div>
  </div>
</template>

<script>
export default {
  name: "SecKillTimes",
  props:['overTime','endTime'],
  data(){
    return{
      h:"00",
      m:"00",
      s:"00",
      ifOver:false
    }
  },
  methods:{
    countDown(){
      var vm =this;

      var over = (new Date(this.overTime)).getTime();
      var now = new Date();
      var begin = now.getTime();

      var times = over-begin;
      var hour = parseInt(times/1000/60/60)
      var min = parseInt(times/1000/60%60)
      var sec = parseInt(times/1000%60)

      if(hour <0||min<0||sec<0||(hour===0&&min===0&&sec===0)) {
        vm.ifOver=true
      }else{
        this.h = this.formatTime(hour);
        this.m = this.formatTime(min);
        this.s = this.formatTime(sec);

        setTimeout(function () {
          begin -= 1000;
          vm.countDown();
        }, 1000);
      }
    },
    formatTime(s){
      return s<10?("0"+s):s;
    }
  },
  created(){
    this.countDown()
  }
}
</script>

<style scoped>

</style>
