import HomeView from '@/views/HomeView.vue'
import FaqView from '@/views/FaqView.vue'
import SolutionsView from '@/views/SolutionsView.vue'
import ContactView from '@/views/ContactView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import DeleteAccountView from '@/views/DeleteAccountView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

export const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/faq', name: 'faq', component: FaqView },
  { path: '/solutions', name: 'solutions', component: SolutionsView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/privacy', name: 'privacy', component: PrivacyView },
  { path: '/delete-account', name: 'delete-account', component: DeleteAccountView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
]
