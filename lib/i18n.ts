const english = {
  common: {
    buildBio: "Create a bio",
    github: "View the project on GitHub",
    home: "Ein Bio home",
    authorName: "Ehsan Ghaffar",
    switchLanguage: "Switch language to Persian",
    languageName: "English",
  },
  platforms: {
    instagram: "Instagram",
    twitter: "X / Twitter",
    linkedin: "LinkedIn",
    telegram: "Telegram",
  },
  tones: {
    professional: "Professional",
    friendly: "Friendly",
    creative: "Creative",
    humorous: "Humorous",
  },
  footer: {
    credit: "Designed and built by",
    license: "Open source under the MIT license",
  },
  mobile: {
    subtitle: "AI-powered social bio writer",
    choosePlatform: "Choose a platform",
    chooseTone: "Choose a tone",
    aboutYou: "About you or your page",
    aboutPlaceholder:
      "For example: I'm a product designer who writes about user experience...",
    generate: "Create my bio",
    generating: "Creating your bio...",
    outputTitle: "Your suggested bio",
    copy: "Copy bio",
    copied: "Copied",
    regenerate: "Create another",
    advertisement: "Advertisement",
    privacyPolicy: "Privacy policy",
    support: "Support",
    adsUnavailable: "Ads are temporarily unavailable.",
    localeLoadError: "Your saved language could not be loaded.",
    localeSaveError: "Your language choice could not be saved.",
    clipboardError: "The bio could not be copied.",
    networkError: "We couldn't reach the server. Please try again.",
  },
  home: {
    heroBadge: "Your next bio starts here",
    headlineFirst: "Make your first impression",
    headlineSecond: "your best one",
    intro:
      "A professional bio that sounds like you. Ein Bio turns a few details about you into a memorable introduction for every social platform.",
    createBio: "Create my bio",
    viewExamples: "See examples",
    freeToStart: "Free to get started",
    bilingual: "English and Persian",
    suggestion: "Ein Bio suggestion",
    sampleName: "Sara Karimi",
    sampleRole: "Product designer and storyteller",
    sampleBio:
      "Designing to make the world simpler.\nIdeas, experiences, and a little coffee.",
    samplePlatform: "For Instagram",
    showcaseEyebrow: "Examples",
    showcaseTitleFirst: "Every platform,",
    showcaseTitleSecond: "a voice of its own",
    showcaseDescription:
      "Every platform has its own style; Ein Bio keeps your voice recognizable on each one.",
    generatedExample: "Generated example",
    madeWith: "Made with Ein Bio",
    showcases: [
      {
        name: "Instagram",
        handle: "@sara.creates",
        bio: "Product designer and storyteller\nTurning ideas into simple experiences\n✦ Tehran / around the world",
      },
      {
        name: "X / Twitter",
        handle: "@navidwrites",
        bio: "Building, learning, and sharing.\nWriting about technology and creative living.\nThinking out loud, one idea at a time.",
      },
      {
        name: "LinkedIn",
        handle: "Maryam Ahmadi",
        bio: "Product Designer | UX Researcher\nMaking digital products more human.\nOpen to thoughtful collaborations.",
      },
      {
        name: "Telegram",
        handle: "@dailycraft",
        bio: "One small idea for a better day\nWriter, maker, and lifelong learner\nJoin in; good things are on the way.",
      },
    ],
    finalEyebrow: "A simple place to start",
    finalTitle: "Be yourself. We'll find the words.",
    finalDescription:
      "Choose a social platform, tell us a little about yourself, and let AI draft a bio that feels like you.",
    finalCta: "Start creating",
  },
  bio: {
    eyebrow: "AI bio writer",
    title: "A few words about you. A bio worth remembering.",
    description:
      "Create a bio for any social platform that fits your personality and goals—quickly, in English or Persian, and ready to edit.",
    formLabel: "Bio generator form",
    platformTitle: "Choose a platform",
    platformHelp: "Where would you like to use this bio?",
    toneTitle: "Choose a tone",
    toneHelp: "Pick the feeling you want your bio to convey.",
    aboutTitle: "About you or your page",
    aboutHelp: "Share skills, interests, what you do, or anything that matters.",
    aboutLabel: "Details about you or your page",
    aboutPlaceholder:
      "For example: I'm a product designer, I write about user experience, and I love street photography...",
    moreDetails: "More detail can help create a better result",
    characterCount: "{count} of {limit}",
    characterProgress: "Characters entered",
    errorRequired: "Please complete all required fields.",
    errorInvalidLanguage: "The selected language is not supported.",
    errorInvalidPlatform: "The selected platform is not supported.",
    errorInvalidTone: "The selected tone is not supported.",
    errorInvalidAbout: "The details must be valid and cannot be empty.",
    errorNetwork: "We couldn't reach the server. Please try again.",
    errorUnexpected: "Something went wrong while creating your bio. Please try again.",
    rateLimited: "Too many requests. Please wait a little before trying again.",
    waitMessage: "Please wait a moment before trying again.",
    copied: "Bio copied to clipboard",
    generated: "Your new bio is ready",
    failed: "Bio generation failed",
    fallbackNote:
      "This bio was created with a fallback because the AI service was unavailable.",
    generating: "Putting the right words together...",
    generatingHint: "This should only take a few seconds.",
    outputTitle: "Your suggested bio",
    outputSubtitle: "Ready to edit or share",
    outputErrorTitle: "We couldn't create your bio",
    retry: "Try again",
    characterUnit: "characters",
    characterLimit: "of {limit} characters for {platform}",
    preview: "Preview on {platform}",
    yourName: "Your name",
    emptyTitle: "Your bio will appear here",
    emptyDescription:
      "Complete the three steps to get a bio tailored to you.",
    copiedButton: "Copied",
    copyButton: "Copy bio",
    regenerate: "Create another",
    regenerateAria: "Create another bio",
    stepNumbers: ["01", "02", "03"],
    formGuidance: "Choose a platform and add a few details to get started.",
    cooldown: "Try again in {seconds}s",
  },
} as const;

