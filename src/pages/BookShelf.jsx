import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Search, Dices, ChevronDown, Wand2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import Tilt from 'react-parallax-tilt'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

import SectionHeading from '../components/ui/SectionHeading.jsx'
import FloatingDecor from '../components/ui/FloatingDecor.jsx'
import { IconStar, IconHeart, IconCloud, IconPin, IconBunny } from '../components/ui/ScrapbookIcons.jsx'
import { books } from '../data/books.js'
import { friendsMusic } from '../data/friendsMusic.js'

const WISHLIST_STORAGE_KEY = 'annisa-books-wishlist'

/* ---------------------------------------------------------
   Divider kecil bergaya sulur — belum ada padanannya di
   ScrapbookIcons, jadi digambar custom biar tetap satu gaya
   line-art sama icon-icon lain.
--------------------------------------------------------- */
function VineDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 max-w-[120px] bg-primary/30" />
      <svg width="30" height="20" viewBox="0 0 30 20" className="text-primary/70">
        <path
          d="M2 10c4-8 10-8 12 0s9 8 13 0"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="8" cy="6" r="1.6" className="fill-current" />
        <circle cx="21" cy="14" r="1.6" className="fill-current" />
      </svg>
      <span className="h-px flex-1 max-w-[120px] bg-primary/30" />
    </div>
  )
}

/* ---------------------------------------------------------
   Data teman: ambil foto & nama langsung dari friendsMusic.js
--------------------------------------------------------- */

function getFriend(friendId) {
  if (!friendId) return null
  return friendsMusic.find((f) => f.id === friendId) ?? null
}

function getFriendPhoto(friend) {
  return friend?.avatar || friend?.photo || friend?.image
}

