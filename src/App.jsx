import "./App.css";
import React, { useState, useEffect } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import { RefreshCw, Mail, GitHub, Twitter, Youtube } from "react-feather";

function App() {
  // const [screen, setScreen] = useState("projects"); // bad idea, don't do this
  const [magnus, setMagnus] = useState({});
  const [isMagnusLoading, setIsMagnusLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [aka, setAka] = useState("");

  const experience = [
    {
      icon: "py",
      title: "python",
      desc: "self-taught & courses ⋅ 2019 - present ⋅ ml, statistics, discord bots",
    },
    {
      icon: "pytorch",
      title: "torch",
      desc: "self-taught & courses ⋅ 2020 - present ⋅ nlp, cv, gans",
    },
    {
      icon: "js",
      title: "javascript",
      desc: "self-taught ⋅ 2021 - present ⋅ frontend, backend, discord bots",
    },
    {
      icon: "ts",
      title: "typescript",
      desc: "trying (failing) to learn right now ⋅ my smooth vanilla js brain is awful at this send help",
    },
    {
      icon: "mongodb",
      title: "mongodb",
      desc: "self-taught ⋅ 2024 - present",
    },
    {
      icon: "rust",
      title: "rust",
      desc: "learning right now ⋅ it's hard and kinda weird but i like it ⋅ backend",
    },
    {
      icon: "react",
      title: "react.js & react native",
      desc: "self-taught ⋅ 2021 - present",
    },
    {
      icon: "html",
      title: "html & css",
      desc: "self-taught ⋅ 2019 - present",
    },
    {
      icon: "git",
      title: "git",
      desc: "self-taught ⋅ 2020 - present",
    },
    {
      icon: "c",
      title: "c",
      desc: "self-taught ⋅ 2022 - 2023 ⋅ dabbled in ic programming, did not like it",
    },
    {
      icon: "linux",
      title: "linux",
      desc: "dad-taught ⋅ 2010 - present",
    },
    {
      icon: "vim",
      title: "vim & neovim",
      desc: "self-taught ⋅ 2021 - present",
    },
    {
      icon: "vscode",
      title: "vscode",
      desc: "self-taught ⋅ 2019 - present",
    },
    {
      icon: "figma",
      title: "figma",
      desc: "self-taught ⋅ 2021 - present",
    },
    {
      icon: "blender",
      title: "blender",
      desc: "self-taught ⋅ 2020 - present",
    },
  ]; // TODO move to backend

  useEffect(() => {
    // magnus is my cat
    // fetches a random magnus photo from my api
    fetch("https://api.smhaley.xyz/magni/random")
      .then((res) => res.json())
      .then((data) => {
        setMagnus(data.data);
        setIsMagnusLoading(false);
      });

    // fetch("https://api.smhaley.xyz/pf/projects") // TODO
    // don't want people spamming my api for now
    // actually no who am i kidding there are no people
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProjects(data.data);
    //   });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const akas = ["sniiz", "smhaley", "cannotofbeans"];
      setAka((prev) => akas[akas.indexOf(prev) + 1] || akas[0]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    // <div className="body">
    <div className="app">
      <p
        style={{
          color: "#403b7c",
          textAlign: "center",
          fontSize: "0.8rem",
          margin: "0",
          marginBottom: "1rem",
          marginTop: "-1.8rem",
        }}
      >
        TODO make pretty later
      </p>
      <div className="socials-container">
        <a
          href="https://api.smhaley.xyz/link/email"
          className="socials-icon"
          target="_blank"
          rel="noreferrer"
        >
          {/* <Mail style={{ color: "#736ced" }} /> */}
          <Mail />
        </a>
        <a
          href="https://api.smhaley.xyz/link/github"
          className="socials-icon"
          target="_blank"
          rel="noreferrer"
        >
          <GitHub />
        </a>
        <a
          href="https://api.smhaley.xyz/link/twitter"
          className="socials-icon"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter />
        </a>
        <a
          href="https://api.smhaley.xyz/link/youtube"
          className="socials-icon"
          target="_blank"
          rel="noreferrer"
        >
          <Youtube />
        </a>
      </div>
      <h1 className="hi">hi i'm haley</h1>
      <p className="intro">
        i make various things that turn out good sometimes
      </p>
      <h1 className="section-heading">"work" experience</h1>
      <div className="experience-card">
        {experience.map((exp) => (
          <div className="experience-item" key={exp.title}>
            <img
              src={`https://skillicons.dev/icons?i=${exp.icon}`}
              alt={exp.title}
              className="experience-icon"
              title="icon courtesy of skillicons.dev, thank them very much"
            />
            <div className="experience-text">
              <h2 className="card-title">{exp.title}</h2>
              <p className="card-text">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <h1 className="section-heading">magnus</h1>
      <div
        onClick={() => {
          setIsMagnusLoading(true);
          fetch("https://api.smhaley.xyz/magni/random")
            .then((res) => res.json())
            .then((data) => {
              setMagnus(data.data);
              setIsMagnusLoading(false);
            });
        }}
      >
        <ProgressiveImage
          src={magnus.url}
          placeholder={magnus.thumbnail}
          // delay={1000}
        >
          {(src, loading) => (
            <img
              src={src}
              alt="magnus"
              className="magnus-img"
              style={{
                // filter: loading ? "blur(5px)" : "none",
                // transition: "filter 0.2s",
                imageRendering: loading ? "pixelated" : "auto",
                userSelect: "none",
                opacity: isMagnusLoading ? "0.8" : "inherit",
                transition: "0.1s",
              }}
              title={magnus?.description}
            />
          )}
        </ProgressiveImage>
      </div>
      <p
        className="magnus-text"
        onClick={() => {
          setIsMagnusLoading(true);
          fetch("https://api.smhaley.xyz/magni/random")
            .then((res) => res.json())
            .then((data) => {
              setMagnus(data.data);
              setIsMagnusLoading(false);
            });
        }}
      >
        click for more magnus
      </p>
      <h1 className="section-heading">
        projects & other actual portfolio things coming soon
      </h1>
      <a
        href="https://cooltext.com/Logo-Design-Burning"
        target="_blank"
        rel="noreferrer"
        className="awesome-link"
      >
        <img
          src="/awesome.gif"
          alt="smhaley.xyz burning text gif"
          className="awesome-gif"
        />
      </a>
    </div>
  );
}

export default App;
