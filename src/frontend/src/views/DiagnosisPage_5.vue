<template>
    <div class="section model-top">
        <div class="section-model--top">
            <div class="tab-btn">
                <button type="button" class="btn" @click="$btnOnRouter('/diagnosis_1')">
                    Blade&Pitch
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/diagnosis_2')">
                    Nacelle&Tower
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/diagnosis_3')">
                    Gear Box
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/diagnosis_4')">
                    Generator
                </button>
                <button type="button" class="btn active" @click="$btnOnRouter('/diagnosis_5')">
                    Yaw
                </button>
            </div>
            <div class="modelling-wrap" v-if="info">
                <!-- <div class="modelling-area" ref="container"></div> -->
                <div class="option-box fix">
                    <div class="box-wrap">
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Yaw</div>
                                <div class="line">
                                    <label class="label">Angle</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Nacelle Position</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.YAW_ANGLE_NACELLE.value).toLocaleString() }}
                                        °
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.YAW_ANGLE_NACELLE.value"
                                        :min="info.YAW_ANGLE_NACELLE.min"
                                        :max="info.YAW_ANGLE_NACELLE.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· Wind Direction</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.YAW_ANGLE_WIND_DIR.value).toLocaleString() }}
                                        °
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.YAW_ANGLE_WIND_DIR.value"
                                        :min="info.YAW_ANGLE_WIND_DIR.min"
                                        :max="info.YAW_ANGLE_WIND_DIR.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· Deviation</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.YAW_ANGLE_DEV.value).toLocaleString() }} °
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.YAW_ANGLE_DEV.value"
                                        :min="info.YAW_ANGLE_DEV.min"
                                        :max="info.YAW_ANGLE_DEV.max"
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
            <Glb
                :path="'yaw.glb'"
                :cPo="cPo"
                :oPo="oPo"
                :scale="scale"
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
                        <div class="box-tit type2">Yaw</div>
                        <div class="line">
                            <label class="label">Angle</label>
                        </div>
                        <div class="line">
                            <label class="label">· Nacelle Position</label>
                            <span class="txt">
                                {{ Number(info.YAW_ANGLE_NACELLE.value).toLocaleString() }} °
                            </span>
                            <Slider
                                v-model="info.YAW_ANGLE_NACELLE.value"
                                :min="info.YAW_ANGLE_NACELLE.min"
                                :max="info.YAW_ANGLE_NACELLE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Wind Direction</label>
                            <span class="txt">
                                {{ Number(info.YAW_ANGLE_WIND_DIR.value).toLocaleString() }} °
                            </span>
                            <Slider
                                v-model="info.YAW_ANGLE_WIND_DIR.value"
                                :min="info.YAW_ANGLE_WIND_DIR.min"
                                :max="info.YAW_ANGLE_WIND_DIR.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Deviation</label>
                            <span class="txt">
                                {{ Number(info.YAW_ANGLE_DEV.value).toLocaleString() }} °
                            </span>
                            <Slider
                                v-model="info.YAW_ANGLE_DEV.value"
                                :min="info.YAW_ANGLE_DEV.min"
                                :max="info.YAW_ANGLE_DEV.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">수명 예측</div>
                        <div class="line">
                            <label class="label">Design Age</label>
                            <span class="txt">
                                {{ Number(info.YAW_DESIGN_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.YAW_DESIGN_AGE.value"
                                :min="info.YAW_DESIGN_AGE.min"
                                :max="info.YAW_DESIGN_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Age</label>
                            <span class="txt">
                                {{ Number(info.YAW_EST_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.YAW_EST_AGE.value"
                                :min="info.YAW_EST_AGE.min"
                                :max="info.YAW_EST_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Health Index</label>
                            <span class="txt">
                                {{ Number(info.YAW_HEALTH_IDX.value).toLocaleString() }} %
                            </span>
                            <Slider
                                v-model="info.YAW_HEALTH_IDX.value"
                                :min="info.YAW_HEALTH_IDX.min"
                                :max="info.YAW_HEALTH_IDX.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-wrap type-option"></div>
            <div class="box-wrap type-option"></div>
        </div>
        <Chart :cid="1"></Chart>
    </div>
</template>

<script>
import Glb from '../components/Glb.vue'
import Chart from '../components/Chart.vue'
import Slider from '@vueform/slider'

export default {
    name: 'OverviewPage',
    components: {
        Glb,
        Chart,
        Slider
    },
    computed: {},
    data() {
        return {
            loading: true,

            sliderValue1: 80,
            tabActive: 'tab3',
            info: null,

            scale: 30,
            cPo: {
                x: 0,
                y: 0,
                z: 300
            },
            oPo: {
                x: 0,
                y: -10,
                z: 0,
                rX: 0,
                rY: 0
            },

            Timer: null
        }
    },
    created() {},
    mounted() {
        // console.log(this.series);
        // this.createChart();
        this.Timer = this.timerStart()
    },
    updated() {},
    beforeUnmount() {
        this.timerStop()
    },
    methods: {
        timerStart() {
            var interval = setInterval(() => {
                this.getData()
                // this.tick()
                // this.update()
            }, 1000)
            return interval
        },
        timerStop() {
            if (this.Timer) {
                clearInterval(this.Timer)
                this.Timer = null
            }
        },
        getData() {
            this.$apiGET('/admin/diag/yaw').then((data) => {
                this.info = data
            })
        },
        loadingSet(st) {
            this.loading = st
        }
    }
}
</script>
