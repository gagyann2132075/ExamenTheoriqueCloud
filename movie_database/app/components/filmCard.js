"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import init from '../common/init'; // Assurez-vous que cette fonction est correctement définie

function ForumCard(props) {
  const { db } = init();  // Initialise Firebase
  const [snapshot, setSnapshot] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

  // Vérification si l'image est une URL valide
  const imageUrl ="/" + props.post.refImage; // URL par défaut si aucune image n'est présente
  console.log(imageUrl);
  return (
    <div className="card col-lg-4 col-12">
      <Image
        src={imageUrl} // Utilisation directe de l'URL de l'image (pas de '/' ajouté devant si c'est déjà complet)
        alt={props.post.titre || "Movie Image"} // Titre alternatif en cas d'absence de titre
        title={props.post.titre || "Movie Image"} // Titre pour l'image
        loading="lazy" // Contrôle du chargement de l'image
        className="card-img-top"
        width={500}  // Vous pouvez spécifier la largeur de l'image si nécessaire
        height={300} // Vous pouvez spécifier la hauteur de l'image si nécessaire
      />
      <div className="card-body">
        <h5 className="card-title">{props.post.titre || "Titre non disponible"}</h5>
        <p className="card-text">
          {props.post.description || "Description non disponible."}
        </p>
        <a href="/" className="btn btn-primary">
          📖
        </a>
        <a href="/" className="btn btn-dark">
          🗑️
        </a>
      </div>
    </div>
  );
}

export default ForumCard;
