"use client";
import init from '../common/init';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const { auth } = init();

  // Appelé lorsqu'on envoie le formulaire
  function submitForm(e) {
    e.preventDefault();
    console.log(auth);

    // Récupération des champs du formulaire
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Connexion (courriel + mot de passe)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log(userCred.user);
        window.location.href = '/'; // Redirection vers la page d'accueil
      })
      .catch((error) => {
        console.log(error.message);
        alert("Email ou mot de passe invalide. Veuillez réessayer.");
      });
  }

  return (
    <>
      <div
        className="text-center flex justify-center items-center h-screen"
        style={{
          backgroundImage: 'url(gradient.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <form
          onSubmit={submitForm}
          className="login-form w-full max-w-md rounded-lg shadow-md p-4"
          style={{
            backgroundColor: '#f7f7f7',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h1 className="text-center text-2xl font-bold mb-4">Connexion</h1>
          <input
            type="email"
            name="email"
            className="block w-full p-2 mb-4 shadow-md rounded-lg"
            placeholder="Courriel"
          />
          <input
            type="password"
            name="password"
            className="block w-full p-2 mb-4 shadow-md rounded-lg"
            placeholder="Mot de passe"
          />
          <input
            type="submit"
            className="block w-full p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            value="Se connecter"
          />
          <a
            href="/signup"
            className="text-gray-500 text-center mt-2 block"
          >
            Pas encore inscrit ? S'inscrire
          </a>
        </form>
      </div>
    </>
  );
}
