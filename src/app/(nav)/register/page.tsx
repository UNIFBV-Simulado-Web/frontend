"use client";

import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  ErrorText,
  FormContainer,
  FormGroup,
  FormTitle,
  FormWrapper,
  StyledField,
  StyledLabel,
  SubmitButton,
} from "./styles";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import { useToasterStore } from "@/store/toasterStore";

type FormValues = {
  nomeCompleto: string;
  email: string;
  senha: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { addToast } = useToasterStore();
  const initialValues: FormValues = {
    nomeCompleto: "",
    email: "",
    senha: "",
  };

  const validationSchema = Yup.object({
    nomeCompleto: Yup.string()
      .min(3, "O nome completo deve ter no mínimo 3 caracteres.")
      .required("O nome completo é obrigatório."),
    email: Yup.string()
      .email("O email fornecido não é válido.")
      .required("O email é obrigatório."),
    senha: Yup.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .required("A senha é obrigatória."),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus }: FormikHelpers<FormValues>
  ) => {
    console.log("Dados do formulário a serem enviados:", values);
    setStatus({ success: false });

    try {
      const response = await api.post(
        "https://api.quiz.saggioro.xyz/auth/register",

        values
      );

      console.log(response);

      console.log("Registo bem-sucedido!");
      addToast({ message: "Conta criada com sucesso!", type: "success" });
      setStatus({
        success: true,
        message: "Conta criada com sucesso!",
      });
      router.push("/login");
    } catch (error: any) {
      console.error("Erro no registo:", error);
      console.log(error);
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message.join(" ")
        : error?.response?.data?.message;
      setStatus({
        success: false,
        message: errorMessage || error.message || "Falha ao registar.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <FormContainer>
        <FormWrapper>
          <FormTitle>Criar Conta</FormTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                <FormGroup>
                  <StyledLabel htmlFor="nomeCompleto">
                    Nome Completo
                  </StyledLabel>
                  <StyledField
                    id="nomeCompleto"
                    name="nomeCompleto"
                    type="text"
                    placeholder="Seu nome completo"
                  />
                  <ErrorMessage name="nomeCompleto" component={ErrorText} />
                </FormGroup>

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
                    placeholder="Pelo menos 6 caracteres"
                  />
                  <ErrorMessage name="senha" component={ErrorText} />
                </FormGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "A criar..." : "Criar Conta"}
                </SubmitButton>

                {status && status.message && (
                  <div
                    style={{
                      color: status.success ? "green" : "#f56565",
                      marginTop: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {status.message}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </FormWrapper>
      </FormContainer>
    </>
  );
};

export default RegisterPage;
