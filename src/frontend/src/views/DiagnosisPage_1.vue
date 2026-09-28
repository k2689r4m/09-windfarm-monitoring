<template>
    <div class="section model-top">
        <div class="section-model--top">
            <div class="tab-btn">
                <button type="button" class="btn active" @click="$btnOnRouter('/diagnosis_1')">
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
                <button type="button" class="btn" @click="$btnOnRouter('/diagnosis_5')">Yaw</button>
            </div>
            <div class="modelling-wrap" v-if="info">
                <!-- <div class="modelling-area" ref="container"></div> -->
                <div class="option-box fix">
                    <div class="box-wrap">
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Blade 1</div>
                                <div class="line">
                                    <label class="label">Bending</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Flapwise</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.blade1.BM_FLAP.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.blade1.BM_FLAP.value"
                                        :min="info.blade1.BM_FLAP.min"
                                        :max="info.blade1.BM_FLAP.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· Edgewise</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.blade1.BM_EDGE.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.blade1.BM_EDGE.value"
                                        :min="info.blade1.BM_EDGE.min"
                                        :max="info.blade1.BM_EDGE.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">Torsion</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.blade1.TOR.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.blade1.TOR.value"
                                        :min="info.blade1.TOR.min"
                                        :max="info.blade1.TOR.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Blade 2</div>
                                <div class="line">
                                    <label class="label">Bending</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Flapwise</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.blade2.BM_FLAP.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.blade2.BM_FLAP.value"
                                        :min="info.blade2.BM_FLAP.min"
                                        :max="info.blade2.BM_FLAP.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· Edgewise</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.blade2.BM_EDGE.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.blade2.BM_EDGE.value"
                                        :min="info.blade2.BM_EDGE.min"
                                        :max="info.blade2.BM_EDGE.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">Torsion</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.blade2.TOR.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.blade2.TOR.value"
                                        :min="info.blade2.TOR.min"
                                        :max="info.blade2.TOR.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Blade 3</div>
                                <div class="line">
                                    <label class="label">Bending</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Flapwise</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.blade3.BM_FLAP.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.blade3.BM_FLAP.value"
                                        :min="info.blade3.BM_FLAP.min"
                                        :max="info.blade3.BM_FLAP.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· Edgewise</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.blade3.BM_EDGE.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.blade3.BM_EDGE.value"
                                        :min="info.blade3.BM_EDGE.min"
                                        :max="info.blade3.BM_EDGE.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">Torsion</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.blade3.TOR.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.blade3.TOR.value"
                                        :min="info.blade3.TOR.min"
                                        :max="info.blade3.TOR.max"
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
                :path="'hub.glb'"
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
                        <div class="box-tit type2">Blade 1</div>
                        <div class="line">
                            <label class="label">Bending</label>
                        </div>
                        <div class="line">
                            <label class="label">· Flapwise</label>
                            <span class="txt">
                                {{ Number(info.blade1.BM_FLAP.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade1.BM_FLAP.value"
                                :min="info.blade1.BM_FLAP.min"
                                :max="info.blade1.BM_FLAP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Edgewise</label>
                            <span class="txt">
                                {{ Number(info.blade1.BM_EDGE.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade1.BM_EDGE.value"
                                :min="info.blade1.BM_EDGE.min"
                                :max="info.blade1.BM_EDGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Torsion</label>
                            <span class="txt">
                                {{ Number(info.blade1.TOR.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade1.TOR.value"
                                :min="info.blade1.TOR.min"
                                :max="info.blade1.TOR.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">DEL</label>
                        </div>
                        <div class="line">
                            <label class="label">· Flapwise</label>
                            <span class="txt">
                                {{ Number(info.blade1.FLAP_DEL.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade1.FLAP_DEL.value"
                                :min="info.blade1.FLAP_DEL.min"
                                :max="info.blade1.FLAP_DEL.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Edge</label>
                            <span class="txt">
                                {{ Number(info.blade1.EDGE_DEL.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade1.EDGE_DEL.value"
                                :min="info.blade1.EDGE_DEL.min"
                                :max="info.blade1.EDGE_DEL.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">수명 예측</div>
                        <div class="line">
                            <label class="label">Nominal Age</label>
                            <span class="txt">
                                {{ Number(info.blade1.BLADE_NOM_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.blade1.BLADE_NOM_AGE.value"
                                :min="info.blade1.BLADE_NOM_AGE.min"
                                :max="info.blade1.BLADE_NOM_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Age</label>
                            <span class="txt">
                                {{ Number(info.blade1.BLADE_EST_FAT_AGE.value).toLocaleString() }}
                                month
                            </span>
                            <Slider
                                v-model="info.blade1.BLADE_EST_FAT_AGE.value"
                                :min="info.blade1.BLADE_EST_FAT_AGE.min"
                                :max="info.blade1.BLADE_EST_FAT_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Margin</label>
                            <span class="txt">
                                {{
                                    Number(info.blade1.BLADE_EST_FAT_MARGIN.value).toLocaleString()
                                }}
                                month
                            </span>
                            <Slider
                                v-model="info.blade1.BLADE_EST_FAT_MARGIN.value"
                                :min="info.blade1.BLADE_EST_FAT_MARGIN.min"
                                :max="info.blade1.BLADE_EST_FAT_MARGIN.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Pitch System</div>
                        <div class="line">
                            <label class="label">Pitch Angle</label>
                        </div>
                        <div class="line">
                            <label class="label">· Measured Value</label>
                            <span class="txt">
                                {{ Number(info.PITCH_ANGLE_MEAS.value).toLocaleString() }} °
                            </span>
                            <Slider
                                v-model="info.PITCH_ANGLE_MEAS.value"
                                :min="info.PITCH_ANGLE_MEAS.min"
                                :max="info.PITCH_ANGLE_MEAS.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Prediction Value</label>
                            <span class="txt">
                                {{ Number(info.PITCH_ANGLE_PRED.value).toLocaleString() }} °
                            </span>
                            <Slider
                                v-model="info.PITCH_ANGLE_PRED.value"
                                :min="info.PITCH_ANGLE_PRED.min"
                                :max="info.PITCH_ANGLE_PRED.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Deviation</label>
                            <span class="txt">
                                {{ Number(info.PITCH_ANGLE_DEV.value).toLocaleString() }} °
                            </span>
                            <Slider
                                v-model="info.PITCH_ANGLE_DEV.value"
                                :min="info.PITCH_ANGLE_DEV.min"
                                :max="info.PITCH_ANGLE_DEV.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">수명 예측</div>
                        <div class="line">
                            <label class="label">Design Age</label>
                            <span class="txt">
                                {{ Number(info.PITCH_DESIGN_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.PITCH_DESIGN_AGE.value"
                                :min="info.PITCH_DESIGN_AGE.min"
                                :max="info.PITCH_DESIGN_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Age</label>
                            <span class="txt">
                                {{ Number(info.PITCH_EST_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.PITCH_EST_AGE.value"
                                :min="info.PITCH_EST_AGE.min"
                                :max="info.PITCH_EST_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Health Indes</label>
                            <span class="txt">
                                {{ Number(info.PITCH_HEALTH_IDX.value).toLocaleString() }} %
                            </span>
                            <Slider
                                v-model="info.PITCH_HEALTH_IDX.value"
                                :min="info.PITCH_HEALTH_IDX.min"
                                :max="info.PITCH_HEALTH_IDX.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-wrap type-option">
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Blade 2</div>
                        <div class="line">
                            <label class="label">Bending</label>
                        </div>
                        <div class="line">
                            <label class="label">· Flapwise</label>
                            <span class="txt">
                                {{ Number(info.blade2.BM_FLAP.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade2.BM_FLAP.value"
                                :min="info.blade2.BM_FLAP.min"
                                :max="info.blade2.BM_FLAP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Edgewise</label>
                            <span class="txt">
                                {{ Number(info.blade2.BM_EDGE.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade2.BM_EDGE.value"
                                :min="info.blade2.BM_EDGE.min"
                                :max="info.blade2.BM_EDGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Torsion</label>
                            <span class="txt">
                                {{ Number(info.blade2.TOR.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade2.TOR.value"
                                :min="info.blade2.TOR.min"
                                :max="info.blade2.TOR.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">DEL</label>
                        </div>
                        <div class="line">
                            <label class="label">· Flapwise</label>
                            <span class="txt">
                                {{ Number(info.blade2.FLAP_DEL.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade2.FLAP_DEL.value"
                                :min="info.blade2.FLAP_DEL.min"
                                :max="info.blade2.FLAP_DEL.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Edge</label>
                            <span class="txt">
                                {{ Number(info.blade2.EDGE_DEL.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade2.EDGE_DEL.value"
                                :min="info.blade2.EDGE_DEL.min"
                                :max="info.blade2.EDGE_DEL.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">수명 예측</div>
                        <div class="line">
                            <label class="label">Nominal Age</label>
                            <span class="txt">
                                {{ Number(info.blade2.BLADE_NOM_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.blade2.BLADE_NOM_AGE.value"
                                :min="info.blade2.BLADE_NOM_AGE.min"
                                :max="info.blade2.BLADE_NOM_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Age</label>
                            <span class="txt">
                                {{ Number(info.blade2.BLADE_EST_FAT_AGE.value).toLocaleString() }}
                                month
                            </span>
                            <Slider
                                v-model="info.blade2.BLADE_EST_FAT_AGE.value"
                                :min="info.blade2.BLADE_EST_FAT_AGE.min"
                                :max="info.blade2.BLADE_EST_FAT_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Margin</label>
                            <span class="txt">
                                {{
                                    Number(info.blade2.BLADE_EST_FAT_MARGIN.value).toLocaleString()
                                }}
                                month
                            </span>
                            <Slider
                                v-model="info.blade2.BLADE_EST_FAT_MARGIN.value"
                                :min="info.blade2.BLADE_EST_FAT_MARGIN.min"
                                :max="info.blade2.BLADE_EST_FAT_MARGIN.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-wrap type-option">
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Blade 3</div>
                        <div class="line">
                            <label class="label">Bending</label>
                        </div>
                        <div class="line">
                            <label class="label">· Flapwise</label>
                            <span class="txt">
                                {{ Number(info.blade3.BM_FLAP.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade3.BM_FLAP.value"
                                :min="info.blade3.BM_FLAP.min"
                                :max="info.blade3.BM_FLAP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Edgewise</label>
                            <span class="txt">
                                {{ Number(info.blade3.BM_EDGE.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade3.BM_EDGE.value"
                                :min="info.blade3.BM_EDGE.min"
                                :max="info.blade3.BM_EDGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Torsion</label>
                            <span class="txt">
                                {{ Number(info.blade3.TOR.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade3.TOR.value"
                                :min="info.blade3.TOR.min"
                                :max="info.blade3.TOR.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">DEL</label>
                        </div>
                        <div class="line">
                            <label class="label">· Flapwise</label>
                            <span class="txt">
                                {{ Number(info.blade3.FLAP_DEL.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade3.FLAP_DEL.value"
                                :min="info.blade3.FLAP_DEL.min"
                                :max="info.blade3.FLAP_DEL.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Edge</label>
                            <span class="txt">
                                {{ Number(info.blade3.EDGE_DEL.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.blade3.EDGE_DEL.value"
                                :min="info.blade3.EDGE_DEL.min"
                                :max="info.blade3.EDGE_DEL.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">수명 예측</div>
                        <div class="line">
                            <label class="label">Nominal Age</label>
                            <span class="txt">
                                {{ Number(info.blade3.BLADE_NOM_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.blade3.BLADE_NOM_AGE.value"
                                :min="info.blade3.BLADE_NOM_AGE.min"
                                :max="info.blade3.BLADE_NOM_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Age</label>
                            <span class="txt">
                                {{ Number(info.blade3.BLADE_EST_FAT_AGE.value).toLocaleString() }}
                                month
                            </span>
                            <Slider
                                v-model="info.blade3.BLADE_EST_FAT_AGE.value"
                                :min="info.blade3.BLADE_EST_FAT_AGE.min"
                                :max="info.blade3.BLADE_EST_FAT_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Margin</label>
                            <span class="txt">
                                {{
                                    Number(info.blade3.BLADE_EST_FAT_MARGIN.value).toLocaleString()
                                }}
                                month
                            </span>
                            <Slider
                                v-model="info.blade3.BLADE_EST_FAT_MARGIN.value"
                                :min="info.blade3.BLADE_EST_FAT_MARGIN.min"
                                :max="info.blade3.BLADE_EST_FAT_MARGIN.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
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
            this.$apiGET('/admin/diag/blade').then((data) => {
                this.info = data
            })
        },
        loadingSet(st) {
            this.loading = st
        }
    }
}
</script>
