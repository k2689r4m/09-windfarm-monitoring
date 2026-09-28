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
                <button type="button" class="btn active" @click="$btnOnRouter('/diagnosis_3')">
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
                                <div class="box-tit">Gearbox</div>
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
                                <div class="box-tit">Main Bearing</div>
                                <div class="line">
                                    <label class="label">Vibration</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Acceleration</label>
                                </div>
                                <div class="line">
                                    <label class="label"> &nbsp;&nbsp;Axial </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_ACC_AX.value).toLocaleString() }} m/s²
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_ACC_AX.value"
                                        :min="info.VIB_ACC_AX.min"
                                        :max="info.VIB_ACC_AX.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label"> &nbsp;&nbsp;Horizontal </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_ACC_HORZ.value).toLocaleString() }} m/s²
                                    </span>
                                    <Slider
                                        class="red"
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
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_VEL_AX.value).toLocaleString() }} mm/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_VEL_AX.value"
                                        :min="info.VIB_VEL_AX.min"
                                        :max="info.VIB_VEL_AX.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label"> &nbsp;&nbsp;Horizontal </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.VIB_VEL_HORZ.value).toLocaleString() }} mm/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.VIB_VEL_HORZ.value"
                                        :min="info.VIB_VEL_HORZ.min"
                                        :max="info.VIB_VEL_HORZ.max"
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
                        <div class="box-tit type2">Gearbox</div>
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
                            <span class="txt">
                                {{ Number(info.VIB_ACC_1SPGB_HORZ.value).toLocaleString() }} m/s²
                            </span>
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
                            <span class="txt">
                                {{ Number(info.VIB_ACC_2SPGB_HORZ.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.VIB_ACC_2SPGB_HORZ.value"
                                :min="info.VIB_ACC_2SPGB_HORZ.min"
                                :max="info.VIB_ACC_2SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Low Speed Axis (3rd)-Vertical </label>
                            <span class="txt">
                                {{ Number(info.VIB_ACC_2SPGB_HORZ.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.VIB_ACC_2SPGB_HORZ.value"
                                :min="info.VIB_ACC_2SPGB_HORZ.min"
                                :max="info.VIB_ACC_2SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">
                                &nbsp;&nbsp;High Speed Axis (Out)-Horizontal
                            </label>
                            <span class="txt">
                                {{ Number(info.VIB_ACC_HSA_HORZ.value).toLocaleString() }} m/s²
                            </span>
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
                            <label class="label">
                                &nbsp;&nbsp;1st Stage Planetary Gear Bearing (1st)-Horizontal
                            </label>
                            <span class="txt">
                                {{ Number(info.VIB_VEL_1SPGB_HORZ.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VIB_VEL_1SPGB_HORZ.value"
                                :min="info.VIB_VEL_1SPGB_HORZ.min"
                                :max="info.VIB_VEL_1SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">
                                &nbsp;&nbsp;2nd Stage Planetary Gear Bearing (2nd)-Horizontal
                            </label>
                            <span class="txt">
                                {{ Number(info.VIB_VEL_2SPGB_HORZ.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VIB_VEL_2SPGB_HORZ.value"
                                :min="info.VIB_VEL_2SPGB_HORZ.min"
                                :max="info.VIB_VEL_2SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Low Speed Axis (3rd)-Vertical </label>
                            <span class="txt">
                                {{ Number(info.VIB_VEL_LSA_VERT.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
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
                            <span class="txt">
                                {{ Number(info.VIB_VEL_HSA_HORZ.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VIB_VEL_HSA_HORZ.value"
                                :min="info.VIB_VEL_HSA_HORZ.min"
                                :max="info.VIB_VEL_HSA_HORZ.max"
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
                            <label class="label">
                                &nbsp;&nbsp;1st Stage Planetary Gear Bearing (1st)-Horizontal
                            </label>
                            <span class="txt">
                                {{ Number(info.ACC_RMS_1SPGB_HORZ.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.ACC_RMS_1SPGB_HORZ.value"
                                :min="info.ACC_RMS_1SPGB_HORZ.min"
                                :max="info.ACC_RMS_1SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">
                                &nbsp;&nbsp;2nd Stage Planetary Gear Bearing (2nd)-Horizontal
                            </label>
                            <span class="txt">
                                {{ Number(info.ACC_RMS_2SPGB_HORZ.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.ACC_RMS_2SPGB_HORZ.value"
                                :min="info.ACC_RMS_2SPGB_HORZ.min"
                                :max="info.ACC_RMS_2SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Low Speed Axis (3rd)-Vertical </label>
                            <span class="txt">
                                {{ Number(info.ACC_RMS_LSA_VERT.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.ACC_RMS_LSA_VERT.value"
                                :min="info.ACC_RMS_LSA_VERT.min"
                                :max="info.ACC_RMS_LSA_VERT.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">
                                &nbsp;&nbsp;High Speed Axis (Out)-Horizontal
                            </label>
                            <span class="txt">
                                {{ Number(info.ACC_RMS_HSA_HORZ.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.ACC_RMS_HSA_HORZ.value"
                                :min="info.ACC_RMS_HSA_HORZ.min"
                                :max="info.ACC_RMS_HSA_HORZ.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="line">
                            <label class="label">· Velocity</label>
                        </div>
                        <div class="line">
                            <label class="label">
                                &nbsp;&nbsp;1st Stage Planetary Gear Bearing (1st)-Horizontal
                            </label>
                            <span class="txt">
                                {{ Number(info.VEL_RMS_1SPGB_HORZ.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VEL_RMS_1SPGB_HORZ.value"
                                :min="info.VEL_RMS_1SPGB_HORZ.min"
                                :max="info.VEL_RMS_1SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">
                                &nbsp;&nbsp;2nd Stage Planetary Gear Bearing (2nd)-Horizontal
                            </label>
                            <span class="txt">
                                {{ Number(info.VEL_RMS_2SPGB_HORZ.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VEL_RMS_2SPGB_HORZ.value"
                                :min="info.VEL_RMS_2SPGB_HORZ.min"
                                :max="info.VEL_RMS_2SPGB_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> &nbsp;&nbsp;Low Speed Axis (3rd)-Vertical </label>
                            <span class="txt">
                                {{ Number(info.VEL_RMS_LSA_VERT.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VEL_RMS_LSA_VERT.value"
                                :min="info.VEL_RMS_LSA_VERT.min"
                                :max="info.VEL_RMS_LSA_VERT.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">
                                &nbsp;&nbsp;High Speed Axis (Out)-Horizontal
                            </label>
                            <span class="txt">
                                {{ Number(info.VEL_RMS_HSA_HORZ.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VEL_RMS_HSA_HORZ.value"
                                :min="info.VEL_RMS_HSA_HORZ.min"
                                :max="info.VEL_RMS_HSA_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label">Temperate</label>
                        </div>
                        <div class="line">
                            <label class="label">· Measured Value</label>
                            <span class="txt">
                                {{ Number(info.GB_MEAS_TEMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GB_MEAS_TEMP.value"
                                :min="info.GB_MEAS_TEMP.min"
                                :max="info.GB_MEAS_TEMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Prediction Value</label>
                            <span class="txt">
                                {{ Number(info.GB_PRED_TEMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GB_PRED_TEMP.value"
                                :min="info.GB_PRED_TEMP.min"
                                :max="info.GB_PRED_TEMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Deviation</label>
                            <span class="txt">
                                {{ Number(info.GB_TEMP_DEV.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.GB_TEMP_DEV.value"
                                :min="info.GB_TEMP_DEV.min"
                                :max="info.GB_TEMP_DEV.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">수명 예측</div>
                        <div class="line">
                            <label class="label">Destion Age</label>
                            <span class="txt">
                                {{ Number(info.GB_DESIGN_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.GB_DESIGN_AGE.value"
                                :min="info.GB_DESIGN_AGE.min"
                                :max="info.GB_DESIGN_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Age</label>
                            <span class="txt">
                                {{ Number(info.GB_EST_AGE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.GB_EST_AGE.value"
                                :min="info.GB_EST_AGE.min"
                                :max="info.GB_EST_AGE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Health Index</label>
                            <span class="txt">
                                {{ Number(info.GB_HEALTH_IDX.value).toLocaleString() }} %
                            </span>
                            <Slider
                                v-model="info.GB_HEALTH_IDX.value"
                                :min="info.GB_HEALTH_IDX.min"
                                :max="info.GB_HEALTH_IDX.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="box-wrap type-option">
                <div class="box">
                    <div class="p-30">
                        <div class="box-tit type2">Main Bearing</div>
                        <div class="line">
                            <label class="label">Vibration</label>
                        </div>
                        <div class="line">
                            <label class="label">· Acceleration</label>
                        </div>
                        <div class="line">
                            <label class="label">&nbsp;&nbsp;Axial</label>
                            <span class="txt">
                                {{ Number(info.VIB_ACC_AX.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.VIB_ACC_AX.value"
                                :min="info.VIB_ACC_AX.min"
                                :max="info.VIB_ACC_AX.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">&nbsp;&nbsp;Horizontal</label>
                            <span class="txt">
                                {{ Number(info.VIB_ACC_HORZ.value).toLocaleString() }} m/s²
                            </span>
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
                            <label class="label">&nbsp;&nbsp;Axial</label>
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
                            <label class="label">&nbsp;&nbsp;Horizontal</label>
                            <span class="txt">
                                {{ Number(info.VIB_VEL_HORZ.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VIB_VEL_HORZ.value"
                                :min="info.VIB_VEL_HORZ.min"
                                :max="info.VIB_VEL_HORZ.max"
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
                            <label class="label">&nbsp;&nbsp;Axial</label>
                            <span class="txt">
                                {{ Number(info.ACC_RMS_AX.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.ACC_RMS_AX.value"
                                :min="info.ACC_RMS_AX.min"
                                :max="info.ACC_RMS_AX.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">&nbsp;&nbsp;Horizontal</label>
                            <span class="txt">
                                {{ Number(info.ACC_RMS_HORZ.value).toLocaleString() }} m/s²
                            </span>
                            <Slider
                                v-model="info.ACC_RMS_HORZ.value"
                                :min="info.ACC_RMS_HORZ.min"
                                :max="info.ACC_RMS_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Velocity</label>
                        </div>
                        <div class="line">
                            <label class="label">&nbsp;&nbsp;Axial</label>
                            <span class="txt">
                                {{ Number(info.VEL_RMS_AX.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VEL_RMS_AX.value"
                                :min="info.VEL_RMS_AX.min"
                                :max="info.VEL_RMS_AX.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">&nbsp;&nbsp;Horizontal</label>
                            <span class="txt">
                                {{ Number(info.VEL_RMS_HORZ.value).toLocaleString() }} mm/s
                            </span>
                            <Slider
                                v-model="info.VEL_RMS_HORZ.value"
                                :min="info.VEL_RMS_HORZ.min"
                                :max="info.VEL_RMS_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label">Temperate</label>
                        </div>
                        <div class="line">
                            <label class="label">· Measured Value</label>
                            <span class="txt">
                                {{ Number(info.MB_MEAS_TEMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.MB_MEAS_TEMP.value"
                                :min="info.MB_MEAS_TEMP.min"
                                :max="info.MB_MEAS_TEMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Prediction Value</label>
                            <span class="txt">
                                {{ Number(info.MB_PRED_TEMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.MB_PRED_TEMP.value"
                                :min="info.MB_PRED_TEMP.min"
                                :max="info.MB_PRED_TEMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">· Deviation</label>
                            <span class="txt">
                                {{ Number(info.MB_TEMP_DEV.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                v-model="info.MB_TEMP_DEV.value"
                                :min="info.MB_TEMP_DEV.min"
                                :max="info.MB_TEMP_DEV.max"
                                :step="0.1"
                            />
                        </div>

                        <div class="box-sub type2">수명 예측</div>
                        <div class="line">
                            <label class="label">Design Age</label>
                            <span class="txt">
                                {{ Number(info.MB_DESIGN_LIFE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.MB_DESIGN_LIFE.value"
                                :min="info.MB_DESIGN_LIFE.min"
                                :max="info.MB_DESIGN_LIFE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Estimated Age</label>
                            <span class="txt">
                                {{ Number(info.MB_EST_LIFE.value).toLocaleString() }} month
                            </span>
                            <Slider
                                v-model="info.MB_EST_LIFE.value"
                                :min="info.MB_EST_LIFE.min"
                                :max="info.MB_EST_LIFE.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Health Indes</label>
                            <span class="txt">
                                {{ Number(info.MB_HEALTH_IDX.value).toLocaleString() }} %
                            </span>
                            <Slider
                                v-model="info.MB_HEALTH_IDX.value"
                                :min="info.MB_HEALTH_IDX.min"
                                :max="info.MB_HEALTH_IDX.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
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
            this.$apiGET('/admin/diag/gearbox').then((data) => {
                this.info = data
            })
        },
        loadingSet(st) {
            this.loading = st
        }
    }
}
</script>