function RecommenderBadge({ friendId }) {
  const friend = getFriend(friendId)

  if (!friend) {
    return (
      <span className="inline-flex items-center gap-1.5 font-hand text-xs text-ink/45">
        <IconHeart className="w-3.5 h-3.5 text-accent/60" />
        your pick
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 font-hand text-xs text-ink/55">
      <span className="flex-shrink-0 w-5 h-5 overflow-hidden rounded-full ring-1 ring-primary/40">
        <img src={getFriendPhoto(friend)} alt={friend.name} className="object-cover w-full h-full" />
      </span>
      rec by {friend.name}
    </span>
  )
}

/* ---------------------------------------------------------
   Tombol hati "mau dibaca" — dipakai di card rak buku & modal
--------------------------------------------------------- */

function WishlistButton({ active, onClick, className = '' }) {
  return (
    <button
      type="button"
      data-cursor-hover
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      aria-label={active ? 'Hapus dari daftar mau dibaca' : 'Tandai mau dibaca'}
      className={`flex items-center justify-center rounded-full shadow-paper transition-transform hover:scale-110 active:scale-95 ${className} ${
        active ? 'bg-accent text-white' : 'bg-white/90 text-ink/35'
      }`}
    >
      <IconHeart className="w-4 h-4" fill={active ? 'currentColor' : 'none'} />
    </button>
  )
}

/* ---------------------------------------------------------
   Chip filter — "all books" / "my list" / per teman
--------------------------------------------------------- */

function FilterChip({ active, onClick, avatar, children }) {
  return (
    <button
      type="button"
      data-cursor-hover
      onClick={onClick}
      className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-body text-xs shadow-paper transition-colors ${
        active ? 'bg-accent text-white' : 'bg-white text-ink/60 hover:bg-accent/10'
      }`}
    >
      {avatar && (
        <span className="flex-shrink-0 w-4 h-4 overflow-hidden rounded-full">
          <img src={avatar} alt="" className="object-cover w-full h-full" />
        </span>
      )}
      {children}
    </button>
  )
}

/* ---------------------------------------------------------
   Modal detail buku
--------------------------------------------------------- */

function BookDetailModal({ book, isWishlisted, onToggleWishlist, onClose }) {
  return (
    <AnimatePresence>
      {book && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4 bg-ink/40 backdrop-blur-sm"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col w-full max-h-[90vh] overflow-y-auto bg-cream shadow-xl rounded-t-3xl sm:rounded-2xl sm:max-w-md sm:max-h-[85vh]"
          >
            {/* handle bar — cuma buat isyarat "geser" di hp */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <span className="w-10 h-1.5 rounded-full bg-ink/15" />
            </div>

            <button
              type="button"
              data-cursor-hover
              onClick={onClose}
              aria-label="Tutup"
              className="absolute z-10 flex items-center justify-center w-8 h-8 text-white rounded-full shadow top-3 right-3 bg-ink/60 hover:bg-ink/80"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-5 p-5 pt-2 sm:flex-row sm:pt-5">
              {/* target shared-transition, sama layoutId kayak cover di rak — jadi
                  covernya kerasa "terbang" dari rak ke sini */}
              <motion.div
                layoutId={`book-cover-${book.id}`}
                className="flex-shrink-0 w-32 mx-auto overflow-hidden rounded-lg shadow-paper aspect-[2/3] sm:mx-0"
              >
                <img src={book.cover} alt={book.title} className="object-cover w-full h-full" />
              </motion.div>

              {/* garis "punggung buku" pemisah, cuma keliatan di desktop */}
              <div className="absolute top-0 bottom-0 hidden w-px sm:block left-[9.5rem] bg-gradient-to-b from-transparent via-ink/10 to-transparent" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.25 }}
                className="flex flex-col min-w-0 text-center sm:text-left"
              >
                <h3 className="pr-4 text-lg font-heading text-ink">{book.title}</h3>
                <p className="font-hand text-ink/50">{book.author}</p>

                <RecommenderBadge friendId={book.recommendedBy} />

                <p className="mt-3 text-sm leading-relaxed font-body text-ink/70">{book.synopsis}</p>

                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => onToggleWishlist(book.id)}
                  className={`mt-5 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 font-body text-sm shadow-paper transition-transform hover:scale-[1.03] active:scale-95 ${
                    isWishlisted ? 'bg-accent text-white' : 'bg-white text-ink/70'
                  }`}
                >
                  <IconHeart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
                  {isWishlisted ? 'udah ditandain mau dibaca' : 'tandai mau dibaca'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------------------------------------------------------
   Ledge kayu tipis di BAWAH grid buku aja (bukan full
   background lagi) — biar nyambung ke bg-cream dasarnya
--------------------------------------------------------- */
function ShelfLedge() {
  return (
    <div
      className="h-4 mt-1 rounded-b-lg shadow-md"
      style={{
        background: 'linear-gradient(180deg, #C9A374 0%, #A9784E 60%, #8f6440 100%)',
        boxShadow: '0 8px 12px -6px rgba(90,60,30,0.35)',
      }}
      aria-hidden="true"
    />
  )
}

/* ribbon kecil di pojok cover, nongol pas buku ditandai wishlist */
function WishlistRibbon() {
  return (
    <motion.div
      initial={{ y: -14, rotate: -8, opacity: 0 }}
      animate={{ y: 0, rotate: -8, opacity: 1 }}
      exit={{ y: -14, opacity: 0 }}
      className="absolute top-0 left-2 z-10 px-2 py-0.5 text-[10px] font-hand text-white bg-accent rounded-b-md shadow"
      style={{ transformOrigin: 'top' }}
    >
      mau dibaca!
    </motion.div>
  )
}



export default function Books() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)
  const isMountedRef = useRef(true)
  const activeBook = books[activeIndex] ?? books[0]

  const [detailBook, setDetailBook] = useState(null)
  const [filter, setFilter] = useState('all') // 'all' | 'wishlist' | friendId
  const [searchQuery, setSearchQuery] = useState('')
  const [shuffleSeed, setShuffleSeed] = useState(0)
  const [visibleCount, setVisibleCount] = useState(8)

  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_STORAGE_KEY)
      return raw ? new Set(JSON.parse(raw)) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify([...wishlist]))
    } catch {
      // localStorage nggak available, skip aja diam-diam
    }
  }, [wishlist])

  // pastiin swiper instance-nya beneran mati SEBELUM React ngehapus DOM-nya
  // pas pindah halaman — ini yang bikin crash/blank kalau nggak di-handle
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      const instance = swiperRef.current
      if (instance && !instance.destroyed) {
        // deleteInstance=true, cleanStyles=false (biar nggak rebutan sama React yang lagi hapus DOM)
        instance.destroy(true, false)
      }
    }
  }, [])

  // tutup modal pas tekan Escape
  useEffect(() => {
    if (!detailBook) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setDetailBook(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [detailBook])

  const toggleWishlist = (bookId) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(bookId)) {
        next.delete(bookId)
      } else {
        next.add(bookId)
        // confetti kecil pas nandain buku, bukan pas hapus
        confetti({
          particleCount: 36,
          spread: 55,
          startVelocity: 28,
          scalar: 0.8,
          origin: { y: 0.75 },
          colors: ['#E7A0A0', '#9FC2C9', '#E8C77C', '#A8B89A'],
        })
      }
      return next
    })
  }

  // daftar teman unik yang pernah ngerekomendasiin, buat chip filter
  const recommenders = useMemo(() => {
    const map = new Map()
    books.forEach((b) => {
      const friend = getFriend(b.recommendedBy)
      if (friend && !map.has(friend.id)) map.set(friend.id, friend)
    })
    return [...map.values()]
  }, [])

  const shelfBooks = useMemo(() => {
    let result = books
    if (filter === 'wishlist') result = result.filter((b) => wishlist.has(b.id))
    else if (filter !== 'all') result = result.filter((b) => b.recommendedBy === filter)

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter(
        (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      )
    }

    if (shuffleSeed > 0) {
      // Fisher-Yates, seed cuma dipakai buat mancing useMemo re-run
      const arr = [...result]
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, wishlist, searchQuery, shuffleSeed])

  // reset paginasi tiap ganti filter/pencarian/acak, biar nggak bingung
  useEffect(() => {
    setVisibleCount(8)
  }, [filter, searchQuery, shuffleSeed])

  const visibleShelfBooks = shelfBooks.slice(0, visibleCount)
  const hasMore = visibleCount < shelfBooks.length

  // fitur baru: klik sekali, langsung dikasih 1 buku acak buat dibuka
  const surpriseMe = () => {
    if (shelfBooks.length === 0) return
    const random = shelfBooks[Math.floor(Math.random() * shelfBooks.length)]
    setDetailBook(random)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream">
      {/* background ambient — daun & kupu-kupu ngambang pelan, kesan reading nook */}
      <FloatingDecor density="light" />

      <div className="relative z-10 px-4 pt-32 pb-24 sm:px-6">
        {/* dekorasi pojok pakai icon yang udah ada di ScrapbookIcons */}
        <IconCloud className="absolute w-10 h-10 top-20 left-4 text-sky/40 sm:left-8" aria-hidden="true" />
        <IconStar className="absolute w-6 h-6 top-40 right-6 text-accent/40 sm:right-14" aria-hidden="true" />
        <IconPin
          className="absolute hidden w-6 h-6 rotate-12 top-64 left-10 text-primary/40 sm:block"
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto">
          <SectionHeading eyebrow="a little library" title="book corner" align="center" />

          {/* ---- judul + penulis buku aktif, di atas carousel ---- */}
          <div className="text-center mt-14">
            <motion.div
              key={`${activeBook.id}-heading`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-2xl font-heading text-ink sm:text-3xl">{activeBook.title}</h3>
              <p className="mt-1 text-base font-hand text-ink/50">{activeBook.author}</p>
            </motion.div>
          </div>

          {/* ---- carousel coverflow 3D ---- */}
          <div className="relative mt-8">
            <Swiper
              modules={[EffectCoverflow]}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop
              slidesPerView="auto"
              spaceBetween={18}
              coverflowEffect={{
                rotate: 32,
                stretch: 0,
                depth: 130,
                modifier: 1,
                slideShadows: false,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => {
                if (isMountedRef.current) setActiveIndex(swiper.realIndex)
              }}
              className="!py-8 !overflow-visible"
            >
              {books.map((book) => (
                <SwiperSlide key={book.id} className="!w-40 sm:!w-48 md:!w-56">
                  <button
                    type="button"
                    data-cursor-hover
                    onClick={() => setDetailBook(book)}
                    className="block w-full overflow-hidden text-left bg-white shadow-xl rounded-2xl aspect-[2/3]"
                    aria-label={`Lihat detail ${book.title}`}
                  >
                    <img src={book.cover} alt={book.title} className="object-cover w-full h-full" />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                data-cursor-hover
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Buku sebelumnya"
                className="flex items-center justify-center transition-transform bg-white rounded-full shadow-paper w-11 h-11 text-ink/45 hover:text-ink hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                data-cursor-hover
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Buku selanjutnya"
                className="flex items-center justify-center text-white transition-transform rounded-full shadow-paper w-11 h-11 bg-accent hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ---- sinopsis, berubah tiap carousel digeser ---- */}
          <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-[200px_1fr] md:items-start md:gap-10">
            <div className="flex items-center gap-2 md:block">
              <IconBunny className="flex-shrink-0 w-7 h-7 text-primary md:mb-2" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-heading text-ink">sinopsis</h3>
                <p className="font-hand text-accent">{activeBook.title}</p>
              </div>
            </div>

            <div>
              <motion.p
                key={`${activeBook.id}-synopsis`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[15px] leading-relaxed font-body text-ink/70"
              >
                {activeBook.synopsis}
              </motion.p>

              <button
                type="button"
                data-cursor-hover
                onClick={() => setDetailBook(activeBook)}
                className="inline-flex items-center gap-1.5 mt-4 text-xs transition-colors font-body text-accent hover:text-ink"
              >
                lihat detail & tandai mau dibaca →
              </button>
            </div>
          </div>

          <VineDivider className="my-16" />

          {/* ---- rak buku: search + filter + acak + grid dengan background kayu ---- */}
          <div>
            <h3 className="mb-1 text-xl text-center font-heading text-ink">the whole shelf</h3>
            <p className="mb-6 text-sm text-center font-hand text-ink/50">
              semua buku yang pernah kita rekomendasiin
              {wishlist.size > 0 && ` · ${wishlist.size} udah ditandain mau dibaca`}
            </p>

            {/* search + tombol acak + kejutkan aku */}
            <div className="flex flex-wrap items-center justify-center max-w-lg gap-2 mx-auto mb-4">
              <div className="relative flex-1 min-w-[10rem]">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-ink/35" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="cari judul atau penulis..."
                  className="w-full py-2 pr-3 text-sm bg-white rounded-full pl-9 shadow-paper font-body text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <button
                type="button"
                data-cursor-hover
                onClick={() => setShuffleSeed((s) => s + 1)}
                aria-label="Acak urutan buku"
                title="acak urutan rak"
                className="flex items-center justify-center flex-shrink-0 text-white transition-transform rounded-full shadow-paper w-9 h-9 bg-primary hover:scale-105 active:scale-95"
              >
                <Dices className="w-4 h-4" />
              </button>
              <button
                type="button"
                data-cursor-hover
                onClick={surpriseMe}
                title="kejutkan aku"
                className="flex items-center gap-1.5 flex-shrink-0 rounded-full bg-accent px-4 py-2 font-body text-xs text-white shadow-paper transition-transform hover:scale-105 active:scale-95"
              >
                <Wand2 className="w-3.5 h-3.5" />
                kejutkan aku
              </button>
            </div>

            {/* filter chips — sekarang wrap, nggak perlu di-scroll lagi */}
            <div className="flex flex-wrap justify-center gap-2 px-1 mb-8">
              <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
                all books
              </FilterChip>
              <FilterChip active={filter === 'wishlist'} onClick={() => setFilter('wishlist')}>
                <IconHeart className="w-3.5 h-3.5" fill={filter === 'wishlist' ? 'currentColor' : 'none'} />
                my list
              </FilterChip>
              {recommenders.map((friend) => (
                <FilterChip
                  key={friend.id}
                  active={filter === friend.id}
                  onClick={() => setFilter(friend.id)}
                  avatar={getFriendPhoto(friend)}
                >
                  {friend.name}
                </FilterChip>
              ))}
            </div>

            {shelfBooks.length === 0 ? (
              <p className="py-10 text-sm text-center font-hand text-ink/40">
                {searchQuery
                  ? `nggak ketemu buku buat "${searchQuery}"`
                  : 'belum ada buku di sini — coba tandai beberapa pakai ikon hati di cover buku'}
              </p>
            ) : (
              <div className="relative">
                <div className="relative grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
                  <AnimatePresence mode="popLayout">
                    {visibleShelfBooks.map((book, i) => {
                      const isWishlisted = wishlist.has(book.id)
                      return (
                        <motion.div
                          key={book.id}
                          layout
                          initial={{ opacity: 0, y: 18, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.94 }}
                          transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
                          className="relative flex flex-col items-center"
                        >
                          {/* Tilt: miring 3D ngikutin posisi jari/mouse, kesan pegang buku beneran */}
                          <Tilt
                            tiltMaxAngleX={10}
                            tiltMaxAngleY={10}
                            perspective={800}
                            scale={1.04}
                            transitionSpeed={1000}
                            glareEnable
                            glareMaxOpacity={0.18}
                            glareColor="#ffffff"
                            glarePosition="all"
                            className="w-full"
                          >
                            <motion.button
                              type="button"
                              data-cursor-hover
                              onClick={() => setDetailBook(book)}
                              whileTap={{ scale: 0.93, rotate: -2 }}
                              className="relative block w-full overflow-visible text-left"
                              aria-label={`Lihat detail ${book.title}`}
                            >
                              {/* target shared-transition: cover ini "terbang" jadi cover modal */}
                              <motion.div
                                layoutId={`book-cover-${book.id}`}
                                className="w-full overflow-hidden bg-white shadow-paper rounded-xl aspect-[2/3]"
                              >
                                <img src={book.cover} alt={book.title} className="object-cover w-full h-full" />
                              </motion.div>

                              <AnimatePresence>{isWishlisted && <WishlistRibbon />}</AnimatePresence>

                              <WishlistButton
                                active={isWishlisted}
                                onClick={() => toggleWishlist(book.id)}
                                className="absolute w-7 h-7 top-2 right-2"
                              />

                              {/* bayangan kecil di bawah, kesan buku "berdiri" */}
                              <div
                                className="absolute left-1/2 h-2 w-[80%] -translate-x-1/2 rounded-full bg-ink/15 blur-sm"
                                style={{ bottom: -10 }}
                                aria-hidden="true"
                              />
                            </motion.button>
                          </Tilt>

                          <p className="mt-4 text-sm text-center truncate font-body text-ink max-w-[9rem]">
                            {book.title}
                          </p>
                          <p className="text-xs font-hand text-ink/45">{book.author}</p>
                          <div className="mt-1.5">
                            <RecommenderBadge friendId={book.recommendedBy} />
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                {/* ledge kayu tipis di bawah rak, bukan full background lagi */}
                <ShelfLedge />

                {hasMore && (
                  <div className="relative flex justify-center mt-10">
                    <button
                      type="button"
                      data-cursor-hover
                      onClick={() => setVisibleCount((c) => c + 8)}
                      className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-body text-sm text-ink/70 shadow-paper transition-transform hover:scale-105 active:scale-95"
                    >
                      tampilkan lebih banyak
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <BookDetailModal
        book={detailBook}
        isWishlisted={detailBook ? wishlist.has(detailBook.id) : false}
        onToggleWishlist={toggleWishlist}
        onClose={() => setDetailBook(null)}
      />
    </div>
    
  )
}