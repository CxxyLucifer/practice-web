import React, { Component } from 'react';
import echarts from 'echarts';

export default class Chart extends Component {
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
        let data1Arry = [10, 50, 45, 60, 100, 120, 90];
        let data2Arry = [100, 70, 480, 110, 310, 110, 50];
        let cardinalArry = ["2017-10-22", "2017-10-23", "2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27", "2017-10-28"];

        let series = [
            {
                name: '新增客户数',
                type: 'line',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: 'rgba(193,139,255,0.1)'
                    }
                },
                symbol: 'circle',
                symbolSize: 14,
                hoverAnimation: false,
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 2,
                    }
                },
                data: data1Arry
            },
            {
                name: '代客下单数',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 14,
                hoverAnimation: false,
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 2,
                    }
                },
                areaStyle: {
                    normal: {
                        color: 'rgba(89,184,233,0.1)'
                    }
                },
                data: data2Arry

            }
        ];
        let legendData = [
            {
                name: '新增客户数'
            },
            {
                name: '代客下单数'
            }
        ];

        let cardinalList = cardinalArry;
        let tooltip = {
            trigger: 'axis'
        };
        let xAxis = [{
            minInterval: 1,
            type: 'category',
            boundaryGap: cardinalList.length == 1 ? true : false,
            data: cardinalList,
            nameTextStyle: {
                color: '#999'
            },
            axisLine: {
                lineStyle: {
                    width: 0
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color: '#f4f4f4'
                }
            }
        }];

        let yAxis = [{
            type: 'value',
            name: '数量',
            minInterval: 1,
            nameTextStyle: {
                fontSize: 12,
                color: '#666'
            },
            axisLabel: {
                formatter: '{value}'
            },
            axisLine: {
                lineStyle: {
                    width: 0
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#f4f4f4'
                }
            },
        }];

        let legend = {
            data: legendData,
            right: 60,
            itemGap: 32
        };

        let option = {
            grid: {
                x: 89,
                y: 89,
                x2: 60,
                y2: 64,
            },
            title: {
                text: '折线图',
                textStyle: {
                    color: '#666',
                    fontSize: 16
                },
                x: 'center'
            },
            color: ['rgb(193,139,255)', "rgb(89,184,233)"],
            textStyle: {
                color: '#666'
            },
            tooltip: tooltip,
            calculable: true,    //是否启用拖拽重计算特性，默认开启
            legend: legend,
            xAxis: xAxis,       //x轴数据 封装
            yAxis: yAxis,       //y轴数据 封装
            series: series,
            barGap: '0'
        }
        this.myChart.clear();
        this.myChart.setOption(option);
    }
}
