import layout from "@/layout/index.vue"
export default {
  name:"departments",
  path:"/departments",
  component:layout,
  children:[
    {
      // path设置为空字符串，在展示layout组件的时候会自动匹配apprpvals组件作为二级路由进行展示
      path:"",
      component:()=>import("@/views/departments/index.vue"),
      // 传递一些元信息，方便展示侧边栏的标题
      meta:{
        title:"组织架构",
        icon:"tree"
      }
    }
  ]
}