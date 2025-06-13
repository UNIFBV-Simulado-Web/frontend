"use client";

import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import {
  BottomText,
  ErrorText,
  FormContainer,
  FormGroup,
  FormTitle,
  FormWrapper,
  StyledField,
  StyledLabel,
  SubmitButton,
} from "./styles";

type LoginValues = {
  email: string;
  senha: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { login, isLoading, error, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  const initialValues: LoginValues = {
    email: "",
    senha: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("O email fornecido não é válido.")
      .required("O email é obrigatório."),
    senha: Yup.string().required("A senha é obrigatória."),
  });

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginValues>
  ) => {
    try {
      await login(values);
      router.push("/home");
    } catch (err: any) {
      setStatus({ success: false, message: err.message || "Ocorreu um erro." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <FormContainer>
        <FormWrapper>
          <FormTitle>Login</FormTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ status }) => (
              <Form>
                <FormGroup>
                  <StyledLabel htmlFor="email">Email</StyledLabel>
                  <StyledField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                  />
                  <ErrorMessage name="email" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <StyledLabel htmlFor="senha">Senha</StyledLabel>
                  <StyledField
                    id="senha"
                    name="senha"
                    type="password"
                    placeholder="Sua senha"
                  />
                  <ErrorMessage name="senha" component={ErrorText} />
                </FormGroup>

                <SubmitButton type="submit" disabled={isLoading}>
                  {isLoading ? "A entrar..." : "Entrar"}
                </SubmitButton>

                {(error || (status && !status.success)) && (
                  <div
                    style={{
                      color: "#f56565",
                      marginTop: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {error || status.message}
                  </div>
                )}
              </Form>
            )}
          </Formik>
          <BottomText>
            Não tem uma conta? <Link href="/register">Registre-se</Link>
          </BottomText>
        </FormWrapper>
      </FormContainer>
    </>
  );
};

export default LoginPage;
