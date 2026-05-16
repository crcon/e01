import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2025', label: '固本强基', metric: '10', unit: 'GWh' },
  { year: '2026', label: '外部拓展', metric: '20', unit: 'GWh' },
  { year: '2027', label: '多元发展', metric: '40', unit: 'GWh' },
  { year: '2028', label: '国内 TOP 1', metric: 'TOP 1', unit: '' },
  { year: '2030', label: '全球第一', metric: '100', unit: 'GWh' },
];

const VisionPoster = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.fade-up') || [],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0a1f1c] text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src="./images/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f1c] via-[#0a1f1c]/85 to-[#0a1f1c]" />
      </div>
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#00b49d]/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-44">
        {/* Top label */}
        <div className="fade-up text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-6">
          — FIVE-YEAR VISION
        </div>

        {/* Massive headline */}
        <h2 className="fade-up text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] tracking-tight mb-8">
          2030<br />
          <span className="text-[#00b49d]">全球第一</span>
        </h2>

        {/* Subtitle */}
        <p className="fade-up text-xl lg:text-2xl text-white/60 max-w-2xl mb-20 lg:mb-28 font-light">
          三年倍增 · 五年领跑 · 成为全球储能全产业链<br className="hidden lg:block" />价值创造标杆。
        </p>

        {/* Timeline */}
        <div className="fade-up relative">
          {/* horizontal line */}
          <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b49d]/40 to-transparent hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12">
            {milestones.map((m, i) => (
              <div key={i} className="relative text-center">
                {/* Dot */}
                <div className="hidden md:flex absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00b49d] items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full bg-[#00b49d]/30 animate-ping" />
                </div>

                <div className="text-xs tracking-[0.25em] text-white/40 mb-2">{m.year}</div>
                <div className="text-base text-[#00b49d] font-medium mb-4 md:mt-12">{m.label}</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl lg:text-5xl font-black">{m.metric}</span>
                  {m.unit && <span className="text-base text-white/50 font-semibold">{m.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer mark */}
        <div className="fade-up mt-20 lg:mt-28 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-3xl lg:text-4xl font-bold mb-2">
              350 <span className="text-base text-[#00b49d]">亿元 · 营收</span>
              <span className="mx-4 text-white/20">|</span>
              60 <span className="text-base text-[#00b49d]">亿元 · 净利</span>
            </div>
            <div className="text-sm text-white/40">2030 年核心财务目标</div>
          </div>
          <div className="text-xs text-white/40 tracking-wider">
            CAGR · 装机 49.4% · 营收 33.7% · 净利 39.2%
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionPoster;
