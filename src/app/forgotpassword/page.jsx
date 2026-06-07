"use client";

import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";

// 🎨 THEME
const DarkBlue = "#0056b3";
const White = "#FFFFFF";

// ================= STYLES =================

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: #f6f9ff;
`;

const Card = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${White};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  text-align: center;
`;

const Title = styled.h1`
  color: ${DarkBlue};
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 10px;
  border: 2px solid #ddd;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${DarkBlue};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: ${DarkBlue};
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const BackLink = styled.p`
  margin-top: 1rem;
  color: ${DarkBlue};
  cursor: pointer;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    if (!email) {
      return Swal.fire("Error", "Please enter your email", "warning");
    }

    Swal.fire({text:"Please wait..."})
    Swal.showLoading();

    try {
      await sendPasswordResetEmail(auth, email);

      Swal.fire(
        "Email Sent 📩",
        "Check your inbox or spam folder for password reset link, follow the link and reset your password and then return here and login with your new password",
        "success"
      );

      router.push("/login");
    } catch (error) {
      Swal.fire("Error ❌", error.message, "error");
    }finally{
        // Swal.close()
    }
  };

  return (
    <Container>
      <Card>
        <Title>Forgot Password?</Title>

        <Subtitle>
          Enter your email address and we’ll send you a link to reset your password.
        </Subtitle>

        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={handleReset}>
          Send Reset Link
        </Button>

        <BackLink onClick={() => router.push("/login")}>
          ← Back to Login
        </BackLink>
      </Card>
    </Container>
  );
}