type Localized<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly Localized<Item>[]
    : T extends object
      ? { [Key in keyof T]: Localized<T[Key]> }
      : never;

const persian: Localized<typeof english> = {
  common: {
    buildBio: "ساخت بایو",
    github: "مشاهده پروژه در گیت‌هاب",
    home: "صفحه اصلی Ein Bio",
    authorName: "عین",
    switchLanguage: "تغییر زبان به انگلیسی",
    languageName: "فارسی",
  },
  platforms: {
    instagram: "اینستاگرام",
    twitter: "توییتر / ایکس",
    linkedin: "لینکدین",
    telegram: "تلگرام",
  },
  tones: {
    professional: "حرفه‌ای",
    friendly: "دوستانه",
    creative: "خلاقانه",
    humorous: "طنز",
  },
  footer: {
    credit: "طراحی و توسعه توسط",
    license: "متن‌باز با مجوز MIT",
  },
  mobile: {
    subtitle: "نویسنده هوشمند بایو شبکه‌های اجتماعی",
    choosePlatform: "انتخاب شبکه اجتماعی",
    chooseTone: "انتخاب لحن",
    aboutYou: "درباره تو یا صفحه‌ات",
    aboutPlaceholder:
      "مثلاً: طراح محصول هستم و درباره تجربه کاربری می‌نویسم...",
    generate: "بایوی من را بساز",
    generating: "در حال ساخت بایو...",
    outputTitle: "بایوی پیشنهادی",
    copy: "کپی بایو",
    copied: "کپی شد",
    regenerate: "ساخت دوباره",
    advertisement: "تبلیغ",
    privacyPolicy: "سیاست حفظ حریم خصوصی",
    support: "پشتیبانی",
    adsUnavailable: "تبلیغ موقتاً در دسترس نیست.",
    localeLoadError: "بارگذاری زبان ذخیره‌شده ممکن نشد.",
    localeSaveError: "ذخیره زبان انتخاب‌شده ممکن نشد.",
    clipboardError: "کپی بایو ممکن نشد.",
    networkError: "ارتباط با سرور برقرار نشد. دوباره تلاش کنید.",
  },
  home: {
    heroBadge: "بایوی بعدی‌ات همین‌جاست",
    headlineFirst: "اولین برداشت،",
    headlineSecond: "بهترین برداشت",
    intro:
      "یک بایوی حرفه‌ای، دقیقاً با حال‌وهوای خودت. Ein Bio برای هر شبکه اجتماعی، از چند کلمه درباره تو یک معرفی ماندگار می‌سازد.",
    createBio: "بایوی من را بساز",
    viewExamples: "دیدن نمونه‌ها",
    freeToStart: "رایگان برای شروع",
    bilingual: "فارسی و انگلیسی",
    suggestion: "پیشنهاد Ein Bio",
    sampleName: "سارا کریمی",
    sampleRole: "طراح محصول و قصه‌گو",
    sampleBio: "طراحی می‌کنم تا دنیا ساده‌تر شود.\nایده‌ها، تجربه‌ها و کمی قهوه.",
    samplePlatform: "برای اینستاگرام",
    showcaseEyebrow: "نمونه‌ها",
    showcaseTitleFirst: "هر پلتفرم،",
    showcaseTitleSecond: "یک صدای منحصربه‌فرد",
    showcaseDescription:
      "هر پلتفرم زبان خودش را دارد؛ Ein Bio لحن تو را در هرکدام حفظ می‌کند.",
    generatedExample: "نمونه تولیدشده",
    madeWith: "ساخته‌شده با Ein Bio",
    showcases: [
      {
        name: "Instagram",
        handle: "@sara.creates",
        bio: "طراح محصول و قصه‌گو\nایده‌ها را به تجربه‌های ساده تبدیل می‌کنم\n✦ تهران / دور دنیا",
      },
      {
        name: "X / Twitter",
        handle: "@navidwrites",
        bio: "ساختن، یادگرفتن، به‌اشتراک‌گذاشتن.\nنویسنده درباره تکنولوژی و زندگی خلاق\nاینجا با ایده‌ها بلند فکر می‌کنم.",
      },
      {
        name: "LinkedIn",
        handle: "مریم احمدی",
        bio: "Product Designer | UX Researcher\nکمک می‌کنم محصولات دیجیتال، انسانی‌تر طراحی شوند.\nبرای همکاری پیام بدهید.",
      },
      {
        name: "Telegram",
        handle: "@dailycraft",
        bio: "هر روز یک نکته کوچک برای زندگی بهتر\nنویسنده، سازنده و عاشق یادگیری\nعضو شو؛ چیزهای خوب در راه است.",
      },
    ],
    finalEyebrow: "ساده شروع کن",
    finalTitle: "تو فقط خودت باش؛ کلماتش با ما",
    finalDescription:
      "شبکه اجتماعی‌ات را انتخاب کن، چند کلمه از خودت بگو و بگذار هوش مصنوعی بهترین نسخه معرفی تو را بنویسد.",
    finalCta: "شروع ساخت بایو",
  },
  bio: {
    eyebrow: "نویسنده هوشمند بایو",
    title: "چند کلمه از تو، یک بایوی به‌یادماندنی",
    description:
      "برای هر شبکه اجتماعی، بایویی متناسب با شخصیت و هدف تو می‌سازیم؛ سریع، فارسی یا انگلیسی و آماده ویرایش.",
    formLabel: "فرم ساخت بایو",
    platformTitle: "مقصد بایو",
    platformHelp: "شبکه‌ای که بایو را برای آن می‌خواهی انتخاب کن.",
    toneTitle: "لحن نوشته",
    toneHelp: "حسی که قرار است از بایوی تو منتقل شود.",
    aboutTitle: "درباره تو یا صفحه‌ات",
    aboutHelp: "مهارت‌ها، علایق، حوزه فعالیت یا هر نکته مهمی را بنویس.",
    aboutLabel: "توضیحات درباره شما یا صفحه شما",
    aboutPlaceholder:
      "مثلاً: طراح محصول هستم، درباره تجربه کاربری می‌نویسم و به عکاسی خیابانی علاقه دارم...",
    moreDetails: "جزئیات بیشتر، نتیجه دقیق‌تر",
    characterCount: "{count} از {limit}",
    characterProgress: "تعداد کاراکترهای واردشده",
    errorRequired: "لطفاً تمام فیلدهای مورد نیاز را پر کنید.",
    errorInvalidLanguage: "زبان انتخاب‌شده پشتیبانی نمی‌شود.",
    errorInvalidPlatform: "پلتفرم انتخاب‌شده معتبر نیست.",
    errorInvalidTone: "لحن انتخاب‌شده معتبر نیست.",
    errorInvalidAbout: "محتوای «درباره من» معتبر نیست یا خالی است.",
    errorNetwork: "ارتباط با سرور برقرار نشد. دوباره تلاش کنید.",
    errorUnexpected: "خطایی در تولید بایو رخ داد. دوباره تلاش کنید.",
    rateLimited: "درخواست‌های زیادی فرستاده‌اید. کمی صبر کنید و دوباره تلاش کنید.",
    waitMessage: "چند لحظه صبر کن و دوباره تلاش کن",
    copied: "بایو در کلیپ‌بورد کپی شد",
    generated: "بایوی تازه آماده شد",
    failed: "ساخت بایو ناموفق بود",
    fallbackNote:
      "به‌دلیل اختلال در سرویس هوش مصنوعی، این بایو با سیستم پشتیبان ساخته شد.",
    generating: "بهترین واژه‌ها را کنار هم می‌چینیم...",
    generatingHint: "چند ثانیه با ما همراه باش.",
    outputTitle: "بایوی پیشنهادی",
    outputSubtitle: "آماده برای ویرایش یا انتشار",
    outputErrorTitle: "نتوانستیم بایو را بسازیم",
    retry: "تلاش دوباره",
    characterUnit: "کاراکتر",
    characterLimit: "از سقف {limit} کاراکتر {platform}",
    preview: "پیش‌نمایش در {platform}",
    yourName: "نام شما",
    emptyTitle: "جای بایوی تو اینجاست",
    emptyDescription:
      "سه مرحله روبه‌رو را کامل کن تا یک بایوی شخصی‌سازی‌شده تحویل بگیری.",
    copiedButton: "کپی شد",
    copyButton: "کپی بایو",
    regenerate: "ساخت دوباره",
    regenerateAria: "ساخت دوباره بایو",
    stepNumbers: ["۱", "۲", "۳"],
    formGuidance: "برای شروع، شبکه اجتماعی و توضیحات را کامل کن.",
    cooldown: "{seconds} ثانیه تا ساخت بعدی",
  },
};

export const messages = { en: english, fa: persian } as const;
export type Locale = keyof typeof messages;
export type MessageCatalog = Localized<typeof english>;
export type BioLanguage = "english" | "persian";
export type PlatformId = keyof typeof english.platforms;
export type ToneId = keyof typeof english.tones;

export function toBioLanguage(locale: Locale): BioLanguage {
  return locale === "en" ? "english" : "persian";
}

export function formatMessage(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}

export function formatCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value);
}
