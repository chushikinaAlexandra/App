<template>
<div>
    <h1>Заметки</h1>
    <button @click="dialogVisible=true" class="btn" style="margin-top: 15px">Создать заметку</button>
    <modal-window v-model:show="dialogVisible">
      <note-item v-if="currentNote" :note="currentNote" style="margin-bottom: 10px">
      <template v-slot:todo>
      <div v-for="todoItem in currentNote.body" class="todo-item">
        <input disabled type="checkbox"/>
        <label class="todo-label">{{todoItem.todo}}</label>
      </div>
    </template>
    </note-item>
      <add-notes :disabled="disabled" 
      @close-added="closeModalAdded" @add-note="addNote"></add-notes>
    </modal-window>
    <notes-list @delete-note="deleteNote" :notes="notes"></notes-list>
</div>
</template>
  
  <script>
  import addNotes from '@/components/addNotes.vue'
  import notesList from '@/components/notesList.vue'
  import ModalWindow from '@/components/ModalWindow.vue'
  import noteItem from '@/components/noteItem.vue'
    export default {
      name: 'notes',
  
      components:{
        addNotes,
        notesList,
        ModalWindow,
        noteItem
      },
  
      data() {
        return {
          notes: [],
        dialogVisible: false,
        currentNote: ''
        }
      },

      created(){
        const notesData = localStorage.getItem("notes")
        if (notesData){
            this.notes = JSON.parse(notesData)
        } 
      },
  
      methods: {
        addNote(title, item){
          const newNoteBody = {
            id: Date.now(),
            todo: item, 
            checked: false
          }
          if (!(this.notes.find(note => note.title === title))){
          const newNote = {
            id: Date.now(),
            title: title,
            body: [newNoteBody]
          }
            this.notes.push(newNote)
            this.currentNote=newNote
        }
          else{
            this.notes.filter(note => note.title === title).map(note => {
              note.body.push(newNoteBody)
              localStorage.setItem("notes", JSON.stringify(this.notes))
            })
          }
        },
        closeModalAdded(title, item){
          this.addNote(title, item)
          this.dialogVisible=false
          this.currentNote=''
        },
         deleteNote(note){
          this.notes = this.notes.filter(n => n.id !== note.id)
         }
      },
  
      computed:{
        disabled(){
          return this.currentNote ? false : true
        },
      },

      watch:{
        notes(){
          localStorage.setItem("notes", JSON.stringify(this.notes))
        }
      }
    }
  
  </script>
  
  <style>  
  .btn {
    padding: 10px;
    background-color: white;
    border: 2px solid teal;
    align-self: flex-end;
  }
  
  .createNote{
    display: flex;
    flex-direction: column;
  }
  
  .input{
    margin-top: 10px;
    padding: 10px;
    border: 1px solid teal;
    width: 100%;
  }
  
  </style>
  