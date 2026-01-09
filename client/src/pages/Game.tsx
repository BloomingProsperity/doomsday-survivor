/*
 * 设计风格：赛博废土朋克 (Cyber Wasteland Punk)
 * 页面：游戏战斗页面
 * 核心玩法：回合制卡牌对战
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Heart, Shield, Sword, RotateCcw, Volume2 } from "lucide-react";
import { toast } from "sonner";

// 卡牌类型定义
interface Card {
  id: number;
  name: string;
  type: "attack" | "defense" | "skill";
  cost: number;
  value: number;
  description: string;
  color: string;
}

// 初始卡组
const initialDeck: Card[] = [
  { id: 1, name: "电弧打击", type: "attack", cost: 1, value: 8, description: "造成8点伤害", color: "#FF3366" },
  { id: 2, name: "电弧打击", type: "attack", cost: 1, value: 8, description: "造成8点伤害", color: "#FF3366" },
  { id: 3, name: "电弧打击", type: "attack", cost: 1, value: 8, description: "造成8点伤害", color: "#FF3366" },
  { id: 4, name: "能量护盾", type: "defense", cost: 1, value: 6, description: "获得6点护盾", color: "#00D4FF" },
  { id: 5, name: "能量护盾", type: "defense", cost: 1, value: 6, description: "获得6点护盾", color: "#00D4FF" },
  { id: 6, name: "重击", type: "attack", cost: 2, value: 14, description: "造成14点伤害", color: "#FF3366" },
  { id: 7, name: "铁壁", type: "defense", cost: 2, value: 12, description: "获得12点护盾", color: "#00D4FF" },
  { id: 8, name: "充能", type: "skill", cost: 0, value: 2, description: "获得2点能量", color: "#39FF14" },
  { id: 9, name: "双重打击", type: "attack", cost: 2, value: 10, description: "造成10点伤害两次", color: "#FF3366" },
  { id: 10, name: "纳米修复", type: "skill", cost: 1, value: 5, description: "恢复5点生命", color: "#39FF14" },
];

// 洗牌函数
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Game() {
  // 游戏状态
  const [playerHP, setPlayerHP] = useState(80);
  const [playerMaxHP] = useState(80);
  const [playerShield, setPlayerShield] = useState(0);
  const [playerEnergy, setPlayerEnergy] = useState(3);
  const [playerMaxEnergy] = useState(3);
  
  const [enemyHP, setEnemyHP] = useState(60);
  const [enemyMaxHP] = useState(60);
  const [enemyIntent, setEnemyIntent] = useState<"attack" | "defense">("attack");
  const [enemyIntentValue, setEnemyIntentValue] = useState(12);
  
  const [deck, setDeck] = useState<Card[]>([]);
  const [hand, setHand] = useState<Card[]>([]);
  const [discard, setDiscard] = useState<Card[]>([]);
  
  const [turn, setTurn] = useState(1);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // 初始化游戏
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffledDeck = shuffle([...initialDeck]);
    const initialHand = shuffledDeck.slice(0, 5);
    const remainingDeck = shuffledDeck.slice(5);
    
    setDeck(remainingDeck);
    setHand(initialHand);
    setDiscard([]);
    setPlayerHP(80);
    setPlayerShield(0);
    setPlayerEnergy(3);
    setEnemyHP(60);
    setTurn(1);
    setIsPlayerTurn(true);
    setGameOver(false);
    setVictory(false);
    randomizeEnemyIntent();
  };

  const randomizeEnemyIntent = () => {
    const isAttack = Math.random() > 0.3;
    setEnemyIntent(isAttack ? "attack" : "defense");
    setEnemyIntentValue(isAttack ? Math.floor(Math.random() * 8) + 10 : Math.floor(Math.random() * 6) + 8);
  };

  // 抽牌
  const drawCards = (count: number) => {
    let newDeck = [...deck];
    let newHand = [...hand];
    let newDiscard = [...discard];
    
    for (let i = 0; i < count; i++) {
      if (newDeck.length === 0) {
        if (newDiscard.length === 0) break;
        newDeck = shuffle([...newDiscard]);
        newDiscard = [];
      }
      const card = newDeck.pop();
      if (card) newHand.push(card);
    }
    
    setDeck(newDeck);
    setHand(newHand);
    setDiscard(newDiscard);
  };

  // 打出卡牌
  const playCard = (cardIndex: number) => {
    if (!isPlayerTurn || isAnimating || gameOver) return;
    
    const card = hand[cardIndex];
    if (card.cost > playerEnergy) {
      toast.error("能量不足！");
      return;
    }
    
    setIsAnimating(true);
    setSelectedCard(cardIndex);
    setPlayerEnergy(prev => prev - card.cost);
    
    setTimeout(() => {
      // 应用卡牌效果
      switch (card.type) {
        case "attack":
          let damage = card.value;
          if (card.name === "双重打击") {
            damage = card.value * 2;
          }
          const newEnemyHP = Math.max(0, enemyHP - damage);
          setEnemyHP(newEnemyHP);
          toast.success(`造成 ${damage} 点伤害！`);
          if (newEnemyHP <= 0) {
            setVictory(true);
            setGameOver(true);
          }
          break;
        case "defense":
          setPlayerShield(prev => prev + card.value);
          toast.success(`获得 ${card.value} 点护盾！`);
          break;
        case "skill":
          if (card.name === "充能") {
            setPlayerEnergy(prev => Math.min(prev + card.value, playerMaxEnergy + 2));
            toast.success(`获得 ${card.value} 点能量！`);
          } else if (card.name === "纳米修复") {
            setPlayerHP(prev => Math.min(prev + card.value, playerMaxHP));
            toast.success(`恢复 ${card.value} 点生命！`);
          }
          break;
      }
      
      // 移除手牌
      const newHand = hand.filter((_, i) => i !== cardIndex);
      const newDiscard = [...discard, card];
      setHand(newHand);
      setDiscard(newDiscard);
      setSelectedCard(null);
      setIsAnimating(false);
    }, 300);
  };

  // 结束回合
  const endTurn = () => {
    if (!isPlayerTurn || isAnimating || gameOver) return;
    
    setIsPlayerTurn(false);
    setIsAnimating(true);
    
    // 敌人行动
    setTimeout(() => {
      if (enemyIntent === "attack") {
        let damage = enemyIntentValue;
        if (playerShield > 0) {
          const shieldDamage = Math.min(playerShield, damage);
          setPlayerShield(prev => prev - shieldDamage);
          damage -= shieldDamage;
        }
        if (damage > 0) {
          const newHP = Math.max(0, playerHP - damage);
          setPlayerHP(newHP);
          if (newHP <= 0) {
            setGameOver(true);
            setVictory(false);
          }
        }
        toast.error(`敌人造成 ${enemyIntentValue} 点伤害！`);
      } else {
        toast.info("敌人进行了防御！");
      }
      
      // 新回合开始
      setTimeout(() => {
        if (!gameOver) {
          setTurn(prev => prev + 1);
          setPlayerEnergy(playerMaxEnergy);
          setPlayerShield(0);
          drawCards(5 - hand.length);
          randomizeEnemyIntent();
          setIsPlayerTurn(true);
        }
        setIsAnimating(false);
      }, 500);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/card-battle-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* 扫描线 */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* 主要内容 */}
      <div className="relative z-10 min-h-screen flex flex-col p-4">
        {/* 顶部栏 */}
        <header className="flex justify-between items-center mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-[#00D4FF]">
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-['Orbitron'] text-sm text-[#00D4FF]">回合 {turn}</span>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </header>
        
        {/* 敌人区域 */}
        <div className="flex-1 flex flex-col items-center justify-start pt-4">
          {/* 敌人信息 */}
          <div className="glass rounded-lg p-4 mb-4 w-full max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Orbitron'] text-lg text-[#FF3366]">机械丧尸</span>
              <div className="flex items-center gap-2">
                {enemyIntent === "attack" ? (
                  <>
                    <Sword className="w-4 h-4 text-[#FF3366]" />
                    <span className="font-['Share_Tech_Mono'] text-[#FF3366]">{enemyIntentValue}</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-[#00D4FF]" />
                    <span className="font-['Share_Tech_Mono'] text-[#00D4FF]">防御</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#FF3366]" />
              <Progress value={(enemyHP / enemyMaxHP) * 100} className="h-3 bg-gray-800" />
              <span className="font-['Share_Tech_Mono'] text-sm text-gray-400">{enemyHP}/{enemyMaxHP}</span>
            </div>
          </div>
          
          {/* 敌人图像 */}
          <motion.div
            animate={isAnimating && !isPlayerTurn ? { x: [0, -10, 10, -10, 0] } : {}}
            className="w-40 h-56 md:w-48 md:h-64"
          >
            <img 
              src="/images/zombie-enemy.png" 
              alt="敌人" 
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,51,102,0.5)]"
            />
          </motion.div>
        </div>
        
        {/* 玩家区域 */}
        <div className="mt-auto">
          {/* 玩家状态 */}
          <div className="glass rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#FF3366]" />
                  <span className="font-['Orbitron'] text-lg text-white">{playerHP}/{playerMaxHP}</span>
                </div>
                {playerShield > 0 && (
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-[#00D4FF]" />
                    <span className="font-['Share_Tech_Mono'] text-[#00D4FF]">{playerShield}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: playerMaxEnergy }).map((_, i) => (
                  <Zap 
                    key={i} 
                    className={`w-5 h-5 ${i < playerEnergy ? 'text-[#39FF14]' : 'text-gray-600'}`}
                  />
                ))}
              </div>
            </div>
            <Progress value={(playerHP / playerMaxHP) * 100} className="h-2 bg-gray-800" />
          </div>
          
          {/* 手牌区域 */}
          <div className="flex justify-center gap-2 mb-4 overflow-x-auto pb-2">
            <AnimatePresence>
              {hand.map((card, index) => (
                <motion.div
                  key={`${card.id}-${index}`}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: selectedCard === index ? -20 : 0, 
                    scale: selectedCard === index ? 1.1 : 1 
                  }}
                  exit={{ opacity: 0, y: -50, scale: 0.8 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  onClick={() => playCard(index)}
                  className={`
                    w-20 h-28 md:w-24 md:h-32 rounded-lg p-2 cursor-pointer transition-all
                    ${card.cost <= playerEnergy ? 'opacity-100' : 'opacity-50'}
                    circuit-border
                  `}
                  style={{ 
                    background: `linear-gradient(135deg, ${card.color}20 0%, transparent 50%)`,
                    borderColor: card.color 
                  }}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span 
                        className="font-['Orbitron'] text-xs font-bold"
                        style={{ color: card.color }}
                      >
                        {card.name}
                      </span>
                      <span className="font-['Share_Tech_Mono'] text-xs text-[#39FF14] bg-black/50 px-1 rounded">
                        {card.cost}
                      </span>
                    </div>
                    <div className="text-center">
                      {card.type === "attack" && <Sword className="w-6 h-6 mx-auto" style={{ color: card.color }} />}
                      {card.type === "defense" && <Shield className="w-6 h-6 mx-auto" style={{ color: card.color }} />}
                      {card.type === "skill" && <Zap className="w-6 h-6 mx-auto" style={{ color: card.color }} />}
                    </div>
                    <p className="font-['Rajdhani'] text-[10px] text-gray-400 text-center leading-tight">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={endTurn}
              disabled={!isPlayerTurn || isAnimating || gameOver}
              className="font-['Orbitron'] bg-gradient-to-r from-[#FF3366] to-[#CC2952] hover:from-[#FF4477] hover:to-[#DD3A63] text-white px-8"
            >
              结束回合
            </Button>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="font-['Share_Tech_Mono'] text-xs">牌库: {deck.length}</span>
              <span className="font-['Share_Tech_Mono'] text-xs">弃牌: {discard.length}</span>
            </div>
          </div>
        </div>
        
        {/* 游戏结束弹窗 */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass rounded-xl p-8 text-center max-w-sm mx-4"
              >
                <h2 className={`font-['Orbitron'] text-3xl font-bold mb-4 ${victory ? 'text-[#39FF14] neon-glow-blue' : 'text-[#FF3366] neon-glow-red'}`}>
                  {victory ? '胜利！' : '失败...'}
                </h2>
                <p className="font-['Rajdhani'] text-gray-400 mb-6">
                  {victory ? '你成功击败了敌人！' : '你被敌人击败了...'}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={startNewGame}
                    className="font-['Orbitron'] bg-[#00D4FF] hover:bg-[#00E5FF] text-black"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    再来一局
                  </Button>
                  <Link href="/">
                    <Button variant="outline" className="font-['Orbitron'] border-gray-600 text-gray-400">
                      返回主页
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
