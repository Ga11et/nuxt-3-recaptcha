<template>
  <div ref="recaptchaElement" />
</template>

<script setup>
import { useRuntimeConfig, ref, onMounted, watch } from '#app'

const props = defineProps({
  modelValue: {
    type: String,
    default: () => '',
  },
})
const emit = defineEmits(['update:modelValue'])

const config = useRuntimeConfig()

const recaptchaElement = ref(null)
const recaptchaId = ref(null)

const renderRecaptcha = async () => {
  try {
    grecaptcha.ready(function () {
      recaptchaId.value = grecaptcha.render(recaptchaElement.value, {
        'sitekey': config.public.recaptcha.siteKey,
        'callback': (response) => {
          emit('update:modelValue', response)
        },
        'expired-callback': () => {
          emit('update:modelValue', '')
        },
        'error-callback': () => {
          emit('update:modelValue', '')
        },
      })
    })
  }
  catch (error) {
    console.log('recaptcha error: ', error)
  }
}

onMounted(() => {
  renderRecaptcha()
})

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      grecaptcha.reset(recaptchaId.value)
    }
  },
)
</script>
