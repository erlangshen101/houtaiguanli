import $Util from '@/common/util.js'
import { log } from 'util'
export default {
    state: {
        // 基础设置
        basics: {
          name: "",
          optionsVal:[],
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致"
                    },
                    {
                      value: "fankui",
                      label: "反馈"
                    },
                    {
                      value: "xiaolv",
                      label: "效率"
                    },
                    {
                      value: "kekong",
                      label: "可控"
                    }
                  ]
                },
                {
                  value: "daohang",
                  label: "导航",
                  children: [
                    {
                      value: "cexiangdaohang",
                      label: "侧向导航"
                    },
                    {
                      value: "dingbudaohang",
                      label: "顶部导航"
                    }
                  ]
                }
              ]
            },
            {
              value: "zujian",
              label: "组件",
              children: [
                {
                  value: "basic",
                  label: "Basic",
                  children: [
                    {
                      value: "layout",
                      label: "Layout 布局"
                    },
                    {
                      value: "color",
                      label: "Color 色彩"
                    },
                    {
                      value: "typography",
                      label: "Typography 字体"
                    },
                    {
                      value: "icon",
                      label: "Icon 图标"
                    },
                    {
                      value: "button",
                      label: "Button 按钮"
                    }
                  ]
                },
                {
                  value: "form",
                  label: "Form",
                  children: [
                    {
                      value: "radio",
                      label: "Radio 单选框"
                    },
                    {
                      value: "checkbox",
                      label: "Checkbox 多选框"
                    },
                    {
                      value: "input",
                      label: "Input 输入框"
                    },
                    {
                      value: "input-number",
                      label: "InputNumber 计数器"
                    },
                    {
                      value: "select",
                      label: "Select 选择器"
                    },
                    {
                      value: "cascader",
                      label: "Cascader 级联选择器"
                    },
                    {
                      value: "switch",
                      label: "Switch 开关"
                    },
                    {
                      value: "slider",
                      label: "Slider 滑块"
                    },
                    {
                      value: "time-picker",
                      label: "TimePicker 时间选择器"
                    },
                    {
                      value: "date-picker",
                      label: "DatePicker 日期选择器"
                    },
                    {
                      value: "datetime-picker",
                      label: "DateTimePicker 日期时间选择器"
                    },
                    {
                      value: "upload",
                      label: "Upload 上传"
                    },
                    {
                      value: "rate",
                      label: "Rate 评分"
                    },
                    {
                      value: "form",
                      label: "Form 表单"
                    }
                  ]
                },
                {
                  value: "data",
                  label: "Data",
                  children: [
                    {
                      value: "table",
                      label: "Table 表格"
                    },
                    {
                      value: "tag",
                      label: "Tag 标签"
                    },
                    {
                      value: "progress",
                      label: "Progress 进度条"
                    },
                    {
                      value: "tree",
                      label: "Tree 树形控件"
                    },
                    {
                      value: "pagination",
                      label: "Pagination 分页"
                    },
                    {
                      value: "badge",
                      label: "Badge 标记"
                    }
                  ]
                },
                {
                  value: "notice",
                  label: "Notice",
                  children: [
                    {
                      value: "alert",
                      label: "Alert 警告"
                    },
                    {
                      value: "loading",
                      label: "Loading 加载"
                    },
                    {
                      value: "message",
                      label: "Message 消息提示"
                    },
                    {
                      value: "message-box",
                      label: "MessageBox 弹框"
                    },
                    {
                      value: "notification",
                      label: "Notification 通知"
                    }
                  ]
                },
                {
                  value: "navigation",
                  label: "Navigation",
                  children: [
                    {
                      value: "menu",
                      label: "NavMenu 导航菜单"
                    },
                    {
                      value: "tabs",
                      label: "Tabs 标签页"
                    },
                    {
                      value: "breadcrumb",
                      label: "Breadcrumb 面包屑"
                    },
                    {
                      value: "dropdown",
                      label: "Dropdown 下拉菜单"
                    },
                    {
                      value: "steps",
                      label: "Steps 步骤条"
                    }
                  ]
                },
                {
                  value: "others",
                  label: "Others",
                  children: [
                    {
                      value: "dialog",
                      label: "Dialog 对话框"
                    },
                    {
                      value: "tooltip",
                      label: "Tooltip 文字提示"
                    },
                    {
                      value: "popover",
                      label: "Popover 弹出框"
                    },
                    {
                      value: "card",
                      label: "Card 卡片"
                    },
                    {
                      value: "carousel",
                      label: "Carousel 走马灯"
                    },
                    {
                      value: "collapse",
                      label: "Collapse 折叠面板"
                    }
                  ]
                }
              ]
            },
            {
              value: "ziyuan",
              label: "资源",
              children: [
                {
                  value: "axure",
                  label: "Axure Components"
                },
                {
                  value: "sketch",
                  label: "Sketch Templates"
                },
                {
                  value: "jiaohu",
                  label: "组件交互文档"
                }
              ]
            }
          ],
          textarea: "",
          Company:"",
          totalNum: 0,
          num: 0,
          radio:"1",
          radio1: "1"
        },
        // 规格 / 多规格
        cations: {
          tabPosition: '0',
          market: 0,
          Sale: 0,
          cost: 0,
          weight: 0,
          volume: 0,
          // 多规格
          sku_card:[
            // {
            //   name:"尺寸",
            //   radio: 1,
            //   list:[
            //     // 规格卡片
            //     {
            //       name: "111",
            //       color2: null,
            //       image: ''
            //     },
            //     {
            //       name: "222",
            //       color2: null,
            //       image: ''
            //     },
            //   ]
            // },
          ]
        },
        // 表头
        ths:[
          {name:"商品规格",rowspan:1,colspan:1},
          {name:"sku图片",rowspan:2},
          {name:"销售价",rowspan:2},
          {name:"市场价",rowspan:2},
          {name:"成本价",rowspan:2},
          {name:"库存",rowspan:2},
          {name:"体积",rowspan:2},
          {name:"重量",rowspan:2},
          {name:"编码",rowspan:2},
        ],
        // 表格
        ObjBox: [],
        // 活动名称
        goods_type_id:'',
        // 商品属性
        goods_attrs: {
          phone_model:''
        },
        // 折扣设置
        discount: ''
    },
    getters: {
      // 获取多规格
      skuLabels (state) {
        return state.cations.sku_card.filter(v => {
          return v.list.length > 0
        })
      },
      // 获取表头
      tableThs (state,getters) {
        let length = getters.skuLabels.length
        state.ths[0].colspan = length
        state.ths[0].rowspan = length > 0 ? 1 : 2
        return state.ths
      },
      // 获取规格表格数据
      tableData(state,getters) {

        let SkuList = getters.skuLabels
        if (SkuList.length == 0) {
          return [];
        }

        let sku_list = []

        SkuList.forEach(v => {
          sku_list.push(v.list)
        })

        if (sku_list.length === 0) {
          return []
        }

        let arr = $Util.cartesianProductOf(...sku_list)
        return arr.map(v => {
          let obj = {
             skus: [],
             image: '',   //sku图片
             pprice: 0,   //销售价格
             oprice: 0,   //市场价格
             cprice: 0,   //成本价格
             stock: 0,
             volume: 0,
             weight: 0,
             code: '1'
          }
          obj.skus = v
          return obj
        })
        
      },
    },
    mutations: {
        // 基础设置
        vModelBasics (state,{key,value}) {
          state.basics[key] = value
        },
        //修改 cations 规格
        vModelCations (state,{key,value}) {
          state.cations[key] = value
        },
        //修改 多规格 
        vModelSku_card (state,{key,index,value}) {
          state.cations.sku_card[index][key] = value
        },
        // 添加 多规格
        vModelSku_cardAdd (state,{value}) {
          state.cations.sku_card.push(value)
        },
        // 删除 多规格
        vModelSku_cardSpl (state,{index}) {
          state.cations.sku_card.splice(index,1)
        },
        // 多规格卡片排序 上移
        vModelSTop (state,{index}) {
          $Util.moveUp(state.cations.sku_card,index)
        },
        // 多规格卡片排序 下移
        vModelSBottom (state,{index}) {
          $Util.moveDown(state.cations.sku_card,index)
        },
        // 添加规格卡片
        SetSkuValue (state,{index,val}) {
          state.cations.sku_card[index].list.push(val) 
        },
        // 删除规格卡片
        DelSkuValue (state,{index,index1}) {
          state.cations.sku_card[index].list.splice(index1,1)
        },
        // 修改规格卡片
        modifySkuValue (state,{index,index1,key,value}) {
          state.cations.sku_card[index].list[index1][key] = value
        },
        // 拖拽排序
        getDragSortValue (state,{index,val}) {
          state.cations.sku_card[index].list = val
        },
        // 活动名称
        setGoods_type (state,val) {
          state.goods_type_id = val
        }
    },
}