import axios from 'axios'

// 这是购物车模块
export default {
  namespaced: true, // 开启名称空间
  // 保证模块数据的独立性
  state () {
    return {
      // 购物车数据 [{}, {}]
      list: []
    }
  },
  mutations: {
    // 更新购物车数据
    updateList (state, newList) {
      state.list = newList
    },
    /** 更新购买数量
     *
     * @param {*} state
     * @param {*} obj {id: 修改的那一项, newCount: 新购买数据}
     */
    updateCount (state, obj) {
      console.log(obj)
      // 根据 id 找到对应项,更新 count 数据
      const targetGood = state.list.find(item => item.id === obj.id) // 错题:这里不应该用 $state
      // 非空判断
      if (!targetGood) {
        // 找不到商品项
        alert('修改的商品不存在')
        return
      }
      // 判断:新数量是否 < 1
      if (obj.newCount < 1) {
        // 新商品数量小于 1, 数量数据非法
        return
      }
      targetGood.count = obj.newCount
    }
  },
  actions: {
    // 获取数据
    // 请求方式: get
    // 请求路径: http://localhost:3000/cart
    async getList (context) {
      const response = await axios.get('http://localhost:3000/cart')
      console.log('请求得到的数据', response)
      context.commit('updateList', response.data)
    },

    // 修改商品数量
    // 请求方式: patch
    // 请求路径: http://localhost:3000/cart/:id

    /** 将更新同步到后台服务器.
     * 向 json-server 服务器修改表格数据的方法?
     * patch请求方法,路径传参,传id 传参负载为表格属性名
     *
     * @param {*} context
     * @param {*} obj 包括该行id,最新购买数量 newCount
     */
    async updateCountAsync (context, obj) {
      const response = await axios.patch(`http://localhost:3000/cart/${obj.id}`, { count: obj.newCount })
      console.log(response)
      // 修改页面展示的'商品数量'
      context.commit('updateCount', { id: obj.id, newCount: obj.newCount })
    }
  },
  getters: {
    // 合计商品数量,累加 count
    total (state) {
      return state.list.reduce((sum, item) => sum + item.count, 0)
    },
    // 合计商品总价,累加 count * price
    totalPrice (state) {
      return state.list.reduce((sum, item) => sum + (item.count * item.price), 0)
    }
  }
}
