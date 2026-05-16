import { useEffect, useRef } from 'react';
import {
  Target, Flag, Workflow,
  Building2, Monitor, Box, Network,
  Battery, Leaf, Zap, Globe,
  ShieldCheck, TrendingUp, Sprout, Users,
  MapPin, ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 全国34省市自治区代表城市（地理坐标近似映射）
const cityNodes = [
  // 东北
  { name: '哈尔滨', x: 79, y: 9 },
  { name: '长春',   x: 80, y: 14 },
  { name: '沈阳',   x: 76, y: 19 },
  // 华北
  { name: '呼和浩特', x: 58, y: 22 },
  { name: '北京',   x: 70, y: 26 },
  { name: '天津',   x: 72, y: 29 },
  { name: '石家庄', x: 68, y: 32 },
  { name: '太原',   x: 62, y: 33 },
  // 西北
  { name: '银川',   x: 53, y: 31 },
  { name: '兰州',   x: 49, y: 38 },
  { name: '西宁',   x: 42, y: 40 },
  { name: '西安',   x: 57, y: 41 },
  { name: '乌鲁木齐', x: 16, y: 21 },
  // 西藏
  { name: '拉萨',   x: 28, y: 55 },
  // 华东
  { name: '济南',   x: 73, y: 35 },
  { name: '南京',   x: 76, y: 44 },
  { name: '上海',   x: 80, y: 48 },
  { name: '合肥',   x: 73, y: 47 },
  { name: '杭州',   x: 78, y: 52 },
  { name: '福州',   x: 76, y: 62 },
  // 华中
  { name: '郑州',   x: 67, y: 41 },
  { name: '武汉',   x: 66, y: 51 },
  { name: '长沙',   x: 63, y: 58 },
  { name: '南昌',   x: 71, y: 58 },
  // 西南
  { name: '重庆',   x: 58, y: 56 },
  { name: '成都',   x: 52, y: 58 },
  { name: '贵阳',   x: 58, y: 65 },
  { name: '昆明',   x: 47, y: 67 },
  // 华南
  { name: '广州',   x: 65, y: 72 },
  { name: '深圳',   x: 67, y: 76 },
  { name: '南宁',   x: 56, y: 74 },
  { name: '海口',   x: 64, y: 83 },
];

// 战略目标
const strategicGoals = [
  { icon: Building2, big: 'GW 级', label: '网侧独立储能电站布局', sub: 'Grid-side Independent ESS' },
  { icon: Battery,   big: '100 GWh+', label: '总容量目标', sub: 'Total Capacity by 2030' },
  { icon: Network,   big: 'VPP', label: '打造新型虚拟电厂系统', sub: 'Virtual Power Plant' },
];

const implementationSteps = [
  { num: '01', icon: Building2, title: '城市枢纽节点',   sub: '投建独立储能电站' },
  { num: '02', icon: Monitor,   title: '智能调度平台',   sub: '协同运营' },
  { num: '03', icon: Box,       title: '数字孪生赋能',   sub: '精益管理' },
  { num: '04', icon: Network,   title: '源网荷储一体化', sub: '一体化运营' },
];

const coreCapabilities = [
  { icon: Battery, title: '规模化独立储能', sub: 'Large-scale ESS' },
  { icon: Leaf,    title: '清洁能源高效消纳', sub: 'Clean Energy' },
  { icon: Zap,     title: '电网柔性调节升级', sub: 'Grid Flexibility' },
  { icon: Globe,   title: '市场化运营聚合', sub: 'Market Operation' },
];

const strategicValues = [
  { icon: ShieldCheck, title: '安全', sub: '提升城市电力安全保障能力',  color: '#00b49d' },
  { icon: TrendingUp,  title: '经济', sub: '提供更经济高效的电力服务',  color: '#007a65' },
  { icon: Sprout,      title: '低碳', sub: '助力国家 "双碳" 战略实施',  color: '#00a07a' },
  { icon: Users,       title: '生态', sub: '构建绿色能源生态共同体',    color: '#005c4b' },
];

/* ─────────────────────────────────────────────
   神经脉冲地图（Canvas）
───────────────────────────────────────────── */
type Pulse = { from: number; to: number; t: number; speed: number };

function NeuralMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    let animId: number;
    let pulses: Pulse[] = [];
    // cityIndex → remaining ping frames
    const pings = new Map<number, number>();

    // Build adjacency edges (distance < 26 in coordinate space)
    const edges: [number, number][] = [];
    cityNodes.forEach((a, i) => {
      cityNodes.forEach((b, j) => {
        if (j <= i) return;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 26) edges.push([i, j]);
      });
    });

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      canvas.width  = r.width;
      canvas.height = r.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const spawnPulse = () => {
      if (pulses.length >= 14) return;
      let from: number, to: number;
      if (Math.random() > 0.15 && edges.length) {
        const e = edges[Math.floor(Math.random() * edges.length)];
        [from, to] = Math.random() > 0.5 ? [e[0], e[1]] : [e[1], e[0]];
      } else {
        // random long-range shot
        from = Math.floor(Math.random() * cityNodes.length);
        do { to = Math.floor(Math.random() * cityNodes.length); } while (to === from);
      }
      pulses.push({ from, to, t: 0, speed: 0.004 + Math.random() * 0.007 });
    };

    const interval = setInterval(spawnPulse, 280);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, W, H);

      const px = (v: number) => (v / 100) * W;
      const py = (v: number) => (v / 100) * H;

      /* ── 1. 静态网格线 ── */
      ctx.lineWidth = 0.4;
      edges.forEach(([i, j]) => {
        const a = cityNodes[i], b = cityNodes[j];
        ctx.beginPath();
        ctx.moveTo(px(a.x), py(a.y));
        ctx.lineTo(px(b.x), py(b.y));
        ctx.strokeStyle = 'rgba(0,180,157,0.09)';
        ctx.stroke();
      });

      /* ── 2. 脉冲动画 ── */
      const surviving: Pulse[] = [];
      pulses.forEach(p => {
        p.t += p.speed;
        const a = cityNodes[p.from];
        const b = cityNodes[p.to];
        const x = px(a.x + (b.x - a.x) * p.t);
        const y = py(a.y + (b.y - a.y) * p.t);

        // 淡入淡出
        const alpha = p.t > 0.8
          ? (1 - p.t) / 0.2
          : Math.min(p.t / 0.12, 1);

        // 当前连线高亮
        const la = alpha * 0.3;
        ctx.beginPath();
        ctx.moveTo(px(a.x), py(a.y));
        ctx.lineTo(px(b.x), py(b.y));
        ctx.strokeStyle = `rgba(0,180,157,${la})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();

        // 光晕
        const r = Math.max(4, W * 0.009);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5);
        g.addColorStop(0,   `rgba(168,240,232,${alpha * 0.75})`);
        g.addColorStop(0.45,`rgba(0,180,157,${alpha * 0.25})`);
        g.addColorStop(1,   'rgba(0,180,157,0)');
        ctx.beginPath();
        ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // 白色核心
        ctx.beginPath();
        ctx.arc(x, y, r * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.95})`;
        ctx.fill();

        // 到达目标：触发 ping
        if (p.t >= 0.9) pings.set(p.to, 24);

        if (p.t < 1) surviving.push(p);
      });
      pulses = surviving;

      /* ── 3. 城市节点 ── */
      cityNodes.forEach((c, i) => {
        const x = px(c.x);
        const y = py(c.y);
        const pingLeft = pings.get(i) ?? 0;

        // 到达时扩散圆环
        if (pingLeft > 0) {
          const age  = 24 - pingLeft;
          const pr   = (age / 24) * (W * 0.035);
          const pa   = 1 - age / 24;
          ctx.beginPath();
          ctx.arc(x, y, pr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,180,157,${pa * 0.55})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
          pings.set(i, pingLeft - 1);
          if (pingLeft - 1 <= 0) pings.delete(i);
        }

        // 外层光晕
        ctx.beginPath();
        ctx.arc(x, y, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,180,157,0.18)';
        ctx.fill();

        // 实心点
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00b49d';
        ctx.fill();
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = 'rgba(255,255,255,0.9)';
        ctx.stroke();

        // 城市名
        const fs = Math.max(8.5, Math.min(10.5, W * 0.011));
        ctx.font = `600 ${fs}px -apple-system,"PingFang SC",sans-serif`;
        ctx.fillStyle = 'rgba(14,42,38,0.82)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(c.name, x, y + 5.5);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   主组件
───────────────────────────────────────────── */
const StrategyLayout = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const mapRef     = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(mapRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: mapRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const blocks = rightRef.current?.querySelectorAll('.strategy-block');
      if (blocks) {
        gsap.fromTo(blocks,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'expo.out',
            scrollTrigger: { trigger: rightRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
      const bottoms = bottomRef.current?.querySelectorAll('.bottom-card');
      if (bottoms) {
        gsap.fromTo(bottoms,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'expo.out',
            scrollTrigger: { trigger: bottomRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="strategy-layout" ref={sectionRef} className="relative py-28 lg:py-40 bg-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #00b49d 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <div className="text-sm tracking-[0.3em] text-[#00b49d] font-medium mb-6">— STRATEGIC LAYOUT</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.05]">
              易储能源<br />
              <span className="text-[#00b49d]">战略布局</span>。
            </h2>
            <p className="text-base text-gray-500 max-w-md font-light">
              为中国的每一座城市<br />
              <b className="text-gray-900">建设好数智化新型电力体系</b>
            </p>
          </div>
        </div>

        {/* Main two-column: Map + Strategy ABC */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 mb-8">

          {/* China Neural Map */}
          <div ref={mapRef} className="relative bg-gradient-to-br from-[#f8fffd] via-white to-[#e6f7f5] border border-[#e0f5f1] rounded-3xl p-6 lg:p-8 overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[#00b49d] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs tracking-[0.25em] text-[#00b49d] font-semibold">— NATIONAL NETWORK</div>
                <div className="text-base font-bold text-gray-900">全国布局 · 神经网络联动</div>
              </div>
            </div>

            {/* Canvas neural map */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#00b49d]/10 bg-white/40"
                 style={{ height: 'clamp(320px, 45vw, 560px)' }}>
              <div className="absolute inset-10 bg-gradient-to-br from-[#00b49d]/5 via-transparent to-[#005c4b]/5 rounded-3xl blur-2xl pointer-events-none" />
              <NeuralMap />
            </div>

            {/* Map footer stats */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xl font-black text-[#00b49d]">32+</div>
                <div className="text-[10px] text-gray-500 tracking-wider">省市节点覆盖</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-black text-[#00b49d]">56</div>
                <div className="text-[10px] text-gray-500 tracking-wider">在手电站项目</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-black text-[#00b49d]">∞</div>
                <div className="text-[10px] text-gray-500 tracking-wider">智慧能源网络</div>
              </div>
            </div>
          </div>

          {/* Strategy A + B + C */}
          <div ref={rightRef} className="flex flex-col gap-5">

            {/* A 战略愿景 */}
            <div className="strategy-block bg-white border border-gray-100 rounded-2xl p-6 lg:p-7 hover:shadow-lg hover:border-[#00b49d]/30 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b49d] to-[#005c4b] flex items-center justify-center text-white font-black flex-shrink-0">A</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-[#00b49d]" />
                    <h3 className="text-lg font-bold text-gray-900">战略愿景</h3>
                    <span className="text-[10px] tracking-[0.2em] text-[#00b49d]">VISION</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    构建全国领先的智慧能源网络，<br />
                    推动城市级数智化新型电力体系建设。
                  </p>
                </div>
              </div>
            </div>

            {/* B 战略目标 */}
            <div className="strategy-block bg-white border border-gray-100 rounded-2xl p-6 lg:p-7 hover:shadow-lg hover:border-[#00b49d]/30 transition-all duration-500">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b49d] to-[#005c4b] flex items-center justify-center text-white font-black flex-shrink-0">B</div>
                <div>
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-[#00b49d]" />
                    <h3 className="text-lg font-bold text-gray-900">战略目标</h3>
                    <span className="text-[10px] tracking-[0.2em] text-[#00b49d]">GOALS</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {strategicGoals.map((g, i) => (
                  <div key={i} className="text-center p-3 bg-[#f8fffd] rounded-xl border border-[#e0f5f1]">
                    <g.icon className="w-5 h-5 text-[#00b49d] mx-auto mb-2" />
                    <div className="text-base lg:text-lg font-black text-gray-900 leading-tight mb-1">{g.big}</div>
                    <div className="text-[10px] text-gray-500 leading-tight">{g.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* C 核心实施路径 */}
            <div className="strategy-block bg-white border border-gray-100 rounded-2xl p-6 lg:p-7 hover:shadow-lg hover:border-[#00b49d]/30 transition-all duration-500">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b49d] to-[#005c4b] flex items-center justify-center text-white font-black flex-shrink-0">C</div>
                <div>
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-[#00b49d]" />
                    <h3 className="text-lg font-bold text-gray-900">核心实施路径</h3>
                    <span className="text-[10px] tracking-[0.2em] text-[#00b49d]">PATHWAY</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {implementationSteps.map((s, i) => (
                  <div key={i} className="relative bg-[#f8fffd] rounded-xl p-3 border border-[#e0f5f1] flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#00b49d] flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-[#00b49d] font-bold tracking-wider">{s.num}</div>
                      <div className="text-xs font-bold text-gray-900 leading-snug">{s.title}</div>
                      <div className="text-[10px] text-gray-500 leading-snug">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom D + E */}
        <div ref={bottomRef} className="grid lg:grid-cols-2 gap-6">

          {/* D 核心能力支撑 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-7 lg:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b49d] to-[#005c4b] flex items-center justify-center text-white font-black flex-shrink-0">D</div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-900">核心能力支撑</h3>
                  <span className="text-[10px] tracking-[0.2em] text-[#00b49d]">CAPABILITIES</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">四大核心能力，构筑战略落地底座</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {coreCapabilities.map((c, i) => (
                <div key={i} className="bottom-card group bg-[#f8fffd] border border-[#e0f5f1] rounded-xl p-4 hover:bg-[#00b49d] hover:border-[#00b49d] transition-all duration-500">
                  <c.icon className="w-6 h-6 text-[#00b49d] group-hover:text-white mb-3 transition-colors" />
                  <div className="text-sm font-bold text-gray-900 group-hover:text-white mb-0.5 transition-colors">{c.title}</div>
                  <div className="text-[10px] text-gray-500 group-hover:text-white/70 transition-colors">{c.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* E 战略价值 */}
          <div className="bg-gradient-to-br from-[#0a1f1c] via-[#0d2a26] to-[#005c4b] text-white rounded-2xl p-7 lg:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#00b49d]/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="relative">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#a8f0e8] text-[#005c4b] flex items-center justify-center font-black flex-shrink-0">E</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">战略价值</h3>
                    <span className="text-[10px] tracking-[0.2em] text-[#a8f0e8]">VALUES</span>
                  </div>
                  <p className="text-xs text-white/60 mt-0.5">为城市 · 为产业 · 为生态创造长期价值</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {strategicValues.map((v, i) => (
                  <div key={i} className="bottom-card bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl p-4 hover:bg-white/10 hover:border-[#00b49d]/40 transition-all duration-500">
                    <v.icon className="w-6 h-6 text-[#a8f0e8] mb-3" />
                    <div className="text-base font-bold text-white mb-0.5">{v.title}</div>
                    <div className="text-[10px] text-white/60 leading-snug">{v.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer mission line */}
        <div className="mt-10 bg-gradient-to-r from-[#005c4b] via-[#007a65] to-[#00b49d] rounded-2xl px-8 py-6 text-white flex items-center gap-4">
          <ArrowRight className="w-6 h-6 text-[#a8f0e8] flex-shrink-0" />
          <p className="text-base lg:text-lg font-bold">
            以<span className="text-[#a8f0e8]">规模化独立储能</span>为基础，
            以<span className="text-[#a8f0e8]">数智平台</span>为引擎，
            持续为城市提供<span className="text-[#a8f0e8]">安全 · 经济 · 低碳</span>的电力服务。
          </p>
        </div>

      </div>
    </section>
  );
};

export default StrategyLayout;
