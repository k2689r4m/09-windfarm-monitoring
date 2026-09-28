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
                <button type="button" class="btn active" @click="$btnOnRouter('/overview_4')">
                    Generator
                </button>
                <button type="button" class="btn" @click="$btnOnRouter('/overview_5')">Yaw</button>
            </div>
            <div class="modelling-wrap" v-if="info">
                <!-- <div class="modelling-area" ref="container"></div> -->
                <div class="option-box fix">
                    <div class="box-wrap">
                        <div class="box">
                            <div class="p-30">
                                <div class="box-tit">Brake</div>
                                <div class="line">
                                    <label class="label">Hydraulic pump</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Hydraulic oil pump</label>
                                    <span class="txt">
                                        {{ info.GN_BRK_HY_PRES_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.GN_BRK_HY_PRES_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">· Hydraulic pressure</label>
                                    <span class="txt">
                                        {{ info.GN_BRK_HY_PMP_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.GN_BRK_HY_PMP_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">· Hydraulic oil level</label>
                                    <span class="txt">
                                        {{ info.GBX_HY_OIL_LEV_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.GBX_HY_OIL_LEV_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">· Hydraulic oil temp</label>
                                    <span class="txt">
                                        {{ info.GBX_HY_OIL_TMP_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.GBX_HY_OIL_TMP_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="hr"></div>
                                <div class="line">
                                    <label class="label">State</label>
                                </div>
                                <div class="line">
                                    <label class="label">· Breake open</label>
                                    <span class="txt">
                                        {{ info.BRK_OPEN_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.BRK_OPEN_ST"
                                            :true-value="1"
                                            :false-value="0"
                                        />
                                        <span class="switch"></span>
                                    </label>
                                </div>
                                <div class="line">
                                    <label class="label">· Pressure</label>
                                    <span class="txt">
                                        {{ info.BRK_PRES_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.BRK_PRES_ST"
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
                                    Generator
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-icon btn-graph"
                                        :class="$getAlarmItem('Generator').b"
                                        @click="$btnOnRouter('diagnosis_4')"
                                    ></button>
                                </div>
                                <div class="line">
                                    <label class="label"> Water inlet Temp. </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_IN_LET.value"
                                        :min="info.GN_TMP_IN_LET.min"
                                        :max="info.GN_TMP_IN_LET.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="hr"></div>

                                <div class="line">
                                    <label class="label"> Bearing non drive Temp. </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_BRG_NDET_TMP.value).toLocaleString() }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_BRG_NDET_TMP.value"
                                        :min="info.GN_BRG_NDET_TMP.min"
                                        :max="info.GN_BRG_NDET_TMP.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label"> Generator Speed </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.WGEN_SPD.value).toLocaleString() }} m/s
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.WGEN_SPD.value"
                                        :min="info.WGEN_SPD.min"
                                        :max="info.WGEN_SPD.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="hr"></div>

                                <div class="line">
                                    <label class="label"> Slipring space Temp. </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_SLI_TMP.value).toLocaleString() }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_SLI_TMP.value"
                                        :min="info.GN_SLI_TMP.min"
                                        :max="info.GN_SLI_TMP.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="hr"></div>

                                <div class="line">
                                    <label class="label"> Active power </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.WGEN_W.value).toLocaleString() }} W
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.WGEN_W.value"
                                        :min="info.WGEN_W.min"
                                        :max="info.WGEN_W.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label"> Winding [U] Temp </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_U.value).toLocaleString() }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_U.value"
                                        :min="info.GN_TMP_U.min"
                                        :max="info.GN_TMP_U.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label"> Winding [V] Temp </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_V.value).toLocaleString() }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_V.value"
                                        :min="info.GN_TMP_V.min"
                                        :max="info.GN_TMP_V.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label"> Winding [W] Temp </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_W.value).toLocaleString() }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_W.value"
                                        :min="info.GN_TMP_W.min"
                                        :max="info.GN_TMP_W.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="hr"></div>

                                <div class="line">
                                    <label class="label"> Bearing drive Temp </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_BRG_DET_TMP.value).toLocaleString() }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_BRG_DET_TMP.value"
                                        :min="info.GN_BRG_DET_TMP.min"
                                        :max="info.GN_BRG_DET_TMP.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="hr"></div>

                                <div class="line">
                                    <label class="label"> Winding Temp. Max </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_TMP_STA_MAX.value).toLocaleString() }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_TMP_STA_MAX.value"
                                        :min="info.GN_TMP_STA_MAX.min"
                                        :max="info.GN_TMP_STA_MAX.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label"> Bearing Temp. Max. </label>
                                    <span class="txt txt-c--pink">
                                        {{ Number(info.GN_BRG_TMP_MAX.value).toLocaleString() }} °C
                                    </span>
                                    <Slider
                                        class="red"
                                        v-model="info.GN_BRG_TMP_MAX.value"
                                        :min="info.GN_BRG_TMP_MAX.min"
                                        :max="info.GN_BRG_TMP_MAX.max"
                                        :step="0.1"
                                    />
                                </div>
                                <div class="line">
                                    <label class="label">Cooling pump</label>
                                    <span class="txt">
                                        {{ info.GN_CL_PMP_ST == 1 ? 'ON' : 'OFF' }}
                                    </span>
                                    <label class="input-switch">
                                        <input
                                            type="checkbox"
                                            v-model="info.GN_CL_PMP_ST"
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
                        <div class="box-tit type2">Brake</div>
                        <div class="line">
                            <label class="label">Hydraulic pump</label>
                        </div>
                        <div class="line">
                            <label class="label">· Hydraulic oil pump</label>
                            <span class="txt">
                                {{ info.GN_BRK_HY_PRES_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.GN_BRK_HY_PRES_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">· Hydraulic pressure</label>
                            <span class="txt">
                                {{ info.GN_BRK_HY_PMP_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.GN_BRK_HY_PMP_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">· Hydraulic oil level</label>
                            <span class="txt">
                                {{ info.GBX_HY_OIL_LEV_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.GBX_HY_OIL_LEV_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">· Hydraulic oil temp</label>
                            <span class="txt">
                                {{ info.GBX_HY_OIL_TMP_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.GBX_HY_OIL_TMP_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="hr"></div>
                        <div class="line">
                            <label class="label">State</label>
                        </div>
                        <div class="line">
                            <label class="label">· Breake open</label>
                            <span class="txt">
                                {{ info.BRK_OPEN_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.BRK_OPEN_ST"
                                    :true-value="1"
                                    :false-value="0"
                                />
                                <span class="switch"></span>
                            </label>
                        </div>
                        <div class="line">
                            <label class="label">· Pressure</label>
                            <span class="txt">
                                {{ info.BRK_PRES_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.BRK_PRES_ST"
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
                        <div class="box-tit type2">Generator</div>
                        <div class="line">
                            <label class="label"> Water inlet Temp. </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.GN_TMP_IN_LET.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GN_TMP_IN_LET.value"
                                :min="info.GN_TMP_IN_LET.min"
                                :max="info.GN_TMP_IN_LET.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label"> Bearing non drive Temp. </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.GN_BRG_NDET_TMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GN_BRG_NDET_TMP.value"
                                :min="info.GN_BRG_NDET_TMP.min"
                                :max="info.GN_BRG_NDET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> Generator Speed </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.WGEN_SPD.value).toLocaleString() }} m/s
                            </span>
                            <Slider
                                class="red"
                                v-model="info.WGEN_SPD.value"
                                :min="info.WGEN_SPD.min"
                                :max="info.WGEN_SPD.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label"> Slipring space Temp. </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.GN_SLI_TMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GN_SLI_TMP.value"
                                :min="info.GN_SLI_TMP.min"
                                :max="info.GN_SLI_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label"> Active power </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.WGEN_W.value).toLocaleString() }} W
                            </span>
                            <Slider
                                class="red"
                                v-model="info.WGEN_W.value"
                                :min="info.WGEN_W.min"
                                :max="info.WGEN_W.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> Winding [U] Temp </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.GN_TMP_U.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GN_TMP_U.value"
                                :min="info.GN_TMP_U.min"
                                :max="info.GN_TMP_U.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> Winding [V] Temp </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.GN_TMP_V.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GN_TMP_V.value"
                                :min="info.GN_TMP_V.min"
                                :max="info.GN_TMP_V.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> Winding [W] Temp </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.GN_TMP_W.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GN_TMP_W.value"
                                :min="info.GN_TMP_W.min"
                                :max="info.GN_TMP_W.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label"> Bearing drive Temp </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.GN_BRG_DET_TMP.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GN_BRG_DET_TMP.value"
                                :min="info.GN_BRG_DET_TMP.min"
                                :max="info.GN_BRG_DET_TMP.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="hr"></div>

                        <div class="line">
                            <label class="label"> Winding Temp. Max </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.GN_TMP_STA_MAX.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GN_TMP_STA_MAX.value"
                                :min="info.GN_TMP_STA_MAX.min"
                                :max="info.GN_TMP_STA_MAX.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label"> Bearing Temp. Max. </label>
                            <span class="txt txt-c--pink">
                                {{ Number(info.GN_BRG_TMP_MAX.value).toLocaleString() }} °C
                            </span>
                            <Slider
                                class="red"
                                v-model="info.GN_BRG_TMP_MAX.value"
                                :min="info.GN_BRG_TMP_MAX.min"
                                :max="info.GN_BRG_TMP_MAX.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">Cooling pump</label>
                            <span class="txt">
                                {{ info.GN_CL_PMP_ST == 1 ? 'ON' : 'OFF' }}
                            </span>
                            <label class="input-switch">
                                <input
                                    type="checkbox"
                                    v-model="info.GN_CL_PMP_ST"
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
                                :class="$getAlarmItem('Generator').b"
                                @click="$btnOnRouter('diagnosis_4')"
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
                            <label class="label">&nbsp;&nbsp;Drive End (DE)-Horizonal</label>
                            <span class="txt"
                                >{{
                                    Number(info.VIB_ACC_DE_HORZ.value).toLocaleString()
                                }}
                                m/s²</span
                            >
                            <Slider
                                v-model="info.VIB_ACC_DE_HORZ.value"
                                :min="info.VIB_ACC_DE_HORZ.min"
                                :max="info.VIB_ACC_DE_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">&nbsp;&nbsp;Non Drive End (NDE)-Horizontal</label>
                            <span class="txt"
                                >{{
                                    Number(info.VIB_ACC_NDE_HORZ.value).toLocaleString()
                                }}
                                m/s²</span
                            >
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
                            <label class="label">&nbsp;&nbsp;Drive End (DE)-Horizonal</label>
                            <span class="txt"
                                >{{
                                    Number(info.VIB_VEL_DE_HORZ.value).toLocaleString()
                                }}
                                mm/s</span
                            >
                            <Slider
                                v-model="info.VIB_VEL_DE_HORZ.value"
                                :min="info.VIB_VEL_DE_HORZ.min"
                                :max="info.VIB_VEL_DE_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                        <div class="line">
                            <label class="label">&nbsp;&nbsp;Non Drive End (NDE)-Horizontal</label>
                            <span class="txt"
                                >{{
                                    Number(info.VIB_VEL_NDE_HORZ.value).toLocaleString()
                                }}
                                mm/s</span
                            >
                            <Slider
                                v-model="info.VIB_VEL_NDE_HORZ.value"
                                :min="info.VIB_VEL_NDE_HORZ.min"
                                :max="info.VIB_VEL_NDE_HORZ.max"
                                :step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-wrap type-option"></div>
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
