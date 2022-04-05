<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "MerchantList",
  data(){
    return{
      Merchants:[]
    }
  },
  mounted() {
    this.getMerchantList()
  },
  methods:{
    getMerchantList(){
      var vm = this;
      this.axios({
        headers:{
          "Content-Type": "application/json",
        },
        method:"GET",
        url:"http://47.99.149.141:8000/mechant"
      }).then(function(resp){
        var result = resp.data;
        if(result.success==true){
          for(var i =0;i<result.data.list.length;i++){
            vm.Merchants.push(result.data.list[i])
          }
        }else{
          alert("Fail")
        }
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 16px;
}
.item {
  margin-bottom: 18px;
}
.box-card {
  width: 480px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.el-col {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>

<style>
</style>
