<template>
  <div class="hello">
    <el-row style="margin-bottom: 10px;font-size: 25px; font-weight: 800;letter-spacing: 3px;">
      模拟数据采集盒子
    </el-row>
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-row style="padding-right: 20px;">
        <el-col :span="8">
          
          <el-row style="margin-bottom: 10px;">
            <el-col  style="display: flex; justify-content: center; align-items: center;">
              <el-form-item label="tenant_id:" prop="tenant_id" style="margin-right: 10px;">
                <el-input v-model="form.tenant_id" placeholder="请输入tenant_id" style="width: 100px;" :disabled="!creatMsgStatus"/>
              </el-form-item>
              <el-form-item label="device_id:" prop="device_id">
                <el-input v-model="form.device_id" placeholder="请输入device_id" style="width: 100px;" :disabled="!creatMsgStatus"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 10px;">
            <el-col  style="display: flex; justify-content: center; align-items: center;">
              <el-form-item label="topic:" prop="topic">
                <el-input v-model="computedTopic" placeholder="请输入topic" style="width: 300px;" readonly/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 10px;">
            <el-col  style="display: flex; justify-content: center; align-items: center;">
              <el-form-item label="message:" prop="message">
                <el-input type="textarea" v-model="form.message" placeholder="请输入message" style="width: 300px;" rows="10" :disabled="!creatMsgStatus"/>
              </el-form-item>
            </el-col>
    
    
          </el-row>
          <el-row style="margin-bottom: 10px;">
            <el-col  style="display: flex; justify-content: center; align-items: center;">
              <el-form-item label="value最小值:" prop="min" style="margin-right: 10px;" label-width="110px">
                <el-input v-model="form.min" placeholder="请输入value最小值" style="width: 60px;" :disabled="!creatMsgStatus"/>
              </el-form-item>
              <el-form-item label="value最大值:" prop="max" label-width="110px">
                <el-input v-model="form.max" placeholder="请输入value最大值" style="width: 60px;" :disabled="!creatMsgStatus"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="margin-bottom: 20px;">
            <el-button size="small" @click="creatMsg(false)" :disabled="!creatMsgStatus">生成随机message</el-button>
          </el-row>
        </el-col>
        <el-col :span="16" style="border: 1px solid #ccc;padding: 10px 20px;height:500px">
          <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeLeave">
            <el-tab-pane label="单次发送" name="first">
              <el-row style="margin-bottom: 10px;">
                单次发布：
                <el-button size="small" @click="singlePublish">发布信息</el-button>
              </el-row>
              <el-row style="margin-bottom: 10px;">
                发布状态：
                <span v-html="signleStatus"></span>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="设定发送" name="second">
              <el-row style="text-align: left;">
                <div style="display: flex; align-items: center;"> 
                  <el-form-item label="次数:" prop="frequency" style="margin-right: 10px;">
                    <el-input v-model.number="form.frequency" placeholder="请输入次数" style="width: 200px;" :disabled="!creatMsgStatus"/>
                  </el-form-item>
  
                  <el-form-item label="时间间隔:" prop="interval">
                    <el-input v-model.number="form.interval" placeholder="请输入时间间隔" style="width: 200px;" :disabled="!creatMsgStatus"/>
                  </el-form-item>
                  <el-form-item label="" prop="randomValue" label-width="20px">
                    <el-radio v-model="form.randomValue" label="1" :disabled="!creatMsgStatus">data_value固定</el-radio>
                    <el-radio v-model="form.randomValue" label="2" :disabled="!creatMsgStatus">data_value随机</el-radio>
                  </el-form-item>

                </div>
              </el-row>
              <el-row style="margin-bottom: 10px;">
                设定发布：
                <el-button size="small" @click="multiplePublish">发布信息</el-button>
                <el-button size="small" @click="multipleStopPublish">中止</el-button>
              </el-row>
              <el-scrollbar style="height:320px;">
                <el-row style="margin-bottom: 10px;">
                  发布状态：
                  <!-- <span >{{multipleStatus}}</span> -->
                  <span v-html="multipleStatus"></span>
                </el-row>
              </el-scrollbar>

            </el-tab-pane>
            <el-tab-pane label="循环发送" name="third">
              <el-row style="text-align: left;">
                <div style="display: flex; align-items: center;"> 
                  <el-form-item label="时间间隔:" prop="interval">
                    <el-input v-model.number="form.interval" placeholder="请输入时间间隔" style="width: 200px;" :disabled="!creatMsgStatus"/>
                  </el-form-item>
                  <el-form-item label="" prop="randomValue" label-width="20px">
                    <el-radio v-model="form.randomValue" label="1" :disabled="!creatMsgStatus">data_value固定</el-radio>
                    <el-radio v-model="form.randomValue" label="2" :disabled="!creatMsgStatus">data_value随机</el-radio>
                  </el-form-item>

                </div>
              </el-row>
              <el-row style="margin-bottom: 10px;">
                设定发布：
                <el-button size="small" @click="loopPublish">发布信息</el-button>
                <el-button size="small" @click="loopStopPublish">中止</el-button>
              </el-row>
              <el-scrollbar style="height:320px;">
                <el-row style="margin-bottom: 10px;">
                  发布状态：
                  <!-- <span >{{loopStatus}}</span> -->
                  <span v-html="loopStatus"></span>
                </el-row>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      activeName: 'first',
      form:{
        tenant_id: 0,
        device_id: "cnc_100",
        message: 
        JSON.stringify({
          "tenant_id": 0,
          "device_id": "cnc_100",
          "data_id": "temperature",
          "data_value": 20,
          "unit": "F"
        }, null, 2),
        min:"0",
        max:"100",
        frequency:1,
        interval: 5,
        randomValue: "1"
      },
      rules:{
        tenant_id: [
          {required: true, message: "tenant_id不能为空", trigger: "blur"}
        ],
        device_id: [
          {required: true, message: "device_id不能为空", trigger: "blur"}
        ],
        // topic: [
        //   {required: true, message: "topic主题不能为空", trigger: "blur"}
        // ],
        message: [
          {required: true, message: "内容不能为空", trigger: "blur"}
        ],
        frequency: [  
          { required: true, message: '请输入次数', trigger: 'blur' },  
          { type: 'number', message: '次数必须是一个数字', trigger: ['blur', 'change'] },  
          { validator: this.validateFrequency, trigger: 'blur' }  
        ],
        interval: [  
          { required: true, message: '请输入时间间隔', trigger: 'blur' },  
          { type: 'number', message: '时间间隔必须是一个数字', trigger: ['blur', 'change'] },  
          { validator: this.validateFrequency, trigger: 'blur' }  
        ],
        min: [  
          { required: true, message: '请输入最小值', trigger: 'blur' },  
          { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        ],
        max: [  
          { required: true, message: '请输入最大值', trigger: 'blur' },
          { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        ],
      },
      creatMsgStatus : true,
      signleStatus: "未发送",
      multipleStatus: "未发送",
      timer: null,
      loopStatus: "未发送",
    }
  },
  created() { 
    //topic
    this.form.topic = this.computedTopic; 
    //message
    var msgObj = JSON.parse(this.form.message)
    msgObj["tenant_id"] = this.form.tenant_id;
    msgObj["device_id"] = this.form.device_id;

    this.form.message = JSON.stringify(msgObj, null, 2);
  },
  mounted(){
    this.$mqtt.startMqtt().then(res=>{
      if(res){
        // //订阅频道
        // this.$mqtt.subscribe('/nodejs/mqtt')
        // //监听消息
        // this.$mqtt.mqttMessage((topic, message) => {
        //   this.qmttMsg = message.toString();
        // })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {  
    // 使用计算属性来动态计算 topic  
    computedTopic() {  
      return `moe/${this.form.tenant_id}/cnc/${this.form.device_id}/data/general`;  
    },
  },
  watch:{
    'form.tenant_id'(newVal, oldVal) {
      try{
        var obj = JSON.parse(this.form.message);
        if("tenant_id" in obj){
          const regex = /^(?:[0-9]+(\.[0-9]+)?|0)$/; 
          if(regex.test(this.form.tenant_id)){
            obj["tenant_id"] = parseFloat(this.form.tenant_id)
          }else{
            obj["tenant_id"] = this.form.tenant_id
          }
          
          this.form.message = JSON.stringify(obj, null, 2);
          this.signleStatus = "未发送"
        }
        else{
          throw(`数据格式错误----对象没有tenant_id属性，请先添加tenant_id属性名`)
        }
      }
      catch(error){
        this.signleStatus = "error:" + error
      }
    },
    'form.device_id'(newVal, oldVal) {
      try{
        var obj = JSON.parse(this.form.message);
        if("device_id" in obj){
          // const regex = /^(?:[0-9]+(\.[0-9]+)?|0)$/; 
          // if(regex.test(this.form.device_id)){
          //   obj["device_id"] = parseFloat(this.form.device_id)
          // }else{
          //   obj["device_id"] = this.form.device_id
          // }
          obj["device_id"] = this.form.device_id
          this.form.message = JSON.stringify(obj, null, 2);
          this.signleStatus = "未发送"
        }
        else{
          throw(`数据格式错误----对象没有device_id属性，请先添加device_id属性名`)
        }
      }
      catch(error){
        this.signleStatus = "error:" + error
      }
    }
    
  },
  destroyed(){
    //断开mqtt
    this.$mqtt.endMqtt();
  },
  methods:{
    //单独发送
    singlePublish(){
      let that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          try{
            this.creatMsgStatus = false;
            var callBack = ()=>{
              this.signleStatus = "<br>" + "发送成功:" + that.form.message
              this.creatMsgStatus = true;
            }
            var topic = `moe/${this.form.tenant_id}/cnc/${this.form.device_id}/data/general`;
            console.log("topic:"+topic)
            topic = "client/dev/report"
            var qos = 1
            that.$mqtt.publish(topic, JSON.parse(that.form.message),{qos:qos},callBack, (error) => {
              if (error) {
                this.signleStatus = "error:" + error
              }
            }); 
          }
          catch(error){
            this.signleStatus = "error:" + error
          }
        }
      });
      
    },
    multiplePublish(){
      let that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          try{
            if (this.timer !== null) {  
              // 如果定时器已经启动，先取消它  
              clearTimeout(this.timerId);  
            }  
            this.creatMsgStatus = false;
            var callBack = ()=>{
              this.multipleStatus += "<br>" + `第${n}次发送成功:` + that.form.message
              if(n<that.form.frequency&&(!this.creatMsgStatus)){
                this.timer = setTimeout(pubilcMsg,that.form.interval*1000)
              }else{
                this.multipleStatus += "<br>" + "发送完毕"
                this.creatMsgStatus = true;
              }
            }
            var n = 0;
            that.multipleStatus = "";
            var topic = `moe/${that.form.tenant_id}/cnc/${that.form.device_id}/data/general`;
            var qos = 1
            function sendMsg(){
              that.$mqtt.publish(topic, JSON.parse(that.form.message),{qos:qos},callBack, (error) => {
                if (error) {
                  this.multipleStatus = "error:" + error
                }
              }); 
            }
            function pubilcMsg(){
              n++;
              if(that.form.randomValue=="1"){
                sendMsg();
              }else if(that.form.randomValue=="2"){
                that.creatMsg(sendMsg);
              }

            }
            pubilcMsg();
            // var topic = `moe/${this.form.tenant_id}/cnc/${this.form.device_id}/data/general`;
            // topic = "client/dev/report"
            // var qos = 1
            // that.$mqtt.publish(topic, JSON.parse(that.form.message),{qos:qos},callBack, (error) => {
            //   if (error) {
            //     this.multipleStatus = "error:" + error
            //   }
            // }); 
          }
          catch(error){
            this.multipleStatus = "error:" + error
          }
        }
      });
    },
    multipleStopPublish(){
      if (this.timer !== null) {  
        clearTimeout(this.timer);  
        this.timer = null; // 清除定时器ID，防止重复清除  
        this.multipleStatus += "<br>" + "中止发送"
        this.creatMsgStatus = true;
      } 

    },
    loopPublish(){
      let that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          try{
            if (this.timer !== null) {  
              // 如果定时器已经启动，先取消它  
              clearTimeout(this.timerId);  
            }  
            this.creatMsgStatus = false;
            var callBack = ()=>{
              this.loopStatus += "<br>" + `第${n}次发送成功:` + that.form.message
              if(!this.creatMsgStatus){
                this.timer = setTimeout(pubilcMsg,that.form.interval*1000)
              }else{
                this.loopStatus += "<br>" + "发送完毕"
                this.creatMsgStatus = true;
              }
            }
            var n = 0;
            that.loopStatus = "";
            var topic = `moe/${that.form.tenant_id}/cnc/${that.form.device_id}/data/general`;
            var qos = 1
            function sendMsg(){
              that.$mqtt.publish(topic, JSON.parse(that.form.message),{qos:qos},callBack, (error) => {
                if (error) {
                  this.loopStatus = "error:" + error
                }
              }); 
            }
            function pubilcMsg(){
              n++;
              if(that.form.randomValue=="1"){
                sendMsg();
              }else if(that.form.randomValue=="2"){
                that.creatMsg(sendMsg);
              }

            }
            pubilcMsg();
            // var topic = `moe/${this.form.tenant_id}/cnc/${this.form.device_id}/data/general`;
            // topic = "client/dev/report"
            // var qos = 1
            // that.$mqtt.publish(topic, JSON.parse(that.form.message),{qos:qos},callBack, (error) => {
            //   if (error) {
            //     this.signleStatus = "error:" + error
            //   }
            // }); 
          }
          catch(error){
            this.loopStatus = "error:" + error
          }
        }
      });
    },
    loopStopPublish(){
      if (this.timer !== null) {  
        clearTimeout(this.timer);  
        this.timer = null; // 清除定时器ID，防止重复清除  
        this.loopStatus += "<br>" + "中止发送"
        this.creatMsgStatus = true;
      } 
    },
    //生成随机数据
    creatMsg(fn){
      let maxPromise = new Promise((resolve, reject) => {  
        this.$refs['form'].validateField('max', (errMsg) => {  
          if (errMsg) { 
      
            resolve(false); // 或者你可以抛出错误，取决于你的逻辑  
          } else {  
            resolve(true);  
          }  
        });  
      });  
      let minPromise = new Promise((resolve, reject) => {  
        this.$refs['form'].validateField('min', (errMsg) => {  
          if (errMsg) {  
            resolve(false);  
          } else {  
            resolve(true);  
          }  
        });  
      });  
      Promise.all([maxPromise, minPromise]).then((results) => {  
        var n = 0;
        results.forEach(v=>{
          if(!v){
            n++;
          }
        })
        if(n>0){
          return;
        }
        if(parseFloat(this.form.max)<parseFloat(this.form.min)){
          this.$alert('最大值必须大于最小值', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          });
          return;
        }
        //全随机
        // var dataArray = [
        //   {
        //     "data_id": "temperature",
        //     "unit": ["F","C"]
        //   },
        //   {
        //     "data_id": "ph",
        //     "unit": ["jj","aa"]
        //   },
        //   {
        //     "data_id": "test",
        //     "unit": ["T","U"]
        //   },
        // ]
        // var num = Math.round(Math.random()*100)
        // var n = 1;
        // function getDataId(){
        //   if(num<=n/dataArray.length*100){
        //     n = n-1
        //   }else{
        //     n++;
        //     getDataId();
        //   }
        // }
        // getDataId()
        // var num2 = Math.round(Math.random()*100)
        // var n2 = 1;
        // function getDataUnit(){
        //   if(num2<=n2/dataArray[n].unit.length*100){
        //     n2 = n2-1
        //   }else{
        //     n2++;
        //     getDataUnit();
        //   }
        // }
        // getDataId()
        // var obj = {
        //   // "tenant_id": num,
        //   // "device_id": "cnc_"+ num,
        //   "tenant_id": JSON.parse(this.form.message).tenant_id,
        //   "device_id": JSON.parse(this.form.message).device_id,
        //   "data_id": dataArray[n].data_id,
        //   "data_value": Math.round(Math.random()*10000)/100,
        //   "unit": dataArray[n].unit[n2]
        // }
        //data_value随机
        let minValue = parseFloat(this.form.min);  
        let maxValue = parseFloat(this.form.max); 
        let range = maxValue - minValue; 
        let randomValue = Math.round((Math.random() * range + minValue) * 100) / 100;
        var obj = {
          "tenant_id": JSON.parse(this.form.message).tenant_id,
          "device_id": JSON.parse(this.form.message).device_id,
          "data_id": JSON.parse(this.form.message).data_id,
          "data_value": randomValue,
          "unit": JSON.parse(this.form.message).unit,
        }
        this.form.message = JSON.stringify(obj, null, 2);
        // this.form.tenant_id = num
        // this.form.device_id = "cnc_"+ num
        if(fn){
          fn();
        }else{
          if(this.activeName=="first"){
            this.signleStatus = "未发送"
          }else if(this.activeName=="second"){
            this.multipleStatus = "未发送"
          }else if(this.activeName=="third"){
            this.loopStatus = "未发送"
          }
        }
      }).catch((error) => {  
        console.error(error);  
      }); 

      
    },
    //验证max和min
    validateNumber(rule, value, callback) {  
      if (!value) {  
        return;  
      }  
      if (!/^[-+]?(\d+(\.\d{1,2})?)$/.test(value)) {  
        callback(new Error('数值必须是整数或小数（最多两位小数）'));  
      } else {  
        callback();  
      }  
    }, 
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    beforeLeave(activeName,oldActiveName){
      if(oldActiveName=="second"){
        this.multipleStopPublish();
        this.multipleStatus= "未发送";
        this.form.frequency = 1;
        this.form.interval = 5;
      }else if (oldActiveName=="third"){
        this.loopStopPublish();
        this.loopStatus= "未发送";
        this.form.interval = 5;
      }
    },
    validateFrequency(rule, value, callback) {  
      if (typeof value !== 'number' || isNaN(value) || value <= 0) {  
        callback(new Error('数值必须为大于0的正整数'));  
      } else {  
        callback();  
      }  
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ::v-deep .el-scrollbar__wrap{
    overflow-x: hidden!important;
  }
</style>
