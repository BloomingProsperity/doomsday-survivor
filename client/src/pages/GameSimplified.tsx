/*
 * 简化版游戏 - 快速上线版本
 * 核心玩法：简单的点击游戏 + 广告变现
 * 目标：快速上线，快速赚钱
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Share2, RotateCcw, Volume2, VolumeX } from "lucide-react";

// 广告配置（使用免费的广告联盟）
const AD_CONFIG = {
  // 使用Google AdSense或其他免费广告平台
  enabled: true,
  showInterval: 3, // 每3局游戏显示一次广告
};

export default function GameSimplified() {
  // 游戏状态
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem("bestScore") || "0")
  );

  // 游戏计时器
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          setGameOver(true);
          setGamesPlayed((prev) => prev + 1);

          // 检查是否需要显示广告
          if ((gamesPlayed + 1) % AD_CONFIG.showInterval === 0) {
            setShowAd(true);
          }

          // 更新最高分
          if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem("bestScore", score.toString());
          }

          playSound("gameOver");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timeLeft, score, bestScore, gamesPlayed]);

  // 音效
  const playSound = (type: "click" | "gameOver") => {
    if (!soundEnabled) return;

    // 使用Web Audio API生成简单的音效
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === "click") {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === "gameOver") {
      oscillator.frequency.value = 400;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  // 点击处理
  const handleClick = () => {
    if (!gameActive) return;
    setScore((prev) => prev + 1);
    playSound("click");
  };

  // 开始游戏
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setGameOver(false);
    setShowAd(false);
  };

  // 分享功能
  const handleShare = () => {
    const shareText = `我在"末日幸存者"游戏中得分${score}分！最高分${bestScore}分。来挑战我吧！`;
    const shareUrl = window.location.href;

    // 微信分享
    if ((window as any).wx) {
      (window as any).wx.ready(() => {
        (window as any).wx.onMenuShareAppMessage({
          title: "末日幸存者 - 快速点击游戏",
          desc: shareText,
          link: shareUrl,
          imgUrl: "/images/hero-banner.png",
          type: "link",
          dataUrl: "",
          success: () => {
            console.log("分享成功");
          },
        });
      });
    } else {
      // 降级方案：复制链接
      navigator.clipboard.writeText(shareUrl);
      alert("链接已复制，分享给朋友吧！");
    }
  };

  // 生成二维码（使用第三方服务）
  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(qrUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">末日幸存者</h1>
          <p className="text-gray-400">30秒内点击次数越多越好</p>
        </motion.div>

        {/* 分数显示 */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 mb-6 border border-white/10"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-gray-400 text-sm">当前分数</div>
              <div className="text-3xl font-bold text-blue-400">{score}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">剩余时间</div>
              <div className="text-3xl font-bold text-green-400">{timeLeft}s</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">最高分</div>
              <div className="text-3xl font-bold text-yellow-400">{bestScore}</div>
            </div>
          </div>
        </motion.div>

        {/* 游戏区域 */}
        {!gameOver ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl p-12 mb-6 border-2 border-blue-400/50 cursor-pointer active:scale-95 transition-transform"
            onClick={handleClick}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-center">
              {gameActive ? (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="text-6xl font-bold text-blue-400"
                >
                  👆
                </motion.div>
              ) : (
                <div className="text-5xl font-bold text-gray-400">点击开始</div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-3xl p-8 mb-6 border-2 border-red-400/50 text-center"
          >
            <div className="text-2xl font-bold text-white mb-2">游戏结束！</div>
            <div className="text-5xl font-bold text-yellow-400 mb-4">{score}</div>
            <div className="text-gray-400">
              {score > bestScore ? "🎉 新的最高分！" : `还差${bestScore - score}分就能打破纪录`}
            </div>
          </motion.div>
        )}

        {/* 按钮区域 */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={startGame}
            disabled={gameActive}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg"
          >
            {gameActive ? "游戏中..." : gameOver ? "再来一局" : "开始游戏"}
          </Button>

          <Button
            onClick={() => setSoundEnabled(!soundEnabled)}
            variant="outline"
            className="px-4 border-blue-400/50 text-blue-400 hover:bg-blue-400/10"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>

        {/* 分享按钮 */}
        <div className="space-y-2">
          <Button
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            分享给朋友
          </Button>

          <Button
            onClick={generateQRCode}
            variant="outline"
            className="w-full border-purple-400/50 text-purple-400 hover:bg-purple-400/10 font-bold py-3 rounded-lg"
          >
            生成二维码
          </Button>
        </div>

        {/* 游戏次数统计 */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          已游玩 {gamesPlayed} 局
        </div>
      </div>

      {/* 广告区域 - 显示广告时 */}
      {showAd && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-xl font-bold mb-4">观看广告继续游戏</h3>
            <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
              <div className="text-gray-500">广告位置</div>
            </div>
            <Button
              onClick={() => setShowAd(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
            >
              关闭广告
            </Button>
          </div>
        </motion.div>
      )}

      {/* 底部提示 */}
      <div className="fixed bottom-4 left-4 right-4 text-center text-xs text-gray-500">
        <p>💡 邀请朋友游戏，赚取佣金！</p>
      </div>
    </div>
  );
}
