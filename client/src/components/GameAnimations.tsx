/*
 * 游戏动画组件库
 * 赛博废土朋克风格的特效动画
 */

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

// 故障闪烁动画
export function GlitchText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        x: [0, -2, 2, -1, 1, 0],
        filter: [
          'hue-rotate(0deg)',
          'hue-rotate(10deg)',
          'hue-rotate(-10deg)',
          'hue-rotate(5deg)',
          'hue-rotate(0deg)',
        ],
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      {children}
    </motion.div>
  );
}

// 霓虹脉冲动画
export function NeonPulse({ children, color = '#00D4FF', className = '' }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          `0 0 5px ${color}, 0 0 10px ${color}`,
          `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
          `0 0 5px ${color}, 0 0 10px ${color}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// 数据流动画背景
export function DataFlowBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px bg-gradient-to-b from-transparent via-[#00D4FF] to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${Math.random() * 100 + 50}px`,
          }}
          initial={{ top: '-100px', opacity: 0 }}
          animate={{
            top: '100%',
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// 电弧攻击特效
export function ElectricArc({ isActive, onComplete }: { isActive: boolean; onComplete?: () => void }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M50,0 L45,30 L55,35 L40,60 L60,65 L35,100"
              stroke="#FF3366"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 0.3 }}
              style={{
                filter: 'drop-shadow(0 0 5px #FF3366) drop-shadow(0 0 10px #FF3366)',
              }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 护盾激活特效
export function ShieldEffect({ isActive }: { isActive: boolean }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: [0.5, 1.2, 1],
            opacity: [0, 0.8, 0.3],
          }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)',
            border: '2px solid #00D4FF',
            boxShadow: '0 0 20px #00D4FF, inset 0 0 20px rgba(0,212,255,0.2)',
          }}
        />
      )}
    </AnimatePresence>
  );
}

// 卡牌抽取动画
export function CardDrawAnimation({ isDrawing }: { isDrawing: boolean }) {
  return (
    <AnimatePresence>
      {isDrawing && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-24 h-32 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, #00D4FF20 0%, #FF336620 100%)',
              border: '2px solid #00D4FF',
              boxShadow: '0 0 30px #00D4FF',
            }}
            initial={{ y: 100, rotateY: 180, scale: 0.5 }}
            animate={{ 
              y: [100, -50, 0],
              rotateY: [180, 90, 0],
              scale: [0.5, 1.2, 1],
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 伤害数字飘字
export function DamageNumber({ 
  value, 
  type = 'damage',
  position = { x: 50, y: 50 }
}: { 
  value: number; 
  type?: 'damage' | 'heal' | 'shield';
  position?: { x: number; y: number };
}) {
  const colors = {
    damage: '#FF3366',
    heal: '#39FF14',
    shield: '#00D4FF',
  };
  
  const prefixes = {
    damage: '-',
    heal: '+',
    shield: '+',
  };

  return (
    <motion.div
      className="fixed pointer-events-none z-50 font-['Orbitron'] text-2xl font-bold"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        color: colors[type],
        textShadow: `0 0 10px ${colors[type]}`,
      }}
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ 
        opacity: [1, 1, 0],
        y: -50,
        scale: [1, 1.5, 1],
      }}
      transition={{ duration: 1 }}
    >
      {prefixes[type]}{value}
    </motion.div>
  );
}

// 粒子爆炸效果
export function ParticleExplosion({ 
  isActive, 
  color = '#00D4FF',
  particleCount = 20 
}: { 
  isActive: boolean; 
  color?: string;
  particleCount?: number;
}) {
  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
          {Array.from({ length: particleCount }).map((_, i) => {
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ 
                  x,
                  y,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ 
                  duration: 0.5 + Math.random() * 0.3,
                  ease: 'easeOut',
                }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}

// 扫描线动画
export function ScanlineOverlay({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
      }}
    >
      <motion.div
        className="absolute left-0 right-0 h-px bg-[#00D4FF]/30"
        animate={{ top: ['0%', '100%'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}

// 加载动画
export function CyberLoader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };
  
  return (
    <div className={`relative ${sizes[size]}`}>
      <motion.div
        className="absolute inset-0 border-2 border-[#00D4FF] rounded-full"
        style={{ borderTopColor: 'transparent' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-2 border-2 border-[#FF3366] rounded-full"
        style={{ borderBottomColor: 'transparent' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-4 bg-[#00D4FF]/20 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}
