import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const bigStats = [
  { value: '4', unit: '万亿', label: '2026 电网投资', sub: '较"十四五"+40%' },
  { value: '6', unit: '万亿', label: '储能 2025 年产值', sub: '六大新兴支柱产业' },
  { value: '10', unit: '万亿+', label: '2030 预期规模', sub: '再翻一番' },
];

const players = [
  { type: '电力央国企', percentage: '42%' },
  { type: '地方国资', percentage: '22%' },
  { type: '储能新能源企业', percentage: '25%' },
  { type: '其他', percentage: '11%' },
];

const Market = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const items = statsRef.current?.querySelectorAll('.fade-up');
      if (items) {
        gsap.fromTo(items,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'expo.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="market" ref={sectionRef} className="relative py-28 lg:py-36 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-6">— MARKET OPPORTUNITY</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.05]">
              万亿赛道<br />
              <span className="text-[#00b49d]">市场机遇</span>。
            </h2>
            <p className="text-base text-gray-500 max-w-md font-light">
              储能是新能源革命下半场的超级赛道<br />
              市场规模爆发式增长。
            </p>
          </div>
        </div>

        {/* Big stat trio — poster style */}
        <div ref={statsRef} className="grid lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 mb-20">
          {bigStats.map((s, i) => (
            <div key={i} className="fade-up bg-white p-10 lg:p-14 group hover:bg-[#0a1f1c] transition-all duration-700">
              <div className="text-xs tracking-[0.3em] text-gray-300 group-hover:text-[#00b49d] mb-8 transition-colors">
                0{i + 1} / 03
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-7xl lg:text-8xl font-black text-[#00b49d] leading-none">{s.value}</span>
                <span className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-white transition-colors">{s.unit}</span>
              </div>
              <div className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors mb-2">{s.label}</div>
              <div className="text-sm text-gray-500 group-hover:text-white/60 transition-colors">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Players composition — minimal bar */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 items-center">
          <div>
            <div className="text-xs tracking-[0.3em] text-[#00b49d] font-medium mb-4">— INDUSTRY PLAYERS</div>
            <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
              独立储能<br />开发商分布
            </h3>
            <p className="text-sm text-gray-500 font-light">
              176 家开发商在册 · 头部效应显著
            </p>
          </div>

          <div className="space-y-5">
            {players.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-700 font-medium">{p.type}</span>
                  <span className="text-[#00b49d] font-bold">{p.percentage}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00b49d] to-[#005c4b] rounded-full"
                    style={{ width: p.percentage }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Market;
