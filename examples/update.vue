<template>
  <div>
    <logic-tree :data="logicTreeData" :width="width" :height="height"></logic-tree>
    <button @click="width += 10">增加宽度</button>
    <button @click="height += 10">增加高度</button>
    <button @click="handleDataChange">改变数据</button>
  </div>
</template>

<script>
import LogicTree from '../'
import logicTreeData from './data.json'

export default {
  name: 'update',

  components: {
    LogicTree
  },

  data () {
    return {
      width: 250,
      height: 250,
      logicTreeData: {
        condition: 'OR',
        rules: []
      }
    }
  },

  methods: {
    handleDataChange () {
      this.logicTreeData.rules.push(this.logicTreeData.rules[0])
    }
  },

  created() {
    this.logicTreeData = logicTreeData
  }
}
</script>