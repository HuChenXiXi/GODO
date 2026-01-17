import { motion } from "motion/react";
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MoreVertical } from "lucide-react";
import { useState } from "react";

interface PostDetailProps {
  onBack: () => void;
}

export function PostDetail({ onBack }: PostDetailProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const comments = [
    { id: 1, author: "学霸小王", avatar: "👨‍💻", content: "太有用了！正好需要这个", time: "2小时前", likes: 12 },
    { id: 2, author: "学习达人", avatar: "📚", content: "感谢分享，已收藏", time: "3小时前", likes: 8 },
    { id: 3, author: "数学爱好者", avatar: "🧮", content: "请问有课件资料吗？", time: "5小时前", likes: 5 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden">
      {/* 顶部导航 */}
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </motion.button>
          
          <h2 className="text-lg text-gray-800">帖子详情</h2>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <MoreVertical className="w-6 h-6 text-gray-700" />
          </motion.button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto">
        {/* 作者信息 */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] flex items-center justify-center text-2xl">
              👨‍🎓
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800">学霸小明</h3>
              <p className="text-sm text-gray-500">2小时前 · 计算机学院</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-gradient-to-r from-[#4FC3F7] to-[#66FFCC] text-white rounded-[16px]"
            >
              关注
            </motion.button>
          </div>

          {/* 帖子内容 */}
          <div className="mb-4">
            <h2 className="text-xl text-gray-800 mb-3">线性代数期末复习重点整理</h2>
            <div className="prose prose-sm text-gray-700 leading-relaxed">
              <p className="mb-3">
                期末快到了，给大家整理了线性代数的复习重点。这些都是历年考试的高频知识点，希望对大家有帮助！
              </p>
              <p className="mb-3">
                <strong>重点章节：</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-3">
                <li>行列式的计算与性质</li>
                <li>矩阵的秩与逆矩阵</li>
                <li>线性方程组的解</li>
                <li>特征值与特征向量</li>
                <li>二次型的标准化</li>
              </ul>
              <p className="mb-3">
                每个知识点我都整理了典型例题和解题思路，需要完整版的同学可以私信我~
              </p>
            </div>
          </div>

          {/* 图片展示 */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-[16px] flex items-center justify-center"
              >
                <span className="text-4xl">📝</span>
              </motion.div>
            ))}
          </div>

          {/* 互动按钮 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ scale: liked ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart 
                  className={`w-6 h-6 ${liked ? "fill-red-500 text-red-500" : "text-gray-600"}`} 
                />
              </motion.div>
              <span className={`text-sm ${liked ? "text-red-500" : "text-gray-600"}`}>
                {liked ? 157 : 156}
              </span>
            </motion.button>

            <button className="flex items-center gap-2 text-gray-600">
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm">23</span>
            </button>

            <button className="flex items-center gap-2 text-gray-600">
              <Share2 className="w-6 h-6" />
              <span className="text-sm">分享</span>
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setBookmarked(!bookmarked)}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ scale: bookmarked ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Bookmark 
                  className={`w-6 h-6 ${bookmarked ? "fill-[#FFD93D] text-[#FFD93D]" : "text-gray-600"}`} 
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* 评论区 */}
        <div className="px-6 py-4">
          <h3 className="text-gray-800 mb-4">评论 ({comments.length})</h3>
          <div className="space-y-4">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#66FFCC] flex items-center justify-center text-xl flex-shrink-0">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-800">{comment.author}</span>
                    <span className="text-xs text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                  <button className="text-xs text-gray-500 flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {comment.likes}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部评论输入框 */}
      <div className="bg-white border-t border-gray-100 px-6 py-4 pb-8">
        <div className="bg-gray-100 rounded-[20px] px-4 py-3 flex items-center gap-3">
          <input
            type="text"
            placeholder="说点什么..."
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="px-5 py-2 bg-gradient-to-r from-[#4FC3F7] to-[#66FFCC] text-white rounded-[16px]"
          >
            发送
          </motion.button>
        </div>
      </div>
    </div>
  );
}
