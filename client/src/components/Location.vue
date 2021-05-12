<template>
    <div class="location">
        <div class="location-img">
            <img :src="locationImg" alt="">
        </div>
        <div class="cover"></div>
        <div class="location-location">
            <h3>{{ locationLocation }}</h3>
        </div>
        <div class="location-description">
            <h3>{{ locationDescription }}</h3>
        </div>
        <div class="location-author">
            <div class="author-img">
                <img :src="authorImg" alt="">
            </div>
            <p style="margin-left: 10px;margin-top:5px;font-weight:200;">{{ authorName }}</p>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    props: [
        'locationImg',
        'locationDescription',
        'locationLocation',
        'authorName',
        'authorImg',
    ]
})
</script>
<style scoped lang="scss">
@import '../sass/variables';
.location {
    flex: 0 0 33vh;
    max-width: 33vh;
    border-radius: 25px;
    overflow:hidden;
    background-color: $lighter;
    position: relative;
    max-height: 300px;
}
.location-location, .location-description, .author{
    position: absolute;
}
.location-location {
    bottom: 40px;
    left: 30px;
    right: 30px;
    z-index:1000;
    h3 {
        font-weight: 700;
        word-wrap: break-word;
    }
}
.location-img {
    overflow: hidden;
    width: auto;
    max-height: 300px;
}
.location-img img {
    width: auto;
    max-height: 300px;
    margin: auto;
    position: relative;
    display: block;
    right: 50%;
}
.location-author {
    z-index: 10000;
    position: absolute;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    left: 20px;
    right: 20px;
}
.author-img img {
    width: 100%;
    height: 100%;
    position: relative;
}
.author-img {
    border-radius: 50%;
    overflow: hidden;
    width: 30px;
    height: 30px;
    z-index: 1000;
}
.cover {
    position: absolute;
    top: 0;
    height: 0;
    z-index:10;
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg, rgba(48,58,89,0.99) 0%, rgba(32,32,64,0.25) 100%, rgba(96,32,128,1) 100%);
}
.cover:hover {
    background: linear-gradient(0deg, rgba(112,65,255,0.99) 0%, rgba(32,32,64,0.25) 100%, rgba(96,32,128,1) 100%);
}
</style>
