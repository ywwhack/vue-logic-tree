<template>
  <logic-tree :data="logicTreeData" :operators="operators"></logic-tree>
</template>

<script>
import LogicTree from '../src'
import logicTreeData from './data.json'

const operators = {
  number: {
    '=': '等于',
    '<>': '不等于',
    '>': '改过了的大于',
    '>=': '大于等于',
    '<': '小于',
    '<=': '小于等于',
    'is null': '为空',
    'is not null': '不为空'
  }
}

export default {
  name: 'basic',

  components: {
    LogicTree
  },

  created() {
    this.operators = operators
    this.logicTreeData = logicTreeData
  }
}
</script>