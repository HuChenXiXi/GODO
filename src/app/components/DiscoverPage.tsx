import { motion } from "motion/react";
import { Search, BookOpen, Users, Award, TrendingUp, Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  author: string;
  avatar: string;
  likes: number;
  comments: number;
  category: string;
  color: string;
  height: number;
}

interface DiscoverPageProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function DiscoverPage({ onNavigate }: DiscoverPageProps) {
  const [searchFocus, setSearchFocus] = useState(false);

  const posts: Post[] = [
    { id: 1, title: "线性代数期末复习重点整理", author: "学霸小明", avatar: "👨‍🎓", likes: 156, comments: 23, category: "学习", color: "from-[#FFD93D] to-[#FF6B35]", height: 220 },
    { id: 2, title: "推荐！这门选修课太有趣了", author: "探索者", avatar: "🔍", likes: 89, comments: 12, category: "选课", color: "from-[#4FC3F7] to-[#66FFCC]", height: 180 },
    { id: 3, title: "大学英语四级备考经验分享", author: "英语达人", avatar: "📚", likes: 234, comments: 45, category: "学习", color: "from-[#B794F6] to-[#4FC3F7]", height: 200 },
    { id: 4, title: "图书馆自习座位推荐", author: "自习狂人", avatar: "🏛️", likes: 67, comments: 8, category: "生活", color: "from-[#66FFCC] to-[#FFD93D]", height: 160 },
    { id: 5, title: "计算机专业课程规划建议", author: "CS学长", avatar: "💻", likes: 312, comments: 56, category: "选课", color: "from-[#FF6B35] to-[#B794F6]", height: 240 },
    { id: 6, title: "校园周边美食探店", author: "美食家", avatar: "🍜", likes: 145, comments: 34, category: "生活", color: "from-[#FFD93D] to-[#66FFCC]", height: 190 },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#fefcff] to-[#f8fbff]">
      {/* 顶部搜索区域 */}
      <motion.div 
        className="px-6 pt-8 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl mb-4 bg-gradient-to-r from-[#FF6B35] to-[#4FC3F7] bg-clip-text text-transparent">
          智慧·学业社区
        </h1>

        {/* 糖果风格搜索框 */}
        <motion.div
          animate={{
            scale: searchFocus ? 1.02 : 1,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className={`relative ${searchFocus ? 'shadow-2xl' : 'shadow-lg'} transition-shadow`}>
            <motion.div
              className="bg-gradient-to-r from-[#FFD93D]/20 via-[#FF6B35]/20 to-[#4FC3F7]/20 rounded-[28px] p-1"
              animate={{
                background: searchFocus 
                  ? "linear-gradient(90deg, #FFD93D 0%, #FF6B35 50%, #4FC3F7 100%)"
                  : "linear-gradient(90deg, rgba(255,215,61,0.2) 0%, rgba(255,107,53,0.2) 50%, rgba(79,195,247,0.2) 100%)"
              }}
            >
              <div className="bg-white rounded-[24px] px-6 py-4 flex items-center gap-3">
                <Search className={`w-6 h-6 transition-colors ${searchFocus ? 'text-[#FF6B35]' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="今天想选哪门好课？"
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                  className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 快捷分类 */}
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {[
            { icon: BookOpen, label: "学习资料", color: "#FF6B35" },
            { icon: Users, label: "学习小组", color: "#4FC3F7" },
            { icon: Award, label: "选课攻略", color: "#66FFCC" },
            { icon: TrendingUp, label: "热门推荐", color: "#FFD93D" },
          ].map((category, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[20px] bg-white/80 backdrop-blur-lg shadow-md border border-white/50 whitespace-nowrap"
              style={{
                boxShadow: `0 4px 12px ${category.color}20`
              }}
            >
              <category.icon className="w-4 h-4" style={{ color: category.color }} />
              <span className="text-sm text-gray-700">{category.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 瀑布流帖子区域 */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate?.("postDetail", { postId: post.id })}
                className="cursor-pointer"
                style={{
                  height: `${post.height}px`
                }}
              >
                <div className={`h-full bg-gradient-to-br ${post.color} rounded-[24px] p-4 shadow-lg relative overflow-hidden group`}>
                  {/* 背景装饰 */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  
                  <div className="relative h-full flex flex-col">
                    {/* 分类标签 */}
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-white/90 rounded-full text-xs text-gray-700">
                        {post.category}
                      </span>
                    </div>

                    {/* 标题 */}
                    <h3 className="text-white mb-3 leading-snug line-clamp-3">
                      {post.title}
                    </h3>

                    {/* 底部信息 */}
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-lg">
                          {post.avatar}
                        </div>
                        <span className="text-white/90 text-sm flex-1 truncate">{post.author}</span>
                      </div>

                      <div className="flex items-center gap-4 text-white/90 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover 时显示分享按钮 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Share2 className="w-5 h-5 text-gray-700" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 加载更多 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center pb-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] text-white rounded-[20px] shadow-lg"
            >
              加载更多精彩内容
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}