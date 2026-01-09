/*
 * 设计风格：赛博废土朋克 (Cyber Wasteland Punk)
 * 页面：卡牌收藏/卡组编辑
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Sword, Shield, Zap, Star, Lock } from "lucide-react";

interface Card {
  id: number;
  name: string;
  type: "attack" | "defense" | "skill";
  cost: number;
  value: number;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
}

const allCards: Card[] = [
  { id: 1, name: "电弧打击", type: "attack", cost: 1, value: 8, description: "造成8点伤害", rarity: "common", unlocked: true },
  { id: 2, name: "能量护盾", type: "defense", cost: 1, value: 6, description: "获得6点护盾", rarity: "common", unlocked: true },
  { id: 3, name: "重击", type: "attack", cost: 2, value: 14, description: "造成14点伤害", rarity: "common", unlocked: true },
  { id: 4, name: "铁壁", type: "defense", cost: 2, value: 12, description: "获得12点护盾", rarity: "common", unlocked: true },
  { id: 5, name: "充能", type: "skill", cost: 0, value: 2, description: "获得2点能量", rarity: "rare", unlocked: true },
  { id: 6, name: "双重打击", type: "attack", cost: 2, value: 10, description: "造成10点伤害两次", rarity: "rare", unlocked: true },
  { id: 7, name: "纳米修复", type: "skill", cost: 1, value: 5, description: "恢复5点生命", rarity: "rare", unlocked: true },
  { id: 8, name: "电磁脉冲", type: "attack", cost: 3, value: 25, description: "造成25点伤害", rarity: "epic", unlocked: false },
  { id: 9, name: "量子护盾", type: "defense", cost: 3, value: 20, description: "获得20点护盾", rarity: "epic", unlocked: false },
  { id: 10, name: "超频", type: "skill", cost: 1, value: 0, description: "本回合能量上限+2", rarity: "epic", unlocked: false },
  { id: 11, name: "毁灭光束", type: "attack", cost: 4, value: 40, description: "造成40点伤害", rarity: "legendary", unlocked: false },
  { id: 12, name: "绝对防御", type: "defense", cost: 4, value: 35, description: "获得35点护盾", rarity: "legendary", unlocked: false },
];

const rarityColors = {
  common: { bg: "#4A5568", border: "#718096", text: "#A0AEC0" },
  rare: { bg: "#2B6CB0", border: "#4299E1", text: "#90CDF4" },
  epic: { bg: "#6B21A8", border: "#9333EA", text: "#C4B5FD" },
  legendary: { bg: "#B45309", border: "#F59E0B", text: "#FCD34D" },
};

const rarityNames = {
  common: "普通",
  rare: "稀有",
  epic: "史诗",
  legendary: "传说",
};

export default function Cards() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [filter, setFilter] = useState<"all" | "attack" | "defense" | "skill">("all");

  const filteredCards = allCards.filter(card => 
    filter === "all" || card.type === filter
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "attack": return <Sword className="w-5 h-5" />;
      case "defense": return <Shield className="w-5 h-5" />;
      case "skill": return <Zap className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 背景效果 */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0D0D1E] via-[#16213E] to-[#0D0D1E]" />
      <div className="fixed inset-0 data-flow opacity-30" />
      <div className="fixed inset-0 scanlines pointer-events-none" />
      
      <div className="relative z-10 min-h-screen p-4">
        {/* 顶部栏 */}
        <header className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-[#00D4FF]">
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回
            </Button>
          </Link>
          <h1 className="font-['Orbitron'] text-xl text-[#00D4FF]">卡牌收藏</h1>
          <div className="w-20" />
        </header>
        
        {/* 统计信息 */}
        <div className="glass rounded-lg p-4 mb-6">
          <div className="flex justify-around">
            <div className="text-center">
              <p className="font-['Share_Tech_Mono'] text-xs text-gray-500">已解锁</p>
              <p className="font-['Orbitron'] text-2xl text-[#39FF14]">
                {allCards.filter(c => c.unlocked).length}/{allCards.length}
              </p>
            </div>
            <div className="text-center">
              <p className="font-['Share_Tech_Mono'] text-xs text-gray-500">攻击卡</p>
              <p className="font-['Orbitron'] text-2xl text-[#FF3366]">
                {allCards.filter(c => c.type === "attack" && c.unlocked).length}
              </p>
            </div>
            <div className="text-center">
              <p className="font-['Share_Tech_Mono'] text-xs text-gray-500">防御卡</p>
              <p className="font-['Orbitron'] text-2xl text-[#00D4FF]">
                {allCards.filter(c => c.type === "defense" && c.unlocked).length}
              </p>
            </div>
            <div className="text-center">
              <p className="font-['Share_Tech_Mono'] text-xs text-gray-500">技能卡</p>
              <p className="font-['Orbitron'] text-2xl text-[#39FF14]">
                {allCards.filter(c => c.type === "skill" && c.unlocked).length}
              </p>
            </div>
          </div>
        </div>
        
        {/* 筛选标签 */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList className="glass w-full grid grid-cols-4">
            <TabsTrigger value="all" className="font-['Rajdhani']">全部</TabsTrigger>
            <TabsTrigger value="attack" className="font-['Rajdhani'] text-[#FF3366]">攻击</TabsTrigger>
            <TabsTrigger value="defense" className="font-['Rajdhani'] text-[#00D4FF]">防御</TabsTrigger>
            <TabsTrigger value="skill" className="font-['Rajdhani'] text-[#39FF14]">技能</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* 卡牌网格 */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCard(card)}
              className={`
                relative rounded-lg p-3 cursor-pointer transition-all hover:scale-105
                ${card.unlocked ? '' : 'opacity-50'}
              `}
              style={{
                background: `linear-gradient(135deg, ${rarityColors[card.rarity].bg}40 0%, transparent 70%)`,
                border: `1px solid ${rarityColors[card.rarity].border}`,
                boxShadow: card.unlocked ? `0 0 10px ${rarityColors[card.rarity].border}40` : 'none'
              }}
            >
              {!card.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <Lock className="w-6 h-6 text-gray-500" />
                </div>
              )}
              
              <div className="flex justify-between items-start mb-2">
                <span 
                  className="font-['Share_Tech_Mono'] text-xs px-1 rounded"
                  style={{ 
                    background: rarityColors[card.rarity].bg,
                    color: rarityColors[card.rarity].text 
                  }}
                >
                  {card.cost}
                </span>
                <div style={{ color: rarityColors[card.rarity].text }}>
                  {getTypeIcon(card.type)}
                </div>
              </div>
              
              <div className="text-center mb-2">
                <div 
                  className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-1"
                  style={{ background: `${rarityColors[card.rarity].border}30` }}
                >
                  {getTypeIcon(card.type)}
                </div>
              </div>
              
              <p 
                className="font-['Orbitron'] text-xs text-center truncate"
                style={{ color: rarityColors[card.rarity].text }}
              >
                {card.name}
              </p>
              
              {card.rarity !== "common" && (
                <div className="flex justify-center mt-1 gap-0.5">
                  {Array.from({ length: card.rarity === "rare" ? 2 : card.rarity === "epic" ? 3 : 4 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-2 h-2" 
                      style={{ color: rarityColors[card.rarity].border }}
                      fill={rarityColors[card.rarity].border}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* 卡牌详情弹窗 */}
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-xl p-6 max-w-sm w-full"
              style={{ borderColor: rarityColors[selectedCard.rarity].border }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 
                    className="font-['Orbitron'] text-xl font-bold"
                    style={{ color: rarityColors[selectedCard.rarity].text }}
                  >
                    {selectedCard.name}
                  </h3>
                  <p 
                    className="font-['Rajdhani'] text-sm"
                    style={{ color: rarityColors[selectedCard.rarity].border }}
                  >
                    {rarityNames[selectedCard.rarity]}
                  </p>
                </div>
                <span 
                  className="font-['Orbitron'] text-2xl font-bold px-3 py-1 rounded"
                  style={{ 
                    background: rarityColors[selectedCard.rarity].bg,
                    color: rarityColors[selectedCard.rarity].text 
                  }}
                >
                  {selectedCard.cost}
                </span>
              </div>
              
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ 
                  background: `${rarityColors[selectedCard.rarity].border}30`,
                  boxShadow: `0 0 20px ${rarityColors[selectedCard.rarity].border}50`
                }}
              >
                <div style={{ color: rarityColors[selectedCard.rarity].text }}>
                  {getTypeIcon(selectedCard.type)}
                </div>
              </div>
              
              <p className="font-['Rajdhani'] text-gray-300 text-center mb-4">
                {selectedCard.description}
              </p>
              
              {!selectedCard.unlocked && (
                <Button 
                  className="w-full font-['Orbitron']"
                  style={{ 
                    background: rarityColors[selectedCard.rarity].border,
                    color: '#000'
                  }}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  解锁 (100 水晶)
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                className="w-full mt-2 text-gray-500"
                onClick={() => setSelectedCard(null)}
              >
                关闭
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
