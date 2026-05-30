"use client";

import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

/* ================= THEME COLORS ================= */
const DarkBlue = "#0056b3";
const LightBg = "#e4ecf3";

/* ================= WRAPPER ================= */
const Section = styled.section`
  background: ${LightBg};
  padding: 5rem 1rem;
  color: #111;
`;

const Container = styled.div`
  max-width: 650px;
  margin: auto;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 86, 179, 0.15);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
`;

/* ================= TITLE ================= */
const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 800;
  color: ${DarkBlue};
  margin-bottom: 1.5rem;
`;

/* ================= INPUTS ================= */
const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 86, 179, 0.2);
  outline: none;
  font-size: 14px;
  transition: 0.2s;

  &:focus {
    border-color: ${DarkBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(0, 86, 179, 0.2);
  outline: none;
  font-size: 14px;
  resize: none;

  &:focus {
    border-color: ${DarkBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.15);
  }
`;

/* ================= BUTTON ================= */
const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  color: white;
  background: linear-gradient(135deg, ${DarkBlue}, #1a73e8);
  box-shadow: 0 8px 20px rgba(0, 86, 179, 0.25);
  transition: 0.25s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(0, 86, 179, 0.35);
  }

  &:active {
    transform: scale(0.98);
  }
`;

/* ================= FOOTER ================= */
const Footer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 13px;
  color: #555;
`;

const Status = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-weight: 700;
  color: ${DarkBlue};
`;

/* ================= COMPONENT ================= */
export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    Swal.fire({ text: "Please wait..." });
    Swal.showLoading();

    const res = await fetch("https://echobyteconcept.vercel.app/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("Message sent!");
      setForm({ name: "", email: "", phone: "", message: "" });

      Swal.fire({
        text: "Message sent successfully. We will get back to you soon.",
        icon: "success",
      });
    } else {
      setStatus("Something went wrong.");
      Swal.close();
    }
  };

  return (
    <Section>
      <Title>Contact Us</Title>

      <Container>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            type="text"
            name="phone"
            placeholder="Your Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <TextArea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <Button type="submit">Send Message</Button>
        </form>

        <Footer>
          📞 +234 706 348 0314 &nbsp; | &nbsp; 📧 echobyteconcept@gmail.com
        </Footer>

        {status && <Status>{status}</Status>}
      </Container>
    </Section>
  );
}