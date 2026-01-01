import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = await params;
  return (
    <div>
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default page;
