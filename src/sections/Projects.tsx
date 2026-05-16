import { useEffect, useRef } from 'react';
import { MapPin, ArrowRight, ExternalLink, Zap, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: '河北邢台龙岗储能电站',
    location: '河北省邢台市',
    type: '电网侧独立储能',
    capacity: '300MW/1200MWh',
    image: '/images/project-weixian.jpg',
    description: '全国最大规模独立储能电站之一，高标准建设，服务电网调峰调频，获当地电网"先进单位"认定，成为区域储能标杆。',
    features: ['高标准建设', '智能化运营', '调峰调频'],
    highlight: '区域储能标杆',
    status: '已并网',
  },
  {
    id: 2,
    title: '云南曲靖马龙储能电站',
    location: '云南省曲靖市',
    type: '电网侧独立储能',
    capacity: '400MW/800MWh',
    image: './images/project-aidc.jpg',
    description: '云南省重点储能项目，支撑新能源消纳与电网稳定运行，依托AI数智运营平台实现全生命周期智慧管理。',
    features: ['新能源消纳', 'AI数智运营', '全周期服务'],
    highlight: '云南重点项目',
    status: '已并网',
  },
  {
    id: 3,
    title: '山西大同新荣储能电站',
    location: '山西省大同市',
    type: '电网侧独立储能',
    capacity: '400MW/800MWh',
    image: './images/project-robot.jpg',
    description: '山西省大规模储能标杆项目，为华北电网提供调峰、调频、备用等多类辅助服务，三重收益结构持续稳定运营。',
    features: ['辅助服务', '三重收益', '容量电价'],
    highlight: '华北电网支撑',
    status: '在建',
  },
  {
    id: 4,
    title: '广东惠州惠东储能电站',
    location: '广东省惠州市',
    type: '电网侧独立储能',
    capacity: '200MW/400MWh',
    image: '/images/project-weixian.jpg',
    description: '粤港澳大湾区重点储能项目，支撑广东省电力现货市场发展，参与调频辅助服务市场，收益领先行业平均水平。',
    features: ['现货市场交易', '调频辅助服务', '大湾区布局'],
    highlight: '大湾区标杆',
    status: '已并网',
  },
  {
    id: 5,
    title: '国峰天狼智能巡检机器人',
    location: '全国储能场站',
    type: '智能运维系统',
    capacity: '24×7全天候',
    image: './images/project-robot.jpg',
    description: '自主研发的智能巡检机器人"国峰天狼"，专为储能场站设计，AI视觉识别+红外热成像+自主导航，实现"无人值班、少人值守"。',
    features: ['AI视觉识别', '红外热成像', '自主导航'],
    highlight: '智能运维创新',
    status: '量产中',
  },
  {
    id: 6,
    title: '天津武清东马圈储能电站',
    location: '天津市武清区',
    type: '电网侧独立储能',
    capacity: '200MW/400MWh',
    image: './images/project-aidc.jpg',
    description: '京津冀区域重点储能项目，有效缓解区域高峰供电压力，参与华北电力辅助服务市场，运营数据稳健优异。',
    features: ['京津冀布局', '辅助服务市场', '稳健运营'],
    highlight: '京津冀项目',
    status: '已并网',
  },
];

const statusColors: Record<string, string> = {
  '已并网': '#00b49d',
  '在建': '#005c4b',
  '量产中': '#007a65',
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );

      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'expo.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 70%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00b49d]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00b49d]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#e6f7f5] text-[#00b49d] text-sm font-medium rounded-full mb-4">项目案例</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              重点项目<span className="text-[#00b49d]">展示</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              覆盖9省份，56个在手项目，以卓越品质与领先性能立足市场
            </p>
          </div>
          <div className="mt-6 lg:mt-0 flex gap-6 text-center">
            {[
              { value: '4.72GWh', label: '已并网' },
              { value: '9.6GWh', label: '在建' },
              { value: '39.62GWh', label: '在手总计' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-[#00b49d]">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div key={project.id} className="project-card group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#00b49d]/30">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="inline-block px-3 py-1 bg-[#00b49d] text-white text-xs font-medium rounded-full">{project.highlight}</span>
                  <span className="inline-block px-3 py-1 text-white text-xs font-medium rounded-full"
                    style={{ backgroundColor: statusColors[project.status] || '#00b49d' }}>{project.status}</span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">{project.capacity}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs text-[#00b49d] font-medium uppercase tracking-wider">{project.type}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 group-hover:text-[#00b49d] transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-[#e6f7f5] text-[#00b49d] text-xs rounded-md">{feature}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button className="inline-flex items-center gap-2 text-[#00b49d] font-medium text-sm hover:gap-3 transition-all duration-300">
                    了解详情 <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#00b49d] hover:text-white transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-[#f5f5f5] to-[#e6f7f5] rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">全国重点项目分布</h4>
                <p className="text-gray-600 text-sm mb-4">已覆盖广东、广西、河北、河南、江苏、宁夏、山西、天津、云南等省份，拟于近期并网7个项目共计4.6GWh</p>
                <div className="flex flex-wrap gap-2">
                  {['广东·惠东', '河北·龙岗', '山西·大同', '山西·繁峙', '云南·曲靖', '云南·大理', '云南·富源', '河南·新蔡', '天津·武清', '宁夏·中宁', '江苏·泰州', '广西·百色'].map((p, i) => (
                    <span key={i} className="px-3 py-1 bg-white text-gray-700 text-xs rounded-full border border-gray-200">{p}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, value: '56个', label: '在手项目总计', sub: '39.62GWh总容量' },
                  { icon: TrendingUp, value: '2026目标', label: '30GWh并网', sub: '2030年100GWh全球第一' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm text-center">
                    <div className="w-10 h-10 bg-[#e6f7f5] rounded-lg flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-5 h-5 text-[#00b49d]" />
                    </div>
                    <div className="text-xl font-bold text-[#00b49d] mb-1">{item.value}</div>
                    <div className="text-sm font-medium text-gray-900">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
