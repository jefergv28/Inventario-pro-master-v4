"use client";

import { useState } from "react";
import NewUserForm from "@/components/NewUserForm";

export default function NewUserPage() {
  const [formVisible, setFormVisible] = useState(true);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      {formVisible ? (
        <NewUserForm
          onClose={() => setFormVisible(false)}
          onUserCreated={() => console.log("Usuario creado")}
        />
      ) : (
        <p>Usuario creado exitosamente.</p>
      )}
    </main>
  );
}
