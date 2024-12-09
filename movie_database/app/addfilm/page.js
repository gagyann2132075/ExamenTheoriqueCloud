"use client";
import { useState } from "react";
import init from '../common/init';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const AddMovie = () => {

  const { db } = init();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageFile, setImageFile] = useState(null); // État pour l'image
  
  // Gérer la sélection de l'image
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Enregistrer le fichier image dans l'état
  };

  // Soumettre le formulaire avec ou sans image
  async function submit(e) {
    e.preventDefault();
    setErrorMessage(""); // Réinitialiser le message d'erreur

    try {
      const currentUser = getAuth().currentUser;
      if (currentUser === null) {
        console.error("Utilisateur non authentifié");
        return;
      }
      
      const uid = currentUser.uid;

      // Si une image est sélectionnée, upload l'image
      const refFile = ref(getStorage(), `users/${uid}/movies/${imageFile.name}`);
        await uploadBytes(refFile, imageFile);
        console.log('Uploaded a file!');


      // Ajouter un document dans Firestore avec les informations du film et éventuellement l'URL de l'image
      const docRef = await addDoc(collection(db, "Film"), {
        titre: title,
        description: description,
        uid: uid,
        refImage: `users/${uid}/movies/${imageFile.name}`
      });

      console.log("Document written with ID: ", docRef.id);
      setTitle(""); // Réinitialiser le titre
      setDescription(""); // Réinitialiser la description
      setImageFile(null); // Réinitialiser l'image

      // Optionnellement, mettre à jour l'affichage sans rechargement
      window.location.reload();
    } catch (err) {
      setErrorMessage("Erreur lors de l'ajout du film. Veuillez réessayer.");
      console.error("Error adding document: ", err);
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white mb-4">Ajouter un Film</h2>
      <div className="row justify-content-center">
        <div className="col-md-8 col-12">
          <form className="bg-dark p-4 rounded shadow" onSubmit={submit}>
            {/* Titre du film */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label text-white">Titre du film</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="Titre du film"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Mettre à jour le titre
              />
            </div>
            
            {/* Description du film */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label text-white">Description du film</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="3"
                placeholder="Description du film"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Mettre à jour la description
              />
            </div>

            {/* Sélectionner une image */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label text-white">Image du film</label>
              <input
                type="file"
                id="image"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange} // Gérer la sélection du fichier image
              />
            </div>

            {/* Affichage du message d'erreur */}
            {errorMessage && (
              <div className="alert alert-danger">
                {errorMessage}
              </div>
            )}

            {/* Boutons de soumission */}
            <div className="d-flex justify-content-between">
              <button className="btn btn-success" type="submit">Ajouter le film</button>
              <button type="button" className="btn btn-secondary" onClick={() => {
                setTitle("");
                setDescription("");
                setImageFile(null); // Réinitialiser le fichier image
              }}>Réinitialiser</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
