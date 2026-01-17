import { motion } from "motion/react";
import { Settings, Bell, Trophy, Heart, Calendar, TrendingUp, ChevronRight } from "lucide-react";

export function ProfilePage() {
  const stats = [
    { label: "学习天数", value: "127", icon: Calendar, color: "#FF6B35" },
    { label: "完成任务", value: "89", icon: Trophy, color: "#4FC3F7" },
    { label: "健康分数", value: "92", icon: Heart, color: "#66FFCC" },
    { label: "成长指数", value: "A+", icon: TrendingUp, color: "#FFD93D" },
  ];

  const menuItems = [
    { label: "我的课程表", icon: Calendar, color: "#FF6B35" },
    { label: "学习记录", icon: Trophy, color: "#4FC3F7" },
    { label: "健康数据", icon: Heart, color: "#66FFCC" },
    { label: "消息通知", icon: Bell, color: "#FFD93D" },
    { label: "设置", icon: Settings, color: "#B794F6" },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#fefcff] to-[#f8fbff]">
      {/* 顶部个人信息卡片 */}
      <motion.div
        className="px-6 pt-8 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-gradient-to-br from-[#4FC3F7] to-[#B794F6] rounded-[32px] p-6 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-lg"
            >
              👩‍🎓
            </motion.div>
            <div className="flex-1">
              <h2 className="text-2xl text-white mb-1">思涵</h2>
              <p className="text-white/80 text-sm">计算机科学与技术 · 大二</p>
            </div>
          </div>

          {/* 数据统计 */}
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-lg rounded-[20px] p-3 text-center"
              >
                <stat.icon className="w-5 h-5 text-white mx-auto mb-2" />
                <div className="text-xl text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 菜单列表 */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-3 max-w-2xl mx-auto">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/80 backdrop-blur-lg rounded-[24px] p-4 shadow-lg border border-white/50 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-[16px] flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`
                  }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <span className="flex-1 text-gray-800">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
