{
    var vm = new Vue({
        el: '#app',
        data: {
            pageType: 'showLogin',
            user: {
                name: 'wjm',
                pwd: '',
                confirmPwd: '',
                currentUser: null
            },
            resume: {
                name: '王峻名',
                gender: '男',
                age: '24岁',
                address: '江西景德镇',
                phone: '13599307813',
                email: 'example@example.com',
                blogLink: 'https://wjmnightingale.github.io/wjmBlog.github.io',
                githubLink: 'https://github.com/WjmNightingale',
                jobTitle: '前端工程师',
            }
        },
        methods: {
            onEdit(key, data) {
                console.log(this.resume)
                this.resume[key] = data
            }
        }
    })
}