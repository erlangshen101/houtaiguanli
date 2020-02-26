<template>
  <div class="specifications">
    <el-form label-width="80px">
      <el-form-item label="商品规格">
        <el-radio-group :value="tabPosition"
          @input="vmodel('tabPosition',$event)">
          <el-radio-button label="0">统一规格</el-radio-button>
          <el-radio-button label="1">多规格</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- 单规格 -->
      <el-tabs v-if="tabPosition == '0' " :tab-position="tabPosition">
        <el-form-item label="市场价格">
          <el-input :value="market" 
            type="Number"
            @input="vmodel('market',$event)" 
            style="width:290px">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销售价格">
          <el-input :value="Sale" 
            type="Number" 
            style="width:290px"
            @input="vmodel('Sale',$event)">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="成本价格">
          <el-input :value="cost"
             type="Number" 
             @input="vmodel('cost',$event)"
             style="width:290px">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input :value="weight" 
            type="Number" 
            @input="vmodel('weight',$event)"
            style="width:290px">
            <template slot="append">公斤</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品体积">
          <el-input :value="volume" 
            type="Number" 
            @input="vmodel('volume',$event)"
            style="width:290px">
            <template slot="append">立方米</template>
          </el-input>
        </el-form-item>
      </el-tabs>
      <!-- 多规格 -->
      <el-form v-else label-width="80px" class="p-b25">
        <el-form-item label="活动名称" v-for="(item,index) in sku_card" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix  flex-x">
              <el-form-item label="规格向:"  size="mini" class="m0">
                <el-input :value="item.name"
                @input="Sku_card('name',index,$event)"
                 style="width:290px">
                  <template slot="append" >
                    <i @click="skusDialog('name',index)" class="el-icon-more"></i>
                  </template>
                </el-input>
              </el-form-item>
              <el-radio-group :value="item.radio"
                class="flex-x p-t5 m-r-a" 
                style="height:28px"
                @input="Sku_card('radio',index,$event)"
                >
                <el-radio :label="1" class="m-l20">无</el-radio>
                <el-radio :label="2">颜色</el-radio>
                <el-radio :label="3">图片</el-radio>
              </el-radio-group>
              <!-- 上移 -->
              <el-button size="mini" style="height:28px" @click="sortSkuCard(index)">
                <i class="el-icon-top"></i>
              </el-button>
              <!-- 下移 -->
              <el-button size="mini" style="height:28px" @click="DownSkuCard(index)">
                <i class="el-icon-bottom"></i>
              </el-button>

              <el-button style="height:28px;" @click.stop="SplSku_card(index)" class="p0" type="text">删除</el-button>
            </div>
            <div class="text item">
              
            <div class="m-b20 flex-x">

              <div class="SplSku_ka br-5 p-b5 p-t5 relative flex-x m-r20 a-i-c" v-for="(val,i) in item.list" :key="i"
              v-dragging="{ item: val, list: item.list,group: index}">
                <!-- 图片 -->
                <template v-if="item.radio == 3">
                  <span v-if="!val.image" class="SplSkuPlus m-l10 m-r10" style="height:20px"  @click="chooseImage(index,i,'image')">
                    <i class="el-icon-plus"></i>
                  </span>
                  <img @click="chooseImage(index,i,'image')" v-else :src="val.image" alt="" style="width:45px;height:45px" class="m-l10">
                </template>
                <!-- 颜色 -->
                <div v-if="item.radio == 2" class="d-i-b" style="height:40px">
                  <el-color-picker  :value="val.color2" class="m-r10 m-l10" @change="SetmodifySkuValue(index,i,'color2',$event)"></el-color-picker>
                </div>
                <div class="m-auto">
                  <input type="text" class="b-none t-a-c f14" :value="val.name" @input="SetmodifySkuValue(index,i,'name',$event.srcElement.value)">
                </div>
                <i class="el-icon-circle-close absolute" @click="setDelSkuValue(index,i)"></i>
              </div>

            </div>

            <el-button class="b-none" @click="AddSkuValue(index)">
              + 添加规格
            </el-button>
            </div>
          </el-card>
        </el-form-item>

        <el-button type="success" class="AddSku" @click="AddSku_card">
          添加规格
        </el-button>

        <el-form-item label="批量设置">
          <template v-if="!Setup">
            <el-button type="text" 
              v-for="(item,index) in batch" 
              :key="index"
              @click="onBatch(item)"
              >
              {{item.name}}
            </el-button>
          </template>
          <div v-else>
            <el-input type="number" v-model="batchVal" size="mini" :placeholder="place" style="width:130px" class="m-r10"></el-input>
            <el-button size="mini" type="success" @click="oksetup">设置</el-button>
            <el-button size="mini" @click="Setup = false">取消</el-button>
          </div>
        </el-form-item>

        <el-form-item label="规格设置">
          <setting ref="tabar"/>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import setting from './setting'
