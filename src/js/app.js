{
    var vm = new Vue({
        el: '#app',
        data: {
            showEditArea: true,
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
                skills: [{
                        name: '技能1',
                        description: '技能1非常厉害的'
                    },
                    {
                        name: '技能2',
                        description: '技能2非常厉害的'
                    },
                    {
                        name: '技能3',
                        description: '技能3非常厉害的'
                    },
                    {
                        name: '技能4',
                        description: '技能4非常厉害的'
                    }
                ],
                projects: [
                    {
                        name: 'Canvas轻画板1',
                        keywords: 'Canvas、jQuery、移动端',
                        description: '一个轻量级画板',
                        previewLink: '***这里是预览链接***',
                        codeLink: '***这里是代码链接***'
                    },
                    {
                        name: 'Canvas轻画板2',
                        keywords: 'Canvas、jQuery、移动端',
                        description: '一个轻量级画板',
                        previewLink: '***这里是预览链接***',
                        codeLink: '***这里是代码链接***'
                    },
                    {
                        name: 'Canvas轻画板3',
                        keywords: 'Canvas、jQuery、移动端',
                        description: '一个轻量级画板',
                        previewLink: '***这里是预览链接***',
                        codeLink: '***这里是代码链接***'
                    },
                    {
                        name: 'Canvas轻画板4',
                        keywords: 'Canvas、jQuery、移动端',
                        description: '一个轻量级画板',
                        previewLink: '***这里是预览链接***',
                        codeLink: '***这里是代码链接***'
                    }
                ]
            }
        },
        methods: {
            preview(e) {
                console.log('这是预览')
            },
            save(e) {
                console.log('保存')
                if (this.user.currentUser) {
                    //todo 已经登陆执行保存
                    this.saveResume()
                } else {
                    this.showEditArea = false
                    alert('您还未登录，请先登录!')
                }
            },
            share(e) {
                console.log('分享')
            },
            print(e) {},
            changeBackground(e) {},
            logout(e) {},
            addSkill() {
                console.log('add a skill')
                this.resume.skills.push({
                    name: '请填写技能名称',
                    description: '请填写技能描述'
                })
            },
            removeSkill(index) {
                this.resume.skills.splice(index,1)
            },
            saveResume() {
                let {
                    id
                } = AV.User.current()
                let user = AV.Object.createWithoutData('User', id)
                user.set('resume', this.resume)
                user.save().then((data) => {
                    alert('保存成功！')
                }, (error) => {
                    alert('保存失败')
                })
            },
            onEdit(key, data) {
                console.log(typeof key)
                console.log(key)
                // key = 'skills[0].name'
                let regex = /\[(\d+)\]/g
                key = key.replace(regex,(match,number,index) => '.'+number)
                needs = key.split('.')
                console.log(needs)
                let editData = this.resume
                for (let i = 0; i < needs.length; i++) {
                    if (i === needs.length-1) {
                        console.log(needs[i])
                        editData[needs[i]] = data
                    } else {
                        console.log(needs[i])
                        editData = editData[needs[i]]
                    }
                }
                //this.resume[key] = data
            },
            registered() {
                if (this.user.pwd === this.user.confirmPwd) {
                    let newUser = new AV.User()
                    newUser.setUsername(this.user.name)
                    newUser.setEmail(this.user.email)
                    newUser.setPassword(this.user.pwd)
                    newUser.signUp().then((loginedUser) => {
                        this.showEditArea = true
                        alert('注册成功，即将跳转至编辑页面！')
                        let currentUser = AV.User.current()
                        this.user.currentUser = currentUser
                    }, (error) => {
                        alert(JSON.stringify(error))
                    })
                } else {
                    alert('两次密码输入不一致，请重新输入')
                    return
                }
                Object.assign(this.user, {
                    name: '',
                    email: '',
                    pwd: '',
                    confirmPwd: ''
                })
            },
            login() {
                console.log('登录函数')
                AV.User.logIn(this.user.name, this.user.pwd).then((loginedUser) => {
                    this.showEditArea = true
                    let currentUser = AV.User.current()
                    this.user.currentUser = currentUser
                    alert('登录成功，即将跳转至编辑页面！')
                }, (error) => {
                    if (error.code === 211) {
                        alert('用户不存在，请先注册！')
                    }
                })
                Object.assign(this.user, {
                    name: '',
                    email: '',
                    pwd: '',
                    confirmPwd: ''
                })
            }
        }
    })
}