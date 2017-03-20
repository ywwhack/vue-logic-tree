<template>
  <svg ref="canvas" class="rule-tree"></svg>
</template>

<script>
import { tree, hierarchy } from 'd3-hierarchy'
import { select, clone, merge } from './util'
import { NODE_TYPE, DEFAULT_OPTION, MARGIN } from './constants'

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
    }
  },

  watch: {
    width: 'update',
    height: 'update',
    data: 'update'
  },

  methods: {
    update () {
      let { width, height, data, $refs: { canvas } } = this
      width = parseInt(width) - MARGIN.left - MARGIN.right
      height = parseInt(height) - MARGIN.top - MARGIN.bottom

      const root = hierarchy(data)
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
        let y
        if (d.depth === 0) {
          y = 0
        } else {
          y = 50 + (d.depth - 1) * 20
        }
        d.y = y
      })

      nodes.forEach((d, i) => {
        const { data: { type, name }, x, y } = d

        const treeNode = container.append('g')
          .attr('transform', `translate(${y}, ${x})`)

        // 如果类型是 logic, 则画一个圆
        if (type === NODE_TYPE.logic) {
          treeNode.append('circle')
            .style('fill', '#fff')
            .styles(finalOption.logicCircle)
        }

        // 节点文字内容
        const text = treeNode.append('text')
          .attr('x', type === NODE_TYPE.logic ? 0 : 10)
          .attr('dy', '.35em')
          .attr('text-anchor', type === NODE_TYPE.logic ? 'middle' : 'start')
          .text(name)
        if (type === NODE_TYPE.logic) {
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
