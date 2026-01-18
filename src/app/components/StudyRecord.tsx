import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Clock, Award, TrendingUp, Calendar } from "lucide-react";

interface StudyRecordProps {
  onBack: () => void;
}

export function StudyRecord({ onBack }: StudyRecordProps) {
  const weekData = [
    { day: "周一", hours: 5.5 },
    { day: "周二", hours: 4.2 },
    { day: "周三", hours: 6.8 },
    { day: "周四", hours: 3.5 },
    { day: "周五", hours: 5.0 },
    { day: "周六", hours: 7.2 },
    { day: "周日", hours: 4.8 },
  ];

  const subjects = [
    { name: "高等数学", hours: 12.5, progress: 75, color: "#FF6B35", icon: "📐" },
    { name: "数据结构", hours: 10.2, progress: 68, color: "#4FC3F7", icon: "💻" },
    { name: "英语", hours: 8.3, progress: 82, color: "#66FFCC", icon: "📚" },
    { name: "物理", hours: 6.7, progress: 55, color: "#B794F6", icon: "⚗️" },
  ];

  const maxHours = Math.max(...weekData.map(d => d.hours));

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#f8f9ff] to-[#fff5f8] flex flex-col overflow-hidden">
      <div className="bg-gradient-to-br from-[#4FC3F7] to-[#B794F6] px-6 pt-12 pb-6 rounded-b-[32px] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl text-white flex-1">学习记录</h1>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "本周学习", value: "37h", icon: Clock, color: "#FFD93D" },
            { label: "完成任务", value: "24", icon: Award, color: "#66FFCC" },
            { label: "连续天数", value: "15", icon: TrendingUp, color: "#FF6B35" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/20 backdrop-blur-xl rounded-[16px] p-3 text-center"
            >
              <stat.icon className="w-5 h-5 text-white mx-auto mb-2" />
              <div className="text-xl text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* 本周学习时长 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              本周学习时长
            </h2>
            <div className="bg-white/80 backdrop-blur-lg rounded-[24px] p-5 shadow-lg border border-white/50">
              <div className="flex items-end justify-between gap-2 h-40 mb-4">
                {weekData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center justify-end gap-2">
                    <div className="text-xs text-gray-800">{day.hours}h</div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.hours / maxHours) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#4FC3F7] to-[#B794F6]"
                      style={{ minHeight: "20%" }}
                    />
                    <span className="text-xs text-gray-600">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 学科进度 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              学科进度
            </h2>
            <div className="space-y-3">
              {subjects.map((subject, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur-lg rounded-[20px] p-4 shadow-lg border border-white/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${subject.color}20` }}
                    >
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-800 mb-1">{subject.name}</h3>
                      <p className="text-sm text-gray-600">{subject.hours} 小时</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl" style={{ color: subject.color }}>
                        {subject.progress}%
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
