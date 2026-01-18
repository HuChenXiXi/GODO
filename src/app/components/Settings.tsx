import { motion } from "motion/react";
import { ArrowLeft, User, Bell, Lock, Palette, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react";

interface SettingsProps {
  onBack: () => void;
  onLogout?: () => void;
}

export function Settings({ onBack, onLogout }: SettingsProps) {
  const settingsSections = [
    {
      title: "账号设置",
      items: [
        { icon: User, label: "个人信息", color: "#4FC3F7" },
        { icon: Lock, label: "隐私与安全", color: "#FF6B35" },
      ]
    },
    {
      title: "通用设置",
      items: [
        { icon: Bell, label: "消息通知", color: "#FFD93D" },
        { icon: Palette, label: "主题设置", color: "#B794F6" },
        { icon: Globe, label: "语言", color: "#66FFCC" },
      ]
    },
    {
      title: "其他",
      items: [
        { icon: HelpCircle, label: "帮助与反馈", color: "#4FC3F7" },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#f8f9ff] to-[#fff5f8] flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] px-6 pt-12 pb-6 rounded-b-[32px] shadow-xl">
        <div className="flex items-center gap-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl text-white flex-1">设置</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">
          {settingsSections.map((section, sIndex) => (
            <div key={sIndex}>
              <h2 className="text-gray-600 text-sm mb-3 px-2">{section.title}</h2>
              <div className="bg-white/80 backdrop-blur-lg rounded-[24px] shadow-lg border border-white/50 overflow-hidden">
                {section.items.map((item, iIndex) => (
                  <motion.button
                    key={iIndex}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full flex items-center gap-4 p-4 ${
                      iIndex !== section.items.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="flex-1 text-left text-gray-800">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="w-full bg-white/80 backdrop-blur-lg rounded-[24px] p-4 shadow-lg border border-white/50 flex items-center justify-center gap-3 text-[#FF6B35]"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
