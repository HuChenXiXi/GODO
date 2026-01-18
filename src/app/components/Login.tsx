import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // 简单验证
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#4FC3F7] via-[#B794F6] to-[#FFD93D] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
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
          <h1 className="text-3xl text-white mb-2">流光活力</h1>
          <p className="text-white/80">Glow & Go</p>
        </div>

        {/* 登录表单 */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl">
          <h2 className="text-2xl text-gray-800 mb-6 text-center">欢迎回来</h2>

          <div className="space-y-4">
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

            {/* 忘记密码 */}
            <div className="text-right">
              <button className="text-sm text-[#4FC3F7]">忘记密码？</button>
            </div>

            {/* 登录按钮 */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full py-4 bg-gradient-to-r from-[#4FC3F7] to-[#B794F6] text-white rounded-[20px] shadow-lg"
            >
              登录
            </motion.button>

            {/* 分隔线 */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400">或</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* 第三方登录 */}
            <div className="grid grid-cols-3 gap-3">
              {["📱", "💬", "🔗"].map((icon, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-3 bg-gray-100 rounded-[16px] text-2xl"
                >
                  {icon}
                </motion.button>
              ))}
            </div>

            {/* 注册提示 */}
            <div className="text-center mt-6">
              <span className="text-gray-600 text-sm">还没有账号？</span>
              <button
                onClick={onSwitchToRegister}
                className="text-sm text-[#4FC3F7] ml-2"
              >
                立即注册
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
