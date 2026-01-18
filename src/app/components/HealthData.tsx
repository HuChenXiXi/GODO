import { motion } from "motion/react";
import { ArrowLeft, Heart, Footprints, Droplets, Moon } from "lucide-react";

interface HealthDataProps {
  onBack: () => void;
}

export function HealthData({ onBack }: HealthDataProps) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#f0fff4] to-[#f0f9ff] flex flex-col overflow-hidden">
      <div className="bg-gradient-to-br from-[#66FFCC] to-[#4FC3F7] px-6 pt-12 pb-6 rounded-b-[32px] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl text-white flex-1">健康数据</h1>
        </div>

        <div className="bg-white/20 backdrop-blur-xl rounded-[24px] p-5">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-2">今日健康分数</p>
            <div className="text-5xl text-white mb-2">85</div>
            <p className="text-white/90 text-sm">良好状态 ✨</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            { icon: Heart, label: "心率", value: "72 bpm", color: "#FF6B35", bg: "#FFF5F0" },
            { icon: Footprints, label: "步数", value: "8,432", color: "#4FC3F7", bg: "#F0F9FF" },
            { icon: Droplets, label: "饮水", value: "1.5 L", color: "#66FFCC", bg: "#F0FFF4" },
            { icon: Moon, label: "睡眠", value: "7.5 h", color: "#B794F6", bg: "#F8F9FF" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-lg rounded-[24px] p-5 shadow-lg border border-white/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[16px] flex items-center justify-center" style={{ backgroundColor: item.bg }}>
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm mb-1">{item.label}</p>
                  <p className="text-2xl text-gray-800">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
