/**
 * Hand-authored site content. Deliberately not backend-driven: these pages
 * change a few times a year, so keeping them here makes every route statically
 * renderable with no API round trip.
 */

export const site = {
    name: "Psikolog Mehmet Aker",
    shortName: "Mehmet Aker",
    title: "Psikolog Mehmet Aker",
    url: "https://mehmetaker.com",
    email: "psikolog@mehmetaker.com",
    address: "Esmira Office Center, Musalla Bağları, Gürsesler Sk. No:7, 42060 Selçuklu/Konya",
    mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.2377066884173!2d32.50094960836339!3d37.894998614630715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d0853e7c9018cf%3A0x9333de5493c8b1e3!2sYans%C4%B1%20Psikoloji!5e0!3m2!1str!2str!4v1788870378677!5m2!1str!2str",
    mapLinkUrl: "https://maps.app.goo.gl/",
    social: {
        instagram: "https://www.instagram.com/psikolog.mehmetaker/",
        linkedin: "https://www.linkedin.com/in/pskmehmetaker/",
    },
    /** Practice Mehmet Aker sees clients at. */
    clinic: {
        name: "Yansı Psikoloji",
        url: "https://konyayansipsikoloji.com/ekibimiz/mehmet-aker",
    },
    /** Newspaper column — an authority signal worth surfacing next to the blog. */
    press: {
        name: "Konya'nın Sesi",
        url: "https://www.konyaninsesi.com.tr/yazar/psk-mehmet-aker/",
    },
} as const;

export const nav = [
    { href: "/hakkimda", label: "Hakkımda" },
    { href: "/calisma-alanlari", label: "Çalışma Alanları" },
    { href: "/yazilar", label: "Yazılar" },
    { href: "/sikca-sorulan-sorular", label: "S.S.S." },
    { href: "/iletisim", label: "İletişim" },
];

export interface WorkArea {
    slug: string;
    title: string;
    audience: "Ergen" | "Yetişkin" | "Ergen ve Yetişkin";
    summary: string;
    /** TODO: replace with copy from Mehmet Aker. */
    body: string[];
}

