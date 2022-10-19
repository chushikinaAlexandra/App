<template>
    <div class="note">
        <div>
            <div class="title"><strong>{{note.title}}</strong></div>
            <div class="todo">
                <slot name="todo"></slot>
            </div>
        </div>
        <div class="button-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeEdit: null
        }
    },
    props: {
        note: {
            type: Object,
            required: true
        }
    },
}

</script>

<style>
.button-content{
    display: flex;
}
.note {
    padding: 20px;
    border: 3px solid teal;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    
}
  .title {
    font-size: 20px;
  }
  
  .todo {
    margin-top: 10px;
  }

.todo-item {
    margin-top: 5px;
}

.todo-label {
    margin-left: 5px;
}

</style>
