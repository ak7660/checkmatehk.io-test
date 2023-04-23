import Head from 'next/head'
import GoogleButton from 'react-google-button'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// Task 0: Initialize Firebase
const firebaseConfig = {
  // Enter your own firebase config here
  apiKey: "AIzaSyDBRYSXr-s_P1zxw7IVV9JOATazd5xchEc",
  authDomain: "checkmatehk-dc837.firebaseapp.com",
  projectId: "checkmatehk-dc837",
  storageBucket: "checkmatehk-dc837.appspot.com",
  messagingSenderId: "802545112980",
  appId: "1:802545112980:web:66ea42445a8a9610f2e181",
  measurementId: "G-66P3J33Y3K"
};

const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export default function Home() {
  const router = useRouter();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        router.push('/signed-in');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Head>
        <title>Sign in to see the public holidays in HK</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h1 className="title">
            Welcome to <a href="https://checkmatehk.io">CheckMate</a>
          </h1>
          <h3>Sign in to see a random programming joke 😳</h3>

          <GoogleButton
            label={'Sign in with Google'}
            type="light"
            style={{ width: '50%', display: "flex", justifyContent: 'center', alignItems: 'center', fontFamily: 'Roboto, sans-serif', color: '#444' }}
            onClick={signIn}
          />
        </main>
      </div>
    </>
  )
}