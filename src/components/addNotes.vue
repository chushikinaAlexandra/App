<template> 
<div class="createNote">
    <h4>Создание заметки</h4>
    <input v-model="title" class="input" type="text" placeholder="Название">
    <input v-model="body.todo" @keydown.enter="addNote"  class="input" type="text" placeholder="Содержание">
    <div class="button-content">
        <button @click="addNote" class="btn">Добавить пункт</button>
        <button @click="$emit('close-added', title, body.todo)" class="btn" style="margin-top: 15px; margin-left: 5px;" :disabled="disabled">Создать заметку</button>
    </div>
</div>
</template>

<script>

export default{
    props:{
        disabled:{
            type: Boolean,
            required: true
        }
    },

    data(){
        return{
            title:'',
            body: {
                todo:'',
                checked: false
            }
        }
    },

    methods:{
        addNote(){
            this.$emit('add-note', this.title, this.body.todo)
            this.body.todo=''
        },
    }
}

</script>

<style>
.button-content{
    display: flex;
    justify-content: flex-end;
}
</style>