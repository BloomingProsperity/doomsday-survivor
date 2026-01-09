/*
 * 设计风格：赛博废土朋克 (Cyber Wasteland Punk)
 * 页面：商城/付费系统
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Gem, Gift, Crown, Sparkles, Package, Clock, Star, Zap } from "lucide-react";
import { toast } from "sonner";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "rmb" | "crystal";
  bonus?: string;
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
}

const crystalPackages: ShopItem[] = [
  { id: "crystal_1", name: "能量水晶 x60", description: "少量水晶", price: 6, currency: "rmb", icon: <Gem className="w-6 h-6" />, color: "#00D4FF" },
  { id: "crystal_2", name: "能量水晶 x300", description: "首充双倍", price: 30, currency: "rmb", bonus: "+60", icon: <Gem className="w-6 h-6" />, color: "#00D4FF" },
  { id: "crystal_3", name: "能量水晶 x680", description: "超值礼包", price: 68, currency: "rmb", bonus: "+180", popular: true, icon: <Gem className="w-6 h-6" />, color: "#00D4FF" },
  { id: "crystal_4", name: "能量水晶 x1280", description: "豪华礼包", price: 128, currency: "rmb", bonus: "+420", icon: <Gem className="w-6 h-6" />, color: "#00D4FF" },
  { id: "crystal_5", name: "能量水晶 x3280", description: "至尊礼包", price: 328, currency: "rmb", bonus: "+1200", icon: <Gem className="w-6 h-6" />, color: "#00D4FF" },
  { id: "crystal_6", name: "能量水晶 x6480", description: "终极礼包", price: 648, currency: "rmb", bonus: "+2800", icon: <Gem className="w-6 h-6" />, color: "#00D4FF" },
];

const subscriptions: ShopItem[] = [
  { id: "monthly", name: "月卡", description: "每日领取50水晶，持续30天", price: 30, currency: "rmb", bonus: "总计1500水晶", icon: <Crown className="w-6 h-6" />, color: "#F59E0B" },
  { id: "season", name: "季卡", description: "每日领取80水晶，持续90天", price: 98, currency: "rmb", bonus: "总计7200水晶", popular: true, icon: <Crown className="w-6 h-6" />, color: "#9333EA" },
];

const specialOffers: ShopItem[] = [
  { id: "starter", name: "新手礼包", description: "水晶x500 + 稀有卡x3", price: 6, currency: "rmb", bonus: "限购1次", icon: <Gift className="w-6 h-6" />, color: "#39FF14" },
  { id: "battle_pass", name: "战斗通行证", description: "解锁高级奖励通道", price: 68, currency: "rmb", bonus: "限定皮肤", icon: <Sparkles className="w-6 h-6" />, color: "#FF3366" },
];

const cardPacks: ShopItem[] = [
  { id: "pack_normal", name: "普通卡包", description: "随机获得3张卡牌", price: 100, currency: "crystal", icon: <Package className="w-6 h-6" />, color: "#718096" },
  { id: "pack_rare", name: "稀有卡包", description: "必得1张稀有卡牌", price: 300, currency: "crystal", icon: <Package className="w-6 h-6" />, color: "#4299E1" },
  { id: "pack_epic", name: "史诗卡包", description: "必得1张史诗卡牌", price: 800, currency: "crystal", popular: true, icon: <Package className="w-6 h-6" />, color: "#9333EA" },
  { id: "pack_legend", name: "传说卡包", description: "必得1张传说卡牌", price: 2000, currency: "crystal", icon: <Package className="w-6 h-6" />, color: "#F59E0B" },
];

export default function Shop() {
  const [crystals] = useState(1250);
  
  const handlePurchase = (item: ShopItem) => {
    if (item.currency === "rmb") {
      toast.info(`即将跳转支付 ¥${item.price}...`);
    } else {
      if (crystals >= item.price) {
        toast.success(`成功购买 ${item.name}！`);
      } else {
        toast.error("水晶不足！");
      }
    }
  };

  const renderShopItem = (item: ShopItem, index: number) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`
        glass rounded-lg p-4 relative overflow-hidden
        ${item.popular ? 'ring-2 ring-[#FF3366]' : ''}
      `}
      style={{ borderColor: `${item.color}50` }}
    >
      {item.popular && (
        <div className="absolute top-0 right-0 bg-[#FF3366] text-white text-xs font-['Orbitron'] px-2 py-1 rounded-bl-lg">
          热门
        </div>
      )}
      
      <div className="flex items-start gap-3">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ 
            background: `${item.color}20`,
            boxShadow: `0 0 15px ${item.color}30`
          }}
        >
          <div style={{ color: item.color }}>
            {item.icon}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-['Orbitron'] text-white text-sm truncate">{item.name}</h3>
          <p className="font-['Rajdhani'] text-xs text-gray-400">{item.description}</p>
          {item.bonus && (
            <p className="font-['Share_Tech_Mono'] text-xs text-[#39FF14] mt-1">
              {item.bonus}
            </p>
          )}
        </div>
        
        <Button
          size="sm"
          onClick={() => handlePurchase(item)}
          className="font-['Orbitron'] text-xs flex-shrink-0"
          style={{ 
            background: item.color,
            color: '#000'
          }}
        >
          {item.currency === "rmb" ? `¥${item.price}` : (
            <span className="flex items-center gap-1">
              <Gem className="w-3 h-3" />
              {item.price}
            </span>
          )}
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* 背景效果 */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0D0D1E] via-[#1A1A2E] to-[#16213E]" />
      <div className="fixed inset-0 data-flow opacity-20" />
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
          <h1 className="font-['Orbitron'] text-xl text-[#FF3366]">商城</h1>
          <div className="flex items-center gap-1 bg-[#00D4FF]/10 px-3 py-1 rounded-full">
            <Gem className="w-4 h-4 text-[#00D4FF]" />
            <span className="font-['Orbitron'] text-sm text-[#00D4FF]">{crystals.toLocaleString()}</span>
          </div>
        </header>
        
        {/* 限时活动横幅 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-lg p-4 mb-6 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255,51,102,0.2) 0%, rgba(0,212,255,0.2) 100%)',
            borderColor: '#FF3366'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-[#FF3366]" />
                <span className="font-['Share_Tech_Mono'] text-xs text-[#FF3366]">限时活动</span>
              </div>
              <h3 className="font-['Orbitron'] text-lg text-white">首充双倍</h3>
              <p className="font-['Rajdhani'] text-sm text-gray-400">首次充值获得双倍水晶</p>
            </div>
            <div className="text-right">
              <p className="font-['Share_Tech_Mono'] text-xs text-gray-500">剩余时间</p>
              <p className="font-['Orbitron'] text-lg text-[#FF3366]">23:59:59</p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20">
            <Star className="w-24 h-24 text-[#FF3366]" />
          </div>
        </motion.div>
        
        {/* 商城标签页 */}
        <Tabs defaultValue="crystal" className="w-full">
          <TabsList className="glass w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="crystal" className="font-['Rajdhani'] text-xs">
              <Gem className="w-3 h-3 mr-1" />
              水晶
            </TabsTrigger>
            <TabsTrigger value="subscription" className="font-['Rajdhani'] text-xs">
              <Crown className="w-3 h-3 mr-1" />
              订阅
            </TabsTrigger>
            <TabsTrigger value="special" className="font-['Rajdhani'] text-xs">
              <Gift className="w-3 h-3 mr-1" />
              礼包
            </TabsTrigger>
            <TabsTrigger value="cards" className="font-['Rajdhani'] text-xs">
              <Package className="w-3 h-3 mr-1" />
              卡包
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="crystal" className="space-y-3">
            <p className="font-['Rajdhani'] text-sm text-gray-400 mb-4">
              能量水晶是游戏中的高级货币，可用于购买卡包、加速建造等。
            </p>
            {crystalPackages.map((item, index) => renderShopItem(item, index))}
          </TabsContent>
          
          <TabsContent value="subscription" className="space-y-3">
            <p className="font-['Rajdhani'] text-sm text-gray-400 mb-4">
              订阅服务可以每日领取水晶，性价比最高的充值方式。
            </p>
            {subscriptions.map((item, index) => renderShopItem(item, index))}
            
            <div className="glass rounded-lg p-4 mt-4">
              <h4 className="font-['Orbitron'] text-sm text-[#F59E0B] mb-2 flex items-center gap-2">
                <Crown className="w-4 h-4" />
                订阅特权
              </h4>
              <ul className="font-['Rajdhani'] text-sm text-gray-400 space-y-1">
                <li className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[#39FF14]" />
                  每日登录额外奖励
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[#39FF14]" />
                  建造速度提升20%
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[#39FF14]" />
                  专属头像框
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[#39FF14]" />
                  VIP客服通道
                </li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="special" className="space-y-3">
            <p className="font-['Rajdhani'] text-sm text-gray-400 mb-4">
              限时特惠礼包，错过不再有！
            </p>
            {specialOffers.map((item, index) => renderShopItem(item, index))}
          </TabsContent>
          
          <TabsContent value="cards" className="space-y-3">
            <p className="font-['Rajdhani'] text-sm text-gray-400 mb-4">
              使用水晶购买卡包，获取强力卡牌！
            </p>
            {cardPacks.map((item, index) => renderShopItem(item, index))}
            
            <div className="glass rounded-lg p-4 mt-4">
              <h4 className="font-['Orbitron'] text-sm text-[#9333EA] mb-2">概率公示</h4>
              <div className="grid grid-cols-2 gap-2 font-['Share_Tech_Mono'] text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">普通</span>
                  <span className="text-gray-400">70%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4299E1]">稀有</span>
                  <span className="text-gray-400">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9333EA]">史诗</span>
                  <span className="text-gray-400">8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F59E0B]">传说</span>
                  <span className="text-gray-400">2%</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* 底部提示 */}
        <div className="mt-6 text-center">
          <p className="font-['Share_Tech_Mono'] text-xs text-gray-600">
            充值即表示同意《用户协议》和《隐私政策》
          </p>
        </div>
      </div>
    </div>
  );
}
