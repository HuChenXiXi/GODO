import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, Mic, Image as ImageIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  time: string;
  suggestions?: string[];
}

interface AIAssistantProps {
  onClose?: () => void;
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: "你好思涵！我是你的AI助手小光 ✨ 有什么可以帮到你的吗？",
      time: "10:24",
      suggestions: ["查看今日安排", "推荐学习计划", "健康建议"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newUserMessage]);
    setInputValue("");

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        content: getAIResponse(inputValue),
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["继续了解", "查看详情", "其他问题"]
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("课程") || lowerInput.includes("上课")) {
      return "你今天有两节课：\n\n📚 10:00-11:40 高等数学 (A301)\n💻 14:00-15:40 数据结构 (B205)\n\n需要我设置上课提醒吗？";
    } else if (lowerInput.includes("运动") || lowerInput.includes("健身")) {
      return "根据你的健康数据，建议：\n\n🏃 今天已完成 30 分钟运动\n🎯 目标还需 30 分钟\n💡 推荐：晚上 7 点去操场慢跑";
    } else if (lowerInput.includes("饮食") || lowerInput.includes("吃")) {
      return "为你推荐今日营养餐：\n\n🥗 午餐：鸡胸肉沙拉\n🍜 晚餐：三文鱼套餐\n💧 记得多喝水哦！";
    }
    return "我理解了！我会根据你的需求为你提供个性化建议。还有什么想了解的吗？";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <>
      {/* 浮动球形入口 */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed right-6 bottom-28 z-50"
          >
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#FF6B35] shadow-2xl flex items-center justify-center cursor-pointer border-4 border-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 215, 61, 0.7)",
                  "0 0 0 20px rgba(255, 215, 61, 0)",
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                }
              }}
            >
              <Sparkles className="w-8 h-8 text-white" />
              {/* 未读消息提示 */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
              >
                1
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 展开的聊天界面 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-[#4FC3F7]/5 to-[#B794F6]/5"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="h-full bg-white flex flex-col"
            >
              {/* 头部 */}
              <div className="bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] px-6 pt-12 pb-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl text-white">AI 助手小光</h2>
                      <p className="text-sm text-white/80">在线 · 随时为你服务</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsExpanded(false)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* 消息区域 */}
              <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-b from-white to-gray-50">
                <div className="space-y-4 max-w-2xl mx-auto">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                        {/* 消息气泡 */}
                        <div
                          className={`rounded-[24px] px-5 py-3 ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-[#4FC3F7] to-[#66FFCC] text-white ml-auto"
                              : "bg-white shadow-md text-gray-800"
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-line">{message.content}</p>
                        </div>
                        
                        {/* 时间 */}
                        <div className={`text-xs text-gray-400 mt-1 px-2 ${message.type === "user" ? "text-right" : "text-left"}`}>
                          {message.time}
                        </div>

                        {/* AI 建议按钮 */}
                        {message.type === "ai" && message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.suggestions.map((suggestion, idx) => (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-4 py-2 bg-gradient-to-r from-[#4FC3F7]/10 to-[#66FFCC]/10 rounded-[16px] text-sm text-gray-700 border border-[#4FC3F7]/20"
                              >
                                {suggestion}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 头像 */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user" 
                          ? "bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] order-3 ml-2" 
                          : "bg-gradient-to-br from-[#4FC3F7] to-[#B794F6] order-0 mr-2"
                      }`}>
                        {message.type === "user" ? (
                          <span className="text-lg">👩‍🎓</span>
                        ) : (
                          <Sparkles className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* 输入区域 */}
              <div className="bg-white border-t border-gray-100 px-6 py-4 pb-8">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-gray-100 rounded-[24px] px-4 py-3 flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
                    >
                      <ImageIcon className="w-5 h-5 text-gray-600" />
                    </motion.button>
                    
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="输入消息..."
                      className="flex-1 bg-transparent outline-none text-gray-800"
                    />

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
                    >
                      <Mic className="w-5 h-5 text-gray-600" />
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSend}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4FC3F7] to-[#66FFCC] flex items-center justify-center shadow-lg"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
