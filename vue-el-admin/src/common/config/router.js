// 规则
// 一、例如： index/index, shop/index以index结尾的，path和name默认去除index
// 二、例如： shop/index, 默认生成name为shop_list (如果结尾为index，例如shop/index则是shop)
// 三、填写后不会自动生成


let routers = [
    // 首页
    {
        redirect:{name:'index'},
        component: 'layout',
        children: [
            {
                component:'index/index'
            },
            {   
                component:'shop/goods/list'
            }
        ]
    },
    // 登录页面
    {
        component:'login/index',
    },
    // 页面找不到 默认跳转首页
    {
        path:'*',
        redirect:{name:'index'}
    }
]

//获取 路由信息方法
let getRouters = function() {
    // 调取生成路由
    createRouter (routers)
    // 返回结果
    return routers
}

// 自动生成路由方法
function createRouter (arr) {
    for(let i = 0; i < arr.length ; i++) {
        // 没有component 直接返回
        if (!arr[i].component) return
        // 去除index
        let val = getValue(arr[i].component)
        // 生成 name 
        arr[i].name = arr[i].name || val.replace(/\//g,'_')
        // 生成 path
        arr[i].path = arr[i].path ||  `/${val}`
        //自动生成component
        let componentFun = import(`../../views/${arr[i].component}.vue`)
        arr[i].component = () => componentFun
        // 判断有没有 children 子路由
        if (arr[i].children && arr[i].children.length > 0) {
            createRouter (arr[i].children)
        }
    }
}

// 去除index
function getValue (str) {
    // str = login/index
    // 获取最后一个/杠索引
    let index = str.lastIndexOf('/')
    // 获取最后一个/后面的值
    let val = str.substring(index+1,str.length)
    // 判断是不是index 结尾
    if (val === 'index') {
        return str.substring(index,-1)
    }
    return str
}

export default getRouters()