<template>
  <div>
    <el-tree
      :props="defaultProps"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      :render-content="renderContent"
    ></el-tree>
    <!-- 添加子级导航 -->
    <el-dialog
      title="添加子导航"
      :visible.sync="dialogContentAddVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="contentAddForm" status-icon ref="contentAddForm" label-width="100px">
        <el-form-item label="导航名称" >
          <el-input type="text" v-model="contentAddForm.name" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogContentAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitContentAdd">添加</el-button>
      </span>
    </el-dialog>
    <!-- 修改子级导航 -->
    <el-dialog
      title="修改子导航"
      :visible.sync="dialogContentUpdateVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="contentAddForm" status-icon ref="contentAddForm" label-width="100px">
        <el-form-item label="导航名称" >
          <el-input type="text" v-model="contentAddForm.name" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogContentUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitContentUpdate">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "ContentTree",
  inject:['reload'],
  data() {
    return {
      defaultProps: {
        label: "name",
        children: "children",
      },
      dialogContentAddVisible: false,
      dialogContentUpdateVisible:false,
      contentAddForm: {
          name:''
      },
      contentInfo:{}
    };
  },
  mounted() {
    //   api.getContentTree().then(res=>{
    //       console.log(res.data);
    //   })
  },

  methods: {
    http(level, resolve) {
      api
        .getContentTree({
          id: level,
        })
        .then((res) => {
          //   console.log(res.data);
          if (res.data.status === 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
    },
    loadNode(node, resolve) {
      // console.log(node);
      if (node.level === 0) {
        this.http(1, resolve);
      }
      if (node.level >= 1) {
        this.http(node.data.pid, resolve);
      }
    },
    handleNodeClick(key) {
      // console.log(key);
      this.$bus.$emit('contentTreePid',key)
    },
    // 删除修增加按钮显示
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(node,data)}
            >
              增加子导航
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(node, data)}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    handleClose() {},
    append(node, data) {
        // console.log(data);
      this.dialogContentAddVisible = true;
    this.contentInfo = data; 
    },
    // 确定添加子导航
    submitContentAdd(){
        // console.log(his.contentAddForm.name);
         api.contentTreeAdd({
            pid:this.contentInfo.pid,
            name:this.contentAddForm.name
        })
        .then(res=>{
            // console.log(res.data);
            if(res.data.status === 200){
                this.reload()
                this.$message.success(res.data.msg)
                this.dialogContentAddVisible = false;
            }else{
                this.$message.error(res.data.msg)
            }
        })
    },
    update(node, data) {
        this.dialogContentUpdateVisible=true;
        this.contentInfo = data;
    },
    // 修改子级导航
    submitContentUpdate(){
        api.updateContent({
            pid:this.contentInfo.pid,
            name:this.contentAddForm.name
        })
        .then(res=>{
            // console.log(res.data);
            if(res.data.status === 200){
                this.dialogContentUpdateVisible=false;
                this.$message.success(res.data.msg);
                this.reload()
            }
        })
    },
    remove(node, data) {
        // console.log(data);
        api.deleteContent({
            pid:data.pid
        })
        .then(res=>{
            // console.log(res.data);
            if(res.data.status === 200){
                this.$message.success(res.data.msg);
                this.reload()
            }else{
                this.$message.error(res.data.msg)
            }
        })
    },
  },
};
</script>

<style>
</style>