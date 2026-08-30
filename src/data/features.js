export const featureCards = [
  { icon: 'QrCode', tone: 'green', titleKey: 'feature_qr_title', descKey: 'feature_qr_description' },
  { icon: 'CalendarClock', tone: 'blue', titleKey: 'feature_shift_title', descKey: 'feature_shift_description' },
  { icon: 'CheckSquare', tone: 'mint', titleKey: 'feature_leave_title', descKey: 'feature_leave_description' },
  { icon: 'BarChart3', tone: 'cyan', titleKey: 'feature_payroll_title', descKey: 'feature_payroll_description' },
  { icon: 'LayoutGrid', tone: 'blue', titleKey: 'feature_dashboard_title', descKey: 'feature_dashboard_description' },
  { icon: 'Bell', tone: 'green', titleKey: 'feature_notification_title', descKey: 'feature_notification_description' },
  { icon: 'Layers', tone: 'mint', titleKey: 'feature_role_title', descKey: 'feature_role_description' },
  { icon: 'Smartphone', tone: 'cyan', titleKey: 'feature_mobile_title', descKey: 'feature_mobile_description' },
  { icon: 'Timer', tone: 'green', titleKey: 'feature_overtime_title', descKey: 'feature_overtime_description' },
]

export function shotSrc(name, locale) {
  return locale === 'en' ? `/images/${name}-en.png` : `/images/${name}.png`
}

export function featuredBlocksFor(locale) {
  return [
    {
      titleKey: 'featured_dashboard_title',
      descKey: 'featured_dashboard_desc',
      image: shotSrc('dashboard', locale),
      reverse: false,
    },
    {
      titleKey: 'featured_shift_title',
      descKey: 'featured_shift_desc',
      image: shotSrc('shift', locale),
      reverse: true,
    },
    {
      titleKey: 'featured_leave_title',
      descKey: 'featured_leave_desc',
      image: shotSrc('leave', locale),
      reverse: false,
    },
    {
      titleKey: 'featured_timesheet_title',
      descKey: 'featured_timesheet_desc',
      image: shotSrc('timesheet', locale),
      reverse: true,
    },
  ]
}
