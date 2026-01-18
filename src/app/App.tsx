import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HomePage } from "@/app/components/HomePage";
import { SocialPageNew } from "@/app/components/SocialPageNew";
import { DiscoverPage } from "@/app/components/DiscoverPage";
import { ProfilePage } from "@/app/components/ProfilePage";
import { BottomNav } from "@/app/components/BottomNav";
import { AIAssistant } from "@/app/components/AIAssistant";
import { PrivateChat } from "@/app/components/PrivateChat";
import { GroupChat } from "@/app/components/GroupChat";
import { CourseDetail } from "@/app/components/CourseDetail";
import { ExerciseDetail } from "@/app/components/ExerciseDetail";
import { PostDetail } from "@/app/components/PostDetail";
import { LunchDetail } from "@/app/components/LunchDetail";
import { WeekSchedule } from "@/app/components/WeekSchedule";
import { AddFriend } from "@/app/components/AddFriend";
import { MyCourses } from "@/app/components/MyCourses";
import { StudyRecord } from "@/app/components/StudyRecord";
import { HealthData } from "@/app/components/HealthData";
import { Notifications } from "@/app/components/Notifications";
import { Settings } from "@/app/components/Settings";
import { Login } from "@/app/components/Login";
import { Register } from "@/app/components/Register";
import { MobileContainer } from "@/app/components/MobileContainer";

type PageType = 
  | "home" | "social" | "discover" | "profile" 
  | "privateChat" | "groupChat" | "courseDetail" | "exerciseDetail" 
  | "postDetail" | "lunchDetail" | "weekSchedule" | "addFriend"
  | "myCourses" | "studyRecord" | "healthData" | "notifications" | "settings"
  | "login" | "register";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState<"login" | "register">("login");
  const [activeTab, setActiveTab] = useState<PageType>("home");
  const [pageData, setPageData] = useState<any>(null);

  const handleNavigate = (page: string, data?: any) => {
    setActiveTab(page as PageType);
    setPageData(data);
  };

  const handleBack = () => {
    // 根据当前页面返回到合适的主页面
    if (activeTab === "privateChat" || activeTab === "groupChat" || activeTab === "addFriend") {
      setActiveTab("social");
    } else if (activeTab === "courseDetail" || activeTab === "exerciseDetail" || activeTab === "lunchDetail" || activeTab === "weekSchedule") {
      setActiveTab("home");
    } else if (activeTab === "postDetail") {
      setActiveTab("discover");
    } else if (["myCourses", "studyRecord", "healthData", "notifications", "settings"].includes(activeTab)) {
      setActiveTab("profile");
    }
    setPageData(null);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthPage("login");
  };

  // 如果未登录，显示登录/注册页面
  if (!isLoggedIn) {
    return (
      <div className="h-screen w-full overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          {authPage === "login" ? (
            <Login
              onLogin={handleLogin}
              onSwitchToRegister={() => setAuthPage("register")}
            />
          ) : (
            <Register
              onRegister={handleLogin}
              onSwitchToLogin={() => setAuthPage("login")}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "social":
        return <SocialPageNew onNavigate={handleNavigate} />;
      case "discover":
        return <DiscoverPage onNavigate={handleNavigate} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} />;
      case "privateChat":
        return (
          <PrivateChat 
            name={pageData?.name || "好友"} 
            avatar={pageData?.avatar || "👤"}
            onBack={handleBack}
          />
        );
      case "groupChat":
        return (
          <GroupChat 
            name={pageData?.name || "群聊"} 
            avatar={pageData?.avatar || "👥"}
            onBack={handleBack}
          />
        );
      case "courseDetail":
        return <CourseDetail onBack={handleBack} />;
      case "exerciseDetail":
        return <ExerciseDetail onBack={handleBack} />;
      case "postDetail":
        return <PostDetail onBack={handleBack} />;
      case "lunchDetail":
        return <LunchDetail onBack={handleBack} />;
      case "weekSchedule":
        return <WeekSchedule onBack={handleBack} />;
      case "addFriend":
        return <AddFriend onBack={handleBack} />;
      case "myCourses":
        return <MyCourses onBack={handleBack} />;
      case "studyRecord":
        return <StudyRecord onBack={handleBack} />;
      case "healthData":
        return <HealthData onBack={handleBack} />;
      case "notifications":
        return <Notifications onBack={handleBack} />;
      case "settings":
        return <Settings onBack={handleBack} onLogout={handleLogout} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const mainPages = ["home", "social", "discover", "profile"];
  const isDetailPage = !mainPages.includes(activeTab);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
      <MobileContainer>
        {/* 主内容区 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>

        {/* 底部导航栏 - 详情页隐藏 */}
        {!isDetailPage && (
          <BottomNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as PageType)} />
        )}

        {/* AI助手 - 仅在首页显示 */}
        {activeTab === "home" && <AIAssistant />}
      </MobileContainer>
    </div>
  );
}
