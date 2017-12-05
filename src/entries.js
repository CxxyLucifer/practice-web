
export default [
    /*主页*/
    {
        name: 'main-page', path: '/main', exact: true,
        render: () => System.import(/* webpackChunkName: "main-page" */ './apps/main/index')
    },
    {
        name: 'user-list', path: '/user/list', exact: true,
        render: () => System.import(/* webpackChunkName: "user-list" */ './apps/user/user-list')
    },
    {
        name: 'chart-line', path: '/chart/line', exact: true,
        render: () => System.import(/* webpackChunkName: "chart-line" */ './apps/chart/line')
    },
    {
        name: 'chart-pie', path: '/chart/pie', exact: true,
        render: () => System.import(/* webpackChunkName: "chart-pie" */ './apps/chart/pie')
    }
]