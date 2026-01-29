import Container from "@/src/components/Container";
import Header from "@/src/components/Header";
import RegisterForm from "@/src/components/Forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <Container>
        <Header></Header>
        <RegisterForm />
      </Container>
    </div>
  );
}
