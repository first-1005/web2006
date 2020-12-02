<template>
  <div ref='editorAdd' style="text-align:left">
    <div>{{editorAddData}}</div>
  </div>
</template>

<script>
import wangeditor from 'wangeditor'
export default {
name:'ProductWangEditor',
components:{
    wangeditor
},
data(){
    return{
        editor: null,
        editorData: ''
    }
},
props:{
    editorAddData:{
        type:String,
        default:''
    },

},
watch:{
    editorAddData(){
        this.editor.txt.html(this.editorAddData)
    }
},
mounted(){
    this.editor = new wangeditor(this.$refs.editorAdd);
     this.editor.config.onchange = (newHtml) => {
       this.editorData = newHtml;
       this.$emit('oneditor',this.editorData)
    }
    // 配置菜单栏，删减菜单，调整顺序
    this.editor.config.menus = [
         'head',
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'indent',
    'lineHeight',
    'foreColor',
    'backColor',
    'link',
    'list',
    'justify',
    'quote',
    'emoticon',
    'image',
    'video',
    'table',
    'code',
    'splitLine',
    'undo',
    'redo',
    ]
    this.editor.create()

}
}
</script>

<style>

</style>