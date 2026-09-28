<template>
    <div class="section model-top">
        <div class="section-model--top">
            <div class="tab-btn">
                <button type="button" class="btn" @click="$btnOnRouter('/diagnosis_1')">
                    Blade&Pitch
                </button>
                <button type="button" class="btn active" @click="$btnOnRouter('/diagnosis_2')">
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
                                <div class="box-tit">Tower Top</div>
                                <div class="line">
                                    <label class="label">Bending</label>
                                </div>
                                <div class="line">
                                    <label class="label">· N-S</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_IN_LET.value"
                                        :min="info.GN_TMP_IN_LET.min"
                                        :max="info.GN_TMP_IN_LET.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· E-W</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_IN_LET.value"
                                        :min="info.GN_TMP_IN_LET.min"
                                        :max="info.GN_TMP_IN_LET.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">Torsion</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_IN_LET.value"
                                        :min="info.GN_TMP_IN_LET.min"
                                        :max="info.GN_TMP_IN_LET.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Tower Bottom</div>
                                <div class="line">
                                    <label class="label">Bending</label>
                                </div>
                                <div class="line">
                                    <label class="label">· N-S</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_IN_LET.value"
                                        :min="info.GN_TMP_IN_LET.min"
                                        :max="info.GN_TMP_IN_LET.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· E-W</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_IN_LET.value"
                                        :min="info.GN_TMP_IN_LET.min"
                                        :max="info.GN_TMP_IN_LET.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Nacelle</div>
                                <div class="line">
                                    <label class="label">Vibration</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Normal</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_IN_LET.value"
                                        :min="info.GN_TMP_IN_LET.min"
                                        :max="info.GN_TMP_IN_LET.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· Lateral</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_IN_LET.value"
                                        :min="info.GN_TMP_IN_LET.min"
                                        :max="info.GN_TMP_IN_LET.max"
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
                :path="'main.glb'"
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
                        <div class="box-tit type2">Tower Top</div>
                        <div class="line">
                            <label class="label">Bending</label>
                        </div>
                        <div class="line">
                            <label class="label">· N-S</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· E-W</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Torsion</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">수명 예측</div>
                        <div class="line">
                            <label class="label">Nominal Age</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Age</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Margin</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
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
                        <div class="line">
                            <label class="label">Bending</label>
                        </div>
                        <div class="line">
                            <label class="label">· N-S</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· E-W</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">수명 예측</div>
                        <div class="line">
                            <label class="label">Nominal Age</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Age</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Margin</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
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
                        <div class="line">
                            <label class="label">Vibration</label>
                        </div>
                        <div class="line">
                            <label class="label">· Normal</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Lateral</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label">Vibration RMS</label>
                        </div>
                        <div class="line">
                            <label class="label">· Normal</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Lateral</label>
                            <span class="txt">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
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
            this.$apiGET('/admin/over/generator').then((data) => {
                this.info = data
            })
        },
        loadingSet(st) {
            this.loading = st
        }
    }
}
</script>
