import { useEffect, useState } from "react";
import linkIcon from "../assets/link.svg";
import { copy, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const EnterIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 1024 1024"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"></path>
  </svg>
);

function Demo() {
  const [article, setArticle] = useState({ url: "", summary: "" });

  //array for storing the history of the last searches by the user
  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState("");
  // storing the searched article in local storage
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent reload on submit

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updateAllArticles = [newArticle, ...allArticles];

      setAllArticles(updateAllArticles);
      setArticle(newArticle);
      localStorage.setItem("articles", JSON.stringify(updateAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className=" w-full">
      <div className=" mt-20 w-full">
        {/* =========Search============ */}
        <form
          onSubmit={handleSubmit}
          className=" flex w-full items-center relative justify-center"
        >
          <img
            src={linkIcon}
            alt="linkIcon"
            className="absolute w-4 left-0 m-2"
          />
          <input
            type="url"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            placeholder="Paste the article link"
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            {EnterIcon}
          </button>
        </form>
        {/*============ Browse History=========== */}

        <div className="main_history overflow-y-auto flex flex-col gap-1 max-h-60">
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className=" copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_link-icon"
                  className=" object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>

        {/* ==========Display Result============ */}
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img
              src={loader}
              alt="Loader"
              className="w-20 h-20 object-contain"
            />
          ) : error ? (
            <p className=" font-inter font-bold text-black text-center">
              Well, that wasn&apos;t supposed to happen...
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Demo;
