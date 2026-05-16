import { useEffect, useRef } from 'react';
import { MapPin, Layers, Zap } from 'lucide-react'; // Zap used in KPI cards
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── 项目状态构成（含装机容量 GWh）─────────────────────────────
const statusItems = [
  { label: '并网',     count: 10, capacity: 4.72,  color: '#1a56a4', bg: '#dbeafe' },
  { label: '在建',     count: 9,  capacity: 6.00,  color: '#00b49d', bg: '#d1faf4' },
  { label: '准备开工', count: 4,  capacity: 2.00,  color: '#d97706', bg: '#fef3c7' },
  { label: '签约',     count: 26, capacity: 20.80, color: '#2e7d32', bg: '#dcfce7' },
];
const total = statusItems.reduce((s, i) => s + i.count, 0); // 49
const totalCapacity = statusItems.reduce((s, i) => s + i.capacity, 0); // 33.52

// ── 各省装机容量（当前）───────────────────────────────────
const provinceData = [
  { name: '山西',  value: 7.60 },
  { name: '河南',  value: 5.00 },
  { name: '山东',  value: 3.60 },
  { name: '宁夏',  value: 3.40 },
  { name: '广西',  value: 3.20 },
  { name: '广东',  value: 2.20 },
  { name: '云南',  value: 2.00 },
  { name: '河北',  value: 1.60 },
  { name: '江苏',  value: 1.42 },
  { name: '湖北',  value: 0.80 },
  { name: '安徽',  value: 0.80 },
  { name: '福建',  value: 0.80 },
  { name: '天津',  value: 0.40 },
];
const maxVal = provinceData[0].value;

// ── 重点案例 ──────────────────────────────────────────────
const featuredCases = [
  {
    status: '并网',
    statusColor: '#1a56a4',
    statusBg: '#dbeafe',
    title: '河北邢台信都区（龙岗）',
    capacity: '300MW / 1200MWh',
    tag: '华北大容量项目',
    region: '华北',
  },
  {
    status: '并网',
    statusColor: '#1a56a4',
    statusBg: '#dbeafe',
    title: '云南曲靖马龙区',
    capacity: '400MW / 800MWh',
    tag: '西南示范项目',
    region: '西南',
  },
  {
    status: '建设中',
    statusColor: '#00b49d',
    statusBg: '#d1faf4',
    title: '山西晋中榆社',
    capacity: '400MW / 1600MWh',
    tag: '最大单体储备',
    region: '华北',
  },
  {
    status: '建设中',
    statusColor: '#00b49d',
    statusBg: '#d1faf4',
    title: '江苏常州经开区',
    capacity: '150MW / 300MWh',
    tag: '华东产业协同',
    region: '华东',
  },
];

// ── 地图区域分布数据（裁剪后 viewBox "80 130 840 645"）───
// new_left% = (x - 80) / 840 * 100; new_top% = (y - 130) / 645 * 100
// dir: 省份名标签方向 n/s/e/w/ne/nw/se/sw
const mapRegions = [
  { label: '宁夏', capacity: '3.40', top: '42.9%', left: '50.5%', side: 'none' as const, slot: -1, dir: 'nw' },
  { label: '天津', capacity: '0.40', top: '41.0%', left: '67.0%', side: 'none' as const, slot: -1, dir: 'ne' },
  { label: '河北', capacity: '1.60', top: '44.1%', left: '63.0%', side: 'none' as const, slot: -1, dir: 'nw' },
  { label: '山西', capacity: '7.60', top: '44.5%', left: '60.0%', side: 'none' as const, slot: -1, dir: 'w'  },
  { label: '山东', capacity: '3.60', top: '47.8%', left: '66.8%', side: 'none' as const, slot: -1, dir: 'e'  },
  { label: '河南', capacity: '3.00', top: '53.0%', left: '61.7%', side: 'none' as const, slot: -1, dir: 'w'  },
  { label: '江苏', capacity: '1.42', top: '60.5%', left: '69.4%', side: 'none' as const, slot: -1, dir: 'e'  },
  { label: '安徽', capacity: '0.80', top: '61.1%', left: '67.1%', side: 'none' as const, slot: -1, dir: 'w'  },
  { label: '湖北', capacity: '0.80', top: '64.6%', left: '63.0%', side: 'none' as const, slot: -1, dir: 'sw' },
  { label: '福建', capacity: '0.80', top: '77.1%', left: '70.2%', side: 'none' as const, slot: -1, dir: 'e'  },
  { label: '云南', capacity: '2.00', top: '79.8%', left: '45.0%', side: 'none' as const, slot: -1, dir: 'sw' },
  { label: '广西', capacity: '3.20', top: '86.0%', left: '53.6%', side: 'none' as const, slot: -1, dir: 'sw' },
  { label: '广东', capacity: '2.20', top: '85.1%', left: '61.1%', side: 'none' as const, slot: -1, dir: 'se' },
];

