<template>
    <div class="section main">
        <video
            v-show="videoST"
            :src="'video/a.mp4'"
            class="main-video"
            autoplay
            muted
            @ended="endedPlaying"
        ></video>
        <Glb
            v-show="!videoST"
            :path="'cut.glb'"
            :cPo="cPo"
            :oPo="oPo"
            :speed="info?.WNAC_WD_SPD ?? 0"
            :loading="loading"
            :videoST="videoST"
            @loadingSet="loadingSet"
            class="main-modelling"
        >
        </Glb>
        <div v-if="loading && !videoST" class="loading-content" style="top: -100px">
            <span class="loader"></span>
        </div>

        <div v-if="info">
            <div class="main-con left">
                <div class="flex-item">
                    <div class="flex-item--wrap">
                        <div class="item-tit">발전소 기본정보</div>
                        <div class="item-con">
                            <div class="label-line">
                                <label class="label">발전소 이름</label>
                                <span class="text">{{ info.WT_NAME }}</span>
                            </div>
                            <div class="label-line">
                                <label class="label">Turbine Status</label>
                                <span class="text">Power Production</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-item bg-none">
                    <div class="flex-item--wrap">
                        <div class="dashboard-gauge">
                            <div
                                class="needle1"
                                :style="'transform: rotate(' + info.WD_DIR + 'deg)'"
                            ></div>
                            <div
                                class="needle2"
                                :style="'transform: rotate(' + info.WNAC_WD_DIR + 'deg)'"
                            ></div>
                        </div>
                        <div class="item-tit center">기상반 정보</div>
                        <div class="dashboard-table">
                            <div class="p-10 p-l--20 p-r--20">
                                <div class="tr">
                                    <div class="txt-blue">MET Tower</div>
                                    <div class="txt-white">발전소 이름</div>
                                    <div class="txt-green">Nacelle</div>
                                </div>
                                <div class="tr">
                                    <div class="txt-blue">NW ({{ info.WD_DIR ?? 0 }}˚)</div>
                                    <div class="txt-white">Wind Direction</div>
                                    <div class="txt-green">
                                        {{ degToCompass(info.WNAC_WD_DIR) }} ({{
                                            info.WNAC_WD_DIR ?? 0
                                        }}˚)
                                    </div>
                                </div>
                                <div class="tr">
                                    <div class="txt-blue">{{ info.WD_SPD ?? 0 }} m/s</div>
                                    <div class="txt-white">Wind Speed</div>
                                    <div class="txt-green">{{ info.WNAC_WD_SPD ?? 0 }} m/s</div>
                                </div>
                                <div class="tr">
                                    <div class="txt-blue">
                                        {{ Math.floor(info.AIR_TEMP) ?? 0 }} ℃
                                    </div>
                                    <div class="txt-white">Temperature</div>
                                    <div class="txt-green">
                                        {{ Math.floor(info.WNAC_EX_TMP) ?? 0 }} ℃
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-con bottom">
                <div class="btns">
                    <button
                        type="button"
                        class="btn"
                        :class="$getAlarmItem('Nacelle').a"
                        @click="$btnOnRouter('diagnosis_2')"
                    >
                        Nacelle
                    </button>
                    <button
                        type="button"
                        class="btn"
                        :class="$getAlarmItem('Tower Top').a"
                        @click="$btnOnRouter('diagnosis_2')"
                    >
                        Tower Top
                    </button>
                    <button
                        type="button"
                        class="btn"
                        :class="$getAlarmItem('Tower Bottom').a"
                        @click="$btnOnRouter('diagnosis_2')"
                    >
                        Tower Bottom
                    </button>
                </div>
                <div class="modelling-fix">
                    <div class="modelling-fix--wrap">
                        <div class="label-line">
                            <label class="label">Rotor RPM</label>
                            <span class="text">{{ info.ROT_SPD.value }} rpm</span>
                        </div>
                        <Slider
                            v-model="info.ROT_SPD.value"
                            class="red"
                            :min="info.ROT_SPD.min"
                            :max="info.ROT_SPD.max"
                            :step="0.1"
                        />
                    </div>
                </div>
                <div class="modelling-fix">
                    <div class="modelling-fix--wrap">
                        <div class="label-line">
                            <label class="label">Pitch Angle</label>
                            <span class="text">{{ info.PITCH_ANGLE_MEAS.value }} °</span>
                        </div>
                        <Slider
                            v-model="info.PITCH_ANGLE_MEAS.value"
                            class="type2"
                            :min="info.PITCH_ANGLE_MEAS.min"
                            :max="info.PITCH_ANGLE_MEAS.max"
                            :step="0.1"
                        />
                    </div>
                </div>
                <div class="modelling-fix">
                    <div class="modelling-fix--wrap">
                        <div class="label-line">
                            <label class="label">Yaw Angle</label>
                            <span class="text">{{ info.WYAW_YAW_ANG.value }} °</span>
                        </div>
                        <Slider
                            v-model="info.WYAW_YAW_ANG.value"
                            class="type2"
                            :min="info.WYAW_YAW_ANG.min"
                            :max="info.WYAW_YAW_ANG.max"
                            :step="0.1"
                        />
                    </div>
                </div>
                <div class="modelling-fix">
                    <div class="modelling-fix--wrap">
                        <div class="label-line">
                            <label class="label">역률</label>
                            <span class="text sm">{{ info.GI_PF ?? 0 }}</span>
                        </div>
                        <div class="label-line">
                            <label class="label">주파수</label>
                            <span class="text sm">{{ info.WCNV_HZ ?? 0 }} Hz</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-con right">
                <div class="box">
                    <div class="tit">Entire Turbine Health Index</div>
                    <div class="figure">
                        {{ info.TURBINE_HEALTH_INDEX.value }}<span class="unit">%</span>
                    </div>
                    <div class="graph">
                        <div class="bar" :style="`width:${info.TURBINE_HEALTH_INDEX.rate}%`"></div>
                        <div class="col" v-for="item in 12" :key="item"></div>
                    </div>
                </div>
                <div class="box">
                    <div class="tit">Active Power</div>
                    <div class="figure">
                        {{ Number(info.TOT_WH.value).toLocaleString() }}<span class="unit">MW</span>
                    </div>
                    <div class="graph">
                        <div class="bar" :style="`width:${info.TOT_WH.rate}%`"></div>
                        <div class="col" v-for="item in 12" :key="item"></div>
                    </div>
                </div>
                <div class="box">
                    <div class="tit">일 누적 발전량</div>
                    <div class="figure">
                        {{ Number(info.TOT_WH_1D.value).toLocaleString() }}
                        <span class="unit">MWh</span>
                    </div>
                    <div class="graph">
                        <div class="bar" :style="`width:${info.TOT_WH_1D.rate}%`"></div>
                        <div class="col" v-for="item in 12" :key="item"></div>
                    </div>
                </div>
                <div class="box">
                    <div class="tit">월 누적 발전량</div>
                    <div class="figure">
                        {{ Number(info.TOT_WH_1M.value).toLocaleString() }}
                        <span class="unit">MWh</span>
                    </div>
                    <div class="graph">
                        <div class="bar" :style="`width:${info.TOT_WH_1M.rate}%`"></div>
                        <div class="col" v-for="item in 12" :key="item"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="loading-wrap">
            <span class="loader"></span>
        </div> -->
    </div>
