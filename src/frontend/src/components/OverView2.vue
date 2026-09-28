<template>
	<div class="box">
		<div class="p-30">
			<div v-for="(items, idx) in itemList" :key="items.label + '__' + idx">
				<div v-if="idx === 0" class="box-tit type2">{{ items.boxTitle }}</div>
				<div v-else-if="items.boxTitle" class="box-sub type2">
					{{ items.boxTitle }}
					<button
						v-if="items.btn"
						type="button"
						class="btn btn-sm"
						v-bind:class="{
							'btn-grey' : items.btn.type == 'grey',
							'btn-purple' : items.btn.type == 'purple',
							'btn-warn' : items.btn.type == 'warning',
							'btn-graph' : items.btn.type != 'warning',
							'btn-icon' : !items.btn.text,
						}"
					>
						{{ items.btn.text }}
					</button>
				</div>

				<div v-if="items.boxSub" class="box-sub">{{ items.boxSub }}</div>

				<div v-if="items.hr" class="hr"></div>
				<div v-else class="line" v-for="item in items.val" :key="item">
					<label class="label">{{ item.label }}</label>
					<span class="txt">{{ item.text }}</span>
					<Slider
						v-if="item.type === 'slider'"
						v-model="item.value"
					/>
					<label v-else-if="item.type === 'checkbox'" class="input-switch">
						<input type="checkbox" v-model="item.value" />
						<span class="switch"></span>
					</label>
					<span v-else></span>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="box">
		<div class="p-30">
			<div class="box-tit type2">Main Bearing</div>
			<div class="line">
				<label class="label"
					>Max. bearing Temp.</label
				>
				<span class="txt">30.2 °C</span>
				<Slider v-model="sliderValue1" />
			</div>
			<div class="box-sub type2">
				Health Monitoring
				<button
					type="button"
					class="btn btn-purple btn-sm btn-graph"
				>
					진단 상세
				</button>
			</div>
			<div class="box-sub">Vibration</div>
			<div class="line" v-for="item in 2" :key="item">
				<label class="label" v-if="item == 1"
					>· Axial</label
				>
				<label class="label" v-else>· Radial</label>
				<span class="txt">2.345 m/s2</span>
				<Slider v-model="sliderValue1" />
			</div>
		</div>
	</div>
	<div class="box">
		<div class="p-30">
			<div class="box-tit type2">Gearbox</div>
			<div class="box-sub type2">
				Health Monitoring
				<button
					type="button"
					class="btn btn-grey btn-sm btn-graph"
				>
					진단 상세
				</button>
			</div>
			<div class="box-sub">Vibration</div>
			<div class="line" v-for="item in 4" :key="item">
				<label class="label" v-if="item == 1"
					>· Planetary Gear Vertical</label
				>
				<label class="label" v-else
					>· Housing Axial</label
				>
				<span class="txt">2.345 m/s2</span>
				<Slider v-model="sliderValue1" />
			</div>
		</div>
	</div>
	<div class="box">
		<div class="p-30">
			<div class="box-tit type2">Oil Pump</div>
			<div class="line" v-for="item in 3" :key="item">
				<label class="label" v-if="item == 1"
					>Low Speed</label
				>
				<label class="label" v-else-if="item == 2"
					>High Speed</label
				>
				<label class="label" v-else>Pressure</label>
				<span class="txt" v-if="item == 3"
					>0.7 bar</span
				>
				<span class="txt" v-else>ON</span>
				<Slider
					v-if="item == 1"
					v-model="sliderValue1"
				/>
				<label v-else class="input-switch">
					<input type="checkbox" checked />
					<span class="switch"></span>
				</label>
			</div>
			<div class="hr"></div>
			<div class="line">
				<label class="label"
					>Oil inlet Pressure</label
				>
				<span class="txt">0.0 bar</span>
				<span></span>
			</div>
			<div class="line">
				<label class="label">Oil inlet Temp.</label>
				<span class="txt">10.3 °C</span>
				<Slider v-model="sliderValue1" />
			</div>
		</div>
	</div> -->
</template>

<script>

import Slider from '@vueform/slider';

export default {
	name: 'OverView2',
	props: {
		itemList: {
			type: Object,
		},
		bType: {
			type: String,
			default: null,
		},
	},
	components: {
		Slider
	},
	computed: {},
	data() {
		return {
		};
	},

	created() {
	},
	updated() {},
	methods: {
	},
};
</script>
