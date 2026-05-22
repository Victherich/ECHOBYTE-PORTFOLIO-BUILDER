// "use client";

// import styled from "styled-components";
// import { categories } from "@/components/categories";

// /* ================= HERO ================= */

// const Hero = styled.div`
//   width: 100%;
//   padding: 4rem 1.5rem;
//   border-radius: 24px;
//   margin-bottom: 2.5rem;

//   background-image:
//     linear-gradient(
//       rgba(0, 0, 0, 0.65),
//       rgba(0, 0, 0, 0.65)
//     ),
//     url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80");

//   background-size: cover;
//   background-position: center;

//   color: white;
// `;

// const Title = styled.h1`
//   font-size: 2.2rem;
//   font-weight: 800;
//   margin-bottom: 0.5rem;
// `;

// const Sub = styled.p`
//   opacity: 0.85;
//   margin-bottom: 1.5rem;
// `;

// /* ================= FORM ================= */

// const Form = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 1fr auto;
//   gap: 12px;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const Input = styled.input`
//   padding: 14px;
//   border-radius: 12px;
//   border: none;
//   outline: none;
//   font-size: 1rem;
// `;

// const Select = styled.select`
//   padding: 14px;
//   border-radius: 12px;
//   border: none;
//   outline: none;
//   font-size: 1rem;
// `;

// const Button = styled.button`
//   padding: 14px 20px;
//   border-radius: 12px;
//   border: none;
//   background: #007bff;
//   color: white;
//   font-weight: 700;
//   cursor: pointer;

//   &:hover {
//     background: #0056b3;
//   }
// `;

// export default function ProfileSearchHero({
//   search,
//   setSearch,
//   category,
//   setCategory,
// }) {
//   return (
//     <Hero>
//       <Title>Discover Talent</Title>
//       <Sub>
//         Search creators by name, title, email and filter by category
//       </Sub>

//       <Form>
//         <Input
//           placeholder="Search name, title or email..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <Select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">All Categories</option>

//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </Select>

//         <Button onClick={() => {}}>
//           Search
//         </Button>
//       </Form>
//     </Hero>
//   );
// }




"use client";

import styled from "styled-components";
import { categories } from "@/components/categories";

/* ================= HERO ================= */

const Hero = styled.div`
  width: 100%;
  padding: 4rem 1.5rem;
  border-radius: 24px;
  margin-bottom: 2.5rem;

  background-image:
    linear-gradient(
      rgba(0, 0, 0, 0.65),
      rgba(0, 0, 0, 0.65)
    ),
    url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80");

  background-size: cover;
  background-position: center;

  color: white;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const Sub = styled.p`
  opacity: 0.85;
  margin-bottom: 1.5rem;
`;

/* ================= FORM ================= */

const Form = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  padding: 14px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 14px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 1rem;
`;

/* ================= BUTTONS ================= */

const Button = styled.button`
  padding: 14px 20px;
  border-radius: 12px;
  border: none;
  background: #007bff;
  color: white;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const ClearButton = styled.button`
  padding: 14px 18px;
  border-radius: 12px;
  border: none;

//   background: rgba(255, 255, 255, 0.15);
background:red;
  color: white;

  font-weight: 700;
  cursor: pointer;

  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export default function ProfileSearchHero({
  search,
  setSearch,
  category,
  setCategory,
}) {
  const hasFilters = search.trim() !== "" || category !== "";

  const clearFilters = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <Hero>
      <Title>Discover Talents</Title>
      <Sub>
        Search creators by name, title, email and filter by category
      </Sub>

      <Form>
        <Input
          placeholder="Search name, title or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>

        <ButtonGroup>
          <Button onClick={() => {}}>
            Search
          </Button>

          {/* ONLY SHOW WHEN ACTIVE FILTERS EXIST */}
          {hasFilters && (
            <ClearButton onClick={clearFilters}>
              Clear
            </ClearButton>
          )}
        </ButtonGroup>
      </Form>
    </Hero>
  );
}