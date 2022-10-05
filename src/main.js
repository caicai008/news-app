import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import {
  Form, Field, NavBar,
  Button, Tabbar, TabbarItem,
  Icon, Tab, Tabs, cell, List,
  PullRefresh, ActionSheet, Popup,
  Col, Row, Badge
} from 'vant'

Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(cell)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Col)
Vue.use(Row)
Vue.use(Badge)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
