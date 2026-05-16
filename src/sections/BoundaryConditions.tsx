import { useEffect, useRef } from 'react';
import {
  MapPin, Zap, GitBranch, CalendarClock,
  Building2, Ruler, TrendingUp, FileCheck,
  CableCar, Cable, CircuitBoard, Layers
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const boundaries = [
  {
    num: '01',
    icon: MapPin,
    title: '土地与规划',
    en: 'Land & Planning',
    items: [
      { icon: Building2, label: '用地面积', value: '约 50 亩', sub: '工业用地 / 电力设施用地' },
      { icon: Ruler,     label: '规划容积率', value: '0.20 — 0.30', sub: '结合工艺布置与地方指标' },
      { icon: TrendingUp,label: '投资强度', value: '~3,000 万 / 亩', sub: '按总投资 15 亿元测算' },
      { icon: FileCheck, label: '前置条件', value: '能评·环评·安评', sub: '满足地方审批要求' },
    ],
  },
  {
    num: '02',
    icon: Zap,
    title: '电网接入',
    en: 'Grid Connection',
    items: [
      { icon: CircuitBoard, label: '接入电压等级', value: '≥ 220 kV', sub: '原则上通过 220kV 出线接入' },
      { icon: GitBranch,    label: '接入容量', value: '需论证确认', sub: '电网公司 / 经研院潮流计算' },
      { icon: Layers,       label: '接入间隔', value: '变电站可用间隔', sub: '间隔与系统论证缺一不可' },
      { icon: FileCheck,    label: '审批协同', value: '国网备案接入', sub: '同步推进系统接入方案' },
    ],
  },
  {
    num: '03',
    icon: GitBranch,
    title: '送出工程',
    en: 'Transmission',
    items: [
      { icon: CableCar,  label: '架空送出线路', value: '≤ 5 公里', sub: '220kV 架空 · 控制工程成本' },
      { icon: Cable,     label: '地埋电缆线路', value: '≤ 300 米', sub: '局部穿越道路 / 园区敏感区' },
      { icon: TrendingUp,label: '外线投资占比', value: '≤ 8 — 12%', sub: '总投资中外线工程比重' },
      { icon: FileCheck, label: '路径协调', value: '地方政府对接', sub: '送出走廊 / 通道许可' },
    ],
  },
  {
    num: '04',
    icon: CalendarClock,
    title: '投资与工期',
    en: 'Investment & Schedule',
    items: [
      { icon: TrendingUp,    label: '项目总投资', value: '约 15 亿元', sub: '4h 储能系统典型口径' },
      { icon: CalendarClock, label: '建设周期', value: '约 8 个月', sub: '从开工到并网投运' },
      { icon: Layers,        label: '设备构成', value: '储能 + PCS + EMS', sub: '+ 升压站 / 消防 / 暖通' },
      { icon: GitBranch,     label: '送出工程', value: '220kV 升压站', sub: '含送出线路全套配套' },
    ],
  },
];

const projectCase = [
  { label: '项目规模', value: '200MW / 800MWh' },
  { label: '用地约',   value: '50 亩' },
  { label: '总投资约', value: '15 亿元' },
  { label: '接入电压', value: '220 kV' },
  { label: '建设周期', value: '8 个月' },
  { label: '储能时长', value: '4h 系统' },
];

const BoundaryConditions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(heroRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const cards = cardsRef.current?.querySelectorAll('.bd-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'expo.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
        );
      }
      gsap.fromTo(caseRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: caseRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="boundary" ref={sectionRef} className="relative py-28 lg:py-40 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <div className="text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-6">— INVESTMENT BOUNDARY</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.05]">
              项目边界<br />
              <span className="text-[#00b49d]">一目了然</span>。
            </h2>
            <p className="text-base text-gray-500 max-w-md font-light">
              以 <b className="text-gray-900">200MW / 800MWh</b> 长时构网型储能项目为典型规模<br />
              从土地、电网、送出、投资四维度，界定核心投资边界。
            </p>
          </div>
        </div>

        {/* Hero typical project banner — left-aligned, stacked */}
        <div ref={heroRef} className="bg-gradient-to-br from-[#0a1f1c] via-[#0d2a26] to-[#005c4b] rounded-3xl p-10 lg:p-16 text-white relative overflow-hidden mb-12">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00b49d]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00b49d]/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          <div className="relative z-10">
            {/* Top label */}
            <div className="text-xs tracking-[0.3em] text-[#a8f0e8] mb-6">— TYPICAL PROJECT</div>

            {/* Big project headline — left aligned, single line */}
            <div className="text-left text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tight leading-[0.95] mb-4 whitespace-nowrap">
              200<span className="text-[#a8f0e8]">MW</span>
              <span className="text-white/20 mx-2 lg:mx-3 font-light">/</span>
              800<span className="text-[#a8f0e8]">MWh</span>
            </div>

            {/* Subtitle */}
            <div className="text-sm lg:text-base text-white/60 mb-12 lg:mb-16">
              长时构网型储能 · 4h 储能系统
            </div>

            {/* Parameter chips — right aligned, flex wrap */}
            <div className="flex flex-wrap gap-3 justify-end">
              {projectCase.map((c, i) => (
                <div key={i} className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 backdrop-blur-sm min-w-[130px] hover:bg-white/10 hover:border-[#00b49d]/40 transition-all duration-300">
                  <div className="text-[10px] tracking-[0.15em] text-white/40 mb-1 uppercase whitespace-nowrap">{c.label}</div>
                  <div className="text-base lg:text-lg font-bold text-white leading-tight whitespace-nowrap">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Boundary Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-100 border border-gray-100 mb-12">
          {boundaries.map((b) => (
            <div key={b.num} className="bd-card group bg-white p-8 lg:p-10 transition-all duration-500 relative overflow-hidden">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="text-xs tracking-[0.25em] text-gray-300 mb-3">
                    边界条件 · {b.num} / 04
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{b.title}</h3>
                  <div className="text-xs tracking-[0.2em] text-[#00b49d]">{b.en}</div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#e6f7f5] flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-6 h-6 text-[#00b49d]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-gray-100">
                {b.items.map((item, i) => (
                  <div key={i} className="bg-white p-4 hover:bg-[#f8fffd] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-3.5 h-3.5 text-[#00b49d]" />
                      <span className="text-[10px] tracking-wider text-gray-400 uppercase">{item.label}</span>
                    </div>
                    <div className="text-base lg:text-lg font-bold text-gray-900 leading-tight mb-1">
                      {item.value}
                    </div>
                    <div className="text-[11px] text-gray-500 leading-snug">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Investor Disclaimer */}
        <div ref={caseRef} className="bg-[#f8fffd] border border-[#e0f5f1] rounded-2xl p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00b49d] flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-900 mb-1">投资人提示</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                以上边界条件以 <b className="text-gray-900">常州市 200MW/800MWh 项目</b> 投资建设实践为参考值。
                实际项目实施中需结合用地条件、电网接入、送出方案、设备选型及地方政策进行专项论证和动态优化。
                项目可行性研究报告以实际为准。
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BoundaryConditions;
