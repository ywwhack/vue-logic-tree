<template>
  <logic-tree :data="logicTree"></logic-tree>
</template>

<script>
import LogicTree from '../'

const RULE_TREE = {
  type: 'logic',
  name: '或',
  children: [
    {
      type: 'logic',
      name: '且',
      children: [
        { type: 'text', name: '用户主动' },
        { type: 'text', name: '主动无效' },
        { type: 'text', name: '商家主动无效' },
        { type: 'text', name: '主动无效订单' }
      ]
    },
    {
      type: 'logic',
      name: '且',
      children: [
        { type: 'text', name: '用户主动' },
        { type: 'text', name: '主动无效' },
        { type: 'text', name: '商家主动无效' }
      ]
    }
  ]
}

export default {
  name: 'test',

  components: {
    LogicTree
  },

  created() {
    this.logicTree = RULE_TREE
  }
}
</script>