import { useEffect, useRef } from 'react';
import {
  Handshake, Landmark, Wallet, Settings, TrendingUp,
  ArrowRight, Users, Building2, RefreshCw, Zap,
  CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cooperationModes = [
  {
    icon: Users,
    color: '#00b49d',
    tag: '联合开发',
    title: 'Joint Development',
    desc: '与具备属地资源优势的合作方强强联合，共同推进独立储能项目落地。',
    role: { resource: '土地 / 备案 / 接入指标', invest: '资金 / EPC / 运营服务' },
  },
  {
    icon: Building2,
    color: '#005c4b',
    tag: '自主开发',
    title: 'Independent Development',
    desc: '重点区域设立项目公司，组建本地化团队，全流程主导项目开发与建设。',
    role: { resource: '地方政府对接 / 招商接洽', invest: '主导开发 / 全周期管控' },
  },
  {
    icon: Zap,
    color: '#007a65',
    tag: '源网荷储一体化',
    title: 'Source-Grid-Load-Storage',
    desc: '高能耗 / 高消纳 / 绿证需求企业，绿电直连、零碳园区、离网微电网方案。',
    role: { resource: '能耗诊断 / 消纳条件调研', invest: '能源投资运营方案设计' },
  },
  {
    icon: RefreshCw,
    color: '#008f7a',
    tag: '资产出表',
    title: 'Asset Divestiture',
    desc: '针对已并网或投运项目，引入战略投资者或整体转让，回笼资金 + 保留运营服务。',
    role: { resource: '战略投资者引入 / 股权转让', invest: '运营服务优先权保留' },
  },
];

const advantages = [
  { icon: Landmark,   title: '资源优势互补', desc: '合作方提供土地、指标、地方关系等核心资源' },
  { icon: Wallet,     title: '资金专业输出', desc: '易储能源提供全额资金及专业技术运营服务' },
  { icon: Settings,   title: '标准化流程',   desc: '按里程碑节点验收，分阶段支付开发费' },
  { icon: TrendingUp, title: '利益共享机制', desc: '项目权益平稳交割，长期收益共享' },
];

const JointDevelopment = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const modesRef = useRef<HTMLDivElement>(null);
  const advRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      const cards = modesRef.current?.querySelectorAll('.mode-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'expo.out',
            scrollTrigger: { trigger: modesRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
      const advCards = advRef.current?.querySelectorAll('.adv-card');
      if (advCards) {
        gsap.fromTo(advCards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: advRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="joint-development" ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f5f5f5] overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#e6f7f5]/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-white text-[#00b49d] text-sm font-medium rounded-full mb-4 shadow-sm">合作模式</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            灵活多元的<span className="text-[#00b49d]">合作机制</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            围绕储能电站投资与电力服务业务，形成四类灵活的项目合作开发模式，实现规模扩张与资金高效周转
          </p>
        </div>

        {/* Cooperation Modes Grid */}
        <div ref={modesRef} className="grid md:grid-cols-2 gap-6 mb-16">
          {cooperationModes.map((m, i) => (
            <div key={i} className="mode-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#00b49d]/30">
              {/* Header */}
              <div className="p-6" style={{ background: `linear-gradient(135deg, ${m.color}12 0%, ${m.color}04 100%)` }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: m.color }}>
                    <m.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: m.color }}>{m.title}</div>
                    <h3 className="text-lg font-bold text-gray-900">{m.tag}</h3>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{m.desc}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Landmark className="w-3.5 h-3.5" style={{ color: m.color }} />
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">合作方</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-snug">{m.role.resource}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Wallet className="w-3.5 h-3.5" style={{ color: m.color }} />
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">易储能源</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-snug">{m.role.invest}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advantages */}
        <div ref={advRef} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#e6f7f5] flex items-center justify-center">
              <Handshake className="w-5 h-5 text-[#00b49d]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">合作模式核心优势</h3>
              <p className="text-sm text-gray-500">资源 · 资金 · 流程 · 利益 四位一体</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {advantages.map((a, i) => (
              <div key={i} className="adv-card bg-gradient-to-br from-[#f8fffd] to-[#e6f7f5]/40 rounded-xl p-5 border border-[#e0f5f1]">
                <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3">
                  <a.icon className="w-5 h-5 text-[#00b49d]" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1.5">{a.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00b49d]" />
              <span className="text-sm text-gray-700">资源互补 · 风险共担 · 收益共享 · 协同共创</span>
            </div>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#00b49d] hover:bg-[#005c4b] text-white rounded-full font-medium text-sm transition-colors duration-300">
              洽谈合作 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default JointDevelopment;
