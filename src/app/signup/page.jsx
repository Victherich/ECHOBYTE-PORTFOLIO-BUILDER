
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

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
  margin-bottom: 0.5rem;
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

// ✨ SIGNUP COMPONENT
export default function UserSignup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    Swal.fire({
      title: "Please wait...",
      text: "Creating your portfolio account...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const { name, email, phone, password } = form;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        createdAt: new Date(),
      });

      Swal.fire("Success 🎉", "Welcome aboard! Start building your showcase.", "success");
      router.push("/login");
    } catch (err) {
      Swal.fire("Error ❌", err.message, "error");
    }
  };

  return (
    <Container>
      <Header>
        <Headline>Your All-in-One Online Showcase</Headline>
        <Subtext>
          Build a stunning portfolio and manage all your links in one place. Inspire,
          create, and share your world with a single link.
        </Subtext>
      </Header>

      <FormWrapper>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
          <Label>Full Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} required />

          <Label>Email</Label>
          <Input name="email" type="email" value={form.email} onChange={handleChange} required />

          <Label>Phone Number</Label>
          <Input name="phone" type="tel" value={form.phone} onChange={handleChange} required />

          <Label>Password</Label>
          <Input name="password" type="password" value={form.password} onChange={handleChange} required />

          <Label>Confirm Password</Label>
          <Input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button type="submit">Create Account</Button>
          <LinkText onClick={() => router.push("/login")}>
            Already have an account? Login
          </LinkText>
        </form>
      </FormWrapper>
    </Container>
  );
}
