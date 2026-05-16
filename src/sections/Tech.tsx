import { useEffect, useRef } from 'react';
import { Cpu, BrainCircuit, Shield, Zap, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techPillars = [
  { num: '01', icon: Cpu,          title: '3S 核心系统',  en: 'EMS / BMS / PCS', metric: '87 项', sub: '核心专利 · 完全自主' },
  { num: '02', icon: BrainCircuit, title: 'AI 智能运营',  en: 'Smart Operation',  metric: '88%',  sub: '充放电效率 · 行业领先' },
  { num: '03', icon: Shield,       title: '四维安全防护', en: 'Zero Thermal',     metric: 'SIL 2', sub: '安全等级 · 零热失控' },
  { num: '04', icon: Zap,          title: '智能制造',    en: 'Manufacturing',    metric: '30 GWh', sub: '年产能 · 工业 4.0' },
];

const honors = [
  '最佳储能投资运营奖', '储能行业领导品牌',
  'AAA 级信用企业', '北极星杯优秀投资运营',
  '碳中和承诺示范单位', '绿色低碳信用 AAA',
  '科技应用服务一级资质', '能源管理服务一级资质',
];

const metrics = [
  { v: '87',    u: '项',    l: '核心专利' },
  { v: '≤150',  u: 'ms',    l: 'EMS 响应时间' },
  { v: '99.5',  u: '%',     l: '设备可用率' },
  { v: '98',    u: '%',     l: '系统循环效率' },
];

const Tech = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pillarRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const cards = pillarRef.current?.querySelectorAll('.pillar');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: pillarRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
        );
      }
      const ms = metricRef.current?.querySelectorAll('.metric');
      if (ms) {
        gsap.fromTo(ms,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: metricRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tech" ref={sectionRef} className="relative py-28 lg:py-40 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24">
          <div className="text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-6">— TECHNOLOGY</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.05]">
              硬核科技<br />
              <span className="text-[#00b49d]">数智平台</span>。
            </h2>
            <p className="text-base text-gray-500 max-w-md font-light">
              自研 3S 核心 · AI 驱动数智运营<br />
              87 项专利构建深厚技术护城河。
            </p>
          </div>
        </div>

        {/* Four pillars */}
        <div ref={pillarRef} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 mb-20">
          {techPillars.map((p) => (
            <div key={p.num} className="pillar group bg-white p-8 lg:p-10 hover:bg-[#0a1f1c] transition-all duration-700 relative overflow-hidden">
              <div className="text-xs tracking-[0.25em] text-gray-300 group-hover:text-[#00b49d] mb-8 transition-colors">
                {p.num} / 04
              </div>
              <p.icon className="w-9 h-9 text-[#00b49d] mb-8" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-white transition-colors mb-1">
                {p.title}
              </h3>
              <div className="text-xs tracking-[0.2em] text-[#00b49d] mb-8">{p.en}</div>
              <div className="pt-6 border-t border-gray-100 group-hover:border-white/15 transition-colors">
                <div className="text-3xl lg:text-4xl font-black text-gray-900 group-hover:text-[#00b49d] mb-1 transition-colors">
                  {p.metric}
                </div>
                <div className="text-xs text-gray-400 group-hover:text-white/50 transition-colors">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Metrics row */}
        <div ref={metricRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {metrics.map((m, i) => (
            <div key={i} className="metric border-l-2 border-[#00b49d] pl-5 py-2">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl lg:text-5xl font-black text-gray-900">{m.v}</span>
                <span className="text-base text-[#00b49d] font-bold">{m.u}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">{m.l}</div>
            </div>
          ))}
        </div>

        {/* Honors strip */}
        <div className="bg-gradient-to-br from-[#0a1f1c] via-[#0d2a26] to-[#005c4b] rounded-3xl p-10 lg:p-14 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#00b49d]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10">
            <div className="text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-4">— HONORS</div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                行业荣誉<br />与<span className="text-[#a8f0e8]">资质认证</span>
              </h3>
              <p className="text-sm text-white/50 max-w-md font-light">
                2025 年度行业荣誉 · 多项国家级一级资质<br />企业信用与诚信认证全面领先
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {honors.map((h, i) => (
                <div key={i} className="flex items-center gap-2.5 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                  <Award className="w-4 h-4 text-[#00b49d] flex-shrink-0" />
                  <span className="text-sm text-white/90 leading-tight">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Tech;
