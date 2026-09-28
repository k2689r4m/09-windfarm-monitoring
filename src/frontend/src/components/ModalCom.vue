<template>
    <div class="modal" v-bind:class="{ show: modalST }">
        <div class="modal-dim" @click="$emit('onModalEvent', false)"></div>
        <div class="modal-con alert">
            <div class="text">{{ msg }}</div>
            <div class="btn-wrap">
                <!-- <button
                    type="button"
                    class="btn btn-md btn-line"
                    @click="(memberItem.idCK = false), (modalIdCK = false)"
                >
                    취소
                </button> -->
                <button
                    type="button"
                    class="btn btn-md btn-primary"
                    @click="$emit('onModalEvent', false)"
                >
                    확인
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OverView',
    props: {
        modalST: {
            type: Boolean
        },
        msg: {
            type: String
        }
    },
    components: {},
    computed: {},
    data() {
        return {}
    },

    created() {},
    updated() {},
    methods: {}
}
</script>
