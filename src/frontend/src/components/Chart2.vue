<template>
    <div class="card-wrap w-1800">
        <div class="card-wrap--p">
            <div class="card-tit type2">
                데이터 Chart
                <!-- <div class="right">
                    <label class="input-checkbox">
                        <input type="checkbox" checked />
                        <span class="box"></span>
                        <span class="text">Signal 보기</span>
                    </label>
                    <label class="input-checkbox">asdasdas
                        <input type="checkbox" checked />
                        <span class="box"></span>
                        <span class="text">주파수 보기</span>
                    </label>
                </div> -->
            </div>
            <div class="d-flex chart-flex">
                <div class="flex-item type2">
                    <div class="item-tit">
                        <div class="btn-wrap">
                            <button
                                type="button"
                                class="btn btn-icon btn-plus"
                                @click="chartZoom(false)"
                            ></button>
                            <button
                                type="button"
                                class="btn btn-icon btn-minus"
                                @click="chartZoom(true)"
                            ></button>
                            <button type="button" class="btn btn-icon btn-zoom"></button>
                        </div>
                    </div>
                    <div class="flex-item--wrap p-relative">
                        <!-- <svg class="chart-wrap" ref="chart"></svg> -->
                        <div ref="tooltipLine" class="toolTip-line" style="opacity: 0"></div>
                        <svg class="chart-wrap" id="chart" ref="chart"></svg>
                    </div>
                </div>
                <div class="flex-item item-420 type2">
                    <div class="item-tit">
                        데이터 목록
                        <span class="sm">{{ $dateFormat(selectDate, 'YYYY-MM-DD HH:mm') }}</span>
                        <div class="right">
                            <!-- <button
                                type="button"
                                class="btn btn-icon btn-modi"
                                @click="chartDtOn"
                            ></button> -->
                        </div>
                    </div>
                    <div class="flex-item--wrap">
                        <div class="check-list p-30">
                            <div class="line" v-for="item in chartDt.right" :key="'r_' + item.idx">
                                <label class="input-checkbox">
                                    <input
                                        type="checkbox"
                                        true-value="Y"
                                        false-value="N"
                                        v-model="item.chartCk"
                                        @change="chartSelect(item)"
                                    />

                                    <span class="box" :style="item.style"></span>
                                    <span class="text">{{ item.id }}</span>
                                </label>
                                <span class="txt">
                                    {{
                                        selectIdx
                                            ? Number(
                                                  item.values[selectIdx].value
                                              ).toLocaleString() +
                                              ' ' +
                                              item.format
                                            : ''
                                    }}
                                    <!-- {{
                                        selectIdx ??
                                        Number(item.values[selectIdx].value).toLocaleString()
                                    }}
                                    {{ item.format }} -->
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ref="tooltip" class="toolTip" style="opacity: 0"></div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import { values } from 'lodash'

