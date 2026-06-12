import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import works from "@/utils/projects";

const trProjects = {
  "/projects/skynotech-smart-site-systems": {
    project_name: "skynotech | iot akıllı site yönetim platformu",
    name: "skynotech | iot akıllı site yönetim platformu",
    role: "frontend geliştirici & ui/ux tasarımcı",
    desc:
      "IoT tabanlı, kapsamlı bir site yönetim platformu. Bahçe sulama, aydınlatma ve havuz sistemleri gibi kritik altyapıyı tek merkezden izlenebilir ve kontrol edilebilir hale getirdi.",
    challenge:
      "Site ekiplerinin manuel kontroller, ayrı cihazlar ve geciken saha kontrolleri arasında bölünen altyapıyı tek ekrandan yönetmesi gerekiyordu.",
    approach:
      "Gerçek zamanlı durum, hızlı uzaktan aksiyonlar ve net cihaz grupları üzerine kurulu dashboard odaklı bir akış tasarlayıp geliştirdim.",
    impact:
      "MVP 80+ IoT cihazı bağladı ve rutin kontrolleri daha hızlı bir uzaktan kontrol iş akışına dönüştürdü.",
    achievements: [
      {
        title: "tam MVP teslim süresi",
        desc:
          "Firebase ve React/Next.js hızından yararlanarak fiziksel IoT kartları ile web uygulaması arasında gerçek zamanlı iletişim kuran işlevsel MVP'yi 2 ayda teslim ettim.",
      },
      {
        title: "yönetilen IoT cihazları",
        desc:
          "İki büyük yaşam alanında 30+ sulama ünitesi ve 50+ akıllı aydınlatma cihazının merkezi yönetimini mümkün kıldım.",
      },
      {
        title: "operasyonel verimlilik artışı",
        desc:
          "MQTT/Firebase ile anlık uzaktan kontrol akışı kurarak manuel iş yükü, israf ve tepki süresini azalttım.",
      },
    ],
  },
  "/projects/skynotech-smart-site-systems-website": {
    project_name: "skynotech | kurumsal marka ve web deneyimi",
    name: "skynotech | kurumsal marka ve web deneyimi",
    role: "frontend geliştirici & ui/ux tasarımcı",
    desc:
      "Skynotech'in teknoloji odaklı marka algısını güçlendiren kurumsal web sitesi. Logo, ikonlar ve tasarım sistemiyle birlikte bütün görsel dili oluşturdum.",
    challenge:
      "Teknik bir IoT ürününü sade anlatan, aynı zamanda yeni markayı güvenilir gösteren kurumsal bir varlık gerekiyordu.",
    approach:
      "Marka kimliği, arayüz sistemi ve frontend uygulamasını birlikte ele alarak web sitesi ve ürün arayüzünün tek bir ekosistem gibi hissettirmesini sağladım.",
    impact:
      "Web sitesi şirketin kamusal yüzü oldu ve kurumsal site ile platform arasında tutarlı bir tasarım dili kurdu.",
    achievements: [
      {
        title: "Lighthouse performans skoru",
        desc:
          "Frontend asset optimizasyonu ve Next.js temelli hızlı deneyimle 96+ performans skoruna ulaştım.",
      },
      {
        title: "tasarım sistemi uygulaması",
        desc:
          "Kurumsal site ve ana IoT platformu arasında tutarlı, tekrar kullanılabilir bir bileşen ve görsel dil sistemi kurdum.",
      },
      {
        title: "marka kimliği oluşturma",
        desc:
          "Logo, ikonografi ve yeni pazar algısını taşıyan temel görsel prensipleri oluşturdum.",
      },
    ],
  },
  "/projects/balikesir-istihdam-ofisi": {
    project_name: "balıkesir dijital istihdam platformu",
    name: "balıkesir dijital istihdam platformu",
    role: "frontend geliştirici & ui/ux tasarımcı",
    desc:
      "Vatandaşların iş ilanlarına hızlı ulaşması, işverenlerin ilan yayınlaması ve başvuru süreçlerinin takip edilebilmesi için tasarlanmış yüksek performanslı belediye platformu.",
    challenge:
      "Kağıt ağırlıklı başvuru süreci vatandaş, işveren ve belediye ekipleri için yavaş ve takibi zor bir yapı oluşturuyordu.",
    approach:
      "İş keşfi, işveren ilan akışı, başvuru takibi ve PDF CV üretimi gibi kamusal servis ihtiyaçlarını hız ve erişilebilirlik odağıyla tasarladım.",
    impact:
      "Platform 12.291 özgeçmiş, 428 kayıtlı işletme ve 5.324 aday yönlendirmesiyle kritik bir kamu sürecini dijital kanala taşıdı.",
    achievements: [
      {
        title: "süreç hızı artışı",
        desc:
          "Kağıt ağırlıklı başvuru sürecinin dijitalleşmesi vatandaş ve işveren tarafında daha hızlı bir iş akışı sağladı.",
      },
      {
        title: "özgeçmiş ve başvurular",
        desc:
          "12.291 özgeçmiş, 428 kayıtlı işletme ve 5.324 aday yönlendirmesiyle yüksek kullanım kanıtlandı.",
      },
      {
        title: "Lighthouse erişilebilirlik skoru",
        desc:
          "Başvuru durumu takibi ve PDF CV gibi kritik servisleri daha geniş vatandaş kitlesi için erişilebilir hale getirdim.",
      },
      {
        title: "Core Web Vitals optimizasyonu",
        desc:
          "0.8s FCP, 210ms TBT ve 0.002 CLS ile iş arama deneyimini hızlı ve stabil hale getirdim.",
      },
    ],
  },
  "/projects/balikesir-etkinlik": {
    project_name: "balıkesir | etkinlik uygulaması",
    name: "balıkesir | etkinlik uygulaması",
    role: "frontend geliştirici & ui/ux tasarımcı",
    desc:
      "Gençlere yönelik konser, tiyatro ve sinema etkinliklerini anlık bildirimler ve güncel listelerle sunan React Native mobil uygulama.",
    challenge:
      "Gençlik etkinlikleri sosyal medya ve kurumsal duyurular arasında dağınık kalıyor, hedef kitle etkinlikleri geç veya eksik fark ediyordu.",
    approach:
      "Daha enerjik bir mobil dil, sade kategoriler ve bildirim odaklı akışlarla merkezi bir etkinlik hub'ı tasarladım.",
    impact:
      "Uygulama 100k+ genç hedef kitle için merkezi bir etkinlik noktası oluşturdu ve belediyenin dijital sesini modernleştirdi.",
    achievements: [
      {
        title: "ekran ve UI/UX tasarımı",
        desc:
          "Figma'da 40+ ekran tasarlayarak kurumsal dilden daha modern ve genç bir mobil dile geçiş sağladım.",
      },
      {
        title: "hedef kullanıcı erişimi",
        desc:
          "100k+ genç vatandaşa sosyal etkinlikleri tek merkezden takip edebilecekleri dijital bir alan sundum.",
      },
      {
        title: "gerçek zamanlı sistem",
        desc:
          "Konser, film ve etkinlik duyuruları için anlık bildirim odaklı React Native akışını uyguladım.",
      },
    ],
  },
  "/projects/yakin-kart": {
    project_name: "yakın kart | sosyal destek uygulaması",
    name: "yakın kart | sosyal destek uygulaması",
    role: "frontend geliştirici & ui/ux tasarımcı",
    desc:
      "İhtiyaç sahibi vatandaşların aylık destek bakiyesini ve harcama geçmişini şeffaf şekilde takip edebilmesi için tasarlanmış sosyal belediyecilik platformu.",
    challenge:
      "Maddi destek alan vatandaşların bakiye, kullanım ve destek durumunu belirsiz offline iletişime bağlı kalmadan görebilmesi gerekiyordu.",
    approach:
      "Bakiye görünürlüğü, harcama inceleme ve tek tıkla sorgulama akışlarını güven hissi üzerine kurdum.",
    impact:
      "Ürün 12.101 vatandaşın sosyal destek sürecini daha anlaşılır ve kendi kendine takip edilebilir hale getirdi.",
    achievements: [
      {
        title: "desteklenen vatandaş",
        desc:
          "Aylık nakit destek sürecinin dijital takibini 12.101 vatandaş için daha görünür hale getirdim.",
      },
      {
        title: "anlık bakiye ve takip",
        desc:
          "Bakiye ve harcama geçmişi ekranlarıyla kullanıcılara destek sürecinde şeffaflık sağladım.",
      },
      {
        title: "tek tıkla sorgulama",
        desc:
          "Finansal destek sorgularını basit ve güven veren bir mobil akışla erişilebilir hale getirdim.",
      },
    ],
  },
  "/projects/bapka-website": {
    project_name: "bapka kurumsal web sitesi ve bilgi merkezi",
    name: "bapka kurumsal web sitesi ve bilgi merkezi",
    role: "frontend geliştirici & ui/ux tasarımcı",
    desc:
      "Kurumsal varlığı güçlendirmek, rapor ve duyuruları daha görünür kılmak ve organik trafiği artırmak için yeniden tasarlanan bilgi merkezi.",
    challenge:
      "BAPKA'nın rapor, duyuru ve kurumsal içeriklerini yavaş ya da gömülü hissettirmeden sunan daha kullanışlı bir bilgi mimarisine ihtiyacı vardı.",
    approach:
      "Ana sayfa hiyerarşisi, içerik mimarisi ve görsel sistemi SEO, okunabilirlik ve keşfedilebilirlik odağıyla yeniden kurguladım.",
    impact:
      "Yeniden tasarım 43% aylık SEO büyümesi ve ilk 28 günde 600+ organik ziyaretçi kazanımı sağladı.",
    achievements: [
      {
        title: "aylık SEO büyümesi",
        desc:
          "Teknik SEO, hız optimizasyonu ve içerik mimarisiyle organik trafikte 43% aylık büyüme sağladım.",
      },
      {
        title: "ilk 28 günde organik ziyaretçi",
        desc:
          "Yüksek değerli anahtar kelimeler ve daha net içerik yapısı ile 600+ organik ziyaretçi kazanıldı.",
      },
      {
        title: "ana redesign ve mimari",
        desc:
          "Rapor ve duyuruları öne çıkaran, altın oran prensibinden beslenen yeni ana sayfa yapısını tasarladım.",
      },
    ],
  },
  "/projects/askida-fatura": {
    project_name: "askıda fatura | sosyal dayanışma platformu",
    name: "askıda fatura | sosyal dayanışma platformu",
    role: "frontend geliştirici & ui/ux tasarımcı",
    desc:
      "Elektrik, su ve doğalgaz faturalarının anonim şekilde desteklenebilmesini sağlayan React Native sosyal dayanışma uygulaması.",
    challenge:
      "Dayanışma ürünü hem bağış yapanı güvende hissettirmeli hem de destek alan kişilerin mahremiyetini korumalıydı.",
    approach:
      "Akışı üç temel fatura kategorisi etrafında sadeleştirdim ve arayüzde yalnızca bağış için gerekli bilgileri gösteren anonim bir yapı kurdum.",
    impact:
      "Hassas bir yardım süreci güven, gizlilik ve hızlı aksiyon üzerine kurulu net bir mobil deneyime dönüştü.",
    achievements: [
      {
        title: "anonim ve güvenilir tasarım",
        desc:
          "Bağışçı ve destek alan kişinin mahremiyetini koruyan, yalnızca gerekli fatura bilgilerini gösteren bir yapı kurdum.",
      },
      {
        title: "sadeleştirilmiş fatura kategorileri",
        desc:
          "Elektrik, su ve doğalgaz olarak üç temel kategoriyle bağış akışını daha hızlı ve anlaşılır hale getirdim.",
      },
      {
        title: "sezgisel UX akışları",
        desc:
          "Fatura bırakma, sorgulama ve ödeme adımlarında kullanıcı sürtünmesini azalttım.",
      },
    ],
  },
  "/projects/can-dostlar": {
    project_name: "can dostlar | güvenli sahiplendirme platformu",
    name: "can dostlar | güvenli sahiplendirme platformu",
    role: "frontend geliştirici & ui/ux tasarımcı",
    desc:
      "Sokak hayvanlarının güvenli ve şeffaf şekilde sahiplendirilmesini destekleyen React Native mobil uygulama.",
    challenge:
      "Sahiplendirme akışı sıcak ve kolay hissettirmeli, aynı zamanda sorumlu sahiplendirme için gerekli yapısal adımları kaybetmemeliydi.",
    approach:
      "Hayvan profilleri, başvuru adımları ve onay sürecini şeffaf bilgi ve bilinçli karar verme üzerine tasarladım.",
    impact:
      "Uygulama belediyenin mobil ekosistemi içinde tekrar kullanılabilir bir sosyal fayda deseni oluşturdu.",
    achievements: [
      {
        title: "yapısal sahiplendirme süreci",
        desc:
          "Online başvuru, barınak ziyareti ve final onayı adımlarıyla güvenli sahiplendirme akışını netleştirdim.",
      },
      {
        title: "şeffaf hayvan profilleri",
        desc:
          "Yaş, kilo, cinsiyet ve karakter gibi temel bilgileri karar vermeyi kolaylaştıracak şekilde sundum.",
      },
      {
        title: "birleşik mobil ekosistem",
        desc:
          "Belediyenin sosyal fayda odaklı mobil ürünlerinde tutarlı ve tekrar kullanılabilir bir arayüz dili oluşturdum.",
      },
    ],
  },
  "/projects/balikesir-eczane": {
    project_name: "balıkesir | nöbetçi eczane bulucu",
    name: "balıkesir | nöbetçi eczane bulucu",
    role: "frontend geliştirici & ui/ux tasarımcı",
    desc:
      "Acil durumlarda en yakın nöbetçi eczaneyi, mesafeyi ve yol tarifini hızlı şekilde gösteren konum tabanlı mobil uygulama.",
    challenge:
      "Nöbetçi eczane arayan kullanıcı genellikle stresli, hareket halinde ve zaman kısıtlı olduğu için arayüzde gereksiz her adım kaldırılmalıydı.",
    approach:
      "Akışı acil durum UX'i üzerine kurdum: en yakın eczane, mesafe ve yol tarifi mümkün olan en az dokunuşla erişilebilir oldu.",
    impact:
      "Uygulama konum tabanlı ve güncel bilgiyle acil eczane arama sürecini daha hızlı ve güvenilir hale getirdi.",
    achievements: [
      {
        title: "hızlı navigasyon akışı",
        desc:
          "Kullanıcının en yakın nöbetçi eczaneyi bulup yol tarifine en fazla iki dokunuşta ulaşmasını hedefledim.",
      },
      {
        title: "gerçek zamanlı konum ve mesafe",
        desc:
          "Kullanıcı ile eczane arasındaki mesafeyi net gösteren konum tabanlı arayüz akışını kurdum.",
      },
      {
        title: "24/7 API entegrasyonu",
        desc:
          "Nöbetçi eczane bilgilerinin acil saatlerde güncel kalması için merkezi API akışını destekledim.",
      },
    ],
  },
};

export const useProjects = () => {
  const { i18n } = useTranslation();

  const data = useMemo(() => {
    const language = i18n.language?.split("-")[0];
    if (language !== "tr") return works;

    return works.map((work) => {
      const translation = trProjects[work.link];
      if (!translation) return work;

      const achievements = translation.achievements
        ? work.achievements?.map((achievement, index) => ({
            ...achievement,
            ...translation.achievements[index],
          }))
        : work.achievements;

      return {
        ...work,
        ...translation,
        achievements,
      };
    });
  }, [i18n.language]);

  return { data, isLoading: false, isError: false, error: null };
};
