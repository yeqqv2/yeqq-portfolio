# [ yeqq ] portfolio

yunus emre korkmaz'ın kişisel portfolyo sitesi. tasarımcı bakışıyla front-end mühendisliğini bir araya getiren, case study odaklı, animasyonlu ve iki dilli bir react uygulaması.

![yeqq portfolio preview](public/assets/banners/skynotech-1600.webp)

## genel bakış

bu portfolyo; belediye servisleri, sosyal fayda odaklı mobil uygulamalar, startup ürünleri ve kurumsal web deneyimleri üzerinden tasarım, front-end geliştirme ve ui/ux düşünme biçimini anlatır.

ana fikir sade: az arayüz, güçlü ritim, net kararlar. büyük tipografi, beyaz alan, proje görselleri, mikro etkileşimler ve ölçülebilir sonuçlar deneyimin merkezinde.

## öne çıkanlar

- react 18 ve vite ile modern front-end yapı.
- gsap, scrolltrigger, split-type ve lenis ile akıcı geçişler ve scroll animasyonları.
- türkçe/ingilizce dil desteği: i18next + browser language detection.
- proje filtreleme, detay sayfaları, case study metrikleri ve galeri akışı.
- `prefers-reduced-motion`, skip link ve focus-visible gibi erişilebilirlik detayları.
- vite manual chunks ile react ve gsap vendor ayrımı.

## sayfalar

| route | açıklama |
| --- | --- |
| `/` | ana sayfa: intro, özet hakkımda, seçili işler, ilkeler ve iletişim çağrısı. |
| `/about-me` | kişisel hikaye, çalışma yaklaşımı, tech stack ve "discover me" etkileşimi. |
| `/projects` | tüm projeler, filtreler ve case study kartları. |
| `/projects/:slug` | tekil proje detayı: rol, şirket, tür, teknoloji, başarı metrikleri ve galeri. |
| `/manifest` | tasarım ve karar verme yaklaşımını anlatan deneysel manifesto alanı. |
| `/manifest/:slug` | manifesto konseptlerinin uzun form yazıları. |
| `/contact-me` | iletişim formu, e-posta ve sosyal bağlantılar. |

## seçili projeler

- **skynotech smart site systems** — iot tabanlı site yönetim platformu; mvp teslimi, cihaz yönetimi, operasyonel verimlilik.
- **skynotech corporate website** — marka kimliği, kurumsal web varlığı, design system.
- **balıkesir digital employment platform** — belediye odaklı istihdam platformu; performans ve erişilebilirlik.
- **balıkesir event app** — gençlik etkinlikleri için react native mobil uygulama.
- **yakın kart** — sosyal finansal destek süreçlerini dijitalleştiren mobil uygulama.
- **bapka website** — kurumsal yeniden tasarım, seo ve içerik stratejisi.
- **askıda fatura** — anonim yardımlaşma ve fatura ödeme akışı.
- **can dostlar** — sahiplenme sürecini şeffaflaştıran sosyal fayda uygulaması.
- **balıkesir eczane** — nöbetçi eczane bulma, acil durum odaklı mobil akış.

## teknoloji

| alan | teknolojiler |
| --- | --- |
| core | react, react-dom, vite |
| routing | react-router |
| animasyon | gsap, scrolltrigger, customease, split-type |
| scroll | lenis |
| dil | i18next, react-i18next, i18next-browser-languagedetector |
| yardımcı | lodash-es |
| ui | css modules, custom design tokens |
| görsel | webp asset setleri, responsive `srcset`, lazy/eager image loading |

## proje yapısı

```txt
src/
  components/   # reveal, signature-intro, smooth-scroll, lightbox, kartlar, loading
  hooks/        # useProjects, useProjectCursor, useMusic
  layouts/      # navbar, footer, app layout
  locales/      # tr/en çeviri dosyaları
  pages/        # home, about, projects, project, manifest, contact, not-found
  styles/       # reset, global, fonts, scrollbar, değişkenler
  ui/           # button, link, menu
  utils/        # projects, colors, eases, motion, music
  i18n.jsx      # i18next kurulumu
  main.jsx      # uygulama girişi
public/
  assets/       # proje görselleri, banner'lar, videolar, fontlar, ikonlar
```

## kurulum

```bash
npm install
npm run dev
```

geliştirme sunucusu: `http://localhost:5173/`

## üretim derlemesi

```bash
npm run build
npm run preview
```

vite kullanıldığı için create react app komutları (`npm start`, `npm test`, `npm run eject`) bu projede geçerli değildir.

## notlar

- proje verisi [src/utils/projects.js](src/utils/projects.js) dosyasında tutulur.
- dil metinleri [src/locales/tr.json](src/locales/tr.json) ve [src/locales/en.json](src/locales/en.json) içindedir.
- seo giriş noktaları `index.html`, `public/sitemap.xml`, `public/robots.txt` ve `public/manifest.json` üzerinden yönetilir.
- canlı domain meta verilerde `https://yeqq.com.tr/` olarak tanımlıdır.

## tasarım yaklaşımı

portfolyo, klasik "kart ve kahraman alan" yapısının dışına çıkarak daha editorial ve deneysel bir dil kurar. boşluk, yavaş açılan animasyonlar, büyük tipografi, kişilikli mikro etkileşimler ve proje metrikleri birlikte kullanılır. amaç yalnızca işleri listelemek değil; düşünme biçimini, tasarım kararlarını ve uygulama disiplinini hissettirmek.

## lisans

kişisel portfolyo çalışması. tasarım, metinler ve görsel varlıklar yunus emre korkmaz'a aittir.
```
