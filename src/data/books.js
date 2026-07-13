// ============================================================
// GANTI DI SINI — daftar buku rekomendasi kamu & temen-temen.
//
// - cover        : path gambar cover buku (rasio potret ~2:3 paling pas)
// - synopsis     : sinopsis singkat, 1-3 kalimat aja biar ringkas & enak dibaca
// - recommendedBy: id friend dari data/friendsMusic.js (foto & nama friend
//                  otomatis kepake dari situ). Isi `null` kalau itu rekomendasi kamu sendiri.
//
// Data yang sama ini dipakai buat 2 tempat: carousel coverflow di atas,
// DAN grid "rak buku" di bawah — jadi cukup isi sekali di sini.
// ============================================================

export const books = [
  {
    id: 'book-1',
    title: 'Almond ',
    author: 'Sohn Won-pyung',
    cover: '/images/books/book-1.jpg',
    synopsis:
      'Novel "Almond" karya Sohn Won-pyung mengisahkan Yunjae yang lahir dengan aleksitimia. Kondisi ini membuatnya sulit merasakan emosi seperti takut atau marah karena amigdala (bagian otak pengatur emosi) di kepalanya berukuran kecil. Kehidupannya berubah drastis setelah sebuah tragedi merenggut keluarganya. Ia lalu bertemu Gon, anak yang penuh dengan amarah. Persahabatan mereka membantu Yunjae belajar memahami emosi manusia.',
    recommendedBy: 'friend-2', // GANTI sesuai id di friendsMusic.js
  },
  {
    id: 'book-2',
    title: 'Suddenly I Became a Princess',
    author: 'Plutus',
    cover: '/images/books/book-2.jpg',
    synopsis: '"Suddenly I Became a Princess" (juga dikenal sebagai "Who Made Me a Princess") mengisahkan seorang wanita yang bereinkarnasi sebagai Athanasia, putri yang dibenci ayahnya. Agar tidak dibunuh, ia harus mengambil hati sang kaisar kejam',
    recommendedBy: 'friend-4', // GANTI sesuai id di friendsMusic.js
  },
  {
    id: 'book-3',
    title: 'The Alchemist',
    author: ' Paulo Coelho',
    cover: '/images/books/book-3.jpeg',
    synopsis: 'Novel The Alchemist (Sang Alkemis) karya Paulo Coelho menceritakan kisah Santiago, seorang gembala muda asal Andalusia, Spanyol, yang melakukan perjalanan ke padang pasir Mesir setelah bermimpi menemukan harta karun. Dalam pengejaran takdirnya, ia belajar memahami "bahasa alam semesta" dan menemukan bahwa pencarian jati diri jauh lebih berharga daripada harta itu sendiri.',
    recommendedBy: 'friend-5',
  },
  {
    id: 'book-4',
    title: 'Tentang Kamu',
    author: 'Tere Liye',
    cover: '/images/books/book-4.jpeg',
    synopsis: 'Novel Tentang Kamu karya Tere Liye mengisahkan Zaman Zulkarnaen, pengacara muda asal Indonesia di London, yang ditugaskan melacak ahli waris kliennya, Sri Ningsih. Sri meninggalkan harta warisan bernilai fantastis di sebuah panti jompo di Paris. Penyelidikan ini mengungkap kisah hidup Sri yang penuh penderitaan, kesabaran luar biasa, dan keteguhan hati.',
    recommendedBy: 'friend-7',
  },
  {
    id: 'book-5',
    title: 'Hello Cello',
    author: 'Nadia Ristivani',
    cover: '/images/books/book-5.jpg',
    synopsis: 'Novel Hello, Cello (dan sekuelnya, Hello Again, Cello) karya Nadia Ristivani mengisahkan Helga, gadis anti-cinta yang trauma karena sering disakiti. Hidupnya berubah saat ia tak sengaja dekat dengan Cello, cowok populer yang awalnya berniat mendekati sahabat Helga. Interaksi tak terduga ini justru membuat Cello penasaran dengan keunikan Helga.',
    recommendedBy: 'friend-8',
  },
  {
    id: 'book-6',
    title: 'The Hound of the Baskervilles (Sherlock Holmes)',
    author: 'Arthur Conan Doyle',
    cover: '/images/books/book-6.jpg',
    synopsis: '"Anjing Setan" atau dikenal sebagai The Hound of the Baskervilles adalah salah satu novel paling terkenal karya Sir Arthur Conan Doyle.Kisah ini menceritakan tentang kutukan anjing iblis yang membayangi keluarga Baskerville. Sherlock Holmes dan Dr. Watson harus memakai logika untuk membuktikan apakah kutukan itu nyata.',
    recommendedBy: 'friend-3',
  },
  {
    id: 'book-7',
    title: 'Harry Potter and The Cursed Child',
    author: 'J.K. Rowling',
    cover: '/images/books/book-7.jpeg',
    synopsis: 'Harry Potter and the Cursed Child berlatar 19 tahun setelah perang besar berakhir. Cerita ini berfokus pada Albus, putra Harry Potter yang masuk asrama Slytherin. Dia berjuang melawan beban nama besar ayahnya. Bersama sahabatnya Scorpius, Albus memakai alat pemutar waktu (Time-Turner) untuk mengubah masa lalu, namun justru menciptakan bencana.',
    recommendedBy: 'friend-4',
  },
  {
    id: 'book-8',
    title: 'How to Kill Your Husband',
    author: ' Aghnia Sofyan',
    cover: '/images/books/book-8.jpeg',
    synopsis: 'Aku ingin membunuh suamiku. Apakah kamu juga begitu? Akui saja. Pasti ada sedikit keinginan itu di hatimu. Kalau tidak, untuk apa kamu membaca tulisan ini? Seorang pria ditemukan tewas karena jatuh dari ketinggian. Petunjuk yang ada membuat Inspektur Polisi Satu Bonita Gamal mencurigai Serena Natalegawa, istri korban. Namun, penyelidikan membawa Boni pada rahasia gelap orang-orang terdekat korban yang saling berkelindan. Benarkah Serena telah membunuh suaminya sendiri? Ataukah semua ini tidak sesederhana yang Boni kira?',
    recommendedBy: 'friend-2',
  },
  {
    id: 'book-9',
    title: 'Minimarket yang merepotkan',
    author: 'Kim Ho-yeon',
    cover: '/images/books/book-9.jpeg',
    synopsis: '"Minimarket yang Merepotkan" karya Kim Ho-yeon bercerita tentang Dokgo, mantan tunawisma tanpa ingatan yang bekerja di sebuah minimarket. Dia ditemukan oleh pemilik toko setelah mengembalikan dompet yang hilang. Sikap tulus Dokgo secara perlahan mengubah hidup para pelanggan dan karyawan yang mampir ke toko tersebut.',
    recommendedBy: 'friend-2',
  },
  {
    id: 'book-10',
    title: 'No Longer Human',
    author: 'Osamu Dazai',
    cover: '/images/books/book-10.jpg',
    synopsis: '"Minimarket yang Merepotkan" karya Kim Ho-yeon bercerita tentang Dokgo, mantan tunawisma tanpa ingatan yang bekerja di sebuah minimarket. Dia ditemukan oleh pemilik toko setelah mengembalikan dompet yang hilang. Sikap tulus Dokgo secara perlahan mengubah hidup para pelanggan dan karyawan yang mampir ke toko tersebut.',
    recommendedBy: 'friend-1',
  },
]