"use client";

import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import FilmCard from "./components/filmCard";
import init from './common/init';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation'; // Import de useRouter pour la navigation

export default function PagePrincipale() {
  const { db } = init(); // Initialise Firebase
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Gestion de l'état de chargement
  const router = useRouter(); // Initialisation de useRouter pour la redirection

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser|| currentUser === null) {
        router.push("/login"); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      } else {
        let uid = getAuth().currentUser.uid;
        console.log(uid);
        setUser(currentUser); // Mettre à jour l'état de l'utilisateur
        fetchTasks(uid); // Récupérer les films après l'authentification
      }
     
      setLoading(false); // Fin du chargement après la vérification de l'authentification
    });
  }, [router]);

  const fetchTasks = async (uid) => {
    console.log(uid);
    try {
      const filmRef = collection(db, "Film");
      const q = query(filmRef, where("uid", "==", uid)); // Filtrer par `uid`
      const querySnapshot = await getDocs(q); // Obtenir les documents
      const postsArray = querySnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      setPosts(postsArray); // Mettre à jour les films
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  // Afficher un message de chargement pendant la vérification de l'utilisateur
  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">The Movie Database</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/addfilm">➕ Add Movie</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="row">
        {posts.map((post) => (
          <div className="card col-lg-4 col-12" key={post.id}>
            <FilmCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
}
