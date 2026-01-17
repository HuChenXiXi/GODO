import { motion } from "motion/react";
import { ArrowLeft, Phone, Video, MoreVertical, Send, Smile, Image as ImageIcon, Mic } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isMe: boolean;
}

interface ChatDetailProps {
  groupName: string;
  groupAvatar: string;
  onBack: () => void;
}

export function ChatDetail({ groupName, groupAvatar, onBack }: ChatDetailProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "小明", avatar: "👨‍🎓", content: "今晚一起复习高数吗？", time: "10:23", isMe: false },
    { id: 2, sender: "我", avatar: "👩‍🎓", content: "好啊！几点开始？", time: "10:24", isMe: true },
    { id: 3, sender: "小红", avatar: "👩", content: "我也去！", time: "10:24", isMe: false },
    { id: 4, sender: "小明", avatar: "👨‍🎓", content: "晚上7点图书馆见", time: "10:25", isMe: false },
    { id: 5, sender: "我", avatar: "👩‍🎓", content: "收到👌", time: "10:25", isMe: true },
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

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "我",
      avatar: "👩‍🎓",
      content: inputValue,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
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
                {groupAvatar}
              </div>
              <div>
                <h2 className="text-lg text-white">{groupName}</h2>
                <p className="text-xs text-white/80">4 位成员</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
            >
              <Phone className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
            >
              <Video className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
            >
              <MoreVertical className="w-5 h-5 text-white" />
            </motion.button>
          </div>
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

          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex gap-3 ${message.isMe ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* 头像 */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#66FFCC] flex items-center justify-center flex-shrink-0 text-2xl">
                {message.avatar}
              </div>

              <div className={`flex flex-col ${message.isMe ? "items-end" : "items-start"} max-w-[70%]`}>
                {/* 发送者名字 */}
                {!message.isMe && (
                  <span className="text-xs text-gray-500 mb-1 px-2">{message.sender}</span>
                )}

                {/* 消息气泡 */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-[20px] px-5 py-3 shadow-md ${
                    message.isMe
                      ? "bg-gradient-to-r from-[#4FC3F7] to-[#66FFCC] text-white rounded-tr-sm"
                      : "bg-white text-gray-800 rounded-tl-sm"
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
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

            {/* 图片按钮 */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
            >
              <ImageIcon className="w-5 h-5 text-gray-600" />
            </motion.button>

            {/* 语音按钮 */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
            >
              <Mic className="w-5 h-5 text-gray-600" />
            </motion.button>

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
