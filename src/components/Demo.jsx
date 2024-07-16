import { useState } from "react";
import linkIcon from "../assets/link.svg";
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
  const [article, setArticle] = useState({ url: "" });

  const handleSubmit = async (e) => {
    alert("submited");
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
      </div>
    </section>
  );
}

export default Demo;
