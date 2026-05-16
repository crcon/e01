import { useEffect, useRef, useState } from 'react';
import {
  Shield, Zap, BrainCircuit, Users,
  CheckCircle2, ArrowRight, Trophy,
  Building2, Activity, TrendingUp, Globe,
  Rocket, Target, Sparkles, X
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Advantage = {
  num: string;
  icon: typeof Shield;
  title: string;
  en: string;
  summary: string;
  desc: string;
  big: string;
  bigLabel: string;
  positioning: string;
  details: { title: string; desc: string }[];
  tagline: string;
};

const advantages: Advantage[] = [
  {
    num: '01', icon: Shield, title: '生态优势',
    en: 'Ecosystem',
    summary: '赣锋锂业 40.04% + 国资 44.24%',
    desc: '全球第一大锂化合物供应商深度整合，从锂矿到回收全产业链协同。',
    big: '20%+', bigLabel: '电芯成本领先',
    positioning: '生态优势是易储数智能源集团区别于单一储能开发商的基础优势。公司不是单点做项目，而是依托赣锋锂业全球锂生态体系，形成从锂矿资源、电池制造、储能系统、项目投资、数智运营、电力交易到电池回收循环的产业闭环。',
    details: [
      { title: '赣锋锂业产业链赋能', desc: '依托赣锋锂业在全球锂资源、锂化合物、电池制造和回收循环方面的产业基础，集团具备较强的上游资源协同、设备供应保障和长期成本控制能力。' },
      { title: '国资与产业资本协同', desc: '赣锋锂业与万鑫绿色能源共同构成重要股东支撑。万鑫绿色能源深耕新能源领域多年，拥有产业资源和资本运作经验，有助于提升项目融资、区域拓展和资源整合能力。' },
      { title: '全产业链闭环能力', desc: '围绕储能科技与软件、PACK 集成制造、EPC 工程管理、电网侧储能电站、AI 数智运营、零碳园区、电池回收循环等环节，构建完整产业链闭环，实现"软硬一体、端到端交付"。' },
      { title: '电网与发电集团合作生态', desc: '在项目开发和电力交易中，集团能够对接电网企业、发电集团、地方国资、产业园区和新能源开发主体，形成项目资源、容量需求、并网接入、辅助服务和交易场景的协同网络。' },
      { title: '开放式生态平台能力', desc: '通过"AI + 储能 + AIDC"模式，集团能够向源网荷储、零碳园区、工商业能源管理、虚拟电厂、AI 数据中心供电等多场景延伸，具备综合智慧能源生态平台升级能力。' },
    ],
    tagline: '依托赣锋锂业全球锂生态与国资产业资源，形成"资源—制造—建设—运营—交易—回收"全链闭环。',
  },
  {
    num: '02', icon: Zap, title: '先发优势',
    en: 'First-Mover',
    summary: '49 项目 · 32.82GWh · 13 省',
    desc: '提前锁定高收益区域，规模化场景沉淀与 AI 模型迭代形成壁垒。',
    big: '100', bigLabel: 'GWh · 2030 目标',
    positioning: '先发优势主要体现在集团较早锁定电网侧独立共享储能核心赛道，提前布局高收益区域和重点项目资源，并通过全国化项目储备、示范项目经验和数智运营模型，建立规模化发展基础。',
    details: [
      { title: '提前卡位独立共享储能赛道', desc: '在国家推动新型储能规模化建设、容量电价机制逐步完善、电力现货和辅助服务市场加速发展的背景下，集团提前将电网侧独立共享储能作为核心业务方向，符合新型电力系统建设需求。' },
      { title: '重点区域项目资源锁定', desc: '集团围绕新能源消纳压力大、电网调节需求强、电力现货市场活跃、容量补偿机制明确的地区开展布局，提前锁定优质收益区域，提升项目长期收益确定性。' },
      { title: '全国化项目布局基础', desc: '集团围绕电网侧独立共享储能电站开展全国布局，项目数量、签约规模和区域覆盖已形成一定规模，为后续规模化扩张奠定基础。' },
      { title: '多场景沉淀运营经验', desc: '集团业务覆盖山东、广东、宁夏、内蒙古、河南、新疆、甘肃等不同电力市场环境，能够在现货交易、容量补偿、辅助服务、容量租赁等不同机制下积累运营经验。' },
      { title: '示范项目带动复制扩张', desc: '通过先期标杆项目形成"选址—接入—建设—并网—运营—交易"的标准化模型，有助于在全国重点省份快速复制，形成规模效应。' },
    ],
    tagline: '提前布局高收益区域和电网侧独立共享储能项目，形成全国化项目储备与可复制的运营模型。',
  },
  {
    num: '03', icon: BrainCircuit, title: '技术与 AI',
    en: 'Tech & AI',
    summary: 'BMS / EMS / PCS 完全自主',
    desc: '自研 AI 算法定义竞争，毫秒响应、超精预测、零事故运行。',
    big: '87', bigLabel: '项核心专利',
    positioning: '技术与 AI 优势是集团从传统储能投资商升级为"能源资产数智运营商"的关键。公司以自研 EMS、BMS、PCS、AI 交易模型、数字孪生平台和智能运维系统为核心，提升电站安全性、运行效率和收益能力。',
    details: [
      { title: '3S 系统自主研发能力', desc: '集团围绕 BMS、EMS、PCS 等储能核心控制系统开展自主研发，形成从电池状态感知、能量调度到电力变换的核心技术能力，并深度融合数字技术与电力电子技术。' },
      { title: '自研 EMS 系统支撑电站运营', desc: '自研站端 EMS 系统具备全景可视化、一次调频、二次调频、K 值优化、紧急调压、惯量支撑、黑启动、计划曲线和 SOC 自动维护等功能，可支撑储能电站参与多类型电力市场。' },
      { title: 'AI 预测调度与电力交易能力', desc: '通过 AI 算法融合气象、电价、负荷、新能源出力、SOC、电池健康状态等多维数据，形成预测—优化—执行闭环，提升储能参与现货交易、辅助服务和容量市场的收益能力。' },
      { title: '数字孪生与智能运维能力', desc: '构建"智能软件 + 数字孪生 + AI 决策"的技术体系，打造源网荷储碳一体化智慧能源操作系统，数字平台可打通"物理电站—电力市场—碳市场"，实现资产多维增值。' },
      { title: 'AIDC 算电协同能力', desc: '围绕 AI 数据中心高可靠供电需求，集团可将储能、电力电子、AI 调度和能源管理平台结合，构建"储能 + 算力"融合型新业务场景。' },
    ],
    tagline: '以 BMS/EMS/PCS 自主研发、AI 预测调度、数字孪生和智能交易系统为核心，把储能电站升级为可感知、可调度、可交易的数字资产。',
  },
  {
    num: '04', icon: Users, title: '团队优势',
    en: 'Team',
    summary: '12 博士 · 60 高工 · 290+ 团队',
    desc: '顶级电力专家团队，深厚电网与发电集团战略合作资源。',
    big: '290+', bigLabel: '人专业团队',
    positioning: '团队优势是集团实现项目开发、工程交付、数智运营和电力交易闭环的重要保障。储能项目横跨政策、土地、电网、工程、金融、交易和运维，团队复合能力决定项目落地效率和资产运营水平。',
    details: [
      { title: '复合型管理团队', desc: '管理团队覆盖战略投资、项目开发、工程建设、智能制造、电力运营、软件研发和电力交易等多个领域，能够支撑储能项目从前期获取到后期运营的全链条管理。' },
      { title: '电力交易专家团队', desc: '集团拥有深耕电力市场的交易团队，能够提升项目参与现货市场、辅助服务、容量补偿和虚拟电厂多市场交易的策略能力和收益捕捉能力。' },
      { title: '技术研发与算法团队', desc: '围绕 EMS、BMS、PCS、AI 预测、电力交易算法、数字孪生、智能运维等方向开展长期研发迭代。集团建立易储数智研究院，通过三大研究中心开展前瞻研究、技术创新和人才培养。' },
      { title: '工程建设与运维团队', desc: '具备 EPC 工程管理、升压站建设、外线协调、并网调试、安全运维等能力，通过工程建设、电力运营和数智平台团队协同，保障项目高效交付和安全运行。' },
      { title: '全球化视野与国际化能力', desc: '业务具备全球布局视野，覆盖东南亚、中东、欧洲、南美、非洲等市场方向，并具备 IEC、UL、CE、TUV 等国际认证相关能力，有助于未来储能系统和智慧能源方案出海。' },
    ],
    tagline: '以电力交易、工程建设、AI 研发、项目投资和产业资源整合团队为支撑，形成"懂政策、懂电网、懂工程、懂交易、懂运营"的复合型组织能力。',
  },
];

// 三年发展规划
const threeYearPlan = [
  {
    year: '2025',
    phase: '固本强基',
    icon: Shield,
    big: '10', unit: 'GWh',
    bigLabel: '并网装机',
    desc: '立足自建储能电站，夯实基础运维能力，完善平台与团队建设。',
    bullets: [],
  },
  {
    year: '2026',
    phase: '外部拓展',
    icon: Globe,
    big: '20', unit: 'GWh',
    bigLabel: '装机规模',
    desc: '托管第三方储能电站，智能交易市场领先。',
    bullets: [
      { label: '营业收入', value: '110 亿元' },
      { label: '净利润',  value: '16 亿元' },
    ],
  },
  {
    year: '2027',
    phase: '多元发展',
    icon: Rocket,
    big: '40', unit: 'GWh',
    bigLabel: '装机规模',
    desc: '托管光伏和风电场站，拓改创值，流量入口变现。',
    bullets: [
      { label: '营业收入', value: '150 亿元' },
      { label: '净利润',  value: '22 亿元' },
    ],
  },
];

// 五年战略愿景路径
const fiveYearPath = [
  { year: '2025', label: '全国布局' },
  { year: '2026', label: '欧洲市场' },
  { year: '2027', label: '全国布局深化' },
  { year: '2028', label: '国内 TOP 1' },
  { year: '2030', label: '全球第一' },
];

// 核心业财目标 2026—2030
const financialTargets = [
  {
    year: '2026 目标',
    icon: TrendingUp,
    metrics: [
      { l: '装机', v: '20', u: 'GWh' },
      { l: '营收', v: '110', u: '亿元' },
      { l: '净利', v: '16',  u: '亿元' },
    ],
  },
  {
    year: '2027 目标',
    icon: Zap,
    metrics: [
      { l: '装机', v: '40', u: 'GWh' },
      { l: '营收', v: '150', u: '亿元' },
      { l: '净利', v: '22',  u: '亿元' },
    ],
  },
  {
    year: '2030 目标',
    icon: Sparkles,
    metrics: [
      { l: '装机', v: '100', u: 'GWh' },
      { l: '营收', v: '350', u: '亿元' },
      { l: '净利', v: '60',  u: '亿元' },
    ],
  },
];

// 四大核心能力
const capabilities = [
  { icon: Building2, title: '资产开发', sub: '优质资产获取与开发' },
  { icon: Activity,  title: '数智运营', sub: '数智平台驱动高效运营' },
  { icon: TrendingUp,title: '电力交易', sub: '智能交易创造持续价值' },
  { icon: Globe,     title: '全球拓展', sub: '布局全球市场拓展增长' },
];

const CoreAdvantage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const planRef    = useRef<HTMLDivElement>(null);
  const targetRef  = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = advantages.find(a => a.num === activeId);

  // Panel open animation + body scroll lock
  useEffect(() => {
    if (active && panelRef.current) {
      const inner = panelRef.current.querySelector('.panel-inner');
      const blocks = panelRef.current.querySelectorAll('.panel-anim');
      gsap.fromTo(panelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      if (inner) gsap.fromTo(inner, { y: 30, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
      gsap.fromTo(blocks, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.15, ease: 'expo.out' });
    }
    document.body.style.overflow = active ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const cards = cardsRef.current?.querySelectorAll('.adv-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'expo.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
        );
      }
      const plans = planRef.current?.querySelectorAll('.plan-card');
      if (plans) {
        gsap.fromTo(plans,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'expo.out',
            scrollTrigger: { trigger: planRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
      const targets = targetRef.current?.querySelectorAll('.target-card');
      if (targets) {
        gsap.fromTo(targets,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: targetRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="core-advantage" ref={sectionRef} className="relative py-28 lg:py-40 bg-[#f5f5f5] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-24">
          <div className="text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-6">— CORE ADVANTAGES</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.05]">
              四大护城河<br />
              <span className="text-[#00b49d]">构筑壁垒</span>。
            </h2>
            <p className="text-base text-gray-500 max-w-md font-light">
              技术 · AI · 产业生态 · 国企背景<br />
              全国领先规模带来不可复制的护城河。
            </p>
          </div>
        </div>

        {/* 4 Advantage Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 mb-24 lg:mb-32">
          {advantages.map((a) => {
            const isActive = activeId === a.num;
            return (
              <div
                key={a.num}
                onClick={() => setActiveId(a.num)}
                className={`adv-card group p-8 lg:p-12 transition-all duration-700 relative overflow-hidden cursor-pointer ${isActive ? 'bg-[#0a1f1c]' : 'bg-white hover:bg-[#0a1f1c]'}`}
              >
                <div className="flex items-start justify-between mb-10">
                  <span className={`text-xs tracking-[0.25em] transition-colors ${isActive ? 'text-[#00b49d]' : 'text-gray-300 group-hover:text-[#00b49d]'}`}>
                    {a.num} / 04
                  </span>
                  <a.icon className="w-7 h-7 text-[#00b49d]" />
                </div>

                <h3 className={`text-3xl lg:text-4xl font-bold transition-colors mb-1 ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-white'}`}>
                  {a.title}
                </h3>
                <div className="text-xs tracking-[0.2em] text-[#00b49d] mb-6">{a.en}</div>

                <div className="my-8 flex items-end gap-3">
                  <span className="text-6xl lg:text-7xl font-black text-[#00b49d] leading-none">
                    {a.big}
                  </span>
                  <span className={`text-sm pb-2 transition-colors ${isActive ? 'text-white/60' : 'text-gray-400 group-hover:text-white/60'}`}>
                    {a.bigLabel}
                  </span>
                </div>

                <div className={`text-sm font-medium mb-3 transition-colors ${isActive ? 'text-white/80' : 'text-gray-700 group-hover:text-white/80'}`}>
                  {a.summary}
                </div>
                <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-white/50' : 'text-gray-500 group-hover:text-white/50'}`}>
                  {a.desc}
                </p>

                <div className={`mt-6 text-xs tracking-[0.2em] transition-colors ${isActive ? 'text-[#00b49d]' : 'text-gray-300 group-hover:text-[#00b49d]'}`}>
                  点击查看深化内容 →
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Panel — full-screen overlay */}
        {active && (
          <div
            ref={panelRef}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
            onClick={() => setActiveId(null)}
          >
            <div
              className="panel-inner relative bg-[#0a1f1c] text-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-sm"
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
                    <span className="text-xs tracking-[0.3em] text-[#00b49d]">{active.num} / 04</span>
                    <div className="h-px flex-1 bg-white/10 max-w-[80px]" />
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

                {/* 优势深化内容 */}
                <div className="panel-anim mb-12">
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-xs tracking-[0.3em] text-[#00b49d]">01</span>
                    <h4 className="text-2xl font-bold">优势内容深化</h4>
                  </div>
                  <div className="space-y-5">
                    {active.details.map((item, i) => (
                      <div key={i} className="pl-5 border-l-2 border-white/10 hover:border-[#00b49d] transition-colors">
                        <h5 className="text-base font-semibold text-white mb-2">{item.title}</h5>
                        <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 核心短句 */}
                <div className="panel-anim pt-10 border-t border-white/10">
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-xs tracking-[0.3em] text-[#00b49d]">02</span>
                    <h4 className="text-2xl font-bold">核心定位</h4>
                  </div>
                  <p className="text-base lg:text-xl text-white/80 leading-[1.9] font-light max-w-4xl">
                    {active.tagline}
                  </p>
                </div>

                {/* Metric footer */}
                <div className="panel-anim mt-10 pt-8 border-t border-white/10 flex items-baseline justify-between flex-wrap gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl lg:text-6xl font-black text-[#00b49d]">{active.big}</span>
                    <span className="text-base text-white/60 font-medium">{active.bigLabel}</span>
                  </div>
                  <div className="text-xs tracking-[0.25em] text-white/40">EZ-CHU · DIGITAL ENERGY</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== Business Roadmap ===== */}
        <div className="mb-12">
          <div className="text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-6">— BUSINESS ROADMAP</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.05]">
              商业发展规划<br />
              <span className="text-[#00b49d]">业财目标</span>。
            </h2>
            <p className="text-base text-gray-600 max-w-md font-light">
              <b className="text-gray-900">三年倍增 · 五年领跑 · 全球第一</b><br />
              以数智运营、资产管理、交易协同和全产业链<br />
              价值创造为核心驱动。
            </p>
          </div>
        </div>

        {/* 三年发展规划 — 3 stage cards */}
        <div ref={planRef} className="mb-10">
          <div className="text-xs tracking-[0.3em] text-gray-400 font-semibold mb-6">— 三年发展规划</div>
          <div className="grid md:grid-cols-3 gap-5">
            {threeYearPlan.map((p, i) => (
              <div key={i} className="plan-card relative bg-white border border-gray-100 rounded-2xl p-7 lg:p-8 hover:shadow-xl hover:border-[#00b49d]/30 transition-all duration-500 overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-[#e6f7f5] to-transparent rounded-bl-full opacity-50" />

                <div className="relative">
                  {/* Year tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#005c4b] text-white rounded-full text-xs font-bold tracking-wider mb-5">
                    {p.year}
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#e6f7f5] flex items-center justify-center">
                      <p.icon className="w-5 h-5 text-[#00b49d]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#00b49d] font-semibold tracking-wider">STAGE · 0{i + 1}</div>
                      <div className="text-xl font-bold text-gray-900">{p.phase}</div>
                    </div>
                  </div>

                  {/* Big metric */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl lg:text-6xl font-black text-gray-900">{p.big}</span>
                    <span className="text-xl font-bold text-[#00b49d]">{p.unit}</span>
                  </div>
                  <div className="text-xs text-gray-400 tracking-wider mb-5">{p.bigLabel}</div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>

                  {p.bullets.length > 0 && (
                    <ul className="space-y-2 pt-4 border-t border-gray-100">
                      {p.bullets.map((b, j) => (
                        <li key={j} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-gray-500">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00b49d]" />
                            {b.label}
                          </span>
                          <span className="font-bold text-gray-900">{b.value}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 五年战略愿景 — horizontal timeline ribbon */}
        <div className="relative bg-gradient-to-r from-[#005c4b] via-[#007a65] to-[#00b49d] rounded-3xl p-8 lg:p-10 text-white mb-10 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs tracking-[0.3em] text-[#a8f0e8] mb-0.5">— FIVE-YEAR VISION</div>
                <div className="text-lg lg:text-xl font-bold">五年战略愿景</div>
              </div>
            </div>

            {/* Path */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              {fiveYearPath.map((p, i) => (
                <div key={i} className="flex items-center gap-2 lg:gap-3">
                  <div className="px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl hover:bg-white/20 transition-colors">
                    <div className="text-[10px] tracking-[0.2em] text-[#a8f0e8] mb-0.5">{p.year}</div>
                    <div className="text-sm lg:text-base font-bold text-white whitespace-nowrap">{p.label}</div>
                  </div>
                  {i < fiveYearPath.length - 1 && (
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-[#a8f0e8]/70 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 核心业财目标 2026—2030 */}
        <div ref={targetRef} className="mb-10">
          <div className="text-xs tracking-[0.3em] text-gray-400 font-semibold mb-6">— 核心业财目标 · 2026 — 2030</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
            {financialTargets.map((t, i) => (
              <div key={i} className="target-card bg-white p-7 lg:p-8 hover:bg-[#f8fffd] transition-colors">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-base font-bold text-gray-900">{t.year}</div>
                  <t.icon className="w-5 h-5 text-[#00b49d]" />
                </div>
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  {t.metrics.map((m, j) => (
                    <div key={j} className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-400 tracking-wider">{m.l}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl lg:text-3xl font-black text-gray-900">{m.v}</span>
                        <span className="text-xs text-[#00b49d] font-semibold">{m.u}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* 战略定位 — accent dark card */}
            <div className="target-card relative bg-gradient-to-br from-[#0a1f1c] to-[#005c4b] text-white p-7 lg:p-8 overflow-hidden">
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-[#00b49d]/30 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#a8f0e8]/15 border border-[#a8f0e8]/30 rounded-full">
                    <Trophy className="w-3 h-3 text-[#a8f0e8]" />
                    <span className="text-[10px] tracking-wider text-[#a8f0e8] font-semibold">战略定位</span>
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-black mb-3 leading-tight">
                  全球<span className="text-[#a8f0e8]">第一</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  成为全球储能全产业链<br />价值创造标杆
                </p>
                <div className="pt-4 border-t border-white/15 text-xs text-[#a8f0e8] font-bold tracking-wider">
                  三年倍增 · 五年领跑
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CAGR strip */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-7 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-xs tracking-[0.25em] text-gray-400 font-semibold">— CAGR · 2026—2030 复合增长率</div>
          <div className="flex gap-6 lg:gap-10">
            {[
              { v: '49.4%', l: '装机' },
              { v: '33.7%', l: '营收' },
              { v: '39.2%', l: '净利' },
            ].map((c, i) => (
              <div key={i}>
                <div className="text-2xl lg:text-3xl font-black text-gray-900">{c.v}</div>
                <div className="text-[10px] tracking-[0.2em] text-[#00b49d] mt-0.5 font-semibold">{c.l} CAGR</div>
              </div>
            ))}
          </div>
        </div>

        {/* 四大核心能力 strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
          {capabilities.map((c, i) => (
            <div key={i} className="bg-white p-6 lg:p-7 hover:bg-[#f8fffd] transition-colors flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e6f7f5] to-[#00b49d]/15 flex items-center justify-center flex-shrink-0">
                <c.icon className="w-5 h-5 text-[#00b49d]" />
              </div>
              <div>
                <div className="text-base font-bold text-gray-900 mb-0.5">{c.title}</div>
                <div className="text-xs text-gray-500 leading-snug">{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreAdvantage;
