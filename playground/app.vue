<template>
  <div>
    <h1>Recaptcha module playground!</h1>

    <form class="form">
      <pre class="form__pre">{{ formData.token }}</pre>

      <BaseRecaptcha v-model="formData.token" />

      <button
        class="form__submit"
        @click.prevent="verifyHandler"
      >
        Верифицировать
      </button>

      <pre
        v-if="errors['recaptcha']"
        class="form__pre"
      >{{
        errors["recaptcha"]
      }}</pre>

      <pre
        v-if="success"
        class="form__pre"
      >{{ success }}</pre>
    </form>
  </div>
</template>

<script setup>
const formData = reactive({
  token: '',
})
const errors = reactive({})
const success = ref('')

const verifyHandler = () => {
  for (const key in errors) {
    errors[key] = ''
  }
  success.value = ''

  if (!formData.token) {
    errors.recaptcha = 'Введите токен'
    return
  }

  $fetch('/api/check-recaptcha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      recaptcha: formData.token,
    },
  })
    .then(() => {
      formData.token = ''
      success.value = 'Успех'
    })
    .catch((e) => {
      for (const key in e.data.data) {
        errors[key] = e.data.data[key]
      }
      formData.token = ''
    })
}
</script>

<style scoped>
.form {
  margin-top: 20px;
  display: grid;
  max-width: 1000px;
  row-gap: 10px;
}

.form__pre {
  margin-top: 10px;
  font-size: 24px;
  padding: 10px;
  border: 1px solid black;
  background: #eee;
  box-sizing: border-box;
  overflow-x: auto;
}

.form__submit {
  font-size: 24px;
  padding: 10px;
  border: 1px solid black;
  background: #eee;
}
</style>
