import express from 'express';
import { Telegraf } from 'telegraf';

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN || '8411430505:AAE59UlqXmQBx2-HDa-610iGeuGoCyCZZGk';

console.log('🚀 جاري تشغيل البوت...');

const bot = new Telegraf(BOT_TOKEN);

// أمر البداية
bot.start((ctx) => {
  ctx.reply('🧸 مرحباً بك في بوت ألعاب الأطفال!\n\nالأوامر:\n/start - إعادة التشغيل\n/help - المساعدة');
});

// أمر المساعدة
bot.help((ctx) => {
  ctx.reply('📋 الأوامر المتاحة:\n/start - بدء البوت\n/products - عرض المنتجات\n/prices - الأسعار\n/contact - تواصل معنا');
});

// أمر المنتجات
bot.command('products', (ctx) => {
  ctx.reply('🧸 *المنتجات الرائجة:*\n━━━━━━━━━━━━━━━━━━\n1. LEGO Sets - ألعاب بناء\n2. Barbie Dolls - دمي\n3. Hot Wheels - سيارات\n4. NERF Blasters - ألعاب قتال\n5. Funko Pop - شخصيات');
});

// أمر الأسعار
bot.command('prices', (ctx) => {
  ctx.reply('💰 *الأسعار التقريبية:*\n━━━━━━━━━━━━━━━━━━\n• LEGO: 500-2000 ج.م\n• Barbie: 300-1500 ج.م\n• Hot Wheels: 100-800 ج.م\n• NERF: 400-1000 ج.م');
});

// أمر التواصل
bot.command('contact', (ctx) => {
  ctx.reply('📱 للتواصل:\n• واتساب: 01xxxxxxxxx\n• البريد: info@toys-eg.com');
});

// معالجة الأخطاء
bot.catch((err, ctx) => {
  console.log('خطأ:', err.message);
  ctx.reply('عذراً، حدث خطأ!');
});

// رسائل نصية
bot.on('text', (ctx) => {
  const text = ctx.message.text.toLowerCase();

  if (text.includes('مرحبا') || text.includes('اهلا')) {
    ctx.reply('أهلاً وسهلاً! 👋 كيف أقدر أساعدك؟');
  } else if (text.includes('游戏') || text.includes('العاب')) {
    ctx.reply('🎮 عندنا أفضل ألعاب الأطفال! جرب /products');
  } else {
    ctx.reply('لم أفهم! جرب:\n/products\n/prices\n/contact');
  }
});

// تشغيل السيرفر
app.get('/', (req, res) => {
  res.send('✅ البوت يعمل!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// تشغيل البوت
bot.launch()
  .then(() => {
    console.log('✅ البوت يعمل بنجاح!');
  })
  .catch((err) => {
    console.log('❌ خطأ:', err.message);
  });

// إبقاء السيرفر شغال
console.log('💓 السيرفر يعمل على port', PORT);