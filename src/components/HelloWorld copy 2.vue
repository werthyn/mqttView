<template>
  <div class="hello">
    <el-row style="margin-bottom: 10px;font-size: 25px; font-weight: 800;letter-spacing: 3px;">
      模拟数据采集盒子
    </el-row>
    <div style="height: 700px;box-sizing: border-box;border: 1px solid #ccc;margin: 10px 20px;padding: 10px 20px;">
      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeLeave">
          <el-tab-pane label="单设备发送" name="first">
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
              <el-row>

                <el-col :span="8" style="box-sizing: border-box;border-right: 1px solid #ccc;height: 610px;">
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
                  <el-row style="margin-bottom: 20px;">
                    <el-col  style="display: flex; justify-content: center; align-items: center;">
                      <el-form-item label="value最小值:" prop="min" style="margin-right: 10px;" label-width="110px">
                        <el-input v-model="form.min" placeholder="请输入value最小值" style="width: 80px;" :disabled="!creatMsgStatus"/>
                      </el-form-item>
                      <el-form-item label="value最大值:" prop="max" label-width="110px">
                        <el-input v-model="form.max" placeholder="请输入value最大值" style="width: 80px;" :disabled="!creatMsgStatus"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
        
                  <el-row style="margin-bottom: 20px;">
                    <el-button size="small" @click="creatMsg(false,1)" :disabled="!creatMsgStatus">生成随机message</el-button>
                  </el-row>
                </el-col>

                <el-col :span="16" style="text-align: left;">
                  <el-row>
                    <el-form-item label="" prop="freqNum" label-width="20px" style="display: inline-block;">
                      <el-radio v-model="form.freqNum" label="1" :disabled="!creatMsgStatus">单次发送</el-radio>
                      <el-radio v-model="form.freqNum" label="2" :disabled="!creatMsgStatus">多次发送</el-radio>
                    </el-form-item>
                  </el-row>
                  <el-row v-if="some">
                    <el-form-item label="" prop="loop" label-width="20px" style="display: inline-block;margin-right: 10px;">
                      <el-radio v-model="form.loop" label="1" :disabled="!creatMsgStatus">有限循环</el-radio>
                      <el-radio v-model="form.loop" label="2" :disabled="!creatMsgStatus">无限循环</el-radio>
                    </el-form-item>
                    <el-form-item label="发布次数:" prop="frequency" style="display: inline-block;margin-right: 10px;"  v-if="frequencyShow" >
                      <el-input v-model.number="form.frequency" placeholder="请输入次数" style="width: 200px;" :disabled="!creatMsgStatus"/>
                    </el-form-item>
                    <el-form-item label="时间间隔:" prop="interval" style="display: inline-block;">
                      <el-input v-model.number="form.interval" placeholder="请输入时间间隔" style="width: 200px;" :disabled="!creatMsgStatus"/>
                    </el-form-item>
                    <!-- <el-form-item label="中止时间:" prop="stopTime" style="display: inline-block;margin-right: 10px;"  v-if="!frequencyShow" >
                      <el-date-picker
                        v-model="form.stopTime"
                        type="datetime"
                        placeholder="选择时间"
                        style="width: 200px;" :disabled="!creatMsgStatus">
                      </el-date-picker>
                    </el-form-item> -->
                  </el-row>
                  <el-row v-if="some">
                    <el-form-item label="" prop="randomValue" label-width="20px" style="display: inline-block;">
                      <el-radio v-model="form.randomValue" label="1" :disabled="!creatMsgStatus">data_value固定</el-radio>
                      <el-radio v-model="form.randomValue" label="2" :disabled="!creatMsgStatus">data_value随机</el-radio>
                    </el-form-item>
                  </el-row>
                  <el-row style="margin-bottom: 20px;margin-left: 20px;">
                    设定发布：
                    <el-button size="small" @click="singlePublish" :disabled="!creatMsgStatus">发布信息</el-button>
                    <el-button size="small" @click="singleStopPublish">中止发布</el-button>
                  </el-row>
                  <el-row style="margin-bottom: 20px;margin-left: 20px;">
                    <el-scrollbar style="height:320px;">
                      <el-row style="margin-bottom: 10px;">
                        发布状态：
                        <span v-html="singleStatus"></span>
                      </el-row>
                    </el-scrollbar>
                  </el-row>
                </el-col>

              </el-row>
            </el-form>
          </el-tab-pane>


          <el-tab-pane label="多设备发送" name="second">
            <el-form ref="forms" :model="forms" :rules="fromsRules" label-width="90px">
              <el-row>
                <el-col :span="5" style="border-right: 1px solid #ccc;height: 630px;">
                  <!-- <el-row>
                    <div style="width: 200px;margin: 0 auto;">
                      <el-button size="small" @click="creatEquipment" :disabled="!formsStatus">新增设备</el-button>
                    </div>
                  </el-row> -->
                  <el-row>
                    <div style="width: 200px;margin: 0 auto;">
                      <span style="display: inline-block;margin-bottom: 10px;">tenant_id: {{forms.tenant_id}}</span>
                    </div>

                  </el-row>
                  <el-row>
                    <div style="width: 200px;margin: 0 auto;">
                      <el-form-item label="" prop="freqNum" label-width="0px" >
                        <el-radio v-model="forms.freqNum" label="1" :disabled="!formsStatus">单次发送</el-radio>
                        <el-radio v-model="forms.freqNum" label="2" :disabled="!formsStatus">多次发送</el-radio>
                      </el-form-item>
                    </div>

                  </el-row>
                  <el-row v-if="formCommonSome">
                    <div style="width: 200px;margin: 0 auto;">
                      <el-form-item label="" prop="loop" label-width="0px">
                        <el-radio v-model="forms.loop" label="1" :disabled="!formsStatus">有限循环</el-radio>
                        <el-radio v-model="forms.loop" label="2" :disabled="!formsStatus">无限循环</el-radio>
                      </el-form-item>
                    </div>

                  </el-row>
                  <div v-if="formCommonSome">
                    <el-row>
                      <div style="width: 200px;margin: 0 auto;">
                        <el-form-item label="发布次数:" prop="frequency"  v-if="fromsFrequencyShow" >
                          <el-input v-model.number="forms.frequency" placeholder="请输入次数" style="width: 100px;" :disabled="!formsStatus"/>
                        </el-form-item>
                      </div>

                    </el-row>
                    <el-row>
                      <div style="width: 200px;margin: 0 auto;">
                        <el-form-item label="时间间隔:" prop="interval">
                          <el-input v-model.number="forms.interval" placeholder="请输入时间间隔" style="width: 100px;" :disabled="!formsStatus"/>
                        </el-form-item>
                      </div>
                    </el-row>
                  </div>

                  <el-row>
                    <div style="width: 200px;margin: 0 auto;">
                      <el-button size="small" @click="formsPublish" :disabled="!formsStatus">发布信息</el-button>
                      <el-button size="small" @click="formsStopPublish">中止发布</el-button>
                    </div>
                  </el-row>
                </el-col>
                <el-col :span="19">
                  <el-scrollbar style="height:630px;padding-left: 20px;">
                    <div style="width: 100%;height: 335px;margin-bottom: 10px;box-sizing: border-box;border: 1px solid #ccc ;">
                      <el-row>
                        <el-col :span="6" style="height: 335px;box-sizing: border-box;border-right: 1px solid #ccc ;padding-top: 5px;">
                          <el-row style="margin-bottom: 10px;">
                            设备：cnc_100
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="data_id" prop="data_id1" label-width="70px" >
                                <el-input v-model="forms.data_id1" placeholder="请输入data_id" style="width: 130px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="unit" prop="unit1" label-width="70px" >
                                <el-input v-model="forms.unit1" placeholder="请输入unit" style="width: 130px;" readonly/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="timestamp" prop="timestamp1" label-width="90px" >
                                <el-input v-model="forms.timestamp1" placeholder="请输入timestamp" style="width: 110px;" readonly/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="value最小值:" prop="min1" label-width="110px" >
                                <el-input v-model="forms.min1" placeholder="请输入最小值" style="width: 90px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="value最大值:" prop="max1" label-width="110px" >
                                <el-input v-model="forms.max1" placeholder="请输入最大值" style="width: 90px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                        </el-col>
                        <el-col :span="18">
                          <el-scrollbar style="height:300px;word-wrap: break-word;">
                            <el-row style="margin-bottom: 10px;">
                              发布状态：
                              <span v-html="forms.status1"></span>
                            </el-row>
                          </el-scrollbar>
                        </el-col>
                      </el-row>
                    </div>
                    <div style="width: 100%;height: 335px;margin-bottom: 10px;box-sizing: border-box;border: 1px solid #ccc ;">
                      <el-row>
                        <el-col :span="6" style="height: 335px;box-sizing: border-box;border-right: 1px solid #ccc ;padding-top: 5px;">
                          <el-row style="margin-bottom: 10px;">
                            设备：cnc_101
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="data_id" prop="data_id2" label-width="70px" >
                                <el-input v-model="forms.data_id2" placeholder="请输入data_id" style="width: 130px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="unit" prop="unit2" label-width="70px" >
                                <el-input v-model="forms.unit2" placeholder="请输入unit" style="width: 130px;" readonly/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="timestamp" prop="timestamp2" label-width="90px" >
                                <el-input v-model="forms.timestamp2" placeholder="请输入timestamp" style="width: 110px;" readonly/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="value最小值:" prop="min2" label-width="110px" >
                                <el-input v-model="forms.min2" placeholder="请输入最小值" style="width: 90px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="value最大值:" prop="max2" label-width="110px" >
                                <el-input v-model="forms.max2" placeholder="请输入最大值" style="width: 90px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                        </el-col>
                        <el-col :span="18">
                          <el-scrollbar style="height:300px;word-wrap: break-word;">
                            <el-row style="margin-bottom: 10px;">
                              发布状态：
                              <span v-html="forms.status2"></span>
                            </el-row>
                          </el-scrollbar>
                        </el-col>
                      </el-row>
                    </div>
                  </el-scrollbar>
                </el-col>
              </el-row>
            </el-form>



          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>


  </div>
