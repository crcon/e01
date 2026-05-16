import { useEffect, useRef } from 'react';
import {
  Zap, Settings, Battery, Handshake, Gift,
  CheckCircle2, ArrowRight, TrendingUp,
  Activity, ShieldCheck, Sprout, Target,
  Monitor
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const revenueStreams = [
  {
    num: '01', icon: Zap,
    title: '电能量交易',
    en: 'Energy Trading',
    weight: '主要收益',
    desc: '通过电力市场交易，获取价差与套利收益',
    items: ['分时电价套利', '中长期市场交易', '电力现货交易', '政府定价机制'],
    color: '#00b49d',
  },
  {
    num: '02', icon: Settings,
    title: '辅助服务',
    en: 'Ancillary Services',
    weight: '稳定收益',
    desc: '响应电网调节需求，提供高质量辅助服务',
    items: ['调峰市场 / 补偿', '一次调频服务', '二次调频服务', '爬坡 · 备用 · 黑启动'],
    color: '#005c4b',
  },
  {
    num: '03', icon: Battery,
    title: '容量补偿',
    en: 'Capacity Compensation',
    weight: '保底收益',
    desc: '稳定的容量补偿，构成项目现金流基石',
    items: ['容量市场机制', '容量电价政策', '容量补偿收益', '系统运行费用'],
    color: '#007a65',
  },
  {
    num: '04', icon: Handshake,
    title: '容量租赁',
    en: 'Capacity Leasing',
    weight: '增值收益',
    desc: '可租赁容量出租，盘活闲置资源',
    items: ['可租赁容量奖励', '容量租赁市场', '租赁价格限制', '未全额租赁惩罚'],
    color: '#008f7a',
  },
  {
    num: '05', icon: Gift,
    title: '专项补贴',
    en: 'Special Subsidies',
    weight: '政策收益',
    desc: '地方专项补贴，享受政策红利',
    items: ['初投资补贴支持', '储能充电补贴', '储能放电补贴', '内蒙 / 新疆等力度大'],
    color: '#00b49d',
  },
];

const characteristics = [
  { icon: Activity,    text: '多元收益渠道并存', sub: '降低单一市场波动风险' },
  { icon: TrendingUp,  text: '地区差异显著',     sub: '区域选址决定收益水平' },
  { icon: ShieldCheck, text: '政策持续优化',     sub: '收益版图持续扩展' },
  { icon: Sprout,      text: '市场化程度提升',   sub: '从"补贴依赖"走向"市场化"' },
];

const pathway = [
  { icon: Monitor,    title: '市场参与', sub: '接入电力 + 辅助服务市场' },
  { icon: Battery,    title: '收益组合', sub: '多渠道收益叠加' },
  { icon: ShieldCheck,title: '成本优化', sub: '提升系统效率 · 降低运维' },
  { icon: TrendingUp, title: '风险控制', sub: '分散收益 · 抑波动' },
  { icon: Sprout,     title: '持续增值', sub: '提升项目 IRR' },
  { icon: Target,     title: '盈利最大化', sub: '推动构网型规模化发展' },
];

const ProfitModel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const streamsRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const cards = streamsRef.current?.querySelectorAll('.rev-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: streamsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
        );
      }
      gsap.fromTo(charRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: charRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const steps = pathRef.current?.querySelectorAll('.path-step');
      if (steps) {
        gsap.fromTo(steps,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: pathRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="profit-model" ref={sectionRef} className="relative py-28 lg:py-40 bg-[#f5f5f5] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <div className="text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-6">— REVENUE MODEL</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.05]">
              五大收益<br />
              <span className="text-[#00b49d]">多元盈利</span>。
            </h2>
            <p className="text-base text-gray-500 max-w-md font-light">
              <b className="text-gray-900">政策与市场双轮驱动</b>，多元收益渠道并存<br />
              电能量 + 辅助服务 + 容量 + 租赁 + 补贴 = 综合盈利能力。
            </p>
          </div>
        </div>

        {/* 5 Revenue Streams */}
        <div ref={streamsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-gray-200 border border-gray-200 mb-16">
          {revenueStreams.map((s) => (
            <div key={s.num} className="rev-card group bg-white p-6 lg:p-7 hover:bg-[#0a1f1c] transition-all duration-700 relative overflow-hidden flex flex-col">
              {/* Top header */}
              <div className="text-xs tracking-[0.25em] text-gray-300 group-hover:text-[#00b49d] mb-6 transition-colors">
                {s.num} / 05
              </div>

              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${s.color}15` }}>
                <s.icon className="w-6 h-6" style={{ color: s.color }} />
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-white transition-colors mb-1">
                {s.title}
              </h3>
              <div className="text-[10px] tracking-[0.2em] text-[#00b49d] mb-1">{s.en}</div>

              <div className="inline-flex items-center self-start px-2 py-0.5 rounded text-[10px] font-bold mt-2 mb-4"
                style={{ backgroundColor: `${s.color}20`, color: s.color }}>
                {s.weight}
              </div>

              <p className="text-xs text-gray-500 group-hover:text-white/60 leading-relaxed mb-5 transition-colors">
                {s.desc}
              </p>

              {/* Items */}
              <ul className="space-y-2 mt-auto pt-4 border-t border-gray-100 group-hover:border-white/15 transition-colors">
                {s.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600 group-hover:text-white/70 transition-colors">
                    <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: s.color }} />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Revenue Characteristics */}
        <div ref={charRef} className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 mb-12">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
            <div>
              <div className="text-xs tracking-[0.3em] text-[#00b49d] mb-3">— CHARACTERISTICS</div>
              <h3 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-3">
                收益构成<br />四大特点。
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                独立储能收益体系正在快速演化<br />
                投资人需深刻理解其结构性变化。
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-gray-100 border border-gray-100">
              {characteristics.map((c, i) => (
                <div key={i} className="bg-white p-5 hover:bg-[#f8fffd] transition-colors flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e6f7f5] flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-[#00b49d]" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm mb-1">{c.text}</div>
                    <div className="text-xs text-gray-500">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profitability Pathway */}
        <div className="bg-gradient-to-br from-[#0a1f1c] via-[#0d2a26] to-[#005c4b] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00b49d]/15 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <div className="text-xs tracking-[0.3em] text-[#a8f0e8] mb-3">— PROFITABILITY PATHWAY</div>
            <h3 className="text-2xl lg:text-4xl font-black mb-2 leading-tight">
              收益实现路径
            </h3>
            <p className="text-sm text-white/60 mb-10 lg:mb-12 max-w-2xl font-light">
              从市场参与到盈利最大化，构网型储能通过六步路径实现可持续盈利与长期价值增长。
            </p>

            <div ref={pathRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
              {pathway.map((p, i) => (
                <div key={i} className="path-step group relative">
                  {/* Arrow connector */}
                  {i < pathway.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-3.5 h-3.5 text-[#00b49d]/40 z-10" />
                  )}

                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5 h-full flex flex-col hover:bg-white/10 hover:border-[#00b49d]/40 transition-all duration-300">
                    <div className="text-[10px] tracking-[0.25em] text-[#a8f0e8] mb-3">
                      STEP · 0{i + 1}
                    </div>
                    <p.icon className="w-6 h-6 text-[#00b49d] mb-3" />
                    <div className="font-bold text-white text-sm mb-1">{p.title}</div>
                    <div className="text-[11px] text-white/50 leading-snug">{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/15 flex items-start gap-3">
              <Sprout className="w-5 h-5 text-[#a8f0e8] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white/80 leading-relaxed">
                构网型储能通过<b className="text-white">多元化盈利模式</b>实现可持续盈利与长期价值增长，
                助力构建新型电力系统，为投资人创造<b className="text-[#a8f0e8]">长期、稳定、可量化</b>的回报。
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProfitModel;
