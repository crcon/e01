import { useEffect, useRef, useState } from 'react';
import {
  Cpu, Factory, HardHat, Battery, BrainCircuit,
  ArrowUpRight, BarChart3, X
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Segment = {
  id: string;
  icon: typeof Cpu;
  num: string;
  title: string;
  en: string;
  desc: string;
  metric: { v: string; u: string };
  positioning: string;
  coreBusiness: { title: string; desc: string }[];
  innovation: string[];
  advantage: string;
};

const businessSegments: Segment[] = [
  {
    id: 'rd', icon: Cpu, num: '01',
    title: '科技研发',
    en: 'R&D',
    desc: '自研 BMS / EMS / PCS 三大核心系统，AI 调度算法引领行业。',
    metric: { v: '87', u: '项专利' },
    positioning: '构建储能全产业链闭环的底层能力，形成"硬件控制 + 软件算法 + 安全体系 + 电力交易模型"的综合研发能力。',
    coreBusiness: [
      { title: '3S 核心系统研发', desc: '围绕 BMS、EMS、PCS 三大核心系统开展自主研发，提升储能系统在安全监测、能量调度、电力变换、并网友好性等方面的能力。' },
      { title: '站端 EMS 与云端运营平台', desc: '自研 EMS 系统已累计接入储能容量约 15GWh，覆盖山东、内蒙古、宁夏、广东、甘肃、新疆、河南等区域。' },
      { title: '储能安全实验室', desc: '围绕电芯本征安全、BMS 毫秒级监控、热管理联动、系统级主动防护，打造全生命周期安全防护体系。' },
      { title: '项目规划与商业模式研究', desc: '开展政策研究、区域电力市场研究、项目收益测算、容量电价机制研究、电力现货交易策略研究。' },
    ],
    innovation: [
      'EMS / BMS / PCS 一体化控制技术',
      'AI 预测调度算法',
      '数字孪生电站',
      '构网型储能控制技术',
      'VSG 虚拟同步发电机技术',
      '电芯热失控预警模型',
      '储能电站全生命周期仿真',
      '电力交易大模型',
      'AIDC 算电协同算法',
    ],
    advantage: '以自主可控的 3S 系统和 AI 算法为核心，构建"安全、效率、收益"三位一体的技术壁垒。集团不是单纯设备集成商，而是以研发驱动储能资产全生命周期价值提升的数智化能源平台。',
  },
  {
    id: 'manufacturing', icon: Factory, num: '02',
    title: '智能制造',
    en: 'Manufacturing',
    desc: '工业 4.0 智能工厂，大容量、长寿命、高安全储能集成。',
    metric: { v: '30', u: 'GWh / 年' },
    positioning: '集团实现储能系统规模化交付和成本控制的重要支撑，支撑大容量、长寿命、高安全储能产品的批量化交付。',
    coreBusiness: [
      { title: 'PACK 集成制造', desc: '围绕标准化储能模组开展 PACK 生产，实现多规格电芯兼容、多场景适配和高一致性系统交付。' },
      { title: '储能系统集成', desc: '面向电网侧独立储能、工商业储能、零碳园区、AIDC 供电等场景，提供液冷储能系统、PCS 升压一体机、BMS、EMS、消防系统等集成解决方案。' },
      { title: '智能制造基地建设', desc: '以工业 4.0 智能工厂为基础，实现规模化、高品质 PACK 生产和储能系统交付。' },
      { title: '产业链协同供应', desc: '依托赣锋锂业在锂资源、电池制造、储能电池出货、回收循环等方面的产业基础，形成从上游资源到下游储能系统的供应链协同。' },
    ],
    innovation: [
      '标准化 PACK 集成技术',
      '液冷热管理技术',
      '高安全储能电池系统',
      '模块化储能舱设计',
      '智能产线检测与质量追溯',
      '多规格电芯兼容技术',
      '低衰减系统架构',
      '全生命周期电池健康管理',
    ],
    advantage: '以赣锋锂业全产业链资源为基础，以智能制造能力为抓手，形成"资源保障、制造交付、系统集成、质量管控"一体化优势。制造板块不仅服务集团自持项目，也可支撑外部客户的储能系统交付和产业化合作。',
  },
  {
    id: 'epc', icon: HardHat, num: '03',
    title: '工程建设',
    en: 'EPC',
    desc: 'EPC 全流程工程管控，软硬一体、端到端高品质交付。',
    metric: { v: '49', u: '个项目' },
    positioning: '集团将项目资源转化为并网资产的关键环节，形成标准化、可复制、可规模化的工程交付能力。',
    coreBusiness: [
      { title: '储能电站 EPC 总承包', desc: '负责储能电站从设计、采购、施工、安装、调试到并网验收的全过程管理。' },
      { title: '接入系统与升压站建设', desc: '围绕 220kV 及以上接入条件，推进升压站、送出线路、对侧间隔、调度通信、保护自动化等关键工程。' },
      { title: '工程进度与质量管理', desc: '建立标准化工程建设体系，保障大规模储能项目在安全、质量、进度、成本上的可控交付。' },
      { title: '项目合规与手续协同', desc: '协同推进备案、用地、环评、安评、稳评、接入批复、电网验收等关键手续。' },
      { title: '全周期工程服务', desc: '从项目规划、投融资方案、EPC 建设到运营维护，提供一站式解决方案。' },
    ],
    innovation: [
      '标准化储能电站设计',
      '模块化预制舱建设',
      'EPC 数字化进度管理',
      '工程质量追溯系统',
      '并网调试数字化管理',
      '智慧施工与远程监理',
      '站网协同控制',
      '构网型并网适配技术',
    ],
    advantage: '以 EPC 全流程管控能力保障项目从"资源"到"资产"的高效转化。工程建设板块的核心价值在于把储能项目复杂的审批、设计、建设、并网、验收流程沉淀为标准化能力，支撑全国项目快速复制。',
  },
  {
    id: 'investment', icon: Battery, num: '04',
    title: '储能投资',
    en: 'Investment',
    desc: '电网侧独立共享储能电站投资运营，三重收益结构。',
    metric: { v: '32.82', u: 'GWh' },
    positioning: '集团的核心资产板块，重点围绕电网侧独立共享储能电站投资、开发、建设、持有、运营和资产化退出，打造可持续增长的储能基础设施资产池。',
    coreBusiness: [
      { title: '电网侧独立共享储能电站投资', desc: '重点布局新能源消纳压力大、电力现货活跃、辅助服务需求强、容量补偿机制明确的区域。' },
      { title: '项目开发与资源获取', desc: '围绕电网接入条件、土地条件、负荷中心、新能源装机、电力市场政策等要素筛选项目。' },
      { title: '自持资产运营', desc: '优先投资优质项目，形成核心资产组合，打造标杆电站，提升长期稳定现金流。' },
      { title: '项目代管与联合投资', desc: '通过代运营、收益分成、容量租赁、联合开发等模式，扩大项目规模。' },
      { title: '资产证券化与绿色金融', desc: '围绕成熟储能资产，探索绿色信贷、产业基金、基础设施 REITs、资产转让等资本化路径。' },
    ],
    innovation: [
      '"容量电价 + 电能量市场 + 辅助服务"三重收益模型',
      '共享储能容量租赁模式',
      '独立储能多市场交易模型',
      '储能资产数字化管理',
      'REITs 资产培育路径',
      '源网荷储一体化投资模型',
      '零碳园区综合能源投资模型',
    ],
    advantage: '已覆盖广东、广西、河北、河南、江苏、宁夏、山西、天津、云南等地区；在手电站项目 56 个、总容量 39.62GWh，2026 年并网运营目标 30GWh。集团的储能投资是"项目资源获取—合规开发—EPC 建设—数智运营—电力交易—资产证券化"的完整闭环。',
  },
  {
    id: 'ai-ops', icon: BrainCircuit, num: '05',
    title: 'AI 数智运营',
    en: 'AI Operation',
    desc: 'AIDC 算力枢纽 + AI 能量管理，毫秒级协同调控。',
    metric: { v: '88', u: '% 充放电效率' },
    positioning: '集团区别于传统储能开发商的核心能力，通过 AI 能量管理、数字孪生、智能运维、预测性维护、电力交易大模型、AIDC 算电协同，提升储能电站安全性、效率和收益。',
    coreBusiness: [
      { title: '智能运维平台', desc: '实现设备状态实时监控、故障预警、预测性维护、工单管理、巡检管理、备品备件管理和全生命周期运维闭环。' },
      { title: '数字孪生电站', desc: '通过三维可视化建模和动态仿真，实现电站全景展示、运行状态模拟、调度优化和风险预警。' },
      { title: 'AI 能量管理', desc: '融合气象、电价、负荷、新能源出力、SOC、设备状态等多维数据，实现充放电策略优化。' },
      { title: 'AIDC 算电协同', desc: '围绕 AI 数据中心高可靠供电需求，构建"储能 + 固态电力电子 + AI 调度"的下一代供电架构。' },
      { title: '资产收益优化', desc: '通过 AI 算法持续优化储能参与现货交易、辅助服务、容量市场的策略，实现收益最大化。' },
    ],
    innovation: [
      '电力交易大模型',
      '深度学习电价预测',
      '储能健康状态 SOH 评估',
      '热失控提前预警',
      'AI 调度算法自学习',
      '数字孪生动态仿真',
      'AIDC 算电协同平台',
      '云边协同一体化运维系统',
    ],
    advantage: 'AI 数智运营把储能电站从"设备资产"升级为"数字资产"。数智中心通过智能运维平台、电力交易大模型、数字孪生技术，实现毫秒级响应、精准电价预测和 AI 算法自我学习，电价日预测准确率超过 85%。',
  },
  {
    id: 'trading', icon: BarChart3, num: '06',
    title: '电力交易',
    en: 'Power Trading',
    desc: 'AI 算法交易引擎，三大市场协同，最大化资产收益。',
    metric: { v: '87', u: '% 电价预测准确率' },
    positioning: '集团储能资产收益提升的核心抓手，围绕现货交易、辅助服务、容量补偿、容量租赁、绿电绿证、碳资产管理、虚拟电厂聚合运营，构建储能电站多元化收益体系。',
    coreBusiness: [
      { title: '电能量交易', desc: '参与分时电价、中长期市场、现货市场，通过低价充电、高价放电获取价差收益。' },
      { title: '辅助服务交易', desc: '提供调峰、调频、调压、备用、爬坡等服务，获取辅助服务收益。' },
      { title: '容量市场与容量补偿', desc: '通过容量电价、容量补偿、容量租赁等方式获取稳定收益。' },
      { title: '虚拟电厂聚合运营', desc: '聚合储能、电源、负荷、充电桩、工商业用户等资源，参与需求响应和市场交易。' },
      { title: '绿电绿证与碳资产管理', desc: '围绕绿色电力消费、碳减排价值、绿证交易等方向，拓展储能项目环境权益价值。' },
    ],
    innovation: [
      'AI 交易策略引擎',
      '电价预测模型',
      '多市场收益优化模型',
      'SOC 动态优化算法',
      '储能充放电策略模型',
      '辅助服务响应算法',
      '虚拟电厂聚合调度模型',
      '碳资产数据管理系统',
    ],
    advantage: '以 AI 交易算法打通"物理电站—电力市场—碳市场"，实现储能资产收益最大化。独立储能正形成"容量电价 + 电能量市场 + 辅助服务"的三重收益结构，同时通过多市场准入对冲政策变化和市场价格波动，增强资产韧性。',
  },
];

const Business = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = businessSegments.find(s => s.id === activeId);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const cards = cardsRef.current?.querySelectorAll('.biz-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (active && panelRef.current) {
      const panel = panelRef.current;
      const inner = panel.querySelector('.panel-inner');
      const blocks = panel.querySelectorAll('.panel-anim');
      gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      if (inner) gsap.fromTo(inner, { y: 30, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
      gsap.fromTo(blocks, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.15, ease: 'expo.out' });
    }
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <section id="business" ref={sectionRef} className="relative py-28 lg:py-40 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — poster-style */}
        <div ref={headerRef} className="mb-16 lg:mb-24">
          <div className="text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-6">— OUR BUSINESS</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.05]">
              六大板块<br />
              <span className="text-[#00b49d]">全链赋能</span>。
            </h2>
            <p className="text-base text-gray-500 max-w-md font-light">
              研发 · 制造 · 建设 · 投资 · 运营 · 交易<br />
              储能全产业链闭环，数智驱动能源未来。 <span className="text-[#00b49d]">点击卡片了解详情 →</span>
            </p>
          </div>
        </div>

        {/* Cards — minimalist grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
          {businessSegments.map((s) => {
            const isActive = activeId === s.id;
            return (
              <div
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`biz-card group p-8 lg:p-10 transition-all duration-700 cursor-pointer relative overflow-hidden ${isActive ? 'bg-[#0a1f1c]' : 'bg-white hover:bg-[#0a1f1c]'}`}
              >
                {/* Top row: num + arrow */}
                <div className="flex items-start justify-between mb-12">
                  <span className={`text-xs tracking-[0.25em] transition-colors ${isActive ? 'text-[#00b49d]' : 'text-gray-300 group-hover:text-[#00b49d]'}`}>
                    {s.num} / 06
                  </span>
                  <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${isActive ? 'border-[#00b49d]' : 'border-gray-200 group-hover:border-[#00b49d]'}`}>
                    <ArrowUpRight className={`w-4 h-4 transition-all ${isActive ? 'text-[#00b49d] rotate-45' : 'text-gray-400 group-hover:text-[#00b49d] group-hover:rotate-45'}`} />
                  </div>
                </div>

                {/* Icon */}
                <s.icon className={`w-10 h-10 text-[#00b49d] mb-8 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />

                {/* Title */}
                <h3 className={`text-3xl lg:text-4xl font-bold transition-colors mb-1 ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-white'}`}>
                  {s.title}
                </h3>
                <div className="text-xs tracking-[0.2em] text-[#00b49d] mb-5">{s.en}</div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-10 transition-colors ${isActive ? 'text-white/60' : 'text-gray-500 group-hover:text-white/60'}`}>
                  {s.desc}
                </p>

                {/* Bottom metric */}
                <div className={`pt-6 border-t transition-colors ${isActive ? 'border-white/15' : 'border-gray-100 group-hover:border-white/15'}`}>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-3xl lg:text-4xl font-black transition-colors ${isActive ? 'text-[#00b49d]' : 'text-gray-900 group-hover:text-[#00b49d]'}`}>
                      {s.metric.v}
                    </span>
                    <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white/60' : 'text-gray-400 group-hover:text-white/60'}`}>
                      {s.metric.u}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Panel — full-screen overlay */}
      {active && (
        <div
          ref={panelRef}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
          onClick={() => setActiveId(null)}
        >
          <div
            className="panel-inner relative bg-[#0a1f1c] text-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setActiveId(null)}
              className="absolute top-6 right-6 lg:top-8 lg:right-8 w-11 h-11 rounded-full border border-white/20 hover:border-[#00b49d] hover:bg-[#00b49d]/10 flex items-center justify-center transition-all z-10"
              aria-label="关闭"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 lg:p-16">
              {/* Header */}
              <div className="panel-anim mb-12 pb-10 border-b border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs tracking-[0.3em] text-[#00b49d]">{active.num} / 06</span>
                  <div className="h-px flex-1 bg-white/10 max-w-[100px]" />
                </div>
                <div className="flex items-start gap-6 mb-6">
                  <active.icon className="w-14 h-14 text-[#00b49d] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                      {active.title}
                    </h3>
                    <div className="text-sm tracking-[0.25em] text-[#00b49d] mt-3">{active.en}</div>
                  </div>
                </div>
                <p className="text-base lg:text-lg text-white/70 leading-relaxed font-light max-w-3xl">
                  {active.positioning}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                {/* 核心业务 */}
                <div className="panel-anim lg:col-span-7">
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-xs tracking-[0.3em] text-[#00b49d]">01</span>
                    <h4 className="text-2xl font-bold">核心业务</h4>
                  </div>
                  <div className="space-y-5">
                    {active.coreBusiness.map((item, i) => (
                      <div key={i} className="group/item pl-5 border-l-2 border-white/10 hover:border-[#00b49d] transition-colors">
                        <h5 className="text-base font-semibold text-white mb-2">{item.title}</h5>
                        <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 创新引领 */}
                <div className="panel-anim lg:col-span-5">
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-xs tracking-[0.3em] text-[#00b49d]">02</span>
                    <h4 className="text-2xl font-bold">创新引领</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.innovation.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-2 rounded-sm bg-white/5 border border-white/10 text-white/80 hover:bg-[#00b49d]/10 hover:border-[#00b49d]/40 hover:text-[#00b49d] transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 竞争优势 */}
              <div className="panel-anim mt-12 pt-10 border-t border-white/10">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-xs tracking-[0.3em] text-[#00b49d]">03</span>
                  <h4 className="text-2xl font-bold">竞争优势</h4>
                </div>
                <p className="text-base lg:text-lg text-white/75 leading-[1.9] font-light max-w-4xl">
                  {active.advantage}
                </p>
              </div>

              {/* Metric footer */}
              <div className="panel-anim mt-12 pt-10 border-t border-white/10 flex items-baseline justify-between flex-wrap gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl lg:text-6xl font-black text-[#00b49d]">{active.metric.v}</span>
                  <span className="text-base text-white/60 font-medium">{active.metric.u}</span>
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

export default Business;
