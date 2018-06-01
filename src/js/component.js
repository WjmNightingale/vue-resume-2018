{
    Vue.component('editable-span', {
        props: ['value'],
        template: `
        <div class="template">
                <span v-show="!editingName">{{value}}</span>
                <input v-show="editingName" type="text" v-bind:value="value" @input="update">
                <svg class="icon edit" aria-hidden="true"  @click="editingName = !editingName">
                    <use xlink:href="#icon-edit"></use>
                </svg>
        </div>`,
        data() {
            return {
                editingName: false
            }
        },
        methods: {
            update(e) {
                console.log(e.target.value)
                this.$emit('edit', e.target.value)
            }
        }
    })
}