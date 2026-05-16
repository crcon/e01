import { Zap, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#0a1f1c] to-[#000d0a] text-white overflow-hidden">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#00b49d] to-transparent" />

      {/* Decorative dots pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

        {/* Brand row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#00b49d] flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">易储数智能源</div>
              <div className="text-xs text-white/40">Yichu Smart Energy</div>
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-3xl">
            赣锋锂业核心能源平台，全球新型能源电力系统核心构建者与储能全生态领导者。以"AI + 储能 + AIDC"为核心，构建源网荷储全场景数智化解决方案。
          </p>
        </div>

        {/* Contact strip */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-y border-white/10">
          {[
            { icon: Phone,         label: '商务合作', value: '139-8008-1510' },
            { icon: Mail,          label: '邮件咨询', value: '13980081510@QQ.COM' },
            { icon: MessageCircle, label: '微信',     value: 'CNCM005' },
            { icon: MapPin,        label: '集团总部', value: '深圳·南山·科兴科技园' },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <c.icon className="w-4 h-4 text-[#00b49d]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-white/40 uppercase tracking-wider">{c.label}</div>
                <div className="text-sm text-white/80 truncate">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            © {year} 深圳易储数智能源集团有限公司 · 版权所有
          </div>
          <div className="flex items-center gap-4">
            <span>YICHU SMART ENERGY GROUP</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden md:inline">让每一度电更高效 · 更清洁 · 更可靠 · 更智慧</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
