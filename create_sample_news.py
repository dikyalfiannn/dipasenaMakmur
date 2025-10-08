#!/usr/bin/env python3
"""
Create sample news data for frontend testing
"""

import requests
import json

# API configuration
API_BASE = "http://localhost:3000/api"

def get_auth_token():
    """Get authentication token"""
    login_data = {"username": "admin", "password": "admin123"}
    response = requests.post(f"{API_BASE}/auth/login", json=login_data)
    
    if response.status_code == 200:
        data = response.json()
        return data.get("token")
    return None

def create_sample_news():
    """Create sample news for frontend testing"""
    token = get_auth_token()
    if not token:
        print("❌ Failed to get authentication token")
        return
        
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    
    sample_news = [
        {
            "title": "Pembangunan Jalan Desa Tahap II Dimulai",
            "content": "Desa Bumi Dipasena Makmur memulai pembangunan jalan desa tahap II yang akan menghubungkan wilayah timur dan barat desa. Proyek ini diharapkan dapat meningkatkan aksesibilitas warga dan mendukung kegiatan ekonomi masyarakat.\n\nPembangunan ini merupakan bagian dari program pembangunan infrastruktur desa yang didanai melalui Dana Desa tahun 2024. Total panjang jalan yang akan dibangun mencapai 2,5 kilometer dengan lebar 4 meter.\n\nKepala Desa menyampaikan bahwa pembangunan ini akan dilaksanakan secara bertahap dan diharapkan selesai dalam waktu 6 bulan. Masyarakat diminta untuk mendukung kelancaran proyek ini.",
            "excerpt": "Pembangunan jalan desa tahap II dimulai untuk meningkatkan aksesibilitas dan mendukung ekonomi masyarakat.",
            "coverImage": "https://via.placeholder.com/800x400/2563eb/ffffff?text=Pembangunan+Jalan+Desa"
        },
        {
            "title": "Pelatihan Keterampilan Ibu-Ibu PKK",
            "content": "Tim Penggerak PKK Desa Bumi Dipasena Makmur mengadakan pelatihan keterampilan membuat kerajinan tangan dari bahan daur ulang. Kegiatan ini diikuti oleh 50 ibu-ibu dari berbagai RT di desa.\n\nPelatihan ini bertujuan untuk meningkatkan keterampilan ibu-ibu dalam membuat produk kerajinan yang memiliki nilai ekonomis. Materi pelatihan meliputi pembuatan tas dari plastik bekas, hiasan dinding dari kardus, dan berbagai kerajinan lainnya.\n\nKetua PKK Desa berharap dengan adanya pelatihan ini, ibu-ibu dapat mengembangkan usaha kecil di rumah dan meningkatkan pendapatan keluarga. Rencana selanjutnya akan diadakan pameran hasil karya dan pembentukan kelompok usaha bersama.",
            "excerpt": "PKK Desa mengadakan pelatihan keterampilan kerajinan tangan untuk meningkatkan ekonomi ibu-ibu rumah tangga.",
            "coverImage": "https://via.placeholder.com/800x400/059669/ffffff?text=Pelatihan+PKK"
        },
        {
            "title": "Gotong Royong Pembersihan Saluran Air",
            "content": "Warga Desa Bumi Dipasena Makmur bergotong royong membersihkan saluran air dan selokan di sepanjang jalan utama desa. Kegiatan ini dilaksanakan setiap bulan sebagai upaya menjaga kebersihan dan mencegah banjir saat musim hujan.\n\nKegiatan gotong royong ini diikuti oleh warga dari semua RT dengan membawa peralatan masing-masing. Selain membersihkan saluran air, warga juga melakukan penanaman pohon di sepanjang jalan desa.\n\nAparat desa menyampaikan apresiasi atas partisipasi aktif warga dalam menjaga kebersihan lingkungan. Kegiatan seperti ini akan terus dilaksanakan secara rutin untuk menjaga kelestarian lingkungan desa.",
            "excerpt": "Warga bergotong royong membersihkan saluran air untuk menjaga kebersihan dan mencegah banjir.",
            "coverImage": "https://via.placeholder.com/800x400/dc2626/ffffff?text=Gotong+Royong"
        },
        {
            "title": "Penyuluhan Kesehatan dan Posyandu Balita",
            "content": "Puskesmas Kecamatan bekerja sama dengan Desa Bumi Dipasena Makmur mengadakan penyuluhan kesehatan dan kegiatan Posyandu untuk balita. Kegiatan ini rutin dilaksanakan setiap bulan di Balai Desa.\n\nPenyuluhan kali ini membahas tentang pentingnya imunisasi lengkap untuk balita, gizi seimbang, dan cara mencegah stunting. Selain itu, dilakukan juga pemeriksaan kesehatan gratis untuk ibu hamil dan balita.\n\nKader Posyandu desa menyampaikan bahwa partisipasi masyarakat dalam kegiatan Posyandu semakin meningkat. Hal ini menunjukkan kesadaran masyarakat terhadap pentingnya kesehatan ibu dan anak semakin baik.",
            "excerpt": "Penyuluhan kesehatan dan Posyandu balita dilaksanakan rutin untuk meningkatkan kesehatan masyarakat.",
            "coverImage": "https://via.placeholder.com/800x400/7c3aed/ffffff?text=Posyandu+Balita"
        },
        {
            "title": "Festival Budaya Desa Tahun 2024",
            "content": "Desa Bumi Dipasena Makmur akan menggelar Festival Budaya Desa pada tanggal 17 Agustus 2024 dalam rangka memperingati Hari Kemerdekaan Indonesia. Festival ini akan menampilkan berbagai kesenian tradisional dan budaya lokal.\n\nBerbagai lomba akan diselenggarakan seperti lomba tari tradisional, musik daerah, kuliner khas desa, dan pameran hasil pertanian. Acara ini terbuka untuk umum dan diharapkan dapat menarik wisatawan untuk berkunjung ke desa.\n\nPanitia festival mengundang seluruh warga dan masyarakat sekitar untuk berpartisipasi dalam acara ini. Festival Budaya Desa diharapkan dapat melestarikan budaya lokal dan meningkatkan ekonomi masyarakat melalui sektor pariwisata.",
            "excerpt": "Festival Budaya Desa 2024 akan menampilkan kesenian tradisional dan budaya lokal pada 17 Agustus.",
            "coverImage": "https://via.placeholder.com/800x400/ea580c/ffffff?text=Festival+Budaya"
        }
    ]
    
    created_count = 0
    for news in sample_news:
        try:
            response = requests.post(f"{API_BASE}/news", json=news, headers=headers)
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    created_count += 1
                    print(f"✅ Created: {news['title']}")
                else:
                    print(f"❌ Failed to create: {news['title']} - {data}")
            else:
                print(f"❌ HTTP {response.status_code} for: {news['title']}")
        except Exception as e:
            print(f"❌ Error creating {news['title']}: {str(e)}")
    
    print(f"\n📊 Successfully created {created_count}/{len(sample_news)} sample news articles")

if __name__ == "__main__":
    print("🚀 Creating sample news data for frontend testing...")
    create_sample_news()