import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProfilPage() {
  const landData = [
    { category: 'Lahan Pesawahan', area: '356,710', description: 'Lahan produktif untuk budidaya padi' },
    { category: 'Hutan Green Belt', area: '281,133', description: 'Kawasan hutan untuk konservasi lingkungan' },
    { category: 'Hutan Tanggul Kanal', area: '42,571', description: 'Hutan di sepanjang tanggul kanal' },
    { category: 'Lapangan Olah Raga', area: '0,755', description: 'Fasilitas olahraga masyarakat' },
  ]

  const leaders = [
    { name: 'Somad', period: '1996–2001' },
    { name: 'Suratman', period: '2002–2003' },
    { name: 'Saefudin', period: '2004–2011' },
    { name: 'Imam Hambali', period: '2011–2013 & 2014-2020' },
    { name: 'Ahmad Masyhuri', period: '2013–2014' },
    { name: 'Sabar Sitorus', period: '2020-2022' },
    { name: 'Abu Yasit', period: '2022-2028' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <Card className="rounded-2xl shadow-lg bg-white">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl font-bold mb-4 text-gray-900">Profil Kampung</CardTitle>
              <p className="text-xl text-gray-800">Kampung Bumi Dipasena Makmur</p>
            </CardHeader>
          </Card>

          {/* Sejarah Section */}
          <Card className="rounded-2xl shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Sejarah Kampung</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-800 leading-relaxed mb-4">
                Kampung Bumi Dipasena Makmur adalah salah satu dari delapan kampung di Kecamatan Rawajitu Timur, 
                Kabupaten Tulang Bawang. Terbentuk dari program tambak inti rakyat (TIR) terpadu untuk budidaya udang, 
                dimana masyarakat setempat menjadi petambak plasma dengan PT Dipasena Citra Darmaja (PT DCD) sebagai perusahaan inti.
              </p>
              
              <p className="text-gray-800 leading-relaxed mb-4">
                Pada tahun 1992, PT DCD mulai membuka lahan untuk tambak udang di Blok 10 dan Blok 11, yang menjadi 
                cikal bakal kampung ini. Mulai Januari 1993, 100 kepala keluarga ditempatkan di Blok 10, kemudian 
                secara bertahap hingga akhir 1993 total 1200 kepala keluarga. Keluarga-keluarga inilah yang menjadi 
                cikal bakal penduduk Kampung Bumi Dipasena Makmur.
              </p>
              
              <p className="text-gray-800 leading-relaxed mb-4">
                Kampung Persiapan Bumi Dipasena Makmur secara resmi didirikan pada Februari 1993 oleh Bupati Lampung Utara. 
                Setelah era reformasi dan terbentuknya Kabupaten Tulang Bawang, para tokoh masyarakat bekerja keras untuk 
                meningkatkan status kampung dari "persiapan" menjadi "definitif". Hal ini tercapai melalui SK Bupati 
                (nomor: B/283/BG.III/TB/2001) pada tahun 2001.
              </p>
              
              <p className="text-gray-800 leading-relaxed">
                Secara administratif, kampung ini telah mengalami empat kali perubahan: awalnya bagian dari Kecamatan Menggala, 
                Kabupaten Lampung Utara; kemudian setelah pemekaran kabupaten, menjadi bagian dari Kecamatan Menggala, 
                Kabupaten Tulang Bawang; lalu setelah pemekaran Kecamatan Menggala, menjadi bagian dari Kecamatan Rawajitu Selatan, 
                Kabupaten Tulang Bawang; dan akhirnya setelah pemekaran kecamatan lagi, berada di lokasi saat ini yaitu 
                Kecamatan Rawajitu Timur, Kabupaten Tulang Bawang.
              </p>
            </CardContent>
          </Card>

          {/* Data Wilayah Section */}
          <Card className="rounded-2xl shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Data Wilayah</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {landData.map((item, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.category}</h3>
                      <p className="text-3xl font-bold text-green-700 mb-2">{item.area}</p>
                      <p className="text-sm text-gray-700">Hektar</p>
                      <p className="text-sm text-gray-800 mt-2">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Batas Wilayah</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                  <div><strong>Sebelah Timur:</strong> Laut Jawa</div>
                  <div><strong>Sebelah Barat:</strong> Kampung Gedung Karya Jitu</div>
                  <div><strong>Sebelah Utara:</strong> Kampung Bumi Dipasena Sejahtera</div>
                  <div><strong>Sebelah Selatan:</strong> Kampung Bumi Dipasena Mulya</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pimpinan Desa Section */}
          <Card className="rounded-2xl shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Pimpinan Kampung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-gray-800">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="text-left py-3 px-4 font-semibold">No.</th>
                      <th className="text-left py-3 px-4 font-semibold">Nama Kepala Kampung</th>
                      <th className="text-left py-3 px-4 font-semibold">Periode Kepemimpinan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaders.map((leader, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{index + 1}.</td>
                        <td className="py-3 px-4 font-medium">{leader.name}</td>
                        <td className="py-3 px-4">{leader.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}
