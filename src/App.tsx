import { useEffect } from 'react';
import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import Policy from './sections/Policy';
import Market from './sections/Market';
import ShareholderBackground from './sections/ShareholderBackground';
import About from './sections/About';
import Business from './sections/Business';
import VisionPoster from './sections/VisionPoster';
import CoreAdvantage from './sections/CoreAdvantage';
import StrategyLayout from './sections/StrategyLayout';
import Tech from './sections/Tech';
import GridPerformance from './sections/GridPerformance';
import JointDevelopment from './sections/JointDevelopment';
import BoundaryConditions from './sections/BoundaryConditions';
import ProfitModel from './sections/ProfitModel';
import CTAPoster from './sections/CTAPoster';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        {/* 1. 主视觉 */}
        <div id="hero">
          <Hero />
        </div>

        {/* 2. 品牌宣言 · 海报 */}
        <Manifesto />

        {/* 3. 国家政策 */}
        <Policy />

        {/* 4. 行业市场 */}
        <Market />

        {/* 5. 股东背景 */}
        <ShareholderBackground />

        {/* 6. 企业介绍 */}
        <About />

        {/* 7. 六大业务 */}
        <Business />

        {/* 8. 五年愿景 · 海报 */}
        <VisionPoster />

        {/* 9. 核心竞争力 + 商业发展规划 */}
        <CoreAdvantage />

        {/* 10. 易储能源战略布局 */}
        <StrategyLayout />

        {/* 11. 技术实力 */}
        <Tech />

        {/* 11. 项目业绩 */}
        <GridPerformance />

        {/* 12. 合作模式 */}
        <JointDevelopment />

        {/* 13. 项目投资边界条件 */}
        <BoundaryConditions />

        {/* 14. 五大收益 · 盈利模式 */}
        <ProfitModel />

        {/* 15. 行动召唤 · 海报 */}
        <CTAPoster />

        {/* 16. 联系我们 */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