export default {
  inject :['app'],
  data () {
    return {
      Setup: false,
      place:'',
      batchVal:'',
      batch: [
        {
          name:'销售价',
          age: 'pprice'
        },
        {
          name:'市场价',
          age: 'oprice'
        },
        {
          name:'成本价',
          age: 'cprice'
        },
        {
          name:'库存价',
          age: 'stock'
        },
        {
          name:'体积价',
          age: 'volume'
        },
        {
          name:'重量价',
          age: 'weight'
        },
      ]
    };
  },
  computed: {
    // 获取数据
    ...mapState({
        // 单规格
        tabPosition: state => state.goods_create.cations.tabPosition,
        market: state => state.goods_create.cations.market,
        Sale: state => state.goods_create.cations.Sale,
        cost: state => state.goods_create.cations.cost,
        weight: state => state.goods_create.cations.weight,
        volume: state => state.goods_create.cations.volume,
        // 多规格
        sku_card: state => state.goods_create.cations.sku_card
    })
  },
  methods: {
    // 提交 == / 规格 / 多规格  / 添加多规格 / 删除多规格
    ...mapMutations ([
        'vModelCations',        // 规格
        'vModelSku_card',       // 多规格
        'vModelSku_cardAdd',    // 修改多规格
        'vModelSku_cardSpl',    // 添加多规格
        'vModelSTop',           // 上移规格排序
        'vModelSBottom',        // 下移规格排序
        'SetSkuValue',          // 添加规格卡片
        'DelSkuValue',          // 删除规格卡片
        'modifySkuValue',       // 修改规格卡片
        'getDragSortValue',     // 拖拽排序
      ]),
    // 规格
    vmodel(key,value) {
      this.vModelCations({key,value})
    },
    // 多规格
    Sku_card(key,index,value) {
      this.vModelSku_card({key,index,value})
    },
    // 添加多规格
    AddSku_card() {
      this.vModelSku_cardAdd({value:{
        name:"尺寸",
        radio: 1,
        list:[]
      }})
    },
    // 删除多规格
    SplSku_card(index) {
      this.vModelSku_cardSpl({index})
    },
    // 上移规格排序
    sortSkuCard (index) {
      this.vModelSTop ({index})
    },
    // 下移规格排序
    DownSkuCard (index) {
      this.vModelSBottom ({index})
    },
    // 添加规格卡片
    AddSkuValue (index) {
      this.SetSkuValue({index,val:{
        name:"增加规格值",
      }})
    },
    // 删除规格卡片
    setDelSkuValue (index,index1) {
      this.DelSkuValue({index,index1})
    },
    // 修改规格卡片
    SetmodifySkuValue (index,index1,key,value) {
      this.modifySkuValue({index,index1,key,value})
      this.$forceUpdate()
    },
    // 选择图片
    chooseImage (index,index1,key) {
      this.app.chooseImage((res) => {
        let value = res[0].img
        this.modifySkuValue({index,index1,key,value})
        this.$forceUpdate()
      },1)
    },
    // 选择规格
    skusDialog (key,index) {
      this.app.chooseSkus((res) => {
        let value = res.name
        this.vModelSku_card({key,index,value})
          res.skus.forEach (res => {
            this.SetSkuValue({index,val:{
            name:res.name,
          }})
        })
      })
    },
    // 点击 选择
    onBatch (item) {
      this.Setup = item.age
      this.place = item.name
    },
    // 点击 设置
    oksetup () {
      this.$refs.tabar.list.forEach(val => {
        val[this.Setup] = this.batchVal
      })
      this.Setup = false
      this.batchVal = ''
    }
  },
  // 拖拽排序
  mounted () {
      let val = []
      this.$dragging.$on('dragged', ({ value }) => {
        val = value.list
      })
       this.$dragging.$on('dragend', (e) => {
        let index = parseInt(e.group)
        this.getDragSortValue({index,val})
      })
  },
  components: {
    setting
  }
}
</script>

<style lang="scss" scoped>
  /deep/.el-card__header {
    background: #f1f1f1;
  }
  /deep/.AddSku {
    margin-left: 80px;
    margin-bottom: 20px;
  }
  .SplSku_ka {
    border: 1px solid #ddd;
    width: 150px;
    input {
      padding: 10px 5px;
      width: 70px;
    }
    .el-icon-circle-close {
      top: -8px;
      right: -8px;
      z-index: 555;
      font-size: 18px;
      background: #fff;
    }
    .SplSkuPlus {
      border: 1px solid #ddd;
      padding: 5px 10px;
      border-radius: 3px;
      background: #f1f1f1;
    }
    .SplSkuPlus {
      line-height: 23px;
    }
  }
</style>