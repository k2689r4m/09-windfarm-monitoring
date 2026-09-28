<template>
    <div class="section">
        <div class="card-wrap w-1800">
            <div class="card-wrap--p">
                <div class="card-tit">이력확인</div>
                <div class="search-wrap m-b--0" v-if="rerender">
                    <label class="label">컴포넌트 선택</label>
                    <SlimSelect class="input-select" v-model="group">
                        <option value="Blade_Pitch">Blade&Pitch (default)</option>
                        <option value="Nacelle_Tower">Nacelle&Tower</option>
                        <option value="Gear_Box">Gear Box</option>
                        <option value="Generator">Generator</option>
                        <option value="Yaw">Yaw</option>
                    </SlimSelect>

                    <label class="label">세부항목 선택</label>
                    <SlimSelect class="input-select" ref="select" v-model="group2">
                        <option value="all">전체 (default)</option>
                        <option v-for="item in op2" :key="'op2_' + item">{{ item }}</option>
                    </SlimSelect>
                    <label class="label">발생일시</label>

                    <input
                        type="date"
                        class="input-date"
                        placeholder="DD/MM/YY"
                        v-model="searchOption.date_s"
                    />
                    <SlimSelect class="input-select" v-model="searchOption.hh_s">
                        <option value="">HH</option>
                        <option v-for="item in 24" :key="item + 'h_s'" :value="item - 1">
                            {{ item - 1 < 10 ? '0' + item - 1 : item - 1 }}
                        </option>
                    </SlimSelect>
                    <SlimSelect class="input-select" v-model="searchOption.mm_s">
                        <option value="">MM</option>
                        <option v-for="item in 60" :key="item + 'm_s'" :value="item - 1">
                            {{ item - 1 < 10 ? '0' + item - 1 : item - 1 }}
                        </option>
                    </SlimSelect>

                    <span class="unit">~</span>

                    <input type="date" class="input-date" v-model="searchOption.date_e" />
                    <SlimSelect class="input-select" v-model="searchOption.hh_e">
                        <option value="">HH</option>
                        <option v-for="item in 24" :key="item + 'h_e'" :value="item - 1">
                            {{ item - 1 < 10 ? '0' + item - 1 : item - 1 }}
                        </option>
                    </SlimSelect>
                    <SlimSelect class="input-select" v-model="searchOption.mm_e">
                        <option value="">MM</option>
                        <option v-for="item in 60" :key="item + 'm_e'" :value="item - 1">
                            {{ item - 1 < 10 ? '0' + item - 1 : item - 1 }}
                        </option>
                    </SlimSelect>

                    <button
                        type="button"
                        class="btn btn-primary btn-normal btn-search"
                        @click="getItemList()"
                        :disabled="!apiLoad"
                    >
                        이력검색
                    </button>
                    <div class="right">
                        <button
                            type="button"
                            class="btn btn-down btn-normal btn-grey"
                            :disabled="!chartRender"
                            @click="downloadExcel"
                        >
                            Excel 다운로드
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Chart2 :cid="1" :chartData="chartData" v-if="chartRender"></Chart2>

        <div class="loading-wrap" v-if="!apiLoad">
            <span class="loader"></span>
        </div>
    </div>
</template>

<script>
import SlimSelect from '@slim-select/vue'
import Chart2 from '../components/Chart2.vue'
import * as XLSX from 'xlsx'

