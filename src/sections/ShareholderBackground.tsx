import { useEffect, useRef } from 'react';
import { 
  Landmark, 
  TrendingUp, 
  Shield, 
  Battery,
  Recycle,
  Cpu,
  Handshake,
  Target,
  CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wanxinAdvantages = [
  {
    icon: TrendingUp,
    title: '资金保障',
    description: '依托国有资本实力，提供持续稳定的资金支持，有效提升企业融资能力与抗风险能力。',
  },
  {
    icon: Landmark,
    title: '资源协同',
    description: '依托国资体系资源优势，强化与地方政府及能源央国企的协同联动，拓展优质新能源项目资源。',
  },
  {
    icon: Shield,
    title: '项目经验',
    description: '共享集团累计超300亿元新能源投资经验及5GW+在运新能源项目开发、建设与运营能力。',
  },
];

const ganfengAdvantages = [
  {
    icon: Battery,
    title: '产业协同',
    description: '依托赣锋锂业完整产业链体系，保障核心电芯稳定供应，提升储能系统整体可靠性与成本优势。',
  },
  {
    icon: Cpu,
    title: '技术支撑',
    description: '共享先进电池材料与电池安全技术成果，持续提升储能系统性能与技术水平。',
  },
  {
    icon: Recycle,
    title: '绿色循环',
    description: '通过电池回收及资源循环利用体系，推动储能产业绿色可持续发展，助力实现"双碳"目标。',
  },
];

const ShareholderBackground = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const wanxinRef = useRef<HTMLDivElement>(null);
  const ganfengRef = useRef<HTMLDivElement>(null);
  const fusionRef = useRef<HTMLDivElement>(null);

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

      // Wanxin section animation
      gsap.fromTo(
        wanxinRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: wanxinRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Ganfeng section animation
      gsap.fromTo(
        ganfengRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ganfengRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Fusion section animation
      gsap.fromTo(
        fusionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: fusionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="shareholder"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f5f5f5] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#e6f7f5]/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white text-[#00b49d] text-sm font-medium rounded-full mb-4 shadow-sm">
            股东背景
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            国资引领<span className="text-[#00b49d]">·</span>产业协同
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            构建储能产业高质量发展坚实基础
          </p>
        </div>

        {/* 一、国资平台支撑 */}
        <div ref={wanxinRef} className="mb-16">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <img
                  src="./images/shareholder-wanxin.jpg"
                  alt="万鑫绿色能源"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:bg-gradient-to-t lg:from-black/60 lg:to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00b49d] rounded-full mb-3">
                    <Landmark className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">国有控股</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">万鑫绿色能源</h3>
                  <p className="text-white/80 text-sm">持股44.24% · 江苏省属国资</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#e6f7f5] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#00b49d]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">国资平台支撑 · 44.24%</h4>
                    <p className="text-sm text-gray-500">主体信用评级 AAA 级</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  万鑫绿色能源依托江苏省属国资体系，具备雄厚的资本实力与稳健的信用基础，
                  主体信用评级达 <span className="text-[#00b49d] font-bold">AAA 级</span>，
                  为公司发展提供长期、稳定、可靠的战略支撑。
                </p>

                <h5 className="text-sm font-semibold text-gray-900 mb-4">核心优势</h5>
                <div className="space-y-4">
                  {wanxinAdvantages.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#e6f7f5] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-[#00b49d]" />
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-900">{item.title}</h6>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 二、产业龙头协同 */}
        <div ref={ganfengRef} className="mb-16">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid lg:grid-cols-2">
              {/* Content - Order reversed on desktop */}
              <div className="p-8 order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#e6f7f5] flex items-center justify-center">
                    <Battery className="w-6 h-6 text-[#00b49d]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">产业龙头协同 · 40.04%</h4>
                    <p className="text-sm text-gray-500">002460.SZ / 01772.HK</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#e6f7f5] text-[#00b49d] text-sm rounded-full">002460.SZ</span>
                  <span className="px-3 py-1 bg-[#e6f7f5] text-[#00b49d] text-sm rounded-full">01772.HK</span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  赣锋锂业是全球第一大锂化合物供应商、全球第六大储能电池出货商，拥有完整锂产业链，
                  覆盖"锂资源开发—锂盐加工—动力及储能电池—电池回收利用"，
                  全球唯一同时拥有"卤水提锂""矿石提锂""回收提锂"三大技术的企业。持股易储数智40.04%，为核心产业协同股东。
                </p>

                <h5 className="text-sm font-semibold text-gray-900 mb-4">核心优势</h5>
                <div className="space-y-4">
                  {ganfengAdvantages.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#e6f7f5] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-[#00b49d]" />
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-900">{item.title}</h6>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative h-64 lg:h-auto order-1 lg:order-2">
                <img
                  src="./images/shareholder-ganfeng.jpg"
                  alt="赣锋锂业"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent lg:bg-gradient-to-t lg:from-black/60 lg:to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00b49d] rounded-full mb-3">
                    <TrendingUp className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">全球锂王</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">赣锋锂业</h3>
                  <p className="text-white/80 text-sm">持股40.04% · A+H股上市</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 三、国资与产业深度融合 */}
        <div ref={fusionRef}>
          <div className="bg-gradient-to-br from-[#005c4b] to-[#00b49d] rounded-2xl p-8 lg:p-12 text-white">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
                <Handshake className="w-5 h-5" />
                <span className="text-sm font-medium">深度融合</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">国资与产业深度融合</h3>
              <p className="text-white/80 max-w-2xl mx-auto">
                公司股东结构实现了国有资本优势与产业龙头技术优势的深度融合，
                形成"资本保障 + 资源协同 + 技术支撑 + 成本优势"的综合竞争力。
              </p>
            </div>

            {/* Core Competitiveness */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { icon: TrendingUp, title: '资本保障', desc: '国有资本实力支撑' },
                { icon: Landmark, title: '资源协同', desc: '国资体系资源联动' },
                { icon: Cpu, title: '技术支撑', desc: '产业龙头技术优势' },
                { icon: Target, title: '成本优势', desc: '产业链成本优化' },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Bottom Statement */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-white/90 leading-relaxed">
                  在国家加快构建新型电力系统、推进能源结构转型的背景下，
                  公司依托股东资源优势，积极布局风光储一体化项目，
                  持续提升新能源与储能领域的综合服务能力，
                  为推动能源绿色低碳转型和高质量发展贡献力量。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareholderBackground;
