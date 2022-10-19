import { createRouter, createWebHistory } from 'vue-router'
import NotesPage from '@/pages/NotesPage'
import NoteItemPage from '@/pages/NoteItemPage'


const routes = [
  {
    path: '/',
    component: NotesPage
  },
  {
    path: '/:id',
    component: NoteItemPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
