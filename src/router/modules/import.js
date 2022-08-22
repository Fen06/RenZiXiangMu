import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  meta: {
    id: 'import'
  },
  children: [
    {
      path: '',
      name: 'Import',
      component: () => import('@/views/import')
    }
  ]
}
