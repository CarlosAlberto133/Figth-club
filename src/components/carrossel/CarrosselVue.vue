<template>
    <div class="carrossel">
        <slot :currentSlide="currentSlide" />

        <!-- Navegação -->

        <div v-if="navEnabled" class="navegacao">
            <div class="toggle-page left">
                <i @click="prevSlide" class="fa-solid fa-angle-left"></i>
            </div>
            <div class="toggle-page right">
                <i @click="nextSlide" class="fa-solid fa-angle-right"></i>
            </div>
        </div>

        <!-- Paginação -->
        <div v-if="paginacaoEnabled" class="paginacao">
            <span 
                @click="goToSlide(index)"
                v-for="(slide, index) in getSlideCount" 
                :key="index" 
                :class="{ active : index + 1 === currentSlide }"
            >
            </span>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue"

export default {
    name: 'CarrosselVue',
    props: [ 
        'startAutoPlay', 
        'timeout', 
        'navegacao', 
        'paginacao'
    ],
    setup(props) {
        const currentSlide = ref(1)
        const getSlideCount = ref(null)
        const autoPlayEnabled = ref(props.startAutoPlay === undefined ? true : props.startAutoPlay)
        const timeoutDuration = ref(props.timeout === undefined ? 5000 : props.timeout)
        const paginacaoEnabled = ref(props.paginacao === undefined ? true : props.paginacao)
        const navEnabled = ref(props.paginacao === undefined ? true : props.paginacao)

        // Next Slide
        const nextSlide = () => {
            if(currentSlide.value === getSlideCount.value) {
                currentSlide.value = 1
                return
            }
            currentSlide.value += 1
        }

        // Prev Slide
        const prevSlide = () => {
            if(currentSlide.value === 1) {
                currentSlide.value = 1
                return
            }
            currentSlide.value -= 1
        }

        const goToSlide = (index) => {
            currentSlide.value = index + 1
        }

        // Auto Play
        const autoPlay = () => {
            setInterval(() => {
                nextSlide()
            }, timeoutDuration.value)
        }

        if(autoPlayEnabled.value) {
            autoPlay();
        }

        onMounted(() => {
            getSlideCount.value = document.querySelectorAll('.slide').length
        });

        return { 
            currentSlide, 
            nextSlide, prevSlide, 
            getSlideCount, 
            goToSlide, 
            paginacaoEnabled,
            navEnabled
        }
    }
}
</script>

<style scoped>
    
    .navegacao {
        padding: 0 16px;
        height: 120%;
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .toggle-page {
        display: flex;
        flex: 1;
    }

    .right {
        justify-content: flex-end;
    }

    i {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 50px;
        font-size: 70px;
        transition: .5s;
    }

    i:hover {
        background-color: #4D4949;
        opacity: 0.5;
        width: 75px;
        height: 75px;
        border-radius: 20%;
    }

    img:hover {
        background-color: #7E7E7E;
    }

    .paginacao {
        position: absolute;
        bottom: -50px;
        width: 100%;
        display: flex;
        gap: 16px;
        justify-content: center;
        align-items: center;
    }

    span {
        cursor: pointer;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .active {
        background-color: #151515;
        width: 20px;
        height: 20px;
    }

</style>