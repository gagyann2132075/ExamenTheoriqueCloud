"use client";

import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import init from '../common/init';

export default function SignUp() {
  const { auth } = init(); // Initialisation de Firebase à partir de init.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Création de l'utilisateur Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Utilisateur créé :", userCredential.user);
      router.push("/"); // Redirection vers la page d'accueil après inscription
    } catch (err) {
      setError("Erreur : " + err.message); // Affichage de l'erreur si l'inscription échoue
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <div className="container">
      <h1>Créer un compte</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Création..." : "Créer un compte"}
        </button>
      </form>
    </div>
  );
}
