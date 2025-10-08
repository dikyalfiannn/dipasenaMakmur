import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Clock, Mail, Phone } from 'lucide-react'

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <Card className="rounded-2xl shadow-lg bg-white mb-8">
            <CardContent className="text-center p-8">
              <h1 className="text-4xl font-bold mb-4 text-black">Kontak Kami</h1>
              <p className="text-xl text-gray-700">
                Hubungi Kampung Bumi Dipasena Makmur
              </p>
            </CardContent>
          </Card>

          {/* Google Maps */}
          <Card className="rounded-2xl shadow-lg bg-white mb-8">
            <CardContent className="p-0">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31832.706467502907!2d105.77179586055131!3d-4.202991878931636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3e55654832e37b%3A0xb779490c14117046!2sBumi%20Dipasena%20Makmur%2C%20Kec.%20Rawajitu%20Tim.%2C%20Kab.%20Tulang%20Bawang%2C%20Lampung!5e0!3m2!1sid!2sid!4v1758227711401!5m2!1sid!2sid"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kampung Bumi Dipasena Makmur"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="rounded-2xl shadow-lg bg-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Contact Details */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-black">Informasi Kontak</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="text-green-600 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold mb-1 text-black">Alamat</h3>
                        <p className="text-gray-700">
                          Kampung Bumi Dipasena Makmur<br/>
                          Kecamatan Rawajitu Timur<br/>
                          Kabupaten Tulang Bawang<br/>
                          Provinsi Lampung
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="text-green-600 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold mb-1 text-black">Jam Operasional</h3>
                        <p className="text-gray-700">
                          Senin - Jumat: 08:00 - 15:30 WIB<br/>
                          Sabtu - Minggu: Tutup
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Mail className="text-green-600 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold mb-1 text-black">Email</h3>
                        <p className="text-gray-700">kampungbumidipasena@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="text-green-600 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold mb-1 text-black">Telepon</h3>
                        <p className="text-gray-700">+62 852 6746 5469</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-black">Layanan & Informasi</h2>
                  
                  <div className="space-y-4">
                    <Card className="border border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-green-800 mb-2">Pelayanan Administrasi</h3>
                        <p className="text-sm text-green-700">
                          Surat pengantar, surat keterangan, dan layanan administrasi lainnya
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-blue-800 mb-2">Konsultasi Pembangunan</h3>
                        <p className="text-sm text-blue-700">
                          Informasi program pembangunan dan peluang investasi di kampung
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border border-purple-200 bg-purple-50">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-purple-800 mb-2">Program Sosial</h3>
                        <p className="text-sm text-purple-700">
                          Informasi bantuan sosial dan program pemberdayaan masyarakat
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border border-orange-200 bg-orange-50">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-orange-800 mb-2">Aspirasi Masyarakat</h3>
                        <p className="text-sm text-orange-700">
                          Sampaikan keluhan, saran, dan aspirasi untuk kemajuan kampung
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

              </div>

            </CardContent>
          </Card>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}