export default {
    name: 'HistoryPage',
    components: { SlimSelect, Chart2 },
    computed: {},
    data() {
        return {
            rerender: true,
            chartRender: false,
            apiLoad: true,

            group: 'Blade_Pitch',
            group2: 'all',
            op1: {
                Blade_Pitch: ['Blade1', 'Blade2', 'Blade3', 'Pitch System'],
                Nacelle_Tower: ['Tower Top', 'Tower Bottom', 'Nacelle'],
                Gear_Box: ['Gear Box', 'Main Bearing', 'Oil Pump', 'Rotor'],
                Generator: ['Generator'],
                Yaw: ['Yaw']
            },
            op2: ['Blade1', 'Blade2', 'Blade3', 'Pitch System'],

            searchOption: {
                group: 'Blade_Pitch',
                date_s: '',
                date_e: '',
                hh_s: '',
                hh_e: '',
                mm_s: '',
                mm_e: ''
            },

            modalShow: false
        }
    },
    created() {},
    mounted() {
        const nowDate = this.$dayjs()
        this.searchOption.date_s = nowDate.format('YYYY-MM-DD')
        this.searchOption.date_e = nowDate.format('YYYY-MM-DD')
        this.searchOption.hh_s = '0'
        this.searchOption.hh_e = nowDate.format('H')
        this.searchOption.mm_s = '0'
        this.searchOption.mm_e = nowDate.format('m')
    },
    updated() {},
    watch: {
        group() {
            this.rerender = false
            this.$nextTick(() => {
                // console.log('true')
                this.group2 = 'all'
                this.op2 = this.op1[this.group]
                this.rerender = true
            })
        }
    },
    methods: {
        getItemList() {
            let dateS = ''
            let dateE = ''

            if (this.searchOption.date_s || this.searchOption.date_e) {
                if (!this.searchOption.date_s) {
                    this.searchOption.date_s = this.$dayjs(this.searchOption.date_e)
                        .subtract(1, 'month')
                        .format('YYYY-MM-DD')
                } else if (!this.searchOption.date_e) {
                    this.searchOption.date_e = this.$dayjs(this.searchOption.date_s)
                        .add(1, 'month')
                        .format('YYYY-MM-DD')
                }
            } else {
                this.searchOption.date_e = this.$dayjs().format('YYYY-MM-DD')

                this.searchOption.date_s = this.$dayjs(this.searchOption.date_e)
                    .subtract(1, 'month')
                    .format('YYYY-MM-DD')
            }

            const diffDay = this.$dayjs(this.searchOption.date_e).diff(
                this.$dayjs(this.searchOption.date_s),
                'day'
            )

            if (31 < diffDay) {
                alert('최대 한 달 데이터까지 조회 가능합니다.')
                return
            }

            dateS = `${this.searchOption.date_s} ${this.searchOption.hh_s ? this.searchOption.hh_s : '00'}:${this.searchOption.mm_s ? this.searchOption.mm_s : '00'}:00`
            dateE = `${this.searchOption.date_e} ${this.searchOption.hh_e ? this.searchOption.hh_e : '23'}:${this.searchOption.mm_e ? this.searchOption.mm_e : '59'}:00`

            if (dateS == 'Invalid Date' || !this.searchOption.date_s) {
                dateS = ''
            }

            if (dateE == 'Invalid Date' || !this.searchOption.date_e) {
                dateE = ''
            }

            this.chartRender = false
            this.apiLoad = false
            this.$apiGET(
                '/admin/chart/item/history2?&dateS=' +
                    dateS +
                    '&dateE=' +
                    dateE +
                    '&group=' +
                    this.group +
                    '&group2=' +
                    this.group2
            ).then((data) => {
                this.chartData = data
                this.chartRender = true
                this.apiLoad = true
            })
        },
        downloadExcel() {
            let ex = []
            for (let i = 0; i < this.chartData.date.length; i++) {
                ex.push({ date: this.chartData.date[i] })
            }

            for (let key in this.chartData.values) {
                for (let i = 0; i < this.chartData.values[key].length; i++) {
                    const at = this.chartData.values[key][i].id
                    const values = this.chartData.values[key][i].values

                    for (let x = 0; x < values.length; x++) {
                        ex[x][at] = values[x].value
                    }
                }
            }

            const worksheet = XLSX.utils.json_to_sheet(ex)
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, worksheet, 'data')
            XLSX.writeFile(workbook, `${this.group}_${this.group2}.xlsx`)
        }
    }
}
</script>
