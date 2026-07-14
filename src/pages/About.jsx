// pages/Profile.jsx
import { motion } from 'framer-motion'
import WashiTape from '../components/ui/WashiTape.jsx'
import StickyNote from '../components/ui/StickyNote.jsx'
import {
  IconStar,
  IconHeart,
  IconCloud,
  IconSmiley,
  IconCamera,
  IconHome,
  IconPlay,
  IconStore,
  IconPeople,
  IconGrid,
  IconChat,
  IconBell,
  IconBunny,
  IconPin,
} from '../components/ui/ScrapbookIcons.jsx'
import {
  IconCup,
  IconDumpling,
  IconHeartbeat,
} from '../components/ui/DiaryIcons.jsx'

const tabs = ['All', 'Photos', 'Reels', 'Videos', 'About', 'Friends', 'More']

const traits = [
  { left: 'Emotional', right: 'Logical', value: 80 },
  { left: 'Flexible', right: 'Planned', value: 90 },
  { left: 'Introverted', right: 'Extroverted', value: 100 },
  { left: 'Creative', right: 'Analytical', value: 90 },
  { left: 'Idealistic', right: 'Realistic', value: 80 },
  { left: 'Empathetic', right: 'Objective', value: 90 },
]

const funFacts = [
  "First daughter and first grandchild on my dad's side of the family.",
  "I can laugh at almost anything I find funny... a weakness when everyone else is trying to stay serious.",
  "I've been faithfully loving Sylus, and honestly... that hasn't changed.",
]

