/*
 * 设计风格：赛博废土朋克 (Cyber Wasteland Punk)
 * 页面：游戏主页/启动页
 * 特点：霓虹发光、故障艺术、扫描线效果
 */

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Zap, Shield, Sword, Building2, ShoppingBag, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-banner.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      </div>
      
      {/* 扫描线效果 */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* 主要内容 */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 顶部导航 */}
        <header className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#00D4FF]" />
            <span className="font-['Orbitron'] text-sm text-[#00D4FF] tracking-wider">v0.1.0</span>
          </div>
          <div className="flex gap-4">
            <span className="font-['Share_Tech_Mono'] text-xs text-[#00D4FF]/60">SYSTEM ONLINE</span>
          </div>
        </header>
        
        {/* 中心内容 */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
          {/* 游戏标题 */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 
              className="font-['Orbitron'] text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 glitch neon-glow-blue"
              data-text="末日幸存者"
            >
              末日幸存者
            </h1>
            <h2 className="font-['Orbitron'] text-xl md:text-2xl lg:text-3xl text-[#FF3366] font-semibold tracking-widest">
              卡牌求生
            </h2>
            <p className="font-['Rajdhani'] text-lg text-gray-400 mt-4 max-w-md mx-auto">
              在废土世界中收集资源、构筑卡牌、建造避难所，成为最后的幸存者
            </p>
          </motion.div>
          
          {/* 角色展示 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mb-12"
          >
            <div className="w-48 h-64 md:w-56 md:h-72 relative">
              <img 
                src="/images/survivor-hero.png" 
                alt="幸存者" 
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,212,255,0.5)]"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#00D4FF]/20 blur-xl rounded-full" />
            </div>
          </motion.div>
          
          {/* 开始游戏按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <Link href="/game">
              <Button 
                size="lg" 
                className="font-['Orbitron'] text-lg px-12 py-6 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] hover:from-[#00E5FF] hover:to-[#00AADD] text-black font-bold neon-border-blue transition-all duration-300 hover:scale-105"
              >
                <Sword className="w-5 h-5 mr-2" />
                开始战斗
              </Button>
            </Link>
            
            <div className="flex gap-3 mt-4">
              <Link href="/cards">
                <Button 
                  variant="outline" 
                  className="font-['Rajdhani'] border-[#00D4FF]/50 text-[#00D4FF] hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  卡牌
                </Button>
              </Link>
              <Link href="/shelter">
                <Button 
                  variant="outline" 
                  className="font-['Rajdhani'] border-[#FF6B35]/50 text-[#FF6B35] hover:bg-[#FF6B35]/10 hover:border-[#FF6B35]"
                >
                  <Building2 className="w-4 h-4 mr-1" />
                  避难所
                </Button>
              </Link>
              <Link href="/shop">
                <Button 
                  variant="outline" 
                  className="font-['Rajdhani'] border-[#FF3366]/50 text-[#FF3366] hover:bg-[#FF3366]/10 hover:border-[#FF3366]"
                >
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  商城
                </Button>
              </Link>
              <Link href="/report">
                <Button 
                  variant="outline" 
                  className="font-['Rajdhani'] border-[#9333EA]/50 text-[#9333EA] hover:bg-[#9333EA]/10 hover:border-[#9333EA]"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  报告
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
        
        {/* 底部状态栏 */}
        <footer className="p-4 glass border-t border-[#00D4FF]/20">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="font-['Share_Tech_Mono'] text-xs text-gray-500">能量水晶</span>
                <span className="font-['Orbitron'] text-lg text-[#00D4FF]">1,250</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Share_Tech_Mono'] text-xs text-gray-500">物资</span>
                <span className="font-['Orbitron'] text-lg text-[#FF6B35]">3,840</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Share_Tech_Mono'] text-xs text-gray-500">卡牌</span>
                <span className="font-['Orbitron'] text-lg text-[#39FF14]">24</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#39FF14] pulse-neon" />
              <span className="font-['Share_Tech_Mono'] text-xs text-[#39FF14]">CONNECTED</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
