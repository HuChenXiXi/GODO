import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HomePage } from "@/app/components/HomePage";
import { SocialPage } from "@/app/components/SocialPage";
import { DiscoverPage } from "@/app/components/DiscoverPage";
import { ProfilePage } from "@/app/components/ProfilePage";
import { BottomNav } from "@/app/components/BottomNav";
import { AIAssistant } from "@/app/components/AIAssistant";
import { ChatDetail } from "@/app/components/ChatDetail";
import { CourseDetail } from "@/app/components/CourseDetail";
import { ExerciseDetail } from "@/app/components/ExerciseDetail";
import { PostDetail } from "@/app/components/PostDetail";
import { MobileContainer } from "@/app/components/MobileContainer";

type PageType = "home" | "social" | "discover" | "profile" | "chatDetail" | "courseDetail" | "exerciseDetail" | "postDetail";

export default function App() {
  const [activeTab, setActiveTab] = useState<PageType>("home");
  const [pageData, setPageData] = useState<any>(null);
  const [showAI, setShowAI] = useState(false);

  const handleNavigate = (page: string, data?: any) => {
    setActiveTab(page as PageType);
    setPageData(data);
  };

  const handleBack = () => {
    // 根据当前页面返回到合适的主页面
    if (activeTab === "chatDetail") {
      setActiveTab("social");
    } else if (activeTab === "courseDetail" || activeTab === "exerciseDetail") {
      setActiveTab("home");
    } else if (activeTab === "postDetail") {
      setActiveTab("discover");
    }
    setPageData(null);
  };

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "social":
        return <SocialPage onNavigate={handleNavigate} />;
      case "discover":
        return <DiscoverPage onNavigate={handleNavigate} />;
      case "profile":
        return <ProfilePage />;
      case "chatDetail":
        return (
          <ChatDetail 
            groupName={pageData?.groupName || "群聊"} 
            groupAvatar={pageData?.groupAvatar || "💬"}
            onBack={handleBack}
          />
        );
      case "courseDetail":
        return <CourseDetail onBack={handleBack} />;
      case "exerciseDetail":
        return <ExerciseDetail onBack={handleBack} />;
      case "postDetail":
        return <PostDetail onBack={handleBack} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const isDetailPage = ["chatDetail", "courseDetail", "exerciseDetail", "postDetail"].includes(activeTab);

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