<template>
	<div class="box">
		<div class="p-30">
			<div v-for="(items, idx) in itemList" :key="items.label + '_' + idx">
				<div v-if="items.boxTitle" class="box-tit">
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
				
				<div
					class="line"
					v-for="item in items.val"
					:key="item"
				>
					<label class="label">{{ item.label }}</label>
					<span class="txt txt-c--pink">{{ item.text }}</span>
					<Slider
						v-if="item.type === 'slider'"
						v-model="item.value"
						class="red"
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
</template>

<script>

import Slider from '@vueform/slider';

export default {
	name: 'OverView',
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
