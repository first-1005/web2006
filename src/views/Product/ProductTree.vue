<template>
  <div>
    <el-tree :props="defaultProps" :load="loadNode" lazy @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "ProductTree",
  data() {
    return {
      defaultProps: {
        label: "name",
        children: "children",
      },
    };
  },
  methods: {
    loadNode(node, resolve) {
      // 默认获取第一层级数据
      // console.log(node);
      if (node.level === 0) {
        api.getCategorySelect().then((res) => {
          // console.log(res);
          if (res.data.status === 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
      if (node.level >= 1) {
        api.getCategorySelect({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.data.status === 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          })
          .catch((error) => {
            return resolve([]);
          });
      }
    },
    handleNodeClick(data) {
      // console.log(data);
      this.$emit('treeData',data)
    },
  },
};
</script>

<style>
</style>