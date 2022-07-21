import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [moviesAndSeries, setMoviesAndSeries] = useState([]);
  const [research, setResearch] = useState([]);
  const [isDisplay, setIsDisplay] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMoviesAndSeries(data.results);
      });
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
      setResearch([]);
    }
    fetch(
      `https://api.themoviedb.org/3/search/tv?include_adult=false&page=1&language=fr-FR&api_key=${process.env.API_KEY}&query=${e.currentTarget.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResearch(data.results);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Prep Academy Test</title>
        <meta
          name="description"
          content="This is the technical test of prep academy"
        />
        <link rel="icon" href="/prepacademy.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Séries et films</h1>
          <div className={styles.block}>
            <div className={styles.contactBlock}>
              <div className={styles.searchResult}>
                <input
                  className={styles.bar}
                  onChange={handleChange}
                  placeholder="Rechercher une série ou un film"
                />
              </div>
              <div
                className={styles.category}
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  margin: "32px",
                }}
              >
                <div>Action</div>
                <div>Aventure</div>
                <div>Comédie</div>
                <div>Fantastique</div>
                <div>Fiction</div>
                <div>Film musical</div>
                <div>Horreur</div>
                <div>Romance</div>
                <div>Science fiction</div>
                <div>Western</div>
              </div>
              <ul className={styles.cards}>
                {research?.length === 0
                  ? moviesAndSeries?.map((item, key: number) => {
                      return (
                        <li key={key}>
                          <div
                            style={{
                              alignItems: "center",
                              display: "flex",
                              flexDirection: "column",
                              gap: "16px",
                            }}
                          >
                            <Image
                              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                              alt="Picture of the author"
                              width={300}
                              height={400}
                            />
                            <div className={styles.name}>{item.title}</div>
                            <div className={styles.details}>
                              <div className={styles.name}>
                                Note : {item.vote_average} / 10
                              </div>
                              <div className={styles.name}>
                                Popularité : {item.popularity}
                              </div>
                              <div>
                                {!isFavorite ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        margin: "4px",
                                      }}
                                    >
                                      Ajouter à ma liste
                                    </div>
                                    <img src="https://gist.githubusercontent.com/bltnico/6f69566be9861c6125dd132b78aef6f1/raw/6a0937aeeaf324649b10e39951b6e331fb700720/heart.svg" />
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        margin: "4px",
                                      }}
                                    >
                                      Supprimer de ma liste
                                    </div>
                                    <img src="https://gist.githubusercontent.com/bltnico/6f69566be9861c6125dd132b78aef6f1/raw/6a0937aeeaf324649b10e39951b6e331fb700720/heart-fill.svg" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  : research?.map((item, key: number) => {
                      return (
                        <li key={key}>
                          <div
                            style={{
                              alignItems: "center",
                              display: "flex",
                              flexDirection: "column",
                              gap: "16px",
                            }}
                          >
                            <Image
                              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                              alt="Picture of the author"
                              width={300}
                              height={400}
                            />
                            <div className={styles.name}>{item.name}</div>
                            <div className={styles.details}>
                              <div className={styles.name}>
                                Note : {item.vote_average} / 10
                              </div>
                              <div className={styles.name}>
                                Popularité : {item.popularity}
                              </div>
                              <div>
                                {!isFavorite ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        margin: "4px",
                                      }}
                                    >
                                      Ajouter à ma liste
                                    </div>
                                    <img src="https://gist.githubusercontent.com/bltnico/6f69566be9861c6125dd132b78aef6f1/raw/6a0937aeeaf324649b10e39951b6e331fb700720/heart.svg" />
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      alignItems: "center",
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <div
                                      style={{
                                        margin: "4px",
                                      }}
                                    >
                                      Supprimer de ma liste
                                    </div>
                                    <img src="https://gist.githubusercontent.com/bltnico/6f69566be9861c6125dd132b78aef6f1/raw/6a0937aeeaf324649b10e39951b6e331fb700720/heart-fill.svg" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