/* ---------------------------------------------------------
   PHOTO SLOT
   Reusable frame that shows a real photo if `src` is passed,
   otherwise falls back to the soft gradient placeholder.

   HOW TO ADD A REAL PHOTO:
   1. Drop your image inside the `public/` folder of your
      Vite project, e.g. public/photos/polaroid-1.jpg
   2. Pass src="/photos/polaroid-1.jpg" to <Polaroid /> or
      <PhotoSlot /> below.
--------------------------------------------------------- */
function PhotoSlot({ src, alt = '', icon: Icon, tone = 'dark' }) {
  if (src) {
    return <img src={src} alt={alt} className="object-cover w-full h-full" />
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${
        tone === 'dark'
          ? 'bg-gradient-to-b from-[#4b5d63] to-[#1f2a2e]'
          : 'bg-gradient-to-b from-[#e7c98a] to-[#f4ded0]'
      }`}
    >
      {Icon && <Icon className="h-7 w-7 text-white/40" />}
    </div>
  )
}

function PaperFrame({ children, className = '', rotate = 0 }) {
  return (
    <div
      className={`rounded-2xl border-2 border-[#c3cdb0] bg-[#fffdf6] shadow-[3px_4px_0_0_#c3cdb0] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  )
}

function Polaroid({ tone = 'dark', caption, className = '', rotate = 0, src, alt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ rotate: rotate * 0.5, scale: 1.02 }}
      className={`w-fit rounded-sm bg-white p-3 pb-6 shadow-[4px_5px_0_0_#c3cdb0] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="h-40 w-52 overflow-hidden rounded-[2px]">
        <PhotoSlot src={src} alt={alt} tone={tone} />
      </div>
      {caption && <p className="mt-2 text-center font-hand text-sm text-[#3f3a2e]">{caption}</p>}
    </motion.div>
  )
}

function TraitBar({ left, right, value }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between font-body text-[11px] text-[#3f3a2e]/60">
        <span>{left}</span>
        <span>{right}</span>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-[#c3cdb0]/40">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute left-0 top-0 h-1.5 rounded-full bg-[#5f7a4a]"
        />
      </div>
    </div>
  )
}

/* ---------------------------------------------------------
   CUSTOM STICKERS (hand-drawn style SVGs, no emoji, no
   external package). Match the same stroke style as your
   existing ScrapbookIcons so they blend in.
--------------------------------------------------------- */
function IconGiftBox({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="9" width="17" height="10.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 12.5h17" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 9v10.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 9c-1.2-3.4-3.6-4.6-5-3.6-1.2.9-.7 3.6 5 3.6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M12 9c1.2-3.4 3.6-4.6 5-3.6 1.2.9.7 3.6-5 3.6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconSparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3c.6 3.6 2 5.4 6 6-4 .6-5.4 2.4-6 6-.6-3.6-2-5.4-6-6 4-.6 5.4-2.4 6-6Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  )
}

function IconRibbonTag({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 4h8l8 8-9 9-8-8.5V4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="1.4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

/* ---------------------------------------------------------
   FLOATING LEAVES BACKGROUND
   A handful of soft leaf shapes that drift slowly. Purely
   decorative, sits behind everything, ignores clicks.
--------------------------------------------------------- */
function LeafShape({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 21c-5-1-8-6-8-11 5 0 9 3 10 8 1-5 5-8 10-8 0 5-3 10-8 11-1 .3-2 .3-3 0-1 .3-2 .3-3 0Z"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="currentColor"
        fillOpacity="0.16"
        strokeLinejoin="round"
      />
      <path d="M12 21V9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

const leafField = [
  { top: '5%', left: '3%', size: 26, delay: 0, duration: 9, rotate: -18 },
  { top: '16%', left: '93%', size: 20, delay: 1.1, duration: 10.5, rotate: 22 },
  { top: '34%', left: '1.5%', size: 18, delay: 2.2, duration: 9.5, rotate: 12 },
  { top: '48%', left: '96%', size: 24, delay: 0.5, duration: 11.5, rotate: -24 },
  { top: '64%', left: '2%', size: 20, delay: 1.7, duration: 10, rotate: 16 },
  { top: '78%', left: '94%', size: 22, delay: 2.8, duration: 9, rotate: -14 },
  { top: '92%', left: '5%', size: 18, delay: 0.9, duration: 11, rotate: 10 },
]

function FloatingLeaves() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {leafField.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute text-[#8fa876]/35"
          style={{ top: leaf.top, left: leaf.left, width: leaf.size, height: leaf.size }}
          animate={{
            y: [0, -18, 0],
            rotate: [leaf.rotate, leaf.rotate + 14, leaf.rotate],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <LeafShape className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------
   LITTLE GIFT CARD
   Fills the empty space near the bottom of the right column.
--------------------------------------------------------- */
function GiftCard() {
  return (
    <div className="relative rounded-2xl border-2 border-dashed border-[#c3cdb0] bg-[#fffdf6] p-4">
      <IconSparkle className="absolute -right-2 -top-3 h-5 w-5 text-[#8fa876]" />
      <IconRibbonTag className="absolute -bottom-2 -left-2 h-5 w-5 -rotate-12 text-[#c3a876]" />
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e4ead6] text-[#5f7a4a]">
          <IconGiftBox className="w-5 h-5" />
        </span>
        <div>
          <p className="font-hand text-base text-[#3f3a2e]">A little something</p>
          <p className="font-body text-[11px] leading-4 text-[#3f3a2e]/60">
            for whoever's reading this — thank you for stopping by.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Profile() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eef1e4] px-4 py-8 sm:px-8">
      <FloatingLeaves />

      <div className="relative z-10 mx-auto max-w-5xl rounded-[28px] border-4 border-[#c3cdb0] bg-[#f4f2e9] p-4 shadow-[6px_8px_0_0_#c3cdb0] sm:p-6">

        {/* top nav */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border-2 border-[#c3cdb0] bg-[#fffdf6] px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8fa876] text-white">
              <IconHome className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-2 rounded-full border border-[#c3cdb0] bg-[#f4f2e9] px-3 py-1.5">
              <span className="font-body text-xs text-[#3f3a2e]/50">Search</span>
            </div>
          </div>
          <div className="hidden gap-6 text-[#5f7a4a] sm:flex">
            <IconHome className="w-5 h-5" />
            <IconPlay className="w-5 h-5" />
            <IconStore className="w-5 h-5" />
            <IconPeople className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-3 text-[#5f7a4a]">
            <IconGrid className="w-5 h-5" />
            <IconChat className="w-5 h-5" />
            <IconBell className="w-5 h-5" />
            <span className="h-8 w-8 rounded-full bg-[#c3cdb0]" />
          </div>
        </div>

        {/* cover + polaroids */}
        <div className="relative mb-6 rounded-2xl border-2 border-[#c3cdb0] bg-[#e4ead6] p-6 pb-10">
          <StickyNote color="green" rotate={-4} className="absolute z-10 -left-3 -top-4">
            A quiet soul with{'\n'}a loud imagination.
          </StickyNote>

          <div className="flex flex-wrap items-start justify-center gap-6 pt-4">
            {/* pass src="/photos/your-image.jpg" here once you add real photos */}
            <Polaroid tone="dark" caption="keep going" rotate={-3} src="/images/polaroid-1.jpeg" alt="keep going" />
            <Polaroid tone="light" caption="My bojo gwe" rotate={4} className="mt-6" src="/images/polaroid-2.jpeg" alt="tea before code" />
          </div>

          <WashiTape className="-translate-x-1/2 left-1/2 top-2" rotate={-2} />

          <div className="absolute flex items-end gap-2 -bottom-10 left-6">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#f4f2e9] shadow-[3px_4px_0_0_#c3cdb0]">
              {/* pass src="/photos/profile.jpg" here for your real profile photo */}
              <PhotoSlot tone="dark" src="/images/polaroid-3.jpeg" alt="keep going"/>
              
            
            </div>
          </div>
        </div>

        {/* name + short bio */}
        <div className="flex flex-col gap-4 pt-8 pl-2 mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-hand text-3xl text-[#3f3a2e]">Ubi</h1>
            <p className="max-w-md font-body text-sm text-[#3f3a2e]/70">
              Computer Science student, 5th semester. Looking for growth that still leaves room to breathe.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full border-2 border-[#c3cdb0] bg-[#fffdf6] px-4 py-2 font-body text-xs text-[#3f3a2e] shadow-[2px_3px_0_0_#c3cdb0]">
              View projects
            </button>
            <button className="rounded-full bg-[#8fa876] px-4 py-2 font-body text-xs text-white shadow-[2px_3px_0_0_#5f7a4a]">
              + Get in touch
            </button>
          </div>
        </div>

        {/* tabs */}
        <div className="mb-6 flex flex-wrap gap-5 border-b-2 border-[#c3cdb0] px-2 pb-2 font-body text-sm text-[#3f3a2e]/70">
          {tabs.map((t, i) => (
            <span key={t} className={i === 0 ? 'border-b-2 border-[#5f7a4a] pb-2 font-medium text-[#3f3a2e]' : ''}>
              {t}
            </span>
          ))}
        </div>

        {/* main grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr_1fr]">

          {/* left sidebar — personality */}
          <div className="space-y-5">
            <PaperFrame className="p-5" rotate={-0.4}>
              <h3 className="mb-3 font-hand text-xl text-[#3f3a2e]">Personality</h3>
              <span className="mb-3 inline-block rounded-full bg-[#5f7a4a] px-3 py-1 font-hand text-base text-white">
                INFP
              </span>
              <div className="space-y-2.5">
                {traits.map((t) => (
                  <TraitBar key={t.left} {...t} />
                ))}
              </div>
            </PaperFrame>

            <PaperFrame className="p-5" rotate={0.5}>
              <h3 className="mb-2 font-hand text-xl text-[#3f3a2e]">Current Status</h3>
              <p className="flex items-center gap-2 font-body text-sm text-[#3f3a2e]/80">
                <IconHeartbeat className="h-4 w-4 text-[#8fa876]" /> Still alive.
              </p>
            </PaperFrame>
          </div>

          {/* center feed — about me + dream as posts */}
          <div className="space-y-5">
            <PaperFrame className="overflow-hidden">
              <div className="flex items-center gap-3 p-4 pb-2">
                <span className="h-9 w-9 rounded-full bg-[#c3cdb0]" />
                <div>
                  <p className="font-hand text-lg text-[#3f3a2e]">Ubi</p>
                  <p className="font-body text-[11px] text-[#3f3a2e]/50">About me</p>
                </div>
              </div>
              <p className="px-4 pb-4 font-body text-sm leading-6 text-[#3f3a2e]/80">
                I'm currently a Computer Science student heading into my fifth semester, still figuring
                things out one step at a time. Right now, I'm looking for new experiences and
                opportunities to grow  but not the kind that keeps me busy 24/7. I believe life should
                have room to breathe. I genuinely enjoy having my own personal space. Quiet moments
                recharge me, and sometimes the best company is simply a peaceful afternoon with my
                thoughts, a good playlist, or a cup of matcha.
              </p>
            </PaperFrame>

            <PaperFrame className="overflow-hidden">
              <div className="flex items-center gap-3 p-4 pb-2">
                <span className="h-9 w-9 rounded-full bg-[#c3cdb0]" />
                <div>
                  <p className="font-hand text-lg text-[#3f3a2e]">Ubi</p>
                  <p className="font-body text-[11px] text-[#3f3a2e]/50">Dream</p>
                </div>
              </div>
              <p className="px-4 pb-4 font-body text-sm leading-6 text-[#3f3a2e]/80">
                I dream of becoming someone my younger self would be proud of. One day, I want to
                become a teacher, build my own school, help educate future generations, and write
                books that leave something meaningful behind. Most importantly, I hope I can make my
                parents proud. For now, my biggest goal is pretty simple: graduate with the best
                results I can achieve while gaining as much real-world experience as possible 
                especially in the tech industry. And besides being a teacher, I also want to become a
                highly skilled software developer. Sounds pretty cool, right?
              </p>
            </PaperFrame>
          </div>

          {/* right sidebar — fun facts + drink/food */}
          <div className="space-y-5">
            <PaperFrame className="p-5" rotate={0.4}>
              <h3 className="mb-3 flex items-center gap-1.5 font-hand text-xl text-[#3f3a2e]">
                Fun Facts <IconStar className="h-4 w-4 text-[#8fa876]" />
              </h3>
              <ul className="space-y-2 font-body text-xs leading-5 text-[#3f3a2e]/80">
                {funFacts.map((f) => (
                  <li key={f} className="flex gap-2">
                    <IconHeart className="mt-0.5 h-3 w-3 shrink-0 text-[#8fa876]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </PaperFrame>

            <PaperFrame className="p-5" rotate={-0.4}>
  <h3 className="mb-2 flex items-center gap-2 font-hand text-xl text-[#3f3a2e]">
    <IconCup className="h-4 w-4 text-[#8fa876]" /> Favorite Drink
  </h3>
  <p className="mb-3 font-body text-xs text-[#3f3a2e]/70">Matcha & milk tea.</p>
  <div className="flex items-end gap-3">
    <div className="w-20 h-20 overflow-hidden border-4 border-white shadow-md rounded-xl">
      {/* pass src="/photos/matcha.jpg" for the real photo */}
      <PhotoSlot icon={IconCup} tone="light" src="/images/matcha.webp" alt="keep going" />
    </div>
    <div
      className="w-20 h-20 overflow-hidden border-4 border-white shadow-md rounded-xl"
    >
      {/* ganti src ini dengan foto kedua kamu */}
      <PhotoSlot icon={IconCup} tone="light" src="/images/matcha-2.jpg" alt="matcha extra" />
    </div>
  </div>
</PaperFrame>

            <PaperFrame className="p-5" rotate={0.3}>
              <h3 className="mb-2 flex items-center gap-2 font-hand text-xl text-[#3f3a2e]">
                <IconDumpling className="h-4 w-4 text-[#8fa876]" /> Favorite Food
              </h3>
              <p className="mb-3 font-body text-xs text-[#3f3a2e]/70">
                I'll eat almost anything edible, but bacang and hui cilembu wins.
              </p>
              <div className="flex items-end gap-3">
    <div className="w-20 h-20 overflow-hidden border-4 border-white shadow-md rounded-xl">
      {/* pass src="/photos/matcha.jpg" for the real photo */}
      <PhotoSlot icon={IconCup} tone="light" src="/images/food1.jpg" alt="keep going" />
    </div>
    <div
      className="w-20 h-20 overflow-hidden border-4 border-white shadow-md rounded-xl"
    >
      {/* ganti src ini dengan foto kedua kamu */}
      <PhotoSlot icon={IconCup} tone="light" src="/images/food2.jpg" alt="matcha extra" />
    </div>
  </div>
            </PaperFrame>

            <div className="flex items-start gap-2 rounded-2xl border-2 border-[#c3cdb0] bg-[#e4ead6] p-4">
              <IconBunny className="h-9 w-9 shrink-0 text-[#5f7a4a]" />
              <p className="font-hand text-base text-[#3f3a2e]">Good things take time.</p>
            </div>

            <GiftCard />
          </div>
        </div>
      </div>
    </div>
  )
}