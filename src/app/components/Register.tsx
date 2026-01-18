import { motion } from "motion/react";
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (name && email && password && password === confirmPassword) {
      onRegister();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#4FC3F7] via-[#B794F6] to-[#FFD93D] flex items-center justify-center p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md my-8"
      >
        {/* Logo 区域 */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-4 rounded-[24px] bg-white/20 backdrop-blur-xl flex items-center justify-center"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl text-white mb-2">加入流光活力</h1>
          <p className="text-white/80">开启你的精彩大学生活</p>
        </div>

        {/* 注册表单 */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl">
          <h2 className="text-2xl text-gray-800 mb-6 text-center">创建账号</h2>

          <div className="space-y-4">
            {/* 姓名输入 */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">姓名</label>
              <div className="bg-gray-100 rounded-[16px] px-4 py-3 flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入姓名"
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* 邮箱输入 */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">邮箱</label>
              <div className="bg-gray-100 rounded-[16px] px-4 py-3 flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入邮箱"
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">密码</label>
              <div className="bg-gray-100 rounded-[16px] px-4 py-3 flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* 确认密码 */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">确认密码</label>
              <div className="bg-gray-100 rounded-[16px] px-4 py-3 flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入密码"
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* 协议 */}
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <p className="text-xs text-gray-600">
                我已阅读并同意
                <button className="text-[#4FC3F7] mx-1">用户协议</button>
                和
                <button className="text-[#4FC3F7] mx-1">隐私政策</button>
              </p>
            </div>

            {/* 注册按钮 */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRegister}
              className="w-full py-4 bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] text-white rounded-[20px] shadow-lg"
            >
              注册
            </motion.button>

            {/* 登录提示 */}
            <div className="text-center mt-6">
              <span className="text-gray-600 text-sm">已有账号？</span>
              <button
                onClick={onSwitchToLogin}
                className="text-sm text-[#4FC3F7] ml-2"
              >
                立即登录
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
