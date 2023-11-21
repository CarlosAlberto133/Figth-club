<template>
    <div class="home">
        <CarrosselVue 
            :navegacao="true"
            :paginacao="true"
            :startAutoPlay="true"
            :timeout="5000"
            class="carrossel" 
            v-slot="{currentSlide}"
        >
            <SlideVue 
                v-for="(slide, index) in CarrosselSlides" 
                :key="index"
            >
                <div v-show="currentSlide === index + 1" class="slide-info">
                    <img :src="require(`@/assets/imgsCarrossel/${slide}`)" />
                </div>
            </SlideVue>
        </CarrosselVue>
    </div>
</template>

<script>
import CarrosselVue from '@/components/carrossel/CarrosselVue.vue'
import SlideVue from '@/components/carrossel/SlideVue.vue'

export default {
    name: 'CompCarrossel',
    components: {
        CarrosselVue,
        SlideVue
    },
    setup() {
        const CarrosselSlides = [ 'bannerfortnite.svg', 'bannerlol.svg', 'bannerstf.svg'  ]
        return { CarrosselSlides }
    }
}
</script>

<style scoped>

    .carrossel {
        position: relative;
        max-height: 100vh;
        height: 100vh;
    }

    .slide-info {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        max-height: 100%;
        height: 100%;
    }

    img {
        margin-top: 110px;
        max-width: 100%;
        height: 100%;
        object-fit: cover;
    }

</style>