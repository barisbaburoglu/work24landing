import HomeView from '@/views/HomeView.vue'
import FaqView from '@/views/FaqView.vue'
import SolutionsView from '@/views/SolutionsView.vue'
import ContactView from '@/views/ContactView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import DeleteAccountView from '@/views/DeleteAccountView.vue'
import KvkkCorporateView from '@/views/KvkkCorporateView.vue'
import KvkkEmployeesView from '@/views/KvkkEmployeesView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { SUPPORTED_LOCALES } from '@/i18n/locale'
import { DEFAULT_LOCALE, isHomePage, legacyRedirectTarget, localizedPath, PAGE_NAMES } from '@/i18n/paths'

const PAGE_COMPONENTS = {
  home: HomeView,
  features: HomeView,
  'how-it-works': HomeView,
  pricing: HomeView,
  faq: FaqView,
  solutions: SolutionsView,
  contact: ContactView,
  privacy: PrivacyView,
  'delete-account': DeleteAccountView,
  'kvkk-corporate': KvkkCorporateView,
  'kvkk-employees': KvkkEmployeesView,
}

const LEGACY_PATHS = [
  '/faq',
  '/solutions',
  '/contact',
  '/privacy',
  '/delete-account',
  '/sss',
  '/cozumler',
  '/iletisim',
  '/gizlilik',
  '/hesap-silme',
  '/kvkk-clarification-notice-corporate.html',
  '/kvkk-clarification-notice-employees.html',
  '/kvkk-kurumsal',
  '/kvkk-calisanlar',
  '/kvkk-corporate',
  '/kvkk-employees',
  '/ozellikler',
  '/features',
  '/nasil-calisir',
  '/how-it-works',
  '/fiyatlandirma',
  '/pricing',
]

function buildLocaleRoutes() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    PAGE_NAMES.map((page) => ({
      path: localizedPath(locale, page),
      name: `${page}__${locale}`,
      component: PAGE_COMPONENTS[page],
      meta: {
        locale,
        page,
        homeSection: isHomePage(page),
      },
    })),
  )
}

export const routes = [
  {
    path: '/',
    redirect: () => localizedPath(DEFAULT_LOCALE, 'home'),
  },
  ...LEGACY_PATHS.map((path) => ({
    path,
    redirect: () => legacyRedirectTarget(path) || localizedPath(DEFAULT_LOCALE, 'home'),
  })),
  ...buildLocaleRoutes(),
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { locale: DEFAULT_LOCALE, page: 'home' },
  },
]
