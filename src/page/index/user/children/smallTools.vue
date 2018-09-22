<template>
    <transition name='fadeIn'>
        <div id='smallTools'>
            <div class="myheader">
                <my-header fixed title='修改密码'>
                    <a class="back-white" slot='left' @click='$router.go(-1)'></a>
                </my-header>
            </div>
            <div class="content">
                <mt-field label="旧密码" placeholder="请输入旧密码"></mt-field>
                <mt-field label="新密码" placeholder="请输入新密码"></mt-field>
                <mt-field label="确认密码" placeholder="请再次输入新密码"></mt-field>
                <mt-button size="large" type="primary" class="save-btn" style="margin-top: 1rem;">保存修改</mt-button>
                <!--<div class="Thelistof">
                    <div class="dd_nav01 ">
                        <div class="myList" @click="">
                            <span>手电筒</span>
                            <mt-switch v-model="flashlights" @change="turn"></mt-switch>
                        </div>
                    </div>
                    <div class="dd_nav01 ">
                        <div class="myList" @click="sweep">
                            <span>扫码</span>
                            &lt;!&ndash;<mt-switch v-model="flashlights" @change="turn"></mt-switch>&ndash;&gt;
                        </div>
                    </div>
                </div>-->
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'smallTools',
    data() {
        return {
            flashlights: false
        }
    },
    methods: {
        turn() {
            console.log(this.flashlights)
            document.addEventListener('deviceready', () => {
                window.plugins.flashlight.toggle(
                    function() {
                    }, // optional success callback
                    function() {
                    }, // optional error callback
                    { intensity: 0.3 } // optional as well, used on iOS when switching on
                )
            })
        },
        sweep() {
            document.addEventListener('deviceready', () => {
                cordova.plugins.barcodeScanner.scan(function(result) {
                    alert('We got a barcode\n' +
                        'Result: ' + result.text + '\n' +
                        'Format: ' + result.format + '\n' +
                        'Cancelled: ' + result.cancelled)
                }, function(error) {
                    alert('Scanning failed: ' + error)
                })
            })
        }
    }
}
</script>
<style  scoped lang='stylus'>
#smallTools {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1000;
    .content {
        position: relative;
        padding: 2rem .4rem 0 .4rem;
        background: #ffffff;
        font-size: 12px;
        .Thelistof {
            width: 100%;
            background: #FFF;
            border-bottom: 1px solid #cccccc;
            border-right: 0;
            border-left: 0;
            margin: 0 auto;
            padding-left: 0.5rem;
            .dd_nav01 {
                width: 100%;
                height: 1.2rem;
                border-bottom: 1px solid #DBDBDC;
                position: relative;
                .myList {
                    display: table;
                    vertical-align: middle;
                    height: 1.2rem;
                    width: 100%;
                    color: #333;
                    i {
                        display: table-cell;
                        vertical-align: middle;
                        background-size: 0.5rem;
                        position: absolute;
                        right: 0.25rem;
                        top: 0.42rem;
                        height: 0.34rem;
                        width: 0.5rem;
                    }
                    span {
                        height: 100%;
                        display: table-cell;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
}
</style>
