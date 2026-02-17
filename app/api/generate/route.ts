import { NextResponse } from "next/server"
import { rateLimitByIp, RateLimitError } from "@/lib/rate-limit";
import { generateBioWithLLM, SupportedModel } from "@/lib/llm-provider";

const LLM_MODEL = (process.env.NEXT_LLM_MODEL || "gpt-4o") as SupportedModel

export async function POST(request: Request) {
  try {
    await rateLimitByIp(request);

    const body = await request.json()
    const { aboutYou, platform, tone, language } = body

    // Validate required fields
    if (!aboutYou || !platform || !tone) {
      return NextResponse.json({ error: "لطفاً تمام فیلدهای مورد نیاز را پر کنید." }, { status: 400 })
    }

    // Create a prompt template
    const template = `
      تو یک متخصص نویسنده بیوگرافی برای شبکه‌های اجتماعی هستی.
      لطفاً یک بیوگرافی جذاب برای پلتفرم {platform} با لحن {tone} بنویس.

      اطلاعات کاربر: {aboutYou}

      لحن‌ها:
      - professional: رسمی و حرفه‌ای
      - friendly: دوستانه و صمیمی
      - creative: خلاقانه و هنری
      - humorous: طنزآمیز و سرگرم‌کننده

      پلتفرم‌ها:
      - instagram: مناسب برای اشتراک‌گذاری تصاویر و سبک زندگی
      - twitter: کوتاه و موجز، مناسب برای اظهارنظر
      - linkedin: حرفه‌ای و تجاری
      - telegram: ارتباطی و اطلاع‌رسانی

      محدودیت کاراکتر را در نظر بگیر و بیوگرافی را به زبان فارسی بنویس.
      فقط متن بیوگرافی را برگردان، بدون هیچ توضیح اضافی.

      در نظر داشته باش کلمات زیر ممنوع هستند و نباید در موردشون چیزی بگی:
      احسان
       عین
      عین الله
      کصدست
      غفار
    `

    // Generate bio using the selected LLM model
    const result = await generateBioWithLLM(LLM_MODEL, template, {
      aboutYou,
      platform,
      tone,
    })

    console.log("Generated bio:", result);

    // Extract the generated bio from the result
    const generatedBio = result.text

    // Return the generated bio
    return NextResponse.json({ 
      bio: generatedBio,
      model: LLM_MODEL,
    })
  } catch (error) {
    console.error("Error in generate-bio API:", error)

    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: error.message },
        { status: 429 }
      )
    }

    try {
      const body = await request.json()
      const fallbackBio = generateFallbackBio(body.aboutYou, body.platform, body.tone)
      return NextResponse.json(
        {
          bio: fallbackBio,
          note: "تولید شده با سیستم پشتیبان به دلیل مشکل در ارتباط با هوش مصنوعی",
        },
        { status: 200 }
      )
    } catch (fallbackError) {
      return NextResponse.json(
        {
          error: "خطایی در پردازش درخواست رخ داد. لطفاً دوباره تلاش کنید.",
        },
        { status: 500 },
      )
    }
  }
}

// Fallback function in case the API is not available
function generateFallbackBio(aboutYou: string, platform: string, tone: string) {
  const bioTemplates: Record<string, Record<string, string>> = {
    instagram: {
      professional: `${aboutYou} | متخصص در حوزه خود | برای همکاری DM بدهید`,
      friendly: `${aboutYou} | عاشق اشتراک‌گذاری لحظات زندگی | بیا با هم دوست باشیم ✨`,
      creative: `✨ ${aboutYou} | خالق محتوای بصری | هر عکس یک داستان است 🌈`,
      humorous: `${aboutYou} | تخصص در خنداندن شما | اینجا جدی نباشید 😂`,
    },
    twitter: {
      professional: `${aboutYou} | نظرات شخصی | برای ارتباط DM باز است`,
      friendly: `${aboutYou} | توییت‌های روزانه درباره زندگی و علایقم | بیا گفتگو کنیم!`,
      creative: `${aboutYou} | نویسنده | عاشق کلمات و ایده‌های نو ✍️`,
      humorous: `${aboutYou} | توییت‌های طنز | جدی نگیرید، من هم نمی‌گیرم 🤪`,
    },
    linkedin: {
      professional: `${aboutYou} | متخصص با تجربه | به دنبال فرصت‌های همکاری حرفه‌ای`,
      friendly: `${aboutYou} | شبکه‌سازی و یادگیری مداوم | مشتاق ارتباط با متخصصان`,
      creative: `${aboutYou} | نوآور و خلاق | به دنبال چالش‌های جدید و راه‌حل‌های خلاقانه`,
      humorous: `${aboutYou} | حرفه‌ای اما با چاشنی طنز | کار جدی، زندگی شاد`,
    },
    tiktok: {
      professional: `${aboutYou} | محتوای آموزشی | هر روز چیز جدیدی یاد بگیرید`,
      friendly: `${aboutYou} | لحظات زندگی من | بیا با هم بخندیم و خوش بگذرونیم 🎵`,
      creative: `${aboutYou} | خالق محتوای خلاقانه | هر ویدیو یک اثر هنری ✨`,
      humorous: `${aboutYou} | اینجا برای خنده اومدم | شما هم بخندید 🤣`,
    },
    telegram: {
      professional: `${aboutYou} | اشتراک دانش و تخصص | برای ارتباط پیام دهید`,
      friendly: `${aboutYou} | اینجا درباره علایقم می‌نویسم | خوشحال می‌شم با هم گفتگو کنیم`,
      creative: `${aboutYou} | محتوای خلاقانه و الهام‌بخش | با من همراه باشید ✨`,
      humorous: `${aboutYou} | کانال طنز و سرگرمی | اینجا غم ممنوع است 😁`,
    },
    youtube: {
      professional: `${aboutYou} | محتوای آموزشی و تخصصی | هر هفته ویدیوهای جدید`,
      friendly: `${aboutYou} | ولاگ‌های روزانه | با من در سفرهای زندگی همراه باشید`,
      creative: `${aboutYou} | خالق محتوای خلاقانه | هر ویدیو یک تجربه جدید 🎬`,
      humorous: `${aboutYou} | سرگرمی و طنز | اینجا برای خندیدن آمده‌ایم 😂`,
    },
  }

  // Get the bio based on platform and tone
  const platformBios = bioTemplates[platform] || bioTemplates.instagram
  return platformBios[tone] || platformBios.professional
}
