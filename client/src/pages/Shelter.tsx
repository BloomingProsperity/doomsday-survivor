/*
 * 设计风格：赛博废土朋克 (Cyber Wasteland Punk)
 * 页面：避难所建造/经营
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Droplets, Wheat, Wrench, Users, ArrowUp, Clock } from "lucide-react";
import { toast } from "sonner";

interface Building {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  production: number;
  productionType: "energy" | "water" | "food" | "materials";
  upgradeCost: number;
  icon: React.ReactNode;
  color: string;
}

export default function Shelter() {
  const [resources, setResources] = useState({
    energy: 1250,
    water: 800,
    food: 650,
    materials: 3840,
  });
  
  const [buildings, setBuildings] = useState<Building[]>([
    { id: "generator", name: "发电机", level: 3, maxLevel: 10, production: 15, productionType: "energy", upgradeCost: 500, icon: <Zap className="w-6 h-6" />, color: "#39FF14" },
    { id: "purifier", name: "净水器", level: 2, maxLevel: 10, production: 10, productionType: "water", upgradeCost: 400, icon: <Droplets className="w-6 h-6" />, color: "#00D4FF" },
    { id: "farm", name: "水培农场", level: 2, maxLevel: 10, production: 8, productionType: "food", upgradeCost: 350, icon: <Wheat className="w-6 h-6" />, color: "#FF6B35" },
    { id: "workshop", name: "工作坊", level: 1, maxLevel: 10, production: 5, productionType: "materials", upgradeCost: 600, icon: <Wrench className="w-6 h-6" />, color: "#B8860B" },
  ]);
  
  const [survivors, setSurvivors] = useState(12);
  const [maxSurvivors] = useState(20);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // 自动生产资源
  useEffect(() => {
    const interval = setInterval(() => {
      setResources(prev => {
        const newResources = { ...prev };
        buildings.forEach(building => {
          newResources[building.productionType] += building.production;
        });
        return newResources;
      });
      setLastUpdate(Date.now());
    }, 5000);
    
    return () => clearInterval(interval);
  }, [buildings]);

  const upgradeBuilding = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return;
    
    if (building.level >= building.maxLevel) {
      toast.error("已达到最高等级！");
      return;
    }
    
    if (resources.materials < building.upgradeCost) {
      toast.error("物资不足！");
      return;
    }
    
    setResources(prev => ({
      ...prev,
      materials: prev.materials - building.upgradeCost
    }));
    
    setBuildings(prev => prev.map(b => {
      if (b.id === buildingId) {
        return {
          ...b,
          level: b.level + 1,
          production: Math.floor(b.production * 1.3),
          upgradeCost: Math.floor(b.upgradeCost * 1.5)
        };
      }
      return b;
    }));
    
    toast.success(`${building.name} 升级成功！`);
  };

  const resourceIcons = {
    energy: <Zap className="w-4 h-4 text-[#39FF14]" />,
    water: <Droplets className="w-4 h-4 text-[#00D4FF]" />,
    food: <Wheat className="w-4 h-4 text-[#FF6B35]" />,
    materials: <Wrench className="w-4 h-4 text-[#B8860B]" />,
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/shelter-base.png')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      <div className="relative z-10 min-h-screen p-4">
        {/* 顶部栏 */}
        <header className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-[#00D4FF]">
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回
            </Button>
          </Link>
          <h1 className="font-['Orbitron'] text-xl text-[#FF6B35]">避难所</h1>
          <div className="flex items-center gap-1 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="font-['Share_Tech_Mono'] text-sm">{survivors}/{maxSurvivors}</span>
          </div>
        </header>
        
        {/* 资源栏 */}
        <div className="glass rounded-lg p-4 mb-6">
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(resources).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {resourceIcons[key as keyof typeof resourceIcons]}
                  <span className="font-['Share_Tech_Mono'] text-xs text-gray-500 capitalize">
                    {key === "energy" ? "能量" : key === "water" ? "水" : key === "food" ? "食物" : "物资"}
                  </span>
                </div>
                <p className="font-['Orbitron'] text-lg text-white">{value.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-gray-500">
            <Clock className="w-3 h-3" />
            <span className="font-['Share_Tech_Mono'] text-xs">每5秒自动生产</span>
          </div>
        </div>
        
        {/* 建筑列表 */}
        <div className="space-y-4">
          <h2 className="font-['Orbitron'] text-lg text-[#00D4FF] mb-4">设施管理</h2>
          
          {buildings.map((building, index) => (
            <motion.div
              key={building.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-lg p-4"
              style={{ borderColor: `${building.color}50` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ 
                      background: `${building.color}20`,
                      boxShadow: `0 0 15px ${building.color}30`
                    }}
                  >
                    <div style={{ color: building.color }}>
                      {building.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-['Orbitron'] text-white">{building.name}</h3>
                    <p className="font-['Share_Tech_Mono'] text-xs text-gray-500">
                      Lv.{building.level} / {building.maxLevel}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-['Share_Tech_Mono'] text-sm" style={{ color: building.color }}>
                    +{building.production}/5s
                  </p>
                  <p className="font-['Share_Tech_Mono'] text-xs text-gray-500">
                    {building.productionType === "energy" ? "能量" : 
                     building.productionType === "water" ? "水" : 
                     building.productionType === "food" ? "食物" : "物资"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Progress 
                  value={(building.level / building.maxLevel) * 100} 
                  className="flex-1 h-2"
                  style={{ 
                    background: `${building.color}20`,
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => upgradeBuilding(building.id)}
                  disabled={building.level >= building.maxLevel || resources.materials < building.upgradeCost}
                  className="font-['Rajdhani'] text-xs"
                  style={{ 
                    background: building.level >= building.maxLevel ? '#333' : building.color,
                    color: '#000'
                  }}
                >
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {building.level >= building.maxLevel ? "已满级" : `${building.upgradeCost} 物资`}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* 幸存者信息 */}
        <div className="glass rounded-lg p-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-['Orbitron'] text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00D4FF]" />
              幸存者
            </h3>
            <span className="font-['Orbitron'] text-[#00D4FF]">{survivors}/{maxSurvivors}</span>
          </div>
          <Progress value={(survivors / maxSurvivors) * 100} className="h-3 mb-3" />
          <p className="font-['Rajdhani'] text-sm text-gray-400">
            幸存者可以分配到各个设施中工作，提高生产效率。升级宿舍可以容纳更多幸存者。
          </p>
          <Button 
            variant="outline" 
            className="w-full mt-3 font-['Rajdhani'] border-[#00D4FF]/50 text-[#00D4FF]"
            onClick={() => toast.info("功能开发中...")}
          >
            招募幸存者
          </Button>
        </div>
        
        {/* 探索按钮 */}
        <div className="mt-6">
          <Button 
            className="w-full font-['Orbitron'] py-6 bg-gradient-to-r from-[#FF6B35] to-[#CC5429] hover:from-[#FF7C46] hover:to-[#DD653A] text-white"
            onClick={() => toast.info("探索功能开发中...")}
          >
            探索废土
          </Button>
        </div>
      </div>
    </div>
  );
}
