/* var vm = new Vue({
    el: '#example',
    data: {
        arr: arrAll,
        prov: '北京',
        city: '北京',
        district: '东城区',
        cityArr: [],
        districtArr: []
    },
    methods: {
        updateCity: function () {
            for (var i in this.arr) {
                var obj = this.arr[i];
                if (obj.name == this.prov) {
                    this.cityArr = obj.sub;
                    break;
                }
            }
            this.city = this.cityArr[1].name;
        },
        updateDistrict: function () {
            for (var i in this.cityArr) {
                var obj = this.cityArr[i];
                if (obj.name == this.city) {
                    this.districtArr = obj.sub;
                    break;
                }
            }
            if(this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
                this.district = this.districtArr[1].name;
            } else {
                this.district = '';
            }
        }
    },

    
    beforeMount: function () {
        this.updateCity();
        this.updateDistrict();
    },
    watch: {
        prov: function () {
            this.updateCity();
            this.updateDistrict();
        },
        city: function () {
            this.updateDistrict();
        }
    }
    })
 */

 import Vue from 'vue'
 import upperFirst from 'lodash/upperFirst'
 import camelCase from 'lodash/camelCase'

 const requireComponent = require.context(
     // 项目中组件目录的相对路径
     './components',
     // 是否查询子目录
     false,
     // 匹配基础组件文件名的正则表达式
     /Base[A-Z]\w+\.(vue|js)$/
 )
 requireComponent.keys().forEach(fileName => {
     // 获取组件配置
     const componentConfig = requireComponent(fileName)
     // 获取组件的 PascalCase 命名
     const componentName = upperFirst(
        camelCase(
            // 去掉文件名开头的`/`以及文件名的后缀（拓展名）
            fileName.replace(/^\.\/(.*)\.\w+$/,'$1')
        )
     )
 })

 // 全局注册组件

 Vue.component(
     componentName,
     // 如果这个组件选项是通过 `export default` 导出的，
     // 那么就会优先使用 `.default`
     // 否则回退到使用模块的根。
     componentConfig.default || componentConfig
 )