import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Import',
      component: () => import('@/views/import')
    }
  ]
}
