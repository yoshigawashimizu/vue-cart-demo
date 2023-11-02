<template>
  <div class="goods-container">
    <!-- 左侧图片区域 -->
    <div class="left">
      <img :src="item.thumb" class="avatar">
    </div>
    <!-- 右侧商品区域 -->
    <div class="right">
      <!-- 标题 -->
      <div class="title">{{ item.name }}</div>
      <div class="info">
        <!-- 单价 -->
        <span class="price">￥{{ item.price }}</span>
        <div class="btns">
          <!-- 按钮区域 -->
          <button class="btn btn-light" @click="btnClick(-1)" :disabled="item.count <= 1">-</button>
          <span class="count">{{ item.count }}</span>
          <button class="btn btn-light" @click="btnClick(+1)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true // 必传
    }
  },
  methods: {
    /** 单击按钮,修改购买数量
     *
     * @param step 增加/减少的数量
    */
    btnClick (step) {
      // newCount 修改后的数量
      const newCount = this.item.count + step
      // 要修改的那一行的id
      const id = this.item.id
      // dispatch('修改商品数量', {要修改的那一行的id, 修改后的数量})
      this.$store.dispatch('cart/updateCountAsync', { id, newCount }) // 错题,忘记访问模块的 actions 时要加上模块名了
    }
  }
}
</script>

<style lang="less" scoped>
.goods-container {
  display: flex;
  padding: 10px;
  + .goods-container {
    border-top: 1px solid #f8f8f8;
  }
  .left {
    .avatar {
      width: 100px;
      height: 100px;
    }
    margin-right: 10px;
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .title {
      font-weight: bold;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: red;
        font-weight: bold;
      }
      .btns {
        .count {
          display: inline-block;
          width: 30px;
          text-align: center;
        }
      }
    }
  }
}

.custom-control-label::before,
.custom-control-label::after {
  top: 3.6rem;
}
</style>
