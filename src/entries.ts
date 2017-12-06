
export default [
    //user
    {
        name: 'user-list', path: '/user/list', exact: true,
        render: () => import(/* webpackChunkName: "user-list" */ './apps/user/user-list')
    },
    //chart
    {
        name: 'chart-line', path: '/chart/line', exact: true,
        render: () => import(/* webpackChunkName: "chart-line" */ './apps/chart/line')
    },
    {
        name: 'chart-pie', path: '/chart/pie', exact: true,
        render: () => import(/* webpackChunkName: "chart-pie" */ './apps/chart/pie')
    }
]