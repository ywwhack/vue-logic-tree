<template>
  <svg ref="canvas" class="rule-tree"></svg>
</template>

<script>
import { tree, hierarchy } from 'd3-hierarchy'
import { select } from './util'
import { NODE_TYPE, COLORS, MARGIN } from './constants'

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
        const { data: { type, name } } = d

        const treeNode = container.append('g')
          .attr('class', 'rule-tree-node')
          .attr('transform', `translate(${d.y}, ${d.x})`)

        // 如果类型是 logic, 则画一个圆
        if (type === NODE_TYPE.logic) {
          treeNode.append('circle')
            .attr('r', 12)
            .style('fill', '#fff')
        }

        // 节点文字内容
        treeNode.append('text')
          .attr('x', type === NODE_TYPE.logic ? 0 : 10)
          .attr('dy', '.35em')
          .attr('text-anchor', type === NODE_TYPE.logic ? 'middle' : 'start')
          .attr('stroke', type === NODE_TYPE.logic ? COLORS.logic : COLORS.text)
          .text(name)
      })

      // 相邻节点路径
      links.forEach(d => {
        container.insert('path', 'g')
          .attr('class', 'rule-tree-link')
          .attr('d', `M${d.source.y},${d.source.x}L${d.source.y}, ${d.target.x} ${d.target.y},${d.target.x}`)
      })
    }
  },

  mounted () {
    this.update()
  }
}
</script>

<style>
.rule-tree-node circle {
  fill: #fff;
  stroke: #20a0ff;
  stroke-width: 1px;
}
.rule-tree-node text {
  font: 12px sans-serif;
}
.rule-tree-link {
  fill: none;
  stroke: #c0c8d5;;
  stroke-width: 1px;
}
</style>