export default {
    props: {
        cid: {
            type: Number,
            default: 1
        },
        chartData: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            initST: false,

            svgHeight: 600,
            svgWidth: 1280,

            intervalId: null,

            dta: [],
            globalX: null,
            duration: null,
            limit: null,

            x: null,
            y: null,
            z: null,

            x_axis: null,
            x_axis_svg: null,

            pathsG: null,

            zoom: null,

            yMax: 30,
            yMin: 0,

            g: null,

            marginTop: 45,
            marginRight: 120,
            marginBottom: 100,
            marginLeft: 120,

            chartDt: {
                A: {
                    st: false,
                    format: '%',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                B: {
                    st: false,
                    format: '℃',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                C: {
                    st: false,
                    format: 'Hz',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                D: {
                    st: false,
                    format: 'm/s',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                E: {
                    st: false,
                    format: 'm/s²',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                F: {
                    st: false,
                    format: 'mm/s',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                G: {
                    st: false,
                    format: 'month',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                H: {
                    st: false,
                    format: 'Nm',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                I: {
                    st: false,
                    format: '°',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                J: {
                    st: false,
                    format: 'Pa',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                K: {
                    st: false,
                    format: 'V',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                L: {
                    st: false,
                    format: 'Wh',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },
                M: {
                    st: false,
                    format: 'Num',
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    yDom: [100, 0],
                    data: [],
                    po: null
                },

                left: [],
                right: []
            },
            yAxi: {
                LEFT_X: {
                    group: null,
                    format: null,
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    path: null,
                    yDom: [100, 0],
                    data: []
                },
                LEFT_Y: {
                    group: null,
                    format: null,
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    path: null,
                    yDom: [100, 0],
                    data: []
                },
                RIGHT_X: {
                    group: null,
                    format: null,
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    path: null,
                    yDom: [100, 0],
                    data: []
                },
                RIGHT_Y: {
                    group: null,
                    format: null,
                    y: null,
                    yAxis: null,
                    $yAxis: null,
                    line: null,
                    path: null,
                    yDom: [100, 0],
                    data: []
                }
            },
            yEnum: ['LEFT_X', 'LEFT_Y', 'RIGHT_X', 'RIGHT_Y'],
            yPo: [
                `translate(${this.marginLeft},${this.marginTop})`,
                `translate(${this.marginLeft - 60},${this.marginTop})`,
                `translate(${this.svgWidth - this.marginRight},${this.marginTop})`,
                `translate(${this.svgWidth - this.marginRight + 60},${this.marginTop})`
            ],
            dataTimeNow: '',

            colorList: null,

            chartDt_: {},

            leftCk: false,
            rightCk: false,

            selectIdx: null,
            selectDate: null
        }
    },
    mounted() {
        // console.log(this.chartData)
        this.z = d3.scaleOrdinal(d3.schemeCategory10)
        this.chartDtSet(this.chartData.values)
        this.initChart()
        this.yChartSet()

        const self = this
        // for (let key in this.yAxi) {
        //     this.yAxi[key].path = self.pathsG.append('g').attr('class', 'minerLine_' + key)
        // }

        // 데이터 업데이트 간격 (1초마다 데이터 추가)
        // this.intervalId = setInterval(this.updateChart, 1000)
    },
    methods: {
        initChart() {
            const self = this
            var svg = d3
                .select(this.$refs.chart)
                .attr('width', this.svgWidth)
                .attr('height', this.svgHeight)
                .on('wheel', function (event) {
                    event.preventDefault()
                    if (event.deltaY > 0) {
                        self.chartZoom(true)
                    } else {
                        self.chartZoom(false)
                    }
                })
            var margin = {
                top: 5,
                right: 5,
                bottom: 50,
                left: 30
            }
            var width = Math.floor(svg.attr('width') - margin.left - margin.right)
            var height = Math.floor(svg.attr('height') - margin.top - margin.bottom)

            this.g = svg.append('g').attr('transform', 'translate(0, 0)')
            // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

            // const koreanDateFormat = new Intl.DateTimeFormat('ko-KR', {
            //     year: 'numeric',
            //     month: 'long', // "월"이 한글로 나오게 설정
            //     day: 'numeric'
            // })

            this.g
                .append('defs')
                .append('clipPath')
                .attr('id', 'clip2')
                .append('rect')
                .attr('x', this.marginLeft)
                .attr('y', 0)
                .attr('width', this.svgWidth)
                .attr('height', this.svgHeight)

            this.x = d3
                .scaleTime()
                .domain(d3.extent(this.chartData.date, (d) => new Date(d)))
                .range([this.marginLeft, this.svgWidth - this.marginRight])

            // console.log(this.chartData.date.length)
            // this.x = d3
            //     .scaleLinear()
            //     .domain([0, this.chartData.date.length - 1])
            //     .range([this.marginLeft, this.svgWidth - this.marginRight])

            this.x_axis = d3.axisBottom().tickSizeOuter(0).scale(this.x)
            // .tickFormat(d3.timeFormat('%H:%M'))

            this.x_axis_svg = this.g
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')

            this.x_axis_svg.call(this.x_axis)

            this.pathsG = this.g
                .append('g')
                .attr('id', 'paths')
                .attr('class', 'paths')
                .attr('clip-path', 'url(#clip2)')

            const tooltip = d3.select(this.$refs.tooltip)
            const tooltipLine = d3.select(this.$refs.tooltipLine)

            this.g
                .append('rect')
                .attr('width', this.svgWidth)
                .attr('height', this.svgHeight)
                .style('fill', 'none')
                .style('pointer-events', 'all')
                .attr('class', 'line_event')
                .on('click', (event) => this.onEventClick(event, self.x))
                .on('mousemove', (event) => this.onEventMove(event, self.x, tooltip, tooltipLine))
                .on('mouseover', () => {
                    tooltip.transition().duration(0).style('opacity', 0)
                    tooltipLine.transition().duration(0).style('opacity', 0)
                })
                .on('mouseout', () => {
                    tooltip.transition().duration(0).style('opacity', 0)
                    tooltipLine.transition().duration(0).style('opacity', 0)
                })

            this.zoom = d3
                .zoom()
                .scaleExtent([1, 10]) // 1배에서 10배까지 확대 가능
                .translateExtent([
                    [0, 0],
                    [this.svgWidth, this.svgHeight]
                ]) // 확대/축소 영역 제한
                .extent([
                    [0, 0],
                    [this.svgWidth, this.svgHeight]
                ]) // zoom 대상 영역
                .on('zoom', (event) => {
                    const newX = event.transform.rescaleX(this.x) // 확대/축소된 x축

                    this.x_axis = d3.axisBottom(newX).tickSizeOuter(0)
                    this.x_axis_svg.call(this.x_axis)

                    // this.updateChart()
                    // console.log(Math.max(0, Math.min(newX(new Date(d.date)), 1000 - 80 - 30)))

                    for (let key in this.yAxi) {
                        if (self.yAxi[key].path) {
                            // self.yAxi[key].path.attr(
                            //     'd',
                            //     self.yAxi[key].line.x((d) => newX(d.date))
                            // )
                            self.yAxi[key].path.attr(
                                'd',
                                self.yAxi[key].line.x((d) =>
                                    Math.max(
                                        0,
                                        Math.min(
                                            newX(new Date(d.date)),
                                            self.svgWidth - self.marginLeft
                                        )
                                    )
                                )
                            )
                        }
                    }

                    this.g
                        .selectAll('.line_event')
                        .on('click', (event) => this.onEventClick(event, newX))
                        .on('mousemove', (event) =>
                            this.onEventMove(event, newX, tooltip, tooltipLine)
                        )

                    this.updateChart()
                })

            // svg에 zoom 적용
            this.g.call(this.zoom).on(
                'wheel.zoom',
                function (event) {
                    if (!event.ctrlKey) {
                        event.stopImmediatePropagation() // 기본 휠 이벤트 흐름을 막음
                    }
                },
                { passive: false }
            )

            this.globalX = 0
            this.duration = 1000 //how quickly to move (will look jerky if less that data input rate)
            this.limit = 600 // how many datapoints, total points = (duration * limit)
        },
        onEventMove(event, x, tooltip, tooltipLine) {
            const self = this
            const [mouseX] = d3.pointer(event)
            const mouseDate = x.invert(mouseX)

            const bisect = d3.bisector((d) => d.date).left

            let index = null
            let tDataList = {
                LEFT_X: [],
                LEFT_Y: [],
                RIGHT_X: [],
                RIGHT_Y: []
            }
            let tDataDate = null

            for (let key in self.yAxi) {
                for (let i = 0; i < self.yAxi[key].data.length; i++) {
                    index = bisect(self.yAxi[key].data[i].values, mouseDate)
                    if (index) {
                        break
                    }
                }
            }

            let colorList = {}
            for (let i = 0; i < this.chartDt.right.length; i++) {
                colorList[this.chartDt.right[i].idx] = this.chartDt.right[i].color
            }

            for (let key in self.yAxi) {
                for (let i = 0; i < self.yAxi[key].data.length; i++) {
                    if (self.yAxi[key].data[i].values[index]?.speed != null) {
                        tDataList[key].push({
                            id: self.yAxi[key].data[i].id,
                            value: self.yAxi[key].data[i].values[index].speed,
                            color: colorList[self.yAxi[key].data[i].idx]
                        })
                        tDataDate = self.yAxi[key].data[i].values[index].date
                    }
                }
            }

            let divStg = `${self.$dateFormat(mouseDate, 'YYYY.MM.DD HH:mm')}`

            for (let key in tDataList) {
                tDataList[key].forEach((d) => {
                    divStg += `
                                <div class='row'><span class='left'><span class='circle' style='background-color:${d.color}'></span>${d.id}</span>
                                ${Number(d.value).toLocaleString()}
                                </div>
                            `
                })
            }

            if (tDataDate) {
                tooltip.transition().duration(200).style('opacity', 1)
                tooltipLine.transition().duration(200).style('opacity', 1)
            } else {
                tooltip.transition().duration(0).style('opacity', 0)
                tooltipLine.transition().duration(0).style('opacity', 0)
            }

            tooltipLine.style('left', event.pageX - 88 + 'px')

            tooltip
                .html(tDataDate == null ? null : divStg)
                .style('left', event.pageX + 10 + 'px')
                .style('top', event.pageY + 'px')
        },
        onEventClick(event, x) {
            const self = this
            const [mouseX] = d3.pointer(event)
            const mouseDate = x.invert(mouseX)
            const bisect = d3.bisector((d) => d.date).left

            let index = null

            for (let key in self.yAxi) {
                for (let i = 0; i < self.yAxi[key].data.length; i++) {
                    index = bisect(self.yAxi[key].data[i].values, mouseDate)
                    if (index) {
                        break
                    }
                }
            }

            this.selectDate = mouseDate
            this.selectIdx = index
        },
        yChartSet() {
            const self = this
            for (let key in this.yAxi) {
                this.yAxi[key].y = d3.scaleLinear().range([this.svgHeight - this.marginBottom, 0])

                this.yAxi[key].line = d3
                    .line()
                    // .curve(d3.curveBasis)
                    .x(function (d) {
                        return self.x(d.date)
                    })
                    .y(function (d) {
                        return self.yAxi[key].y(d.speed) + self.marginTop
                    })

                if (key == 'LEFT_X') {
                    this.yAxi[key].yAxis = d3
                        .axisLeft(this.yAxi[key].y)
                        .tickSizeOuter(0)
                        .scale(this.yAxi[key].y)

                    this.yAxi[key].$yAxis = this.g
                        .append('g')
                        .attr('class', 'y axis LEFT_X')
                        .attr('transform', `translate(${this.marginLeft},${this.marginTop})`)
                        .call(this.yAxi[key].yAxis)
                        .style('display', 'none')
                } else if (key == 'LEFT_Y') {
                    this.yAxi[key].yAxis = d3
                        .axisLeft(this.yAxi[key].y)
                        .tickSizeOuter(0)
                        .scale(this.yAxi[key].y)

                    this.yAxi[key].$yAxis = this.g
                        .append('g')
                        .attr('class', 'y axis LEFT_Y')
                        .attr('transform', `translate(${this.marginLeft - 60},${this.marginTop})`)
                        .call(this.yAxi[key].yAxis)
                        .style('display', 'none')
                } else if (key == 'RIGHT_X') {
                    this.yAxi[key].yAxis = d3
                        .axisRight(this.yAxi[key].y)
                        .tickSizeOuter(0)
                        .scale(this.yAxi[key].y)

                    this.yAxi[key].$yAxis = this.g
                        .append('g')
                        .attr('class', 'y axis RIGHT_X')
                        .attr(
                            'transform',
                            `translate(${this.svgWidth - this.marginRight},${this.marginTop})`
                        )
                        .call(this.yAxi[key].yAxis)
                        .style('display', 'none')
                } else if (key == 'RIGHT_Y') {
                    this.yAxi[key].yAxis = d3
                        .axisRight(this.yAxi[key].y)
                        .tickSizeOuter(0)
                        .scale(this.yAxi[key].y)

                    this.yAxi[key].$yAxis = this.g
                        .append('g')
                        .attr('class', 'y axis RIGHT_Y')
                        .attr(
                            'transform',
                            `translate(${this.svgWidth - this.marginRight + 60},${this.marginTop})`
                        )
                        .call(this.yAxi[key].yAxis)
                        .style('display', 'none')
                }
            }

            this.updateYAxisSVG()
        },
        updateYAxisSVG() {
            for (let key in this.yAxi) {
                const yAxisLabelSelection = this.g.select(`.${key}_LABEL`)

                if (this.yAxi[key].group) {
                    this.g.select(`.${key}`).style('display', 'block') // Y축을 표시

                    if (yAxisLabelSelection.empty()) {
                        this.yAxi[key].$yAxis
                            .append('text')
                            .attr('class', `${key}_LABEL`)
                            .attr('y', -30)
                            .attr('dy', '0.71em')
                            .attr('fill', '#FFF')
                            .text(`(${this.yAxi[key].format})`)
                    }
                } else {
                    // console.log('지움', key, this.g.select(`.${key}`))
                    this.g.select(`.${key}`).style('display', 'none')
                    yAxisLabelSelection.remove()
                }
            }
        },
        updateChart() {
            // console.log('업데이트')
            const re = this.chartData.values

            const self = this
            let colorList = {}
            for (let i = 0; i < this.chartDt.right.length; i++) {
                colorList[this.chartDt.right[i].idx] = this.chartDt.right[i].color
            }

            let now = new Date()
            this.dataTimeNow = now

            for (let key in this.yAxi) {
                const group = this.yAxi[key].group
                if (!group) {
                    continue
                }

                self.yAxi[key].data.map(function (c) {
                    c.values = []
                    re[group].map(function (i) {
                        if (i?.chartCk == 'Y') {
                            if (c.idx == i.idx) {
                                i.values.map(function (x) {
                                    c.values.push({
                                        date: new Date(x.date),
                                        speed: x.value
                                    })
                                })
                            }
                        }
                    })
                })
            }

            for (let key in self.yAxi) {
                let _yDom = [null, null]
                self.yAxi[key].data.forEach((e) => {
                    const tYdom = d3.extent(e.values, (d) => d.speed)

                    if (_yDom[0] == null || tYdom[0] < _yDom[0]) {
                        _yDom[0] = tYdom[0]
                    }

                    if (_yDom[1] == null || _yDom[1] < tYdom[1]) {
                        _yDom[1] = tYdom[1]
                    }
                })
                self.yAxi[key].yDom = _yDom
            }

            this.pathsG.remove()
            this.pathsG = this.g
                .append('g')
                .attr('id', 'paths')
                .attr('class', 'paths')
                .attr('clip-path', 'url(#clip2)')

            for (let key in self.yAxi) {
                this.yAxi[key].y.domain([this.yAxi[key].yDom[0] - 1, this.yAxi[key].yDom[1] + 1])
                this.yAxi[key].$yAxis.transition().call(self.yAxi[key].yAxis)

                this.yAxi[key].data.map((x) => {
                    self.yAxi[key].path = self.pathsG
                        .append('path')
                        .datum(x)
                        .attr('d', function (d) {
                            return self.yAxi[key].line(d.values)
                        })
                        .attr('class', `line`)
                        .attr('id', key + '_' + x.idx)
                        .style('stroke', colorList[x.idx])
                        .attr('transform', null)
                })
            }
        },
        lineSet() {
            const self = this
            this.chartDt.right.map(function (c) {
                if (c?.chartCk == 'Y') {
                    for (let key in self.yAxi) {
                        if (self.yAxi[key].group == c.group) {
                            const findCk = self.yAxi[key].data.find((i) => i.idx == c.idx)

                            if (!findCk) {
                                self.yAxi[key].data.push({
                                    id: c.id,
                                    idx: c.idx,
                                    values: []
                                })
                            }
                        }
                    }
                }
            })
        },
        chartZoom(st) {
            if (st) {
                this.g.transition().call(this.zoom.scaleBy, 0.8)
            } else {
                this.g.transition().call(this.zoom.scaleBy, 1.2)
            }

            // this.updateChart()
        },
        yAxisLenCk(group = null) {
            let cnt = 0

            for (let key in this.yAxi) {
                // console.log(this.yAxi[key].group)
                if (this.yAxi[key].group) {
                    if (this.yAxi[key].group == group) {
                        continue
                    }
                    cnt++
                }
            }

            if (4 <= cnt) {
                //추가 불가능
                return false
            } else {
                //추가 가능
                return true
            }
        },
        yAxisKeyCk(group) {
            for (let key in this.yAxi) {
                if (this.yAxi[key].group == group) {
                    // 이미 있음
                    return false
                }
            }

            //없음
            return true
        },
        yAxisPush(group) {
            for (let key in this.yAxi) {
                if (!this.yAxi[key].group) {
                    this.yAxi[key].group = group
                    this.yAxi[key].format = this.chartDt[group].format
                    break
                }
            }
        },
        yAxisDel(group, idx) {
            for (let key in this.yAxi) {
                if (this.yAxi[key].group == group) {
                    // this.yAxi[key].data = this.yAxi[key].data.filter((i) => i.idx != idx)
                    // let minerG = this.yAxi[key].path.selectAll('.minerLine_' + key)
                    // minerG.remove()
                    // minerG.select(`#${key}_${idx}`).remove()
                    // this.g.selectAll(`.line`).remove()

                    let ckck = false
                    for (let i = 0; i < this.chartDt.right.length; i++) {
                        if (
                            this.chartDt.right[i].chartCk == 'Y' &&
                            this.chartDt.right[i].group == group
                        ) {
                            // console.log('현재 있음')
                            ckck = true
                            break
                        }
                    }

                    if (!ckck) {
                        // console.log('없으니깐 삭제')
                        this.yAxi[key].group = null
                    } else {
                        // console.log('하나만 삭제 시켜야함')
                    }

                    break
                }
            }
        },
        yAxisShift() {
            let temp = []
            let yPo = [
                `translate(${this.marginLeft},${this.marginTop})`,
                `translate(${this.marginLeft - 60},${this.marginTop})`,
                `translate(${this.svgWidth - this.marginRight},${this.marginTop})`,
                `translate(${this.svgWidth - this.marginRight + 60},${this.marginTop})`
            ]
            let yPo2 = ['LEFT', 'LEFT', 'RIGHT', 'RIGHT']

            for (let key in this.yAxi) {
                if (this.yAxi[key].group) {
                    temp.push(key)
                }
            }
            // this.g.select(`.${key}`).style('display', 'none')
            console.log(temp)

            for (let i = 0; i < temp.length; i++) {
                // console.log(temp[i].$yAxis)
                // temp[i].$yAxis.attr('transform', this.yPo[i])
                console.log(yPo[i])

                if (i < 2) {
                    this.yAxi[temp[i]].yAxis = d3
                        .axisLeft(this.yAxi[temp[i]].y)
                        .tickSizeOuter(0)
                        .scale(this.yAxi[temp[i]].y)

                    this.yAxi[temp[i]].$yAxis = this.g
                        .append('g')
                        .attr('class', `y axis ${temp[i]}`)
                        .call(this.yAxi[temp[i]].yAxis)
                        .style('display', 'none')
                } else {
                    this.yAxi[temp[i]].yAxis = d3
                        .axisRight(this.yAxi[temp[i]].y)
                        .tickSizeOuter(0)
                        .scale(this.yAxi[temp[i]].y)

                    this.yAxi[temp[i]].$yAxis = this.g
                        .append('g')
                        .attr('class', `y axis ${temp[i]}`)
                        .call(this.yAxi[temp[i]].yAxis)
                        .style('display', 'none')
                }

                this.g.select(`.${temp[i]}`).attr('transform', yPo[i])
            }
        },
        chartDtSet(tg) {
            for (let key in tg) {
                for (let i = 0; i < tg[key].length; i++) {
                    tg[key][i].selected = false

                    if (tg[key][i].chartCk == 'Y') {
                        tg[key][i].color = this.z(tg[key][i].idx)
                        tg[key][i].style = { 'background-color': tg[key][i].color }

                        if (this.yAxisKeyCk(key) && this.yAxisLenCk()) {
                            this.yAxisPush(key)
                        }
                    } else {
                        tg[key][i].color = null
                        tg[key][i].style = null
                    }

                    this.chartDt.right.push(tg[key][i])

                    // this.chartDt[key].data.push(tg[key][i])
                }
            }
        },
        updateYList(state, group, idx) {
            // console.log(idx)

            if (state == 'add') {
                if (this.yAxisKeyCk(group) && this.yAxisLenCk()) {
                    this.yAxisPush(group)
                }
            } else if (state == 'del') {
                this.yAxisDel(group, idx)
            }

            // this.yAxisShift()
            this.updateYAxisSVG()
        },
        chartSelect(item) {
            // console.log(this.yList.length)
            // console.log(item.chartCk)
            this.g.selectAll(`.line`).remove()
            this.updateChart()

            if (item.chartCk == 'Y') {
                if (!this.yAxisLenCk(item.group)) {
                    item.chartCk = 'N'
                    return
                }

                this.updateYList('add', item.group, item.idx)
            } else {
                this.updateYList('del', item.group, item.idx)
            }

            this.lineSet()

            // if (!this.yList.includes(item.group)) {
            //     this.yList.push(key)
            // }

            // console.log(this.yList)

            if (item.chartCk == 'Y') {
                item.color = this.z(item.idx)
                item.style = { 'background-color': item.color }
            } else {
                item.color = null
                item.style = null
            }

            this.updateChart()
        }
    }
}
</script>
<style scope>
.line {
    fill: none;
    stroke: steelblue;
    stroke-width: 1.5px;
}

.tooltip {
    position: absolute;
    background-color: white;
    border: 1px solid #ddd;
    padding: 5px;
    border-radius: 4px;
    pointer-events: none; /* 마우스 이벤트 무시 */
    font-size: 12px;
    color: black;
}
</style>
