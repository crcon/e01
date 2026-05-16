import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BatteryCharging, 
  TrendingUp, 
  BarChart3, 
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Settings
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    id: 'investment',
    icon: BatteryCharging,
    title: '储能电站投资',
    subtitle: 'Storage Investment',
    image: './images/solution-investment.jpg',
    description: '专注于电网侧独立共享储能电站的投资开发，提供从项目规划、融资、建设到运营的全生命周期服务。',
    features: [
      '高标准建设：遵循国际标准与本地规范，集成先进设备与智慧设计',
      '智能化运营：依托AI与大数据实现电站实时监测、动态调度',
      '全周期服务：从项目规划、投融资方案、EPC建设到运营维护',
      '多元价值创造：通过电力市场交易、辅助服务及碳资产运营提升收益',
    ],
    stats: [
      { value: '20GWh+', label: '2025年开发量' },
      { value: '310+', label: '潜在项目覆盖' },
      { value: '110+', label: '政府合作关系' },
    ],
  },
  {
    id: 'operation',
    icon: TrendingUp,
    title: '电力资产运营',
    subtitle: 'Asset Operation',
    image: './images/solution-operation.jpg',
    description: '以"AI智能交易软件+专业电力运营团队"为核心优势，为储能电站、新能源场站提供全链路智慧运营解决方案。',
    features: [
      '智慧能量管理：AI赋能的电力能量管理平台，实现源网荷储协同优化',
      '智能运维管理：故障预测、诊断分析、运维决策一体化的电站健康管理',
      '电力数据智能：基于多源数据融合与AI分析，提供负荷预测、交易辅助决策',
      '一体化运营平台：构建"监、控、管、维"一体化数字系统',
    ],
    stats: [
      { value: '86%+', label: '充放电效率' },
      { value: '85%', label: '电价预测准确率' },
      { value: '40%', label: '运维效率提升' },
    ],
  },
  {
    id: 'trading',
    icon: BarChart3,
    title: '电力交易',
    subtitle: 'Power Trading',
    image: './images/solution-trading.jpg',
    description: '基于AI算法的智能交易辅助决策系统，深度挖掘数据价值，实现电站收益最大化。',
    features: [
      '现货市场套利：通过智能交易系统实时竞价，最大化现货套利空间',
      '辅助服务收益：结合调频等辅助服务，提高储能收益',
      '虚拟电厂运营：利用不同区域市场峰谷价差差异，实现套利',
      '碳资产管理：CCER开发、绿证开发及交易，提升绿色品牌价值',
    ],
    stats: [
      { value: '0.7元', label: '山东峰谷价差' },
      { value: '0.02元', label: '度电收益提升' },
      { value: 'D+10', label: '电价预测周期' },
    ],
  },
];

const serviceHighlights = [
  {
    icon: Zap,
    title: '源网荷储一体化',
    description: '电网侧储能电站、零碳园区、虚拟电厂、微电网',
  },
  {
    icon: Shield,
    title: '全流程服务',
    description: '前期策划、规划设计、投资建设、运营维护',
  },
  {
    icon: Settings,
    title: '金融服务',
    description: '产业基金、融资租赁、保险服务、供应链金融',
  },
];

const Solutions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('investment');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Tabs animation
      gsap.fromTo(
        tabsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Services animation
      gsap.fromTo(
        servicesRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Tab change animation
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const content = document.querySelector(`[data-tab-content="${value}"]`);
    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  };

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#e6f7f5]/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#e6f7f5] text-[#00b49d] text-sm font-medium rounded-full mb-4 shadow-sm">
            业务介绍
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            领先的全场景<span className="text-[#00b49d]">智慧储能方案</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            构建集"供给侧+需求侧+服务侧"于一体的碳中和全产业链解决方案
          </p>
        </div>

        {/* Tabs */}
        <div ref={tabsRef} className="mb-16">
          <Tabs
            defaultValue="investment"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            {/* Tab List */}
            <TabsList className="w-full max-w-2xl mx-auto flex gap-2 bg-[#f5f5f5] p-2 rounded-2xl mb-12 h-auto">
              {solutions.map((solution) => (
                <TabsTrigger
                  key={solution.id}
                  value={solution.id}
                  className="flex-1 flex items-center justify-center py-4 px-3 rounded-xl data-[state=active]:bg-[#00b49d] data-[state=active]:text-white transition-all duration-300 min-h-[80px]"
                >
                  <div className="flex flex-col items-center gap-1">
                    <solution.icon className="w-5 h-5 mb-1 flex-shrink-0" />
                    <span className="text-sm font-medium hidden sm:block leading-tight">{solution.title}</span>
                    <span className="text-xs opacity-70 hidden sm:block leading-tight">{solution.subtitle}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Contents */}
            {solutions.map((solution) => (
              <TabsContent
                key={solution.id}
                value={solution.id}
                data-tab-content={solution.id}
                className="mt-0"
              >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Image */}
                  <div className="relative group">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-[400px] lg:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Title Badge */}
                      <div className="absolute top-6 left-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                          <span className="text-white font-semibold">{solution.title}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                      {solution.stats.map((stat, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-4 shadow-lg text-center"
                        >
                          <div className="text-xl lg:text-2xl font-bold text-[#00b49d]">
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Decorative */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#00b49d]/10 rounded-full blur-2xl" />
                  </div>

                  {/* Content */}
                  <div className="space-y-6 lg:pt-0 pt-8">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {solution.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {solution.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      {solution.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-[#f5f5f5] rounded-xl hover:bg-[#e6f7f5] transition-colors duration-300"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#00b49d] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-4">
                      <button 
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 bg-[#00b49d] hover:bg-[#005c4b] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:gap-4"
                      >
                        咨询详情
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Service Highlights */}
        <div ref={servicesRef}>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            全方位服务体系
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {serviceHighlights.map((service, index) => (
              <div
                key={index}
                className="group bg-[#f5f5f5] rounded-2xl p-6 hover:bg-gradient-to-br hover:from-[#005c4b] hover:to-[#00b49d] transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-500">
                  <service.icon className="w-6 h-6 text-[#00b49d] group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-white transition-colors duration-500">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm group-hover:text-white/80 transition-colors duration-500">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
