import { motion } from "motion/react";
import { Home, Users, Compass, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "元气", icon: Home },
    { id: "social", label: "搭子", icon: Users },
    { id: "discover", label: "发现", icon: Compass },
    { id: "profile", label: "我的", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white/95 backdrop-blur-xl rounded-[28px] shadow-2xl border border-white/50 pointer-events-auto max-w-md mx-auto"
      >
        <div className="flex items-center justify-around px-4 py-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center gap-1 px-4 py-2 relative"
                whileTap={{ scale: 0.85 }}
                animate={{
                  scale: isActive ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  scale: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
              >
                {/* 活跃状态背景 */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#4FC3F7]/20 to-[#B794F6]/20 rounded-[20px]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* 图标 */}
                <motion.div
                  animate={{
                    y: isActive ? [0, -4, 0] : 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                >
                  <tab.icon
                    className={`w-6 h-6 transition-colors relative z-10 ${
                      isActive ? "text-[#4FC3F7]" : "text-gray-400"
                    }`}
                  />
                </motion.div>

                {/* 标签文字 */}
                <span
                  className={`text-xs transition-colors relative z-10 ${
                    isActive ? "text-[#4FC3F7]" : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </span>

                {/* 活跃指示点 */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 w-1.5 h-1.5 bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
