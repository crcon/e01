import { useEffect, useRef, useState } from 'react';
import { Leaf, FileText, Shield, Zap, Building2, Landmark, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type PolicyItem = {
  icon: typeof Leaf;
  date: string;
  code: string;
  title: string;
  line: string;
  detail: string;
  keyPoints: { title: string; desc: string }[];
  highlights: string[];
  impact: string;
};

const policies: PolicyItem[] = [
  {
    icon: Leaf,
    date: '2020',
    code: '3060',
    title: '双碳目标',
    line: '2030 碳达峰 · 2060 碳中和',
    detail: '国家"3060"双碳战略是推动中国能源结构深度转型的顶层设计，为新型储能产业发展提供了长达 40 年的政策确定性，奠定了储能成为万亿级战略产业的政策基础。',
    keyPoints: [
      { title: '碳达峰目标（2030年）', desc: '2030年前实现CO₂排放达峰，非化石能源占比提升至25%，风电、太阳能装机总量达12亿千瓦以上，储能成为新能源消纳的核心支撑。' },
      { title: '碳中和目标（2060年）', desc: '2060年前实现碳中和，新能源成为主体电源，储能作为电力系统"稳定器"战略地位显著提升，市场规模预计超万亿元。' },
      { title: '储能战略地位确立', desc: '双碳背景下，新型储能被定义为支撑高比例新能源接入、保障电力系统安全稳定的关键基础设施，全面进入国家规划体系。' },
      { title: '政策体系持续完善', desc: '国家陆续出台储能发展规划、市场机制、价格政策、REITs准入等配套政策，形成完整驱动体系。' },
    ],
    highlights: ['非化石能源占比25%', '风光装机12亿千瓦', '储能战略基础设施', '40年政策确定性', '万亿级市场规模', '绿色金融支持'],
    impact: '双碳目标为储能产业提供了最长期、最确定的政策驱动力，从能源安全、产业政策、金融政策三个维度共同推动储能产业进入历史性战略机遇期。',
  },
  {
    icon: FileText,
    date: '2024',
    code: '136 号文',
    title: '网侧储能',
    line: '取消强制配储 · 市场化转型',
    detail: '发改价格〔2025〕136号文标志着中国储能市场从强制配储的政策驱动阶段，进入以容量电价为核心的市场化驱动新阶段，独立储能商业模式实现根本性突破。',
    keyPoints: [
      { title: '取消强制配储要求', desc: '明确取消新能源强制配套储能的政策要求，消除扭曲市场信号，推动储能从"附属配套"升级为独立市场竞争主体。' },
      { title: '容量电价机制确立', desc: '建立独立储能容量电价机制，为电网侧独立储能提供稳定的容量补偿收益，保底收益约占总收益30%。' },
      { title: '市场化交易通道打开', desc: '鼓励独立储能参与电力现货市场、辅助服务市场，形成"容量电价+电能量交易+辅助服务"的多元收益结构。' },
      { title: '共享储能模式规范化', desc: '推动共享储能模式规范发展，允许多个新能源项目共享同一储能设施，大幅提升储能资产利用率和经济性。' },
    ],
    highlights: ['取消强制配储', '容量电价机制', '独立储能主体地位', '市场化改革', '三重收益结构', '共享储能规范化'],
    impact: '136号文是独立储能商业化的关键政策转折点，标志着储能从"政策被动配置"转向"市场主动投资"，大幅提升了独立储能的商业可持续性和资本吸引力。',
  },
  {
    icon: Shield,
    date: '2025',
    code: '114 号文',
    title: '容量电价',
    line: '完整收益版图成型',
    detail: '发改价格〔2026〕114号文进一步完善独立储能容量电价机制，明确核定标准和结算方式，标志着独立储能"容量电价+电能量+辅助服务"三重收益体系全面确立。',
    keyPoints: [
      { title: '容量电价标准明确', desc: '明确独立储能容量电价的核定标准、考核方式和结算周期，为投融资测算提供清晰、可预期的收益基准。' },
      { title: '考核与激励机制完善', desc: '建立利用率、响应精度、可用容量等考核指标，引导储能资产高质量、高利用率运营，优质资产享有额外激励。' },
      { title: '三重收益体系成型', desc: '容量电价约占30%保底收益，电能量市场化交易占60-70%，辅助服务及地方补贴占5-10%，储能收益版图全面成型。' },
      { title: '费用疏导机制明确', desc: '容量电价费用纳入输配电价统一核定，通过电网终端用户分摊，实现合理商业疏导，降低政策持续性风险。' },
    ],
    highlights: ['容量电价标准确定', '三重收益体系', '30%稳定保底', '60-70%市场化收益', '考核激励机制', '输配电价疏导'],
    impact: '114号文完善了独立储能的收益保障机制，使储能投资具备稳定可预期的现金流，为大规模债权融资、绿色债券发行和资产证券化奠定了坚实基础。',
  },
  {
    icon: Zap,
    date: '2025',
    code: '行动方案',
    title: '规模破局',
    line: '80GW+ 装机 · 2500 亿投资',
    detail: '《新型储能规模化建设专项行动方案（2025—2027年）》是国家推动储能跨越式发展的重要部署，明确三年规模目标和配套政策，标志着新型储能正式进入规模化、体系化加速发展阶段。',
    keyPoints: [
      { title: '三年装机规模目标', desc: '到2027年，新型储能累计装机规模达到80GW以上，年均新增20GW+，配套社会总投资规模超2500亿元，市场空间巨大。' },
      { title: '重点区域战略布局', desc: '优先在"三北"地区、西南水风光基地、沿海核电周边等新能源集中区域推进大型独立共享储能电站建设。' },
      { title: '多元技术路线并进', desc: '以锂离子电池为主体，液流电池、压缩空气、钠离子电池等新型技术路线同步发展，推动安全性与经济性持续提升。' },
      { title: '配套政策体系支撑', desc: '加快电力市场建设、完善容量电价机制、推进国家标准体系建设、支持绿色金融工具和REITs等资产证券化路径。' },
    ],
    highlights: ['80GW+累计装机', '2500亿元投资', '2025-2027三年行动', '20GW/年新增', '多技术路线', '绿色金融配套'],
    impact: '行动方案将储能建设提升为国家工程级战略部署，清晰的规模目标和配套政策为全产业链企业提供了确定的市场预期，尤其利好具备投资-建设-运营一体化能力的头部企业。',
  },
  {
    icon: Building2,
    date: '2025',
    code: '六大支柱',
    title: '支柱产业',
    line: '新型储能列入国家战略产业',
    detail: '新型储能被正式列入国家六大新兴支柱产业，上升为国家战略性产业，享受产业政策、财税支持、金融资源的优先配置，标志着储能产业从"配套设施"全面迈入"战略主体"的历史拐点。',
    keyPoints: [
      { title: '战略产业顶级定位', desc: '新型储能与新一代信息技术、人工智能、生物技术、新能源汽车等并列六大新兴支柱产业，享受国家最高级别产业政策支持，资源配置优先级大幅提升。' },
      { title: '财税政策红利', desc: '储能企业享受高新技术企业税率优惠、研发费用加计扣除、关键设备进口免税等政策，大幅降低企业运营和研发成本，提升项目整体收益率。' },
      { title: '金融资源优先配置', desc: '国家开发银行、绿色金融基金、国家产业引导基金优先支持储能项目，融资利率下降，融资可及性显著提升，杠杆效应扩大。' },
      { title: '产业集群与生态培育', desc: '在重点省份布局国家级储能产业集群，推动研发、制造、建设、投资、运营全产业链企业集聚，形成规模效应和创新生态。' },
      { title: '国际化标准与布局', desc: '加快建立储能国家和行业标准体系，支持龙头企业参与国际标准制定，加快储能技术与产品的国际化市场布局。' },
    ],
    highlights: ['六大新兴支柱产业', '国家最高级别支持', '财税优惠政策', '政策性金融优先', '国家产业集群', '标准体系建设', '国际化战略布局'],
    impact: '跻身国家六大支柱产业是新型储能产业发展的历史性里程碑，在政策体系、资金资源、产业生态三个维度同步优化，行业进入政策红利叠加、资本加速聚集的黄金发展窗口期。',
  },
  {
    icon: Landmark,
    date: '2025',
    code: 'REITs',
    title: 'REITs准入',
    line: '独立储能纳入基础设施REITs',
    detail: '独立储能电站正式纳入国家基础设施公募REITs投资范围，为成熟储能资产开辟标准化资产证券化退出通道，打通"投资-运营-证券化-再投资"资本完整闭环，极大提升储能投资的资本效率。',
    keyPoints: [
      { title: 'REITs准入资质正式确立', desc: '符合条件的电网侧独立共享储能电站可申请发行基础设施公募REITs，资产类型正式纳入国家基础设施范畴，享受REITs专项税收优惠。' },
      { title: '准入条件与容量电价高度适配', desc: '储能REITs要求稳定现金流（容量电价+市场收益）、一定运营年限（通常2年以上）和项目规模，与现行容量电价机制形成完美政策协同。' },
      { title: '显著优化融资成本', desc: 'REITs发行利率通常低于传统项目融资，且实现"一次投资、多轮资本循环"，储能项目IRR提升明显，资本回报效率大幅改善。' },
      { title: '投资人清晰退出机制', desc: '公募REITs为储能资产提供公开市场定价和流动性，为私募股权、产业基金、险资等提供清晰退出路径，大幅增加长期资本的入场积极性。' },
      { title: '示范项目加速推进', desc: '首批储能REITs试点项目已启动筹备，将为行业提供可复制的资产证券化路径、估值参考和监管框架。' },
    ],
    highlights: ['基础设施公募REITs', '资产证券化退出', '公开市场流动性', '容量电价配套', '融资成本降低', 'IRR显著提升', '长线资本入场', '首批试点项目'],
    impact: '储能REITs政策打通了储能行业最关键的"资产退出"环节，解决了长期困扰储能投资的流动性难题，预计吸引数千亿险资、养老金等长线资金进入储能赛道，开创储能基础设施资本化新时代。',
  },
];

const Policy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

  const active = activeId !== null ? policies[activeId] : null;

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
              <span className="text-[#00b49d]"> 点击卡片了解详情 →</span>
            </p>
          </div>
        </div>

        {/* Timeline cards — 6 columns */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-px bg-gray-200 border border-gray-200 mb-16">
          {policies.map((p, i) => {
            const isActive = activeId === i;
            return (
              <div
                key={i}
                onClick={() => setActiveId(isActive ? null : i)}
                className={`policy-card group p-5 lg:p-6 xl:p-7 transition-all duration-700 relative overflow-hidden cursor-pointer ${isActive ? 'bg-[#0a1f1c]' : 'bg-white hover:bg-[#0a1f1c]'}`}
              >
                {/* Year */}
                <div className={`text-xs tracking-[0.3em] mb-6 transition-colors ${isActive ? 'text-[#00b49d]' : 'text-gray-300 group-hover:text-[#00b49d]'}`}>
                  {p.date}
                </div>

                {/* Icon */}
                <p.icon className={`w-7 h-7 text-[#00b49d] mb-5 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />

                {/* Code */}
                <div className="text-xs font-medium text-[#00b49d] mb-2 tracking-wider">{p.code}</div>

                {/* Title */}
                <h3 className={`text-xl lg:text-2xl font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-white'}`}>
                  {p.title}
                </h3>

                {/* Line */}
                <p className={`text-xs leading-relaxed transition-colors ${isActive ? 'text-white/60' : 'text-gray-500 group-hover:text-white/60'}`}>
                  {p.line}
                </p>

                {/* Click hint */}
                <div className={`mt-4 text-xs tracking-widest transition-all duration-300 ${isActive ? 'text-[#00b49d]' : 'text-transparent group-hover:text-[#00b49d]'}`}>
                  详情 →
                </div>
              </div>
            );
          })}
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
                  <span className="text-xs tracking-[0.3em] text-[#00b49d]">{active.date}</span>
                  <div className="h-px flex-1 bg-white/10 max-w-[100px]" />
                  <span className="text-xs tracking-[0.2em] text-[#00b49d]">{active.code}</span>
                </div>
                <div className="flex items-start gap-6 mb-6">
                  <active.icon className="w-14 h-14 text-[#00b49d] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                      {active.title}
                    </h3>
                    <div className="text-sm tracking-[0.1em] text-white/50 mt-2">{active.line}</div>
                  </div>
                </div>
                <p className="text-base lg:text-lg text-white/70 leading-relaxed font-light max-w-3xl">
                  {active.detail}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                {/* 核心内容 */}
                <div className="panel-anim lg:col-span-7">
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-xs tracking-[0.3em] text-[#00b49d]">01</span>
                    <h4 className="text-2xl font-bold">核心内容</h4>
                  </div>
                  <div className="space-y-5">
                    {active.keyPoints.map((item, i) => (
                      <div key={i} className="pl-5 border-l-2 border-white/10 hover:border-[#00b49d] transition-colors">
                        <h5 className="text-base font-semibold text-white mb-2">{item.title}</h5>
                        <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 政策亮点 */}
                <div className="panel-anim lg:col-span-5">
                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-xs tracking-[0.3em] text-[#00b49d]">02</span>
                    <h4 className="text-2xl font-bold">政策亮点</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.highlights.map((tag, i) => (
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
                  {active.impact}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Policy;
