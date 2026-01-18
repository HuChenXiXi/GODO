import { motion } from "motion/react";
import { ArrowLeft, Bell, MessageCircle, Award, Calendar } from "lucide-react";

interface NotificationsProps {
  onBack: () => void;
}

export function Notifications({ onBack }: NotificationsProps) {
  const notifications = [
    { id: 1, type: "message", title: "小明给你发了消息", content: "今晚一起复习吗？", time: "5分钟前", icon: MessageCircle, color: "#4FC3F7", unread: true },
    { id: 2, type: "system", title: "课程提醒", content: "30分钟后有高等数学课", time: "30分钟前", icon: Calendar, color: "#FF6B35", unread: true },
    { id: 3, type: "achievement", title: "获得新成就", content: "连续学习7天", time: "1小时前", icon: Award, color: "#FFD93D", unread: false },
    { id: 4, type: "message", title: "宿舍四人组", content: "周末一起出去玩吧", time: "2小时前", icon: MessageCircle, color: "#4FC3F7", unread: false },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#f8f9ff] to-[#fff5f8] flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] px-6 pt-12 pb-6 rounded-b-[32px] shadow-xl">
        <div className="flex items-center gap-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl text-white flex-1">消息通知</h1>
          <Bell className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-3">
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-white/80 backdrop-blur-lg rounded-[24px] p-4 shadow-lg border cursor-pointer ${
                notif.unread ? "border-[#4FC3F7]/50" : "border-white/50"
              }`}
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${notif.color}20` }}>
                  <notif.icon className="w-6 h-6" style={{ color: notif.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-gray-800">{notif.title}</h3>
                    {notif.unread && <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notif.content}</p>
                  <p className="text-xs text-gray-500">{notif.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
