import { motion } from "motion/react";
import { ArrowLeft, MapPin, Clock, Users, BookOpen, FileText, Award, Calendar } from "lucide-react";

interface CourseDetailProps {
  onBack: () => void;
}

export function CourseDetail({ onBack }: CourseDetailProps) {
  const upcomingClasses = [
    { date: "今天", time: "10:00-11:40", topic: "第五章：定积分的应用" },
    { date: "1月20日", time: "10:00-11:40", topic: "第六章：微分方程" },
    { date: "1月22日", time: "10:00-11:40", topic: "第七章：空间解析几何" },
  ];

  const homework = [
    { title: "第五章课后习题", deadline: "1月19日", status: "待完成" },
    { title: "微积分综合练习", deadline: "1月21日", status: "待完成" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#fff9f0] to-[#fff5f8] flex flex-col overflow-hidden">
      {/* 顶部渐变卡片 */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] px-6 pt-12 pb-8 rounded-b-[32px] shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl text-white flex-1">高等数学</h1>
        </div>

        {/* 课程基本信息 */}
        <div className="bg-white/20 backdrop-blur-xl rounded-[24px] p-5 space-y-3">
          <div className="flex items-center gap-3 text-white">
            <MapPin className="w-5 h-5" />
            <span>教学楼 A301</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Clock className="w-5 h-5" />
            <span>每周一、三 10:00-11:40</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Users className="w-5 h-5" />
            <span>李教授 · 156 名学生</span>
          </div>
        </div>
      </motion.div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* 今日课程 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-[#FF6B35]" />
              <h3 className="text-gray-800">今日课程</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-[24px] p-5 shadow-lg border border-white/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📐</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-800 mb-2">第五章：定积分的应用</h4>
                  <p className="text-sm text-gray-600 mb-3">包括平面图形面积、旋转体体积、平面曲线弧长等内容</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#FF6B35]/10 rounded-full text-xs text-[#FF6B35]">20 分钟后开始</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">第 10 周</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 近期课程安排 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-[#4FC3F7]" />
              <h3 className="text-gray-800">近期课程安排</h3>
            </div>
            <div className="space-y-3">
              {upcomingClasses.map((cls, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-white/80 backdrop-blur-lg rounded-[20px] p-4 shadow-md border border-white/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 text-center">
                      <div className="text-xs text-gray-500">{cls.date}</div>
                      <div className="text-sm text-gray-800 mt-1">{cls.time}</div>
                    </div>
                    <div className="w-px h-10 bg-gray-200"></div>
                    <div className="flex-1">
                      <p className="text-gray-800">{cls.topic}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 作业任务 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#66FFCC]" />
              <h3 className="text-gray-800">作业任务</h3>
            </div>
            <div className="space-y-3">
              {homework.map((hw, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/80 backdrop-blur-lg rounded-[20px] p-4 shadow-md border border-white/50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-gray-800 mb-1">{hw.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>截止：{hw.deadline}</span>
                      </div>
                    </div>
                    <div className="px-4 py-1.5 bg-[#FFD93D]/20 rounded-full">
                      <span className="text-sm text-[#FFD93D]">{hw.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 成绩统计 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-[#B794F6]" />
              <h3 className="text-gray-800">成绩统计</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-[24px] p-5 shadow-lg border border-white/50">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl text-[#FF6B35] mb-1">92</div>
                  <div className="text-xs text-gray-600">平均分</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-[#4FC3F7] mb-1">8/10</div>
                  <div className="text-xs text-gray-600">作业完成</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-[#66FFCC] mb-1">95%</div>
                  <div className="text-xs text-gray-600">出勤率</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 底部按钮 */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-4 bg-white/80 backdrop-blur-lg rounded-[20px] shadow-lg border border-white/50 text-gray-800"
            >
              课程资料
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-4 bg-gradient-to-r from-[#FF6B35] to-[#FFD93D] rounded-[20px] shadow-lg text-white"
            >
              设置提醒
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
