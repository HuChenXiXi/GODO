import { motion } from "motion/react";
import { MessageCircle, Users, UserPlus, Search } from "lucide-react";
import { useState } from "react";

type UserStatus = "sleeping" | "studying" | "active" | "eating";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  status: UserStatus;
  lastMessage: string;
  time: string;
  unread?: number;
  isGroup: boolean;
}

interface SocialPageNewProps {
  onNavigate?: (page: string, data?: any) => void;
}

const getStatusColor = (status: UserStatus) => {
  switch (status) {
    case "sleeping": return "#B794F6";
    case "studying": return "#FF6B35";
    case "active": return "#66FFCC";
    case "eating": return "#FFD93D";
    default: return "#4FC3F7";
  }
};

const getStatusText = (status: UserStatus) => {
  switch (status) {
    case "sleeping": return "睡觉中";
    case "studying": return "学习中";
    case "active": return "活跃";
    case "eating": return "用餐中";
    default: return "在线";
  }
};

export function SocialPageNew({ onNavigate }: SocialPageNewProps) {
  const [activeTab, setActiveTab] = useState<"message" | "friends">("message");

  const chats: Chat[] = [
    { id: 1, name: "宿舍四人组", avatar: "🏠", status: "studying", lastMessage: "今晚一起复习？", time: "10:23", unread: 3, isGroup: true },
    { id: 2, name: "小明", avatar: "👨‍🎓", status: "active", lastMessage: "作业做完了吗", time: "09:45", isGroup: false },
    { id: 3, name: "数学学习小组", avatar: "📐", status: "active", lastMessage: "[AI助手] 建议大家今晚讨论第五章", time: "09:30", isGroup: true },
    { id: 4, name: "小红", avatar: "👩", status: "studying", lastMessage: "笔记发你了", time: "昨天", unread: 1, isGroup: false },
    { id: 5, name: "周末运动局", avatar: "⚽", status: "sleeping", lastMessage: "明早去打球吗", time: "昨天", isGroup: true },
  ];

  const friends = [
    { id: 1, name: "小明", avatar: "👨‍🎓", status: "active" as UserStatus, major: "计算机科学" },
    { id: 2, name: "小红", avatar: "👩", status: "studying" as UserStatus, major: "数学系" },
    { id: 3, name: "小刚", avatar: "👨‍💼", status: "eating" as UserStatus, major: "物理系" },
    { id: 4, name: "小美", avatar: "👩‍🎨", status: "active" as UserStatus, major: "艺术学院" },
    { id: 5, name: "小李", avatar: "👨‍🔬", status: "sleeping" as UserStatus, major: "化学系" },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#f8f9ff] to-[#fff5f8]">
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] px-6 pt-12 pb-6 rounded-b-[32px] shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl text-white">灵犀·搭子</h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate?.("addFriend")}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <UserPlus className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* 搜索框 */}
        <div className="bg-white/20 backdrop-blur-xl rounded-[20px] px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-white/80" />
          <input
            type="text"
            placeholder="搜索好友或群聊..."
            className="flex-1 bg-transparent outline-none text-white placeholder-white/60"
          />
        </div>

        {/* 标签切换 */}
        <div className="flex gap-3 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("message")}
            className={`flex-1 py-3 rounded-[16px] transition-all ${
              activeTab === "message"
                ? "bg-white text-[#4FC3F7] shadow-lg"
                : "bg-white/20 backdrop-blur-lg text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span>消息</span>
            </div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("friends")}
            className={`flex-1 py-3 rounded-[16px] transition-all ${
              activeTab === "friends"
                ? "bg-white text-[#4FC3F7] shadow-lg"
                : "bg-white/20 backdrop-blur-lg text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              <span>好友</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {activeTab === "message" ? (
          <div className="space-y-3 max-w-2xl mx-auto">
            {chats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate?.(chat.isGroup ? "groupChat" : "privateChat", { 
                  name: chat.name, 
                  avatar: chat.avatar,
                  isGroup: chat.isGroup,
                  chatId: chat.id
                })}
                className="bg-white/80 backdrop-blur-lg rounded-[28px] p-4 shadow-lg border border-white/50 cursor-pointer relative overflow-hidden"
              >
                {/* 状态环 */}
                <motion.div
                  className="absolute inset-0 rounded-[28px]"
                  animate={{
                    boxShadow: [
                      `inset 0 0 0 2px ${getStatusColor(chat.status)}40`,
                      `inset 0 0 0 2px ${getStatusColor(chat.status)}80`,
                      `inset 0 0 0 2px ${getStatusColor(chat.status)}40`,
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="flex items-center gap-4 relative z-10">
                  {/* 头像 */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#66FFCC] flex items-center justify-center text-2xl">
                      {chat.avatar}
                    </div>
                    {/* 状态点 */}
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
                      style={{ backgroundColor: getStatusColor(chat.status) }}
                    />
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-gray-800 flex items-center gap-2">
                        {chat.name}
                        {chat.isGroup && (
                          <span className="px-2 py-0.5 bg-[#4FC3F7]/20 rounded-full text-xs text-[#4FC3F7]">
                            群聊
                          </span>
                        )}
                      </h3>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>

                  {/* 未读标记 */}
                  {chat.unread && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-xs flex-shrink-0"
                    >
                      {chat.unread}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 max-w-2xl mx-auto">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate?.("privateChat", { 
                  name: friend.name, 
                  avatar: friend.avatar,
                  isGroup: false
                })}
                className="bg-white/80 backdrop-blur-lg rounded-[24px] p-4 shadow-lg border border-white/50 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* 头像 */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#66FFCC] flex items-center justify-center text-2xl">
                      {friend.avatar}
                    </div>
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
                      style={{ backgroundColor: getStatusColor(friend.status) }}
                    />
                  </div>

                  {/* 信息 */}
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-1">{friend.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{friend.major}</span>
                      <span>·</span>
                      <span style={{ color: getStatusColor(friend.status) }}>
                        {getStatusText(friend.status)}
                      </span>
                    </div>
                  </div>

                  {/* 发消息按钮 */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4FC3F7] to-[#66FFCC] flex items-center justify-center shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
