"use client"
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { User } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

export default function StrukturPage() {
  const officials = [
    { name: 'Abu Yasit', position: 'Kepala Kampung', photo: '/abu.jpg' },
    { name: 'Mustofa', position: 'Sekretaris Kampung', photo: '/mustofa-square.jpg' },
    { name: 'Muhyidin', position: 'Kepala Seksi Pemerintahan', photo: '/muhyidin-square.jpg' },
    { name: 'Martodani', position: 'Kepala Seksi Kesejahteraan', photo: '/martodani-square.jpg' },
    { name: 'Evhan Nabawi', position: 'Kepala Urusan Keuangan', photo: '/evhan-square.jpg' },
    { name: 'Debby Rismanto', position: 'Kepala Urusan Umum', photo: '/debby-square.jpg' },
    { name: 'Hendra Setiawan', position: 'Staf', photo: '/hendra-square.jpg' },
    { name: 'Suripto', position: 'Staf', photo: '/suripto-square.jpg' },
    { name: 'Hutari Az', position: 'Staf', photo: '/hutari-square.jpg' }
  ]
  // Disarankan crop gambar square agar hasil bulat proporsional!

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="rounded-2xl shadow-lg bg-white mb-8">
            <CardContent className="text-center p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Struktur Organisasi
              </h1>
              <p className="text-xl text-gray-700">
                Aparatur Kampung Bumi Dipasena Makmur
              </p>
            </CardContent>
          </Card>

          {/* Officials Carousel */}
          <div>
            <Swiper
              navigation
              spaceBetween={32}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              centeredSlides
              modules={[Navigation]}
              className="py-4"
            >
              {officials.map((official, idx) => (
                <SwiperSlide key={idx}>
                  <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="flex flex-col items-center px-2 py-7 bg-white rounded-2xl shadow-xl hover:scale-105 transition-all duration-200">
                      <div className="relative mb-2">
                        {/* Avatar bulat, tanpa border menghalangi */}
                        <img
                          src={official.photo}
                          alt={official.name}
                          className="w-28 h-28 rounded-full object-cover object-center shadow-lg border-2 border-white"
                        />
                        {/* Outline eksternal (tidak memotong muka) */}
                        <div className="absolute inset-0 rounded-full outline outline-2 outline-blue-200 pointer-events-none"></div>
                      </div>
                      <h3 className="text-lg font-extrabold text-gray-900 mb-1 text-center">
                        {official.name}
                      </h3>
                      <p className="text-[15px] font-semibold text-green-700 text-center">{official.position}</p>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
