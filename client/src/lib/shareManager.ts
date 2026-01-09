/*
 * 分享管理系统
 * 支持微信分享、二维码、短链接等多种分享方式
 */

export interface ShareConfig {
  title: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
}

export class ShareManager {
  private config: ShareConfig;
  private shareCount: number = 0;

  constructor(config: ShareConfig) {
    this.config = config;
    this.loadFromLocalStorage();
  }

  /**
   * 微信分享
   */
  async shareToWeChat(): Promise<boolean> {
    try {
      // 检查是否在微信环境中
      if (!(window as any).wx) {
        console.warn("不在微信环境中");
        return false;
      }

      // 初始化微信JS-SDK
      await this.initWeChat();

      // 分享到朋友圈
      (window as any).wx.onMenuShareTimeline({
        title: this.config.title,
        link: this.config.gameUrl,
        imgUrl: this.config.imageUrl,
        success: () => {
          this.recordShare("wechat_timeline");
        },
      });

      // 分享给朋友
      (window as any).wx.onMenuShareAppMessage({
        title: this.config.title,
        desc: this.config.description,
        link: this.config.gameUrl,
        imgUrl: this.config.imageUrl,
        type: "link",
        dataUrl: "",
        success: () => {
          this.recordShare("wechat_friend");
        },
      });

      return true;
    } catch (error) {
      console.error("微信分享初始化失败:", error);
      return false;
    }
  }

  /**
   * 初始化微信JS-SDK
   */
  private async initWeChat(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).wx) {
        resolve();
      } else {
        reject(new Error("微信SDK未加载"));
      }
    });
  }

  /**
   * 生成二维码
   */
  generateQRCode(): string {
    // 使用免费的二维码API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      this.config.gameUrl
    )}`;
    this.recordShare("qrcode");
    return qrUrl;
  }

  /**
   * 生成短链接
   */
  async generateShortLink(): Promise<string> {
    try {
      // 使用TinyURL或其他短链接服务
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(this.config.gameUrl)}`
      );
      const shortUrl = await response.text();
      this.recordShare("shortlink");
      return shortUrl;
    } catch (error) {
      console.error("生成短链接失败:", error);
      return this.config.gameUrl;
    }
  }

  /**
   * 复制链接到剪贴板
   */
  async copyToClipboard(): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(this.config.gameUrl);
      this.recordShare("clipboard");
      return true;
    } catch (error) {
      console.error("复制失败:", error);
      return false;
    }
  }

  /**
   * 生成分享文案
   */
  generateShareText(score: number, bestScore: number): string {
    return `我在"${this.config.title}"中得分${score}分！最高分${bestScore}分。来挑战我吧！`;
  }

  /**
   * 记录分享
   */
  private recordShare(platform: string): void {
    this.shareCount++;
    this.saveToLocalStorage();

    // 可以发送到后端进行统计
    console.log(`分享到 ${platform}，总分享数: ${this.shareCount}`);
  }

  /**
   * 获取分享次数
   */
  getShareCount(): number {
    return this.shareCount;
  }

  /**
   * 保存到本地存储
   */
  private saveToLocalStorage(): void {
    localStorage.setItem("shareCount", this.shareCount.toString());
  }

  /**
   * 从本地存储加载
   */
  private loadFromLocalStorage(): void {
    const count = localStorage.getItem("shareCount");
    if (count) {
      this.shareCount = parseInt(count);
    }
  }

  /**
   * 重置数据
   */
  reset(): void {
    this.shareCount = 0;
    this.saveToLocalStorage();
  }
}

// 创建全局分享管理器实例
export const shareManager = new ShareManager({
  title: "末日幸存者 - 快速点击游戏",
  description: "30秒内点击次数越多越好，看看你能得多少分！",
  imageUrl: "/images/hero-banner.png",
  gameUrl: window.location.href,
});
