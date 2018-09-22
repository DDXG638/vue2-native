<template>
    <transition name='fadeIn'>
        <div id="gamePuzzle">
            <my-header fixed title='拼图游戏' isOpacity>
                <a class="back-white" slot='left' @click='$router.go(-1)'></a>
            </my-header>
            <div class="wrapper">
                <!--<div class="box">-->
                    <ul class="puzzle-wrap">
                        <li
                            :class="{'puzzle': true, 'puzzle-empty': !puzzle}"
                            v-for="(puzzle, index) in puzzles"
                            v-text="puzzle"
                            @click="moveFn(index)"
                        ></li>
                     <div class="clearfix"></div>
                    </ul>
                <!--</div>-->
                <!--<span class="btn-reset" @click="reset">重置游戏</span>-->
                <mt-button class="reset-btn" size="large" type="primary" @click="reset">重置游戏</mt-button>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'gamePuzzle',
        data() {
            return {
                puzzles: []
            }
        },
        methods: {
            // 重置渲染
            render () {
                // console.log('123')
                let puzzleArr = []
                let i = 1

                // 生成包含1 ~ 15数字的数组
                for (i; i < 16; i++) {
                    puzzleArr.push(i)
                }

                // 随机打乱数组
                puzzleArr = puzzleArr.sort(() => {
                    return Math.random() - 0.5
                })
                // console.log(puzzleArr)
                // 页面显示
                this.puzzles = puzzleArr
                this.puzzles.push('')
            },
            reset () {
                // console.log('222')
                let puzzleArr = []
                let i = 1

                // 生成包含1 ~ 15数字的数组
                for (i; i < 16; i++) {
                    puzzleArr.push(i)
                }

                // 随机打乱数组
                puzzleArr = puzzleArr.sort(() => {
                    return Math.random() - 0.5
                })
                puzzleArr.push('')
                // console.log(puzzleArr)
                // 页面显示
                this.puzzles = puzzleArr
            },

            // 点击方块
            moveFn(index) {
                // console.log(index)
                // 获取点击位置及其上下左右的值
                let curNum = this.puzzles[index]
                let leftNum = this.puzzles[index - 1]
                let rightNum = this.puzzles[index + 1]
                let topNum = this.puzzles[index - 4]
                let bottomNum = this.puzzles[index + 4]
                // console.log(`${topNum}-${rightNum}-${bottomNum}-${leftNum}`)

                // 和为空的位置交换数值
                if (leftNum === '' && index % 4) {
                    /* this.$set(this.puzzles, index - 1, curNum)
                    this.$set(this.puzzles, index, '') */
                    this.swap(index, index - 1, curNum)
                } else if (rightNum === '' && index % 4 !== 3) {
                    /* this.$set(this.puzzles, index + 1, curNum)
                    this.$set(this.puzzles, index, '') */
                    this.swap(index, index + 1, curNum)
                } else if (topNum === '') {
                    /* this.$set(this.puzzles, index - 4, curNum)
                    this.$set(this.puzzles, index, '') */
                    this.swap(index, index - 4, curNum)
                } else if (bottomNum === '') {
                    /* console.log('jin')
                    this.$set(this.puzzles, index + 4, curNum)
                    this.$set(this.puzzles, index, '') */
                    this.swap(index, index + 4, curNum)
                }

                this.passFn()
            },

            // 校验是否过关
            passFn() {
                if (this.puzzles[15] === '') {
                    const newPuzzles = this.puzzles.slice(0, 15)

                    const isPass = newPuzzles.every((e, i) => e === i + 1)

                    if (isPass) {
                        alert('恭喜，闯关成功！')
                    }
                }
            },
            swap (index, indexCop, curNum) {
                this.$set(this.puzzles, indexCop, curNum)
                this.$set(this.puzzles, index, '')
            }
        },
        mounted() {
            this.render()
        }
    }
</script>

<style lang='stylus'>
    #gamePuzzle {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        z-index: 1001;
        background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521730069680&di=10c544bda124f3a605391d763b8f6e07&imgtype=0&src=http%3A%2F%2Fbcs.img.r1.91.com%2Fdata%2Fupload%2F2014%2F11_07%2F10%2F201411071005579557.jpg") no-repeat center;
        .wrapper {
            padding: 1.335rem .2rem;
        }
        .puzzle-wrap {
            margin: 1rem auto 0;
            width: 9rem;
            height: 9rem;
            opacity: .95;
            .puzzle {
                float: left;
                width: 25%;
                height: 25%;
                font-size: .8rem;
                text-align: center;
                line-height: 2.4rem;
                border: 1px solid #ccc;
                box-shadow: 1px 1px 4px;
                background: #a1e4e8;
                text-shadow: 2px 2px 2px #B9B4B4;
                color: #ba85ef;
            }

            .puzzle-empty {
                background: #ccc;
                box-shadow: inset 2px 2px 18px;
            }
        }
        .reset-btn {
            width: 80%;
            margin: 1rem auto 0;
        }
    }
</style>
