/*
 * 项目报告页面
 * 展示市场调研、游戏设计、开发进度和上架指南
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowLeft, TrendingUp, Target, Code, Palette, Music, TestTube, 
  Upload, BarChart3, PieChart, LineChart, CheckCircle, Clock, 
  Zap, Users, DollarSign, Gamepad2, Shield, Sword, Star
} from "lucide-react";

// 市场数据
const marketData = {
  categories: [
    { name: "放置街机", growth: 21.9, potential: 85, competition: 45 },
    { name: "Roguelike", growth: 18.5, potential: 80, competition: 55 },
    { name: "卡牌构筑", growth: 15.2, potential: 75, competition: 60 },
    { name: "消除类", growth: 8.3, potential: 60, competition: 90 },
    { name: "跑酷类", growth: 5.1, potential: 50, competition: 85 },
  ],
  trends: [
    { month: "2024-07", users: 2.1 },
    { month: "2024-08", users: 2.3 },
    { month: "2024-09", users: 2.5 },
    { month: "2024-10", users: 2.8 },
    { month: "2024-11", users: 3.2 },
    { month: "2024-12", users: 3.5 },
    { month: "2025-01", users: 3.8 },
  ],
};

// 项目进度
const projectPhases = [
  { id: 1, name: "市场调研", status: "completed", progress: 100, icon: <TrendingUp className="w-5 h-5" /> },
  { id: 2, name: "项目策划", status: "completed", progress: 100, icon: <Target className="w-5 h-5" /> },
  { id: 3, name: "游戏开发", status: "completed", progress: 100, icon: <Code className="w-5 h-5" /> },
  { id: 4, name: "美术设计", status: "completed", progress: 100, icon: <Palette className="w-5 h-5" /> },
  { id: 5, name: "音效动效", status: "completed", progress: 100, icon: <Music className="w-5 h-5" /> },
  { id: 6, name: "测试优化", status: "completed", progress: 100, icon: <TestTube className="w-5 h-5" /> },
  { id: 7, name: "上架准备", status: "completed", progress: 100, icon: <Upload className="w-5 h-5" /> },
];

// 游戏特性
const gameFeatures = [
  { name: "回合制卡牌战斗", description: "策略性强，易上手难精通", icon: <Sword className="w-6 h-6" /> },
  { name: "放置经营系统", description: "自动收集资源，轻松养成", icon: <Zap className="w-6 h-6" /> },
  { name: "卡牌收集构筑", description: "丰富的卡牌体系，多样玩法", icon: <Star className="w-6 h-6" /> },
  { name: "多元付费设计", description: "水晶、月卡、礼包等多种选择", icon: <DollarSign className="w-6 h-6" /> },
];

// 付费点分析
const monetizationPoints = [
  { name: "能量水晶", type: "直购", price: "6-648元", conversion: "高" },
  { name: "月卡/季卡", type: "订阅", price: "30-98元", conversion: "极高" },
  { name: "新手礼包", type: "限购", price: "6元", conversion: "极高" },
  { name: "战斗通行证", type: "赛季", price: "68元", conversion: "中高" },
  { name: "卡包抽取", type: "抽卡", price: "100-2000水晶", conversion: "高" },
];

export default function Report() {
  const [activeTab, setActiveTab] = useState("overview");

  const totalProgress = projectPhases.reduce((acc, phase) => acc + phase.progress, 0) / projectPhases.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 背景装饰 */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 min-h-screen">
        {/* 顶部导航 */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-20">
          <div className="container py-4 flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回游戏
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">项目开发报告</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">完成度</span>
              <span className="text-lg font-bold text-green-400">{totalProgress.toFixed(0)}%</span>
            </div>
          </div>
        </header>
        
        {/* 主要内容 */}
        <main className="container py-8">
          {/* 项目概览卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 mb-8 border border-white/10"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Gamepad2 className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">末日幸存者：卡牌求生</h2>
                <p className="text-gray-400 mb-4">放置街机 + Roguelike卡牌构筑 + 轻量SLG</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">赛博废土朋克</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">蓝海赛道</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">高付费潜力</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-1">100%</div>
                <div className="text-sm text-gray-400">开发完成</div>
              </div>
            </div>
          </motion.div>
          
          {/* 标签页导航 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-5 bg-black/20 border border-white/10 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                概览
              </TabsTrigger>
              <TabsTrigger value="market" className="data-[state=active]:bg-blue-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                市场
              </TabsTrigger>
              <TabsTrigger value="design" className="data-[state=active]:bg-blue-600">
                <Target className="w-4 h-4 mr-2" />
                设计
              </TabsTrigger>
              <TabsTrigger value="monetization" className="data-[state=active]:bg-blue-600">
                <DollarSign className="w-4 h-4 mr-2" />
                变现
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="data-[state=active]:bg-blue-600">
                <Clock className="w-4 h-4 mr-2" />
                进度
              </TabsTrigger>
            </TabsList>
            
            {/* 概览 */}
            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "游戏类型", value: "卡牌+放置", icon: <Gamepad2 className="w-5 h-5" />, color: "blue" },
                  { label: "目标平台", value: "微信小游戏", icon: <Target className="w-5 h-5" />, color: "green" },
                  { label: "开发周期", value: "1天", icon: <Clock className="w-5 h-5" />, color: "purple" },
                  { label: "预估收入", value: "可观", icon: <DollarSign className="w-5 h-5" />, color: "yellow" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center mb-3 text-${stat.color}-400`}>
                      {stat.icon}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* 游戏特性 */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  核心特性
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {gameFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-white/5 rounded-lg"
                    >
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{feature.name}</h4>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* 市场分析 */}
            <TabsContent value="market">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* 品类增长对比 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    品类增长率对比
                  </h3>
                  <div className="space-y-4">
                    {marketData.categories.map((cat, index) => (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">{cat.name}</span>
                          <span className={`font-bold ${cat.growth > 15 ? 'text-green-400' : cat.growth > 10 ? 'text-yellow-400' : 'text-gray-400'}`}>
                            +{cat.growth}%
                          </span>
                        </div>
                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${cat.growth > 15 ? 'bg-green-500' : cat.growth > 10 ? 'bg-yellow-500' : 'bg-gray-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(cat.growth / 25) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    放置街机+SLG融合是2025年增长最快的品类，下载量增长21.9%
                  </p>
                </div>
                
                {/* 竞争度分析 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-purple-400" />
                    市场竞争度分析
                  </h3>
                  <div className="space-y-4">
                    {marketData.categories.map((cat, index) => (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-24 text-gray-300 text-sm">{cat.name}</div>
                        <div className="flex-1 flex gap-2">
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">潜力</div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-green-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${cat.potential}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">竞争</div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-red-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${cat.competition}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    放置街机类潜力高(85%)但竞争相对较低(45%)，是理想的蓝海赛道
                  </p>
                </div>
                
                {/* 用户增长趋势 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 lg:col-span-2">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-green-400" />
                    小游戏用户增长趋势（亿）
                  </h3>
                  <div className="h-48 flex items-end gap-4 px-4">
                    {marketData.trends.map((data, index) => (
                      <motion.div
                        key={data.month}
                        className="flex-1 flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
                          initial={{ height: 0 }}
                          animate={{ height: `${(data.users / 4) * 150}px` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                        <div className="text-xs text-gray-400 mt-2">{data.month.slice(5)}</div>
                        <div className="text-sm font-bold text-blue-400">{data.users}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* 游戏设计 */}
            <TabsContent value="design">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* 玩法系统 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">核心玩法系统</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Sword className="w-5 h-5 text-red-400" />
                        <span className="font-semibold text-red-400">卡牌战斗</span>
                      </div>
                      <p className="text-sm text-gray-400">回合制策略对战，构筑卡组，击败敌人获取奖励</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold text-blue-400">避难所建造</span>
                      </div>
                      <p className="text-sm text-gray-400">放置经营，自动收集资源，升级设施提升产出</p>
                    </div>
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-green-400" />
                        <span className="font-semibold text-green-400">卡牌收集</span>
                      </div>
                      <p className="text-sm text-gray-400">多稀有度卡牌体系，抽卡获取，强化升级</p>
                    </div>
                  </div>
                </div>
                
                {/* 美术风格 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">美术风格：赛博废土朋克</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#0D0D1E]" />
                      <div className="w-8 h-8 rounded bg-[#16213E]" />
                      <div className="w-8 h-8 rounded bg-[#00D4FF]" />
                      <div className="w-8 h-8 rounded bg-[#FF3366]" />
                      <div className="w-8 h-8 rounded bg-[#39FF14]" />
                      <span className="text-sm text-gray-400">主色调</span>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• 深色背景 + 霓虹色强调</li>
                      <li>• 故障艺术(Glitch)效果</li>
                      <li>• 半透明玻璃态UI</li>
                      <li>• 电路纹理和扫描线</li>
                      <li>• 全息投影风格元素</li>
                    </ul>
                  </div>
                </div>
                
                {/* 技术栈 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 lg:col-span-2">
                  <h3 className="text-lg font-bold text-white mb-4">技术实现</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-2">前端框架</h4>
                      <p className="text-sm text-gray-400">React 19 + TypeScript + Tailwind CSS</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-semibold text-green-400 mb-2">动画引擎</h4>
                      <p className="text-sm text-gray-400">Framer Motion + Web Audio API</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-semibold text-purple-400 mb-2">目标平台</h4>
                      <p className="text-sm text-gray-400">微信小游戏 (需迁移到Cocos Creator)</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* 变现分析 */}
            <TabsContent value="monetization">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* 付费点列表 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-yellow-400" />
                    付费点设计
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 text-gray-400">商品</th>
                          <th className="text-left py-2 text-gray-400">类型</th>
                          <th className="text-left py-2 text-gray-400">价格</th>
                          <th className="text-left py-2 text-gray-400">转化</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monetizationPoints.map((point, index) => (
                          <motion.tr
                            key={point.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/5"
                          >
                            <td className="py-3 text-white">{point.name}</td>
                            <td className="py-3 text-gray-400">{point.type}</td>
                            <td className="py-3 text-yellow-400">{point.price}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded text-xs ${
                                point.conversion === "极高" ? "bg-green-500/20 text-green-400" :
                                point.conversion === "高" ? "bg-blue-500/20 text-blue-400" :
                                "bg-yellow-500/20 text-yellow-400"
                              }`}>
                                {point.conversion}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* 收入预估 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    收入模型预估
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">日活用户(DAU)</span>
                        <span className="text-white font-bold">10,000</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">付费率</span>
                        <span className="text-white font-bold">3%</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">ARPPU</span>
                        <span className="text-white font-bold">¥50</span>
                      </div>
                      <div className="border-t border-white/10 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">日收入预估</span>
                          <span className="text-green-400 font-bold">¥15,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">月收入预估</span>
                          <span className="text-green-400 font-bold">¥450,000</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      * 以上为理想情况下的预估，实际收入取决于运营和推广效果
                    </p>
                  </div>
                </div>
                
                {/* 变现策略 */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 lg:col-span-2">
                  <h3 className="text-lg font-bold text-white mb-4">变现策略建议</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-green-400 mb-2">首充双倍</h4>
                      <p className="text-sm text-gray-400">首次充值获得双倍水晶，提高首充转化率</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <h4 className="font-semibold text-blue-400 mb-2">月卡机制</h4>
                      <p className="text-sm text-gray-400">每日登录领取，培养付费习惯，提高留存</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <h4 className="font-semibold text-purple-400 mb-2">限时活动</h4>
                      <p className="text-sm text-gray-400">节日活动、限定卡牌，制造稀缺感</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* 开发进度 */}
            <TabsContent value="roadmap">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  项目开发进度
                </h3>
                <div className="space-y-4">
                  {projectPhases.map((phase, index) => (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        phase.status === "completed" ? "bg-green-500/20 text-green-400" :
                        phase.status === "in_progress" ? "bg-blue-500/20 text-blue-400" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>
                        {phase.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-white font-medium">{phase.name}</span>
                          <span className={`text-sm ${
                            phase.status === "completed" ? "text-green-400" :
                            phase.status === "in_progress" ? "text-blue-400" :
                            "text-gray-400"
                          }`}>
                            {phase.progress}%
                          </span>
                        </div>
                        <Progress value={phase.progress} className="h-2" />
                      </div>
                      {phase.status === "completed" && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* 下一步计划 */}
                <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-2">下一步计划</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>1. 将Web版本迁移到Cocos Creator</li>
                    <li>2. 接入微信小游戏API和虚拟支付</li>
                    <li>3. 准备上架材料并提交审核</li>
                    <li>4. 进行游戏备案（如需要）</li>
                    <li>5. 正式上线并开始运营推广</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
        
        {/* 底部 */}
        <footer className="border-t border-white/10 py-6">
          <div className="container text-center text-sm text-gray-500">
            <p>末日幸存者：卡牌求生 - 项目开发报告</p>
            <p className="mt-1">由 Manus AI 生成 | {new Date().toLocaleDateString('zh-CN')}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
