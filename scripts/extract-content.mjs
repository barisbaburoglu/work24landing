import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const src = fs.readFileSync(path.join(root, 'assets/js/translations.js'), 'utf8')
const match = src.match(/const translations = ({[\s\S]*?});\r?\n\r?\nlet currentLang/)
if (!match) throw new Error('translations object not found')
const translations = Function(`"use strict"; return (${match[1]})`)()

const extras = {
  tr: {
    seo_home_title: 'Work24',
    seo_home_description:
      'Simplify Workforce Management: Seamless Check-in/Check-out with QR Codes!',
    seo_contact_title: 'İletişim - Contact | Work24',
    seo_contact_description: 'Work24 İletişim Bilgileri',
    seo_privacy_title: 'Gizlilik Politikası - Privacy Policy | Work24',
    seo_privacy_description: 'Work24 Gizlilik Politikası',
    seo_delete_title: 'Hesap Silme - Delete Account | Work24',
    seo_delete_description: 'Work24 hesabınızı silmek için bu sayfayı kullanın',
    hero_badge: '✨ Yeni Nesil Personel yönetim Platformu',
    mobile_badge: '📱 Mobil Uygulama',
    mobile_title: "Work24'i Her Yerden Kullanın",
    mobile_description:
      'iOS ve Android uygulamalarımız ile işletmenizi her yerden yönetin. Çalışanlarınızı ekleyin, vardiya planlaması yapın ve tüm özelliklere mobil cihazınızdan erişin.',
    store_label_apple: 'İndirmek için',
    store_name_apple: 'App Store',
    store_label_google: "Google Play'den İndir",
    store_name_google: 'Google Play',
    how_title: 'Work24 Nasıl Çalışır?',
    how_subtitle: 'Üç basit adımda işletmenizi dijitalleştirin ve verimliliğinizi artırın',
    how_step1_title: 'Hesap Oluşturun',
    how_step1_desc: 'Hesabınızı oluşturun ve işletmenizi sisteme ekleyin. Sadece birkaç dakika sürer.',
    how_step2_title: 'Çalışanlarınızı Ekleyin',
    how_step2_desc: 'Çalışanlarınızı sisteme ekleyin, QR kodlarını oluşturun ve vardiya planlamasına başlayın.',
    how_step3_title: 'Yönetmeye Başlayın',
    how_step3_desc: 'Vardiya planlaması, izin yönetimi ve raporlama özelliklerini kullanmaya başlayın.',
    featured_dashboard_title: 'Yönetim Paneli',
    featured_dashboard_desc:
      'Gerçek zamanlı istatistikler ve özet kartlar ile işletmenizin durumunu tek bakışta görün. Çalışan durumları, vardiya özetleri, izin talepleri ve performans metrikleri gibi tüm önemli bilgilere anında erişin. Özelleştirilebilir dashboard sayesinde ihtiyacınıza göre görünümü düzenleyin ve verimliliğinizi artırın.',
    featured_shift_title: 'Vardiya Yönetimi',
    featured_shift_desc:
      'Esnek vardiya planlaması ile çalışanlarınızın çalışma saatlerini kolayca yönetin. Otomatik vardiya oluşturma, vardiya değişiklikleri, çalışan bazlı planlama ve vardiya takası özellikleri ile iş gücünüzü verimli bir şekilde organize edin. Vardiya çakışmalarını önleyin ve adil dağıtım sağlayın.',
    featured_leave_title: 'İzin Yönetimi',
    featured_leave_desc:
      'İzin taleplerini dijital ortamda kolayca yönetin. Çalışanlar izin taleplerini sisteme gönderebilir, yöneticiler onaylayabilir veya reddedebilir. İzin bakiyesi takibi, otomatik hesaplamalar ve detaylı izin raporları ile tüm izin süreçlerinizi şeffaf ve verimli bir şekilde yönetin.',
    pricing_users_label: 'Kişi Sayısı',
    pricing_users_hint: 'Fiyatlar kişi sayısına göre aylık toplam tutar üzerinden hesaplanır.',
    pricing_starter_title: 'Başlangıç',
    pricing_starter_subtitle: 'Yeni başlayan ekipler için temel özellikler',
    pricing_team_title: 'Profesyonel',
    pricing_team_subtitle: 'Büyüyen ekipler için gelişmiş özellikler',
    pricing_enterprise_title: 'Kurumsal',
    pricing_enterprise_subtitle: 'Geniş ekipler ve çoklu lokasyonlar için',
    pricing_popular: 'En Popüler',
    pricing_per_month: '/ay',
    pricing_due: 'Ödenecek tutar :',
    pricing_per_user: 'Kişi başı',
    pricing_year_suffix: ' / Yıl',
    pricing_demo: 'Demo İçin İletişime Geç',
    pricing_location_range: '{start} - {end} Konum',
    pricing_location_plus: '{start}+ Konum',
    menu_contact: 'İletişim',
    footer_quick: 'Hızlı Bağlantılar',
    footer_support: 'Destek',
    footer_contact: 'İletişim',
    footer_signup: 'Kayıt Ol',
    footer_signin: 'Giriş Yap',
    footer_delete: 'Hesap Silme',
    footer_kvkk_corporate: 'KVKK Aydınlatma Metni (Kurumsal)',
    footer_kvkk_employees: 'KVKK Aydınlatma Metni (Çalışanlar)',
    footer_copy: '© 2026 Work24. Tüm hakları saklıdır.',
    contact_title: 'İletişim',
    contact_lead: 'Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz.',
    contact_address: 'Adres',
    contact_phone: 'Telefon',
    contact_fax: 'Faks',
    contact_email: 'E-posta',
    contact_company: 'DEMİRKANLI MAKİNA İNŞAAT SAN. VE TİC A.Ş.',
    contact_street: '',
    contact_city: 'Ataşehir / İstanbul',
    delete_warn_1: 'Hesabınız kalıcı olarak silinecektir',
    delete_warn_2: 'Tüm verileriniz (çalışan bilgileri, vardiya kayıtları, raporlar) kalıcı olarak silinecektir',
    delete_warn_3: 'Bu işlem geri alınamaz',
    delete_warn_4: 'Yedekleme yapmanızı öneririz',
    privacy_updated: 'Son güncelleme: 06.01.2026',
    lang_tr: 'Türkçe',
    lang_en: 'English',
  },
  en: {
    seo_home_title: 'Work24',
    seo_home_description:
      'Simplify Workforce Management: Seamless Check-in/Check-out with QR Codes!',
    seo_contact_title: 'İletişim - Contact | Work24',
    seo_contact_description: 'Work24 İletişim Bilgileri',
    seo_privacy_title: 'Gizlilik Politikası - Privacy Policy | Work24',
    seo_privacy_description: 'Work24 Gizlilik Politikası',
    seo_delete_title: 'Hesap Silme - Delete Account | Work24',
    seo_delete_description: 'Work24 hesabınızı silmek için bu sayfayı kullanın',
    hero_badge: '✨ Next Generation Business Management Platform',
    mobile_badge: '📱 Mobile App',
    mobile_title: 'Use Work24 From Anywhere',
    mobile_description:
      'Manage your business from anywhere with our iOS and Android apps. Add your employees, plan shifts, and access all features from your mobile device.',
    store_label_apple: 'Download on the',
    store_name_apple: 'App Store',
    store_label_google: 'Get it on',
    store_name_google: 'Google Play',
    how_title: 'How Work24 Works?',
    how_subtitle: 'Digitalize your business and increase efficiency in three simple steps',
    how_step1_title: 'Create Account',
    how_step1_desc: 'Create your account and add your business to the system. It only takes a few minutes.',
    how_step2_title: 'Add Your Employees',
    how_step2_desc: 'Add your employees to the system, create their QR codes and start shift planning.',
    how_step3_title: 'Start Managing',
    how_step3_desc: 'Start using shift planning, leave management and reporting features.',
    featured_dashboard_title: 'Dashboard',
    featured_dashboard_desc:
      'View your business status at a glance with real-time statistics and summary cards. Instantly access all important information such as employee statuses, shift summaries, leave requests, and performance metrics. Customize your dashboard view according to your needs and increase your efficiency.',
    featured_shift_title: 'Shift Management',
    featured_shift_desc:
      "Easily manage your employees' working hours with flexible shift planning. Organize your workforce efficiently with features such as automatic shift creation, shift changes, employee-based planning, and shift swapping. Prevent shift conflicts and ensure fair distribution.",
    featured_leave_title: 'Leave Management',
    featured_leave_desc:
      'Easily manage leave requests in a digital environment. Employees can submit leave requests to the system, and managers can approve or reject them. Manage all your leave processes transparently and efficiently with leave balance tracking, automatic calculations, and detailed leave reports.',
    pricing_users_label: 'Number of users',
    pricing_users_hint: 'Prices are calculated as total monthly amount based on user count.',
    pricing_starter_title: 'Starter',
    pricing_starter_subtitle: 'Core features for small teams',
    pricing_team_title: 'Professional',
    pricing_team_subtitle: 'Advanced features for growing teams',
    pricing_enterprise_title: 'Enterprise',
    pricing_enterprise_subtitle: 'For large teams and multi-location needs',
    pricing_popular: 'Most Popular',
    pricing_per_month: '/mo',
    pricing_due: 'Total due :',
    pricing_per_user: 'per user',
    pricing_year_suffix: ' / Year',
    pricing_demo: 'Contact for Demo',
    pricing_location_range: '{start} - {end} Location',
    pricing_location_plus: '{start}+ Location',
    menu_contact: 'Contact',
    footer_quick: 'Quick Links',
    footer_support: 'Support',
    footer_contact: 'Contact',
    footer_signup: 'Sign Up',
    footer_signin: 'Sign In',
    footer_delete: 'Delete Account',
    footer_kvkk_corporate: 'KVKK Clarification Notice (Corporate)',
    footer_kvkk_employees: 'KVKK Clarification Notice (Employees)',
    footer_copy: '© 2026 Work24. All rights reserved.',
    contact_title: 'Contact',
    contact_lead: 'You can use the following information to contact us.',
    contact_address: 'Address',
    contact_phone: 'Phone',
    contact_fax: 'Fax',
    contact_email: 'Email',
    contact_company: 'DEMİRKANLI MAKİNA İNŞAAT SAN. VE TİC A.Ş.',
    contact_street: '',
    contact_city: 'Ataşehir / İstanbul',
    delete_warn_1: 'Your account will be permanently deleted',
    delete_warn_2: 'All your data (employee information, shift records, reports) will be permanently deleted',
    delete_warn_3: 'This action cannot be undone',
    delete_warn_4: 'We recommend backing up your data',
    privacy_updated: 'Last updated: 06.01.2026',
    lang_tr: 'Türkçe',
    lang_en: 'English',
  },
}

