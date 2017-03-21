<template>
  <logic-tree :data="logicTreeData" height="300" width="1000"></logic-tree>
</template>

<script>
import LogicTree from '../'

const LOGIC_TREE_DATA = {
  "condition": "OR",
  "rules": [
    {
      "condition": "AND",
      "rules": [
        { "type": "number", "field": "主动无效订单数", "operator": "=", "value": "10" },
        {
          "condition": "OR",
          "rules": [
            { "type": "number", "field": "商家主动无效订单数", "operator": "<", "value": "10" },
            { "type": "number", "field": "商家主动无效订单数", "operator": "<", "value": "10" }
          ]
        },
        {
          "condition": "OR",
          "rules": [
            { "type": "number", "field": "用户主动无效订单数", "operator": ">", "value": "10" },
            { "type": "number", "field": "商家主动无效订单数", "operator": "<", "value": "10" },
            { "type": "number", "field": "商家主动无效订单数", "operator": "<", "value": "10" }
          ]
        },
        { "type": "number", "field": "主动无效订单数", "operator": "=", "value": "20" }
      ]
    },
    {
      "condition": "AND",
      "rules": [
        { "type": "number", "field": "用户主动无效订单数", "operator": ">", "value": "10" },
        { "type": "number", "field": "主动无效订单数", "operator": "=", "value": "10" },
        { "type": "number", "field": "商家主动无效订单数", "operator": "<", "value": "10" },
        { "type": "number", "field": "主动无效订单数", "operator": "=", "value": "20" }
      ]
    }
  ]
}

export default {
  name: 'nested',

  components: {
    LogicTree
  },

  created() {
    this.logicTreeData = LOGIC_TREE_DATA
  }
}
</script>