// NOTE: placeholder copy. Structure is final, wording is not.
export const workAreas: WorkArea[] = [
    {
        slug: "ergen-danismanligi",
        title: "Ergen Danışmanlığı",
        audience: "Ergen",
        summary:
            "Kimlik arayışı, akran ilişkileri ve aile içi çatışmaların yoğunlaştığı 14-18 yaş aralığında bireysel destek.",
        body: [
            "Ergenlik, kimliğin yeniden kurulduğu ve duygusal dalgalanmaların en yoğun yaşandığı dönemdir. Bu süreçte yaşanan zorluklar çoğu zaman geçici değil, yönetilmesi gereken durumlardır.",
            "Danışmanlık sürecinde ergenin kendi sesini bulmasına, duygularını adlandırmasına ve ailesiyle daha sağlıklı bir iletişim kurmasına odaklanıyorum.",
            "Bu bölümün içeriği güncellenecektir.",
        ],
    },
    {
        slug: "kaygi-ve-stres",
        title: "Kaygı ve Stres",
        audience: "Ergen ve Yetişkin",
        summary:
            "Yaygın kaygı, sosyal kaygı ve panik belirtileriyle bilişsel davranışçı terapi temelli çalışma.",
        body: [
            "Kaygı, tehdit algısına verilen doğal bir tepkidir; sorun kaygının varlığı değil, günlük hayatı kısıtlayacak düzeye çıkmasıdır.",
            "Bilişsel davranışçı terapi çerçevesinde kaygıyı sürdüren düşünce ve kaçınma örüntülerini birlikte ele alıyoruz.",
            "Bu bölümün içeriği güncellenecektir.",
        ],
    },
    {
        slug: "sinav-kaygisi",
        title: "Sınav Kaygısı",
        audience: "Ergen",
        summary:
            "Hazırlık sürecinde performansı düşüren kaygıyı yönetmek ve çalışma düzenini yeniden kurmak.",
        body: [
            "Sınav kaygısı yalnızca sınav anında değil, aylar süren hazırlık döneminin tamamında etkisini gösterir.",
            "Çalışma sürecinde odaklanmayı bozan düşünceler, erteleme davranışı ve beklenti baskısı üzerine çalışıyoruz.",
            "Bu bölümün içeriği güncellenecektir.",
        ],
    },
    {
        slug: "depresyon-ve-duygudurum",
        title: "Depresyon ve Duygudurum",
        audience: "Yetişkin",
        summary:
            "İsteksizlik, değersizlik hissi ve geri çekilme belirtileriyle yapılandırılmış bireysel terapi.",
        body: [
            "Depresyon, kişinin kendisine ve geleceğine dair bakışını değiştiren; enerji ve motivasyonu belirgin şekilde düşüren bir tablodur.",
            "Terapide hem düşünce örüntülerini hem de gündelik yaşam düzenini kademeli olarak ele alıyoruz.",
            "Bu bölümün içeriği güncellenecektir.",
        ],
    },
    {
        slug: "iliski-ve-iletisim",
        title: "İlişki ve İletişim",
        audience: "Yetişkin",
        summary:
            "Romantik ilişkiler, aile ve iş ortamında tekrarlayan çatışma örüntüleri üzerine çalışma.",
        body: [
            "İlişkilerde tekrar eden çatışmalar çoğu zaman kişinin farkında olmadığı iletişim kalıplarından beslenir.",
            "Bu kalıpları görünür kılmak, sınır koymayı öğrenmek ve ihtiyaçları ifade edebilmek üzerine çalışıyoruz.",
            "Bu bölümün içeriği güncellenecektir.",
        ],
    },
    {
        slug: "ozguven-ve-kisisel-gelisim",
        title: "Özgüven ve Kişisel Gelişim",
        audience: "Ergen ve Yetişkin",
        summary:
            "Kendilik değeri, erteleme ve karar verme güçlüğü gibi alanlarda destekleyici çalışma.",
        body: [
            "Özgüven, sabit bir kişilik özelliği değil; deneyimle birlikte değişen bir kendilik algısıdır.",
            "Kişinin kendine yönelttiği eleştirel iç sesi tanıması ve daha gerçekçi bir öz değerlendirme kurması üzerine çalışıyoruz.",
            "Bu bölümün içeriği güncellenecektir.",
        ],
    },
];

export const faqs = [
    {
        question: "Terapiye başlamak için bir tanı almam gerekiyor mu?",
        answer: "Hayır. Terapi yalnızca tanı almış kişiler için değildir. Zorlandığınız bir durum, karar veremediğiniz bir konu ya da kendinizi daha iyi anlama isteği de başvurmak için yeterli sebeplerdir.",
    },
    {
        question: "Bir seans ne kadar sürüyor?",
        answer: "Görüşmeler ortalama 50 dakika sürmektedir. İlk görüşme, geçmişinizi ve başvuru sebebinizi ayrıntılı konuşabilmek adına biraz daha uzun sürebilir.",
    },
    {
        question: "Ne sıklıkla görüşülüyor?",
        answer: "Sürecin başında genellikle haftada bir görüşme yapılır. İlerleyen dönemde ihtiyaca göre sıklık birlikte yeniden değerlendirilir.",
    },
    {
        question: "Görüşmelerde konuştuklarımız gizli kalıyor mu?",
        answer: "Evet. Seans içeriği meslek etiği ve yasal düzenlemeler çerçevesinde gizlidir. Bu gizliliğin istisnaları (kişinin kendisi veya bir başkası için ciddi risk oluşturan durumlar) ilk görüşmede açıkça paylaşılır.",
    },
    {
        question: "Kaç seans sürecek?",
        answer: "Bu, başvuru sebebine ve çalışma hedeflerine göre değişir. Bazı konularda birkaç görüşme yeterli olurken, bazı süreçler daha uzun sürebilir. İlk görüşmelerin ardından öngörülen bir çerçeve paylaşılır.",
    },
    {
        question: "18 yaşından küçüğüm, kendim başvurabilir miyim?",
        answer: "18 yaş altı danışanlar için sürecin ebeveyn bilgisi ve onayı ile başlatılması gerekmektedir. Görüşmelerin içeriği ise ergenin mahremiyeti gözetilerek yürütülür.",
    },
];
