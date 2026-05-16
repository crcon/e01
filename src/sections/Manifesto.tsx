import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.manifesto-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'expo.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-32 lg:py-44 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(to right, #00b49d 1px, transparent 1px), linear-gradient(to bottom, #00b49d 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive headline */}
        <div className="manifesto-item mb-4">
          <span className="text-sm tracking-[0.3em] text-[#00b49d] font-medium">— OUR MISSION</span>
        </div>

        <h2 className="manifesto-item text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight text-gray-900 mb-12 lg:mb-20">
          让每一度电
          <br />
          都更<span className="text-[#00b49d]">智慧</span>·更<span className="text-[#00b49d]">绿色</span>。
        </h2>

        {/* Three-pillar manifesto */}
        <div className="grid md:grid-cols-3 gap-px bg-gray-100 mt-16">
          {[
            { num: '01', title: '智慧能源', en: 'Smart Energy', desc: '以数字之力重构能源血脉' },
            { num: '02', title: '数字驱动', en: 'Digital Driven', desc: '以科技之智赋能绿色转型' },
            { num: '03', title: '全球引领', en: 'Global Leader', desc: '立足中国，引领世界能源未来' },
          ].map((p, i) => (
            <div key={i} className="manifesto-item bg-white p-8 lg:p-12 group hover:bg-[#00b49d] transition-colors duration-700">
              <div className="text-xs tracking-[0.3em] text-gray-400 group-hover:text-white/60 mb-6 transition-colors">
                {p.num} / 03
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-white mb-1 transition-colors">
                {p.title}
              </h3>
              <div className="text-xs tracking-wider text-[#00b49d] group-hover:text-white/80 mb-6 transition-colors">
                {p.en}
              </div>
              <p className="text-base text-gray-500 group-hover:text-white/90 leading-relaxed transition-colors">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
