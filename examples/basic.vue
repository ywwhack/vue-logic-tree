<template>
  <logic-tree :data="logicTreeData"></logic-tree>
</template>

<script>
import LogicTree from '../'
import logicTreeData from './data.json'

export default {
  name: 'basic',

  components: {
    LogicTree
  },

  created() {
    this.logicTreeData = logicTreeData
  }
}
</script>