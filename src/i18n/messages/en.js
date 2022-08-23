import enLocale from 'element-ui/lib/locale/lang/en'
export default {
  name: 'English',
  dashboard: {
    calendar: 'calendar',
    Performance: 'Performance'
  },
  ...enLocale,
  route: {
    首页: 'dashboard',
    员工: 'employees',
    审批: 'approvals',
    组织架构: 'departments',
    权限管理: 'permissions',
    考勤: 'Attendances',
    工资: 'salarys',
    设置设置: 'Company-Settings',
    社保: 'Social'
  }
}
