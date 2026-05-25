
"use client"; // must be at the top for client-side Firebase and hooks

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

// 🎨 THEME COLORS
const DarkBlue = "#0056b3";
const White = "#FFFFFF";

// 🌟 Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  color: ${DarkBlue};
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  max-width: 600px;
`;

const Headline = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Subtext = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const FormWrapper = styled.div`
  background: ${White};
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  color: ${DarkBlue};
`;


const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${DarkBlue};
`;
const Label = styled.label`
  display: block;

  font-weight: 600;

  margin-bottom: 0.55rem;

  color: ${DarkBlue};

  text-align: left;
`;

const InputGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    border-color: ${DarkBlue};
    outline: none;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  top: 37%;

  transform: translateY(-50%);

  background: none;
  border: none;

  cursor: pointer;

  font-size: 0.95rem;
  color: ${DarkBlue};
`;

const Button = styled.button`
  width: 100%;
  background: ${DarkBlue};
  color: ${White};
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const LinkText = styled.p`
  margin-top: 10px;
  cursor: pointer;
  color: ${DarkBlue};
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

// ✨ LOGIN COMPONENT
const UserLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Please wait...",
      text: "Logging in...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const { email, password } = form;
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Success ✅", "Logged in successfully", "success");
      router.push("/dashboard");
    } catch (error) {
      Swal.fire("Login Failed ❌", error.message, "error");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user); // true if user is logged in
      setLoading(false);
      if (user) router.push("/dashboard");
    });

    return () => unsubscribe(); // Cleanup listener
  }, [router]);

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container>
      <Header>
        <Headline>Welcome Back to Your Showcase</Headline>
        <Subtext>
          Log in to access your portfolio, manage your links, and continue
          sharing your world with one simple link.
        </Subtext>
      </Header>

      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
<InputGroup>
  <Label>Email</Label>

  <Input
    name="email"
    type="email"
    value={form.email}
    onChange={handleChange}
    required
  />
</InputGroup>

<InputGroup>
  <Label>Password</Label>

  <PasswordWrapper>
    <Input
      name="password"
      type={showPassword ? "text" : "password"}
      value={form.password}
      onChange={handleChange}
      required
    />

    <EyeButton
      type="button"
      onClick={() =>
        setShowPassword(!showPassword)
      }
    >
      {showPassword ? "Hide" : "Show"}
    </EyeButton>
  </PasswordWrapper>
</InputGroup>

          <Button type="submit">Login</Button>
          <LinkText onClick={() => router.push("/signup")}>
            Don’t have an account? Sign Up
          </LinkText>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default UserLogin;
