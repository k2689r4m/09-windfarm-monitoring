<template>
    <div class="section model-top">
        <div class="section-model--top">
            <div class="tab-btn">
                <button type="button" class="btn active" @click="$btnOnRouter('/overview_1')">
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
                <button type="button" class="btn" @click="$btnOnRouter('/overview_5')">Yaw</button>
            </div>
            <div class="modelling-wrap" v-if="info">
                <!-- <div class="modelling-area" ref="container"></div> -->
                <div class="option-box fix">
                    <div class="box-wrap">
                        <!-- <OverView :item-list="mainItems[0]"></OverView>
            <OverView :item-list="mainItems[1]"></OverView>
            <OverView :item-list="mainItems[2]"></OverView>
            <OverView :item-list="mainItems[3]"></OverView> -->

                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">
                                    Blade 1
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Blade 1').b"
                                        @click="$btnOnRouter('diagnosis_1')"
                                    ></button>
                                </div>
                                <div class="line">
                                    <label class="label">State</label>
                                    <span class="txt txt-c--pink">{{ info.BLADE1.BLD_1_ST }}</span>
                                    <span></span>
                                </div>
                                <div class="line">
                                    <label class="label">Position</label>
                                    <span class="txt txt-c--pink">
                                        {{ info.BLADE1.PT_ANG_VAL_BL_1.value }}°
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.BLADE1.PT_ANG_VAL_BL_1.value"
                                        :min="info.BLADE1.PT_ANG_VAL_BL_1.min"
                                        :max="info.BLADE1.PT_ANG_VAL_BL_1.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">Torque</label>
                                    <span class="txt txt-c--pink">
                                        {{ info.BLADE1.TQ_RMS_BL_1.value }}Nm
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.BLADE1.TQ_RMS_BL_1.value"
                                        :min="info.BLADE1.TQ_RMS_BL_1.min"
                                        :max="info.BLADE1.TQ_RMS_BL_1.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">
                                    Blade 2
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Blade 2').b"
                                        @click="$btnOnRouter('diagnosis_1')"
                                    ></button>
                                </div>
                                <div class="line">
                                    <label class="label">State</label>
                                    <span class="txt txt-c--pink">{{ info.BLADE2.BLD_2_ST }}</span>
                                    <span></span>
                                </div>
                                <div class="line">
                                    <label class="label">Position</label>
                                    <span class="txt txt-c--pink">
                                        {{ info.BLADE2.PT_ANG_VAL_BL_2.value }}°
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.BLADE2.PT_ANG_VAL_BL_2.value"
                                        :min="info.BLADE2.PT_ANG_VAL_BL_2.min"
                                        :max="info.BLADE2.PT_ANG_VAL_BL_2.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">Torque</label>
                                    <span class="txt txt-c--pink">
                                        {{ info.BLADE2.TQ_RMS_BL_2.value }}Nm
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.BLADE2.TQ_RMS_BL_2.value"
                                        :min="info.BLADE2.TQ_RMS_BL_2.min"
                                        :max="info.BLADE2.TQ_RMS_BL_2.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">
                                    Blade 3
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Blade 3').b"
                                        @click="$btnOnRouter('diagnosis_1')"
                                    ></button>
                                </div>
                                <div class="line">
                                    <label class="label">State</label>
                                    <span class="txt txt-c--pink">{{ info.BLADE3.BLD_3_ST }}</span>
                                    <span></span>
                                </div>
                                <div class="line">
                                    <label class="label">Position</label>
                                    <span class="txt txt-c--pink">
                                        {{ info.BLADE3.PT_ANG_VAL_BL_3.value }}°
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.BLADE3.PT_ANG_VAL_BL_3.value"
                                        :min="info.BLADE3.PT_ANG_VAL_BL_3.min"
                                        :max="info.BLADE3.PT_ANG_VAL_BL_3.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">Torque</label>
                                    <span class="txt txt-c--pink">
                                        {{ info.BLADE3.TQ_RMS_BL_3.value }}Nm
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.BLADE3.TQ_RMS_BL_3.value"
                                        :min="info.BLADE3.TQ_RMS_BL_3.min"
                                        :max="info.BLADE3.TQ_RMS_BL_3.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">
                                    Pitch System
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Pitch System').b"
                                        @click="$btnOnRouter('diagnosis_1')"
                                    ></button>
                                </div>
                                <div class="line">
                                    <label class="label">Torque</label>
                                    <span class="txt txt-c--pink">
                                        {{ info.PITCH.PITCH_ANGLE_MEAS.value }}Nm
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.PITCH.PITCH_ANGLE_MEAS.value"
                                        :min="info.PITCH.PITCH_ANGLE_MEAS.min"
                                        :max="info.PITCH.PITCH_ANGLE_MEAS.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-wrap"></div>
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
            <div v-if="loading && info" class="loading-content" style="height: 953px">
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
                            <label class="label">State</label>
                            <span class="txt">{{ info.BLADE1.BLD_1_ST }}</span>
                            <span></span>
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Position</label>
                            <span class="txt">{{ info.BLADE1.PT_ANG_VAL_BL_1.value }}°</span>
                            <Slider
                                v-model="info.BLADE1.PT_ANG_VAL_BL_1.value"
                                :min="info.BLADE1.PT_ANG_VAL_BL_1.min"
                                :max="info.BLADE1.PT_ANG_VAL_BL_1.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">DC bus voltage</label>
                            <span class="txt">{{ info.BLADE1.PT_CNV_DCL_VOL_BL_1.value }}V</span>
                            <Slider
                                v-model="info.BLADE1.PT_CNV_DCL_VOL_BL_1.value"
                                :min="info.BLADE1.PT_CNV_DCL_VOL_BL_1.min"
                                :max="info.BLADE1.PT_CNV_DCL_VOL_BL_1.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Free wheel brake</label>
                            <span class="txt">{{
                                info.BLADE1.BLD_1_BRK_ST == 1 ? 'ON' : 'OFF'
                            }}</span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.BLADE1.BLD_1_BRK_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Battery State</label>
                            <span class="txt">{{ info.BLADE1.BLD_1_UPS_ST }}</span>
                            <span></span>
                        </div>
                        <div class="line">
                            <label class="label">Battery Voltage</label>
                            <span class="txt">{{ info.BLADE1.PT_UPS_V_BL_1.value }}V</span>
                            <Slider
                                v-model="info.BLADE1.PT_UPS_V_BL_1.value"
                                :min="info.BLADE1.PT_UPS_V_BL_1.min"
                                :max="info.BLADE1.PT_UPS_V_BL_1.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Torque</label>
                            <span class="txt">{{ info.BLADE1.TQ_RMS_BL_1.value }}Nm</span>
                            <Slider
                                v-model="info.BLADE1.TQ_RMS_BL_1.value"
                                :min="info.BLADE1.TQ_RMS_BL_1.min"
                                :max="info.BLADE1.TQ_RMS_BL_1.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Motor temp.</label>
                            <span class="txt">{{ info.BLADE1.PT_MOT_TMP_BL_1.value }} °C</span>
                            <Slider
                                v-model="info.BLADE1.PT_MOT_TMP_BL_1.value"
                                :min="info.BLADE1.PT_MOT_TMP_BL_1.min"
                                :max="info.BLADE1.PT_MOT_TMP_BL_1.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Cabinet temp.</label>
                            <span class="txt">{{ info.BLADE1.PT_CABI_TMP_BL_1.value }} °C</span>
                            <Slider
                                v-model="info.BLADE1.PT_CABI_TMP_BL_1.value"
                                :min="info.BLADE1.PT_CABI_TMP_BL_1.min"
                                :max="info.BLADE1.PT_CABI_TMP_BL_1.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">
                            Health Monitoring
                            <button
                                type="button"
                                class="btn btn-sm btn-graph"
                                :class="$getAlarmItem('Blade 1').b"
                                @click="$btnOnRouter('diagnosis_1')"
                            >
                                진단 상세
                            </button>
                        </div>

                        <div class="line">
                            <label class="label">Bending</label>
                        </div>
                        <div class="line">
                            <label class="label">· Flapwise</label>
                            <span class="txt">
                                {{ Number(info.BLADE1.BM_FLAP.value).toLocaleString() }}Pa
                            </span>
                            <Slider
                                v-model="info.BLADE1.BM_FLAP.value"
                                :min="info.BLADE1.BM_FLAP.min"
                                :max="info.BLADE1.BM_FLAP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Edgewise</label>
                            <span class="txt"
                                >{{ Number(info.BLADE1.BM_EDGE.value).toLocaleString() }}Pa</span
                            >
                            <Slider
                                v-model="info.BLADE1.BM_EDGE.value"
                                :min="info.BLADE1.BM_EDGE.min"
                                :max="info.BLADE1.BM_EDGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Torsion</label>
                            <span class="txt"
                                >{{ Number(info.BLADE1.TOR.value).toLocaleString() }}Pa</span
                            >
                            <Slider
                                v-model="info.BLADE1.TOR.value"
                                :min="info.BLADE1.TOR.min"
                                :max="info.BLADE1.TOR.max"
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
                            <span class="txt">{{ info.PITCH.PITCH_ANGLE_MEAS.value }}°</span>
                            <Slider
                                v-model="info.PITCH.PITCH_ANGLE_MEAS.value"
                                :min="info.PITCH.PITCH_ANGLE_MEAS.min"
                                :max="info.PITCH.PITCH_ANGLE_MEAS.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">
                            Health Monitoring
                            <button
                                type="button"
                                class="btn btn-sm btn-graph"
                                :class="$getAlarmItem('Pitch System').b"
                                @click="$btnOnRouter('diagnosis_1')"
                            >
                                진단 상세
                            </button>
                        </div>

                        <div class="line">
                            <label class="label">Nominal Age</label>
                            <span class="txt">{{ info.PITCH.PITCH_DESIGN_AGE.value }} month</span>
                            <Slider
                                v-model="info.PITCH.PITCH_DESIGN_AGE.value"
                                :min="info.PITCH.PITCH_DESIGN_AGE.min"
                                :max="info.PITCH.PITCH_DESIGN_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Age</label>
                            <span class="txt">{{ info.PITCH.PITCH_EST_AGE.value }} month</span>
                            <Slider
                                v-model="info.PITCH.PITCH_EST_AGE.value"
                                :min="info.PITCH.PITCH_EST_AGE.min"
                                :max="info.PITCH.PITCH_EST_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Fatigue Margin</label>
                            <span class="txt">{{ info.PITCH.PITCH_HEALTH_IDX.value }} month</span>
                            <Slider
                                v-model="info.PITCH.PITCH_HEALTH_IDX.value"
                                :min="info.PITCH.PITCH_HEALTH_IDX.min"
                                :max="info.PITCH.PITCH_HEALTH_IDX.max"
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
                            <label class="label">State</label>
                            <span class="txt">{{ info.BLADE2.BLD_2_ST }}</span>
                            <span></span>
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Position</label>
                            <span class="txt">{{ info.BLADE2.PT_ANG_VAL_BL_2.value }}°</span>
                            <Slider
                                v-model="info.BLADE2.PT_ANG_VAL_BL_2.value"
                                :min="info.BLADE2.PT_ANG_VAL_BL_2.min"
                                :max="info.BLADE2.PT_ANG_VAL_BL_2.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">DC bus voltage</label>
                            <span class="txt">{{ info.BLADE2.PT_CNV_DCL_VOL_BL_2.value }}V</span>
                            <Slider
                                v-model="info.BLADE2.PT_CNV_DCL_VOL_BL_2.value"
                                :min="info.BLADE2.PT_CNV_DCL_VOL_BL_2.min"
                                :max="info.BLADE2.PT_CNV_DCL_VOL_BL_2.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Free wheel brake</label>
                            <span class="txt">{{
                                info.BLADE2.BLD_2_BRK_ST == 1 ? 'ON' : 'OFF'
                            }}</span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.BLADE2.BLD_2_BRK_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Battery State</label>
                            <span class="txt">{{ info.BLADE2.BLD_2_UPS_ST }}</span>
                            <span></span>
                        </div>
                        <div class="line">
                            <label class="label">Battery Voltage</label>
                            <span class="txt">{{ info.BLADE2.PT_UPS_V_BL_2.value }}V</span>
                            <Slider
                                v-model="info.BLADE2.PT_UPS_V_BL_2.value"
                                :min="info.BLADE2.PT_UPS_V_BL_2.min"
                                :max="info.BLADE2.PT_UPS_V_BL_2.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Torque</label>
                            <span class="txt">{{ info.BLADE2.TQ_RMS_BL_2.value }}Nm</span>
                            <Slider
                                v-model="info.BLADE2.TQ_RMS_BL_2.value"
                                :min="info.BLADE2.TQ_RMS_BL_2.min"
                                :max="info.BLADE2.TQ_RMS_BL_2.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Motor temp.</label>
                            <span class="txt">{{ info.BLADE2.PT_MOT_TMP_BL_2.value }} °C</span>
                            <Slider
                                v-model="info.BLADE2.PT_MOT_TMP_BL_2.value"
                                :min="info.BLADE2.PT_MOT_TMP_BL_2.min"
                                :max="info.BLADE2.PT_MOT_TMP_BL_2.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Cabinet temp.</label>
                            <span class="txt">{{ info.BLADE2.PT_CABI_TMP_BL_2.value }} °C</span>
                            <Slider
                                v-model="info.BLADE2.PT_CABI_TMP_BL_2.value"
                                :min="info.BLADE2.PT_CABI_TMP_BL_2.min"
                                :max="info.BLADE2.PT_CABI_TMP_BL_2.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">
                            Health Monitoring
                            <button
                                type="button"
                                class="btn btn-sm btn-graph"
                                :class="$getAlarmItem('Blade 2').b"
                                @click="$btnOnRouter('diagnosis_1')"
                            >
                                진단 상세
                            </button>
                        </div>

                        <div class="line">
                            <label class="label">Bending</label>
                        </div>
                        <div class="line">
                            <label class="label">· Flapwise</label>
                            <span class="txt"
                                >{{ Number(info.BLADE2.BM_FLAP.value).toLocaleString() }}Pa</span
                            >
                            <Slider
                                v-model="info.BLADE2.BM_FLAP.value"
                                :min="info.BLADE2.BM_FLAP.min"
                                :max="info.BLADE2.BM_FLAP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Edgewise</label>
                            <span class="txt"
                                >{{ Number(info.BLADE2.BM_EDGE.value).toLocaleString() }}Pa</span
                            >
                            <Slider
                                v-model="info.BLADE2.BM_EDGE.value"
                                :min="info.BLADE2.BM_EDGE.min"
                                :max="info.BLADE2.BM_EDGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Torsion</label>
                            <span class="txt"
                                >{{ Number(info.BLADE2.TOR.value).toLocaleString() }}Pa</span
                            >
                            <Slider
                                v-model="info.BLADE2.TOR.value"
                                :min="info.BLADE2.TOR.min"
                                :max="info.BLADE2.TOR.max"
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
                            <label class="label">State</label>
                            <span class="txt">{{ info.BLADE3.BLD_3_ST }}</span>
                            <span></span>
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Position</label>
                            <span class="txt">{{ info.BLADE3.PT_ANG_VAL_BL_3.value }}°</span>
                            <Slider
                                v-model="info.BLADE3.PT_ANG_VAL_BL_3.value"
                                :min="info.BLADE3.PT_ANG_VAL_BL_3.min"
                                :max="info.BLADE3.PT_ANG_VAL_BL_3.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">DC bus voltage</label>
                            <span class="txt">{{ info.BLADE3.PT_CNV_DCL_VOL_BL_3.value }}V</span>
                            <Slider
                                v-model="info.BLADE3.PT_CNV_DCL_VOL_BL_3.value"
                                :min="info.BLADE3.PT_CNV_DCL_VOL_BL_3.min"
                                :max="info.BLADE3.PT_CNV_DCL_VOL_BL_3.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Free wheel brake</label>
                            <span class="txt">{{
                                info.BLADE3.BLD_3_BRK_ST == 1 ? 'ON' : 'OFF'
                            }}</span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.BLADE3.BLD_3_BRK_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Battery State</label>
                            <span class="txt">{{ info.BLADE3.BLD_3_UPS_ST }}</span>
                            <span></span>
                        </div>
                        <div class="line">
                            <label class="label">Battery Voltage</label>
                            <span class="txt">{{ info.BLADE3.PT_UPS_V_BL_3.value }}V</span>
                            <Slider
                                v-model="info.BLADE3.PT_UPS_V_BL_3.value"
                                :min="info.BLADE3.PT_UPS_V_BL_3.min"
                                :max="info.BLADE3.PT_UPS_V_BL_3.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Torque</label>
                            <span class="txt">{{ info.BLADE3.TQ_RMS_BL_3.value }}Nm</span>
                            <Slider
                                v-model="info.BLADE3.TQ_RMS_BL_3.value"
                                :min="info.BLADE3.TQ_RMS_BL_3.min"
                                :max="info.BLADE3.TQ_RMS_BL_3.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Motor temp.</label>
                            <span class="txt">{{ info.BLADE3.PT_MOT_TMP_BL_3.value }} °C</span>
                            <Slider
                                v-model="info.BLADE3.PT_MOT_TMP_BL_3.value"
                                :min="info.BLADE3.PT_MOT_TMP_BL_3.min"
                                :max="info.BLADE3.PT_MOT_TMP_BL_3.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Cabinet temp.</label>
                            <span class="txt">{{ info.BLADE3.PT_CABI_TMP_BL_3.value }} °C</span>
                            <Slider
                                v-model="info.BLADE3.PT_CABI_TMP_BL_3.value"
                                :min="info.BLADE3.PT_CABI_TMP_BL_3.min"
                                :max="info.BLADE3.PT_CABI_TMP_BL_3.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">
                            Health Monitoring
                            <button
                                type="button"
                                class="btn btn-sm btn-graph"
                                :class="$getAlarmItem('Blade 3').b"
                                @click="$btnOnRouter('diagnosis_1')"
                            >
                                진단 상세
                            </button>
                        </div>

                        <div class="line">
                            <label class="label">Bending</label>
                        </div>
                        <div class="line">
                            <label class="label">· Flapwise</label>
                            <span class="txt"
                                >{{ Number(info.BLADE3.BM_FLAP.value).toLocaleString() }}Pa</span
                            >
                            <Slider
                                v-model="info.BLADE3.BM_FLAP.value"
                                :min="info.BLADE3.BM_FLAP.min"
                                :max="info.BLADE3.BM_FLAP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Edgewise</label>
                            <span class="txt"
                                >{{ Number(info.BLADE3.BM_EDGE.value).toLocaleString() }}Pa</span
                            >
                            <Slider
                                v-model="info.BLADE3.BM_EDGE.value"
                                :min="info.BLADE3.BM_EDGE.min"
                                :max="info.BLADE3.BM_EDGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Torsion</label>
                            <span class="txt"
                                >{{ Number(info.BLADE3.TOR.value).toLocaleString() }}Pa</span
                            >
                            <Slider
                                v-model="info.BLADE3.TOR.value"
                                :min="info.BLADE3.TOR.min"
                                :max="info.BLADE3.TOR.max"
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
// import { shallowRef } from 'vue';
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

            Timer: null,

            width: 1280,
            height: 500,
            marginTop: 30,
            marginRight: 100,
            marginBottom: 30,
            marginLeft: 100
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
            this.$apiGET('/admin/over/blade').then((data) => {
                this.info = data
            })
        },
        loadingSet(st) {
            this.loading = st
        }
    }
}
</script>

<style></style>
