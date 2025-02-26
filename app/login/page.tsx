import AuthForm from "@/components/auth/AuthForm"
import AuthLayout from "@/components/auth/AuthLayout"

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to your account to access your courses and track your progress."
    >
      <AuthForm defaultTab="login" />
    </AuthLayout>
  )
}