const outDir = path.join(root, 'src/i18n/locales')
fs.mkdirSync(outDir, { recursive: true })
for (const locale of ['tr', 'en']) {
  const merged = { ...translations[locale], ...extras[locale] }
  fs.writeFileSync(path.join(outDir, `${locale}.json`), `${JSON.stringify(merged, null, 2)}\n`)
}

const privacyHtml = fs.readFileSync(path.join(root, 'privacy.html'), 'utf8')
function extractPrivacy(lang) {
  const re = new RegExp(
    `<div data-tr="${lang}"[^>]*>([\\s\\S]*?)</div>\\s*(?:<div data-tr=|</div>\\s*</div>\\s*</div>\\s*</div>\\s*</section>)`,
  )
  const found = privacyHtml.match(re)
  if (!found) throw new Error(`privacy ${lang} not found`)
  return found[1].trim()
}

const privacyDir = path.join(root, 'src/data')
fs.mkdirSync(privacyDir, { recursive: true })
fs.writeFileSync(
  path.join(privacyDir, 'privacyHtml.js'),
  `export const privacyHtml = {\n  tr: ${JSON.stringify(extractPrivacy('tr'))},\n  en: ${JSON.stringify(extractPrivacy('en'))},\n}\n`,
)

console.log('extracted locales and privacy html')
