<template>
  <svg ref="canvas"></svg>
</template>

<script>
import { tree, hierarchy } from 'd3-hierarchy'
import { select, clone, merge, traverse, isEmpty } from './util'
import { DEFAULT_OPTION, MARGIN, LOGIC_TYPE } from './constants'
import OPERATORS from './operators'

function getNodeText (data) {
  const { condition } = data
  if (condition) { // 节点是一个逻辑值
    const { AND, OR } = LOGIC_TYPE
    switch (condition) {
      case AND.value: return AND.name
      case OR.value: return OR.name
    }
  } else { // 节点是普通规则
    const { field, type, operator, value } = data
    const operatorText = OPERATORS[type][operator]
    return `${field}${operatorText}${value}`
  }
}

export default {
  name: 'logic-tree',

  props: {
    width: {
      type: [String, Number],
      default: 250
    },
    height: {
      type: [String, Number],
      default: 250
    },
    data: {
      type: Object,
      required: true
    },
    option: {
      type: Object,
      default () {
        return {}
      }
    },
    textFormatter: {
      type: Function,
      default: getNodeText
    }
  },

  watch: {
    width: 'update',
    height: 'update',
    data: {
      handler: 'update',
      deep: true
    }
  },

  methods: {
    update () {
      let { width, height, data, $refs: { canvas }, textFormatter } = this

      if (isEmpty(data) || !data.condition || !data.rules) {
        select(canvas)._node.innerHTML = ''
        return
      }

      let rulesCount = 0
      let maxTextLength = 0
      let index = 0
      traverse(data, d => {
        if (!d.condition) {
          rulesCount++
          maxTextLength = Math.max(maxTextLength, textFormatter(d).length)
        }
      })

      width = parseInt(width) - MARGIN.left - MARGIN.right
      height = parseInt(height) - MARGIN.top - MARGIN.bottom

      const root = hierarchy(data, d => d.rules)
      const treeData = tree().size([height, width])(root)
      const nodes = treeData.descendants()
      const links = treeData.links()

      let container = select(canvas)
        .attr('width', width + MARGIN.left + MARGIN.right)
        .attr('height', height + MARGIN.top + MARGIN.bottom)
        .select('g')

      // 如果之前不存在容器，则新建一个，否则将容器内所有子元素清空
      if (container.empty()) {
        container = select(canvas)
          .append('g')
          .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
      } else {
        container._node.innerHTML = ''
      }

      let finalOption = clone(DEFAULT_OPTION)
      merge(finalOption, this.option)
      // 设置每个节点的水平坐标
      nodes.forEach(d => {
        if (d.depth === 0) {
          d.y = 0
        } else {
          // 每个节点与父节点相距 30px
          // 如果同一级下有个既有`规则节点`也有`逻辑节点`，则增加逻辑节点的水平位移，防止文字重叠
          let isLogicNodeSiblingsText = false
          if (d.data.condition) {
            isLogicNodeSiblingsText = d.parent.children.some(node => node.data.id !== d.data.id && !node.data.condition)
          }
          d.y = d.parent.y + 30
          if (isLogicNodeSiblingsText) {
            d.y = d.y + maxTextLength * 12
          }
        }
      })

      // 设置viewBox
      // TODO: 找个更好的方式替换掉这个黑魔法 =。=
      const viewBoxWidth = nodes[nodes.length - 1].y + maxTextLength * 12 + 12
      select(canvas)
        .attr('viewBox', `0 0 ${viewBoxWidth} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')

      nodes.forEach((d, i) => {
        const { data, x, y } = d
        const isLogicNode = !!data.condition

        const treeNode = container.append('g')
          .attr('transform', `translate(${y}, ${x})`)

        // 如果类型是 logic, 则画一个圆
        if (isLogicNode) {
          treeNode.append('circle')
            .style('fill', '#fff')
            .styles(finalOption.logicCircle)
        }

        // 节点文字内容
        const text = treeNode.append('text')
          .attr('x', isLogicNode ? 0 : 10)
          .attr('dy', '.35em')
          .attr('text-anchor', isLogicNode ? 'middle' : 'start')
          .text(textFormatter(data))
        if (isLogicNode) {
          text.styles(finalOption.logicText)
        } else {
          text.styles(finalOption.ruleText)
        }
      })

      // 相邻节点路径
      links.forEach(d => {
        container.insert('path', 'g')
          .style('fill', 'none')
          .styles(finalOption.link)
          .attr('d', `M${d.source.y},${d.source.x}L${d.source.y},${d.target.x} ${d.target.y},${d.target.x}`)
      })
    }
  },

  mounted () {
    this.update()
  }
}
</script>
