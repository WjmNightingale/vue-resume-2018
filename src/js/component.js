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
    Vue.component('login-template',{
        props: ['user'],
        template: `
        <div class="login container" v-show="showLogin">
        <h1>Vue.js简历编辑器</h1>
        <p>欢迎使用</p>
        <form @submit.prevent="login">
            <div class="formRow">
                <span>用户名:</span>
                <input type="text" v-model="user.name" placeholder="请输入您的用户名">
            </div>
            <div class="horizon"></div>
            <div class="formRow">
                <span>密码:</span>
                <input type="password" v-model="user.pwd" placeholder="请输入您的密码">
            </div>
            <div class="horizon"></div>
            <label for="formActions" class="formActions">
                <input type="submit" value="登陆">
            </label>
        </form>
        <div class="protocol">
            <a href="#">手机验证码登陆</a>
            <a href="#">忘记密码？</a>
        </div>
        <div class="change">
            <span>没有账号？</span>
            <label for="registered">
                <input id="registered" @click="jumpToRegistered" name="type">去注册
            </label>
        </div>
    </div>
        `,
        data() {
            return {
                showLogin: true
            }
        },
        methods: {
            jumpToRegistered(e) {
                console.log('点击跳转至注册')
                this.showLogin = !this.showLogin
            }
        }
    })
    Vue.component('registered-template',{
        props: ['user'],
        template: `
        <!-- <div class="registered container" v-if="showRegistered">
                <h1>Vue.js简历编辑器</h1>
                <p>欢迎注册</p>
                <form @submit.prevent=singUp>
                    <div class="formRow">
                        <span>用户名:</span>
                        <input type="text" v-model="user.name" placeholder="请输入您的用户名">
                    </div>
                    <div class="horizon"></div>
                    <div class="formRow">
                        <span>密码:</span>
                        <input type="password" v-model="user.pwd" placeholder="请输入您的密码">
                    </div>
                    <div class="horizon"></div>
                    <div class="formRow">
                        <span>确认密码:</span>
                        <input type="password" v-model="user.confirmPwd" placeholder="请输入您的密码">
                    </div>
                    <div class="horizon"></div>
                    <label for="formActions" class="formActions">
                        <input type="submit" value="注册">
                    </label>
                </form>
                <div class="protocol">
                    <p>注册即代表你使用《假装协议》</p>
                    <a href="#">注册机构号</a>
                </div>
                <div class="change">
                    <span>已有账号？</span>
                    <label for="login">
                        <input @click="jumpToLogin" id="login" type="radio">去登陆
                    </label>
                </div>
            </div> -->
        `,
        data() {
            return {
                showRegistered: true
            }
        },
        methods: {
            jumpToLogin(e) {
               console.log('点击跳转至登陆')
               this.showRegistered = !this.showRegistered
            }
        }
    })
}