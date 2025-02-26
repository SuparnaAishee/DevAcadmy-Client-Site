import AuthForm from "@/components/auth/AuthForm"
import AuthLayout from "@/components/auth/AuthLayout"

export default function AuthPage() {
  return (
    <AuthLayout title="Welcome to LMS" description="Log in to your account or create a new one to start learning.">
      <AuthForm />
    </AuthLayout>
  )
}

