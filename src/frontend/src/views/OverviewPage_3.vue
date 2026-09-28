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
                <button type="button" class="btn active" @click="$btnOnRouter('/overview_3')">
                    Gear Box
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/overview_4')">
                    Generator
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/overview_5')">Yaw</button>
            </div>
            <div class="modelling-wrap" v-if="info" style="height: 1000px">
                <!-- <div class="modelling-area" ref="container"></div> -->
                <div class="option-box fix">
                    <div class="box-wrap">
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">
                                    Main Bearing
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Main Bearing').b"
                                        @click="$btnOnRouter('diagnosis_3')"
                                    ></button>
                                </div>

                                <div class="line">
                                    <label class="label">Max. bearing Temp.</label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.TM_TMP_SHF_BRG_MAX.value).toLocaleString() }}
                                        °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.TM_TMP_SHF_BRG_MAX.value"
                                        :min="info.TM_TMP_SHF_BRG_MAX.min"
                                        :max="info.TM_TMP_SHF_BRG_MAX.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">
                                    Gearbox
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Gearbox').b"
                                        @click="$btnOnRouter('diagnosis_3')"
                                    ></button>
                                </div>
                                <div class="line">
                                    <label class="label">Vibration</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Acceleration</label>
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;1st Stage Planetary Gear Bearing
                                        (1st)-Horizontal
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_ACC_1SPGB_HORZ.value).toLocaleString() }}
                                        m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_ACC_1SPGB_HORZ.value"
                                        :min="info.VIB_ACC_1SPGB_HORZ.min"
                                        :max="info.VIB_ACC_1SPGB_HORZ.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;2nd Stage Planetary Gear Bearing
                                        (2nd)-Horizontal
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_ACC_2SPGB_HORZ.value).toLocaleString() }}
                                        m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_ACC_2SPGB_HORZ.value"
                                        :min="info.VIB_ACC_2SPGB_HORZ.min"
                                        :max="info.VIB_ACC_2SPGB_HORZ.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;Low Speed Axis (3rd)-Vertical
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_ACC_LSA_VERT.value).toLocaleString() }}
                                        m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_ACC_LSA_VERT.value"
                                        :min="info.VIB_ACC_LSA_VERT.min"
                                        :max="info.VIB_ACC_LSA_VERT.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;High Speed Axis (Out)-Horizontal
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_ACC_HSA_HORZ.value).toLocaleString() }}
                                        m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_ACC_HSA_HORZ.value"
                                        :min="info.VIB_ACC_HSA_HORZ.min"
                                        :max="info.VIB_ACC_HSA_HORZ.max"
                                        :step="0.1"
                                    />
                                </div>

                                <div class="line">
                                    <label class="label">· Velocity</label>
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;1st Stage Planetary Gear Bearing
                                        (1st)-Horizontal
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_VEL_1SPGB_HORZ.value).toLocaleString() }}
                                        mm/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_VEL_1SPGB_HORZ.value"
                                        :min="info.VIB_VEL_1SPGB_HORZ.min"
                                        :max="info.VIB_VEL_1SPGB_HORZ.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;2nd Stage Planetary Gear Bearing
                                        (2nd)-Horizontal
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_VEL_2SPGB_HORZ.value).toLocaleString() }}
                                        mm/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_VEL_2SPGB_HORZ.value"
                                        :min="info.VIB_VEL_2SPGB_HORZ.min"
                                        :max="info.VIB_VEL_2SPGB_HORZ.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;Low Speed Axis (3rd)-Vertical
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_VEL_LSA_VERT.value).toLocaleString() }}
                                        mm/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_VEL_LSA_VERT.value"
                                        :min="info.VIB_VEL_LSA_VERT.min"
                                        :max="info.VIB_VEL_LSA_VERT.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">
                                        &nbsp;&nbsp;High Speed Axis (Out)-Horizontal
                                    </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_VEL_HSA_HORZ.value).toLocaleString() }}
                                        mm/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_VEL_HSA_HORZ.value"
                                        :min="info.VIB_VEL_HSA_HORZ.min"
                                        :max="info.VIB_VEL_HSA_HORZ.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="option-box type-right fix">
                    <div class="box-wrap">
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Fan</div>
                                <div class="line">
                                    <label class="label">Low Speed</label>
                                    <span class="txt">
                                        {{ info.GBX_FAN_LO_SPD_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.GBX_FAN_LO_SPD_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">High Speed</label>
                                    <span class="txt">
                                        {{ info.GBX_FAN_HI_SPD_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.GBX_FAN_HI_SPD_ST"
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
                                <div class="box-tit">Rotor</div>
                                <div class="line">
                                    <label class="label">Lock</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Set</label>
                                    <span class="txt">
                                        {{ info.ROT_LOCK_SET_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.ROT_LOCK_SET_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">· Free</label>
                                    <span class="txt">
                                        {{ info.ROT_LOCK_FREE_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.ROT_LOCK_FREE_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label"> Rotor Speed </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.ROT_SPD.value).toLocaleString() }} m/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.ROT_SPD.value"
                                        :min="info.ROT_SPD.min"
                                        :max="info.ROT_SPD.max"
                                        :step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Oil Pump</div>
                                <div class="line">
                                    <label class="label">Low Speed</label>
                                    <span class="txt">
                                        {{ info.GBX_OIL_PMP_LO_SPD_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.GBX_OIL_PMP_LO_SPD_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">High Speed</label>
                                    <span class="txt">
                                        {{ info.GBX_OIL_PMP_HI_SPD_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.GBX_OIL_PMP_HI_SPD_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label"> Pressure </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GBX_OIL_PRES.value).toLocaleString() }} Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GBX_OIL_PRES.value"
                                        :min="info.GBX_OIL_PRES.min"
                                        :max="info.GBX_OIL_PRES.max"
                                        :step="0.1"
                                    />
                                </div>

                                <div class="hr"></div>
                                <div class="line">
                                    <label class="label"> Oil inlet Pressure </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GBX_OIL_IN_PRES.value).toLocaleString() }}
                                        Pa
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GBX_OIL_IN_PRES.value"
                                        :min="info.GBX_OIL_IN_PRES.min"
                                        :max="info.GBX_OIL_IN_PRES.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label"> Oil inlet Temp </label>
                                    <span class="txt txt-c--pink">
                                        {{ info.TM_TMP_GBX_OIL.value }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.TM_TMP_GBX_OIL.value"
                                        :min="info.TM_TMP_GBX_OIL.min"
                                        :max="info.TM_TMP_GBX_OIL.max"
                                        :step="0.1"
                                    />
                                </div>

                                <div class="hr"></div>
                                <div class="line">
                                    <label class="label"> Oil tank Temp </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GBX_OIL_TNK_TMP.value).toLocaleString() }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GBX_OIL_TNK_TMP.value"
                                        :min="info.GBX_OIL_TNK_TMP.min"
                                        :max="info.GBX_OIL_TNK_TMP.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label"> Oil heater Temp </label>
                                    <span class="txt txt-c--pink">
                                        {{ info.GBX_OIL_HT_TMP.value }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GBX_OIL_HT_TMP.value"
                                        :min="info.GBX_OIL_HT_TMP.min"
                                        :max="info.GBX_OIL_HT_TMP.max"
                                        :step="0.1"
                                    />
                                </div>

                                <div class="hr"></div>
                                <div class="line">
                                    <label class="label">Oil level</label>
                                    <span class="txt">
                                        {{ info.GBX_OIL_LEV_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.GBX_OIL_LEV_ST"
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
                :path="'gearbox.glb'"
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
                        <div class="box-tit type2">Main Bearing</div>
                        <div class="line">
                            <label class="label"> Max. bearing Temp. </label>
                            <span class="txt"
                                >{{
                                    Number(info.TM_TMP_SHF_BRG_MAX.value).toLocaleString()
                                }}
                                °C</span
                            >
                            <Slider
                                v-model="info.TM_TMP_SHF_BRG_MAX.value"
                                :min="info.TM_TMP_SHF_BRG_MAX.min"
                                :max="info.TM_TMP_SHF_BRG_MAX.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">
                            Health Monitoring
                            <button
                                type="button"
                                class="btn btn-sm btn-graph"
                                :class="$getAlarmItem('Main Bearing').b"
                                @click="$btnOnRouter('diagnosis_3')"
                            >
                                진단 상세
                            </button>
                        </div>
                        <div class="line">
                            <label class="label">Vibration</label>
                        </div>
                        <div class="line">
                            <label class="label">· Acceleration</label>
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Axial </label>
                            <span class="txt"
                                >{{ Number(info.VIB_ACC_AX.value).toLocaleString() }} m/s²</span
                            >
                            <Slider
                                v-model="info.VIB_ACC_AX.value"
                                :min="info.VIB_ACC_AX.min"
                                :max="info.VIB_ACC_AX.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Horizontal </label>
                            <span class="txt"
                                >{{ Number(info.VIB_ACC_HORZ.value).toLocaleString() }} m/s²</span
                            >
                            <Slider
                                v-model="info.VIB_ACC_HORZ.value"
                                :min="info.VIB_ACC_HORZ.min"
                                :max="info.VIB_ACC_HORZ.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="line">
                            <label class="label">· Velocity</label>
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Axial </label>
                            <span class="txt">
                                {{ Number(info.VIB_VEL_AX.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VIB_VEL_AX.value"
                                :min="info.VIB_VEL_AX.min"
                                :max="info.VIB_VEL_AX.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Horizontal </label>
                            <span class="txt"
                                >{{ Number(info.VIB_VEL_HORZ.value).toLocaleString() }} mm/s</span
                            >
                            <Slider
                                v-model="info.VIB_VEL_HORZ.value"
                                :min="info.VIB_VEL_HORZ.min"
                                :max="info.VIB_VEL_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-wrap type-option">
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Gearbox</div>
                        <div class="box-sub type2">
                            Health Monitoring
                            <button
                                type="button"
                                class="btn btn-sm btn-graph"
                                :class="$getAlarmItem('Gearbox').b"
                                @click="$btnOnRouter('diagnosis_3')"
                            >
                                진단 상세
                            </button>
                        </div>
                        <div class="line">
                            <label class="label">Vibration</label>
                        </div>
                        <div class="line">
                            <label class="label">· Acceleration</label>
                        </div>
                        <div class="line">
                            <label class="label">
                                &nbsp;&nbsp;1st Stage Planetary Gear Bearing (1st)-Horizontal
                            </label>
                            <span class="txt"
                                >{{
                                    Number(info.VIB_ACC_1SPGB_HORZ.value).toLocaleString()
                                }}
                                m/s²</span
                            >
                            <Slider
                                v-model="info.VIB_ACC_1SPGB_HORZ.value"
                                :min="info.VIB_ACC_1SPGB_HORZ.min"
                                :max="info.VIB_ACC_1SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="line">
                            <label class="label">
                                &nbsp;&nbsp;2nd Stage Planetary Gear Bearing (2nd)-Horizontal
                            </label>
                            <span class="txt"
                                >{{
                                    Number(info.VIB_ACC_2SPGB_HORZ.value).toLocaleString()
                                }}
                                m/s²</span
                            >
                            <Slider
                                v-model="info.VIB_ACC_2SPGB_HORZ.value"
                                :min="info.VIB_ACC_2SPGB_HORZ.min"
                                :max="info.VIB_ACC_2SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">&nbsp;&nbsp;Low Speed Axis (3rd)-Vertical</label>
                            <span class="txt"
                                >{{
                                    Number(info.VIB_ACC_LSA_VERT.value).toLocaleString()
                                }}
                                m/s²</span
                            >
                            <Slider
                                v-model="info.VIB_ACC_LSA_VERT.value"
                                :min="info.VIB_ACC_LSA_VERT.min"
                                :max="info.VIB_ACC_LSA_VERT.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"
                                >&nbsp;&nbsp;High Speed Axis (Out)-Horizontal</label
                            >
                            <span class="txt"
                                >{{
                                    Number(info.VIB_ACC_HSA_HORZ.value).toLocaleString()
                                }}
                                m/s²</span
                            >
                            <Slider
                                v-model="info.VIB_ACC_HSA_HORZ.value"
                                :min="info.VIB_ACC_HSA_HORZ.min"
                                :max="info.VIB_ACC_HSA_HORZ.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="line">
                            <label class="label">· Velocity</label>
                        </div>
                        <div class="line">
                            <label class="label"
                                >&nbsp;&nbsp;1st Stage Planetary Gear Bearing
                                (1st)-Horizontal</label
                            >
                            <span class="txt"
                                >{{
                                    Number(info.VIB_VEL_1SPGB_HORZ.value).toLocaleString()
                                }}
                                mm/s</span
                            >
                            <Slider
                                v-model="info.VIB_VEL_1SPGB_HORZ.value"
                                :min="info.VIB_VEL_1SPGB_HORZ.min"
                                :max="info.VIB_VEL_1SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"
                                >&nbsp;&nbsp;2nd Stage Planetary Gear Bearing
                                (2nd)-Horizontal</label
                            >
                            <span class="txt"
                                >{{
                                    Number(info.VIB_VEL_2SPGB_HORZ.value).toLocaleString()
                                }}
                                mm/s</span
                            >
                            <Slider
                                v-model="info.VIB_VEL_2SPGB_HORZ.value"
                                :min="info.VIB_VEL_2SPGB_HORZ.min"
                                :max="info.VIB_VEL_2SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">&nbsp;&nbsp;Low Speed Axis (3rd)-Vertical</label>
                            <span class="txt"
                                >{{
                                    Number(info.VIB_VEL_LSA_VERT.value).toLocaleString()
                                }}
                                mm/s</span
                            >
                            <Slider
                                v-model="info.VIB_VEL_LSA_VERT.value"
                                :min="info.VIB_VEL_LSA_VERT.min"
                                :max="info.VIB_VEL_LSA_VERT.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"
                                >&nbsp;&nbsp;High Speed Axis (Out)-Horizontal</label
                            >
                            <span class="txt"
                                >{{
                                    Number(info.VIB_VEL_HSA_HORZ.value).toLocaleString()
                                }}
                                mm/s</span
                            >
                            <Slider
                                v-model="info.VIB_VEL_HSA_HORZ.value"
                                :min="info.VIB_VEL_HSA_HORZ.min"
                                :max="info.VIB_VEL_HSA_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-wrap type-option">
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Fan</div>
                        <div class="line">
                            <label class="label"> heating/cooling state </label>
                            <span class="txt">{{ info.GBX_ST }}</span>
                            <span></span>
                        </div>
                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Low Speed</label>
                            <span class="txt">
                                {{ info.GBX_FAN_LO_SPD_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.GBX_FAN_LO_SPD_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">High Speed</label>
                            <span class="txt">
                                {{ info.GBX_FAN_HI_SPD_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.GBX_FAN_HI_SPD_ST"
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
                        <div class="box-tit type2">Rotor</div>
                        <div class="line">
                            <label class="label">Lock</label>
                        </div>
                        <div class="line">
                            <label class="label">· Set</label>
                            <span class="txt">
                                {{ info.ROT_LOCK_SET_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.ROT_LOCK_SET_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">· Free</label>
                            <span class="txt">
                                {{ info.ROT_LOCK_FREE_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.ROT_LOCK_FREE_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label"> Rotor Speed </label>
                            <span class="txt">
                                {{ Number(info.ROT_SPD.value).toLocaleString() }} m/s
                            </span>
                            <Slider
                                class="red"
                                v-model="info.ROT_SPD.value"
                                :min="info.ROT_SPD.min"
                                :max="info.ROT_SPD.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>

                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Oil Pump</div>

                        <div class="line">
                            <label class="label">Low Speed</label>
                            <span class="txt">
                                {{ info.GBX_OIL_PMP_LO_SPD_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.GBX_OIL_PMP_LO_SPD_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">High Speed</label>
                            <span class="txt">
                                {{ info.GBX_OIL_PMP_HI_SPD_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.GBX_OIL_PMP_HI_SPD_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label"> Pressure </label>
                            <span class="txt">
                                {{ Number(info.GBX_OIL_PRES.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GBX_OIL_PRES.value"
                                :min="info.GBX_OIL_PRES.min"
                                :max="info.GBX_OIL_PRES.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label"> Oil inlet Pressure </label>
                            <span class="txt">
                                {{ Number(info.GBX_OIL_IN_PRES.value).toLocaleString() }} Pa
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GBX_OIL_IN_PRES.value"
                                :min="info.GBX_OIL_IN_PRES.min"
                                :max="info.GBX_OIL_IN_PRES.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> Oil inlet Temp </label>
                            <span class="txt">
                                {{ Number(info.TM_TMP_GBX_OIL.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.TM_TMP_GBX_OIL.value"
                                :min="info.TM_TMP_GBX_OIL.min"
                                :max="info.TM_TMP_GBX_OIL.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label"> Oil tank Temp </label>
                            <span class="txt">
                                {{ Number(info.GBX_OIL_TNK_TMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GBX_OIL_TNK_TMP.value"
                                :min="info.GBX_OIL_TNK_TMP.min"
                                :max="info.GBX_OIL_TNK_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> Oil heater Temp </label>
                            <span class="txt">
                                {{ Number(info.GBX_OIL_HT_TMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GBX_OIL_HT_TMP.value"
                                :min="info.GBX_OIL_HT_TMP.min"
                                :max="info.GBX_OIL_HT_TMP.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">Oil level</label>
                            <span class="txt">
                                {{ info.GBX_OIL_LEV_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.GBX_OIL_LEV_ST"
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
        <Chart></Chart>
    </div>
</template>

<script>
import Glb from '../components/Glb.vue'
import Slider from '@vueform/slider'
import Chart from '../components/Chart.vue'

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

            scale: 1.2,
            cPo: {
                x: 0,
                y: 0,
                z: 115
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
            this.$apiGET('/admin/over/gearbox').then((data) => {
                this.info = data
            })
        },
        loadingSet(st) {
            this.loading = st
        }
    }
}
</script>
