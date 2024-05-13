# nuxt-3-recaptcha-v2

## Quick Start

```sh
yarn add nuxt-3-recaptcha-v2
```

## Configuration

```sh
export default defineNuxtConfig({
  modules: ['nuxt-3-recaptcha-v2'],

  recaptcha: {
    # Секретный ключ рекапчи, окажется по пути useRuntimeConfig().recaptcha.secretKey
    # Нужен при необходимости проверять рекапчу на nuxt сервере
    secretKey: 'secretKey',
    # Публичный ключ рекапчи, нужен для инициализации фрейма с рекапчей
    siteKey: 'siteKey',
    # Язык фрейма рекапчи
    lang: "ru"
  },
});
```

## Features

`nuxt-3-recaptcha-v2` это библиотека, которая реализует базовый функционал рекапчи второй версии

### Функционал включает в себя:

- ✔️ Plugin, который инициализирует скрипт рекапчи
- ✔️ BaseRecaptcha, компонент, который отрисовывает фрейм рекапчи
  - Управление происходит при помощи директивы v-model

## Использование

```sh
<template>
  <BaseRecaptcha v-model="token" />
</template>
```
