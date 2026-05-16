import { useEffect, useRef } from 'react';
import { Leaf, FileText, Shield, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const policies = [
  { icon: Leaf,     date: '2020', code: '3060',     title: '双碳目标',   line: '2030 碳达峰 · 2060 碳中和' },
  { icon: FileText, date: '2024', code: '136 号文', title: '配储革新',   line: '取消强制配储 · 市场化转型' },
  { icon: Shield,   date: '2025', code: '114 号文', title: '容量电价',   line: '完整收益版图成型' },
  { icon: Zap,      date: '2025', code: '行动方案', title: '规模化建设', line: '80GW+ 装机 · 2500 亿投资' },
];

const Policy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const cards = cardsRef.current?.querySelectorAll('.policy-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="policy" ref={sectionRef} className="relative py-28 lg:py-36 bg-[#f5f5f5] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-6">— NATIONAL POLICY</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.05]">
              国家能源<br />
              <span className="text-[#00b49d]">战略机遇</span>。
            </h2>
            <p className="text-base text-gray-500 max-w-md font-light">
              双碳战略引领能源革命<br />
              新型储能列入六大新兴支柱产业。
            </p>
          </div>
        </div>

        {/* Timeline cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 mb-16">
          {policies.map((p, i) => (
            <div key={i} className="policy-card group bg-white p-8 lg:p-10 hover:bg-[#0a1f1c] transition-all duration-700 relative overflow-hidden">
              {/* Year */}
              <div className="text-xs tracking-[0.3em] text-gray-300 group-hover:text-[#00b49d] mb-8 transition-colors">
                {p.date}
              </div>

              {/* Icon */}
              <p.icon className="w-8 h-8 text-[#00b49d] mb-6" />

              {/* Code */}
              <div className="text-sm font-medium text-[#00b49d] mb-2 tracking-wider">{p.code}</div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                {p.title}
              </h3>

              {/* Line */}
              <p className="text-sm text-gray-500 group-hover:text-white/60 transition-colors">
                {p.line}
              </p>
            </div>
          ))}
        </div>

        {/* Revenue model — minimal triple stat */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 grid md:grid-cols-3 gap-8 shadow-sm border border-gray-100">
          {[
            { p: '30%', t: '容量电价', s: '稳定保底收益' },
            { p: '60-70%', t: '市场化收益', s: '电能量+辅助服务' },
            { p: '5-10%', t: '其他补贴', s: '地方政策赋能' },
          ].map((r, i) => (
            <div key={i} className={`${i !== 0 ? 'md:border-l border-gray-100 md:pl-8' : ''}`}>
              <div className="text-5xl lg:text-6xl font-black text-[#00b49d] mb-2 leading-none">{r.p}</div>
              <div className="text-lg font-bold text-gray-900 mb-1">{r.t}</div>
              <div className="text-sm text-gray-500">{r.s}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Policy;
