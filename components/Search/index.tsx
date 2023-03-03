import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { HTTPMethod } from "../../types/api";

const inter = Inter({ subsets: ["latin"] });

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoadingResults(true);
      try {
        console.log({ searchQuery });

        const response = await axios.post("/api/auto-complete", {
          method: HTTPMethod.POST,
          searchString: searchQuery,
          limit: 100,
        });

        console.log(JSON.stringify(response), response.data.data.length, { cond: response.data.data.length > 0 });
        if (response.data.data && response.data.data.length > 0) {
          console.log(response.data.data);
          setSearchResults(response.data.data);
        } else {
          setSearchResults([]);
        }
      } catch (e) {
        console.log("an error occurred", e);
      }
      setIsLoadingResults(false);
    })();
  }, [searchQuery]);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchInputContainer}>
        <input
          value={searchQuery}
          className={styles.searchInput}
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value);
          }}
        />
      </div>
      <div className={styles.searchAutocompleteContainer}>
        {!isLoadingResults && searchResults.length > 0 ? (
          <div className={styles.searchAutocomplete}>
            {searchResults.map((result) => {
              console.log({ result });
              return <div>{result.length > 80 ? `${result.substring(0, 80)}...` : result}</div>;
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
