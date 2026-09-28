<template>
    <div class="section model-top">
        <div class="section-model--top">
            <div class="tab-btn">
                <button type="button" class="btn" @click="$btnOnRouter('/overview_1')">
                    Blade&Pitch
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/overview_2')">
                    Nacelle&Tower
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/overview_3')">
                    Gear Box
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/overview_4')">
                    Generator
                </button>
                <button type="button" class="btn active" @click="$btnOnRouter('/overview_5')">
                    Yaw
                </button>
            </div>
            <div class="modelling-wrap" v-if="info">
                <!-- <div class="modelling-area" ref="container"></div> -->
                <div class="option-box fix">
                    <div class="box-wrap">
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Info</div>
                                <div class="line">
                                    <label class="label">Position ready for prod.</label>
                                    <span class="txt">
                                        {{ info.WYAW_POS_OK_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.WYAW_POS_OK_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">Service box connect</label>
                                    <span class="txt">
                                        {{ info.WYAW_SER_BOX_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.WYAW_SER_BOX_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">Allow to move</label>
                                    <span class="txt">
                                        {{ info.WYAW_POS_NOT_MOV_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.WYAW_POS_NOT_MOV_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">End position</label>
                                    <span class="txt">
                                        {{ info.WYAW_POS_END_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.WYAW_POS_END_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Motor</div>
                                <div class="line">
                                    <label class="label"> Calculated rotation </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.WYAW_YW_SPD.value).toLocaleString() }} m/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.WYAW_YW_SPD.value"
                                        :min="info.WYAW_YW_SPD.min"
                                        :max="info.WYAW_YW_SPD.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label"> Calculated torque </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.WYAW_YW_TORQ.value).toLocaleString() }} Nm
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.WYAW_YW_TORQ.value"
                                        :min="info.WYAW_YW_TORQ.min"
                                        :max="info.WYAW_YW_TORQ.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Brake</div>
                                <div class="line">
                                    <label class="label">Released</label>
                                    <span class="txt">
                                        {{ info.WYAW_MOT_BRK_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.WYAW_MOT_BRK_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="option-box type-right fix">
                    <div class="box-wrap">
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">
                                    Yaw
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Yaw').b"
                                        @click="$btnOnRouter('diagnosis_5')"
                                    ></button>
                                </div>
                                <div class="line">
                                    <label class="label"> State </label>
                                    <span class="txt">
                                        {{ info.WYAW_YW_ST }}
                                    </span>
                                    <span></span>
                                </div>
                                <div class="hr"></div>

                                <div class="line">
                                    <label class="label"> Position </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.WYAW_YAW_ANG.value).toLocaleString() }} °
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.WYAW_YAW_ANG.value"
                                        :min="info.WYAW_YAW_ANG.min"
                                        :max="info.WYAW_YAW_ANG.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· Deviation</label>
                                    <span class="txt txt-c--pink">
                                        {{
                                            Number(info.WYAW_YW_POS_ERR_DMD.value).toLocaleString()
                                        }}
                                        °
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.WYAW_YW_POS_ERR_DMD.value"
                                        :min="info.WYAW_YW_POS_ERR_DMD.min"
                                        :max="info.WYAW_YW_POS_ERR_DMD.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">· North</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.WYAW_YAW_ANG.value).toLocaleString() }} °
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.WYAW_YAW_ANG.value"
                                        :min="info.WYAW_YAW_ANG.min"
                                        :max="info.WYAW_YAW_ANG.max"
                                        :step="0.1"
                                    />
                                </div>

                                <div class="line">
                                    <label class="label">Initialized</label>
                                    <span class="txt">
                                        {{ info.WYAW_POS_INI_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.WYAW_POS_INI_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">Automatic mode</label>
                                    <span class="txt">
                                        {{ info.WYAW_CM_YW_AUT_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.WYAW_CM_YW_AUT_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">Running</label>
                                    <span class="txt">
                                        {{ info.WYAW_ON_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.WYAW_ON_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
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
                        <div class="box-tit type2">Info</div>
                        <div class="line">
                            <label class="label">Position ready for prod.</label>
                            <span class="txt">
                                {{ info.WYAW_POS_OK_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.WYAW_POS_OK_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">Service box connect</label>
                            <span class="txt">
                                {{ info.WYAW_SER_BOX_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.WYAW_SER_BOX_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">Allow to move</label>
                            <span class="txt">
                                {{ info.WYAW_POS_NOT_MOV_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.WYAW_POS_NOT_MOV_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">End position</label>
                            <span class="txt">
                                {{ info.WYAW_POS_END_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.WYAW_POS_END_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-wrap type-option">
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Motor</div>

                        <div class="line">
                            <label class="label"> Calculated rotation </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.WYAW_YW_SPD.value).toLocaleString() }} m/s
                            </span>
                            <Slider
                                class="red"
                                v-model="info.WYAW_YW_SPD.value"
                                :min="info.WYAW_YW_SPD.min"
                                :max="info.WYAW_YW_SPD.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> Calculated torque </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.WYAW_YW_TORQ.value).toLocaleString() }} Nm
                            </span>
                            <Slider
                                class="red"
                                v-model="info.WYAW_YW_TORQ.value"
                                :min="info.WYAW_YW_TORQ.min"
                                :max="info.WYAW_YW_TORQ.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>

                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Brake</div>

                        <div class="line">
                            <label class="label">Released</label>
                            <span class="txt">
                                {{ info.WYAW_MOT_BRK_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.WYAW_MOT_BRK_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-wrap type-option">
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Yaw</div>

                        <div class="line">
                            <label class="label"> State </label>
                            <span class="txt">
                                {{ info.WYAW_YW_ST }}
                            </span>
                            <span></span>
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label"> Position </label>
                            <span class="txt">
                                {{ Number(info.WYAW_YAW_ANG.value).toLocaleString() }} °
                            </span>
                            <Slider
                                class="red"
                                v-model="info.WYAW_YAW_ANG.value"
                                :min="info.WYAW_YAW_ANG.min"
                                :max="info.WYAW_YAW_ANG.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Deviation</label>
                            <span class="txt">
                                {{ Number(info.WYAW_YW_POS_ERR_DMD.value).toLocaleString() }} °
                            </span>
                            <Slider
                                class="red"
                                v-model="info.WYAW_YW_POS_ERR_DMD.value"
                                :min="info.WYAW_YW_POS_ERR_DMD.min"
                                :max="info.WYAW_YW_POS_ERR_DMD.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· North</label>
                            <span class="txt">
                                {{ Number(info.WYAW_YAW_ANG.value).toLocaleString() }} °
                            </span>
                            <Slider
                                class="red"
                                v-model="info.WYAW_YAW_ANG.value"
                                :min="info.WYAW_YAW_ANG.min"
                                :max="info.WYAW_YAW_ANG.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="line">
                            <label class="label">Initialized</label>
                            <span class="txt">
                                {{ info.WYAW_POS_INI_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.WYAW_POS_INI_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">Automatic mode</label>
                            <span class="txt">
                                {{ info.WYAW_CM_YW_AUT_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.WYAW_CM_YW_AUT_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">Running</label>
                            <span class="txt">
                                {{ info.WYAW_ON_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.WYAW_ON_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>

                        <div class="box-sub type2">
                            Health Monitoring
                            <button
                                type="button"
                                class="btn btn-sm btn-graph"
                                :class="$getAlarmItem('Yaw').b"
                                @click="$btnOnRouter('diagnosis_5')"
                            >
                                진단 상세
                            </button>
                        </div>
                        <div class="line">
                            <label class="label">Design Age</label>
                            <span class="txt">
                                {{ Number(info.YAW_DESIGN_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                class="red"
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
                                class="red"
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
                                class="red"
                                v-model="info.YAW_HEALTH_IDX.value"
                                :min="info.YAW_HEALTH_IDX.min"
                                :max="info.YAW_HEALTH_IDX.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Chart></Chart>
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
            this.$apiGET('/admin/over/yaw').then((data) => {
                this.info = data
            })
        },
        loadingSet(st) {
            this.loading = st
        }
    }
}
</script>
