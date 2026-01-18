import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, MapPin, Bell, Plus } from "lucide-react";
import { useState } from "react";

interface ScheduleItem {
  id: number;
  title: string;
  type: "class" | "exercise" | "meeting" | "exam" | "other";
  time: string;
  location?: string;
  day: string;
  color: string;
  icon: string;
}

interface WeekScheduleProps {
  onBack: () => void;
}

export function WeekSchedule({ onBack }: WeekScheduleProps) {
  const [selectedDay, setSelectedDay] = useState(1); // 0=周一

  const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

  const scheduleData: ScheduleItem[] = [
    { id: 1, title: "高等数学", type: "class", time: "10:00-11:40", location: "A301", day: "周一", color: "#FF6B35", icon: "📐" },
    { id: 2, title: "晨跑", type: "exercise", time: "07:00-07:30", day: "周一", color: "#66FFCC", icon: "🏃" },
    { id: 3, title: "数据结构", type: "class", time: "14:00-15:40", location: "B205", day: "周一", color: "#FF6B35", icon: "💻" },
    { id: 4, title: "英语", type: "class", time: "08:00-09:40", location: "C102", day: "周二", color: "#FF6B35", icon: "📚" },
    { id: 5, title: "项目组会", type: "meeting", time: "19:00-20:00", location: "图书馆", day: "周二", color: "#4FC3F7", icon: "👥" },
    { id: 6, title: "物理实验", type: "class", time: "14:00-16:00", location: "实验楼", day: "周三", color: "#FF6B35", icon: "⚗️" },
    { id: 7, title: "篮球", type: "exercise", time: "16:30-18:00", location: "体育馆", day: "周三", color: "#66FFCC", icon: "🏀" },
    { id: 8, title: "线性代数", type: "class", time: "10:00-11:40", location: "A301", day: "周四", color: "#FF6B35", icon: "📊" },
    { id: 9, title: "期中考试", type: "exam", time: "09:00-11:00", location: "大礼堂", day: "周五", color: "#FFD93D", icon: "📝" },
    { id: 10, title: "社团活动", type: "other", time: "14:00-16:00", location: "活动中心", day: "周六", color: "#B794F6", icon: "🎭" },
  ];

  const getTodaySchedule = (day: string) => {
    return scheduleData.filter(item => item.day === day).sort((a, b) => {
      const timeA = parseInt(a.time.split(":")[0]);
      const timeB = parseInt(b.time.split(":")[0]);
      return timeA - timeB;
    });
  };

  const getTypeText = (type: string) => {
    const types: any = {
      class: "课程",
      exercise: "运动",
      meeting: "会议",
      exam: "考试",
      other: "其他"
    };
    return types[type] || "其他";
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#f8f9ff] to-[#fff5f8] flex flex-col overflow-hidden">
      {/* 顶部 */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-br from-[#4FC3F7] to-[#B794F6] px-6 pt-12 pb-6 rounded-b-[32px] shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl text-white flex-1">本周日程</h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <Plus className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* 周选择器 */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {weekDays.map((day, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-5 py-3 rounded-[16px] transition-all ${
                selectedDay === index
                  ? "bg-white text-[#4FC3F7] shadow-lg"
                  : "bg-white/20 backdrop-blur-lg text-white"
              }`}
            >
              <div className="text-center">
                <div className="text-xs mb-1 opacity-80">{day}</div>
                <div className="text-sm font-medium">{getTodaySchedule(day).length}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 日程列表 */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800">{weekDays[selectedDay]}的日程</h2>
            <span className="text-sm text-gray-500">{getTodaySchedule(weekDays[selectedDay]).length} 项安排</span>
          </div>

          {getTodaySchedule(weekDays[selectedDay]).length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 backdrop-blur-lg rounded-[28px] p-10 text-center border-2 border-dashed border-gray-200"
            >
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-gray-800 mb-2">今日无安排</h3>
              <p className="text-sm text-gray-600">好好休息，充电满满！</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {getTodaySchedule(weekDays[selectedDay]).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-white/80 backdrop-blur-lg rounded-[24px] p-4 shadow-lg border border-white/50 cursor-pointer relative overflow-hidden"
                >
                  {/* 侧边颜色条 */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[24px]"
                    style={{ backgroundColor: item.color }}
                  />

                  <div className="flex gap-4 ml-2">
                    {/* 图标 */}
                    <div
                      className="w-14 h-14 rounded-[16px] flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      {item.icon}
                    </div>

                    {/* 内容 */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-800 mb-1">{item.title}</h3>
                          <span
                            className="inline-block px-2 py-0.5 rounded-full text-xs"
                            style={{
                              backgroundColor: `${item.color}20`,
                              color: item.color
                            }}
                          >
                            {getTypeText(item.type)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{item.time}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 提醒按钮 */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
                    >
                      <Bell className="w-5 h-5 text-gray-600" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="bg-white border-t border-gray-100 px-6 py-4 pb-8">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#4FC3F7]/10 to-[#B794F6]/10 rounded-[20px] p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-[#FF6B35] mb-1">
                {scheduleData.filter(s => s.type === "class").length}
              </div>
              <div className="text-xs text-gray-600">课程</div>
            </div>
            <div>
              <div className="text-2xl text-[#66FFCC] mb-1">
                {scheduleData.filter(s => s.type === "exercise").length}
              </div>
              <div className="text-xs text-gray-600">运动</div>
            </div>
            <div>
              <div className="text-2xl text-[#4FC3F7] mb-1">
                {scheduleData.filter(s => s.type === "meeting").length}
              </div>
              <div className="text-xs text-gray-600">会议</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