// 省份名标签方向样式
const labelStyle = (dir: string): React.CSSProperties => {
  const base: React.CSSProperties = {
    position: 'absolute', whiteSpace: 'nowrap', fontSize: '9px',
    fontWeight: '700', color: '#374151', lineHeight: '1', pointerEvents: 'none',
  };
  switch (dir) {
    case 'n':  return { ...base, bottom: '100%', left: '50%',   transform: 'translateX(-50%) translateY(-2px)', textAlign: 'center' };
    case 'e':  return { ...base, left: '100%',   top: '50%',    transform: 'translateY(-50%) translateX(3px)',  textAlign: 'left'   };
    case 'w':  return { ...base, right: '100%',  top: '50%',    transform: 'translateY(-50%) translateX(-3px)', textAlign: 'right'  };
    case 'ne': return { ...base, bottom: '100%', left: '100%',  transform: 'translateX(2px) translateY(-2px)',  textAlign: 'left'   };
    case 'nw': return { ...base, bottom: '100%', right: '100%', transform: 'translateX(-2px) translateY(-2px)', textAlign: 'right'  };
    case 'se': return { ...base, top: '100%',    left: '100%',  transform: 'translateX(2px) translateY(2px)',   textAlign: 'left'   };
    case 'sw': return { ...base, top: '100%',    right: '100%', transform: 'translateX(-2px) translateY(2px)',  textAlign: 'right'  };
    default:   return { ...base, top: '100%',    left: '50%',   transform: 'translateX(-50%) translateY(2px)',  textAlign: 'center' };
  }
};


