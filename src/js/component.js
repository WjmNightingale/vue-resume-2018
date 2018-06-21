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
    Vue.component('side-navigation', {
        props: ['value'],
        data() {
            return {}
        },
        template: `
        <div>
        <aside v-show="value">
        <ul class="side-navigation">
            <li>
                <button @click=edit>编辑</button>
            </li>
            <li>
                <button @click=preview>预览</button>
            </li>
            <li>
                <button @click=save>保存</button>
            </li>
            <li>
                <button @click=share>分享</button>
            </li>
            <li>
                <button @click=logout>退出</button>
            </li>
        </ul>
    </aside>
        </div>
        `,
        methods: {
            edit() {
                console.log('edit')
            },
            preview() {
                console.log('preview')
            },
            save() {
                console.log('save')
            },
            share() {
                console.log('share')
            },
            logout() {
                console.log('logout')
            }
        }
    })
    Vue.component('resume-edit-area',{
        props: ["resume","value"],
        data() {
            return {}
        },
       template: `
       <div>
        <div>{{resume}}</div>
        <div>{{value}}</div>
       </div>
       `
    })
}