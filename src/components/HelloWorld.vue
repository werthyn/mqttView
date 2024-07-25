<template>
  <div class="hello">
    <el-row style="margin-bottom: 10px;font-size: 25px; font-weight: 800;letter-spacing: 3px; position: relative;text-align: left;padding-left: 20px;">
      模拟数据采集盒子
      <!-- <div style="position: absolute;right: 20px;top: 0;font-size: 15px; font-weight: 400;">
        <el-form ref="allform" :model="allform" :rules="allformrules" label-width="105px" style="display: flex;flex-direction: row; align-items: center;">
          <el-form-item label="username:" style="margin-right: 10px;" prop="username">
            <el-input v-model="allform.username" placeholder="请输入username" style="width: 120px;" :disabled="!allstatus"/>
          </el-form-item>
          <el-form-item label="password:" style="margin-right: 10px;" prop="password">
            <el-input v-model="allform.password" placeholder="请输入password" style="width: 120px;" :disabled="!allstatus"/>
          </el-form-item>
          <el-form-item label="url:" style="margin-right: 10px;" prop="url" label-width="45px">
            <el-input v-model="allform.url" placeholder="请输入url" style="width: 240px;" :disabled="!allstatus"/>
          </el-form-item>
          <el-button style="position: relative;top: -11px;">连接</el-button>
        </el-form>
      </div> -->
    </el-row>
    <div style="height: 700px;box-sizing: border-box;border: 1px solid #ccc;margin: 10px 20px;padding: 10px 20px;">
      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeLeave">
          <!-- <el-tab-pane label="单设备发送" name="first">
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
                    ----------------------------------------------
                    <el-form-item label="中止时间:" prop="stopTime" style="display: inline-block;margin-right: 10px;"  v-if="!frequencyShow" >
                      <el-date-picker
                        v-model="form.stopTime"
                        type="datetime"
                        placeholder="选择时间"
                        style="width: 200px;" :disabled="!creatMsgStatus">
                      </el-date-picker>
                    </el-form-item>
                    ----------------------------------------------
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
          </el-tab-pane> -->


          <el-tab-pane label="信息发送" name="second">
            <el-form ref="forms" :model="forms" :rules="formsRules" label-width="90px">
              <el-row>
                <el-col :span="5" style="border-right: 1px solid #ccc;height: 630px;">
                  <!-- <el-row>
                    <div style="width: 200px;margin: 0 auto;">
                      <el-button size="small" @click="creatEquipment" :disabled="!formsStatus">新增设备</el-button>
                    </div>
                  </el-row> -->
                  <el-row>
                    <div style="width: 200px;margin: 0 auto;">
                      <el-form-item label="" prop="num" label-width="0px" >
                        <el-radio-group v-model="forms.num" @input="changeFormsNum(forms.num)">  
                          <el-radio label="1" :disabled="!formsStatus">单设备</el-radio>
                          <el-radio label="2" :disabled="!formsStatus">多设备</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>

                  </el-row>

                  <el-row>
                    <div style="width: 200px;margin: 0 auto;">
                      <!-- <span style="display: inline-block;margin-bottom: 10px;">tenant_id: {{forms.tenant_id}}</span> -->
                      <el-form-item label="tenant_id:" prop="tenant_id"  v-if="fromsFrequencyShow" >
                        <el-input v-model.number="forms.tenant_id" placeholder="请输入tenant_id" style="width: 100px;" :disabled="!formsStatus"/>
                      </el-form-item>
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
                  <el-scrollbar style="height:630px;padding-left: 20px;" ref="singleScrollbar">
                    <div style="width: 100%;height: 380px;margin-bottom: 10px;box-sizing: border-box;border: 1px solid #ccc ;">
                      <el-row>
                        <el-col :span="6" style="height: 380px;box-sizing: border-box;border-right: 1px solid #ccc ;padding-top: 5px;">
                          <el-row style="margin-bottom: 10px;">
                            <!-- 设备：cnc_100 -->
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="device_id" prop="device_id1" label-width="70px" >
                                <el-input v-model="forms.device_id1" placeholder="请输入device_id" style="width: 130px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
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
                              <el-form-item label="value固定值:" prop="value1" label-width="110px" >
                                <el-input v-model="forms.value1" placeholder="请输入固定值" style="width: 90px;" :disabled="!formsStatus" />
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="unit" prop="unit1" label-width="70px" >
                                <el-input v-model="forms.unit1" placeholder="请输入unit" style="width: 130px;"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <!-- <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="timestamp" prop="timestamp1" label-width="90px" >
                                <el-input v-model="forms.timestamp1" placeholder="请输入timestamp" style="width: 110px;" readonly/>
                              </el-form-item>
                            </div>
                          </el-row> -->

                          <el-row v-if="!this.forms.value1">
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="value最小值:" prop="min1" label-width="110px" >
                                <el-input v-model="forms.min1" placeholder="请输入最小值" style="width: 90px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row v-if="!this.forms.value1">
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
                    <div style="width: 100%;height: 380px;margin-bottom: 10px;box-sizing: border-box;border: 1px solid #ccc ;" v-if="!(forms.num=='1')">
                      <el-row>
                        <el-col :span="6" style="height: 380px;box-sizing: border-box;border-right: 1px solid #ccc ;padding-top: 5px;">
                          <el-row style="margin-bottom: 10px;">
                            <!-- 设备：cnc_101 -->
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="device_id" prop="device_id2" label-width="70px" >
                                <el-input v-model="forms.device_id2" placeholder="请输入device_id" style="width: 130px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
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
                              <el-form-item label="value固定值:" prop="value2" label-width="110px" >
                                <el-input v-model="forms.value2" placeholder="请输入固定值" style="width: 90px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="unit" prop="unit2" label-width="70px" >
                                <el-input v-model="forms.unit2" placeholder="请输入unit" style="width: 130px;"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <!-- <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="timestamp" prop="timestamp2" label-width="90px" >
                                <el-input v-model="forms.timestamp2" placeholder="请输入timestamp" style="width: 110px;" readonly/>
                              </el-form-item>
                            </div>
                          </el-row> -->
                          <el-row v-if="!this.forms.value2">
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="value最小值:" prop="min2" label-width="110px" >
                                <el-input v-model="forms.min2" placeholder="请输入最小值" style="width: 90px;" :disabled="!formsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row v-if="!this.forms.value2">
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
          <el-tab-pane label="数据上传" name="third">

            <el-form ref="fastforms" :model="fastforms" :rules="fastformsRules" label-width="90px">
              <el-row>
                <el-col :span="7" style="border-right: 1px solid #ccc;height: 630px;">
                  <!-- <el-row>
                    <div style="width: 200px;margin: 0 auto;">
                      <el-button size="small" @click="creatEquipment" :disabled="!fastformsStatus">新增设备</el-button>
                    </div>
                  </el-row> -->

                  <el-row>
                    <div style="width: 200px;margin: 0 auto;">
                      <!-- <span style="display: inline-block;margin-bottom: 10px;">tenant_id: {{fastforms.tenant_id}}</span> -->
                      <el-form-item label="tenant_id:" prop="tenant_id" >
                        <el-input v-model.number="fastforms.tenant_id" placeholder="请输入tenant_id" style="width: 100px;" :disabled="!fastformsStatus"/>
                      </el-form-item>
                    </div>

                  </el-row>

                  <div>
                    <el-row>
                      <div style="width: 300px;margin: 0 auto;">
                        <el-form-item label="起始时间:" prop="start">
                          <el-date-picker
                            v-model="fastforms.start"
                            style="width: 200px;"
                            type="datetime"
                            placeholder="选择时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            default-time="12:00:00">
                          </el-date-picker>
                        </el-form-item>
                      </div>
                    </el-row>
                  </div>
                  <div>
                    <el-row>
                      <div style="width: 300px;margin: 0 auto;">
                        <el-form-item label="起始timestamp:" prop="timestamp1" label-width="140px">
                          <el-input v-model.number="fastforms.timestamp1" placeholder="请输入起始timestamp" style="width: 150px;" disabled />
                        </el-form-item>
                      </div>
                    </el-row>
                  </div>

                  <div>
                    <el-row>
                      <div style="width: 300px;margin: 0 auto;">
                        <el-form-item label="中止时间:" prop="end">
                          <el-date-picker
                            v-model="fastforms.end"
                            style="width: 200px;"
                            type="datetime"
                            placeholder="选择时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            default-time="12:00:00">
                          </el-date-picker>
                        </el-form-item>
                      </div>
                    </el-row>
                  </div>
                  <div>
                    <el-row>
                      <div style="width: 300px;margin: 0 auto;">
                        <el-form-item label="中止timestamp:" prop="timestamp2" label-width="140px">
                          <el-input v-model.number="fastforms.timestamp2" placeholder="请输入中止timestamp" style="width: 150px;" disabled/>
                        </el-form-item>
                      </div>
                    </el-row>
                  </div>

                  <div>
                    <el-row style="margin-bottom: 20px;">
                      <div style="width: 200px;margin: 0 auto;">
                        <el-form-item label="时间间隔:" prop="interval">
                          <el-input v-model.number="fastforms.interval" placeholder="请输入时间间隔" style="width: 100px;" :disabled="!fastformsStatus"/>
                        </el-form-item>
                      </div>
                    </el-row>
                  </div>

                  <el-row>
                    <div style="width: 200px;margin: 0 auto;">
                      <el-button size="small" @click="fastformsPublish" :disabled="!fastformsStatus">发布信息</el-button>
                      <el-button size="small" @click="fastformsStopPublish">中止发布</el-button>
                    </div>
                  </el-row>
                </el-col>
                <el-col :span="17">
                  <el-scrollbar style="height:630px;padding-left: 20px;">
                    <div style="width: 100%;height: 620px;margin-bottom: 10px;box-sizing: border-box;border: 1px solid #ccc ;">
                      <el-row>
                        <el-col :span="8" style="height: 620px;box-sizing: border-box;border-right: 1px solid #ccc ;padding-top: 5px;">
                          <el-row style="margin-bottom: 10px;">
                            <!-- 设备：cnc_100 -->
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="device_id" prop="device_id1" label-width="70px" >
                                <el-input v-model="fastforms.device_id1" placeholder="请输入device_id" style="width: 130px;" :disabled="!fastformsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="data_id" prop="data_id1" label-width="70px" >
                                <el-input v-model="fastforms.data_id1" placeholder="请输入data_id" style="width: 130px;" :disabled="!fastformsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="value固定值:" prop="value1" label-width="110px" >
                                <el-input v-model="fastforms.value1" placeholder="请输入固定值" style="width: 90px;" :disabled="!fastformsStatus" />
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="unit" prop="unit1" label-width="70px" >
                                <el-input v-model="fastforms.unit1" placeholder="请输入unit" style="width: 130px;"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <!-- <el-row>
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="timestamp" prop="timestamp1" label-width="90px" >
                                <el-input v-model="fastforms.timestamp1" placeholder="请输入timestamp" style="width: 110px;" readonly/>
                              </el-form-item>
                            </div>
                          </el-row> -->

                          <el-row v-if="!this.fastforms.value1">
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="value最小值:" prop="min1" label-width="110px" >
                                <el-input v-model="fastforms.min1" placeholder="请输入最小值" style="width: 90px;" :disabled="!fastformsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                          <el-row v-if="!this.fastforms.value1">
                            <div style="width: 200px;margin: 0 auto;">
                              <el-form-item label="value最大值:" prop="max1" label-width="110px" >
                                <el-input v-model="fastforms.max1" placeholder="请输入最大值" style="width: 90px;" :disabled="!fastformsStatus"/>
                              </el-form-item>
                            </div>
                          </el-row>
                        </el-col>
                        <el-col :span="16">
                          <el-scrollbar style="height:610px;word-wrap: break-word;">
                            <el-row style="margin-bottom: 10px;">
                              发布状态：
                              <span v-html="fastforms.status1"></span>
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
          <el-tab-pane label="模拟服务器传送数据" name="fourth">
            <el-button @click="fourthSend">发送</el-button>
          </el-tab-pane>  
        </el-tabs>
      </el-row>
    </div>


  </div>
