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
        <div class="resume-edit" v-show="value">
                    <section class="self-introduction">
                        <h1>个人简介</h1>
                        <div class="details">
                            <div class="applicant-name">
                                <span>姓名：</span>
                                <editable-span v-bind:value="resume.name" v-on:edit="onEdit('name',$event)"></editable-span>
                            </div>
                            <div class="applicant-gender">
                                <span>性别：</span>
                                <select name="gender" id="gender" v-model="resume.gender" v-cloak>
                                    <option disabled value="">请选择</option>
                                    <option>男</option>
                                    <option>女</option>
                                </select>
                            </div>
                            <div class="applicant-age">
                                <span>年龄：</span>
                                <editable-span v-bind:value="resume.age" v-on:edit="onEdit('age',$event)"></editable-span>
                            </div>
                            <div class="address" v-cloak>
                                <span>居住地：</span>
                                <select name="address" id="address" v-model="resume.address.prov" v-cloak>
                                    <option v-for="option in arr" v-bind:value="option.name">{{option.name}}</option>
                                </select>
                                <select name="city" id="city" v-model="resume.address.city" v-cloak>
                                    <option v-for="option in cityArr" v-bind:value="option.name">{{option.name}}</option>
                                </select>
                                <select name="district" id="district" v-model="resume.address.district" v-if="resume.address.district" v-cloak>
                                    <option v-for="option in districtArr" v-bind:value="option.name">{{option.name}}</option>
                                </select>
                            </div>
                            <div class="contact">
                                <span>手机号码：</span>
                                <editable-span v-bind:value="resume.phone" v-on:edit="onEdit('phone',$event)"></editable-span>
                            </div>
                            <div class="job-title">
                                <span>求职意向: &nbsp;</span>
                                <editable-span v-bind:value="resume.jobTitle" v-on:edit="onEdit('jobTitle',$event)"></editable-span>
                            </div>
                            <div class="links">
                                <span>Github：</span>
                                <editable-span v-bind:value="resume.githubLink" v-on:edit="onEdit('githubLink',$event)"></editable-span>
                            </div>
                            <div class="links">
                                <span>博客链接：</span>
                                <editable-span v-bind:value="resume.blogLink" v-on:edit="onEdit('blogLink',$event)"></editable-span>
                            </div>
                        </div>
                    </section>
                    <section class="skills">
                        <h1>技能描述</h1>
                        <ul>
                            <li v-for="(skill,index) in resume.skills">
                                <editable-span class="skill-name" v-bind:value="skill.name" v-on:edit="onEdit('skills['+index+'].name',$event)"></editable-span>
                                <editable-textarea class="skill-description" v-bind:value="skill.description" v-on:edit="onEdit('skills['+index+'].description',$event)"></editable-textarea>
                                <span v-show="index > 0" class="remove" @click=removeSkill(index) title="删除该技能描述">X</span>
                                <div class="horizon"></div>
                            </li>
                        </ul>
                        <span class="add-skill" @click=addSkill title="添加你的技能描述">添加技能</span>
                    </section>
                    <section class="projects">
                        <h1>项目经历</h1>
                        <ol>
                            <li v-for="(project,index) in resume.projects">
                                <span v-show="index > 0" class="remove" @click=removeProject(index) title="删除该项目描述">X</span>
                                <div class="project-name">
                                    <span>项目名：</span>
                                    <editable-span v-bind:value="project.name" v-on:edit="onEdit('projects['+index+'].name',$event)"></editable-span>
                                </div>
                                <div class="project-keywords">
                                    <span>技术栈：</span>
                                    <editable-span v-bind:value="project.keywords" v-on:edit="onEdit('projects['+index+'].keywords',$event)"></editable-span>
                                </div>
                                <div class="project-description">
                                    <!-- <span>项目描述</span> -->
                                    <editable-textarea v-bind:value="project.description" v-on:edit="onEdit('projects['+index+'].description',$event)"></editable-textarea>
                                </div>
                                <div class="project-preview-link">
                                    <span>预览链接</span>
                                    <editable-span v-bind:value="project.previewLink" v-on:edit="onEdit('projects['+index+'].previewLink',$event)"></editable-span>
                                </div>
                                <div class="project-code-link">
                                    <span>源码链接</span>
                                    <editable-span v-bind:value="project.codeLink" v-on:edit="onEdit('projects['+index+'].codeLink',$event)"></editable-span>
                                </div>
                                <div class="horizon"></div>
                            </li>
                        </ol>
                        <span class="add-project" @click=addProject title="添加你的项目经历">添加项目</span>
                    </section>
                </div>
        `,
        methods: {}
    })
}