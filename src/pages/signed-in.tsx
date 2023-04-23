import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState, useEffect } from 'react';

type Joke = {
  setup: string;
  punchline: string;
};

export default function SignedIn({
  joke,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState(false);
  const [newJoke, setNewJoke] = useState<Joke | null>(null);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    setLoading(true);
    const res = await fetch(
      "https://official-joke-api.appspot.com/jokes/programming/random"
    );
    const [joke] = await res.json();
    setNewJoke(joke);
    setLoading(false);
  };

  const handleGetNewJoke = () => {
    fetchJoke();
  };

  return (
    <div className="container">
      <header>
        <h1>Signed In</h1>
      </header>
      <main>
        <section>
          <h2><span role="img" aria-label="laughing face">😆</span> Programming Joke <span role="img" aria-label="laughing face">😆</span></h2>
          <div className="joke">
            {newJoke ? (
              <>
                <p>{newJoke.setup}</p>
                <p>{newJoke.punchline}</p>
              </>
            ) : null}
          </div>
          <button onClick={handleGetNewJoke} disabled={loading}>
            {loading ? 'Loading...' : 'Get a new joke'}
          </button>
        </section>
      </main>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 1rem;
          background-color: #f1f1f1;
          font-family: 'Poppins', sans-serif;
        }
        header {
          text-align: center;
          margin-bottom: 2rem;
        }
        button {
          background-color: #0070f3;
          border: none;
          padding: 0.5rem 1rem;
          color: #fff;
          border-radius: 0.25rem;
          cursor: pointer;
          margin-top: 1rem;
          font-weight: 600;
        }
        button:hover {
          background-color: #0060df;
        }
        .joke {
          background-color: #fff;
          padding: 1rem;
          border-radius: 0.25rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://official-joke-api.appspot.com/jokes/programming/random"
  );
  const [joke] = await res.json();
  return {
    props: { joke },
  };
};