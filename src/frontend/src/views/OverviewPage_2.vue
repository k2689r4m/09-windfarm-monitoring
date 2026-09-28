<template>
    <div class="section model-top">
        <div class="section-model--top">
            <div class="tab-btn">
                <button type="button" class="btn" @click="$btnOnRouter('/overview_1')">
                    Blade&Pitch
                </button>
                <button type="button" class="btn active" @click="$btnOnRouter('/overview_2')">
                    Nacelle&Tower
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/overview_3')">
                    Gear Box
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/overview_4')">
                    Generator
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/overview_5')">Yaw</button>
            </div>
            <div class="modelling-wrap" v-if="info">
                <div class="option-box fix">
                    <div class="box-wrap">
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">
                                    Tower Top
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Tower Top').b"
                                        @click="$btnOnRouter('diagnosis_2')"
                                    ></button>
                                </div>

                                <div class="line">
                                    <label class="label">Bending</label>
                                </div>
                                <div class="line">
                                    <label class="label">· N-S</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.TOP_BM_NS.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.TOP_BM_NS.value"
                                        :min="info.TOP_BM_NS.min"
                                        :max="info.TOP_BM_NS.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· E-W</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.TOP_BM_EW.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.TOP_BM_EW.value"
                                        :min="info.TOP_BM_EW.min"
                                        :max="info.TOP_BM_EW.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">Torsion</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.TOP_TOR.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.TOP_TOR.value"
                                        :min="info.TOP_TOR.min"
                                        :max="info.TOP_TOR.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">
                                    Tower Bottom
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Tower Bottom').b"
                                        @click="$btnOnRouter('diagnosis_2')"
                                    ></button>
                                </div>

                                <div class="line">
                                    <label class="label">Bending</label>
                                </div>
                                <div class="line">
                                    <label class="label">· N-S</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.BOTTOM_BM_NS.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.BOTTOM_BM_NS.value"
                                        :min="info.BOTTOM_BM_NS.min"
                                        :max="info.BOTTOM_BM_NS.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· E-W</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.BOTTOM_BM_EW.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.BOTTOM_BM_EW.value"
                                        :min="info.BOTTOM_BM_EW.min"
                                        :max="info.BOTTOM_BM_EW.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">
                                    Nacelle
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Nacelle').b"
                                        @click="$btnOnRouter('diagnosis_2')"
                                    ></button>
                                </div>

                                <div class="line">
                                    <label class="label">Vibration</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Normal</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_NORM.value).toLocaleString() }} m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_NORM.value"
                                        :min="info.VIB_NORM.min"
                                        :max="info.VIB_NORM.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· Lateral</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_LAT.value).toLocaleString() }} m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_LAT.value"
                                        :min="info.VIB_LAT.min"
                                        :max="info.VIB_LAT.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loading-wrap" v-if="!info">
                <span class="loader"></span>
            </div>
            <!-- <div v-if="!info" class="loading-content type2">
                <span class="loader"></span>
            </div> -->
            <Glb
                :path="'main.glb'"
                :cPo="cPo"
                :oPo="oPo"
                :scale="scale"
                :speed="info?.WNAC_WD_SPD ?? 0"
                :loading="loading"
                @loadingSet="loadingSet"
                class="modelling-area"
            ></Glb>
            <div v-if="loading && info" class="loading-content">
                <span class="loader"></span>
            </div>
        </div>
    </div>
    <div class="section m-t--100">
        <div class="option-box" v-if="info">
            <div class="box-wrap type-option">
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Tower Top</div>

                        <div class="box-sub type2">
                            Health Monitoring
                            <button
                                type="button"
                                class="btn btn-sm btn-graph"
                                :class="$getAlarmItem('Tower Top').b"
                                @click="$btnOnRouter('diagnosis_2')"
                            >
                                진단 상세
                            </button>
                        </div>

                        <div class="line">
                            <label class="label">Bending</label>
                        </div>
                        <div class="line">
                            <label class="label">· N-S</label>
                            <span class="txt"
                                >{{ Number(info.TOP_BM_NS.value).toLocaleString() }} Pa</span
                            >
                            <Slider
                                v-model="info.TOP_BM_NS.value"
                                :min="info.TOP_BM_NS.min"
                                :max="info.TOP_BM_NS.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· E-W</label>
                            <span class="txt"
                                >{{ Number(info.TOP_BM_EW.value).toLocaleString() }} Pa</span
                            >
                            <Slider
                                v-model="info.TOP_BM_EW.value"
                                :min="info.TOP_BM_EW.min"
                                :max="info.TOP_BM_EW.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Torsion</label>
                            <span class="txt"
                                >{{ Number(info.TOP_TOR.value).toLocaleString() }} Pa</span
                            >
                            <Slider
                                v-model="info.TOP_TOR.value"
                                :min="info.TOP_TOR.min"
                                :max="info.TOP_TOR.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-wrap type-option">
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Tower Bottom</div>

                        <div class="box-sub type2">
                            Health Monitoring
                            <button
                                type="button"
                                class="btn btn-sm btn-graph"
                                :class="$getAlarmItem('Tower Bottom').b"
                                @click="$btnOnRouter('diagnosis_2')"
                            >
                                진단 상세
                            </button>
                        </div>

                        <div class="line">
                            <label class="label">Bending</label>
                        </div>
                        <div class="line">
                            <label class="label">· N-S</label>
                            <span class="txt"
                                >{{ Number(info.BOTTOM_BM_NS.value).toLocaleString() }} Pa</span
                            >
                            <Slider
                                v-model="info.BOTTOM_BM_NS.value"
                                :min="info.BOTTOM_BM_NS.min"
                                :max="info.BOTTOM_BM_NS.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· E-W</label>
                            <span class="txt"
                                >{{ Number(info.BOTTOM_BM_EW.value).toLocaleString() }} Pa</span
                            >
                            <Slider
                                v-model="info.BOTTOM_BM_EW.value"
                                :min="info.BOTTOM_BM_EW.min"
                                :max="info.BOTTOM_BM_EW.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-wrap type-option">
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Nacelle</div>

                        <div class="box-sub type2">
                            Health Monitoring
                            <button
                                type="button"
                                class="btn btn-sm btn-graph"
                                :class="$getAlarmItem('Nacelle').b"
                                @click="$btnOnRouter('diagnosis_2')"
                            >
                                진단 상세
                            </button>
                        </div>

                        <div class="line">
                            <label class="label">Vibration</label>
                        </div>
                        <div class="line">
                            <label class="label">· Normal</label>
                            <span class="txt"
                                >{{ Number(info.VIB_NORM.value).toLocaleString() }} m/s²</span
                            >
                            <Slider
                                v-model="info.VIB_NORM.value"
                                :min="info.VIB_NORM.min"
                                :max="info.VIB_NORM.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Lateral</label>
                            <span class="txt"
                                >{{ Number(info.VIB_LAT.value).toLocaleString() }} m/s²</span
                            >
                            <Slider
                                v-model="info.VIB_LAT.value"
                                :min="info.VIB_LAT.min"
                                :max="info.VIB_LAT.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Chart></Chart>
        <!-- <div class="card-wrap w-1800">
            <div class="card-wrap--p">
                <div class="card-tit type2">
                    데이터 Chart
                    <div class="right">
                        <label class="input-checkbox">
                            <input type="checkbox" checked />
                            <span class="box"></span>
                            <span class="text">Signal 보기</span>
                        </label>
                        <label class="input-checkbox">
                            <input type="checkbox" checked />
                            <span class="box"></span>
                            <span class="text">주파수 보기</span>
                        </label>
                    </div>
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
                        <div class="flex-item--wrap">
                            <svg class="chart-wrap" ref="chart"></svg>
                        </div>
                    </div>
                    <div class="flex-item item-420 type2">
                        <div class="item-tit">
                            데이터 목록
                            <span class="sm">2024.01.01 14:14</span>
                            <div class="right">
                                <button type="button" class="btn btn-icon btn-modi"></button>
                            </div>
                        </div>
                        <div class="flex-item--wrap">
                            <div class="check-list p-30">
                                <div class="line">
                                    <label class="input-checkbox">
                                        <input
                                            type="checkbox"
                                            v-model="dataset.hubState.st"
                                            @change="chartSelect('hubState')"
                                        />
                                        <span class="box red"></span>
                                        <span class="text">hub State</span>
                                    </label>
                                    <span class="txt">(9) Positioning hold</span>
                                </div>
                                <div class="line">
                                    <label class="input-checkbox"
                                        ><input
                                            type="checkbox"
                                            v-model="dataset.stateBlade1.st"
                                            @change="chartSelect('stateBlade1')"
                                        />
                                        <span class="box"></span>
                                        <span class="text">state blade 1</span>
                                    </label>
                                    <span class="txt">(9) Positioning hold</span>
                                </div>
                                <div class="line">
                                    <label class="input-checkbox"
                                        ><input
                                            type="checkbox"
                                            v-model="dataset.stateBlade2.st"
                                            @change="chartSelect('stateBlade2')"
                                        />
                                        <span class="box yellow"></span>
                                        <span class="text">state blade 2</span>
                                    </label>
                                    <span class="txt">(9) Positioning hold</span>
                                </div>
                                <div class="line">
                                    <label class="input-checkbox"
                                        ><input
                                            type="checkbox"
                                            v-model="dataset.angleBlade1.st"
                                            @change="chartSelect('angleBlade1')"
                                        />
                                        <span class="box"></span>
                                        <span class="text">angle blade 1</span>
                                    </label>
                                    <span class="txt">65.8°</span>
                                </div>
                                <div class="line">
                                    <label class="input-checkbox"
                                        ><input
                                            type="checkbox"
                                            v-model="dataset.angleBlade2.st"
                                            @change="chartSelect('angleBlade2')"
                                        />
                                        <span class="box"></span>
                                        <span class="text">angle blade 2</span>
                                    </label>
                                    <span class="txt">65.8°</span>
                                </div>
                                <div class="line">
                                    <label class="input-checkbox"
                                        ><input
                                            type="checkbox"
                                            v-model="dataset.torqueBlade1.st"
                                            @change="chartSelect('torqueBlade1')"
                                        />
                                        <span class="box"></span>
                                        <span class="text">torque blade 1</span>
                                    </label>
                                    <span class="txt">200 Nm</span>
                                </div>
                                <div class="line">
                                    <label class="input-checkbox"
                                        ><input
                                            type="checkbox"
                                            v-model="dataset.tempblade3.st"
                                            @change="chartSelect('tempblade3')"
                                        />
                                        <span class="box green"></span>
                                        <span class="text">Tempblade3</span>
                                    </label>
                                    <span class="txt">34.5°C</span>
                                </div>
                                <div class="line">
                                    <label class="input-checkbox"
                                        ><input
                                            type="checkbox"
                                            v-model="dataset.stateBlade3.st"
                                            @change="chartSelect('stateBlade3')"
                                        />
                                        <span class="box"></span>
                                        <span class="text">state blade 3</span>
                                    </label>
                                    <span class="txt">(9) Positioning hold</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import Glb from '../components/Glb.vue'
