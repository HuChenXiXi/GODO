import { motion } from "motion/react";
import { BookOpen, Dumbbell, Coffee, Calendar, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface HomePageProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#4FC3F7] via-[#B794F6] to-[#FFD93D] overflow-hidden">
      {/* 顶部动态渐变区域 */}
      <motion.div 
        className="relative pt-8 pb-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 3D 质感时钟 */}
        <motion.div 
          className="text-center mb-6"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="inline-block bg-white/20 backdrop-blur-xl rounded-[28px] px-8 py-4 shadow-2xl border border-white/30">
            <div className="text-5xl tracking-wider text-white drop-shadow-lg">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-white/90 mt-2">
              {formatDate(currentTime)}
            </div>
          </div>
        </motion.div>

        {/* AI 气泡提示 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="relative max-w-md mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-[28px] p-4 shadow-xl border border-white/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#FF6B35] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 leading-relaxed">
                  思涵，今天没早八，建议补觉到 9:00。早餐已为你规划了高蛋白方案。
                </p>
              </div>
            </div>
          </div>
          {/* 气泡尾巴 */}
          <div className="absolute -bottom-2 left-12 w-4 h-4 bg-white/95 rotate-45 rounded-sm"></div>
        </motion.div>
      </motion.div>

      {/* 卡片流区域 */}
      <div className="flex-1 bg-gradient-to-b from-white/10 to-white rounded-t-[32px] overflow-y-auto px-6 pt-6 pb-24">
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* 今日课程卡片 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate?.("courseDetail")}
            className="bg-white/80 backdrop-blur-lg rounded-[28px] p-5 shadow-lg border border-white/50 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] flex items-center justify-center flex-shrink-0 shadow-md">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 mb-1">高等数学</h3>
                <p className="text-sm text-gray-600">10:00 - 11:40 · 教学楼 A301</p>
              </div>
              <div className="px-4 py-1.5 bg-[#FF6B35]/20 rounded-full">
                <span className="text-sm text-[#FF6B35]">即将开始</span>
              </div>
            </div>
          </motion.div>

          {/* 运动打卡卡片 - 带动画 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate?.("exerciseDetail")}
            className="bg-[#66FFCC]/30 backdrop-blur-lg rounded-[28px] p-5 shadow-lg border border-white/50 cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-[#66FFCC] to-[#4FC3F7] flex items-center justify-center flex-shrink-0 shadow-md relative">
                <Dumbbell className="w-7 h-7 text-white" />
                {/* 跳动的小人动画 */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFD93D] rounded-full"
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 mb-1">今日运动目标</h3>
                <p className="text-sm text-gray-600">已完成 30min / 目标 60min</p>
              </div>
              <div className="w-16 h-16">
                <svg className="transform -rotate-90" width="64" height="64">
                  <circle cx="32" cy="32" r="28" stroke="#e0e0e0" strokeWidth="6" fill="none" />
                  <motion.circle 
                    cx="32" 
                    cy="32" 
                    r="28" 
                    stroke="#66FFCC" 
                    strokeWidth="6" 
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.5 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    strokeDasharray="175.93"
                  />
                </svg>
                <div className="text-center -mt-14">
                  <span className="text-sm text-gray-700">50%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 午餐推荐卡片 - 带动画 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate?.("lunchDetail")}
            className="bg-gradient-to-br from-[#FFD93D]/30 to-[#FF6B35]/30 backdrop-blur-lg rounded-[28px] p-5 shadow-lg border border-white/50 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-[#FFD93D] to-[#FF6B35] flex items-center justify-center flex-shrink-0 shadow-md">
                <Coffee className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 mb-1">午餐推荐</h3>
                <p className="text-sm text-gray-600">鸡胸肉沙拉 · 食堂二楼 · 12:00</p>
              </div>
            </div>
          </motion.div>

          {/* 本周日程卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate?.("weekSchedule")}
            className="bg-white/70 backdrop-blur-lg rounded-[28px] p-5 shadow-lg border border-white/50 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-[#B794F6] to-[#4FC3F7] flex items-center justify-center flex-shrink-0 shadow-md">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 mb-1">本周日程</h3>
                <p className="text-sm text-gray-600">6 个待办事项 · 3 个重要提醒</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}