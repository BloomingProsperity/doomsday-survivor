/*
 * 广告管理系统
 * 支持多种广告平台：Google AdSense、腾讯广告、头条广告等
 */

export interface AdConfig {
  platform: "google" | "tencent" | "bytedance" | "mock";
  enabled: boolean;
  showInterval: number; // 每N次游戏显示一次广告
}

export class AdManager {
  private config: AdConfig;
  private gameCount: number = 0;
  private earnings: number = 0;

  constructor(config: AdConfig) {
    this.config = config;
    this.loadFromLocalStorage();
  }

  /**
   * 检查是否应该显示广告
   */
  shouldShowAd(): boolean {
    if (!this.config.enabled) return false;
    this.gameCount++;
    return this.gameCount % this.config.showInterval === 0;
  }

  /**
   * 显示广告
   */
  async showAd(): Promise<boolean> {
    if (!this.config.enabled) return false;

    try {
      switch (this.config.platform) {
        case "google":
          return await this.showGoogleAd();
        case "tencent":
          return await this.showTencentAd();
        case "bytedance":
          return await this.showBytedanceAd();
        case "mock":
          return await this.showMockAd();
        default:
          return false;
      }
    } catch (error) {
      console.error("广告显示失败:", error);
      return false;
    }
  }

  /**
   * Google AdSense 广告
   */
  private async showGoogleAd(): Promise<boolean> {
    // 检查是否加载了Google AdSense脚本
    if (!(window as any).adsbygoogle) {
      console.warn("Google AdSense 未加载");
      return false;
    }

    try {
      (window as any).adsbygoogle.push({});
      this.addEarnings(0.5); // 预估每次广告收益0.5元
      return true;
    } catch (error) {
      console.error("Google AdSense 错误:", error);
      return false;
    }
  }

  /**
   * 腾讯广告（适合微信）
   */
  private async showTencentAd(): Promise<boolean> {
    // 腾讯广告需要特殊配置
    if (!(window as any).tencentAd) {
      console.warn("腾讯广告 未加载");
      return false;
    }

    try {
      (window as any).tencentAd.show();
      this.addEarnings(0.3); // 预估每次广告收益0.3元
      return true;
    } catch (error) {
      console.error("腾讯广告 错误:", error);
      return false;
    }
  }

  /**
   * 头条广告（适合抖音）
   */
  private async showBytedanceAd(): Promise<boolean> {
    if (!(window as any).bytedanceAd) {
      console.warn("头条广告 未加载");
      return false;
    }

    try {
      (window as any).bytedanceAd.show();
      this.addEarnings(0.2); // 预估每次广告收益0.2元
      return true;
    } catch (error) {
      console.error("头条广告 错误:", error);
      return false;
    }
  }

  /**
   * 模拟广告（用于测试）
   */
  private async showMockAd(): Promise<boolean> {
    return new Promise((resolve) => {
      // 模拟广告显示3秒
      setTimeout(() => {
        this.addEarnings(0.1); // 模拟广告收益0.1元
        resolve(true);
      }, 3000);
    });
  }

  /**
   * 添加收益
   */
  private addEarnings(amount: number): void {
    this.earnings += amount;
    this.saveToLocalStorage();
  }

  /**
   * 获取总收益
   */
  getEarnings(): number {
    return parseFloat(this.earnings.toFixed(2));
  }

  /**
   * 获取游戏次数
   */
  getGameCount(): number {
    return this.gameCount;
  }

  /**
   * 保存到本地存储
   */
  private saveToLocalStorage(): void {
    localStorage.setItem(
      "adManager",
      JSON.stringify({
        gameCount: this.gameCount,
        earnings: this.earnings,
      })
    );
  }

  /**
   * 从本地存储加载
   */
  private loadFromLocalStorage(): void {
    const data = localStorage.getItem("adManager");
    if (data) {
      const parsed = JSON.parse(data);
      this.gameCount = parsed.gameCount || 0;
      this.earnings = parsed.earnings || 0;
    }
  }

  /**
   * 重置数据
   */
  reset(): void {
    this.gameCount = 0;
    this.earnings = 0;
    this.saveToLocalStorage();
  }
}

// 创建全局广告管理器实例
export const adManager = new AdManager({
  platform: "mock", // 默认使用模拟广告
  enabled: true,
  showInterval: 3, // 每3次游戏显示一次广告
});