import Chart from '../components/Chart.vue'
import Slider from '@vueform/slider'

import * as d3 from 'd3'
import SimplexNoise from 'simplex-noise'

import OverView from '../components/OverView.vue'
import OverView2 from '../components/OverView2.vue'

export default {
    name: 'OverviewPage',
    components: {
        Glb,
        Chart,
        Slider,
        OverView,
        OverView2
    },
    computed: {},
    data() {
        return {
            loading: true,

            sliderValue1: 80,
            tabActive: 'tab3',

            info: null,

            scale: 1.4,
            cPo: {
                x: 0,
                y: 0,
                z: 30
            },
            oPo: {
                x: 0,
                y: -16,
                z: 0,
                rX: 0,
                rY: -1
            },

            dataset: {
                hubState: {
                    id: 1,
                    name: 'hubState',
                    type: 'freq',
                    seed: null,
                    data: null,
                    $data: null,
                    latestData: null,
                    st: true
                },
                stateBlade1: {
                    id: 2,
                    name: 'stateBlade1',
                    type: 'vault',
                    seed: null,
                    data: null,
                    $data: null,
                    latestData: null,
                    st: false
                },
                stateBlade2: {
                    id: 3,
                    name: 'stateBlade2',
                    type: 'vault',
                    seed: null,
                    data: null,
                    $data: null,
                    latestData: null,
                    st: false
                },
                stateBlade3: {
                    id: 4,
                    name: 'stateBlade3',
                    type: 'vault',
                    seed: null,
                    data: null,
                    $data: null,
                    latestData: null,
                    st: false
                },
                angleBlade1: {
                    id: 5,
                    name: 'angleBlade1',
                    type: 'vault',
                    seed: null,
                    data: null,
                    $data: null,
                    latestData: null,
                    st: false
                },
                angleBlade2: {
                    id: 6,
                    name: 'angleBlade2',
                    type: 'vault',
                    seed: null,
                    data: null,
                    $data: null,
                    latestData: null,
                    st: true
                },
                torqueBlade1: {
                    id: 7,
                    name: 'torqueBlade1',
                    type: 'temp',
                    seed: null,
                    data: null,
                    $data: null,
                    latestData: null,
                    st: true
                },
                tempblade3: {
                    id: 8,
                    name: 'tempblade3',
                    type: 'torque',
                    seed: null,
                    data: null,
                    $data: null,
                    latestData: null,
                    st: true
                }
            },

            ct: {
                zoomList: [100, 200, 300, 400, 500, 600],
                zoomLevel: 5,

                marginTop: 45,
                marginRight: 120,
                marginBottom: 100,
                marginLeft: 120,

                seed: null,
                noise: null,

                time: null,

                x: null,

                svg: null,
                xAxis: null,

                $xAxis: null,

                yData: {
                    vault: null, //전압 V
                    temp: null, //온도 c
                    freq: null, //주파수  hz
                    torque: null //토크 Nm
                },

                chartColors: null
            },
            Timer: null
        }
    },
    created() {},
    mounted() {
        this.initChart()

        for (let i = 0; i < this.ct.zoomList[this.ct.zoomLevel] + 50; i++) {
            this.tick()
        }

        this.update()

        this.Timer = this.timerStart()
    },
    beforeUnmount() {
        this.timerStop()
    },
    updated() {},
    methods: {
        getData() {
            this.$apiGET('/admin/over/nacelle').then((data) => {
                this.info = data
            })
        },

        initChart() {
            let self = this

            let h = 600
            let w = 1280

            self.ct.time = 0

            self.ct.chartColors = d3.scaleOrdinal(d3.schemeCategory10)

            self.ct.noise = new SimplexNoise()

            self.ct.x = d3.scaleLinear().range([this.ct.marginLeft, w - this.ct.marginRight])

            self.ct.xAxis = d3
                .axisBottom(self.ct.x)
                // .tickSizeInner(-h + this.ct.marginBottom + this.ct.marginTop)
                .tickSizeOuter(0)
                .tickPadding(10)

            ////////////////////////////////////////////////////////////////////////////////
            self.ct.svg = d3
                .select(this.$refs.chart)
                .attr('width', w)
                .attr('height', h)
                .attr('transform', 'translate(0, 0)')
                .on('wheel', function (event) {
                    event.preventDefault()
                    if (event.deltaY > 0) {
                        self.chartZoom(true)
                    } else {
                        self.chartZoom(false)
                    }
                    this.update()
                })

            self.ct.$xAxis = self.ct.svg
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0, ${h - this.ct.marginBottom + this.ct.marginTop})`)
                .call(self.ct.xAxis)

            for (let key in self.ct.yData) {
                self.ct.yData[key] = {
                    y: null,
                    yAxis: null,
                    $yAxis: null
                }
            }

            for (let key in self.dataset) {
                self.dataset[key].seed = 50 + 100 * Math.random()
                self.dataset[key].data = [self.dataset[key].seed]
                self.dataset[key].latestData = [self.dataset[key].seed]
            }

            for (let key in self.ct.yData) {
                self.ct.yData[key].y = d3.scaleLinear().range([h - this.ct.marginBottom, 0])

                if (key == 'vault' || key == 'temp') {
                    self.ct.yData[key].yAxis = d3
                        .axisLeft(self.ct.yData[key].y)
                        .tickSizeOuter(0)
                        .tickPadding(10)
                } else if (key == 'freq' || key == 'torque') {
                    self.ct.yData[key].yAxis = d3
                        .axisRight(self.ct.yData[key].y)
                        .tickSizeOuter(0)
                        .tickPadding(10)
                }

                self.ct.yData[key].line = d3
                    .line()
                    .defined(function (d) {
                        if (d) {
                            return d
                        } else {
                            return null
                        }
                    })
                    .x((d, i) => self.ct.x(i + self.ct.time - self.ct.zoomList[self.ct.zoomLevel]))
                    .y((d) => self.ct.yData[key].y(d))

                if (key == 'vault') {
                    self.ct.yData[key].$yAxis = self.ct.svg
                        .append('g')
                        .attr('transform', `translate(${this.ct.marginLeft},${this.ct.marginTop})`)
                        .attr('class', 'y axis')
                        .call(self.ct.yData[key].yAxis)

                    self.ct.yData[key].$yAxis
                        .append('text')
                        .attr('text-anchor', 'end')
                        .attr('y', -20)
                        .attr('x', -10)
                        .attr('class', 'y label')
                        .text('(W)')
                } else if (key == 'temp') {
                    self.ct.yData[key].$yAxis = self.ct.svg
                        .append('g')
                        .attr(
                            'transform',
                            `translate(${this.ct.marginLeft - 60},${this.ct.marginTop})`
                        )
                        .attr('class', 'y axis')
                        .call(self.ct.yData[key].yAxis)

                    self.ct.yData[key].$yAxis
                        .append('text')
                        .attr('text-anchor', 'end')
                        .attr('y', -20)
                        .attr('x', -10)
                        .attr('class', 'y label')
                        .text('(%)')
                } else if (key == 'freq') {
                    self.ct.yData[key].$yAxis = self.ct.svg
                        .append('g')
                        .attr(
                            'transform',
                            `translate(${w - this.ct.marginRight},${this.ct.marginTop})`
                        )
                        .attr('class', 'y axis')
                        .call(self.ct.yData[key].yAxis)

                    self.ct.yData[key].$yAxis
                        .append('text')
                        .attr('text-anchor', 'end')
                        .attr('y', -20)
                        .attr('x', 30)
                        .attr('class', 'y label')
                        .text('(V)')
                } else if (key == 'torque') {
                    self.ct.yData[key].$yAxis = self.ct.svg
                        .append('g')
                        .attr(
                            'transform',
                            `translate(${w - this.ct.marginRight + 60},${this.ct.marginTop})`
                        )
                        .attr('class', 'y axis')
                        .call(self.ct.yData[key].yAxis)

                    self.ct.yData[key].$yAxis
                        .append('text')
                        .attr('text-anchor', 'end')
                        .attr('y', -20)
                        .attr('x', 30)
                        .attr('class', 'y label')
                        .text('(°C)')
                }
            }

            var tooltip = d3
                .select('body')
                .append('div')
                .attr('y', this.ct.marginTop)
                .attr('class', 'toolTip')
                .style('display', 'none')

            var tooltipLine = d3
                .select('body')
                .append('div')
                .attr('class', 'toolTip-line')
                .style('display', 'none')

            for (let key in self.dataset) {
                self.dataset[key].seed = 50 + 100 * self.dataset[key].id * Math.random()
                self.dataset[key].data = [self.dataset[key].seed]
                self.dataset[key].latestData = [self.dataset[key].seed]

                self.dataset[key].$data = self.ct.svg
                    .append('path')
                    .attr('id', self.dataset[key].name)
                    .style('stroke', function () {
                        return self.ct.chartColors(self.dataset[key].id)
                    })
                    .attr('class', 'line data')
                    .on('mouseover', function () {
                        tooltipLine.style('display', null)
                        tooltip.style('display', null)
                    })
                    .on('mouseout', function () {
                        tooltipLine.style('display', 'none')
                        tooltip.style('display', 'none')
                    })
                    .on('mousemove', function (event, d) {
                        // self.dataset[key].latestData.forEach((dataset, index) => {
                        //   console.log(dataset, index);
                        // });
                        tooltipLine.style('left', event.pageX + 'px')
                        tooltipLine.style(
                            'top',
                            window.pageYOffset +
                                document.querySelector('.flex-item--wrap').getBoundingClientRect()
                                    .top +
                                'px'
                        )
                        tooltip.style('left', event.pageX + 20 + 'px')
                        tooltip.style('top', event.pageY - 65 + 'px')
                        tooltip.html(
                            "<div class='date'>month. " +
                                d.x +
                                '</div>' +
                                "<div class='row'><span class='left'><span class='circle red'></span>DC 전압</span>" +
                                d.y +
                                '</div>' +
                                "<div class='row'><span class='left'><span class='circle yellow'></span>주파수</span>" +
                                d.y +
                                '</div>' +
                                "<div class='row'><span class='left'><span class='circle green'></span>온도</span>" +
                                d.y +
                                '</div>'
                        )
                    })
            }
            ////////////////////////////////////////////////////////////////////////////////
        },
        tick() {
            this.ct.time++

            for (let key in this.dataset) {
                this.dataset[key].data[this.ct.time] =
                    this.dataset[key].data[this.ct.time - 1] +
                    this.ct.noise.noise2D(this.dataset[key].seed, this.ct.time / 2)

                this.dataset[key].data[this.ct.time] = Math.max(
                    this.dataset[key].data[this.ct.time],
                    0
                )

                // this.dataset[key].data[this.ct.time] = Math.floor(Math.random() * 100);

                if (this.ct.time <= this.ct.zoomList[this.ct.zoomLevel]) {
                    this.dataset[key].latestData = this.dataset[key].data.slice(
                        -this.ct.zoomList[this.ct.zoomLevel]
                    )
                } else {
                    this.dataset[key].latestData.shift()
                    this.dataset[key].latestData.push(this.dataset[key].data[this.ct.time])
                }
            }
        },
        update() {
            this.ct.x.domain([this.ct.time - this.ct.zoomList[this.ct.zoomLevel], this.ct.time])
            this.ct.$xAxis.call(this.ct.xAxis)

            let tempData = {
                vault: [], //전압 V
                temp: [], //온도 c
                freq: [], //주파수  hz
                torque: [] //토크 Nm
            }

            for (let key in this.dataset) {
                if (this.dataset[key].st) {
                    const type = this.dataset[key].type
                    tempData[type] = [...this.dataset[key].latestData, ...tempData[type]]
                }
            }

            for (let key in tempData) {
                // if (tempData[key].length) {
                let yDom = d3.extent(tempData[key])
                yDom[0] = Math.max(yDom[0] - 1, 0)
                yDom[1] += 1

                this.ct.yData[key].y.domain(yDom)
                this.ct.yData[key].$yAxis.call(this.ct.yData[key].yAxis)
                // }
            }

            for (let key in this.dataset) {
                const type = this.dataset[key].type

                if (this.dataset[key].st) {
                    this.dataset[key].$data
                        .datum(this.dataset[key].latestData)
                        .attr('d', this.ct.yData[type].line)
                }
            }
        },
        chartZoom(st) {
            const self = this

            if (st) {
                if (this.ct.zoomLevel < 5) {
                    this.ct.zoomLevel++
                }
            } else {
                if (0 < this.ct.zoomLevel) {
                    this.ct.zoomLevel--
                }
            }

            for (let key in self.ct.yData) {
                self.ct.yData[key].line = d3
                    .line()
                    .defined(function (d) {
                        if (d) {
                            return d
                        } else {
                            return null
                        }
                    })
                    .x((d, i) => self.ct.x(i + self.ct.time - self.ct.zoomList[self.ct.zoomLevel]))
                    .y((d) => self.ct.yData[key].y(d))
            }

            for (let key in this.dataset) {
                this.dataset[key].latestData = this.dataset[key].data.slice(
                    -this.ct.zoomList[this.ct.zoomLevel]
                )
            }

            this.update()
        },
        chartAdd(key) {
            const self = this

            self.dataset[key].$data = self.ct.svg
                .append('path')
                .attr('id', self.dataset[key].name)
                .style('stroke', function () {
                    return self.ct.chartColors(self.dataset[key].id)
                })
                .attr('class', 'line data')
        },
        chartSelect(key) {
            const type = this.dataset[key].type
            type
            if (this.dataset[key].st) {
                this.chartAdd(key)
            } else {
                d3.selectAll('#' + key).remove()
            }
        },
        timerStart() {
            // 1초에 한번씩 start 호출
            var interval = setInterval(() => {
                this.getData()
                this.tick()
                this.update()
            }, 1000)
            return interval
        },
        timerStop() {
            if (this.Timer) {
                clearInterval(this.Timer)
                this.Timer = null
            }
        },
        loadingSet(st) {
            this.loading = st
        }
    }
}
</script>
<style></style>
