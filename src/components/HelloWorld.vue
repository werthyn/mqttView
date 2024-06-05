<template>
  <div class="hello">
    <el-input
      v-model="msg"
      placeholder="点击获取后端内容"
      clearable
      size="small"
      readonly
      style="width: 194px;margin-right: 20px;"
    />
    <el-button size="small" @click="getMsg" style="margin-right: 2px;">获取信息</el-button>
    <el-button size="small" @click="clear">清除</el-button>
  </div>
</template>

<script>
import { test } from "@/api/test";
export default {
  name: 'HelloWorld',
  data(){
    return {
      msg: ""
    }
  },
  methods:{
    getMsg(){
      var params = {
        name:"abc"
      }
      test(params).then(response=>{
          this.msg = response.data
      })
    },
    clear(){
      this.msg = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
