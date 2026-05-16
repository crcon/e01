import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Menu, X } from 'lucide-react';

const navLinks = [
  { label: '首页', href: '#hero' },
  { label: '政策与市场', href: '#policy' },
  { label: '股东背景', href: '#shareholder' },
  { label: '企业介绍', href: '#about' },
  { label: '六大业务', href: '#business' },
  { label: '核心竞争力', href: '#core-advantage' },
  { label: '技术实力', href: '#tech' },
  { label: '项目案例', href: '#grid-performance' },
  { label: '联系我们', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center gap-2.5 group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isScrolled ? 'bg-[#00b49d]' : 'bg-white/10 backdrop-blur-sm'
              }`}>
                <Zap className={`w-5 h-5 transition-colors duration-300 ${
                  isScrolled ? 'text-white' : 'text-[#00b49d]'
                }`} />
              </div>
              <span className={`hidden sm:block font-bold text-2xl leading-none transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                易储数智能源
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 leading-[1.25] whitespace-nowrap ${
                    isScrolled
                      ? 'text-gray-700 hover:text-[#00b49d] hover:bg-[#e6f7f5]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                onClick={() => scrollToSection('#contact')}
                className={`rounded-full px-6 transition-all duration-300 ${
                  isScrolled
                    ? 'bg-[#00b49d] hover:bg-[#005c4b] text-white'
                    : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30'
                }`}
              >
                合作咨询
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 touch-manipulation ${
                isScrolled
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-white/10 text-white'
              }`}
              aria-label="菜单"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="w-full text-left px-4 py-4 rounded-xl text-gray-700 hover:text-[#00b49d] hover:bg-[#e6f7f5] transition-all duration-300 font-medium text-base min-h-[52px] flex items-center"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-[#00b49d] hover:bg-[#005c4b] text-white rounded-xl py-4 text-base h-auto"
              >
                合作咨询
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-[#e6f7f5] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#00b49d]" />
                </div>
                <span>139-8008-1510</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
