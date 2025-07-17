import { inject, type Ref } from "vue";
import { omit } from "lodash-es";
import { createI18n, i18nSymbol, type I18nInstance } from "vue3-i18n";
import { en, type Language } from "@my-component/locale";
import English from "@my-component/locale/lang/en";

//可以传入非顶层注入的语言,取出I18n的t函数
export function useI18n(localeOverrides?: Ref<Language>) {
  if (!localeOverrides) {
    return omit(
      <I18nInstance>(
        inject(
          i18nSymbol,
          createI18n({ locale: English.name, messages: { en: English.el } })
        )
      ),
      "install"
    );
  }
  return omit(
    createI18n({
      locale: localeOverrides.value.name,
      messages: {
        en: English.el,
        [localeOverrides.value.name]: localeOverrides.value.el,
      },
    }),
    "install"
  );
}

export default useI18n;
