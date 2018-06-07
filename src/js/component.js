{
    Vue.component('editable-span', {
        props: ['value'],
        template: `
        <div class="editable-span">
                <span v-show="!editingName">{{value}}</span>
                <input v-show="editingName" type="text" v-bind:value="value" @input="update" @keyup.enter="editingName = !editingName">
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
                // console.log(e.target.value)
                this.$emit('edit', e.target.value)
            }
        }
    })
    Vue.component('editable-textarea', {
        props: ['value'],
        template: `
        <div class="editable-textarea">
                <p v-show="!editingName">{{value}}</p>
                <textarea v-show="editingName" type="text" v-bind:value="value" @input="update" cols=8 rows=4 @keyup.enter="editingName = !editingName"></textarea>
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