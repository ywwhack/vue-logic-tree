<template>
  <logic-tree :data="logicTreeData" :option="option"></logic-tree>
</template>

<script>
import LogicTree from '../'
import logicTreeData from './data.json'

export default {
  name: 'custom-style',

  components: {
    LogicTree
  },

  created() {
    this.logicTreeData = logicTreeData
    this.option = {
      logicCircle: {
        r: 9
      },
      logicText: {
        stroke: 'steelblue'
      },
      ruleText: {
        'font-size': 14
      },
      link: {
        'stroke-width': 2
      }
    }
  }
}
</script>