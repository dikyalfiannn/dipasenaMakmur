export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Village Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kampung Bumi Dipasena Makmur</h3>
            <p className="text-gray-300">
              Kecamatan Rawajitu Timur<br />
              Kabupaten Tulang Bawang<br />
              Provinsi Lampung
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <p className="text-gray-300">
              Telepon: +6285267465469<br />
              Email: bumidipasenamakmur@gmail.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><a href="/profil" className="text-gray-300 hover:text-green-400">Profil Kampung</a></li>
              <li><a href="/struktur" className="text-gray-300 hover:text-green-400">Struktur Organisasi</a></li>
              <li><a href="/berita" className="text-gray-300 hover:text-green-400">Berita</a></li>
              <li><a href="/kontak" className="text-gray-300 hover:text-green-400">Kontak</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} Kampung Bumi Dipasena Makmur. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}