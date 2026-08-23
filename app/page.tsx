import Link from "next/link";
import { ArrowLeft, Check, Github, Instagram, Linkedin, Send, Sparkles, Twitter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const showcases = [
  { name: "Instagram", handle: "@sara.creates", icon: Instagram, className: "from-pink-500/15 to-orange-400/10", bio: "طراح محصول و قصه‌گو\nایده‌ها را به تجربه‌های ساده تبدیل می‌کنم\n✦ تهران / دور دنیا" },
  { name: "X / Twitter", handle: "@navidwrites", icon: Twitter, className: "from-sky-400/15 to-cyan-400/10", bio: "ساختن، یادگرفتن، به‌اشتراک‌گذاشتن.\nنویسنده درباره تکنولوژی و زندگی خلاق\nاینجا با ایده‌ها بلند فکر می‌کنم." },
  { name: "LinkedIn", handle: "مریم احمدی", icon: Linkedin, className: "from-blue-500/15 to-indigo-400/10", bio: "Product Designer | UX Researcher\nکمک می‌کنم محصولات دیجیتال، انسانی‌تر طراحی شوند.\nبرای همکاری پیام بدهید." },
  { name: "Telegram", handle: "@dailycraft", icon: Send, className: "from-cyan-400/15 to-blue-400/10", bio: "هر روز یک نکته کوچک برای زندگی بهتر\nنویسنده، سازنده و عاشق یادگیری\nعضو شو؛ چیزهای خوب در راه است." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
        <main>
          <section className="relative flex min-h-[620px] flex-col items-center justify-center gap-12 py-20 text-center lg:flex-row lg:justify-between lg:gap-20 lg:text-right">
            <div className="pointer-events-none absolute inset-x-1/4 top-16 -z-10 h-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="flex max-w-2xl flex-col items-center gap-7 lg:items-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"><Sparkles className="size-4" /> بایوی بعدی‌ات همین‌جاست</div>
              <h1 className="text-balance text-5xl font-black leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl">اولین برداشت،<br /><span className="text-primary">بهترین برداشت</span></h1>
              <p className="max-w-xl text-pretty text-lg leading-8 text-muted-foreground">یک بایوی حرفه‌ای، دقیقاً با حال‌وهوای خودت. Ein Bio برای هر شبکه اجتماعی، از چند کلمه درباره تو یک معرفی ماندگار می‌سازد.</p>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Link href="/bio" className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-primary px-7 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">بایوی من را بساز <ArrowLeft className="size-5" /></Link>
                <a href="#showcase" className="inline-flex h-12 items-center justify-center rounded-xl px-5 font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">دیدن نمونه‌ها</a>
              </div>
              <div className="flex items-center gap-5 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> رایگان برای شروع</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> فارسی و شخصی‌سازی‌شده</span></div>
            </div>
            <div className="relative w-full max-w-md rotate-2 lg:ml-8">
              <div className="absolute -inset-5 rounded-[2rem] border border-primary/10 bg-primary/5 blur-sm" />
              <div className="relative rounded-3xl border border-border bg-card p-6 text-right shadow-2xl shadow-primary/10">
                <div className="mb-7 flex items-center justify-between"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">پیشنهاد Ein Bio</span><Sparkles className="size-5 text-primary" /></div>
                <div className="flex items-center gap-4"><div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-2xl font-black text-primary-foreground">س</div><div><p className="font-bold text-foreground">سارا کریمی</p><p className="text-sm text-muted-foreground">طراح محصول و قصه‌گو</p></div></div>
                <p className="mt-6 whitespace-pre-line text-base leading-8 text-foreground">طراحی می‌کنم تا دنیا ساده‌تر شود.\nایده‌ها، تجربه‌ها و کمی قهوه.</p>
                <div className="mt-7 flex items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground"><span>برای اینستاگرام</span><Instagram className="size-4" /></div>
              </div>
            </div>
          </section>

          <section id="showcase" className="scroll-mt-8 py-20"><div className="mb-14 flex flex-col gap-4"><p className="text-sm font-bold tracking-widest text-primary">نمونه‌ها</p><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><h2 className="max-w-2xl text-balance text-3xl font-black leading-tight text-foreground sm:text-4xl">هر پلتفرم،<br /><span className="text-primary">یک صدای منحصربه‌فرد</span></h2><p className="max-w-sm leading-7 text-muted-foreground lg:text-left">هر پلتفرم زبان خودش را دارد؛ Ein Bio لحن تو را در هرکدام حفظ می‌کند.</p></div></div><div className="relative grid gap-8 pb-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">{showcases.map(({ name, handle, icon: Icon, className, bio }, index) => <article key={name} className={`group relative min-h-72 overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br ${className} p-7 shadow-xl shadow-foreground/5 transition-all duration-500 hover:-translate-y-3 hover:rotate-0 lg:min-h-80 ${index === 0 ? "lg:col-span-7 lg:rotate-[-3deg]" : index === 1 ? "lg:col-span-5 lg:mt-12 lg:rotate-[4deg]" : index === 2 ? "lg:col-span-5 lg:-mt-8 lg:rotate-[3deg]" : "lg:col-span-7 lg:mt-5 lg:rotate-[-2deg]"}`}><div className="absolute -bottom-20 -left-16 size-52 rounded-full bg-primary/5 blur-3xl" /><div className="relative flex h-full flex-col justify-between gap-10"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><span className="flex size-12 items-center justify-center rounded-2xl bg-card text-foreground shadow-lg"><Icon className="size-5" /></span><div><h3 className="font-bold text-foreground">{name}</h3><p className="text-sm text-muted-foreground">{handle}</p></div></div><span className="rounded-full border border-border/70 bg-card/50 px-3 py-1 text-[11px] text-muted-foreground">نمونه تولیدشده</span></div><p className="whitespace-pre-line text-lg leading-9 text-foreground">{bio}</p><div className="flex items-center justify-between border-t border-border/70 pt-4 text-xs text-muted-foreground"><span>ساخته‌شده با Ein Bio</span><span className="font-mono text-primary">{String(index + 1).padStart(2, "0")}</span></div></div></article>)}</div></section>

          <section className="border-y border-border py-20"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold tracking-widest text-primary">ساده شروع کن</p><h2 className="mt-4 text-balance text-3xl font-black text-foreground sm:text-4xl">تو فقط خودت باش؛ کلماتش با ما</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">شبکه اجتماعی‌ات را انتخاب کن، چند کلمه از خودت بگو و بگذار هوش مصنوعی بهترین نسخه معرفی تو را بنویسد.</p><Link href="/bio" className="mt-8 inline-flex h-12 items-center gap-3 rounded-xl bg-primary px-7 font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">شروع ساخت بایو <ArrowLeft className="size-5" /></Link></div></section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
