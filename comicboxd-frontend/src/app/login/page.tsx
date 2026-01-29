import Container from "@/src/components/Container";
import LoginForm from "@/src/components/Forms/LoginForm";
import Header from "@/src/components/Header";

export default function LoginPage() {
  return (
    <div>
      <Container>
        <Header></Header>
        <LoginForm />
      </Container>
    </div>
  );
}
