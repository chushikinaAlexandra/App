<template>
    <note-item :note="note">
        <template v-slot:todo>
            <div v-for="(todoItem, i) in note.body" :key="i" class="todo-item">
                <input @change="changeCheck(todoItem)" type="checkbox" v-model="todoItem.checked" />
                <label :class="{
                  'line': todoItem.checked===true,
                }" v-if="todoItem.todo!=activeEdit" @click="editTodo(todoItem)"
                    class="todo-label">{{todoItem.todo}}</label>
                <input type="text" v-show="todoItem.todo==activeEdit && activeEdit" v-model="note.body[i].todo"
                    @input="editTodo(todoItem)"
                    @blur="doneEdit(todoItem)">
            </div>
        </template>
        <div class="button-add">
        <button @click="isShow=true" class="btn" style="margin-bottom: 5px ;">Добавить пункт</button>
        <input class="addTodo" @keyup.enter="addTodo" @blur="isShow=false" v-model="todo" v-show="isShow" type="text">
        </div>
        <button class="btn" @click="saveEdits" style="margin-left: 5px; margin-bottom: 5px">Сохранить изменения</button>
    </note-item>
    <div class="btns-menu">
    <button @click="$router.push('/')" class="btn" style="margin-top:15px">Назад к заметкам</button>
    <div>
    <button @click="cancelEdit" :disabled="disabled1" class="btn" style="margin-top:15px; margin-right: 5px;">Отменить действия</button>
    <button @click="returnEdit" :disabled="disabled2" class="btn" style="margin-top:15px;">Вернуть отмененные действия</button>
    </div>
    </div>
</template>

<script>
import noteItem from '@/components/noteItem.vue'
import _ from 'lodash'
export default {
    components: {
        noteItem
    },
    data() {
        return {
            note: '',
            notes: [],
            activeEdit: '',
            todo: '',
            isShow: false,
            history: [],
            click: 1,
            disabled1: true,
            disabled2: true
        }
    },

    created() {
        this.notes = JSON.parse(localStorage.getItem('notes'))
        this.note = this.notes.find(note => note.id == this.$route.params.id)
        this.history=[_.cloneDeep(this.note)]
    },

    methods: {
        editTodo(todoItem) {
            this.activeEdit = todoItem.todo
        },
        doneEdit(todoItem) {
            if (!todoItem.todo) {
                this.note.body = this.note.body.filter(todo => todo.id!==todoItem.id)
            }
            this.activeEdit = ''
            todoItem.todo = todoItem.todo.trim()
            this.historyPush()
        },

        changeCheck(todoItem) {
            todoItem.checked ? false : true
            this.historyPush()
        },

        addTodo() {
            const newTodo = {
                id: Date.now(),
                todo: this.todo,
                checked: false
            }
            this.note.body.push(newTodo)
            this.todo=''
            this.historyPush()
        },

        saveEdits(){
            localStorage.setItem("notes", JSON.stringify(this.notes))
            this.history=[]
        },
        cancelEdit(){
            this.click+=1
            this.disabled2=false
            if (this.history.length-this.click>=0){
                this.note=this.history[this.history.length-this.click]
                if (this.history.length-this.click===0){
                    this.disabled1=true
                }
            }
        
                

            console.log(this.click)
            console.log(this.history.length-this.click)
            console.log(this.history.at(-this.click))
        },
        returnEdit(){
            this.click-=1
            this.disabled1=false
            if (this.history.length>this.history.length-this.click){
                this.note=this.history[this.history.length-this.click]
                console.log(this.click)
                console.log(this.history.length-this.click)
                if (this.click===1){
                    this.disabled2=true
                }
                    
            }
        },

        historyPush(){
            if (!_.isEqual(this.note, this.history)) {
                    this.history.push(_.cloneDeep(this.note))
                    this.click=1
                    this.disabled1=false
                    this.disabled2=false
                    console.log(this.history)
                }
        }
    },

    // watch:{
    //     note: {
    //         handler(val){
    //             if (!_.isEqual(val, this.history) && !this.isEdit) {
    //                 this.history.push(_.cloneDeep(val))
    //                 console.log(this.history)
    //             }
    //         },
    //         deep: true
    //     }
    // }
}

</script>

<style>
.btns-menu{
    display: flex;
    justify-content: space-between;
}
.line {
    text-decoration: line-through
}

.button-add{
    display: flex;
    flex-direction: column;
}
</style>