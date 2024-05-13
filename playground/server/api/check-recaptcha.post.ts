export default eventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  if (!body) {
    throw createError({
      statusCode: 422,
      data: {
        recaptcha: 'Неудачная валидация',
      },
    })
  }

  const resp = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptcha.secretKey}&response=${body.recaptcha}`,
  ).then(res => res.json())

  if (!resp.success) {
    throw createError({
      statusCode: 422,
      data: {
        recaptcha: 'Неудачная валидация',
      },
    })
  }

  sendNoContent(event)
})
