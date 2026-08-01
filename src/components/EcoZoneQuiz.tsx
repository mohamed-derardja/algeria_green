"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HelpCircle, Check, ArrowRight, RotateCcw, Trees, Sparkles } from "lucide-react";

interface Question {
  id: number;
  title: string;
  titleAr: string;
  options: { label: string; labelAr: string; value: string }[];
}

export default function EcoZoneQuiz() {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      title: "What eco-zone is your targeted Wilaya located in?",
      titleAr: "في أي منطقة بيئية تقع ولايتك المستهدفة؟",
      options: [
        { label: "Aurès & High Eastern Massifs (Batna, Khenchela)", labelAr: "مرتفعات الأوراس (باتنة، خنشلة)", value: "aures" },
        { label: "High Plateaus Steppe Belt (Djelfa, M'Sila)", labelAr: "الهضاب العليا والسد الأخضر (الجلفة، المسيلة)", value: "steppe" },
        { label: "Coastal Mountain Forests (Tizi Ouzou, Béjaïa)", labelAr: "الغابات الساحلية والجبلية (تيزي وزو، بجاية)", value: "coast" },
        { label: "Saharan Oasis Region (Biskra, El Oued)", labelAr: "الواحات والواحات الصحراوية (بسكرة، الوادي)", value: "oasis" },
      ],
    },
    {
      id: 2,
      title: "What is your primary ecological objective?",
      titleAr: "ما هو هدفك البيئي الرئيسي؟",
      options: [
        { label: "Anti-Desertification & Sand Dune Barrier", labelAr: "مكافحة التصحر وصد زحف الرمال", value: "barrier" },
        { label: "High Altitude Biodiversity & Cedar Protection", labelAr: "حماية أرز الجبال والمحميات النادرة", value: "conservation" },
        { label: "Cork Oak Harvesting & Forest Cover", labelAr: "إنتاج الفلين وحماية الغطاء الغابي", value: "cork" },
        { label: "Oasis Agriculture & Date Shade Canopy", labelAr: "زراعة الواحات وظلال النخيل", value: "palm" },
      ],
    },
  ];

  const handleSelectOption = (value: string) => {
    const nextAnswers = { ...answers, [step]: value };
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setCompleted(false);
  };

  const getRecommendedSpecies = () => {
    const val = answers[0];
    if (val === "aures") {
      return {
        name: "Atlas Cedar (Cedrus atlantica)",
        nameAr: "أرز أطلسي",
        desc: "Native to Batna Aurès massifs. High frost tolerance, majestic canopy, and endemic species status.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYEVJaROsbNd7wCNM3d-Jf4-lZCYfAd29ba5dclY1G_aP6Eu7nC7uTSZ7SV0ZYx3zlCrO5nACG0sWxPuAEFBPzMOTt95la9FUa4P1oHztIO-9wFLNnx5rxGACw4YBSOWoMVvCiXvwMuf9ljv9I1i19-WKd63ahMrrTiTw4__bBUk0nK1Dd4SLD2mZGV6Cq3ek5bC7Q8Dp29-mMlO2SiJtn96k3RWuKUpgevcif02CseGZ865xq7l8H",
      };
    } else if (val === "steppe") {
      return {
        name: "Aleppo Pine (Pinus halepensis)",
        nameAr: "صنوبر حلب",
        desc: "Primary barrier species of Barrage Vert 2.0 (Djelfa). Extremely drought resistant with 95% seedling survival rate.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK3yMIhfOIb34gt1p30d-Wh6wGcUUJPDmtZ46KNoqM5nJgDhYyd5V0mHBuJuOffsWaSt-s4O0YFfxjJZiEPo7kXXwP-W7VejokvO_Du_kZU7jKucQWbLZ6vvaWu1jbAkhjoc70DyPtYMN7S72BICh48Ts9rexwqxBPzWQCF9i0e2I4hC7FYJiJ0JH91J45a4yXr6A3WPsE9zwPN61iwir6xyKXSkn5dGEIlPjGcqMkwfQbRoXZOdUZ",
      };
    } else if (val === "coast") {
      return {
        name: "Cork Oak (Quercus suber)",
        nameAr: "بلوط الفلين",
        desc: "Thrives across Kabylie coastal mountains (Tizi Ouzou/Béjaïa). High ecological and economic value.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB2LTQX6SBomOQ2sIRZqTN7JKL1ljiHIrTvRaSs8hlR-E7caJA6inpasUkcVzuY9AT2fWEX_tOgCL_a_KJjd6-XE6rxSES2PZiuvDTYAiERaqk8Qn3eD_zTCn_5WRLWWW1MxTgBVAOIG212EmpGNUUN2cCT8e1BQDPIUHg0LqHvfy37mW9savR6vpmy_ZK-icY6L2RGHx0NjLPV4uN0PLAHul4VS2ZhAUcvLEaydC01dYXrWHz4c-o",
      };
    } else {
      return {
        name: "Date Palm (Phoenix dactylifera)",
        nameAr: "نخيل التمر",
        desc: "Essential oasis biome species for Ziban (Biskra). Provides micro-climate shade and soil stabilization.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMH0ECkHqkEsXHfyZwi3yBsh7o_IOsOCc16WWhPMyG40sPgPOZ139p_OLEH7ojdSYffj_OaBEUHySWwYFcTXJ9Ad7HWtA5ICWA8zSGGAvHskWgm5duRW7y2qou0oqcKDxxrZzkyYUgSugVOH82rR0vQDtV-zIBsNvL3VcOb_yTXTmOxJFK6vJLNSXvNxJGEdglD0-GpjmyDFrrJixr0vXgz6huDmK_0-1aG4NxH78vXgDkTJFSJ2L3",
      };
    }
  };

  const recommendation = getRecommendedSpecies();

  return (
    <div className="glass-card p-6 rounded-3xl border border-primary/30 shadow-xl bg-surface/95 dark:bg-surface-container-high/95">
      <div className="flex justify-between items-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-fixed text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" /> Algerian Eco-Zone Quiz
        </span>
        <span className="text-xs font-mono font-bold text-on-surface-variant">
          Step {completed ? 2 : step + 1} of 2
        </span>
      </div>

      {!completed ? (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="font-title-md text-base text-on-surface font-bold">
            {questions[step].title}
          </h3>

          <div className="space-y-2.5">
            {questions[step].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelectOption(opt.value)}
                className="w-full text-left p-3.5 rounded-2xl bg-surface-container dark:bg-surface-container-highest hover:bg-primary/10 border border-outline-variant/30 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-on-surface block group-hover:text-primary">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-arabic">
                    {opt.labelAr}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>

          <span className="text-xs font-mono font-bold text-primary uppercase block">
            Recommended Native Algerian Specimen
          </span>

          <div className="p-4 rounded-2xl border border-primary/40 bg-surface-container dark:bg-surface-container-highest space-y-3">
            <img
              src={recommendation.img}
              alt={recommendation.name}
              className="w-full h-36 rounded-xl object-cover border border-outline-variant/30"
            />
            <h4 className="font-title-md text-lg font-bold text-on-surface">
              {recommendation.name} ({recommendation.nameAr})
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {recommendation.desc}
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href="/citizen-portal"
              className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-all cursor-pointer font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Trees className="w-4 h-4" /> Adopt &amp; Log Specimen
            </a>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-surface-container-high text-on-surface rounded-xl font-title-md text-xs hover:bg-outline-variant transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-4 h-4" /> Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
