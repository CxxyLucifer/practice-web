import React, { Component } from 'react';
import echarts from 'echarts';

export default class pie extends Component {
    mixins: []
    myChart: null

    constructor(props) {
        super(props);
        this.state = {
            name: 'chart',              //图表唯一约束
            classnames: '',
            style: { height: '410px' },
            data: [],                  //图列数据
            option: null,       //默认option
        };
    }

    componentDidMount() {
        let _this = this;
        this._init();

        //浏览器大小改变时重置大小
        window.onresize = function () {
            _this._myChartContainer();
            _this.myChart.resize();
        };
    }

    componentWillUnmount() {
        this.myChart.clear()
        this.myChart.dispose()

        window.onresize = function () { };
    }

    render() {
        return (
            <div id="chart-container" style={{ width: '100%', marginTop: 20 }}>
                <div id="chart" className={this.state.classnames} style={this.state.style}></div>
            </div>
        )
    }

    //自适应宽高
    _myChartContainer() {
        let chartDiv = document.getElementById("chart");
        let chartContainer = document.getElementById("chart-container");
        chartDiv.style.width = chartContainer.offsetWidth + 'px';
    }

    _init() {
        this.myChart = echarts.init(document.getElementById("chart"));
        this._resetOption();
    }


    _resetOption() {
        let option = {
            title: {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        this.myChart.clear();
        this.myChart.setOption(option);
    }
}
