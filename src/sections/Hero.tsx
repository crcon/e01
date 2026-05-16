import { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animated Grid Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Grid nodes
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; pulse: number }[] = [];
    const nodeCount = 80;
    const connectionDistance = 150;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node with pulse
        const pulseIntensity = Math.sin(node.pulse) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (1 + pulseIntensity * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 157, ${0.6 + pulseIntensity * 0.4})`;
        ctx.fill();

        // Draw connections
        nodes.slice(i + 1).forEach((other) => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(0, 180, 157, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Text Animation
  useEffect(() => {
    // Title decode effect
    if (titleRef.current) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const originalText = '易储数智能源';
      let iteration = 0;

      const interval = setInterval(() => {
        if (titleRef.current) {
          titleRef.current.innerText = originalText
            .split('')
            .map((_, index) => {
              if (index < iteration) return originalText[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        }
        iteration += 1 / 3;
        if (iteration >= originalText.length) {
          clearInterval(interval);
          if (titleRef.current) titleRef.current.innerText = originalText;
        }
      }, 50);
    }

    // Subtitle slide up
    gsap.fromTo(
      subtitleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.8 }
    );

    // Description fade in
    gsap.fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.0 }
    );

    setIsLoaded(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 2s ease' }}
      />

      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(./images/hero-bg.jpg)',
          opacity: 0.3,
          mixBlendMode: 'screen',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-dark mb-6 sm:mb-8 animate-fade-in">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#00b49d]" />
          <span className="text-xs sm:text-sm text-white/80 whitespace-nowrap">全球电网侧独立共享储能电站行业领导者</span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 tracking-tight px-2 leading-[3.25]"
          style={{ fontFamily: '"Inter Tight", sans-serif' }}
        >
          易储数智能源
        </h1>

        {/* Subtitle */}
        <h2
          ref={subtitleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#00b49d] mb-6 sm:mb-8 opacity-0 leading-[4.06]"
        >
          大储能生态
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base sm:text-lg md:text-xl text-white/90 font-semibold max-w-3xl mx-auto px-4 sm:px-0 opacity-0 mb-8 sm:mb-12 leading-[2.4] mt-[20%]"
        >
          深圳易储数智能源集团 · 赣锋锂业核心能源平台
          <br className="hidden sm:block" />
          <span className="text-white/80 block sm:inline mt-1 sm:mt-0">全球新型能源电力系统核心构建者 · 储能全生态领导者</span>
        </p>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2">
        <span className="text-white/40 text-[10px] sm:text-xs">向下滚动</span>
        <div className="w-4 h-7 sm:w-5 sm:h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 sm:w-1.5 sm:h-2.5 bg-[#00b49d] rounded-full animate-bounce" />
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00b49d]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00b49d]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default Hero;
