<template>
    <span class="like_btn icon-zan" @click.stop='likeClick' :class="{active: json.giveup? true : false }"> {{json.giveupnum}}</span>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    props: {
        json: Object
    },
    computed: {
        ...mapGetters('detail', [
            'historyArticle'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_historyArticle'
        ]),
        ...mapActions('detail', [
            'post_favorite_data'
        ]),
        async likeClick() {
            if (this.json.giveup) {
                this.$toast({message: '你已经赞过', duration: 1000})
            } else {
                let res = await this.post_favorite_data('1')
                if (res.code === 0) {
                    this.json.giveup = this.json.id
                    this.json.giveupnum++
                    this.set_historyArticle(this.historyArticle)        // 更新一下缓存
                    this.$toast({message: '点赞成功', duration: 1000})
                } else {
                    this.$toast({message: '点赞失败', duration: 1000})
                }
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
.like_btn {
    display: inline-block;
    width: 80px;
    padding: 10px 0;
    text-align: center;
    border: 1px solid #666;
    border-radius: 20px;
    line-height: 1;
    font-size: 12px;
    color: #333;
    &.active {
        border: 1px solid #d81e06;
        color: #d81e06;
    }
}
</style>
