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
                <button type="button" class="btn active" @click="$btnOnRouter('/diagnosis_4')">
                    Generator
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/diagnosis_5')">Yaw</button>
            </div>
            <div class="modelling-wrap" v-if="info">
                <!-- <div class="modelling-area" ref="container"></div> -->
                <div class="option-box fix">
                    <div class="box-wrap">
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Generator</div>
                                <div class="line">
                                    <label class="label">Vibration</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Acceleration</label>
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;Drive End(DE)-Horizontal
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_ACC_DE_HORZ.value).toLocaleString() }}
                                        m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_ACC_DE_HORZ.value"
                                        :min="info.VIB_ACC_DE_HORZ.min"
                                        :max="info.VIB_ACC_DE_HORZ.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;Non Drive End(NDE)-Horizontal
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_ACC_NDE_HORZ.value).toLocaleString() }}
                                        m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_ACC_NDE_HORZ.value"
                                        :min="info.VIB_ACC_NDE_HORZ.min"
                                        :max="info.VIB_ACC_NDE_HORZ.max"
                                        :step="0.1"
                                    />
                                </div>

                                <div class="line">
                                    <label class="label">· Velocity</label>
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;Drive End(DE)-Horizontal
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_VEL_DE_HORZ.value).toLocaleString() }}
                                        mm/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_VEL_DE_HORZ.value"
                                        :min="info.VIB_VEL_DE_HORZ.min"
                                        :max="info.VIB_VEL_DE_HORZ.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;Non Drive End(NDE)-Horizontal
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_VEL_NDE_HORZ.value).toLocaleString() }}
                                        mm/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_VEL_NDE_HORZ.value"
                                        :min="info.VIB_VEL_NDE_HORZ.min"
                                        :max="info.VIB_VEL_NDE_HORZ.max"
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
                :path="'generator.glb'"
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
                        <div class="box-tit type2">Generator</div>
                        <div class="line">
                            <label class="label">Vibration</label>
                        </div>
                        <div class="line">
                            <label class="label">· Acceleration</label>
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Drive End(DE)-Horizontal </label>
                            <span class="txt">
                                {{ Number(info.VIB_ACC_DE_HORZ.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.VIB_ACC_DE_HORZ.value"
                                :min="info.VIB_ACC_DE_HORZ.min"
                                :max="info.VIB_ACC_DE_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Non Drive End(NDE)-Horizontal </label>
                            <span class="txt">
                                {{ Number(info.VIB_ACC_NDE_HORZ.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.VIB_ACC_NDE_HORZ.value"
                                :min="info.VIB_ACC_NDE_HORZ.min"
                                :max="info.VIB_ACC_NDE_HORZ.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="line">
                            <label class="label">· Velocity</label>
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Drive End(DE)-Horizontal </label>
                            <span class="txt">
                                {{ Number(info.VIB_VEL_DE_HORZ.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VIB_VEL_DE_HORZ.value"
                                :min="info.VIB_VEL_DE_HORZ.min"
                                :max="info.VIB_VEL_DE_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Non Drive End(NDE)-Horizontal </label>
                            <span class="txt">
                                {{ Number(info.VIB_VEL_NDE_HORZ.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VIB_VEL_NDE_HORZ.value"
                                :min="info.VIB_VEL_NDE_HORZ.min"
                                :max="info.VIB_VEL_NDE_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label">RMS</label>
                        </div>
                        <div class="line">
                            <label class="label">· Acceleration</label>
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Horizontal (DE) </label>
                            <span class="txt">
                                {{ Number(info.ACC_RMS_HORZ_DE.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.ACC_RMS_HORZ_DE.value"
                                :min="info.ACC_RMS_HORZ_DE.min"
                                :max="info.ACC_RMS_HORZ_DE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Horizontal (NDE) </label>
                            <span class="txt">
                                {{ Number(info.ACC_RMS_HORZ_NDE.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.ACC_RMS_HORZ_NDE.value"
                                :min="info.ACC_RMS_HORZ_NDE.min"
                                :max="info.ACC_RMS_HORZ_NDE.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="line">
                            <label class="label">· Velocity</label>
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Horizontal (DE) </label>
                            <span class="txt">
                                {{ Number(info.VEL_RMS_HORZ_DE.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VEL_RMS_HORZ_DE.value"
                                :min="info.VEL_RMS_HORZ_DE.min"
                                :max="info.VEL_RMS_HORZ_DE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Horizontal (NDE) </label>
                            <span class="txt">
                                {{ Number(info.VEL_RMS_HORZ_NDE.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VEL_RMS_HORZ_NDE.value"
                                :min="info.VEL_RMS_HORZ_NDE.min"
                                :max="info.VEL_RMS_HORZ_NDE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label">Winding A Temperate</label>
                        </div>
                        <div class="line">
                            <label class="label">· Measured Value</label>
                            <span class="txt">
                                {{ Number(info.GENA_MEAS_TEMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GENA_MEAS_TEMP.value"
                                :min="info.GENA_MEAS_TEMP.min"
                                :max="info.GENA_MEAS_TEMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Prediction Value</label>
                            <span class="txt">
                                {{ Number(info.GENA_PRED_TEMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GENA_PRED_TEMP.value"
                                :min="info.GENA_PRED_TEMP.min"
                                :max="info.GENA_PRED_TEMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Deviation</label>
                            <span class="txt">
                                {{ Number(info.GENA_TEMP_DEV.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GENA_TEMP_DEV.value"
                                :min="info.GENA_TEMP_DEV.min"
                                :max="info.GENA_TEMP_DEV.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label">Winding B Temperate</label>
                        </div>
                        <div class="line">
                            <label class="label">· Measured Value</label>
                            <span class="txt">
                                {{ Number(info.GENB_MEAS_TEMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GENB_MEAS_TEMP.value"
                                :min="info.GENB_MEAS_TEMP.min"
                                :max="info.GENB_MEAS_TEMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Prediction Value</label>
                            <span class="txt">
                                {{ Number(info.GENB_PRED_TEMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GENB_PRED_TEMP.value"
                                :min="info.GENB_PRED_TEMP.min"
                                :max="info.GENB_PRED_TEMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Deviation</label>
                            <span class="txt">
                                {{ Number(info.GENB_TEMP_DEV.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GENB_TEMP_DEV.value"
                                :min="info.GENB_TEMP_DEV.min"
                                :max="info.GENB_TEMP_DEV.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label">Winding C Temperate</label>
                        </div>
                        <div class="line">
                            <label class="label">· Measured Value</label>
                            <span class="txt">
                                {{ Number(info.GENC_MEAS_TEMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GENC_MEAS_TEMP.value"
                                :min="info.GENC_MEAS_TEMP.min"
                                :max="info.GENC_MEAS_TEMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Prediction Value</label>
                            <span class="txt">
                                {{ Number(info.GENC_PRED_TEMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GENC_PRED_TEMP.value"
                                :min="info.GENC_PRED_TEMP.min"
                                :max="info.GENC_PRED_TEMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Deviation</label>
                            <span class="txt">
                                {{ Number(info.GENC_TEMP_DEV.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GENC_TEMP_DEV.value"
                                :min="info.GENC_TEMP_DEV.min"
                                :max="info.GENC_TEMP_DEV.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">수명 예측</div>
                        <div class="line">
                            <label class="label">Destion Age</label>
                            <span class="txt">
                                {{ Number(info.GEN_DESIGN_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.GEN_DESIGN_AGE.value"
                                :min="info.GEN_DESIGN_AGE.min"
                                :max="info.GEN_DESIGN_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Age</label>
                            <span class="txt">
                                {{ Number(info.GEN_EST_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.GEN_EST_AGE.value"
                                :min="info.GEN_EST_AGE.min"
                                :max="info.GEN_EST_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Health Index</label>
                            <span class="txt">
                                {{ Number(info.GEN_HEALTH_IDX.value).toLocaleString() }} %
                            </span>
                            <Slider
                                v-model="info.GEN_HEALTH_IDX.value"
                                :min="info.GEN_HEALTH_IDX.min"
                                :max="info.GEN_HEALTH_IDX.max"
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
            scale: 1,
            cPo: {
                x: 0,
                y: 0,
                z: 80
            },
            oPo: {
                x: 0,
                y: -20,
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
            this.$apiGET('/admin/diag/generator').then((data) => {
                this.info = data
            })
        },
        loadingSet(st) {
            this.loading = st
        }
    }
}
</script>
