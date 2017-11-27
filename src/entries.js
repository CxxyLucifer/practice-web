
export default [
    /*主页*/
    {
        name: 'main-page', path: '/', exact: true,
        render: () => System.import(/* webpackChunkName: "main-page" */ './apps/main/index')
    }
]