# Psikolog Mehmet Aker Blog Sitesi - Frontend

Bu proje, Psikolog Mehmet Aker için hazırlanmış modern ve kullanıcı dostu bir blog ve tanıtım sitesinin frontend uygulamasıdır. Kullanıcılar blog yazılarını okuyabilir, iletişim formu ile mesaj gönderebilir, sosyal medya hesaplarına ulaşabilir ve psikolog hakkında detaylı bilgi edinebilirler.

## Özellikler

- **Blog Sistemi:** Blog yazılarını listeleme, detaylarını görüntüleme ve kapak görselleri/video desteği.
- **Hakkımda Sayfası:** Psikolog Mehmet Aker’in özgeçmişi ve mesleki deneyimleri.
- **İletişim Formu:** EmailJS entegrasyonu ile doğrudan iletişim.
- **Sosyal Medya:** Instagram ve LinkedIn entegrasyonu.
- **Harita:** Leaflet ile adres haritası.
- **Admin Paneli:** Blog ekleme (Word dosyası ve kapak görseli ile), toplam görüntülenme ve ziyaretçi istatistikleri.
- **Responsive Tasarım:** Tüm cihazlarda modern ve uyumlu görünüm.
- **Kapsamlı hata yönetimi ve kullanıcıya geri bildirimler.**

## Teknolojiler

- **Next.js 14**
- **React 18**
- **TypeScript**
- **Ant Design**
- **Sass/SCSS**
- **Leaflet**
- **EmailJS**
- **Axios**
- **Styled Components**
- **Vercel Analytics**

## Kullanım

- **Bloglar:** Ana sayfa ve /blogs üzerinden blog yazılarını görüntüleyebilirsiniz.
- **Hakkımda:** /about sayfasında psikolog hakkında detaylı bilgi bulabilirsiniz.
- **İletişim:** Footer’daki form ile doğrudan mesaj gönderebilirsiniz.
- **Admin Paneli:** /auth ile giriş yaparak blog ekleyebilir ve istatistikleri görebilirsiniz.

## Dosya Yapısı

- `app/` - Sayfa ve bileşenler
- `public/` - Statik dosyalar (görseller, favicon, json, sitemap, robots.txt)
- `app/styles/` - SCSS dosyaları
- `app/components/` - Header, Footer, Harita gibi bileşenler

## Geliştirici Bilgileri

- **Blog ve içerik yönetimi:** Admin paneli üzerinden Word dosyası ve kapak görseli ile kolay blog ekleme.
- **API entegrasyonu:** Tüm veri işlemleri için backend API ile iletişim.
- **Ziyaretçi ve görüntülenme takibi:** Otomatik olarak localStorage ve backend ile takip.

