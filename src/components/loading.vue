<template>
    <div id="spinnerLoad" v-if="visible" :class="{'absolute': type === 'absolute'? true : false}">
        <mt-spinner :type="type" :color="color" :size='size'></mt-spinner>
    </div>
</template>
<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: '3'
        },
        size: {
            type: Number,
            default: 36
        },
        color: {
            type: String,
            default: '#00939c'
        }
    }
}
</script>
<style scoped lang='stylus'>
#spinnerLoad {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 588;
    span {
        position: absolute;
        top: 40%;
        left: 50%;
        margin-left: -18px;
    }
    &.absolute {
        position: absolute;
    }
}
</style>
<style>
#spinnerLoad{
    background: url(~@/assets/img/loading_logo.png)no-repeat center 55%;
    background-size: 200px;
    opacity: .9;
}  
</style>
