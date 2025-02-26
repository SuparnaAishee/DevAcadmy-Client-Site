import AuthForm from "@/components/auth/AuthForm"
import AuthLayout from "@/components/auth/AuthLayout"

export default function SignUpPage() {
  return (
    <AuthLayout title="Create an account" description="Sign up to start your learning journey with us.">
      <AuthForm defaultTab="signup" />
    </AuthLayout>
  )
}