const GridPerformance = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const kpiRef     = useRef<HTMLDivElement>(null);
  const barsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      const kpiCards = kpiRef.current?.querySelectorAll('.kpi-card');
      if (kpiCards) {
        gsap.fromTo(kpiCards,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: kpiRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
      const bars = barsRef.current?.querySelectorAll('.prov-bar');
      if (bars) {
        gsap.fromTo(bars,
          { width: '0%' },
          { width: (i) => `${(provinceData[i].value / maxVal) * 100}%`,
            duration: 1.1, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: barsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="grid-performance" ref={sectionRef}
      className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px,#00b49d 1px,transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 标题 ─────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block px-3 py-1 bg-[#e6f7f5] text-[#00b49d] text-sm font-medium rounded-full">
              项目案例 / 业绩
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                易储数智能源 <span className="text-[#00b49d]">全国布局</span>
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl">
                截至最新项目清单，已形成覆盖 <b>13个省级区域</b>、<b>49个独立储能项目</b>、合计 <b>32.82GWh装机容量</b> 的全国化项目矩阵。
              </p>
            </div>
            <div className="flex gap-2 text-xs text-gray-400 items-center flex-wrap">
              {statusItems.map(s => (
                <span key={s.label} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 顶部 KPI ────────────────────────────────────── */}
        <div ref={kpiRef} className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: MapPin,  value: '13个',     label: '覆盖省级区域', sub: '全国重点布局' },
            { icon: Layers,  value: '49个',     label: '储能项目总数', sub: '含并网/在建/签约' },
            { icon: Zap,     value: '32.82GWh', label: '合计装机容量', sub: '全口径统计' },
          ].map((k, i) => (
            <div key={i} className="kpi-card bg-gradient-to-br from-[#005c4b] to-[#00b49d] rounded-2xl p-6 text-white text-center">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                <k.icon className="w-5 h-5" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold mb-1">{k.value}</div>
              <div className="text-sm text-white/90 font-medium">{k.label}</div>
              <div className="text-xs text-white/60 mt-0.5">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* ── 主体三栏 ─────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_1.4fr_1fr] gap-6">

          {/* 左：项目状态 + 省份分布 */}
          <div className="space-y-5">
            {/* 状态构成 */}
            <div className="bg-[#f8fffe] border border-[#e0f5f1] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-4">项目状态构成</h3>
              {/* donut-style visual */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    {(() => {
                      let offset = 0;
                      return statusItems.map((s, i) => {
                        const pct = (s.count / total) * 100;
                        const el = (
                          <circle key={i} cx="18" cy="18" r="15.9"
                            fill="none"
                            stroke={s.color}
                            strokeWidth="3.2"
                            strokeDasharray={`${pct} ${100 - pct}`}
                            strokeDashoffset={-offset}
                          />
                        );
                        offset += pct;
                        return el;
                      });
                    })()}
                    <text x="18" y="20" textAnchor="middle"
                      className="text-[8px] font-bold fill-gray-700"
                      style={{ fontSize: '6px', dominantBaseline: 'middle', transform: 'rotate(90deg)', transformOrigin: '18px 18px' }}>
                      32.82
                    </text>
                    <text x="18" y="24" textAnchor="middle"
                      style={{ fontSize: '3.5px', fill: '#888', transform: 'rotate(90deg)', transformOrigin: '18px 18px' }}>
                      GWh
                    </text>
                  </svg>
                </div>
                <div className="flex-1 space-y-2">
                  {statusItems.map(s => (
                    <div key={s.label} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                        <span className="text-xs text-gray-600">{s.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(s.count / total) * 100}%`, backgroundColor: s.color }} />
                        </div>
                        <span className="text-xs font-bold text-gray-800 w-8 text-right">{s.count}个</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 省份装机 */}
            <div ref={barsRef} className="bg-[#f8fffe] border border-[#e0f5f1] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-4">
                各省装机容量分布 <span className="text-xs font-normal text-gray-400">（当前）</span>
              </h3>
              <div className="space-y-2">
                {provinceData.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-8 text-xs text-gray-600 flex-shrink-0">{p.name}</span>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div className="prov-bar h-full rounded-full flex items-center justify-end pr-1.5"
                        style={{ backgroundColor: '#00b49d', width: '0%' }}>
                        <span className="text-white text-[9px] font-bold leading-none whitespace-nowrap">
                          {p.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-100 mt-1">
                  <span>0</span><span>2</span><span>4</span><span>6</span><span>8 GWh</span>
                </div>
              </div>
            </div>
          </div>

          {/* 中：中国地图 + 外侧容量标签 + 下方汇总 */}
          <div className="bg-gradient-to-b from-[#f0fdf9] to-[#e6f7f5] border border-[#c6ede6] rounded-2xl p-5 flex flex-col">
            <h3 className="text-sm font-bold text-gray-800 mb-3">全国项目分布与重点案例</h3>

            {/* 地图弹性填充剩余高度 */}
            <div className="relative flex-1 min-h-[200px]">

              {/* China map container — 绝对定位填满父容器 */}
              <div className="absolute inset-0 bg-white/30 rounded-xl z-[2]">

              {/* China outline SVG — preserveAspectRatio none works because aspect matches */}
              <svg
                viewBox="80 130 840 645"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <linearGradient id="chinaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#00b49d" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#005c4b" stopOpacity="0.06" />
                  </linearGradient>
                  <filter id="chinaShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
                    <feOffset dx="0" dy="2" result="offsetblur" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.18" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Mainland China — accurate outline from real GeoJSON (DataV) */}
                <path
                  d="M736.4,375.0L755.8,362.4L764.2,347.8L782.3,354.6L781.2,343.3L792.9,342.9L797.9,335.3L802.5,335.7L805.0,325.5L814.5,335.7L811.5,330.3L820.9,326.7L823.0,318.6L818.6,292.7L830.3,283.9L846.3,287.7L859.5,248.6L867.2,241.7L865.9,232.1L871.2,228.9L846.2,234.3L838.9,241.7L818.8,241.8L815.0,221.0L809.3,221.2L800.2,211.4L774.8,204.2L775.8,196.9L756.8,151.9L720.6,137.8L690.1,142.5L679.3,151.8L688.2,156.0L688.9,162.7L667.7,194.2L670.6,198.2L651.0,209.6L637.1,203.8L621.9,233.9L627.1,242.3L638.0,238.5L645.5,243.0L651.0,236.4L660.6,236.8L675.3,251.0L677.7,260.3L646.0,261.9L645.4,265.8L635.4,267.0L630.1,277.8L609.4,283.1L597.7,294.5L575.7,289.1L569.5,301.4L576.3,313.2L545.6,334.9L519.2,335.2L487.9,350.7L435.0,331.4L378.0,330.4L365.6,302.5L356.8,301.7L341.3,290.6L307.8,286.6L305.2,279.6L310.0,259.5L301.5,243.0L270.8,226.4L268.8,215.8L259.8,216.1L253.0,227.1L240.4,233.3L239.9,253.4L232.3,256.9L207.8,250.6L198.1,279.0L201.8,286.4L192.0,283.2L167.8,291.6L174.3,296.6L179.4,322.4L174.0,325.0L176.9,327.4L172.5,328.6L171.0,342.7L140.9,360.7L129.5,360.6L122.5,372.8L114.5,373.9L113.1,367.2L103.5,369.6L86.4,389.8L90.2,403.6L103.7,405.8L107.3,425.9L99.1,430.9L116.6,438.1L120.3,453.1L145.5,459.0L147.3,474.5L157.0,479.6L152.4,491.7L160.4,510.5L156.1,515.2L153.2,508.6L148.7,511.7L157.7,539.0L165.0,539.2L183.6,556.4L187.3,549.2L196.0,550.5L215.0,571.3L221.7,569.4L226.3,579.1L234.5,580.2L234.3,586.1L242.1,585.6L245.7,593.9L248.1,589.3L261.3,595.5L280.9,591.0L283.7,606.3L293.9,587.9L309.7,594.8L315.3,592.2L316.8,600.4L322.9,603.0L323.5,612.6L342.1,611.1L369.8,587.3L387.1,596.8L394.5,583.0L402.6,600.8L407.6,600.2L408.5,616.7L407.5,630.3L392.8,650.2L392.5,664.6L409.7,660.6L409.9,677.4L418.5,682.4L414.1,696.9L423.7,697.9L427.0,708.4L438.3,702.9L439.6,712.5L446.5,714.0L445.3,690.4L453.0,691.4L456.0,685.1L462.6,691.0L466.4,684.5L474.6,690.0L491.9,674.2L498.9,682.6L511.2,684.6L509.4,699.6L517.9,706.0L550.1,708.8L547.1,717.9L550.5,730.7L558.3,727.0L554.1,715.8L578.7,702.6L588.8,701.8L590.8,696.6L593.1,701.2L598.3,686.0L601.1,691.0L608.9,691.1L611.5,684.9L613.7,689.3L617.6,684.3L622.5,687.3L623.5,683.5L634.3,682.3L639.2,672.2L652.2,663.1L654.9,653.2L661.2,654.1L661.6,648.3L666.0,647.7L665.1,641.0L667.7,645.3L668.9,637.2L677.2,637.5L672.2,634.3L678.3,621.5L673.5,616.7L680.6,616.4L687.9,597.9L694.1,595.4L692.4,590.5L699.6,587.7L699.4,571.4L704.2,572.5L702.2,562.8L706.1,558.4L692.4,546.6L700.3,542.1L706.1,546.1L696.0,529.8L704.1,530.6L702.5,521.9L691.1,510.2L682.8,480.1L668.8,468.1L682.8,450.5L681.2,446.4L687.9,447.7L689.7,439.0L711.1,434.0L713.5,425.2L698.9,424.4L688.2,417.4L670.3,430.2L666.1,426.6L669.6,419.1L665.8,412.8L653.6,410.8L648.9,399.7L653.8,392.8L659.6,398.3L665.2,394.5L673.0,380.9L685.1,375.3L693.2,363.4L702.0,363.0L707.7,370.4L694.5,386.8L700.8,390.2L693.4,401.6L720.6,383.3L731.8,383.4L736.4,375.0Z"
                  fill="url(#chinaFill)"
                  stroke="#00b49d"
                  strokeOpacity="0.55"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  filter="url(#chinaShadow)"
                />

                {/* 海南 */}
                <path
                  d="M552.8,734.0L542.0,736.2L533.7,747.3L534.2,761.3L546.2,767.4L557.8,758.4L560.7,745.5L565.1,741.0L563.8,734.1L560.2,731.5L552.8,734.0Z"
                  fill="url(#chinaFill)" stroke="#00b49d" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round"
                />
                <text x="548" y="775" textAnchor="middle" fontSize="11" fill="#005c4b" fontWeight="600" opacity="0.6">海南</text>

                {/* 台湾 */}
                <path
                  d="M684.5,691.0L689.8,701.0L692.0,687.3L697.1,678.7L704.5,645.5L699.1,640.1L691.9,644.8L680.2,668.6L679.1,679.8L684.5,691.0Z"
                  fill="url(#chinaFill)" stroke="#00b49d" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round"
                />
                <text x="715" y="675" textAnchor="middle" fontSize="11" fill="#005c4b" fontWeight="600" opacity="0.6">台湾</text>

                {/* South China Sea nine-dash hint */}
                <g stroke="#00b49d" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" fill="none">
                  <line x1="555" y1="785" x2="565" y2="790" />
                  <line x1="575" y1="780" x2="585" y2="785" />
                </g>

                {/* Compass mark NW */}
                <g transform="translate(135, 195)">
                  <circle r="15" fill="white" fillOpacity="0.85" stroke="#00b49d" strokeOpacity="0.45" strokeWidth="1.5" />
                  <path d="M 0 -10 L 3.5 0 L 0 10 L -3.5 0 Z" fill="#00b49d" />
                  <text y="-19" textAnchor="middle" fontSize="11" fill="#005c4b" fontWeight="700">N</text>
                </g>
              </svg>

                {/* Province dots — hover tooltip 显示装机容量 */}
                {mapRegions.map((r, i) => (
                  <div key={i}
                    className="absolute z-10 group cursor-pointer"
                    style={{ top: r.top, left: r.left, transform: 'translate(-50%,-50%)' }}>
                    <div className="relative w-3 h-3">
                      {/* 脉冲动画 */}
                      <div className="absolute inset-0 rounded-full bg-[#00b49d]/40 animate-ping" />
                      {/* 圆点 — hover 时放大 */}
                      <div className="absolute inset-0 rounded-full bg-[#00b49d] border border-white shadow
                        group-hover:scale-[2.2] transition-transform duration-200 ease-out" />
                      {/* 省份名标签 */}
                      <span style={labelStyle(r.dir)} className="pointer-events-none">{r.label}</span>
                      {/* Hover 提示气泡 */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3
                        opacity-0 group-hover:opacity-100
                        translate-y-2 group-hover:translate-y-0
                        transition-all duration-200 ease-out
                        pointer-events-none select-none z-50">
                        <div className="bg-white rounded-xl shadow-2xl border border-[#00b49d]/25 px-3 py-2 whitespace-nowrap">
                          <div className="text-[10px] font-semibold text-gray-500 mb-0.5 tracking-wider">{r.label}</div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-[15px] font-black text-[#00b49d] leading-none">{r.capacity}</span>
                            <span className="text-[10px] font-medium text-gray-400">GWh</span>
                          </div>
                        </div>
                        {/* 箭头 */}
                        <div className="w-2.5 h-2.5 bg-white border-r border-b border-[#00b49d]/25
                          rotate-45 mx-auto -mt-[5px]" />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[#00b49d]/[0.07] text-4xl lg:text-5xl font-black tracking-widest select-none">
                    易储数能集团
                  </span>
                </div>
              </div>{/* end inner map */}

            </div>{/* end map wrapper */}

            {/* 49个在手项目总计 — 移至地图下方，按装机容量展示 */}
            <div className="mt-5 bg-gradient-to-br from-[#005c4b] to-[#00b49d] rounded-2xl p-4 text-white">
              <div className="flex items-end justify-between mb-3 pb-3 border-b border-white/20">
                <div>
                  <div className="text-2xl font-bold leading-none">49 个</div>
                  <div className="text-[10px] text-white/70 tracking-wider mt-1">在手项目总计</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold leading-none">{totalCapacity.toFixed(2)} <span className="text-sm">GWh</span></div>
                  <div className="text-[10px] text-white/70 tracking-wider mt-1">合计装机容量</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {statusItems.map(s => (
                  <div key={s.label} className="bg-white/15 rounded-lg p-2 text-center">
                    <div className="text-[10px] text-white/80 mb-0.5">{s.label}</div>
                    <div className="font-bold text-sm leading-tight">{s.capacity.toFixed(2)}<span className="text-[9px] ml-0.5">GWh</span></div>
                    <div className="text-[9px] text-white/60 mt-0.5">{s.count} 个</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source note */}
            <p className="text-[10px] text-gray-400 mt-3 border-t border-gray-200 pt-2">
              ⓘ 数据来源：最新项目清单；统计口径包含并网、在建、准备开工、签约项目；单位：MW/MWh/GWh。
            </p>
          </div>

          {/* 右：重点案例 */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800">重点案例</h3>
            {featuredCases.map((c, i) => (
              <div key={i}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-[#00b49d]/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: c.statusBg, color: c.statusColor }}>
                    {c.status}
                  </span>
                  <span className="text-xs text-gray-400">{c.region}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1 leading-snug">{c.title}</h4>
                <div className="text-[#00b49d] font-bold text-sm mb-1">{c.capacity}</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00b49d]" />
                  <span className="text-xs text-gray-500">{c.tag}</span>
                </div>
                {/* capacity visual bar */}
                <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full"
                    style={{
                      backgroundColor: c.statusColor,
                      width: `${Math.min(100, (parseFloat(c.capacity) / 400) * 100)}%`,
                    }} />
                </div>
              </div>
            ))}
          </div>

        </div>{/* end grid */}
      </div>
    </section>
  );
};

export default GridPerformance;
