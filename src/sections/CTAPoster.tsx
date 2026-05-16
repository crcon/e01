import { useEffect, useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTAPoster = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.fade-up') || [],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* Big poster container */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#005c4b] via-[#007a65] to-[#00b49d]">
          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
          {/* Image overlay (low-opacity industrial feel) */}
          <div className="absolute inset-0">
            <img src="./images/about-facility.jpg" alt="" className="w-full h-full object-cover opacity-[0.15] mix-blend-luminosity" />
          </div>
          {/* Side glow */}
          <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 p-10 lg:p-20 text-white">
            <div className="fade-up text-sm tracking-[0.3em] text-white/70 font-medium mb-6">
              — LET'S BUILD THE FUTURE
            </div>

            <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 items-end">
              <div>
                <h2 className="fade-up text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                  能源的未来，<br />
                  始于今日的<span className="text-[#a8f0e8]">合作</span>。
                </h2>
                <p className="fade-up text-lg lg:text-xl text-white/70 max-w-2xl font-light">
                  以科技创新为引擎，以全产业链闭环为支撑，致力于成为全球能源电力数智化的核心构建者。
                </p>
              </div>

              <div className="fade-up flex flex-col gap-3">
                <button
                  onClick={scrollToContact}
                  className="group flex items-center justify-between gap-4 px-7 py-5 bg-white text-[#005c4b] rounded-2xl font-bold hover:bg-[#a8f0e8] transition-all duration-300">
                  <span className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>立即洽谈合作</span>
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="tel:13980081510"
                  className="px-7 py-4 border-2 border-white/30 hover:border-white text-white rounded-2xl font-medium text-center transition-colors">
                  <span className="text-xs text-white/60 mr-2">商务专线</span>
                  139-8008-1510
                </a>
              </div>
            </div>

            {/* Brand stats strip */}
            <div className="fade-up grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/15">
              {[
                { v: '32.82', u: 'GWh', l: '在手装机' },
                { v: '13', u: '省', l: '全国布局' },
                { v: '290+', u: '人', l: '专业团队' },
                { v: '87', u: '项', l: '核心专利' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl lg:text-4xl font-black">{s.v}</span>
                    <span className="text-base text-[#a8f0e8] font-semibold">{s.u}</span>
                  </div>
                  <div className="text-xs text-white/50 mt-1 tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAPoster;
