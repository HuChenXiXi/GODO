import { motion } from "motion/react";
import { ArrowLeft, Flame, Trophy, TrendingUp, Calendar, Clock, Target, Award } from "lucide-react";

interface ExerciseDetailProps {
  onBack: () => void;
}

export function ExerciseDetail({ onBack }: ExerciseDetailProps) {
  const weekData = [
    { day: "一", minutes: 45, completed: true },
    { day: "二", minutes: 30, completed: true },
    { day: "三", minutes: 60, completed: true },
    { day: "四", minutes: 0, completed: false },
    { day: "五", minutes: 50, completed: true },
    { day: "六", minutes: 30, completed: true },
    { day: "日", minutes: 0, completed: false },
  ];

  const achievements = [
    { icon: "🏃", title: "跑步达人", desc: "累计跑步 50km", unlocked: true },
    { icon: "💪", title: "力量之王", desc: "完成 100 次力量训练", unlocked: true },
    { icon: "🔥", title: "七日挑战", desc: "连续运动 7 天", unlocked: false },
    { icon: "⭐", title: "运动之星", desc: "本月运动 20 天", unlocked: false },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#f0fff4] to-[#f0f9ff] flex flex-col overflow-hidden">
      {/* 顶部卡片 */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-br from-[#66FFCC] to-[#4FC3F7] px-6 pt-12 pb-8 rounded-b-[32px] shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl text-white flex-1">运动数据</h1>
        </div>

        {/* 今日目标进度 */}
        <div className="bg-white/20 backdrop-blur-xl rounded-[24px] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">今日运动</p>
              <p className="text-3xl text-white">30 <span className="text-lg">分钟</span></p>
            </div>
            <div className="relative w-24 h-24">
              <svg className="transform -rotate-90" width="96" height="96">
                <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#fff"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.5 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeDasharray="251.2"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl text-white">50%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-white/80" />
            <span className="text-white/80 text-sm">目标：60 分钟</span>
          </div>
        </div>
      </motion.div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* 本周统计 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-[#66FFCC]" />
              <h3 className="text-gray-800">本周运动</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-[24px] p-5 shadow-lg border border-white/50">
              <div className="flex items-end justify-between gap-2 h-32 mb-4">
                {weekData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center justify-end gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.minutes / 60) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`w-full rounded-t-lg ${
                        day.completed
                          ? "bg-gradient-to-t from-[#66FFCC] to-[#4FC3F7]"
                          : "bg-gray-200"
                      }`}
                      style={{ minHeight: day.minutes > 0 ? "20%" : "4px" }}
                    />
                    <span className={`text-xs ${day.completed ? "text-gray-800" : "text-gray-400"}`}>
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-xl text-[#66FFCC] mb-1">215</div>
                  <div className="text-xs text-gray-600">总分钟</div>
                </div>
                <div className="text-center">
                  <div className="text-xl text-[#4FC3F7] mb-1">5</div>
                  <div className="text-xs text-gray-600">运动天数</div>
                </div>
                <div className="text-center">
                  <div className="text-xl text-[#FFD93D] mb-1">486</div>
                  <div className="text-xs text-gray-600">消耗卡路里</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 运动记录 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-[#4FC3F7]" />
              <h3 className="text-gray-800">最近运动</h3>
            </div>
            <div className="space-y-3">
              {[
                { activity: "跑步", duration: "30 分钟", calories: "180", time: "今天 18:00", icon: "🏃" },
                { activity: "瑜伽", duration: "45 分钟", calories: "120", time: "昨天 19:00", icon: "🧘" },
                { activity: "游泳", duration: "60 分钟", calories: "350", time: "1月16日", icon: "🏊" },
              ].map((record, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-white/80 backdrop-blur-lg rounded-[20px] p-4 shadow-md border border-white/50 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#66FFCC]/20 to-[#4FC3F7]/20 flex items-center justify-center text-2xl">
                      {record.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-800 mb-1">{record.activity}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{record.duration}</span>
                        <span>·</span>
                        <span>{record.calories} 卡路里</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{record.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 成就徽章 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-[#FFD93D]" />
              <h3 className="text-gray-800">运动成就</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
                  whileTap={{ scale: achievement.unlocked ? 0.95 : 1 }}
                  className={`rounded-[20px] p-4 shadow-md border ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-[#FFD93D]/20 to-[#FF6B35]/20 border-[#FFD93D]/30 cursor-pointer"
                      : "bg-gray-100 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className={`text-sm mb-1 ${achievement.unlocked ? "text-gray-800" : "text-gray-500"}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-xs ${achievement.unlocked ? "text-gray-600" : "text-gray-400"}`}>
                    {achievement.desc}
                  </p>
                  {achievement.unlocked && (
                    <div className="mt-2 flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-[#FFD93D]" />
                      <span className="text-xs text-[#FFD93D]">已解锁</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 底部按钮 */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-4 bg-white/80 backdrop-blur-lg rounded-[20px] shadow-lg border border-white/50 text-gray-800"
            >
              查看全部
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-4 bg-gradient-to-r from-[#66FFCC] to-[#4FC3F7] rounded-[20px] shadow-lg text-white"
            >
              开始运动
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
