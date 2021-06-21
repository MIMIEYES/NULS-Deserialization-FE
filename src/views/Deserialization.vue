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
          <json-viewer :value="transactionValue" :expand-depth="5" copyable>
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
          <json-viewer :value="txDataValue" :expand-depth="5" copyable>
          </json-viewer>
        </div>
      </el-tab-pane>
      <el-tab-pane label="交易hash查询详情" name="third">
        <div class="fl w_f">
          <el-form :model="hashForm" :rules="hashRules" ref="hashForm" label-width="110px" class="hash_form">
            <el-form-item label="接入网络" prop="network">
              <el-radio-group v-model="hashForm.network">
                <el-radio label="1">NULS主网&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
                <el-radio label="2">NULS测试网&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
                <el-radio label="9">Nerve主网&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
                <el-radio label="5">Nerve测试网&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
                <el-radio label="99">其他&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="网络地址" prop="urls" v-if="hashForm.network ==='99'">
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
          <json-viewer :value="hashValue" :expand-depth="5" copyable>
          </json-viewer>
        </div>
      </el-tab-pane>
      <el-tab-pane label="无常损失计算" name="four">
        <div class="fl w_f">
          <el-form :model="swapForm" :rules="swapRules" ref="swapForm" label-width="110px" class="swap_form">
            <el-form-item label="流动性池" prop="pool" >
              <el-input v-model="swapForm.pool" :readonly="true" >NULS-USD</el-input>
              <!--NULS-USD-->
            </el-form-item>
            <el-form-item label="接入网络" prop="swap">
              <el-radio-group v-model="swapForm.swap">
                <el-radio label="1">Pancake Swap</el-radio>
                <el-radio label="2">Mdex Swap</el-radio>
                <el-radio label="3">Dodo Swap</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="账户地址" prop="account" >
              <el-input v-model="swapForm.account" />
            </el-form-item>
            <el-form-item label="账户别名(选填)" prop="alias" >
              <el-input v-model="swapForm.alias" />
            </el-form-item>
            <el-form-item :label="`总投入 ${swapForm.name}`" prop="nulsAmount">
              <el-input v-model.trim="swapForm.nulsAmount" />
            </el-form-item>
            <el-form-item label="总投入 USD" prop="usdAmount">
              <el-input v-model.trim="swapForm.usdAmount" />
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitSwap('swapForm')">查询无常损失</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="w_r fr" v-show="swapValue">
          <json-viewer :value="swapValue" :expand-depth="5" copyable>
          </json-viewer>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import axios from 'axios'
  // import ethers from 'ethers'
  let ethers = require('ethers');

  export default {
    data() {
      return {
        loading: false,
        serializeUrl: '/api/jsonrpc', //序列化url
        // serializeUrl: 'http://localhost:9898/api/jsonrpc', //序列化url
        activeName: 'first',//tab选项

        //ethers settings
        ethersSetting: {
          farmAbiFragment: [
            {"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"}
          ],
          lpAbiFragment: [
            {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
            {"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"}
          ],
          dodoLpAbiFragment: [
            {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"increaseShares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalShares","type":"uint256"}],"name":"BuyShares","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"address","name":"assetTo","type":"address"},{"indexed":false,"internalType":"uint256","name":"baseAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"quoteAmount","type":"uint256"}],"name":"DODOFlashLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"fromToken","type":"address"},{"indexed":false,"internalType":"address","name":"toToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"fromAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"}],"name":"DODOSwap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"decreaseShares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalShares","type":"uint256"}],"name":"SellShares","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BASE_PRICE_CUMULATIVE_LAST_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BASE_RESERVE_","outputs":[{"internalType":"uint112","name":"","type":"uint112"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BASE_TOKEN_","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BLOCK_TIMESTAMP_LAST_","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_IS_OPEN_TWAP_","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_I_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_K_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_LP_FEE_RATE_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_MAINTAINER_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_MT_FEE_RATE_MODEL_","outputs":[{"internalType":"contract IFeeRateModel","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_QUOTE_RESERVE_","outputs":[{"internalType":"uint112","name":"","type":"uint112"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_QUOTE_TOKEN_","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"addressToShortString","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"buyShares","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"baseInput","type":"uint256"},{"internalType":"uint256","name":"quoteInput","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseAmount","type":"uint256"},{"internalType":"uint256","name":"quoteAmount","type":"uint256"},{"internalType":"address","name":"assetTo","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flashLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBaseInput","outputs":[{"internalType":"uint256","name":"input","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMidPrice","outputs":[{"internalType":"uint256","name":"midPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPMMState","outputs":[{"components":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"K","type":"uint256"},{"internalType":"uint256","name":"B","type":"uint256"},{"internalType":"uint256","name":"Q","type":"uint256"},{"internalType":"uint256","name":"B0","type":"uint256"},{"internalType":"uint256","name":"Q0","type":"uint256"},{"internalType":"enum PMMPricing.RState","name":"R","type":"uint8"}],"internalType":"struct PMMPricing.PMMState","name":"state","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPMMStateForCall","outputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"K","type":"uint256"},{"internalType":"uint256","name":"B","type":"uint256"},{"internalType":"uint256","name":"Q","type":"uint256"},{"internalType":"uint256","name":"B0","type":"uint256"},{"internalType":"uint256","name":"Q0","type":"uint256"},{"internalType":"uint256","name":"R","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getQuoteInput","outputs":[{"internalType":"uint256","name":"input","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserFeeRate","outputs":[{"internalType":"uint256","name":"lpFeeRate","type":"uint256"},{"internalType":"uint256","name":"mtFeeRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVaultReserve","outputs":[{"internalType":"uint256","name":"baseReserve","type":"uint256"},{"internalType":"uint256","name":"quoteReserve","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"maintainer","type":"address"},{"internalType":"address","name":"baseTokenAddress","type":"address"},{"internalType":"address","name":"quoteTokenAddress","type":"address"},{"internalType":"uint256","name":"lpFeeRate","type":"uint256"},{"internalType":"address","name":"mtFeeRateModel","type":"address"},{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"k","type":"uint256"},{"internalType":"bool","name":"isOpenTWAP","type":"bool"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"uint256","name":"payBaseAmount","type":"uint256"}],"name":"querySellBase","outputs":[{"internalType":"uint256","name":"receiveQuoteAmount","type":"uint256"},{"internalType":"uint256","name":"mtFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"uint256","name":"payQuoteAmount","type":"uint256"}],"name":"querySellQuote","outputs":[{"internalType":"uint256","name":"receiveBaseAmount","type":"uint256"},{"internalType":"uint256","name":"mtFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"sellBase","outputs":[{"internalType":"uint256","name":"receiveQuoteAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"sellQuote","outputs":[{"internalType":"uint256","name":"receiveBaseAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"shareAmount","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"baseMinAmount","type":"uint256"},{"internalType":"uint256","name":"quoteMinAmount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"sellShares","outputs":[{"internalType":"uint256","name":"baseAmount","type":"uint256"},{"internalType":"uint256","name":"quoteAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}
          ],
          dodoFarmAbiFragment: [
            {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"address","name":"rewardToken","type":"address"}],"name":"NewRewardToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferPrepared","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardToken","type":"address"}],"name":"RemoveRewardToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"UpdateEndBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"UpdateReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"i","type":"uint256"}],"name":"WithdrawLeftOver","type":"event"},{"inputs":[],"name":"_NEW_OWNER_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_OWNER_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_TOKEN_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"rewardToken","type":"address"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"addRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimAllRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"rewardToken","type":"address"}],"name":"getIdByRewardToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getPendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"rewardToken","type":"address"}],"name":"getPendingRewardByToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getRewardTokenById","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"initOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"rewardToken","type":"address"}],"name":"removeRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokenInfos","outputs":[{"internalType":"address","name":"rewardToken","type":"address"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"endBlock","type":"uint256"},{"internalType":"address","name":"rewardVault","type":"address"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"newEndBlock","type":"uint256"}],"name":"setEndBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"newRewardPerBlock","type":"uint256"}],"name":"setReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawLeftOver","outputs":[],"stateMutability":"nonpayable","type":"function"}
          ]
        },
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
          {value: 40, label: "40-确认虚拟银行变更"},
          {value: 41, label: "41-虚拟银行变更"},
          {value: 42, label: "42-跨链转入"},
          {value: 43, label: "43-跨链转出"},
          {value: 44, label: "44-确认提现成功"},
          {value: 45, label: "45-发起提案"},
          {value: 46, label: "46-提案投票"},
          {value: 47, label: "47-异构链交易手续费补贴"},
          {value: 48, label: "48-虚拟银行初始化异构链"},
          {value: 49, label: "49-异构链合约资产注册"},
          {value: 50, label: "50-异构链合约资产注册完成"},
          {value: 51, label: "51-确认提案执行交易"},
          {value: 52, label: "52-重置异构链(合约)虚拟银行"},
          {value: 53, label: "53-确认重置异构链(合约)虚拟银行"},
          {value: 56, label: "56-追加手续费"},
          {value: 61, label: "61-创建Swap交易对"},
          {value: 62, label: "62-创建挖矿池"},
          {value: 63, label: "63-Swap交易"},
          {value: 64, label: "64-添加流动性"},
          {value: 65, label: "65-撤销流动性"},
          {value: 66, label: "66-质押挖矿"},
          {value: 67, label: "67-退出质押"},
          {value: 71, label: "71-创建稳定币Pair"},
          {value: 72, label: "72-Swap稳定币交易"},
          {value: 73, label: "73-添加稳定币流动性"},
          {value: 74, label: "74-撤销稳定币流动性"},

        ],//类型列表

        //hashForm
        hashForm: {
          network: '1',
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
        hashOptions: this.typeOptions,//类型列表

        //swapForm
        swapForm: {
          name: 'NULS',
          pool: 'NULS-USD',
          swap: '1',
          nulsPrice: 0,
          account: '',
          alias: '',
          nulsAmount: '0',
          usdAmount: '0',
          rpc: 'https://bsc-dataseed.binance.org/'
        },
        swapRules: {
          swap: [
            {required: true, message: '请选择Swap接入', trigger: 'blur'}
          ],
          nulsPrice: [
            {required: true, message: '请输入NULS价格', trigger: 'blur'},
          ],
          account: [
            {required: true, message: '请输入账户地址', trigger: 'blur'},
          ],
          nulsAmount: [
            {required: true, message: '请输入总投入的NULS', trigger: 'blur'},
          ],
          usdAmount: [
            {required: true, message: '请输入总投入的USD', trigger: 'blur'},
          ]
        },
        swapValue: {}, //查询数据
        mdex: {
          farmsContract: '0xfb03e11d93632d97a8981158a632dd5986f5e909',
          lpContract: '0x6443099559de3204bb3a4b128b641f8879df838f',
          NULS_BUSD_ID: 83,
          nulsIndex: 1
        },
        pancake: {
          farmsContract: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
          lpContract: '0x853784b7bde87d858555715c0123374242db7943',
          NULS_BUSD_ID: 319,
          nulsIndex: 0
        },
        dodo: {
          farmsContract: '0x0cF35405C60d8a6BEa71C88461D0dE7B4fD7d552',
          lpContract: '0x1Eb7d209D36C4527Cc5f0e94e4d3C2dCF96570BE',
          nulsIndex: 0
        }
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
        } else if (Number(newVal) === 9) {
          this.transactionForm.prdfix = 'NERVE';
        } else if (Number(newVal) === 5) {
          this.transactionForm.prdfix = 'TNVT';
        } else {
          this.transactionForm.prdfix = '';
        }
      },
      'txDataForm.chainId': function (newVal) {
        if (Number(newVal) === 1) {
          this.txDataForm.prdfix = 'NULS';
        } else if (Number(newVal) === 2) {
          this.txDataForm.prdfix = 'tNULS';
        } else if (Number(newVal) === 9) {
          this.txDataForm.prdfix = 'NERVE';
        } else if (Number(newVal) === 5) {
          this.txDataForm.prdfix = 'TNVT';
        } else {
          this.txDataForm.prdfix = '';
        }
      },
      'hashForm.network': function (newVal) {
        if (Number(newVal) === 1) {
          this.hashForm.urls = 'https://api.nuls.io';
        } else if (Number(newVal) === 2) {
          this.hashForm.urls = 'http://beta.api.nuls.io';
        } else if (Number(newVal) === 9) {
          this.hashForm.urls = 'https://api.nerve.network';
        } else if (Number(newVal) === 5) {
          this.hashForm.urls = 'http://beta.api.nerve.network';
        } else {
          this.hashForm.urls = 'http://localhost:18004';
        }
      },
      'swapForm.swap': function (newVal) {
        if (Number(newVal) === 1) {
          this.swapForm.rpc = 'https://bsc-dataseed.binance.org/';
          this.swapForm.pool = 'NULS-USD';
          this.swapForm.name = 'NULS';
        } else if (Number(newVal) === 2) {
          this.swapForm.rpc = 'https://http-mainnet.hecochain.com';
          this.swapForm.pool = 'NULS-USD';
          this.swapForm.name = 'NULS';
        } else if (Number(newVal) === 3) {
          this.swapForm.rpc = 'https://bsc-dataseed.binance.org/';
          this.swapForm.pool = 'NVT-USD';
          this.swapForm.name = 'NVT';
        } else {
          this.swapForm.rpc = '';
          this.swapForm.pool = '';
          this.swapForm.name = '';
        }
        this.swapForm.account = '';
        this.swapForm.nulsAmount = '';
        this.swapForm.usdAmount = '';
        this.swapForm.alias = '';
        this.swapForm.nulsPrice = '';
      },
      'swapForm.account': function (newVal) {
        this.swapForm.nulsAmount = this.$cookies.get(newVal+'_nuls_'+this.swapForm.swap);
        this.swapForm.usdAmount = this.$cookies.get(newVal+'_usd_'+this.swapForm.swap);
      },
      'swapForm.alias': function (newVal) {
        let address = this.$cookies.get('swap_'+newVal);
        if (address) {
          this.swapForm.account = address;
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
          // this.$refs['txDataForm'].resetFields();
        } else if (tab.name === 'second') {
          // this.$refs['transactionForm'].resetFields();
        } else if (tab.name === 'four'){
          // this.getNulsPrice();
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
            let done = false;
            do {
              if (net === 1) {
                url = 'https://api.nuls.io/api';
              } else if(net === 2) {
                url = 'http://beta.api.nuls.io/api';
              } else if(net === 9) {
                url = 'https://api.nerve.network/api';
              } else if(net === 5) {
                url = 'http://beta.api.nerve.network/api';
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
                } else {
                  resultData = infoResult;
                  break;
                }
              }

              let txResult = await this.get(url + '/tx/' + this.hashForm.hash);
              if(txResult.success) {
                resultData = txResult.data;
              } else {
                  resultData = txResult;
                  break;
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

            } while (done);
            this.loading = false;
            this.hashValue = resultData;
          } else {
            return false;
          }
        });
      },

      async getNulsPrice() {
        //查询nuls的usd价格
        const params = {
          jsonrpc: "2.0",
          method: "getSymbolInfo",
          params: [1, 1],
          id: Math.floor(Math.random() * 1000)
        };
        let nulsSymbolResult = await this.post('https://public.nerve.network/', params);
        if(nulsSymbolResult.success) {
          this.swapForm.nulsPrice = nulsSymbolResult.data.usdPrice;
        }
      },

      async submitSwap(formName) {

        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let result = {
              _00: '', _01: '', _02: '', _03: '', _04: '', _05: '', _06: '', _07: '', _08: '', _09: '', _10: '', _11: '', _12: ''
            };
            this.swapValue = '';
            // let url = 'https://bsc-dataseed.binance.org/';
            // if (this.swapForm.swap === '2') {
            //   url = 'https://http-mainnet.hecochain.com';
            // }
            let dataSwap = this.pancake;
            if (this.swapForm.swap === '2') {
              dataSwap = this.mdex;
            } else if (this.swapForm.swap === '3') {
              dataSwap = this.dodo;
            }
            let url = this.swapForm.rpc;
            let provider = new ethers.providers.JsonRpcProvider(url);
            let userAddress = this.swapForm.account;
            let farmsContract = dataSwap.farmsContract;
            let lpContract = dataSwap.lpContract;
            let nulsIndex = dataSwap.nulsIndex;
            let myNuls = this.swapForm.nulsAmount;
            let myBusd = this.swapForm.usdAmount;
            let zero = new ethers.utils.BigNumber('0');

            if (this.swapForm.swap === '1' || this.swapForm.swap === '2') {
              let NULS_BUSD_ID = dataSwap.NULS_BUSD_ID;
              let myLp = await this.getUserLp(farmsContract, NULS_BUSD_ID, userAddress, provider);
              if (zero.eq(myLp)) {
                this.swapValue = {error: "此账户无效"};
                return false;
              }
              result._01 = "我的LP（流动性份额）: " + ethers.utils.formatEther(myLp);
              let totalSupply = await this.getTotalSupplyOfLp(lpContract, provider);
              result._02 = "LP总流通量: " + ethers.utils.formatEther(totalSupply);
              let yz = new ethers.utils.BigNumber(ethers.utils.parseEther(myLp.toString())).div(new ethers.utils.BigNumber(totalSupply));
              let reserves = await this.getReservesOfLp(lpContract, provider);
              let _nuls = nulsIndex === 0 ? reserves._reserve0 : reserves._reserve1;
              let _busd = nulsIndex === 0 ? reserves._reserve1 : reserves._reserve0;
              result._03 = "流动池的 NULS: " + ethers.utils.formatUnits(_nuls, 8);
              result._04 = "流动池的 USD: " + ethers.utils.formatEther(_busd);

              let usdNumber = _busd.mul(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 8 + 4)));
              let nulsNumber = _nuls.mul(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 18)));
              let _price = usdNumber.div(nulsNumber);
              let nulsPrice = ethers.utils.formatUnits(_price, 4);
              this.swapForm.nulsPrice = nulsPrice;
              result._00 = "当前NULS价格: " + nulsPrice + " USD/NULS";
              result._05 = "我提供了 NULS: " + myNuls;
              result._06 = "我提供了 USD: " + myBusd;
              let nowNuls = _nuls.mul(yz).div(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 18)));
              let nowBusd = _busd.mul(yz).div(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 18)));
              result._07 = "我能换出的 NULS: " + ethers.utils.formatUnits(nowNuls, 8);
              result._08 = "我能换出的 USD: " + ethers.utils.formatUnits(nowBusd, 18)
              let dNuls = nowNuls.sub(new ethers.utils.BigNumber(ethers.utils.parseUnits(myNuls, 8)));
              let flagNuls = dNuls.lt(zero) ? '少' : '多';
              let dBusd = nowBusd.sub(new ethers.utils.BigNumber(ethers.utils.parseUnits(myBusd, 18)));
              let flagBusd = dBusd.lt(zero) ? '少' : '多';

              let nuls2usd = dNuls.mul(new ethers.utils.BigNumber(ethers.utils.parseUnits(nulsPrice + '', 4))).div(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 4)));
              result._09 = "NULS "+flagNuls+"了: "+ethers.utils.formatUnits(dNuls.abs(), 8)+"，折算成 USD: " + ethers.utils.formatUnits(nuls2usd.abs(), 8);
              result._10 = " USD "+flagBusd+"了: " + ethers.utils.formatUnits(dBusd.abs(), 18);

              let finalAward = dBusd.add(nuls2usd.mul(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 10))));
              if (zero.gt(finalAward)) {
                result._11 = "无常损失: " + ethers.utils.formatUnits(finalAward.abs(), 18) + " USD";
              } else {
                result._11 = "无常损失: 0，流动性实际收益:  " + ethers.utils.formatUnits(finalAward.abs(), 18) + " USD";
              }
              let totalAward = dBusd.mul(2);
              if (zero.gt(totalAward)) {
                result._12 = "金本位损失: " + ethers.utils.formatUnits(totalAward.abs(), 18) + " USD";
              } else {
                result._12 = "金本位收益:  " + ethers.utils.formatUnits(totalAward.abs(), 18) + " USD";
              }
            } else if (this.swapForm.swap === '3') {
              let myLp = await this.getUserLpOfDodo(farmsContract, userAddress, provider);
              if (zero.eq(myLp)) {
                this.swapValue = {error: "此账户无效"};
                return false;
              }
              result._01 = "我的LP（流动性份额）: " + ethers.utils.formatUnits(myLp, 8);
              let totalSupply = await this.getTotalSupplyOfLpOfDodo(lpContract, provider);
              result._02 = "LP总流通量: " + ethers.utils.formatUnits(totalSupply, 8);
              let yz = new ethers.utils.BigNumber(ethers.utils.parseUnits(myLp, 8)).div(new ethers.utils.BigNumber(totalSupply));
              let reserves = await this.getVaultReservesOfLp(lpContract, provider);
              let _nvt = nulsIndex === 0 ? reserves[0] : reserves[1];
              let _busd = nulsIndex === 0 ? reserves[1] : reserves[0];
              result._03 = "流动池的 NVT: " + ethers.utils.formatUnits(_nvt, 8);
              result._04 = "流动池的 USD: " + ethers.utils.formatEther(_busd);

              let usdNumber = _busd.mul(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 8 + 4)));
              let nvtNumber = _nvt.mul(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 18)));
              let _price = usdNumber.div(nvtNumber);
              let nvtPrice = ethers.utils.formatUnits(_price, 4);
              this.swapForm.nvtPrice = nvtPrice;
              result._00 = "当前NVT价格: " + nvtPrice + " USD/NVT";
              result._05 = "我提供了 NVT: " + myNuls;
              result._06 = "我提供了 USD: " + myBusd;
              let nowNvt = _nvt.mul(yz).div(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 8)));
              let nowBusd = _busd.mul(yz).div(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 8)));
              result._07 = "我能换出的 NVT: " + ethers.utils.formatUnits(nowNvt, 8);
              result._08 = "我能换出的 USD: " + ethers.utils.formatUnits(nowBusd, 18)
              let dNvt = nowNvt.sub(new ethers.utils.BigNumber(ethers.utils.parseUnits(myNuls, 8)));
              let flagNvt = dNvt.lt(zero) ? '少' : '多';
              let dBusd = nowBusd.sub(new ethers.utils.BigNumber(ethers.utils.parseUnits(myBusd, 18)));
              let flagBusd = dBusd.lt(zero) ? '少' : '多';

              let nvt2usd = dNvt.mul(new ethers.utils.BigNumber(ethers.utils.parseUnits(nvtPrice + '', 4))).div(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 4)));
              result._09 = "NVT "+flagNvt+"了: "+ethers.utils.formatUnits(dNvt.abs(), 8)+"，折算成 USD: " + ethers.utils.formatUnits(nvt2usd.abs(), 8);
              result._10 = " USD "+flagBusd+"了: " + ethers.utils.formatUnits(dBusd.abs(), 18);

              let finalAward = dBusd.add(nvt2usd.mul(new ethers.utils.BigNumber(ethers.utils.parseUnits('1', 10))));
              if (zero.gt(finalAward)) {
                result._11 = "无常损失: " + ethers.utils.formatUnits(finalAward.abs(), 18) + " USD";
              } else {
                result._11 = "无常损失: 0，流动性实际收益:  " + ethers.utils.formatUnits(finalAward.abs(), 18) + " USD";
              }
              let totalAward = dBusd.mul(2);
              if (zero.gt(totalAward)) {
                result._12 = "金本位损失: " + ethers.utils.formatUnits(totalAward.abs(), 18) + " USD";
              } else {
                result._12 = "金本位收益:  " + ethers.utils.formatUnits(totalAward.abs(), 18) + " USD";
              }
            }

            this.loading = false;
            this.swapValue = result;
            // 设置 cookies
            let alias = this.swapForm.alias;
            if (alias) {
              this.$cookies.set('swap_'+alias, userAddress, -1);
            }
            this.$cookies.set(userAddress+'_nuls_'+this.swapForm.swap, myNuls, -1);
            this.$cookies.set(userAddress+'_usd_'+this.swapForm.swap, myBusd, -1);
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

      async getUserLp(farmsContract, NULS_BUSD_ID, userAddress, provider) {
        let contract = new ethers.Contract(farmsContract, this.ethersSetting.farmAbiFragment, provider);
        return await contract.userInfo(NULS_BUSD_ID, userAddress).then((info) => {
          return info.amount;
        });
      },

      async getTotalSupplyOfLp(lpContract, provider) {
        let contract = new ethers.Contract(lpContract, this.ethersSetting.lpAbiFragment, provider);
        return await contract.totalSupply().then((totalSupply) => {
          return totalSupply.toString();
        });
      },

      async getReservesOfLp(lpContract, provider) {
        let contract = new ethers.Contract(lpContract, this.ethersSetting.lpAbiFragment, provider);
        return await contract.getReserves().then((reserves) => {
          return reserves;
        });
      },

      async getTotalSupplyOfLpOfDodo(lpContract, provider) {
        let contract = new ethers.Contract(lpContract, this.ethersSetting.dodoLpAbiFragment, provider);
        return await contract.totalSupply().then((totalSupply) => {
          // console.log(totalSupply.toString());
          return totalSupply.toString();
        });
      },

      async getUserLpOfDodo(farmsContract, userAddress, provider) {
        let contract = new ethers.Contract(farmsContract, this.ethersSetting.dodoFarmAbiFragment, provider);
        return await contract.balanceOf(userAddress).then((info) => {
          return info.toString();
        });
      },

      async getVaultReservesOfLp(lpContract, provider) {
        let contract = new ethers.Contract(lpContract, this.ethersSetting.dodoLpAbiFragment, provider);
        return await contract.getVaultReserve().then((reserves) => {
          return reserves;
        });
      }

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
