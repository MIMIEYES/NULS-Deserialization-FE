<template>
  <div class="deserialization w1200">
    <div class="title">
      NULS 反序列化
      <span class="font10 fr">开发者:NULSd6HgV3H5FecBPdXiY7r9d9cQa79KhaezY(Pierreluo)</span>
      <i></i>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading">
      <el-tab-pane label="交易" name="first">
        <div class="fl w_f">
          <el-form :model="transactionForm" :rules="transactionRules" ref="transactionForm" label-width="110px"
                   class="tx_form">
            <el-form-item label="交易txHex" prop="txHex">
              <el-input type="textarea" v-model.trim="transactionForm.txHex" :rows="15">
              </el-input>
            </el-form-item>
            <el-form-item label="chainId" prop="chainId">
              <el-input v-model.number="transactionForm.chainId">
              </el-input>
            </el-form-item>
            <el-form-item label="地址前缀" prop="prdfix">
              <el-input v-model.trim="transactionForm.prdfix">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitTransaction('transactionForm')">点击反序列化</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="w_r fr" v-show="transactionValue">
          <json-viewer :value="transactionValue" :expand-depth="5" copyable boxed>
          </json-viewer>
        </div>
      </el-tab-pane>
      <el-tab-pane label="交易业务数据(txData)" name="second">
        <div class="fl w_f">
          <el-form :model="txDataForm" :rules="txDataRules" ref="txDataForm" label-width="110px" class="tx_form">
            <el-form-item label="交易txData" prop="txData">
              <el-input type="textarea" v-model.trim="txDataForm.txData" :rows="15">
              </el-input>
            </el-form-item>
            <el-form-item label="交易类型" prop="type">
              <el-select v-model="txDataForm.type" filterable placeholder="请选择交易类型">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="chainId" prop="chainId">
              <el-input v-model.number="txDataForm.chainId">
              </el-input>
            </el-form-item>
            <el-form-item label="地址前缀" prop="prdfix">
              <el-input v-model.trim="txDataForm.prdfix">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitTxData('txDataForm')">点击反序列化</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="w_r fr" v-show="txDataValue">
          <json-viewer :value="txDataValue" :expand-depth="5" copyable boxed>
          </json-viewer>
        </div>
      </el-tab-pane>
      <el-tab-pane label="交易hash查询详情" name="third">
        <div class="fl w_f">
          <el-form :model="hashForm" :rules="hashRules" ref="hashForm" label-width="110px" class="hash_form">
            <el-form-item label="接入网络" prop="network">
              <el-radio-group v-model="hashForm.network">
                <el-radio label="1">主网</el-radio>
                <el-radio label="2">测试网</el-radio>
                <el-radio label="3">其他</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="网络地址" prop="urls" v-if="hashForm.network ==='3'">
              <el-input v-model="hashForm.urls">
              </el-input>
            </el-form-item>
            <el-form-item label="交易hash" prop="hash">
              <el-input type="textarea" v-model.trim="hashForm.hash" :rows="5">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitHash('hashForm')">查询交易</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="w_r fr" v-show="hashValue">
          <json-viewer :value="hashValue" :expand-depth="5" copyable boxed>
          </json-viewer>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        loading: false,
        serializeUrl: 'http://localhost:9898/api/jsonrpc', //序列化url
        activeName: 'first',//tab选项

        //txHex
        transactionForm: {
          txHex: '',
          chainId: '',
          prdfix: '',
        },
        transactionRules: {
          txHex: [
            {required: true, message: '请输入txHex', trigger: 'blur'},
            {min: 30, max: 300000, message: 'txHex长度在 30 到 300000 个字符', trigger: 'blur'},
          ],
          chainId: [
            {required: true, message: '请输入chainID', trigger: 'blur'},
            {type: 'number', message: 'chainID必须为数字', trigger: 'blur'},
          ],
          prdfix: [
            {required: true, message: '请输入地址前缀', trigger: 'blur'},
          ],
        },
        transactionValue: {}, //查询数据

        //txData
        txDataForm: {
          txData: '',
          type: '',
          chainId: '',
          prdfix: '',
        },
        txDataRules: {
          txData: [
            {required: true, message: '请输入txData', trigger: 'blur'},
            {min: 10, max: 300000, message: 'txData长度在 10 到 300000 个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择交易类型', trigger: 'change'}
          ],
          chainId: [
            {required: true, message: '请输入chainID', trigger: 'blur'},
            {type: 'number', message: 'chainID必须为数字', trigger: 'blur'}
          ],
          prdfix: [
            {required: true, message: '请输入地址前缀', trigger: 'blur'}
          ],
        },
        txDataValue: {}, //查询数据
        typeOptions: [
          {value: 1, label: "1-共识奖励"},
          {value: 2, label: "2-转账交易"},
          {value: 3, label: "3-设置别名"},
          {value: 4, label: "4-创建节点"},
          {value: 5, label: "5-加入共识"},
          {value: 6, label: "6-退出共识"},
          {value: 7, label: "7-黄牌惩罚"},
          {value: 8, label: "8-红牌惩罚"},
          {value: 9, label: "9-注销节点"},
          {value: 10, label: "10-跨链交易"},
          {value: 11, label: "11-注册跨链"},
          {value: 12, label: "12-注销跨链"},
          {value: 13, label: "13-新增跨链资产"},
          {value: 14, label: "14-注销跨链资产"},
          {value: 15, label: "15-创建合约"},
          {value: 16, label: "16-调用合约"},
          {value: 17, label: "17-删除合约"},
          {value: 18, label: "18-合约转账"},
          {value: 19, label: "19-合约返还"},
          {value: 20, label: "20-合约创建节点"},
          {value: 21, label: "21合约参与共识"},
          {value: 22, label: "22-合约退出共识"},
          {value: 23, label: "23-合约注销节点"},
          {value: 24, label: "24-验证人变更"},
          {value: 25, label: "25-验证人初始化"},
        ],//类型列表

        //hashForm
        hashForm: {
          network: '',
          urls: '',
          hash: '',
        },
        hashRules: {
          network: [
            {required: true, message: '请选择网络接入', trigger: 'change'}
          ],
          urls: [
            {required: true, message: '请输入网络接入url', trigger: 'blur'},
          ],
          hash: [
            {required: true, message: '请输入交易hash', trigger: 'blur'},
            {min: 10, max: 100, message: '交易hash长度在 10 到 100 个字符', trigger: 'blur'}
          ],
        },
        hashValue: {}, //查询数据
        hashOptions: [
          {value: 1, label: "1-共识奖励"},
          {value: 2, label: "2-转账交易"},
          {value: 3, label: "3-设置别名"},
          {value: 4, label: "4-创建节点"},
          {value: 5, label: "5-加入共识"},
          {value: 6, label: "6-退出共识"},
          {value: 7, label: "7-黄牌惩罚"},
          {value: 8, label: "8-红牌惩罚"},
          {value: 9, label: "9-注销节点"},
          {value: 10, label: "10-跨链交易"},
          {value: 11, label: "11-注册跨链"},
          {value: 12, label: "12-注销跨链"},
          {value: 13, label: "13-新增跨链资产"},
          {value: 14, label: "14-注销跨链资产"},
          {value: 15, label: "15-创建合约"},
          {value: 16, label: "16-调用合约"},
          {value: 17, label: "17-删除合约"},
          {value: 18, label: "18-合约转账"},
          {value: 19, label: "19-合约返还"},
          {value: 20, label: "20-合约创建节点"},
          {value: 21, label: "21合约参与共识"},
          {value: 22, label: "22-合约退出共识"},
          {value: 23, label: "23-合约注销节点"},
          {value: 24, label: "24-验证人变更"},
          {value: 25, label: "25-验证人初始化"},
        ],//类型列表

      };
    },
    created() {
    },
    watch: {
      'transactionForm.chainId': function (newVal) {
        if (Number(newVal) === 1) {
          this.transactionForm.prdfix = 'NULS';
        } else if (Number(newVal) === 2) {
          this.transactionForm.prdfix = 'tNULS';
        } else {
          this.transactionForm.prdfix = '';
        }
      },
      'txDataForm.chainId': function (newVal) {
        if (Number(newVal) === 1) {
          this.txDataForm.prdfix = 'NULS';
        } else if (Number(newVal) === 2) {
          this.txDataForm.prdfix = 'tNULS';
        } else {
          this.txDataForm.prdfix = '';
        }
      },
      'hashForm.network': function (newVal) {
        if (Number(newVal) === 1) {
          this.hashForm.urls = 'https://api.nuls.io';
        } else if (Number(newVal) === 2) {
          this.hashForm.urls = 'https://beta.api.nuls.io';
        } else {
          this.hashForm.urls = 'http://localhost:18004';
        }
      },
    },
    methods: {

      /**
       * @disc: tab 切换
       * @params: tab
       * @date: 2019-12-23 14:28
       * @author: Wave
       */
      handleClick(tab) {
        if (tab.name === 'first') {
          this.$refs['txDataForm'].resetFields();
        } else if (tab.name === 'second') {
          this.$refs['transactionForm'].resetFields();
        }
        else {
          this.$refs['transactionForm'].resetFields();
        }
      },

      /**
       * @disc: txHex返序列化提交
       * @params: formName
       * @date: 2019-12-23 14:28
       * @author: Wave
       */
      submitTransaction(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.transactionValue = '';
            let url = this.serializeUrl;
            let data = [Number(this.transactionForm.chainId), this.transactionForm.txHex, this.transactionForm.prdfix];
            const params = {
              jsonrpc: "2.0",
              method: "deserializationTx",
              params: data,
              id: Math.floor(Math.random() * 1000)
            };
            this.getTransaction(url, params);
          } else {
            return false;
          }
        });
      },

      /**
       * @disc: txData返序列化提交
       * @params: formName
       * @date: 2019-12-23 14:28
       * @author: Wave
       */
      submitTxData(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.txDataValue = '';
            let url = this.serializeUrl;
            let data = [Number(this.txDataForm.chainId), this.txDataForm.type, this.txDataForm.txData, this.txDataForm.prdfix];
            const params = {
              jsonrpc: "2.0",
              method: "deserializationTxData",
              params: data,
              id: Math.floor(Math.random() * 1000)
            };
            this.getTransaction(url, params);
          } else {
            return false;
          }
        });
      },

      /**
       * @disc: hash查询提交
       * @params: formName
       * @date: 2019-12-23 14:28
       * @author: Wave
       */
      async submitHash(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.hashValue = '';
            let resultData = null;
            let url = '';
            let net = Number(this.hashForm.network);
            let addressPrefix = '';
            let chainId = net;
            if (net === 1) {
              url = 'https://api.nuls.io/api';
            } else if(net === 1) {
              url = 'http://beta.api.nuls.io/api';
            } else {
              let formUrl = this.hashForm.urls;
              let subfix = '/api';
              if(formUrl.substr(formUrl.length - 1, 1) === '/') {
                subfix = 'api';
              }
              url = formUrl + subfix;
              let infoResult = await this.get(url + '/info');
              if(infoResult.success) {
                addressPrefix = infoResult.data.addressPrefix;
                chainId = infoResult.data.chainId;
              }
            }

            let txResult = await this.get(url + '/tx/' + this.hashForm.hash);
            if(txResult.success) {
              resultData = txResult.data;
            }

            const params = {
              jsonrpc: "2.0",
              method: "deserializationTxData",
              params: [chainId, resultData.type, resultData.txDataHex, addressPrefix],
              id: Math.floor(Math.random() * 1000)
            };
            let txDataResult = await this.post(this.serializeUrl, params);
            if(txDataResult.success) {
              resultData.txData = txDataResult.data;
            }

            let contractResult = await this.get(url + '/contract/result/' + this.hashForm.hash);
            if(contractResult.success) {
              resultData.contractResult = contractResult.data;
            }

            this.loading = false;
            this.hashValue = resultData;
          } else {
            return false;
          }
        });
      },

      async get(curl) {
        return await this.getData(curl)
                .then((response) => {
                  return response;
                })
                .catch((error) => {
                  return {success: false, data: error};
                });
      },

      getData(url) {
        return new Promise((resolve, reject) => {
          axios.get(url)
                  .then(response => {
                    resolve(response.data)
                  }, err => {
                    reject(err)
                  })
        })
      },

      async post(url, params) {
        return await this.postData(url, params)
                .then((response) => {
                  if (response.hasOwnProperty("result")) {
                    return {success: true, data: response.result};
                  } else {
                    return {success: false, data: response.error};
                  }
                })
                .catch((error) => {
                  return {success: false, data: error};
                });
      },

      postData(url, params) {
        return new Promise((resolve, reject) => {
          axios.post(url, params)
                  .then(response => {
                    resolve(response.data)
                  }, err => {
                    reject(err)
                  })
        })
      },

      /**
       * @disc: 交易返序列化方法
       * @params: url,params
       * @date: 2019-12-23 14:29
       * @author: Wave
       */
      getTransaction(url, params) {
        //console.log(url, params);
        let that = this;
        axios.post(url, params)
          .then((response) => {
            //console.log(response);
            let responseData = {};
            if (response.data.hasOwnProperty("result")) {
              responseData = response.data.result
            } else {
              responseData = response.data;
            }
            if (this.activeName === 'first') {
              that.transactionValue = responseData;
            } else if (this.activeName === 'second') {
              that.txDataValue = responseData;
            } else {
              that.hashValue = responseData;
            }
            this.loading = false;
          })
          .catch((error) => {
            that.transactionValue = error;
            this.loading = false;
          });
      },

    }
  }
</script>

<style lang="less">
  .deserialization {
    .title {
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      .font10 {
        line-height: 50px;
      }
    }
    .w_f {
      width: 500px;
      min-height: 500px;
      margin: 20px 0 100px 0;
      .el-form {
        .el-form-item__label {
          line-height: 40px !important;
        }
      }
      .el-button--success {
        width: 390px;
        text-align: center;
        margin: 0 auto;
      }
    }
    .w_r {
      width: 880px;
      height: 720px;
      border: 1px solid #c0c4cc;
      overflow: auto;
      .jv-container {
        .boxed {
          max-height: 880px;
        }
      }
    }
  }
</style>
