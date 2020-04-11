<template>
    <van-cell>
        <template #title>
            <div class="comment">
                <div class="com-img">
                    <img src="http://img2.imgtn.bdimg.com/it/u=1397142090,3663052380&fm=26&gp=0.jpg" alt="">
                </div>
                <div class="com-msg">
                    <div class="com-name">洛尘</div>
                    <div class="com-content">1111</div>
                    <div class="com-btn">
                        <span>3个月前</span>
                        <span class="reply">回复 0</span>
                    </div>
                </div>
                <div class="like">
                    <van-icon name="like" /> 0
                </div>
            </div>
        </template>
    </van-cell>
</template>

<script>
export default {

}
</script>

<style lang="less">
.comment {
    display: flex;
    .com-img {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
    .com-msg {
        flex: 1;
        text-align: left;
        .com-content {
            margin: 10px 0px 10px 10px;
        }
        .com-btn {
            .reply {
                background: #ccc;
                padding: 3px 5px;
                border-radius: 10px;
                margin-left: 10px;
            }
        }
    }
}
</style>
