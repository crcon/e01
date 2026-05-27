import { useEffect, useRef } from 'react';
import {
  Cpu,
  Factory,
  HardHat,
  Battery,
  BrainCircuit,
  Recycle,
  ArrowRight,
  Target,
  Users,
  Award
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const subsidiaries = [
  {
    icon: Cpu,
    name: '国峰数智能源软件公司',
    role: '科技研发',
    description: '自主研发BMS/EMS/PCS核心控制系统，AI调度引擎与数字孪生平台',
    tag: '软件·算法',
  },
  {
    icon: Factory,
    name: '国峰元储科技智造公司',
    role: '智能制造',
    description: 'Pack集成制造，年产能30GWh，循环寿命≥12800次，系统效率≥98%',
    tag: '制造·集成',
  },
  {
    icon: Battery,
    name: '易储数智能源投资',
    role: '开发投资',
    description: '聚焦电网侧独立共享储能电站投资开发，在手项目56个、总容量39.62GWh，覆盖全国10+省份',
    tag: '开发·投资',
  },
  {
    icon: HardHat,
    name: '国峰能建',
    role: 'F.EPC+O',
    description: '电网侧储能电站EPC全流程工程管控，高效交付，在手56个项目',
    tag: '融资-建设-交付-运营',
  },
  {
    icon: BrainCircuit,
    name: '国峰AiDC运营公司',
    role: 'AI数智运营',
    description: '智能电力交易、AI运维、AIDC供电方案，50+电站30GWh运营管理',
    tag: 'AI·运营',
  },
  {
    icon: Recycle,
    name: '国峰循环',
    role: '回收循环',
    description: '电池全生命周期管理，退役电池梯次利用与资源化回收，构建绿色闭环产业链',
    tag: '回收·循环',
  },
];

const companyHighlights = [
  {
    icon: Target,
    title: '企业使命',
    content: '最懂储能电力运营专家，以科技驱动、服务护航，全方位全周期为客户实现电站资产价值最大化',
  },
  {
    icon: Award,
    title: '企业愿景',
    content: '成为全球能源资产数智运营的领航者，全球储能全产业链价值创造标杆',
  },
  {
    icon: Users,
    title: '核心团队',
    content: '290+人专业团队，12+博士，80+本科硕士，60+电力高级工程师',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.eco-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
        );
      }

      gsap.fromTo(introRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: introRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(highlightsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: highlightsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #00b49d 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#e6f7f5] text-[#00b49d] text-sm font-medium rounded-full mb-4">企业介绍</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            易储数智能源<span className="text-[#00b49d]">大储能生态</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            深圳易储数智能源集团，赣锋锂业核心能源平台，全球新型能源电力系统核心构建者与储能全生态领导者
          </p>
        </div>

        {/* Five Subsidiaries + Recycle */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5 mb-16">
          {subsidiaries.map((item, index) => (
            <div key={index} className="eco-card group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#00b49d]/30 transition-all duration-500 hover-lift cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e6f7f5] to-[#00b49d]/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#00b49d] transition-all duration-500">
                <item.icon className="w-6 h-6 text-[#00b49d] group-hover:text-white transition-colors duration-500" />
              </div>
              <span className="inline-block px-2 py-0.5 bg-[#e6f7f5] text-[#00b49d] text-xs rounded-full mb-2">{item.tag}</span>
              <h3 className="text-sm font-bold text-gray-900 mb-1 leading-tight">{item.role}</h3>
              <p className="text-xs text-gray-400 leading-snug line-clamp-2">{item.name}</p>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-4 h-4 text-[#00b49d]" />
              </div>
            </div>
          ))}
        </div>

        {/* Company Introduction */}
        <div ref={introRef} className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="./images/about-facility.jpg" alt="储能电站设施" className="w-full h-[400px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-xl font-bold text-white">赣锋锂业</div>
                  <div className="text-xs text-white/70">40.04%  核心股东</div>
                </div>
                <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-xl font-bold text-white">万鑫绿色</div>
                  <div className="text-xs text-white/70">44.24%  战略股东</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#00b49d]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#00b49d]/10 rounded-full blur-2xl" />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              全球新型能源电力系统<span className="text-[#00b49d]">核心构建者</span>
            </h3>
            <p className="text-gray-600 leading-relaxed">
              易储数智能源集团作为赣锋锂业集团旗下核心能源平台，立足深圳，依托赣锋锂业全球资源，布局电网侧独立共享储能，助推能源结构转型升级。致力于构建"储能科技研发—智能制造—工程建设—储能电站—AI数智运营—电池回收"全产业链闭环。
            </p>
            <div className="space-y-4">
              {[
                { icon: Cpu, title: '核心硬件研发', desc: '自主研发BMS/EMS/PCS核心控制系统，毫秒级响应，SIL2安全等级，25年+设计寿命，87项核心专利布局' },
                { icon: BrainCircuit, title: 'AI数智运营平台', desc: '构建"源-网-荷-储-碳"一体化智慧能源操作系统，88%充放电效率，87%电价预测准确率' },
                { icon: Battery, title: '全链条闭环服务', desc: '覆盖项目规划、融资、EPC建设到AI运营、绿电交易、电池回收全生命周期，出口30+国家地区' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#e6f7f5] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#00b49d]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Highlights */}
        <div ref={highlightsRef} className="grid md:grid-cols-3 gap-6">
          {companyHighlights.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-[#005c4b] to-[#00b49d] rounded-2xl p-6 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-white/80 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
