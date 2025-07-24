// 生成随机验证码
export const generateCaptcha = () => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let captcha = '';
  for (let i = 0; i < 4; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

// 在 canvas 上绘制验证码
export const drawCaptcha = (canvas: HTMLCanvasElement, code: string) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 设置背景
  ctx.fillStyle = '#f0f2f5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制文字
  ctx.fillStyle = '#1890ff';
  ctx.font = 'bold 24px Arial';
  ctx.textBaseline = 'middle';

  // 随机旋转和位置
  for (let i = 0; i < code.length; i++) {
    const x = 20 + i * 20;
    const y = canvas.height / 2;
    const rotation = (Math.random() - 0.5) * 0.3;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillText(code[i], 0, 0);
    ctx.restore();
  }

  // 添加干扰线
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(24, 144, 255, ${Math.random() * 0.5})`;
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  // 添加干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(24, 144, 255, ${Math.random() * 0.5})`;
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
    ctx.fill();
  }
}; 