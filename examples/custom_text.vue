<template>
  <logic-tree :data="logicTreeData" :text-formatter="d => d.condition || d.field"></logic-tree>
</template>

<script>
import LogicTree from '../'
import logicTreeData from './data.json'

export default {
  name: 'custom-text',

  components: {
    LogicTree
  },

  created() {
    this.logicTreeData = logicTreeData
  }
}
</script>