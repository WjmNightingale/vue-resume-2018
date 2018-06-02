{
    var vm = new Vue({
        el: '#app',
        data: {
            showIndex: true,
            showLogin: false,
            actionType: 'login',
            user: {
                name: '',
                email: '',
                pwd: '',
                confirmPwd: '',
                currentUser: null
            },
            resume: {
                name: '王大状',
                gender: '男',
                age: '23岁',
                address: '江西南昌市',
                phone: '13599307813',
                email: 'example@example.com',
                blogLink: 'https://wjmnightingale.github.io/wjmBlog.github.io',
                githubLink: 'https://github.com/WjmNightingale',
                jobTitle: '前端工程师',
            }
        },
        methods: {
            save(e) {
                console.log('保存')
                if (this.user.currentUser) {
                    //todo 已经登陆执行保存
                    this.saveResume()
                } else {
                    this.showIndex = false
                    this.showLogin = true
                    alert('您还未登录，请先登录!')
                }
            },
            share(e) {
                console.log('分享')
            },
            print(e) {},
            changeBackground(e) {},
            logout(e) {},
            saveResume() {
                let {id} = AV.User.current()
                let user = AV.Object.createWithoutData('User',id)
                user.set('resume',this.resume)
                user.save().then((data) => {
                    alert('保存成功！')
                },(error) => {
                    alert('保存失败')
                })
            },
            onEdit(key, data) {
                console.log(this.resume)
                this.resume[key] = data
            },
            registered() {
                if (this.user.pwd === this.user.confirmPwd) {
                    let newUser = new AV.User()
                    newUser.setUsername(this.user.name)
                    newUser.setEmail(this.user.email)
                    newUser.setPassword(this.user.pwd)
                    newUser.signUp().then((loginedUser) => {
                        this.showIndex = true
                        this.showLogin = false
                        alert('注册成功，即将跳转至编辑页面！')
                        let currentUser = AV.User.current()
                        this.user.currentUser = currentUser
                    },(error) => {
                        alert(JSON.stringify(error))
                    })
                } else {
                    alert('两次密码输入不一致，请重新输入')
                    return
                }
                Object.assign(this.user,{
                    name: '',
                    email: '',
                    pwd: '',
                    confirmPwd: ''
                })
            },
            login() {
                console.log('登录函数')
                AV.User.logIn(this.user.name,this.user.pwd).then((loginedUser) => {
                    this.showIndex = true
                    this.showLogin = false
                    let currentUser = AV.User.current()
                    this.user.currentUser = currentUser
                    alert('登录成功，即将跳转至编辑页面！')
                },(error) => {
                    if (error.code === 211) {
                        alert('用户不存在，请先注册！')
                    }
                })
                Object.assign(this.user,{
                    name: '',
                    email: '',
                    pwd: '',
                    confirmPwd: ''
                })
            }
        }
    })
}