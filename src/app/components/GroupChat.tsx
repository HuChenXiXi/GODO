import { motion } from "motion/react";
import { ArrowLeft, MoreVertical, Send, Smile, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isMe: boolean;
  isAI?: boolean;
}

interface GroupChatProps {
  name: string;
  avatar: string;
  onBack: () => void;
}

export function GroupChat({ name, avatar, onBack }: GroupChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "小明", avatar: "👨‍🎓", content: "今晚一起复习高数吗？", time: "10:23", isMe: false },
    { id: 2, sender: "我", avatar: "👩‍🎓", content: "好啊！几点开始？", time: "10:24", isMe: true },
    { id: 3, sender: "小红", avatar: "👩", content: "我也去！", time: "10:24", isMe: false },
    { 
      id: 4, 
      sender: "AI助手", 
      avatar: "🤖", 
      content: "检测到大家在讨论复习计划，建议：\n\n📚 复习重点：第5章定积分\n⏰ 最佳时间：19:00-21:00\n📍 推荐地点：图书馆三楼自习室\n\n需要我帮大家创建学习计划吗？", 
      time: "10:25", 
      isMe: false,
      isAI: true
    },
    { id: 5, sender: "小明", avatar: "👨‍🎓", content: "太智能了！晚上7点图书馆见", time: "10:26", isMe: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeMessage = (content: string): string | null => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes("吃") || lowerContent.includes("饭") || lowerContent.includes("餐")) {
      return "注意到大家在讨论用餐，为大家推荐：\n\n🍜 第一食堂 - 营养套餐 (¥15)\n🥗 第二食堂 - 健康沙拉 (¥12)\n🍛 学生餐厅 - 经济盖饭 (¥10)\n\n需要我发起投票吗？";
    }
    
    if (lowerContent.includes("运动") || lowerContent.includes("打球") || lowerContent.includes("跑步")) {
      return "看到大家计划运动，建议：\n\n⏰ 最佳运动时间：下午4-6点\n🏃 推荐活动：慢跑、篮球、羽毛球\n💡 记得带水和毛巾哦！\n\n需要帮忙预定场地吗？";
    }
    
    if (lowerContent.includes("作业") || lowerContent.includes("考试") || lowerContent.includes("复习")) {
      return "检测到学习相关话题，为大家整理：\n\n📝 近期作业截止时间\n📚 考试复习重点\n🎯 学习小组推荐资料\n\n需要创建学习任务清单吗？";
    }
    
    return null;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "我",
      avatar: "👩‍🎓",
      content: inputValue,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, newMessage]);
    
    // AI分析消息
    const aiResponse = analyzeMessage(inputValue);
    
    setInputValue("");

    // 如果有AI建议，延迟显示
    if (aiResponse) {
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: messages.length + 2,
          sender: "AI助手",
          avatar: "🤖",
          content: aiResponse,
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
          isAI: true
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] px-6 pt-12 pb-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </motion.button>
            
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl">
                {avatar}
              </div>
              <div>
                <h2 className="text-lg text-white">{name}</h2>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI智能助手已开启
                </p>
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <MoreVertical className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* 聊天消息区域 */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* 时间分隔符 */}
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-gray-200/80 backdrop-blur-lg rounded-full text-xs text-gray-600">
              今天 10:23
            </span>
          </div>

          {/* AI助手提示 */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#FFD93D]/20 to-[#FF6B35]/20 rounded-[20px] p-4 border border-[#FFD93D]/30"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm text-gray-800 mb-1">AI产品经理已就位</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  我会分析群聊对话，提供智能建议和任务协助。随时@我获取帮助！
                </p>
              </div>
            </div>
          </motion.div>

          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex gap-3 ${message.isMe ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* 头像 */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-2xl ${
                message.isAI 
                  ? "bg-gradient-to-br from-[#FFD93D] to-[#FF6B35]" 
                  : "bg-gradient-to-br from-[#4FC3F7] to-[#66FFCC]"
              }`}>
                {message.avatar}
              </div>

              <div className={`flex flex-col ${message.isMe ? "items-end" : "items-start"} max-w-[75%]`}>
                {/* 发送者名字 */}
                {!message.isMe && (
                  <span className={`text-xs mb-1 px-2 flex items-center gap-1 ${
                    message.isAI ? "text-[#FF6B35]" : "text-gray-500"
                  }`}>
                    {message.isAI && <Sparkles className="w-3 h-3" />}
                    {message.sender}
                  </span>
                )}

                {/* 消息气泡 */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-[20px] px-5 py-3 shadow-md ${
                    message.isMe
                      ? "bg-gradient-to-r from-[#4FC3F7] to-[#66FFCC] text-white rounded-tr-sm"
                      : message.isAI
                      ? "bg-gradient-to-r from-[#FFD93D]/20 to-[#FF6B35]/20 text-gray-800 border border-[#FFD93D]/30 rounded-tl-sm"
                      : "bg-white text-gray-800 rounded-tl-sm"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{message.content}</p>
                </motion.div>

                {/* 时间 */}
                <span className="text-xs text-gray-400 mt-1 px-2">{message.time}</span>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入栏 */}
      <div className="bg-white border-t border-gray-100 px-6 py-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-100 rounded-[24px] px-4 py-3 flex items-center gap-3">
            {/* 表情按钮 */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
            >
              <Smile className="w-5 h-5 text-gray-600" />
            </motion.button>

            {/* 输入框 */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="输入消息..."
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
            />

            {/* 发送按钮 */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all ${
                inputValue.trim()
                  ? "bg-gradient-to-r from-[#4FC3F7] to-[#66FFCC] scale-100"
                  : "bg-gray-300 scale-90"
              }`}
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
