import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  useLogger,
  addComponent,
} from "@nuxt/kit";

export interface ModuleOptions {
  siteKey: string;
  secretKey: string;
  lang: string;
}
export interface PublicRuntimeConfigOptions {
  siteKey: string;
  lang: string;
}
export interface RuntimeConfigOptions {
  secretKey: string;
}

const PACKAGE_NAME = "nuxt-3-recaptcha-v2";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: PACKAGE_NAME,
    configKey: "recaptcha",
  },
  defaults: {
    siteKey: "",
    secretKey: "",
    lang: "ru",
  },
  setup(options, nuxt) {
    const logger = useLogger(PACKAGE_NAME);
    logger.info(`${PACKAGE_NAME} setup starting`);

    const { resolve } = createResolver(import.meta.url);

    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || { public: {} };
    nuxt.options.runtimeConfig.public.recaptcha = {
      siteKey: options.siteKey,
      lang: options.lang,
    };
    nuxt.options.runtimeConfig.recaptcha = { secretKey: options.secretKey };

    addPlugin(resolve("./runtime/plugin"));
    addComponent({
      name: "BaseRecaptcha",
      filePath: resolve("./runtime/components/BaseRecaptcha.vue"),
    });

    logger.success(`${PACKAGE_NAME} setup done`);
  },
});

declare module "@nuxt/schema" {
  interface PublicRuntimeConfig {
    recaptcha: PublicRuntimeConfigOptions;
  }
  interface RuntimeConfig {
    recaptcha: RuntimeConfigOptions;
  }
}
