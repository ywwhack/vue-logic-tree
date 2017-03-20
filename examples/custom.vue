<template>
  <logic-tree :data="logicTreeData" :option="option"></logic-tree>
</template>

<script>
import LogicTree from '../'
import logicTreeData from './data.json'

export default {
  name: 'custom',

  components: {
    LogicTree
  },

  created() {
    this.logicTreeData = logicTreeData
    this.option = {
      logicCircle: {
        r: 9
      },
      ruleText: {
        stroke: 'steelblue'
      }
    }
  }
}
</script>