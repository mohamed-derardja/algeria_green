"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "EN" | "AR" | "FR";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Nav
    nav_home: "Home",
    nav_gis: "GIS Console",
    nav_portal: "Citizen Portal",
    nav_roadmap: "Roadmap",
    nav_log_tree: "Log Tree",
    nav_search_placeholder: "Search Wilaya (e.g. Batna)...",

    // Hero
    hero_badge: "Sentinel-2 Multispectral Orbit Active",
    hero_title_1: "Monitoring Algeria's Reforestation Era",
    hero_title_2: "From Space to Soil",
    hero_desc: "Integrated satellite telemetry, AI forest canopy health diagnostics, and community citizen science monitoring across 58 Wilayas.",
    hero_cta_map: "Explore Interactive Satellite Map",
    hero_cta_log: "Log Tree Specimen",
    hero_stat_trees: "Trees Planted (2020-2026)",
    hero_stat_wilayas: "Wilayas Monitored",
    hero_stat_canopy: "Canopy Health Index",
    hero_stat_satellite: "Satellite Orbit Accuracy",

    // Time-Lapse
    timelapse_badge: "16-Year Satellite Time-Lapse (2010 vs 2026)",
    timelapse_title: "Historical Vegetation Time-Lapse Comparison",
    timelapse_desc: "Drag the interactive slider handle to compare historical satellite imagery against present-day Sentinel-2 multispectral canopy density.",

    // AI Scanner
    scanner_badge: "AI Computer Vision Scanner",
    scanner_title: "Instant Tree Species Recognition & Health Diagnostic",
    scanner_desc: "Test our neural network computer vision model trained on over 50,000 Algerian flora field observations.",
    scanner_scan_btn: "Scan Photo",
    scanner_upload_title: "Upload Custom Leaf or Bark Photo",
    scanner_confidence: "AI Confidence",
    scanner_vitality: "Vitality",

    // Initiatives
    init_title: "National Environmental Pillars",
    init_subtitle: "Key strategic initiatives protecting Algeria's biomes from desertification to mountain crests.",
    init_1_title: "Barrage Vert 2.0 (Green Dam)",
    init_1_desc: "Restoring the 1,500km anti-desertification pine and esparto forest barrier across Djelfa, M'Sila, and Laghouat.",
    init_2_title: "Aurès Cedar Protection",
    init_2_desc: "Conservation of endemic Atlas Cedar (Cedrus atlantica) forests across Batna and Khenchela massifs.",
    init_3_title: "Satellite Thermal Alert",
    init_3_desc: "Real-time thermal anomaly monitoring to prevent forest fires across Kabylie coastal pine forests.",
    init_4_title: "Citizen Reforestation Hub",
    init_4_desc: "Empowering Algerian youth and universities to geotag sapling plantings with mobile GPS telemetry.",

    // Wilayas
    wilaya_title: "58 Algerian Wilayas GIS Explorer",
    wilaya_desc: "Explore forest cover density, active reforestation missions, and species distribution by province.",
    wilaya_search_placeholder: "Filter Wilaya by Name or Code...",
    wilaya_all: "All Eco-Zones",

    // Citizen CTA
    citizen_title: "Be Part of Algeria's 100-Million Trees Reforestation Era",
    citizen_desc: "Empower your local community! Log mature trees, plant nurseries, and native forest specimens directly from your phone.",
    citizen_adopt_btn: "Adopt a Tree & Claim Digital Certificate",

    // Timeline
    timeline_title: "Reforestation Progress Roadmap (2020 - 2030)",
    timeline_desc: "Milestones achieved in expanding Algeria's green belt, satellite telemetry, and community participation.",

    // Footer
    footer_desc: "National GIS & Citizen Science platform monitoring forest canopy health, desertification prevention, and community tree planting across Algeria's 58 Wilayas.",
    footer_rights: "Republic of Algeria National Reforestation GIS Platform. All rights reserved.",
  },
  AR: {
    // Nav
    nav_home: "الرئيسية",
    nav_gis: "منصة GIS",
    nav_portal: "بوابة المتطوعين",
    nav_roadmap: "خارطة الطريق",
    nav_log_tree: "غرس شجرة",
    nav_search_placeholder: "ابحث عن ولاية (مثلاً باتنة)...",

    // Hero
    hero_badge: "القمر الصناعي Sentinel-2 نشط",
    hero_title_1: "مراقبة حقبة إعادة التشجير في الجزائر",
    hero_title_2: "من الفضاء إلى التربة",
    hero_title_full: "مراقبة حقبة التشجير الكبرى في الجزائر من الفضاء إلى التربة",
    hero_desc: "نظام قياس عن بُعد متكامل بالأقمار الصناعية، تشخيص بالذكاء الاصطناعي لغطاء الغابات، ومراقبة مجتمعية عبر 58 ولاية.",
    hero_cta_map: "استكشف الخريطة التفاعلية",
    hero_cta_log: "تسجيل شجرة جديدة",
    hero_stat_trees: "الأشجار المغروسة (2020-2026)",
    hero_stat_wilayas: "ولاية تحت المراقبة",
    hero_stat_canopy: "مؤشر صحة الغطاء النباتي",
    hero_stat_satellite: "دقة المسح الفضائي",

    // Time-Lapse
    timelapse_badge: "مقارنة عبر الأقمار الصناعية (2010 مقابل 2026)",
    timelapse_title: "مقارنة نمو الغطاء النباتي عبر 16 عاماً",
    timelapse_desc: "اسحب شريط المقارنة لمشاهدة صور الأقمار الصناعية التاريخية مقابل كثافة الغطاء النباتي الحالية من Sentinel-2.",

    // AI Scanner
    scanner_badge: "ماسح الرؤية الحاسوبية بالذكاء الاصطناعي",
    scanner_title: "التعرف الفوري على أنواع الأشجار وتشخيص صحتها",
    scanner_desc: "اختبر نموذج الشبكة العصبية المدرب على أكثر من 50,000 عينة نباتية من الميدان في الجزائر.",
    scanner_scan_btn: "فحص الصورة",
    scanner_upload_title: "رفع صورة أوراق أو لحاء شجرة",
    scanner_confidence: "دقة الذكاء الاصطناعي",
    scanner_vitality: "الحيوية",

    // Initiatives
    init_title: "المحاور البيئية الوطنية الكبرى",
    init_subtitle: "مبادرات استراتيجية لحماية الأنظمة البيئية في الجزائر من السد الأخضر إلى قمم الجبال.",
    init_1_title: "السد الأخضر 2.0 (Barrage Vert)",
    init_1_desc: "إعادة إحياء الحزام الشجري المقاوم للتصحر بطول 1500 كم عبر الجلفة، المسيلة، والأغواط.",
    init_2_title: "حماية أرز الأوراس (Batna)",
    init_2_desc: "حماية غابات الأرز الأطلسي النادرة عبر مرتفعات باتنة وخنشلة.",
    init_3_title: "الإنذار الحراري الفضائي",
    init_3_desc: "مراقبة التغيرات الحرارية الفورية لمنع حرائق الغابات في جبال جرجرة والقبائل.",
    init_4_title: "شبكة التشجير المجتمعي",
    init_4_desc: "تمكين الشباب والجامعات الجزائرية من توثيق غرائس الأشجار بنظام الموقع الجغرافي GPS.",

    // Wilayas
    wilaya_title: "مستكشف 58 ولاية جزائرية GIS",
    wilaya_desc: "استكشف كثافة الغطاء الغابي، حملات التشجير النشطة، وتوزيع الأنواع النباتية حسب كل ولاية.",
    wilaya_search_placeholder: "تصفية الولايات بالاسم أو الرقم...",
    wilaya_all: "جميع المناطق البيئية",

    // Citizen CTA
    citizen_title: "كن جزءاً من حقبة غرس 100 مليون شجرة في الجزائر",
    citizen_desc: "ساهم في مجتمعك المحلي! قم بتسجيل الأشجار والشتلات مباشرة من هاتفك الذكي وتوثيقها عبر الأقمار الصناعية.",
    citizen_adopt_btn: "تبني شجرة والحصول على شهادة رقمية",

    // Timeline
    timeline_title: "خارطة طريق تقدم التشجير (2020 - 2030)",
    timeline_desc: "المحطات التاريخية المحققة في توسيع الحزام الأخضر وتتبع الأقمار الصناعية والمشاركة الشعبية.",

    // Footer
    footer_desc: "المنصة الوطنية للرصد الفضائي والمواطنة البيئية لمتابعة صحة الغابات ومكافحة التصحر عبر 58 ولاية جزائرية.",
    footer_rights: "الجمهورية الجزائرية - المنصة الوطنية لنظم المعلومات الجغرافية. جميع الحقوق محفوظة.",
  },
  FR: {
    // Nav
    nav_home: "Accueil",
    nav_gis: "Console SIG",
    nav_portal: "Portail Citoyen",
    nav_roadmap: "Feuille de Route",
    nav_log_tree: "Planter Arbre",
    nav_search_placeholder: "Rechercher une Wilaya (ex. Batna)...",

    // Hero
    hero_badge: "Orbite Sentinel-2 Multispectrale Active",
    hero_title_1: "Surveillance de l'Ère de Reforestration",
    hero_title_2: "De l'Espace au Sol Algérien",
    hero_desc: "Télémétrie satellite intégrée, diagnostic IA de la santé du couvert forestier et suivi citoyen à travers 58 Wilayas.",
    hero_cta_map: "Explorer la Carte Satellite",
    hero_cta_log: "Enregistrer un Spécimen",
    hero_stat_trees: "Arbres Plantés (2020-2026)",
    hero_stat_wilayas: "Wilayas Surveillées",
    hero_stat_canopy: "Indice Santé Canopée",
    hero_stat_satellite: "Précision Télémétrie",

    // Time-Lapse
    timelapse_badge: "Comparaison Satellite 16 Ans (2010 vs 2026)",
    timelapse_title: "Évolution Historique du Couvert Végétal",
    timelapse_desc: "Faites glisser le curseur pour comparer l'imagerie satellite historique avec la densité multispectrale actuelle Sentinel-2.",

    // AI Scanner
    scanner_badge: "Scanner IA de Vision par Ordinateur",
    scanner_title: "Reconnaissance d'Espèces & Diagnostic de Santé",
    scanner_desc: "Testez notre réseau de neurones entraîné sur plus de 50 000 observations de la flore algérienne.",
    scanner_scan_btn: "Analyser la Photo",
    scanner_upload_title: "Charger une Photo de Feuille ou d'Écorce",
    scanner_confidence: "Confiance IA",
    scanner_vitality: "Vitalité",

    // Initiatives
    init_title: "Piliers Environnementaux Nationaux",
    init_subtitle: "Initiatives stratégiques pour protéger les biomes algériens contre la désertification.",
    init_1_title: "Barrage Vert 2.0",
    init_1_desc: "Restauration de la barrière forestière anti-désertification de 1 500 km à travers Djelfa, M'Sila et Laghouat.",
    init_2_title: "Protection du Cèdre de l'Aurès",
    init_2_desc: "Conservation des forêts de Cèdre de l'Atlas (Cedrus atlantica) dans les massifs de Batna et Khenchela.",
    init_3_title: "Alerte Thermique Satellite",
    init_3_desc: "Détection des anomalies thermiques en temps réel pour prévenir les incendies en Kabylie.",
    init_4_title: "Reforestation Citoyenne",
    init_4_desc: "Mobilisation de la jeunesse et des universités algériennes avec géolocalisation GPS mobile.",

    // Wilayas
    wilaya_title: "Explorateur SIG des 58 Wilayas d'Algérie",
    wilaya_desc: "Explorez la couverture forestière, les missions de reboisement et les espèces par province.",
    wilaya_search_placeholder: "Filtrer les Wilayas par nom ou code...",
    wilaya_all: "Toutes les Éco-Zones",

    // Citizen CTA
    citizen_title: "Participez à l'Ére des 100 Millions d'Arbres en Algérie",
    citizen_desc: "Mobilisez votre communauté ! Enregistrez des arbres et pépinières directement depuis votre téléphone.",
    citizen_adopt_btn: "Adopter un Arbre & Obtenir un Certificat",

    // Timeline
    timeline_title: "Feuille de Route du Reboisement (2020 - 2030)",
    timeline_desc: "Jalons franchis dans l'extension du Barrage Vert et la télémétrie satellite.",

    // Footer
    footer_desc: "Plateforme nationale SIG et scientifique citoyenne pour la surveillance des forêts et la lutte contre la désertification.",
    footer_rights: "République Algérienne - Plateforme Nationale SIG de Reboisement. Tous droits réservés.",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "EN",
  setLanguage: () => {},
  dir: "ltr",
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (language === "AR") {
      htmlElement.setAttribute("dir", "rtl");
      htmlElement.setAttribute("lang", "ar");
    } else {
      htmlElement.setAttribute("dir", "ltr");
      htmlElement.setAttribute("lang", language.toLowerCase());
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["EN"]?.[key] || key;
  };

  const dir = language === "AR" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
