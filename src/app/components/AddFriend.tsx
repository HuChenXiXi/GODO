import { motion } from "motion/react";
import { ArrowLeft, Search, UserPlus, QrCode, Users } from "lucide-react";
import { useState } from "react";

interface AddFriendProps {
  onBack: () => void;
}

export function AddFriend({ onBack }: AddFriendProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const recommendations = [
    { id: 1, name: "李明", avatar: "👨‍🎓", major: "计算机科学", mutualFriends: 5, reason: "同院系同学" },
    { id: 2, name: "王芳", avatar: "👩‍🔬", major: "数学系", mutualFriends: 3, reason: "有共同好友" },
    { id: 3, name: "张伟", avatar: "👨‍💼", major: "物理系", mutualFriends: 2, reason: "同一社团" },
    { id: 4, name: "赵丽", avatar: "👩‍🎨", major: "艺术学院", mutualFriends: 4, reason: "附近的人" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#f8f9ff] to-[#fff5f8] flex flex-col overflow-hidden">
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] px-6 pt-12 pb-6 rounded-b-[32px] shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl text-white flex-1">添加好友</h1>
        </div>

        {/* 搜索框 */}
        <div className="bg-white/20 backdrop-blur-xl rounded-[20px] px-4 py-3 flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-white/80" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="输入用户名或ID..."
            className="flex-1 bg-transparent outline-none text-white placeholder-white/60"
          />
        </div>

        {/* 快捷功能 */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/20 backdrop-blur-xl rounded-[20px] p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-sm">扫一扫</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/20 backdrop-blur-xl rounded-[20px] p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-sm">群聊</span>
          </motion.button>
        </div>
      </div>

      {/* 推荐列表 */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">✨</span>
            推荐好友
          </h2>

          <div className="space-y-3">
            {recommendations.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-lg rounded-[24px] p-5 shadow-lg border border-white/50"
              >
                <div className="flex items-center gap-4">
                  {/* 头像 */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#66FFCC] flex items-center justify-center text-3xl">
                    {user.avatar}
                  </div>

                  {/* 信息 */}
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-1">{user.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{user.major}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#4FC3F7]/10 rounded-full text-xs text-[#4FC3F7]">
                        {user.reason}
                      </span>
                      {user.mutualFriends > 0 && (
                        <span className="text-xs text-gray-500">
                          {user.mutualFriends} 位共同好友
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 添加按钮 */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4FC3F7] to-[#66FFCC] flex items-center justify-center shadow-lg"
                  >
                    <UserPlus className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 我的二维码 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-gradient-to-br from-[#4FC3F7]/10 to-[#B794F6]/10 rounded-[28px] p-8 text-center"
          >
            <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-[20px] flex items-center justify-center">
              <div className="text-6xl">📱</div>
            </div>
            <h3 className="text-gray-800 mb-2">我的二维码</h3>
            <p className="text-sm text-gray-600">扫一扫上面的二维码，添加我为好友</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
