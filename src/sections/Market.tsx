import { useEffect, useRef, useState } from 'react';
import { Zap, ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlight = (text: string) => {
  const parts = text.split(/(\d+(?:\.\d+)?%)/g);
  return parts.map((part, i) =>
    /^\d+(?:\.\d+)?%$/.test(part)
      ? <span key={i} className="text-red-400 font-black text-base tracking-tight">{part}</span>
      : part
  );
};

const gridDetail = {
  title: '国家电网"十五五"4万亿投资',
  en: 'State Grid 2026–2030',
  positioning: '国家电网"十五五"期间计划投资约4万亿元，年均约8000亿元，较"十四五"增长约40%。本质不是传统基建刺激，而是面向新型电力系统的战略性前置布局——从"传统基建"转向"新质生产力"，从"拉动投资"转向"重构能源与产业底座"。',
  coreBusiness: [
    { title: '配电网革命', desc: '约2.48万亿元，占比约63%，本轮最大主战场。传统配网从"单向供电末端"升级为"源网荷储互动平台"，支撑分布式新能源、充电桩、储能和虚拟电厂接入。' },
    { title: '骨干网架强化', desc: '约9850亿元，占比约25%，强化500kV及以上主网架，提升安全性和灵活性。' },
    { title: '特高压建设', desc: '约4900亿元，占比约12%，建设跨区输电通道，服务"西电东送、北电南供"。' },
    { title: '数字化智能化', desc: '贯穿全域，重点发展AI调度、数字孪生、负荷预测、设备预测性维护和电力大模型。' },
    { title: '储能与系统调节', desc: '支持抽水蓄能、电化学储能、液流电池、压缩空气储能等多种形式，提升系统灵活调节能力。' },
  ],
  innovation: [
    '容量租赁 + 现货套利 + 辅助服务',
    '容量补偿机制',
    '项目 IRR 8%—12%',
    '电网侧独立储能需求提升',
    '配电网升级新场景',
    '零碳园区综合能源',
    '虚拟电厂聚合运营',
    'AI 数智运营竞争关键',
    '工商业园区储能落地',
    'AIDC 数据中心供电',
  ],
  advantage: '国家电网4万亿投资的核心，是围绕能源安全、新能源消纳、终端电气化和产业升级建设新型电力系统。投资重点转向配电网革命、数字化智能化和系统调节能力——独立储能将成为其中最具成长性的关键基础设施，逐步形成容量租赁、现货套利、辅助服务、容量补偿的多元收益结构。',
  metric: { v: '4', u: '万亿 · 年均8000亿' },
};

const bigStats = [
  { value: '4', unit: '万亿', label: '2026 电网投资', sub: '较"十四五"+40%', clickable: true },
  { value: '6', unit: '万亿', label: '储能 2025 年产值', sub: '六大新兴支柱产业', clickable: false },
  { value: '10', unit: '万亿+', label: '2030 预期规模', sub: '再翻一番', clickable: false },
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
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    if (open && panelRef.current) {
      const panel = panelRef.current;
      const inner = panel.querySelector('.panel-inner');
      const blocks = panel.querySelectorAll('.panel-anim');
      gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      if (inner) gsap.fromTo(inner, { y: 30, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
      gsap.fromTo(blocks, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.15, ease: 'expo.out' });
    }
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

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

        {/* Big stat trio */}
        <div ref={statsRef} className="grid lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 mb-20">
          {bigStats.map((s, i) => (
            <div
              key={i}
              onClick={() => s.clickable && setOpen(true)}
              className={`fade-up bg-white p-10 lg:p-14 group transition-all duration-700 relative overflow-hidden
                ${s.clickable ? 'cursor-pointer hover:bg-[#0a1f1c]' : 'hover:bg-[#0a1f1c]'}`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-8">
                <div className="text-xs tracking-[0.3em] text-gray-300 group-hover:text-[#00b49d] transition-colors">
                  0{i + 1} / 03
                </div>
                {s.clickable && (
                  <div className="w-9 h-9 rounded-full border border-gray-200 group-hover:border-[#00b49d] flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#00b49d] group-hover:rotate-45 transition-all" />
                  </div>
                )}
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

        {/* Players composition */}
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

      {/* Detail Panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="panel-inner relative bg-[#0a1f1c] text-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 lg:top-8 lg:right-8 w-11 h-11 rounded-full border border-white/20 hover:border-[#00b49d] hover:bg-[#00b49d]/10 flex items-center justify-center transition-all z-10"
              aria-label="关闭"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 lg:p-16">
              {/* Header */}
              <div className="panel-anim mb-12 pb-10 border-b border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs tracking-[0.3em] text-[#00b49d]">01 / 03</span>
                  <div className="h-px flex-1 bg-white/10 max-w-[100px]" />
                </div>
                <div className="flex items-start gap-6 mb-6">
                  <Zap className="w-14 h-14 text-[#00b49d] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                      {gridDetail.title}
                    </h3>
                    <div className="text-sm tracking-[0.25em] text-[#00b49d] mt-3">{gridDetail.en}</div>
                  </div>
                </div>
                <p className="text-base lg:text-lg text-white/70 leading-relaxed font-light max-w-3xl">
                  {gridDetail.positioning}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                {/* 投资版图 */}
                <div className="panel-anim lg:col-span-7">
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-xs tracking-[0.3em] text-[#00b49d]">01</span>
                    <h4 className="text-2xl font-bold">五大投资领域</h4>
                  </div>
                  <div className="space-y-5">
                    {gridDetail.coreBusiness.map((item, i) => (
                      <div key={i} className="pl-5 border-l-2 border-white/10 hover:border-[#00b49d] transition-colors">
                        <h5 className="text-base font-semibold text-white mb-2">{item.title}</h5>
                        <p className="text-sm text-white/60 leading-relaxed">{highlight(item.desc)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 储能机遇 */}
                <div className="panel-anim lg:col-span-5">
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-xs tracking-[0.3em] text-[#00b49d]">02</span>
                    <h4 className="text-2xl font-bold">独立储能机遇</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {gridDetail.innovation.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-2 rounded-sm bg-white/5 border border-white/10 text-white/80 hover:bg-[#00b49d]/10 hover:border-[#00b49d]/40 hover:text-[#00b49d] transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 战略意义 */}
              <div className="panel-anim mt-12 pt-10 border-t border-white/10">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-xs tracking-[0.3em] text-[#00b49d]">03</span>
                  <h4 className="text-2xl font-bold">战略意义</h4>
                </div>
                <p className="text-base lg:text-lg text-white/75 leading-[1.9] font-light max-w-4xl">
                  {gridDetail.advantage}
                </p>
              </div>

              {/* Metric footer */}
              <div className="panel-anim mt-12 pt-10 border-t border-white/10 flex items-baseline justify-between flex-wrap gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl lg:text-6xl font-black text-[#00b49d]">{gridDetail.metric.v}</span>
                  <span className="text-base text-white/60 font-medium">{gridDetail.metric.u}</span>
                </div>
                <div className="text-xs tracking-[0.25em] text-white/40">
                  EZ-CHU · DIGITAL ENERGY
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Market;
