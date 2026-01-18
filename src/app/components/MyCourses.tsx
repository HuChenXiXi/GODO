import { motion } from "motion/react";
import { ArrowLeft, Clock, MapPin, User, Calendar, Filter } from "lucide-react";
import { useState } from "react";

interface Course {
  id: number;
  name: string;
  teacher: string;
  time: string;
  location: string;
  day: number; // 0-6 表示周一到周日
  timeSlot: number; // 0-11 表示不同的时间段
  color: string;
  icon: string;
}

interface MyCoursesProps {
  onBack: () => void;
}

export function MyCourses({ onBack }: MyCoursesProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const courses: Course[] = [
    { id: 1, name: "高等数学", teacher: "李教授", time: "10:00-11:40", location: "A301", day: 0, timeSlot: 2, color: "#FF6B35", icon: "📐" },
    { id: 2, name: "数据结构", teacher: "王老师", time: "14:00-15:40", location: "B205", day: 0, timeSlot: 4, color: "#4FC3F7", icon: "💻" },
    { id: 3, name: "英语", teacher: "张老师", time: "08:00-09:40", location: "C102", day: 1, timeSlot: 0, color: "#66FFCC", icon: "📚" },
    { id: 4, name: "物理实验", teacher: "赵老师", time: "14:00-16:00", location: "实验楼", day: 2, timeSlot: 4, color: "#B794F6", icon: "⚗️" },
    { id: 5, name: "线性代数", teacher: "刘教授", time: "10:00-11:40", location: "A301", day: 3, timeSlot: 2, color: "#FFD93D", icon: "📊" },
    { id: 6, name: "计算机网络", teacher: "陈老师", time: "14:00-15:40", location: "B203", day: 4, timeSlot: 4, color: "#FF6B35", icon: "🌐" },
  ];

  const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
  ];

  const getCourseAtSlot = (day: number, slot: number) => {
    return courses.find(c => c.day === day && c.timeSlot === slot);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#f8f9ff] to-[#fff5f8] flex flex-col overflow-hidden">
      {/* 顶部 */}
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] px-6 pt-12 pb-6 rounded-b-[32px] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-2xl text-white flex-1">我的课程表</h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
          >
            <Filter className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* 学期信息 */}
        <div className="bg-white/20 backdrop-blur-xl rounded-[20px] p-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-90 mb-1">2025-2026 学年</p>
              <p className="text-lg">第一学期</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">共有课程</p>
              <p className="text-2xl">{courses.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {viewMode === "grid" ? (
          <div className="max-w-4xl mx-auto">
            {/* 表格视图 */}
            <div className="bg-white/80 backdrop-blur-lg rounded-[24px] p-4 shadow-lg border border-white/50 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-sm text-gray-600 font-medium w-16"></th>
                    {weekDays.slice(0, 5).map((day, index) => (
                      <th key={index} className="p-2 text-center text-sm text-gray-800 font-medium">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[0, 2, 4, 6].map(slot => (
                    <tr key={slot} className="border-t border-gray-100">
                      <td className="p-2 text-xs text-gray-500 align-top">
                        {timeSlots[slot]}
                      </td>
                      {[0, 1, 2, 3, 4].map(day => {
                        const course = getCourseAtSlot(day, slot);
                        return (
                          <td key={day} className="p-2">
                            {course ? (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-[12px] p-2 h-full min-h-[80px] cursor-pointer"
                                style={{ 
                                  backgroundColor: `${course.color}20`,
                                  borderLeft: `3px solid ${course.color}`
                                }}
                              >
                                <div className="flex items-start gap-2">
                                  <span className="text-lg">{course.icon}</span>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-medium text-gray-800 mb-1 truncate">
                                      {course.name}
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {course.location}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                      {course.teacher}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <div className="h-full min-h-[80px]"></div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-3 max-w-2xl mx-auto">
            {/* 列表视图 */}
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="bg-white/80 backdrop-blur-lg rounded-[24px] p-5 shadow-lg border border-white/50 cursor-pointer relative overflow-hidden"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[24px]"
                  style={{ backgroundColor: course.color }}
                />

                <div className="flex gap-4 ml-2">
                  <div
                    className="w-14 h-14 rounded-[16px] flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ backgroundColor: `${course.color}20` }}
                  >
                    {course.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-2">{course.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{course.teacher}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{weekDays[course.day]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{course.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
