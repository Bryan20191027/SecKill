<template>
  <div>
    <h3>秒杀列表</h3>
    <el-row :gutter="20">
      <el-col :span="4" :offset="2" @click.native="getMerchantList(times[0].endTime)">
        <div class="grid-content bg-purple">
        {{times[0].endTime}}{{getCurrentTime(times[0].endTime)}}
        </div>
      </el-col>
      <el-col :span="4" @click.native="getMerchantList(times[1].endTime)">
        <div class="grid-content bg-purple">
          {{times[1].endTime}}{{getCurrentTime(times[1].endTime)}}
        </div>
      </el-col>
      <el-col :span="4" @click.native="getMerchantList(times[2].endTime)">
        <div class="grid-content bg-purple">
          {{times[2].endTime}}{{getCurrentTime(times[2].endTime)}}
        </div>
      </el-col>
      <el-col :span="4" @click.native="getMerchantList(times[3].endTime)">
      <div class="grid-content bg-purple">
        {{times[3].endTime}}{{getCurrentTime(times[3].endTime)}}
      </div>
    </el-col>
      <el-col :span="4" @click.native="getMerchantList(times[4].endTime)">
        <div class="grid-content bg-purple">
          {{times[4].endTime}}{{getCurrentTime(times[4].endTime)}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "SecKillList",
    data(){
      return{
        times:[]
      }
    },
    methods:{
      getSecList(){
        var vm = this;
        this.axios({
          headers:{
            "Content-Type": "application/json",
            "Authorization":("Bearer "+sessionStorage.getItem('token')).toString()
          },
          method:"POST",
          url:"http://47.99.149.141:8000/seckill-mechant/list"
        }).then(function(resp){
          var result = resp.data;
          if(result.success==true){
            console.log(result.data.list.length);
            for(var i =0;i<result.data.list.length;i++){
              vm.times.push(result.data.list[i])
            }
          }else{
            alert(1)
          }
        })
      },
      getMerchantList(time){
        alert(time)
      },
      getCurrentTime(endTime){
        var currentTime = new Date();
        return (new Date(endTime)>currentTime.getTime()?"  进行中...":"  已结束");
      }
    },
    mounted() {
      this.getSecList();
    }
  }
</script>

<style scoped>

</style>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  };
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  line-height: 40px;
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
