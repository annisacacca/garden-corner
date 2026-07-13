import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col w-full max-w-sm gap-5 p-5 overflow-y-auto bg-cream shadow-xl sm:flex-row rounded-2xl max-h-[85vh] sm:max-w-md"
          >
            <button
              type="button"
              data-cursor-hover
              onClick={onClose}
              aria-label="Tutup"
              className="absolute flex items-center justify-center w-8 h-8 text-white rounded-full shadow top-3 right-3 bg-ink/60 hover:bg-ink/80"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex-shrink-0 w-32 mx-auto overflow-hidden rounded-lg shadow-paper aspect-[2/3] sm:mx-0">
              <img src={book.cover} alt={book.title} className="object-cover w-full h-full" />
            </div>

            <div className="flex flex-col min-w-0 text-center sm:text-left">
              <h3 className="pr-4 text-lg font-heading text-ink">{book.title}</h3>
              <p className="font-hand text-ink/50">{book.author}</p>
              <p className="mt-3 text-sm leading-relaxed font-body text-ink/70">{book.synopsis}</p>

              <div className="flex items-center justify-center gap-3 mt-4 sm:justify-between">
                <RecommenderBadge friendId={book.recommendedBy} />
                <WishlistButton
                  active={isWishlisted}
                  onClick={() => onToggleWishlist(book.id)}
                  className="flex-shrink-0 w-9 h-9"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------------------------------------------------------
   Halaman utama
--------------------------------------------------------- */

export default function Books() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)
  const isMountedRef = useRef(true)
  const activeBook = books[activeIndex] ?? books[0]

  const [detailBook, setDetailBook] = useState(null)
  const [filter, setFilter] = useState('all') // 'all' | 'wishlist' | friendId

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
      if (next.has(bookId)) next.delete(bookId)
      else next.add(bookId)
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
    if (filter === 'all') return books
    if (filter === 'wishlist') return books.filter((b) => wishlist.has(b.id))
    return books.filter((b) => b.recommendedBy === filter)
  }, [filter, wishlist])

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

          {/* ---- rak buku: filter + daftar biasa + siapa yang rekomendasiin ---- */}
          <div>
            <h3 className="mb-1 text-xl text-center font-heading text-ink">the whole shelf</h3>
            <p className="mb-6 text-sm text-center font-hand text-ink/50">
              semua buku yang pernah kita rekomendasiin
              {wishlist.size > 0 && ` · ${wishlist.size} udah ditandain mau dibaca`}
            </p>

            {/* filter chips */}
            {/* <div className="flex gap-2 px-1 pb-2 mb-8 overflow-x-auto sm:flex-wrap sm:justify-center sm:overflow-visible">
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
            </div> */}

            {shelfBooks.length === 0 ? (
              <p className="py-10 text-sm text-center font-hand text-ink/40">
                belum ada buku di sini — coba tandai beberapa pakai ikon hati di cover buku
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {shelfBooks.map((book, i) => (
                  <motion.div
                    key={book.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
                    className="flex flex-col items-center"
                  >
                    <button
                      type="button"
                      data-cursor-hover
                      onClick={() => setDetailBook(book)}
                      className="relative w-full overflow-hidden text-left bg-white shadow-paper rounded-xl aspect-[2/3]"
                      aria-label={`Lihat detail ${book.title}`}
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="object-cover w-full h-full transition-transform duration-300 ease-out hover:scale-105"
                      />
                      <WishlistButton
                        active={wishlist.has(book.id)}
                        onClick={() => toggleWishlist(book.id)}
                        className="absolute w-7 h-7 top-2 right-2"
                      />
                    </button>
                    <p className="mt-3 text-sm text-center truncate font-body text-ink max-w-[9rem]">
                      {book.title}
                    </p>
                    <p className="text-xs font-hand text-ink/45">{book.author}</p>
                    <div className="mt-1.5">
                      <RecommenderBadge friendId={book.recommendedBy} />
                    </div>
                  </motion.div>
                ))}
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