</template>

<script>
import Glb from '../components/Glb.vue'
import Slider from '@vueform/slider'

export default {
    name: 'MainPage',
    components: {
        Slider,
        Glb
    },
    data() {
        return {
            videoURL: null,

            loading: true,

            sliderValue1: 90,
            sliderValue2: 60,
            sliderValue3: 50,
            sliderValue4: 70,
            sliderValue5: 60,
            sliderValue6: 40,
            sliderValue7: 40,

            cPo: {
                x: 0,
                y: 0,
                z: 2
            },
            oPo: {
                x: -0.7,
                y: -9.5,
                z: 0,
                rX: 0,
                rY: -1.5
            },

            videoST: false,

            Timer: null,
            info: null
        }
    },
    created() {},
    mounted() {
        // this.checkIndexedDBForVideo()
        this.Timer = this.timerStart()
    },
    updated() {},
    beforeUnmount() {
        this.timerStop()
    },
    methods: {
        async checkIndexedDBForVideo() {
            try {
                const storedGLB = await this.$loadGLBFromIndexedDB('main_video')

                if (storedGLB) {
                    this.videoURL = URL.createObjectURL(storedGLB)
                } else {
                    this.loadVideoFromServer()
                }
            } catch (error) {
                this.loadVideoFromServer()
            }
        },
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
        endedPlaying() {
            this.videoST = false
            // this.videoST = this.$store.getters.getMain
        },
        getData() {
            this.$apiGET('/admin/main/info').then((data) => {
                this.info = data
            })
        },
        degToCompass(num) {
            if (!num) {
                return 0
            }

            var val = Math.floor(num / 22.5 + 0.5)
            var arr = [
                'N',
                'NNE',
                'NE',
                'ENE',
                'E',
                'ESE',
                'SE',
                'SSE',
                'S',
                'SSW',
                'SW',
                'WSW',
                'W',
                'WNW',
                'NW',
                'NNW'
            ]
            return arr[val % 16]
        },
        loadingSet(st) {
            this.loading = st
        },
        loadVideoFromServer() {
            fetch(`video/a.mp4`)
                .then((response) => response.blob()) // 파일을 Blob으로 변환
                .then((blob) => {
                    this.$storeGLBInIndexedDB('main_video', blob)
                    this.videoURL = URL.createObjectURL(blob)
                })
        }
    }
}
</script>