</template>

<script>
import moment from'moment';
import { test } from "@/api/test";
export default {
  name: 'HelloWorld',
  data(){
    return {
      url: "",
      allform:{
        username: "admin",
        password: "a57754708",
        url: "ws://192.168.1.119:8083/mqtt",
      },
      allformrules:{
        username: [
          {required: true, message: "username不能为空", trigger: "blur"}
        ],
        password: [
          {required: true, message: "password不能为空", trigger: "blur"}
        ],
        url: [
          {required: true, message: "url不能为空", trigger: "blur"}
        ],
      },
      allstatus: true,

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

      forms: {
        num : "1",
        freqNum: "1",
        loop: "1",
        frequency:2,
        interval: 5,

        tenant_id: 1,
        "timestamp": moment().unix()*1000,

        "device_id1": "cnc_100",
        "data_id1": "state",
        "data_value1": 20,
        "value1": null,
        "unit1": "-",
        "timestamp1": moment().unix()*1000,
        min1:"10",
        max1:"20",
        status1:"未发布",

        "device_id2": "cnc_101",
        "data_id2": "temperature",
        "data_value2": 20,
        "value2": null,
        "unit2": "F",
        "timestamp2": moment().unix()*1000,
        min2:"0",
        max2:"100",
        status2:"未发布",
      },
      formsStatus:true,
      formCommonSome:false,
      fromsFrequencyShow: true,
      formsRules:{
        tenant_id: [
          {required: true, message: "tenant_id不能为空", trigger: "blur"}
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
        device_id1: [
          {required: true, message: "device_id不能为空", trigger: "blur"}
        ],
        data_id1: [
          {required: true, message: "data_id不能为空", trigger: "blur"}
        ],
        value1: [  
          { message: '请输入固定值', trigger: 'blur' },  
          { validator: this.validateValue, trigger: ['blur', 'change'] } 
        ],
        unit1: [
          {required: true, message: "unit不能为空", trigger: "blur"}
        ],
        timestamp1: [
          {required: true, message: "timestamp不能为空", trigger: "blur"}
        ],
        min1: [  
          { required: true, message: '请输入最小值', trigger: 'blur' },  
          { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        ],
        max1: [  
          { required: true, message: '请输入最大值', trigger: 'blur' },
          { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        ],

        device_id2: [
          {required: true, message: "device_id不能为空", trigger: "blur"}
        ],
        data_id2: [
          {required: true, message: "data_id不能为空", trigger: "blur"}
        ],
        value2: [  
          { message: '请输入固定值', trigger: 'blur' },  
          { validator: this.validateValue, trigger: ['blur', 'change'] } 
        ],
        unit2: [
          {required: true, message: "unit不能为空", trigger: "blur"}
        ],
        timestamp2: [
          {required: true, message: "timestamp不能为空", trigger: "blur"}
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
      formsSinglePublish2statusArray1:[],
      formsSinglePublish2statusArray2:[],

      fastforms: {
        interval: 5,

        tenant_id: 1,
        start: null,
        "timestamp1": null,
        end: null,
        "timestamp2": null,

        "device_id1": "cnc_100",
        "data_id1": "state",
        "data_value1": 20,
        "value1": null,
        "unit1": "-",
        min1:"10",
        max1:"20",
        status1:"未发布",
      },
      fastformsStatus:true,
      fastformsRules:{
        tenant_id: [
          {required: true, message: "tenant_id不能为空", trigger: "blur"}
        ],
        start: [
          {required: true, message: "起始时间不能为空", trigger: "blur"}
        ],
        interval: [  
          { required: true, message: '请输入时间间隔', trigger: 'blur' },  
          { type: 'number', message: '时间间隔必须是一个数字', trigger: ['blur', 'change'] },  
          { validator: this.validateFrequency, trigger: 'blur' }  
        ],
        device_id1: [
          {required: true, message: "device_id不能为空", trigger: "blur"}
        ],
        data_id1: [
          {required: true, message: "data_id不能为空", trigger: "blur"}
        ],
        value1: [  
          { message: '请输入固定值', trigger: 'blur' },  
          { validator: this.validateValue, trigger: ['blur', 'change'] } 
        ],
        unit1: [
          {required: true, message: "unit不能为空", trigger: "blur"}
        ],
        // start: [
        //   {required: true, message: "起始时间不能为空", trigger: "blur"}
        // ],
        min1: [  
          { required: true, message: '请输入最小值', trigger: 'blur' },  
          { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        ],
        max1: [  
          { required: true, message: '请输入最大值', trigger: 'blur' },
          { validator: this.validateNumber, trigger: ['blur', 'change'] } 
        ],

      },
      fastformsTimer: null,
      fastformsPublish2statusArray1:[],
    }
  },
  created() { 
    this.form.topic = this.computedTopic; 
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
      }else{
        this.forms.loop = "1";
        this.forms.frequency = 2;
        this.forms.interval = 5;
   
        this.formCommonSome = true;
      }
    },
    'forms.loop'(newVal, oldVal) {
      if(newVal=="1"){
        this.forms.frequency = 2;
        this.forms.interval = 5;
        this.fromsFrequencyShow = true;
      }else{
        this.forms.frequency = 1;
        this.forms.interval = 5;
        this.fromsFrequencyShow = false;

      }
    },
    'fastforms.start'(newVal, oldVal) {
      if(this.fastforms.start){
        this.fastforms.timestamp1 = moment(this.fastforms.start).unix()*1000
      }else{
        this.fastforms.timestamp1 = null;
      }
    },
    'fastforms.end'(newVal, oldVal) {
      if(this.fastforms.end){
        this.fastforms.timestamp2 = moment(this.fastforms.end).unix()*1000
      }else{
        this.fastforms.timestamp2 = null;
      }
    }
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
        if(this.creatMsgStatus&&this.formsStatus){
          if(oldActiveName=="first"){
            this.firstReset();
          }else if (oldActiveName=="second"){
            this.secondReset();
          }else if (oldActiveName=="third"){
            this.thirdReset();
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
    //验证固定值
    validateValue(rule, value, callback) {  
      if (!value) {  
        callback();  
      }  else{
        if (!/^[-+]?(\d+(\.\d{1,2})?)$/.test(value)) {  
          callback(new Error('数值必须是整数或小数（最多两位小数）'));  
        } else {  
          callback();  
        }  
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
              //   if(JSON.parse(that.form.message).timestamp>moment(that.form.stopTime).unix()*1000){
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
    changeFormsNum(num){
      var type = num;
      this.secondReset();
      if(type==1){
        this.forms.num = "1"
      }else{
        this.forms.num = "2"
      }
    },
    formsPublish1(){
  
      let that = this;
      this.$refs["forms"].validate(valid => {
        if (valid) {
          if(!(parseFloat(this.forms.min1)<parseFloat(this.forms.max1))){
            this.$alert(`${this.forms.device_id1}的最小值必须小于最大值`, '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          if(!(parseFloat(this.forms.min2)<parseFloat(this.forms.max2))){
            this.$alert(`${this.forms.device_id2}的最小值必须小于最大值`, '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          try{
            this.formsStatus = false;
            var topic1 = `moe/${this.forms.tenant_id}/cnc/${this.forms.device_id1}/data/general`;
            var topic2 = `moe/${this.forms.tenant_id}/cnc/${this.forms.device_id2}/data/general`;
            console.log("topic1:"+topic1)
            console.log("topic2:"+topic2)
            // topic = "client/dev/report"


            var qos = 1
            var n1 = false;
            var n2 = false;
       
            var params1 = {};
            if(this.forms.value1){
              params1 = {
                "tenant_id": this.forms.tenant_id,
                "device_id": this.forms.device_id1,
                "data_id": this.forms.data_id1,

                "data_value": this.forms.value1,

                "unit": this.forms.unit1,
                "timestamp": moment().unix()*1000
              }
            }else{
              //生成随机数
              let minValue1 = parseFloat(this.forms.min1);  
              let maxValue1= parseFloat(this.forms.max1); 
              let range1 = maxValue1 - minValue1; 
              let randomValue1 = Math.round((Math.random() * range1 + minValue1) * 100) / 100;
              params1 = {
                "tenant_id": this.forms.tenant_id,
                "device_id": this.forms.device_id1,
                "data_id": this.forms.data_id1,

                "data_value": randomValue1,

                "unit": this.forms.unit1,
                "timestamp": moment().unix()*1000
              }
            }
            var params2 = {};
            if(this.forms.value2){
              params2 = {
                "tenant_id": this.forms.tenant_id,
                "device_id": this.forms.device_id2,
                "data_id": this.forms.data_id2,

                "data_value": this.forms.value2,

                "unit": this.forms.unit2,
                "timestamp": moment().unix()*1000
              }
            }else{
              //生成随机数
              let minValue2 = parseFloat(this.forms.min2);  
              let maxValue2= parseFloat(this.forms.max2); 
              let range2 = maxValue2 - minValue2; 
              let randomValue2 = Math.round((Math.random() * range2 + minValue2) * 100) / 100;
              params2 = {
                "tenant_id": this.forms.tenant_id,
                "device_id": this.forms.device_id2,
                "data_id": this.forms.data_id2,

                "data_value": randomValue2,

                "unit": this.forms.unit2,
                "timestamp": moment().unix()*1000
              }
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
                // this.forms.status1 = "error:" + error
                var endWord = "error:" + error
                this.formsSinglePublish2statusArray1.push(endWord);
                this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
              }
            }); 
            that.$mqtt.publish(topic2, params2,{qos:qos},callBack2, (error) => {
              if (error) {
                // this.forms.status2 = "error:" + error
                var endWord = "error:" + error
                this.formsSinglePublish2statusArray2.push(endWord);
                this.forms.status2 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray2)).reverse().join('');
              }
            }); 

          }
          catch(error){
            // this.forms.status1 = "error:" + error
            var endWord = "error:" + error
            this.formsSinglePublish2statusArray1.push(endWord);
            this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
            // this.forms.status2 = "error:" + error
            var endWord = "error:" + error
            this.formsSinglePublish2statusArray2.push(endWord);
            this.forms.status2 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray2)).reverse().join('');
          }
        }
      });
    },
    formsPublish2(){
      let that = this;
      this.$refs["forms"].validate(valid => {
        if (valid) {
          if(!(parseFloat(this.forms.min1)<parseFloat(this.forms.max1))){
            this.$alert(`${this.forms.device_id1}的最小值必须小于最大值`, '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          if(!(parseFloat(this.forms.min2)<parseFloat(this.forms.max2))){
            this.$alert(`${this.forms.device_id2}的最小值必须小于最大值`, '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
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
            this.formsSinglePublish2statusArray1 = [];
            var callBack1 = ()=>{
              num++;
              // this.forms.status1 += "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj1)
              var one = "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj1);
              this.formsSinglePublish2statusArray1.push(one)
              this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
              if(n<that.forms.frequency&&(!this.formsStatus)){
                if(num%2==0){
                  this.formsTimer = setTimeout(pubilcMsg,that.forms.interval*1000)
                }
              }else{
                // this.forms.status1 += "<br>" + "发送完毕"
                var endWord = "<br>" + "发送完毕";
                this.formsSinglePublish2statusArray1.push(endWord);
                this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
                this.formsStatus = true;
              }
            }
            this.formsSinglePublish2statusArray2 = [];
            var callBack2 = ()=>{
              num++;
              // this.forms.status2 += "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj2)
              var one = "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj2);
              this.formsSinglePublish2statusArray2.push(one)
              this.forms.status2 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray2)).reverse().join('');

              if(n<that.forms.frequency&&(!this.formsStatus)){
                if(num%2==0){
                  this.formsTimer = setTimeout(pubilcMsg,that.forms.interval*1000)
                }
              }else{
                // this.forms.status2 += "<br>" + "发送完毕"
                var endWord = "<br>" + "发送完毕";
                this.formsSinglePublish2statusArray2.push(endWord);
                this.forms.status2 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray2)).reverse().join('');
                this.formsStatus = true;
              }
            }
            function sendMsg(){
              var params1 = {};
              if(that.forms.value1){
                params1 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id1,
                  "data_id": that.forms.data_id1,

                  "data_value": that.forms.value1,

                  "unit": that.forms.unit1,
                  "timestamp": moment().unix()*1000
                }
              }else{
                //生成随机数
                let minValue1 = parseFloat(that.forms.min1);  
                let maxValue1= parseFloat(that.forms.max1); 
                let range1 = maxValue1 - minValue1; 
                let randomValue1 = Math.round((Math.random() * range1 + minValue1) * 100) / 100;
                params1 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id1,
                  "data_id": that.forms.data_id1,

                  "data_value": randomValue1,

                  "unit": that.forms.unit1,
                  "timestamp": moment().unix()*1000
                }
              }
              obj1 = params1;
              var params2 = {};
              if(that.forms.value2){
                params2 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id2,
                  "data_id": that.forms.data_id2,

                  "data_value": that.forms.value2,

                  "unit": that.forms.unit2,
                  "timestamp": moment().unix()*1000
                }
              }else{
                //生成随机数
                let minValue2 = parseFloat(that.forms.min2);  
                let maxValue2= parseFloat(that.forms.max2); 
                let range2 = maxValue2 - minValue2; 
                let randomValue2 = Math.round((Math.random() * range2 + minValue2) * 100) / 100;
                params2 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id2,
                  "data_id": that.forms.data_id2,

                  "data_value": randomValue2,

                  "unit": that.forms.unit2,
                  "timestamp": moment().unix()*1000
                }
              }
              obj2 = params2;
              that.$mqtt.publish(topic1, params1,{qos:qos},callBack1, (error) => {
                if (error) {
                  // that.forms.status1 = "error:" + error
                  var endWord = "error:" + error
                  that.formsSinglePublish2statusArray1.push(endWord);
                  that.forms.status1 = JSON.parse(JSON.stringify(that.formsSinglePublish2statusArray1)).reverse().join('');
                }
              }); 
              that.$mqtt.publish(topic2, params2,{qos:qos},callBack2, (error) => {
                if (error) {
                  // that.forms.status2 = "error:" + error
                  var endWord = "error:" + error
                  that.formsSinglePublish2statusArray2.push(endWord);
                  that.forms.status2 = JSON.parse(JSON.stringify(that.formsSinglePublish2statusArray2)).reverse().join('');
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
            // this.forms.status1 = "error:" + error
            var endWord = "error:" + error
            this.formsSinglePublish2statusArray1.push(endWord);
            this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
            // this.forms.status2 = "error:" + error
            var endWord = "error:" + error
            this.formsSinglePublish2statusArray2.push(endWord);
            this.forms.status2 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray2)).reverse().join('');
          }
        }
      });
    },
    formsPublish3(){
      let that = this;
      this.$refs["forms"].validate(valid => {
        if (valid) {
          if(!(parseFloat(this.forms.min1)<parseFloat(this.forms.max1))){
            this.$alert(`${this.forms.device_id1}的最小值必须小于最大值`, '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          if(!(parseFloat(this.forms.min2)<parseFloat(this.forms.max2))){
            this.$alert(`${this.forms.device_id2}的最小值必须小于最大值`, '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
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
            this.formsSinglePublish2statusArray1 = [];
            var callBack1 = ()=>{
              num++;
              // this.forms.status1 += "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj1)
              var one = "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj1);
              this.formsSinglePublish2statusArray1.push(one)
              this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');

              if(!this.formsStatus){
                if(num%2==0){
                  this.formsTimer = setTimeout(pubilcMsg,that.forms.interval*1000)
                }
              }else{
                // this.forms.status1 += "<br>" + "发送完毕"
                var endWord = "<br>" + "发送完毕";
                this.formsSinglePublish2statusArray1.push(endWord);
                this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
                this.formsStatus = true;
              }
            }
            this.formsSinglePublish2statusArray2 = [];
            var callBack2 = ()=>{
              num++;
              // this.forms.status2 += "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj2)
              var one = "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj2);
              this.formsSinglePublish2statusArray2.push(one)
              this.forms.status2 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray2)).reverse().join('');

              if(!this.formsStatus){
                if(num%2==0){
                  this.formsTimer = setTimeout(pubilcMsg,that.forms.interval*1000)
                }
              }else{
                // this.forms.status2 += "<br>" + "发送完毕"
                var endWord = "<br>" + "发送完毕";
                this.formsSinglePublish2statusArray2.push(endWord);
                this.forms.status2 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray2)).reverse().join('');
                this.formsStatus = true;
              }
            }
            function sendMsg(){
              var params1 = {};
              if(that.forms.value1){
                params1 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id1,
                  "data_id": that.forms.data_id1,

                  "data_value": that.forms.value1,

                  "unit": that.forms.unit1,
                  "timestamp": moment().unix()*1000
                }
              }else{
                //生成随机数
                let minValue1 = parseFloat(that.forms.min1);  
                let maxValue1= parseFloat(that.forms.max1); 
                let range1 = maxValue1 - minValue1; 
                let randomValue1 = Math.round((Math.random() * range1 + minValue1) * 100) / 100;
                params1 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id1,
                  "data_id": that.forms.data_id1,

                  "data_value": randomValue1,

                  "unit": that.forms.unit1,
                  "timestamp": moment().unix()*1000
                }
              }
              obj1 = params1;
              var params2 = {};
              if(that.forms.value2){
                params2 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id2,
                  "data_id": that.forms.data_id2,

                  "data_value": that.forms.value2,

                  "unit": that.forms.unit2,
                  "timestamp": moment().unix()*1000
                }
              }else{
                //生成随机数
                let minValue2 = parseFloat(that.forms.min2);  
                let maxValue2= parseFloat(that.forms.max2); 
                let range2 = maxValue2 - minValue2; 
                let randomValue2 = Math.round((Math.random() * range2 + minValue2) * 100) / 100;
                params2 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id2,
                  "data_id": that.forms.data_id2,

                  "data_value": randomValue2,

                  "unit": that.forms.unit2,
                  "timestamp": moment().unix()*1000
                }
              }
              obj2 = params2;
              that.$mqtt.publish(topic1, params1,{qos:qos},callBack1, (error) => {
                if (error) {
                  // that.forms.status1 = "error:" + error
                  var endWord = "error:" + error
                  that.formsSinglePublish2statusArray1.push(endWord);
                  that.forms.status1 = JSON.parse(JSON.stringify(that.formsSinglePublish2statusArray1)).reverse().join('');
                }
              }); 
              that.$mqtt.publish(topic2, params2,{qos:qos},callBack2, (error) => {
                if (error) {
                  // that.forms.status2 = "error:" + error
                  var endWord = "error:" + error
                  that.formsSinglePublish2statusArray2.push(endWord);
                  that.forms.status2 = JSON.parse(JSON.stringify(that.formsSinglePublish2statusArray2)).reverse().join('');
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
            // this.forms.status1 = "error:" + error
            var endWord = "error:" + error
            this.formsSinglePublish2statusArray1.push(endWord);
            this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
            // this.forms.status2 = "error:" + error
            var endWord = "error:" + error
            this.formsSinglePublish2statusArray2.push(endWord);
            this.forms.status2 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray2)).reverse().join('');
          }
        }
      });
    },
    formsSinglePublish1(){
      let that = this;
      this.$refs["forms"].validate(valid => {
        if (valid) {
          if(!(parseFloat(this.forms.min1)<parseFloat(this.forms.max1))){
            this.$alert(`${this.forms.device_id1}的最小值必须小于最大值`, '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          try{
            this.formsStatus = false;
            var topic1 = `moe/${this.forms.tenant_id}/cnc/${this.forms.device_id1}/data/general`;
            console.log("topic1:"+topic1)
            // topic = "client/dev/report"
            var params1 = {};
            if(this.forms.value1){
              params1 = {
                "tenant_id": this.forms.tenant_id,
                "device_id": this.forms.device_id1,
                "data_id": this.forms.data_id1,

                "data_value": this.forms.value1,

                "unit": this.forms.unit1,
                "timestamp": moment().unix()*1000
              }
            }else{
              //生成随机数
              let minValue1 = parseFloat(this.forms.min1);  
              let maxValue1= parseFloat(this.forms.max1); 
              let range1 = maxValue1 - minValue1; 
              let randomValue1 = Math.round((Math.random() * range1 + minValue1) * 100) / 100;
              params1 = {
                "tenant_id": this.forms.tenant_id,
                "device_id": this.forms.device_id1,
                "data_id": this.forms.data_id1,

                "data_value": randomValue1,

                "unit": this.forms.unit1,
                "timestamp": moment().unix()*1000
              }
            }


            var qos = 1
            var n1 = false;
            var callBack1 = ()=>{
              n1 = true;
              // this.singleStatus = "<br>" + "发送成功:" + that.forms.message
              that.forms.status1 = "<br>" + "发送成功:" + "<br>" +JSON.stringify(params1)
              that.formsStatus = true;
              
            }
            that.$mqtt.publish(topic1, params1,{qos:qos},callBack1, (error) => {
              if (error) {
                // this.forms.status1 = "error:" + error
                var endWord = "error:" + error
                this.formsSinglePublish2statusArray1.push(endWord);
                this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
              }
            }); 

          }
          catch(error){
            // this.forms.status1 = "error:" + error
            var endWord = "error:" + error
            this.formsSinglePublish2statusArray1.push(endWord);
            this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
          }
        }
      });
    },
    formsSinglePublish2(){
      let that = this;
      this.$refs["forms"].validate(valid => {
        if (valid) {
          if(!(parseFloat(this.forms.min1)<parseFloat(this.forms.max1))){
            this.$alert(`${this.forms.device_id1}的最小值必须小于最大值`, '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          try{
            if (this.formsTimer !== null) {  
              // 如果定时器已经启动，先取消它  
              clearTimeout(this.formsTimer);  
            }  
            this.formsStatus = false;
            var n = 0;
            that.forms.status1 = "";
            var topic1 = `moe/${that.forms.tenant_id}/cnc/${that.forms.device_id1}/data/general`;
            var qos = 1
            var num = 0;
            var obj1 = {};
            this.formsSinglePublish2statusArray1 = [];
            var callBack1 = ()=>{
              num++;
              var one = "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj1);
              this.formsSinglePublish2statusArray1.push(one)
              // this.forms.status1 += "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj1)
              this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
              if(n<that.forms.frequency&&(!this.formsStatus)){
                this.formsTimer = setTimeout(pubilcMsg,that.forms.interval*1000)
              }else{
                var endWord = "<br>" + "发送完毕";
                this.formsSinglePublish2statusArray1.push(endWord);
                this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
                // this.forms.status1 += "<br>" + "发送完毕"
                this.formsStatus = true;

              }
            }
            function sendMsg(){
              var params1 = {};
              if(that.forms.value1){
                params1 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id1,
                  "data_id": that.forms.data_id1,

                  "data_value": that.forms.value1,

                  "unit": that.forms.unit1,
                  "timestamp": moment().unix()*1000
                }
              }else{
                //生成随机数
                let minValue1 = parseFloat(that.forms.min1);  
                let maxValue1= parseFloat(that.forms.max1); 
                let range1 = maxValue1 - minValue1; 
                let randomValue1 = Math.round((Math.random() * range1 + minValue1) * 100) / 100;
                params1 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id1,
                  "data_id": that.forms.data_id1,

                  "data_value": randomValue1,

                  "unit": that.forms.unit1,
                  "timestamp": moment().unix()*1000
                }
              }
              obj1 = params1;
              that.$mqtt.publish(topic1, params1,{qos:qos},callBack1, (error) => {
                if (error) {
                  // that.forms.status1 = "error:" + error
                  var endWord = "error:" + error
                  that.formsSinglePublish2statusArray1.push(endWord);
                  that.forms.status1 = JSON.parse(JSON.stringify(that.formsSinglePublish2statusArray1)).reverse().join('');
                }
              }); 
            }
            function pubilcMsg(){
              if(n>0){
                that.forms.timestamp1 += that.form.interval*1000;
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
            // this.forms.status1 = "error:" + error
            var endWord = "error:" + error
            this.formsSinglePublish2statusArray1.push(endWord);
            this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
            // this.forms.status2 = "error:" + error
            var endWord = "error:" + error
            this.formsSinglePublish2statusArray2.push(endWord);
            this.forms.status2 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray2)).reverse().join('');
          }
        }
      });
    },
    formsSinglePublish3(){
      let that = this;
      this.$refs["forms"].validate(valid => {
        if (valid) {
          if(!(parseFloat(this.forms.min1)<parseFloat(this.forms.max1))){
            this.$alert(`${this.forms.device_id1}的最小值必须小于最大值`, '提示', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          try{
            if (this.formsTimer !== null) {  
              // 如果定时器已经启动，先取消它  
              clearTimeout(this.formsTimer);  
            }  
            this.formsStatus = false;
            var n = 0;
            that.forms.status1 = "";
            var topic1 = `moe/${that.forms.tenant_id}/cnc/${that.forms.device_id1}/data/general`;
            var qos = 1
            var num = 0;
            var obj1 = {};
            this.formsSinglePublish2statusArray1 = [];
            var callBack1 = ()=>{
              num++;
              // this.forms.status1 += "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj1)
              var one = "<br>" + `第${n}次发送成功:` +"<br>" +  JSON.stringify(obj1);
              this.formsSinglePublish2statusArray1.push(one)
              this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
              if(!this.formsStatus){
                this.formsTimer = setTimeout(pubilcMsg,that.forms.interval*1000)
              }else{
                var endWord = "<br>" + "发送完毕";
                this.formsSinglePublish2statusArray1.push(endWord);
                this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
                // this.forms.status1 += "<br>" + "发送完毕"
                this.formsStatus = true;
              }
            }
            function sendMsg(){
              var params1 = {};
              if(that.forms.value1){
                params1 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id1,
                  "data_id": that.forms.data_id1,

                  "data_value": that.forms.value1,

                  "unit": that.forms.unit1,
                  "timestamp": moment().unix()*1000
                }
              }else{
                //生成随机数
                let minValue1 = parseFloat(that.forms.min1);  
                let maxValue1= parseFloat(that.forms.max1); 
                let range1 = maxValue1 - minValue1; 
                let randomValue1 = Math.round((Math.random() * range1 + minValue1) * 100) / 100;
                params1 = {
                  "tenant_id": that.forms.tenant_id,
                  "device_id": that.forms.device_id1,
                  "data_id": that.forms.data_id1,

                  "data_value": randomValue1,

                  "unit": that.forms.unit1,
                  "timestamp": moment().unix()*1000
                }
              }
              obj1 = params1;
              that.$mqtt.publish(topic1, params1,{qos:qos},callBack1, (error) => {
                if (error) {
                  // that.forms.status1 = "error:" + error
                    var endWord = "error:" + error
                    that.formsSinglePublish2statusArray1.push(endWord);
                    that.forms.status1 = JSON.parse(JSON.stringify(that.formsSinglePublish2statusArray1)).reverse().join('');
                }
              }); 
            }
            function pubilcMsg(){
              if(n>0){
                that.forms.timestamp1 += that.form.interval*1000;
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
            // this.forms.status1 = "error:" + error
                var endWord = "error:" + error
                this.formsSinglePublish2statusArray1.push(endWord);
                this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
          }
        }
      });
    },
    formsPublish(){
      //单设备
      if(this.forms.num=="1"){
        //单独发送
        if(this.forms.freqNum=="1"){
          this.formsSinglePublish1();
        }else{
          //多次有限循环
          if(this.forms.loop=="1"){
            this.formsSinglePublish2();
          }else{
            this.formsSinglePublish3();
          }
        }
      }
      //多设备
      else{
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
      }
    },
    formsStopPublish(){
      if(this.forms.freqNum=="1"){
      }else{
        if (this.formsTimer !== null) {  
          clearTimeout(this.formsTimer);  
          this.formsTimer = null; // 清除定时器ID，防止重复清除  
          // this.forms.status1 += "<br>" + "中止发送"
          var endWord = "<br>" + "中止发送";
          this.formsSinglePublish2statusArray1.push(endWord);
          this.forms.status1 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray1)).reverse().join('');
          // this.forms.status2 += "<br>" + "中止发送"
          this.formsSinglePublish2statusArray2.push(endWord);
          this.forms.status2 = JSON.parse(JSON.stringify(this.formsSinglePublish2statusArray2)).reverse().join('');
          this.formsStatus = true;
        } 
      }
    },
    secondReset(){
      this.formsStopPublish();
      this.$refs.forms.resetFields();
      this.forms =  {
        num: "1",
        freqNum: "1",
        loop: "1",
        frequency:2,
        interval: 5,

        tenant_id: 1,
        "timestamp": moment().unix()*1000,

        device_id1: "cnc_100",
        "data_id1": "state",
        "data_value1": 20,
        "value1": null,
        "unit1": "-",
        min1:"10",
        max1:"20",
        status1:"未发布",

        device_id2: "cnc_101",
        "data_id2": "temperature",
        "data_value2": 20,
        "value2": null,
        "unit2": "F",
        min2:"0",
        max2:"100",
        status2:"未发布",
      }
    },
    // creatEquipment(){
    //   console.log(1)
    // },
    fastformsPublish(){
      let that = this;
      this.$refs["fastforms"].validate(valid => {
        if (valid) {
          try{
            if(moment(that.fastforms.start).unix()*1000>moment(that.fastforms.end).unix()*1000){
              this.$alert('起始时间必须早于中止时间', '提示', {
                confirmButtonText: '确定',
                callback: action => {}
              });
              return;
            }
            if (this.fastformsTimer !== null) {  
              // 如果定时器已经启动，先取消它  
              clearTimeout(this.fastformsTimer);  
            }  
            this.fastformsStatus = false;
            var result = {}
            this.fastformsPublish2statusArray1 = [];
            var callBack = ()=>{
          
              // this.fastforms.status1 += "<br>" + `第${n+1}次发送成功:` + JSON.stringify(result);
              var one = "<br>" + `第${n+1}次发送成功:` + JSON.stringify(result);
              this.fastformsPublish2statusArray1.push(one)
              this.fastforms.status1 = JSON.parse(JSON.stringify(this.fastformsPublish2statusArray1)).reverse().join('');

              if(!this.fastformsStatus&&loopBealoon){
                this.fastformsTimer = setTimeout(pubilcMsg,0)
              }else if(!this.fastformsStatus&&(!loopBealoon)){
                // this.fastforms.status1 += "<br>" + "已到时间，发送完毕"
                var endWord = "<br>" + "已到时间，发送完毕";
                this.fastformsPublish2statusArray1.push(endWord);
                this.fastforms.status1 = JSON.parse(JSON.stringify(this.fastformsPublish2statusArray1)).reverse().join('');
                this.fastformsStatus = true;
              }else{
                // this.fastforms.status1 += "<br>" + "发送完毕"
                var endWord = "<br>" + "发送完毕";
                this.fastformsPublish2statusArray1.push(endWord);
                this.fastforms.status1 = JSON.parse(JSON.stringify(this.fastformsPublish2statusArray1)).reverse().join('');
                this.fastformsStatus = true;
              }
            }
            var n = 0;
            var loopBealoon = true;
            that.fastforms.status1 = "";
            var topic = `moe/${that.fastforms.tenant_id}/cnc/${that.fastforms.device_id}/data/general`;
            var qos = 1
            function pubilcMsg(){
              var num = that.fastforms.timestamp1 + that.fastforms.interval*n*1000
              if(that.fastforms.end){
                if(num>moment(that.fastforms.end).unix()*1000){
                  loopBealoon = false;
                  // that.fastforms.status1 += "<br>" + "已到时间，发送完毕"
                  var endWord = "<br>" + "已到时间，发送完毕";
                  that.fastformsPublish2statusArray1.push(endWord);
                  that.fastforms.status1 = JSON.parse(JSON.stringify(that.fastformsPublish2statusArray1)).reverse().join('');
                  that.fastformsStatus = true;
                  return;
                }else{
                  loopBealoon = true;
                }
              }else{
                loopBealoon = true;
              }
              var obj = {}
              if(that.fastforms.value1){
                obj = {
                  "tenant_id": that.fastforms.tenant_id,
                  "device_id": that.fastforms.device_id1,
                  "data_id": that.fastforms.data_id1,

                  "data_value": that.fastforms.value1,

                  "unit": that.fastforms.unit1,
                  "timestamp": num
                };
              }else{
                //生成随机数
                // console.log(that.fastforms.min1)
                let minValue1 = parseFloat(that.fastforms.min1);  
                let maxValue1= parseFloat(that.fastforms.max1); 
                let range1 = maxValue1 - minValue1; 
                let randomValue1 = Math.round((Math.random() * range1 + minValue1) * 100) / 100;
                obj = {
                  "tenant_id": that.fastforms.tenant_id,
                  "device_id": that.fastforms.device_id1,
                  "data_id": that.fastforms.data_id1,

                  "data_value": randomValue1,

                  "unit": that.fastforms.unit1,
                  "timestamp": num
                };
              }
              result = obj;
              that.$mqtt.publish(topic,obj,{qos:qos},callBack, (error) => {
                if (error) {
                  var endWord = "error:" + error;
                  this.fastformsPublish2statusArray1.push(endWord);
                  this.fastforms.status1 = JSON.parse(JSON.stringify(this.fastformsPublish2statusArray1)).reverse().join('');
                  // this.fastforms.status1 = "error:" + error
                }
              }); 
              n++;

            }
            pubilcMsg();
          }
          catch(error){
            // this.fastforms.status1 = "error:" + error
            var endWord = "error:" + error;
            this.fastformsPublish2statusArray1.push(endWord);
            this.fastforms.status1 = JSON.parse(JSON.stringify(this.fastformsPublish2statusArray1)).reverse().join('');
          }
        }

      })
    },
    fastformsStopPublish(){
      if (this.fastformsTimer !== null) {  
        clearTimeout(this.fastformsTimer);  
        this.fastformsTimer = null; // 清除定时器ID，防止重复清除  
        // this.fastforms.status1 += "<br>" + "中止发送"
        
        var endWord = "<br>" + "中止发送";
        this.fastformsPublish2statusArray1.push(endWord);
        this.fastforms.status1 = JSON.parse(JSON.stringify(this.fastformsPublish2statusArray1)).reverse().join('');
        this.fastformsStatus = true;
      } 
    },
    thirdReset(){
      this.fastformsStopPublish();
      this.$refs.fastforms.resetFields();
      this.fastforms = {
        interval: 5,

        tenant_id: 1,
        start: null,
        "timestamp1": null,
        end: null,
        "timestamp2": null,

        "device_id1": "cnc_100",
        "data_id1": "state",
        "data_value1": 20,
        "value1": null,
        "unit1": "-",
        min1:"10",
        max1:"20",
        status1:"未发布",
      }
    },
    fourthSend(){
      test().then(response=>{
          console.log(response)
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ::v-deep .el-scrollbar__wrap{
    overflow-x: hidden!important;
  }
</style>
