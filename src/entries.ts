
export default [
    //login
    {
        name: 'login', path: '/login', exact: true,
        render: () => System.import(/* webpackChunkName: "login" */ './apps/login/index')
    },
    //user
    {
        name: 'user-list', path: '/user/list', exact: true,
        render: () => System.import(/* webpackChunkName: "user-list" */ './apps/user/user-list')
    },
    //chart
    {
        name: 'chart-line', path: '/chart/line', exact: true,
        render: () => System.import(/* webpackChunkName: "chart-line" */ './apps/chart/line')
    },
    {
        name: 'chart-pie', path: '/chart/pie', exact: true,
        render: () => System.import(/* webpackChunkName: "chart-pie" */ './apps/chart/pie')
    }
]