</template>

<script>
import moment from'moment';
export default {
  name: 'HelloWorld',
  data(){
    return {
      activeName: 'second',

      form:{
        tenant_id: 1,
        device_id: "cnc_100",
        message: 
        JSON.stringify({
          "tenant_id": 0,
          "device_id": "cnc_100",
          "data_id": "temperature",
          "data_value": 20,
          "unit": "F",
          "timestamp": 1679886000
        }, null, 2),
        min:"0",
        max:"100",
        freqNum:"1",
        frequency:1,
        interval: 5,
        randomValue: "1",
        loop: "1",
        // stopTime: null,
        // stopTime: "2024-07-11 15:16:26",
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
        // stopTime: [
        //   {required: true, message: "中止时间不能为空", trigger: "blur"}
        // ],
      },
      creatMsgStatus : true,
      some: false,
      frequencyShow: true,
      singleStatus: "未发送",
      singleTimer: null,

      // formsArray:[
      //   {
      //     tenant_id: 1,
      //     device_id: "cnc_100",
      //     "data_id": "temperature",
      //     "data_value": 20,
      //     "unit": "F",
      //     "timestamp": 1679886000,
      //     min:"0",
      //     max:"100",
      //     status:"未发布"
      //   },
      // ],
      forms: {
        freqNum: "1",
        loop: "1",
        frequency:2,
        interval: 5,

        tenant_id: 1,
        "timestamp": 1679886000,

        device_id1: "cnc_100",
        "data_id1": "state",
        "data_value1": 20,
        "unit1": "-",
        "timestamp1": 1679886000,
        min1:"10",
        max1:"20",
        status1:"未发布",

        "device_id2": "cnc_101",
        "data_id2": "temperature",
        "data_value2": 20,
        "unit2": "F",
        "timestamp2": 1679886000,
        min2:"0",
        max2:"100",
        status2:"未发布",
      },
      formsStatus:true,
      formCommonSome:false,
      fromsFrequencyShow: true,
      fromsStatus: "未发送",
      fromsRules:{
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
        data_id1: [
          {required: true, message: "device_id不能为空", trigger: "blur"}
        ],
        unit1: [
          {required: true, message: "unit不能为空", trigger: "blur"}
        ],
        timestamp1: [
          {required: true, message: "unit不能为空", trigger: "blur"}
        ],
        min1: [  
          { required: true, message: '请输入最小值', trigger: 'blur' },  
          { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        ],
        max1: [  
          { required: true, message: '请输入最大值', trigger: 'blur' },
          { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        ],

        data_id2: [
          {required: true, message: "device_id不能为空", trigger: "blur"}
        ],
        unit2: [
          {required: true, message: "unit不能为空", trigger: "blur"}
        ],
        timestamp2: [
          {required: true, message: "unit不能为空", trigger: "blur"}
        ],
        min2: [  
          { required: true, message: '请输入最小值', trigger: 'blur' },  
          { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        ],
        max2: [  
          { required: true, message: '请输入最大值', trigger: 'blur' },
          { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        ],

        // min: [  
        //   { required: true, message: '请输入最小值', trigger: 'blur' },  
        //   { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        // ],
        // max: [  
        //   { required: true, message: '请输入最大值', trigger: 'blur' },
        //   { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        // ],
      },
      formsTimer: null,
    }
  },
  created() { 
    this.form.topic = this.computedTopic; 
  },
  mounted(){
    // console.log(moment("2024-07-11 15:16:26").unix())
    // console.log(moment("2024-07-11 15:16:26").unix()-6000)
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
          this.singleStatus = "未发送"
        }
        else{
          throw(`数据格式错误----对象没有tenant_id属性，请先添加tenant_id属性名`)
        }
      }
      catch(error){
        this.singleStatus = "error:" + error
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
          this.singleStatus = "未发送"
        }
        else{
          throw(`数据格式错误----对象没有device_id属性，请先添加device_id属性名`)
        }
      }
      catch(error){
        this.singleStatus = "error:" + error
      }
    },
    'form.freqNum'(newVal, oldVal) {
      if(newVal=="1"){
        this.form.loop = "1";
        this.form.frequency = 1;
        this.form.interval = 5;
      
        this.some = false;
        this.singleStatus = "未发送";
      }else{
        this.form.loop = "1";
        this.form.frequency = 2;
        this.form.interval = 5;
   
        this.some = true;
        this.singleStatus = "未发送";
      }
    },
    'form.loop'(newVal, oldVal) {
      if(newVal=="1"){
        this.form.frequency = 2;
        this.form.interval = 5;
        this.frequencyShow = true;
        this.singleStatus = "未发送";
      }else{
        this.form.frequency = 1;
        this.form.interval = 5;
        this.frequencyShow = false;
        this.singleStatus = "未发送";

      }
    },
    'form.randomValue'(newVal, oldVal) {
      this.singleStatus = "未发送";
    },
    'forms.freqNum'(newVal, oldVal) {
      if(newVal=="1"){
        this.forms.loop = "1";
        this.forms.frequency = 1;
        this.forms.interval = 5;
      
        this.formCommonSome = false;
        // this.fromsStatus = "未发送";
        this.resetFormsStatus();
      }else{
        this.forms.loop = "1";
        this.forms.frequency = 2;
        this.forms.interval = 5;
   
        this.formCommonSome = true;
        // this.fromsStatus = "未发送";
        this.resetFormsStatus();
      }
    },
    'forms.loop'(newVal, oldVal) {
      if(newVal=="1"){
        this.forms.frequency = 2;
        this.forms.interval = 5;
        this.fromsFrequencyShow = true;
        // this.fromsStatus = "未发送";
        this.resetFormsStatus();
      }else{
        this.forms.frequency = 1;
        this.forms.interval = 5;
        this.fromsFrequencyShow = false;
        // this.fromsStatus = "未发送";
        this.resetFormsStatus();

      }
    },
    
  },
  destroyed(){
    //断开mqtt
    this.$mqtt.endMqtt();
  },
  methods:{
    handleClick(){
      console.log(1)
    },
    beforeLeave(activeName,oldActiveName){
      var p = new Promise((resolve, reject) => {
        if(this.creatMsgStatus){
          if(oldActiveName=="first"){
            this.firstReset();
          }else if (oldActiveName=="second"){
            this.secondReset();
          }
          resolve();
        }else{
          this.$confirm("您页面有修改，是否继续跳转?", {
            confirmButtonText: "确实",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(async () => {
            resolve();
            if(oldActiveName=="first"){
              this.firstReset();
            }else if (oldActiveName=="second"){
              this.secondReset();
            }
          })
          .catch(() => {
            // throw new Error('取消成功！')
            return reject();
          });
        }
      })
      return p;
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
    //验证次数
    validateFrequency(rule, value, callback) {  
      if (typeof value !== 'number' || isNaN(value) || value <= 0) {  
        callback(new Error('数值必须为大于0的正整数'));  
      } else {  
        callback();  
      }  
    },
    //单设备生成随机数据
    creatMsg(fn,n){
      let maxPromise = new Promise((resolve, reject) => {  
        this.$refs['form'].validateField('max', (errMsg) => {  
          if (errMsg) { 
            resolve(false);
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
          "timestamp": 1679886000
        };
        if(n==1){
          obj.timestamp = 1679886000
        }else{
          obj.timestamp = JSON.parse(this.form.message).timestamp
        }
        this.form.message = JSON.stringify(obj, null, 2);
        // this.form.tenant_id = num
        // this.form.device_id = "cnc_"+ num
        if(fn){
          fn();
        }else{
          this.singleStatus = "未发送"
        }
      }).catch((error) => {  
        console.error(error);  
      }); 

      
    },
    //单设备发布
    //单独发送
    singlePublish1(){
      let that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          try{
            this.creatMsgStatus = false;
            var callBack = ()=>{
              this.singleStatus = "<br>" + "发送成功:" + that.form.message
              this.creatMsgStatus = true;
            }
            var topic = `moe/${this.form.tenant_id}/cnc/${this.form.device_id}/data/general`;
          
            // topic = "client/dev/report"
            var qos = 1
            that.$mqtt.publish(topic, JSON.parse(that.form.message),{qos:qos},callBack, (error) => {
              if (error) {
                this.singleStatus = "error:" + error
              }
            }); 
          }
          catch(error){
            this.singleStatus = "error:" + error
          }
        }
      });
      
    },
    //多次有限循环
    singlePublish2(){
      let that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          try{
            if (this.singleTimer !== null) {  
              // 如果定时器已经启动，先取消它  
              clearTimeout(this.singleTimer);  
            }  
            this.creatMsgStatus = false;
            var callBack = ()=>{
              this.singleStatus += "<br>" + `第${n}次发送成功:` + that.form.message
              if(n<that.form.frequency&&(!this.creatMsgStatus)){
                this.singleTimer = setTimeout(pubilcMsg,that.form.interval*1000)
              }else{
                this.singleStatus += "<br>" + "发送完毕"
                this.creatMsgStatus = true;
              }
            }
            var n = 0;
            that.singleStatus = "";
            var topic = `moe/${that.form.tenant_id}/cnc/${that.form.device_id}/data/general`;
            var qos = 1
            function sendMsg(){
              that.$mqtt.publish(topic, JSON.parse(that.form.message),{qos:qos},callBack, (error) => {
                if (error) {
                  this.singleStatus = "error:" + error
                }
              }); 
            }
            function pubilcMsg(){
              if(n>0){
                var obj = JSON.parse(that.form.message);
                obj.timestamp += that.form.interval*1000;
                that.form.message = JSON.stringify(obj,null,2)
              }
              n++;
              if(that.form.randomValue=="1"){
                sendMsg();
              }else if(that.form.randomValue=="2"){
                that.creatMsg(sendMsg,n);
              }

            }
            pubilcMsg();
          }
          catch(error){
            this.singleStatus = "error:" + error
          }
        }
      });
    },
    //多次无限循环
    singlePublish3(){
      let that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          try{
            if (this.singleTimer !== null) {  
              // 如果定时器已经启动，先取消它  
              clearTimeout(this.singleTimer);  
            }  
            this.creatMsgStatus = false;
            var callBack = ()=>{
              this.singleStatus += "<br>" + `第${n}次发送成功:` + that.form.message
              if(!this.creatMsgStatus&&loopBealoon){
                this.singleTimer = setTimeout(pubilcMsg,that.form.interval*1000)
              }else if(!this.creatMsgStatus&&(!loopBealoon)){
                this.singleStatus += "<br>" + "已到时间，发送完毕"
                this.creatMsgStatus = true;
              }else{
                this.singleStatus += "<br>" + "发送完毕"
                this.creatMsgStatus = true;
              }
            }
            var n = 0;
            var loopBealoon = true;
            that.singleStatus = "";
            var topic = `moe/${that.form.tenant_id}/cnc/${that.form.device_id}/data/general`;
            var qos = 2
            function sendMsg(){
              that.$mqtt.publish(topic, JSON.parse(that.form.message),{qos:qos},callBack, (error) => {
                if (error) {
                  this.singleStatus = "error:" + error
                }
              }); 
            }
            function pubilcMsg(){
              if(n>0){
                var obj = JSON.parse(that.form.message);
                obj.timestamp += that.form.interval*1000;

                that.form.message = JSON.stringify(obj,null,2)
              }
              // if(that.form.stopTime){
              //   if(JSON.parse(that.form.message).timestamp>moment(that.form.stopTime).unix()){
              //     loopBealoon = false;
              //   }else{
              //     loopBealoon = true;
              //   }
              // }else{
              //   loopBealoon = true;
              // }
              n++;
              if(that.form.randomValue=="1"){
                sendMsg();
              }else if(that.form.randomValue=="2"){
                that.creatMsg(sendMsg,n);
              }

            }
            pubilcMsg();
          }
          catch(error){
            this.singleStatus = "error:" + error
          }
        }
      });
    },
    singlePublish(){
      //单独发送
      if(this.form.freqNum=="1"){
        this.singlePublish1();
      }else{
        //多次有限循环
        if(this.form.loop=="1"){
          this.singlePublish2();
        }else{
          this.singlePublish3();
        }
      }
    },
    singleStopPublish(){
      if(this.form.freqNum=="1"){
      }else{
        if (this.singleTimer !== null) {  
          clearTimeout(this.singleTimer);  
          this.singleTimer = null; // 清除定时器ID，防止重复清除  
          this.singleStatus += "<br>" + "中止发送"
          this.creatMsgStatus = true;
        } 
      }
    },
    firstReset(){
      this.singleStopPublish();
      this.singleStatus= "未发送";
      this.form = {
        tenant_id: 1,
        device_id: "cnc_100",
        message: 
        JSON.stringify({
          "tenant_id": 0,
          "device_id": "cnc_100",
          "data_id": "temperature",
          "data_value": 20,
          "unit": "F",
          "timestamp": 1679886000
        }, null, 2),
        min:"0",
        max:"100",
        freqNum:"1",
        frequency:1,
        interval: 5,
        randomValue: "1",
        loop: "1",
        // stopTime: null,
      }
    },
    formsPublish1(){
      let that = this;
      this.$refs["forms"].validate(valid => {
        if (valid) {
          try{
            this.formsStatus = false;
            var topic1 = `moe/${this.forms.tenant_id}/cnc/${this.forms.device_id1}/data/general`;
            var topic2 = `moe/${this.forms.tenant_id}/cnc/${this.forms.device_id2}/data/general`;
            console.log("topic1:"+topic1)
            console.log("topic2:"+topic2)
            // topic = "client/dev/report"
            //生成随机数
            let minValue1 = parseFloat(this.forms.min1);  
            let maxValue1= parseFloat(this.forms.max1); 
            let range1 = maxValue1 - minValue1; 
            let randomValue1 = Math.round((Math.random() * range1 + minValue1) * 100) / 100;
            //生成随机数
            let minValue2 = parseFloat(this.forms.min2);  
            let maxValue2= parseFloat(this.forms.max2); 
            let range2 = maxValue2 - minValue2; 
            let randomValue2 = Math.round((Math.random() * range2 + minValue2) * 100) / 100;
            var qos = 1
            var n1 = false;
            var n2 = false;
            var params1 = {
              "tenant_id": this.forms.tenant_id,
              "device_id": this.forms.device_id1,
              "data_id": this.forms.data_id1,

              "data_value": randomValue1,

              "unit": this.forms.unit1,
              "timestamp": this.forms.timestamp
            }
            var params2 = {
              "tenant_id": this.forms.tenant_id,
              "device_id": this.forms.device_id2,
              "data_id": this.forms.data_id2,

              "data_value": randomValue2,

              "unit": this.forms.unit2,
              "timestamp": this.forms.timestamp
            }
            var callBack1 = ()=>{
              n1 = true;
              // this.singleStatus = "<br>" + "发送成功:" + that.forms.message
              that.forms.status1 = "<br>" + "发送成功:" + "<br>" +JSON.stringify(params1)
              if(n2){
                that.formsStatus = true;
              }
              
            }
            var callBack2 = ()=>{
              n2 = true;
              // this.singleStatus = "<br>" + "发送成功:" + that.forms.message
              that.forms.status2 = "<br>" + "发送成功:" + "<br>" +JSON.stringify(params2)
              if(n1){
                that.formsStatus = true;
              }
              
            }
            that.$mqtt.publish(topic1, params1,{qos:qos},callBack1, (error) => {
              if (error) {
                this.forms.status1 = "error:" + error
              }
            }); 
            that.$mqtt.publish(topic2, params2,{qos:qos},callBack2, (error) => {
              if (error) {
                this.forms.status2 = "error:" + error
              }
            }); 

          }
          catch(error){
            this.singleStatus = "error:" + error
          }
        }
      });
    },
    formsPublish2(){
      let that = this;
      this.$refs["forms"].validate(valid => {
        if (valid) {
          try{
            if (this.formsTimer !== null) {  
              // 如果定时器已经启动，先取消它  
              clearTimeout(this.formsTimer);  
            }  
            this.formsStatus = false;
            var n = 0;
            that.forms.status1 = "";
            that.forms.status2 = "";
            var topic1 = `moe/${that.forms.tenant_id}/cnc/${that.forms.device_id1}/data/general`;
            var topic2 = `moe/${that.forms.tenant_id}/cnc/${that.forms.device_id2}/data/general`;
            var qos = 1
            var num = 0;
            var obj1 = {};
            var obj2 = {};
            var callBack1 = ()=>{
              num++;
              this.forms.status1 += "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj1)
              if(n<that.forms.frequency&&(!this.formsStatus)){
                if(num%2==0){
                  this.formsTimer = setTimeout(pubilcMsg,that.forms.interval*1000)
                }
              }else{
                this.forms.status1 += "<br>" + "发送完毕"
                this.formsStatus = true;
              }
            }
            var callBack2 = ()=>{
              num++;
              this.forms.status2 += "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj2)
              console.log("n是：" + n)
              console.log("that.forms.frequency是：" + that.forms.frequency)
              console.log(typeof(that.forms.frequency))
              if(n<that.forms.frequency&&(!this.formsStatus)){
                if(num%2==0){
                  this.formsTimer = setTimeout(pubilcMsg,that.forms.interval*1000)
                }
              }else{
                this.forms.status2 += "<br>" + "发送完毕"
                this.formsStatus = true;
              }
            }
            function sendMsg(){
              //生成随机数
              let minValue1 = parseFloat(that.forms.min1);  
              let maxValue1= parseFloat(that.forms.max1); 
              let range1 = maxValue1 - minValue1; 
              let randomValue1 = Math.round((Math.random() * range1 + minValue1) * 100) / 100;
              //生成随机数
              let minValue2 = parseFloat(that.forms.min2);  
              let maxValue2= parseFloat(that.forms.max2); 
              let range2 = maxValue2 - minValue2; 
              let randomValue2 = Math.round((Math.random() * range2 + minValue2) * 100) / 100;
              var params1 = {
                "tenant_id": that.forms.tenant_id,
                "device_id": that.forms.device_id1,
                "data_id": that.forms.data_id1,

                "data_value": randomValue1,

                "unit": that.forms.unit1,
                "timestamp": that.forms.timestamp
              }
              obj1 = params1;
              var params2 = {
                "tenant_id": that.forms.tenant_id,
                "device_id": that.forms.device_id2,
                "data_id": that.forms.data_id2,

                "data_value": randomValue2,

                "unit": that.forms.unit2,
                "timestamp": that.forms.timestamp
              }
              obj2 = params2;
              that.$mqtt.publish(topic1, params1,{qos:qos},callBack1, (error) => {
                if (error) {
                  that.forms.status1 = "error:" + error
                }
              }); 
              that.$mqtt.publish(topic2, params2,{qos:qos},callBack2, (error) => {
                if (error) {
                  that.forms.status2 = "error:" + error
                }
              }); 
            }
            function pubilcMsg(){
              if(n>0){
                that.forms.timestamp1 += that.form.interval*1000;
                that.forms.timestamp2 += that.form.interval*1000;
              }
              n++;
              // if(that.form.randomValue=="1"){
              //   sendMsg();
              // }else if(that.form.randomValue=="2"){
              //   that.creatMsg(sendMsg,n);
              // }
              sendMsg();

            }
            pubilcMsg();
          }
          catch(error){
            this.singleStatus = "error:" + error
          }
        }
      });
    },
    formsPublish3(){
      let that = this;
      this.$refs["forms"].validate(valid => {
        if (valid) {
          try{
            if (this.formsTimer !== null) {  
              // 如果定时器已经启动，先取消它  
              clearTimeout(this.formsTimer);  
            }  
            this.formsStatus = false;
            var n = 0;
            that.forms.status1 = "";
            that.forms.status2 = "";
            var topic1 = `moe/${that.forms.tenant_id}/cnc/${that.forms.device_id1}/data/general`;
            var topic2 = `moe/${that.forms.tenant_id}/cnc/${that.forms.device_id2}/data/general`;
            var qos = 1
            var num = 0;
            var obj1 = {};
            var obj2 = {};
            var callBack1 = ()=>{
              num++;
              this.forms.status1 += "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj1)
              if(!this.formsStatus){
                if(num%2==0){
                  this.formsTimer = setTimeout(pubilcMsg,that.forms.interval*1000)
                }
              }else{
                this.forms.status1 += "<br>" + "发送完毕"
                this.formsStatus = true;
              }
            }
            var callBack2 = ()=>{
              num++;
              this.forms.status2 += "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj2)
              console.log("n是：" + n)
              console.log("that.forms.frequency是：" + that.forms.frequency)
              console.log(typeof(that.forms.frequency))
              if(!this.formsStatus){
                if(num%2==0){
                  this.formsTimer = setTimeout(pubilcMsg,that.forms.interval*1000)
                }
              }else{
                this.forms.status2 += "<br>" + "发送完毕"
                this.formsStatus = true;
              }
            }
            function sendMsg(){
              //生成随机数
              let minValue1 = parseFloat(that.forms.min1);  
              let maxValue1= parseFloat(that.forms.max1); 
              let range1 = maxValue1 - minValue1; 
              let randomValue1 = Math.round((Math.random() * range1 + minValue1) * 100) / 100;
              //生成随机数
              let minValue2 = parseFloat(that.forms.min2);  
              let maxValue2= parseFloat(that.forms.max2); 
              let range2 = maxValue2 - minValue2; 
              let randomValue2 = Math.round((Math.random() * range2 + minValue2) * 100) / 100;
              var params1 = {
                "tenant_id": that.forms.tenant_id,
                "device_id": that.forms.device_id1,
                "data_id": that.forms.data_id1,

                "data_value": randomValue1,

                "unit": that.forms.unit1,
                "timestamp": that.forms.timestamp
              }
              obj1 = params1;
              var params2 = {
                "tenant_id": that.forms.tenant_id,
                "device_id": that.forms.device_id2,
                "data_id": that.forms.data_id2,

                "data_value": randomValue2,

                "unit": that.forms.unit2,
                "timestamp": that.forms.timestamp
              }
              obj2 = params2;
              that.$mqtt.publish(topic1, params1,{qos:qos},callBack1, (error) => {
                if (error) {
                  that.forms.status1 = "error:" + error
                }
              }); 
              that.$mqtt.publish(topic2, params2,{qos:qos},callBack2, (error) => {
                if (error) {
                  that.forms.status2 = "error:" + error
                }
              }); 
            }
            function pubilcMsg(){
              if(n>0){
                that.forms.timestamp1 += that.form.interval*1000;
                that.forms.timestamp2 += that.form.interval*1000;
              }
              n++;
              // if(that.form.randomValue=="1"){
              //   sendMsg();
              // }else if(that.form.randomValue=="2"){
              //   that.creatMsg(sendMsg,n);
              // }
              sendMsg();

            }
            pubilcMsg();
          }
          catch(error){
            this.singleStatus = "error:" + error
          }
        }
      });
    },
    formsPublish(){
      //单独发送
      if(this.forms.freqNum=="1"){
        this.formsPublish1();
      }else{
        //多次有限循环
        if(this.forms.loop=="1"){
          this.formsPublish2();
        }else{
          this.formsPublish3();
        }
      }
    },
    formsStopPublish(){
      if(this.forms.freqNum=="1"){
      }else{
        if (this.formsTimer !== null) {  
          clearTimeout(this.formsTimer);  
          this.formsTimer = null; // 清除定时器ID，防止重复清除  
          // this.singleStatus += "<br>" + "中止发送"
          this.forms.status1 += "<br>" + "中止发送"
          this.forms.status2 += "<br>" + "中止发送"
          this.formsStatus = true;
        } 
      }
    },
    secondReset(){
      this.formsStopPublish();
      this.forms =  {
        freqNum: "1",
        loop: "1",
        frequency:2,
        interval: 5,

        tenant_id: 1,
        "timestamp": 1679886000,

        device_id1: "cnc_100",
        "data_id1": "state",
        "data_value1": 20,
        "unit1": "-",
        min1:"10",
        max1:"20",
        status1:"未发布",

        device_id2: "cnc_101",
        "data_id2": "temperature",
        "data_value2": 20,
        "unit2": "F",
        min2:"0",
        max2:"100",
        status2:"未发布",
      }
    },
    // creatEquipment(){
    //   console.log(1)
    // },
    resetFormsStatus(){

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
