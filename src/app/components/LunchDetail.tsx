import { motion } from "motion/react";
import { ArrowLeft, MapPin, Clock, Star, Users, Heart, Navigation } from "lucide-react";
import { useState } from "react";

interface LunchDetailProps {
  onBack: () => void;
}

export function LunchDetail({ onBack }: LunchDetailProps) {
  const [selectedMeal, setSelectedMeal] = useState(0);

  const recommendations = [
    {
      name: "第一食堂 · 鸡腿套餐",
      price: "¥15",
      rating: 4.8,
      distance: "200m",
      time: "5分钟",
      nutrition: { protein: "高", carbs: "中", fat: "低" },
      image: "🍗",
      tags: ["高蛋白", "营养均衡", "实惠"]
    },
    {
      name: "第二食堂 · 蔬菜沙拉",
      price: "¥12",
      rating: 4.6,
      distance: "350m",
      time: "8分钟",
      nutrition: { protein: "低", carbs: "低", fat: "低" },
      image: "🥗",
      tags: ["低卡", "减脂", "健康"]
    },
    {
      name: "学生餐厅 · 盖浇饭",
      price: "¥10",
      rating: 4.5,
      distance: "150m",
      time: "3分钟",
      nutrition: { protein: "中", carbs: "高", fat: "中" },
      image: "🍛",
      tags: ["经济实惠", "管饱", "快速"]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#fff9f0] to-[#fff5f8] flex flex-col overflow-hidden">
      {/* 顶部 */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-br from-[#FFD93D] to-[#FF6B35] px-6 pt-12 pb-8 rounded-b-[32px] shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl text-white flex-1">午餐推荐</h1>
        </div>

        {/* AI推荐理由 */}
        <div className="bg-white/20 backdrop-blur-xl rounded-[24px] p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">AI 饮食建议</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                根据你上午的运动消耗和营养需求，推荐高蛋白质、适量碳水的午餐，帮助你保持活力！
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="space-y-4 max-w-2xl mx-auto">
          {recommendations.map((meal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMeal(index)}
              className={`bg-white/80 backdrop-blur-lg rounded-[28px] p-5 shadow-lg border-2 transition-all cursor-pointer ${
                selectedMeal === index ? "border-[#FF6B35]" : "border-white/50"
              }`}
            >
              <div className="flex gap-4">
                {/* 餐品图标 */}
                <div className="w-20 h-20 rounded-[20px] bg-gradient-to-br from-[#FFD93D]/20 to-[#FF6B35]/20 flex items-center justify-center flex-shrink-0 text-5xl">
                  {meal.image}
                </div>

                {/* 餐品信息 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-800 mb-1">{meal.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#FFD93D] text-[#FFD93D]" />
                          <span>{meal.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{meal.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{meal.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xl text-[#FF6B35]">{meal.price}</div>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {meal.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-[#FFD93D]/20 to-[#FF6B35]/20 rounded-full text-xs text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 营养成分 */}
                  <div className="flex gap-2 text-xs">
                    <div className="flex-1 bg-gray-100 rounded-lg px-2 py-1 text-center">
                      <div className="text-gray-500">蛋白质</div>
                      <div className="text-gray-800">{meal.nutrition.protein}</div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg px-2 py-1 text-center">
                      <div className="text-gray-500">碳水</div>
                      <div className="text-gray-800">{meal.nutrition.carbs}</div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg px-2 py-1 text-center">
                      <div className="text-gray-500">脂肪</div>
                      <div className="text-gray-800">{meal.nutrition.fat}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* 自定义选择 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/60 backdrop-blur-lg rounded-[28px] p-5 border-2 border-dashed border-gray-300"
          >
            <div className="text-center py-4">
              <div className="text-4xl mb-2">🍽️</div>
              <h3 className="text-gray-800 mb-1">自定义选择</h3>
              <p className="text-sm text-gray-600">浏览更多餐厅和菜品</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="bg-white border-t border-gray-100 px-6 py-4 pb-8">
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-4 bg-white/80 backdrop-blur-lg rounded-[20px] shadow-lg border border-white/50 text-gray-800 flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            导航
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-4 bg-gradient-to-r from-[#FFD93D] to-[#FF6B35] rounded-[20px] shadow-lg text-white flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            收藏推荐
          </motion.button>
        </div>
      </div>
    </div>
  );
}
