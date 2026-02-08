import { Eye, EyeOff, Globe, Info, Lock, Wifi } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { SystemConfig } from "@/features/config/config.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ConnectionStatus = "IDLE" | "TESTING" | "SUCCESS" | "ERROR";

interface EmailSectionProps {
  testEmailConnection: (options: {
    data: {
      apiKey: string;
      senderAddress: string;
      senderName?: string;
    };
  }) => Promise<{ success: boolean; error?: string }>;
}

export function EmailServiceSection({
  testEmailConnection,
}: EmailSectionProps) {
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>("IDLE");

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<SystemConfig>();

  const emailConfig = watch("email");
  // Check if configured: need apiKey and senderAddress
  const isConfigured =
    !!emailConfig?.apiKey?.trim() && !!emailConfig.senderAddress?.trim();

  const handleTest = async () => {
    if (!isConfigured) return;
    setStatus("TESTING");

    try {
      const result = await testEmailConnection({
        data: {
          apiKey: emailConfig?.apiKey || "",
          senderAddress: emailConfig?.senderAddress || "",
          senderName: emailConfig?.senderName,
        },
      });

      if (result.success) {
        setStatus("SUCCESS");
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    }
  };

  return (
    <div className="space-y-16">
      {/* Service Notice Box - Redesigned */}
      <div className="p-4 mb-8 border border-border/30 bg-muted/5">
        <div className="flex gap-3">
          <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-foreground">
              配置说明
            </h4>
            <ul className="space-y-1 list-disc list-outside ml-3">
              <li className="text-[10px] font-mono text-muted-foreground leading-relaxed">
                邮件服务是用户注册验证及密码重置的核心组件。
              </li>
              <li className="text-[10px] font-mono text-muted-foreground leading-relaxed">
                若不配置，系统将仅支持 GitHub 等第三方 OAuth 登录。
              </li>
              <li className="text-[10px] font-mono text-muted-foreground leading-relaxed">
                Resend 需完成域名验证 (DNS)，否则仅能发送至注册邮箱。
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {/* Credentials Section */}
        <section className="space-y-6">
          <header className="flex items-center gap-3">
            <Lock size={12} className="text-muted-foreground" />
            <h5 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
              访问凭证
            </h5>
          </header>

          <div className="grid grid-cols-1 gap-10 pl-6">
            <div className="space-y-3 group max-w-2xl">
              <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground group-focus-within:text-foreground transition-colors">
                Resend API 密钥
              </label>
              <div className="flex-1 flex items-center gap-4">
                <div className="flex-1 relative">
                  <Input
                    type={showKey ? "text" : "password"}
                    {...register("email.apiKey", {
                      onChange: () => setStatus("IDLE"),
                    })}
                    placeholder="re_xxxxxxxxxxxxxx (留空则禁用)"
                    className="w-full bg-transparent border-none shadow-none text-sm font-mono text-foreground focus-visible:ring-0 placeholder:text-muted-foreground/20 pr-10 h-auto"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-foreground transition-colors h-6 w-6 rounded-none"
                  >
                    {showKey ? (
                      <EyeOff size={16} strokeWidth={1.5} />
                    ) : (
                      <Eye size={16} strokeWidth={1.5} />
                    )}
                  </Button>
                </div>
              </div>
              {errors.email?.apiKey && (
                <p className="text-[10px] text-red-500">
                  {errors.email.apiKey.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Group: Sender Profile */}
        <section className="space-y-6 pt-6 border-t border-border/30">
          <header className="flex items-center gap-3">
            <Globe size={12} className="text-muted-foreground" />
            <h5 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
              发信身份
            </h5>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pl-6">
            <div className="space-y-3 group">
              <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground group-focus-within:text-foreground transition-colors">
                显示名称
              </label>
              <Input
                {...register("email.senderName")}
                placeholder="例如：Chronicle Blog"
                className="w-full bg-transparent border-b border-border/50 rounded-none py-2 text-sm font-mono focus-visible:ring-0 focus:border-foreground transition-all px-0"
              />
              {errors.email?.senderName && (
                <p className="text-[10px] text-red-500">
                  {errors.email.senderName.message}
                </p>
              )}
            </div>

            <div className="space-y-3 group">
              <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground group-focus-within:text-foreground transition-colors">
                发信邮箱 (已验证)
              </label>
              <Input
                type="email"
                {...register("email.senderAddress")}
                placeholder="noreply@yourdomain.com"
                className="w-full bg-transparent border-b border-border/50 rounded-none py-2 text-sm font-mono focus-visible:ring-0 focus:border-foreground transition-all px-0"
              />
              {errors.email?.senderAddress && (
                <p className="text-[10px] text-red-500">
                  {errors.email.senderAddress.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Property Row: Test Connection */}
        <section className="space-y-6 pt-6 border-t border-border/30">
          <header className="flex items-center gap-3">
            <Wifi size={12} className="text-muted-foreground" />
            <h5 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
              服务连通性
            </h5>
          </header>

          <div className="pl-6 flex items-center justify-between group">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                    status === "SUCCESS"
                      ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      : status === "ERROR"
                        ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                        : status === "TESTING"
                          ? "bg-amber-500 animate-pulse"
                          : "bg-muted-foreground/30"
                  }`}
                />
                <span className="text-xs font-serif text-foreground">
                  {status === "SUCCESS"
                    ? "连接正常"
                    : status === "ERROR"
                      ? "连接失败"
                      : "等待测试"}
                </span>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground/50 pl-3.5">
                {status === "SUCCESS"
                  ? "连接建立成功"
                  : status === "ERROR"
                    ? "连接被拒绝"
                    : "等待执行测试"}
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              onClick={handleTest}
              disabled={status === "TESTING" || !isConfigured}
              className={`h-8 px-4 rounded-none text-[10px] font-mono uppercase tracking-widest transition-all border border-transparent hover:border-border/30 ${
                !isConfigured
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : "text-foreground hover:bg-muted/50"
              }`}
            >
              {status === "TESTING" ? "[ 验证中 ]" : "[ 发送测试 ]"}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
