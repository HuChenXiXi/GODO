import { motion } from "motion/react";
import { MessageCircle, Users, Sparkles, MapPin, Clock, ThumbsUp } from "lucide-react";
import { useState } from "react";

type UserStatus = "sleeping" | "studying" | "active" | "eating";

interface GroupChat {
  id: number;
  name: string;
  avatar: string;
  status: UserStatus;
  lastMessage: string;
  time: string;
  unread?: number;
}

interface SocialPageProps {
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

export function SocialPage({ onNavigate }: SocialPageProps) {
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);

  const groupChats: GroupChat[] = [
    { id: 1, name: "宿舍四人组", avatar: "🏠", status: "studying", lastMessage: "今晚一起复习？", time: "10:23", unread: 3 },
    { id: 2, name: "数学学习小组", avatar: "📐", status: "active", lastMessage: "作业讨论群", time: "09:45" },
    { id: 3, name: "周末运动局", avatar: "⚽", status: "sleeping", lastMessage: "明早去打球吗", time: "昨天", unread: 1 },
    { id: 4, name: "美食探店队", avatar: "🍜", status: "eating", lastMessage: "发现了一家新餐厅！", time: "昨天" },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#f8f9ff] to-[#fff5f8]">
      {/* 顶部标题区 */}
      <motion.div 
        className="px-6 pt-8 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl mb-2 bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] bg-clip-text text-transparent">
          灵犀·搭子群
        </h1>
        <p className="text-gray-600">和你的搭子们保持连接</p>
      </motion.div>

      {/* 群聊列表 */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-3 max-w-2xl mx-auto">
          {groupChats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate?.("chatDetail", { groupName: chat.name, groupAvatar: chat.avatar })}
              className="bg-white/80 backdrop-blur-lg rounded-[28px] p-4 shadow-lg border border-white/50 cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                {/* 头像带状态环 */}
                <div className="relative">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl relative"
                    style={{
                      background: `conic-gradient(${getStatusColor(chat.status)} 0deg 270deg, transparent 270deg)`
                    }}
                  >
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                      {chat.avatar}
                    </div>
                  </motion.div>
                  {/* 状态指示点 */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: getStatusColor(chat.status) }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* 群信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-800 truncate">{chat.name}</h3>
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: `${getStatusColor(chat.status)}20`,
                        color: getStatusColor(chat.status)
                      }}
                    >
                      {getStatusText(chat.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>

                {/* 时间和未读 */}
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-gray-500">{chat.time}</span>
                  {chat.unread && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-[#FF6B35] text-white text-xs flex items-center justify-center"
                    >
                      {chat.unread}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* 新建群聊卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-[#4FC3F7]/20 to-[#B794F6]/20 backdrop-blur-lg rounded-[28px] p-6 border-2 border-dashed border-[#4FC3F7]/50 cursor-pointer"
          >
            <div className="flex items-center justify-center gap-3 text-[#4FC3F7]">
              <Users className="w-6 h-6" />
              <span>创建新的搭子群</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI 助手球 - 固定在右下角 */}
      <motion.div
        className="fixed right-6 bottom-28 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.button
          onClick={() => setShowAiSuggestion(!showAiSuggestion)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#FF6B35] shadow-2xl flex items-center justify-center cursor-pointer border-4 border-white"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255, 215, 61, 0.7)",
              "0 0 0 20px rgba(255, 215, 61, 0)",
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.button>
      </motion.div>

      {/* AI 建议遮罩层 */}
      {showAiSuggestion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-6"
          onClick={() => setShowAiSuggestion(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#FF6B35] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-gray-800">AI 智能建议</h3>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              大家想去聚餐？已根据你们的喜好和距离推荐了 3 家餐厅，点击即可发起投票。
            </p>

            <div className="space-y-3">
              {[
                { name: "川香阁", distance: "500m", rating: "4.8", price: "¥45/人" },
                { name: "日式料理", distance: "800m", rating: "4.9", price: "¥68/人" },
                { name: "校园食堂", distance: "200m", rating: "4.5", price: "¥25/人" },
              ].map((restaurant, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-[#4FC3F7]/10 to-[#66FFCC]/10 rounded-[20px] p-4 cursor-pointer border border-[#4FC3F7]/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-800">{restaurant.name}</span>
                    <span className="text-sm text-[#FF6B35]">{restaurant.price}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {restaurant.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {restaurant.rating}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 bg-gradient-to-r from-[#FF6B35] to-[#FFD93D] text-white py-3 rounded-[20px] shadow-lg"
            >
              发起投票
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}