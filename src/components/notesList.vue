<template>
    <div class="notes">
    <note-item 
        style="margin-top: 30px;"
        v-for="note in notes" 
        :key="note.id" 
        :note="note"
    >
    <template v-slot:todo>
    <div v-for="todoItem in note.body.slice(0, 3)" class="todo-item">
        <input disabled type="checkbox"/>
        <label class="todo-label">{{todoItem.todo}}</label>
    </div>
    </template>
    <div class="post-btn">
    <button :note="note" @click="$router.push(`/${note.id}`)" class="btn" style="background-color: teal; color: white; margin-right: 5px;">Редактировать</button>
    <button @click="$emit('delete-note', note)" class="btn">Удалить</button>
    </div>
    </note-item>
    </div>
</template>

<script>
import noteItem from './noteItem.vue'
export default{
    components:{
        noteItem
    },

    props:{
        notes: {
            type: Array,
            required: true
        }
    }
}

</script>

<style>

</style>