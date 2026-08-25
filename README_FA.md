# BioGPT - تولیدکننده بایو هوشمند شبکه‌های اجتماعی

<div align="center" dir="rtl">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**تولید بایو جذاب و شخصی‌شده، پیام‌های خوش‌آمد و محتوای بهتر با کمک هوش مصنوعی.**

[دمو زنده](#) • [مستندات](#مستندات) • [مشارکت](#مشارکت)

[English README](./README.md)

</div>

---

## 📋 فهرست مطالب

- [معرفی](#معرفی)
- [ویژگی‌ها](#-ویژگی‌ها)
- [تکنولوژی‌های استفاده‌شده](#-تکنولوژی‌های-استفاده‌شده)
- [شروع سریع](#-شروع-سریع)
- [ساختار پروژه](#-ساختار-پروژه)
- [نقاط پایانی API](#-نقاط-پایانی-api)
- [تنظیمات](#-تنظیمات)
- [توسعه](#-توسعه)
- [استقرار](#-استقرار)
- [مشارکت](#مشارکت)
- [مجوز](#-مجوز)

---

## معرفی

BioGPT یک برنامه وب هوشمند است که کاربران را در ایجاد بایو شبکه‌های اجتماعی جذاب، پیام‌های خوش‌آمد شخصی‌شده و بهبود محتوا با کمک مدل‌های GPT OpenAI و LangChain کمک می‌کند. یک تجربه بی‌نظیر برای خالق‌های محتوا، بازاریابان و علاقه‌مندان شبکه‌های اجتماعی فراهم می‌کند.

### موارد استفاده اصلی

- **مدیران شبکه‌های اجتماعی**: ایجاد چندین نسخه بایو برای پلتفرم‌های مختلف
- **جویندگان شغل**: نوشتن بایو‌های حرفه‌ای در LinkedIn
- **مالکان کسب‌وکارهای کوچک**: نوشتن توضیحات جذاب برای کسب‌وکار
- **خالق‌های محتوا**: بهبود و ویرایش محتوای موجود
- **تیم‌های بازاریابی**: تولید انبوه محتوای مختص به پلتفرم

---

## 🚀 ویژگی‌ها

### ویژگی‌های اصلی

| ویژگی | توضیحات |
|-------|---------|
| **تولیدکننده بایو** | ایجاد بایو‌های جذاب و شخصی‌شده برای شبکه‌های اجتماعی |
| **تولیدکننده پیام خوش‌آمد** | ایجاد پیام‌های خوش‌آمد شخصی‌شده برای مناسبت‌ها و پلتفرم‌های مختلف |
| **بهبود محتوا** | بهبود محتوای موجود با پیشنهادات و ویرایش‌های مبتنی بر هوش مصنوعی |
| **پشتیبانی چند پلتفرم** | بهینه‌سازی محتوا برای Twitter، Instagram، LinkedIn، TikTok و موارد دیگر |
| **انتخاب لحن** | انتخاب از چندین گزینه لحن (حرفه‌ای، غیررسمی، بازیگوشانه و غیره) |
| **چت بلادرنگ** | گفتگوی تعاملی برای پالایش تدریجی محتوا |
| **پشتیبانی تم** | حالت روشن/تاریک با ترجیحات کاربر دائمی |

### ویژگی‌های تکنیکی

- ⚡ **رندرینگ سمت سرور (SSR)** - عملکرد بهینه‌شده با Next.js App Router
- 🔒 **محدودیت نرخ** - حفاظت درون‌ساختی علیه سوء‌استفاده با Redis Upstash
- 🌐 **پشتیبانی RTL** - پشتیبانی کامل برای فارسی و سایر زبان‌های RTL
- 📊 **تجزیه‌وتحلیل** - ادغام شده با Vercel Analytics و Speed Insights
- 🎨 **طراحی واکنش‌پذیر** - رابط کاربری کاملاً واکنش‌پذیر و بر اساس موبایل
- ♿ **دسترسی‌پذیری** - منطبق با WCAG با اجزای Radix UI
- 🚀 **پاسخ‌های جریانی** - جریان پاسخ‌های بلادرنگ برای تجربه کاربری بهتر

---

## 🛠️ تکنولوژی‌های استفاده‌شده

### رابط کاربری

| لایه | تکنولوژی | نسخه | هدف |
|------|-----------|------|------|
| **چارچوب** | [Next.js](https://nextjs.org/) | 14.2.35 | چارچوب React با App Router |
| **زبان** | [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | توسعه با ایمنی نوع |
| **استایل** | [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 | چارچوب CSS مبتنی بر ابزار |
| **اجزا** | [Radix UI](https://www.radix-ui.com/) | آخرین | اجزای دسترسی‌پذیر |
| **نمادها** | [Lucide React](https://lucide.dev/) | 0.303.0 | نمادهای SVG زیبا |
| **تم‌ها** | [next-themes](https://github.com/pacocoursey/next-themes) | 0.3.0 | مدیریت حالت تاریک/روشن |

### هوش مصنوعی و پشتیبانی

| لایه | تکنولوژی | نسخه | هدف |
|------|-----------|------|------|
| **چارچوب LLM** | [LangChain](https://www.langchain.com/) | 0.2.2 | ترکیب‌بندی و مدیریت LLM |
| **ارائه‌دهندگان LLM** | OpenAI، OpenRouter، Gemini | آخرین | پشتیبانی از چندین ارائه‌دهنده |
| **OpenAI** | [OpenAI SDK](https://openai.com/) | 3.2.1 | مدل‌های GPT (gpt-4o، gpt-5) |

### ذخیره‌سازی و زیرساخت

| لایه | تکنولوژی | نسخه | هدف |
|------|-----------|------|------|
| **محدودیت نرخ** | [Upstash Redis](https://upstash.com/) | 1.36.2 | Redis بدون‌سرور برای محدودیت نرخ |
| **اعتبار‌سنجی** | [Zod](https://github.com/colinhacks/zod) | 3.23.8 | اعتبار‌سنجی طرح زمان اجرا |

---

## 📁 ساختار پروژه

```
einbiogpt/
├── app/                           # دایرکتوری Next.js App Router
│   ├── api/                       # درخواست‌های API
│   │   ├── chat/                  # نقطه پایانی چت
│   │   ├── generate/              # نقاط پایانی تولید
│   │   └── langchain/             # نقاط پایانی ادغام LangChain
│   ├── layout.tsx                 # طرح اصلی
│   ├── page.tsx                   # صفحه برنامه اصلی
│   └── ...دیگر صفحات
│
├── components/                    # اجزای React
│   ├── ui/                        # اجزای Radix UI
│   ├── theme/                     # ارائه‌دهنده تم
│   ├── providers/                 # ارائه‌دهندگان برنامه
│   ├── bio-generator/             # اجزای تولید بایو
│   ├── Header.tsx                 # سرصفحه
│   ├── Footer.tsx                 # پاصفحه
│   ├── OutputPanel.tsx            # نمایشگر نتایج
│   ├── PlatformSelector.tsx       # انتخاب پلتفرم
│   └── ToneSelector.tsx           # انتخاب لحن
│
├── lib/                           # توابع کمکی و تنظیمات
│   ├── constants/                 # ثابت‌های برنامه
│   ├── Langchain.ts               # تنظیمات LangChain
│   ├── llm-provider.ts            # تنظیمات ارائه‌دهنده LLM
│   ├── rate-limit.ts              # منطق محدودیت نرخ
│   └── utils.ts                   # توابع عمومی
│
└── styles/                        # سبک‌های جهانی
    └── globals.css                # استایل‌های Tailwind و متغیرهای CSS
```

---

## 🔌 نقاط پایانی API

### تولید محتوا

#### `POST /api/generate`

تولید بایو‌های جدید بر اساس ورودی کاربر.

**درخواست:**
```json
{
  "contentType": "bio|welcome|enhancement",
  "bio": "بایو یا محتوای فعلی",
  "platform": "twitter|instagram|linkedin|tiktok|facebook",
  "tone": "professional|casual|playful|humorous|inspirational"
}
```

**پاسخ:** جریان Server-Sent Events با محتوای تولید‌شده

---

### چت تعاملی

#### `POST /api/chat`

پالایش تدریجی محتوا از طریق رابط چت.

**درخواست:**
```json
{
  "message": "درخواست پالایش توسط کاربر",
  "contentType": "bio|welcome|enhancement",
  "context": {
    "previousContent": "محتوای تولید‌شده",
    "platform": "twitter"
  }
}
```

**پاسخ:** جریان Server-Sent Events با محتوای پالایش‌شده

---

## ⚙️ تنظیمات

### متغیرهای محیط

فایل `.env.local` را با متغیرهای زیر ایجاد کنید:

```bash
# انتخاب مدل LLM
NEXT_LLM_MODEL=gpt-4o

# تنظیمات OpenAI (اگر از مدل‌های GPT استفاده می‌کنید)
NEXT_OPENAI_API_KEY=sk_live_your_key_here

# تنظیمات OpenRouter (اگر از مدل‌های OpenRouter استفاده می‌کنید)
NEXT_LLM_PROVIDER=openrouter
NEXT_LLM_MODEL=meta-llama/llama-3.3-70b-instruct:free
OPENROUTER_API_KEY=your_openrouter_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_DEFAULT_MODEL=meta-llama/llama-3.3-70b-instruct:free
OPENROUTER_HTTP_REFERER=https://your-site.example
OPENROUTER_APP_NAME=BioGPT

# محدودیت نرخ
REDIS_URL=https://your-redis-url.upstash.io
REDIS_TOKEN=your_redis_token
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=10

# تنظیمات سمت کلاینت
NEXT_PUBLIC_COOLDOWN_TIME=10
```

---

## 🚀 شروع سریع

### پیش‌نیازها

- **Node.js**: نسخه 18 یا بالاتر
- **Package Manager**: Yarn 1.22+ یا npm 9+
- **حساب OpenAI**: با دسترسی به API

### نصب

```bash
# کلون کردن مخزن
git clone https://github.com/ehsaghaffar/einbiogpt.git
cd einbiogpt

# نصب وابستگی‌ها
yarn install

# ایجاد فایل محیط
cp .env.example .env.local
# تنظیمات را در .env.local تکمیل کنید

# شروع سرور توسعه
yarn dev

# باز کردن مرورگر
# http://localhost:3000 را بازدید کنید
```

---

## 👨‍💻 توسعه

### دستورات دستیار

| دستور | توضیحات |
|-------|---------|
| `yarn dev` | شروع سرور توسعه |
| `yarn build` | ساخت برای تولید |
| `yarn start` | شروع سرور تولید |
| `yarn run clean` | تمیزکاری و نصب مجدد |

### جریان توسعه

1. شروع سرور توسعه: `yarn dev`
2. ایجاد تغییرات
3. ریلود خودکار اعمال می‌شود
4. تست تغییرات در مرورگر

---

## 🐳 Docker

### توسعه با Docker

```bash
# ساخت تصویر
make build

# شروع کانتینرها
make start

# مشاهده لاگ‌ها
make logs

# متوقف کردن کانتینرها
make stop
```

### تولید

```bash
docker build -f prod.Dockerfile -t biogpt-prod .
docker run -p 3000:3000 \
  -e NEXT_OPENAI_API_KEY=sk_xxx \
  biogpt-prod
```

---

## 🌐 استقرار

### Vercel (توصیه‌شده)

```bash
# پوش کردن به GitHub
git push origin main

# اتصال به Vercel و استقرار
# https://vercel.com را بازدید کنید
# مخزن خود را وارد کنید
# متغیرهای محیط را اضافه کنید
# استقرار خودکار انجام می‌شود
```

### نمودار توسعه و استقرار

```
توسعه محلی
    ↓
Git Push
    ↓
Vercel / سرور خود
    ↓
موجود در تولید
```

---

## مشارکت

مشارکت خوش‌آمد است! لطفاً این دستورالعمل‌ها را دنبال کنید:

1. Fork کردن مخزن
2. ایجاد شاخه ویژگی: `git checkout -b feature/amazing-feature`
3. انجام تغییرات
4. Commit کردن: `git commit -m 'feat: افزودن ویژگی فوق‌العاده'`
5. Push کردن: `git push origin feature/amazing-feature`
6. بازکردن Pull Request

---

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده‌است - فایل [LICENCE](./LICENCE) را ببینید.

---

## 👤 نویسنده

**احسان غفار**
- GitHub: [@ehsaghaffar](https://github.com/ehsaghaffar)

---

## 🔗 منابع

- [مستندات Next.js](https://nextjs.org/docs)
- [مستندات Tailwind CSS](https://tailwindcss.com/docs)
- [مستندات OpenAI API](https://platform.openai.com/docs/api-reference)
- [مستندات LangChain](https://js.langchain.com/)

---

<div align="center" dir="rtl">

[⬆ بازگشت به بالا](#biogpt---تولیدکننده-بایو-هوشمند-شبکه‌های-اجتماعی)

</div>
