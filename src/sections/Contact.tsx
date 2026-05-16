import { useEffect, useRef, useState } from 'react';
import {
  Phone, Mail, MapPin, Clock,
  Building2, Globe, Briefcase,
  ArrowRight, MessageCircle, X, Copy, Check
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    icon: Building2,
    role: '集团总部',
    city: '深圳',
    address: '深圳市南山区科兴科技园 A2栋 7-8楼',
    sub: '战略决策中心 · 国际投资平台',
  },
  {
    icon: Briefcase,
    role: '智造基地',
    city: '江苏宿迁',
    address: '国峰元储科技智造基地 · 30GWh/年产能',
    sub: '产品研发 + 智能制造 + 示范应用',
  },
  {
    icon: Globe,
    role: '海外平台',
    city: '中国香港',
    address: '香港能源数智技术投资公司',
    sub: '全球布局 · 30+国家地区市场',
  },
];

const WECHAT_ID = 'CNCM005';

const contactInfo = [
  { icon: Phone, label: '商务合作', value: '139-8008-1510', sub: '业务对接 · 项目咨询', href: 'tel:13980081510', kind: 'link' as const },
  { icon: Mail,  label: '邮件咨询', value: '13980081510@QQ.COM', sub: '7×24h 邮件回复', href: 'mailto:13980081510@QQ.COM', kind: 'link' as const },
  { icon: MessageCircle, label: '微信', value: WECHAT_ID, sub: '扫码或搜索添加 · 即时沟通', href: '#wechat', kind: 'wechat' as const },
  { icon: Clock, label: '工作时间', value: '周一至周五 9:00 — 18:00', sub: '紧急事项 · 全天候响应', href: '#', kind: 'link' as const },
];

const cooperationTypes = [
  '储能电站投资 / 联合开发',
  'EPC 工程总承包',
  'AI 数智运营托管',
  '零碳园区 / AIDC 算电协同',
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const mainRef    = useRef<HTMLDivElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);
  const [wechatOpen, setWechatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(mainRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: mainRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      const cards = officesRef.current?.querySelectorAll('.office-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'expo.out',
            scrollTrigger: { trigger: officesRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-[#f8fffd] to-[#f0fdf9] overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b49d]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#005c4b]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#e6f7f5] text-[#00b49d] text-sm font-medium rounded-full mb-4">联系我们</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            携手共创<span className="text-[#00b49d]">绿色未来</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            诚邀全球伙伴同行，共赴国家"双碳"战略目标，共建安全高效的现代能源体系
          </p>
        </div>

        {/* Main Contact CTA Block */}
        <div ref={mainRef} className="mb-12">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">

            {/* Primary contact panel */}
            <div className="relative bg-gradient-to-br from-[#005c4b] via-[#007a65] to-[#00b49d] rounded-3xl p-8 lg:p-12 text-white overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }} />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full mb-6">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs font-medium">业务合作 · 项目对接</span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold mb-2">商务合作专线</h3>
                <p className="text-white/70 text-sm mb-8">业务对接 · 项目咨询 · 战略合作</p>

                <a href="tel:13980081510"
                  className="group inline-flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-white/25 transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl lg:text-5xl font-bold tracking-wider group-hover:text-[#a8f0e8] transition-colors">
                      139-8008-1510
                    </div>
                    <div className="text-xs text-white/60 mt-1">陈先生 · 开发总监</div>
                  </div>
                </a>

                <div className="pt-6 border-t border-white/15">
                  <p className="text-sm font-semibold mb-3">合作业务方向</p>
                  <div className="flex flex-wrap gap-2">
                    {cooperationTypes.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary contact info column */}
            <div className="space-y-3">
              {contactInfo.map((c, i) => {
                const inner = (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-[#e6f7f5] flex items-center justify-center flex-shrink-0 group-hover:bg-[#00b49d] transition-colors">
                      <c.icon className="w-5 h-5 text-[#00b49d] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400 mb-1">{c.label}</div>
                      <div className="font-bold text-gray-900 mb-0.5 break-all">{c.value}</div>
                      <div className="text-xs text-gray-500">{c.sub}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#00b49d] group-hover:translate-x-1 transition-all flex-shrink-0 mt-3" />
                  </>
                );
                const cls = 'group flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-[#00b49d]/30 transition-all duration-300 w-full text-left';
                if (c.kind === 'wechat') {
                  return (
                    <button key={i} type="button" onClick={() => setWechatOpen(true)} className={cls}>
                      {inner}
                    </button>
                  );
                }
                return (
                  <a key={i} href={c.href} className={cls}>{inner}</a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Offices network */}
        <div ref={officesRef}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#00b49d] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">全国 · 全球网点</h3>
              <p className="text-sm text-gray-500">深圳总部 · 江苏智造 · 香港全球</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {offices.map((o, i) => (
              <div key={i} className="office-card group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-[#00b49d]/30 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e6f7f5] to-[#00b49d]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00b49d] transition-all">
                    <o.icon className="w-5 h-5 text-[#00b49d] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-[#00b49d] font-semibold">{o.role}</div>
                    <h4 className="text-lg font-bold text-gray-900">{o.city}</h4>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{o.address}</p>
                <p className="text-xs text-gray-400">{o.sub}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* WeChat Modal */}
      {wechatOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setWechatOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setWechatOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="关闭"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#07c160] to-[#04a050] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">微信快捷联系</div>
                <div className="text-xs text-gray-500">扫码或搜索添加 · 即时沟通</div>
              </div>
            </div>

            {/* QR code — local image from /public/images/wechat-qr.png (fallback to auto-generated) */}
            <div className="bg-gradient-to-br from-[#f8fffd] to-[#e6f7f5] rounded-2xl p-6 mb-5 flex flex-col items-center">
              <div className="w-48 h-48 bg-white rounded-xl p-2 shadow-md mb-3 flex items-center justify-center">
                <img
                  src="./images/wechat-qr.png"
                  alt="WeChat QR Code"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = '1';
                      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&color=005c4b&data=${encodeURIComponent('weixin://contacts/profile/' + WECHAT_ID)}`;
                    }
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 text-center">微信扫一扫 · 添加好友</p>
            </div>

            {/* WeChat ID + Copy */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-4">
              <div className="text-[10px] tracking-[0.25em] text-gray-400 mb-1">微信号 WECHAT ID</div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xl font-black text-gray-900 tracking-wider">{WECHAT_ID}</span>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    copied
                      ? 'bg-[#07c160] text-white'
                      : 'bg-[#00b49d] hover:bg-[#005c4b] text-white'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? '已复制' : '复制'}
                </button>
              </div>
            </div>

            {/* Hint */}
            <div className="text-xs text-gray-500 leading-relaxed">
              <b className="text-gray-700">添加步骤：</b>打开微信 → 右上角 + → 添加朋友 → 粘贴微信号 <b className="text-gray-900">{WECHAT_ID}</b> → 搜索添加。
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
