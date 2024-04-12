import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Github, Mail, Twitter, Youtube, ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Progressive from "@/components/progressive";
import useOnScreen from "@/components/use-on-screen";

const bullet = (
  <span className="bg-muted-foreground aspect-square p-0.5 rounded-full inline-block mx-1.5" />
);

const Body = ({ selectedButton, projects, experience, ...props }) => {
  const [magnus, setMagnus] = useState(null);
  const [loadingMagnus, setLoadingMagnus] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoadingMagnus(true);
    fetch("https://se1.smhaley.xyz/magni/random")
      .then((response) => response.json())
      .then((data) => {
        setMagnus(data.data);
        setLoadingMagnus(false);
      });
  }, [refresh]);

  switch (selectedButton) {
    case "projects":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:w-3/4 lg:w-4/5 sm:w-full">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`flex flex-col rounded-lg p-4 border bg-card text-card-foreground justify-between`}
            >
              <div className="flex flex-col items-start justify-start">
                {project.images.length > 0 && (
                  <Carousel
                    plugins={[
                      Autoplay({
                        delay: 2500,
                        stopOnInteraction: true,
                      }),
                    ]}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="mb-4"
                  >
                    <CarouselContent>
                      {project.images.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/2 xl:basis-1/3"
                        >
                          <a
                            href={image.url}
                            target="_blank"
                            rel="noreferrer"
                            className="h-full transition-all"
                          >
                            <Progressive
                              src={image.url}
                              placeholder={image.thumbnail}
                              alt={image.alt || project.name}
                              title={image.title || project.name}
                              className="rounded-md aspect-[3/4] transition-all object-cover"
                            />
                          </a>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}
                <div className="flex flex-row items-center flex-wrap mb-2">
                  {project.logo && (
                    <img
                      src={project.logo}
                      alt={project.title}
                      title={project.title}
                      className="h-6 aspect-auto rounded-sm mr-3"
                    />
                  )}
                  <h2 className={`text-xl font-bold text-card-foreground`}>
                    {project.title}
                  </h2>
                  {project.badges.map((badge) => (
                    <span
                      key={badge}
                      className="border rounded-md px-2 py-1 text-sm ml-3"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <p
                  // className={`text-muted-foreground mb-4 text-sm ${project.subtitleStyle}`}
                  className={`text-muted-foreground mb-4 text-sm`}
                >
                  {project.subtitle}
                  <br />
                  {project.date}
                </p>
              </div>
              <div className="flex flex-row items-end justify-start w-full">
                {project.links.length > 0 &&
                  project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="border rounded-md px-3 py-1.5 hover:bg-border transition-all mr-2"
                    >
                      <ArrowUpRight size={16} className="inline-block mr-1" />
                      {link.title}
                    </a>
                  ))}
                {project.technologies.length > 0 && (
                  <img
                    src={`https://skillicons.dev/icons?i=${project.technologies.join(
                      ","
                    )}`}
                    alt={project.technologies.join(", ")}
                    title={project.technologies.join(", ")}
                    className="inline-block aspect-auto h-8 ml-[auto]"
                  />
                )}
              </div>
            </div>
          ))}
          <div className="flex flex-col rounded-lg p-4 border bg-card text-card-foreground">
            <h2 className="text-xl font-bold">todo for self</h2>
            <p className="text-muted-foreground text-sm">
              add more stuff here!!
              <br />
              maybe start a blog or something idk
            </p>
          </div>
        </div>
      );
    case "experience":
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:w-3/4 lg:w-4/5 sm:w-full">
          {experience.map((skill) => (
            <div className="flex flex-row items-center justify-start space-x-4 rounded-lg p-4 border bg-card text-card-foreground">
              <img
                src={`https://skillicons.dev/icons?i=${skill.icon}`}
                alt={skill.icon}
                title={`${skill.icon} icon, courtesy of skillicons.dev`}
                className="h-12 aspect-auto rounded-lg"
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">{skill.title}</h2>
                <p className="text-muted-foreground text-sm">{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "magnus":
      return magnus ? (
        <>
          <Progressive
            src={magnus.url}
            placeholder={magnus.thumbnail}
            alt={`photo of a cat`}
            title={magnus.description}
            className={`rounded-lg h-[32rem] object-contain cursor-pointer transition-all ${
              loadingMagnus ? "opacity-50" : "opacity-100"
            }`}
            onClick={() => setRefresh((prev) => !prev)}
          />
          <h1
            className={`text-xl font-bold mt-4 text-center ${
              loadingMagnus ? "text-muted-foreground" : "text-card-foreground"
            } transition-all`}
            onClick={() => setRefresh((prev) => !prev)}
          >
            {magnus.name || "loading..."}
          </h1>
          <p
            className="text-sm text-muted-foreground text-center cursor-pointer select-none"
            onClick={() => setRefresh((prev) => !prev)}
          >
            click for a different magnus
          </p>
        </>
      ) : (
        <div className="flex flex-col rounded-lg p-4">
          <h2 className="text-xl font-bold">loading...</h2>
        </div>
      );
    default:
      return;
  }
};

const Tabs = (
  buttons,
  selectedButton,
  setSelectedButton,
  isTabsVisible,
  tabsRef
) => {
  const [showBottomTabs, setShowBottomTabs] = useState(false);
  const [animateSlideOut, setAnimateSlideOut] = useState(false);

  useEffect(() => {
    if (isTabsVisible) {
      setAnimateSlideOut(true);
      const timeout = setTimeout(() => {
        setShowBottomTabs(false);
        setAnimateSlideOut(false);
      }, 299);
      return () => clearTimeout(timeout);
    } else {
      setShowBottomTabs(true);
      setAnimateSlideOut(false);
    }
  }, [isTabsVisible]);

  return (
    <>
      <div
        className="border rounded-full mt-8 p-2 flex items-center justify-start space-x-2 bg-tpbg backdrop-blur-lg mb-8"
        ref={tabsRef}
      >
        {buttons.map((button) => (
          <button
            key={button}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedButton === button
                ? "bg-primary text-background"
                : "text-foreground hover:bg-border"
            } flex items-center justify-center truncate`}
            onClick={() => {
              navigator.vibrate(50);
              setSelectedButton(button);
            }}
          >
            {button}
          </button>
        ))}
      </div>
      {showBottomTabs && (
        <div
          className={`border rounded-full mt-8 p-2 flex items-center justify-start space-x-2 bg-tpbg backdrop-blur-md fixed bottom-2 max-w-full z-10 ${
            animateSlideOut ? "animate-tabs-slide-out" : "animate-tabs-slide"
          }`}
        >
          {buttons.map((button) => (
            <button
              key={button}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedButton === button
                  ? "bg-primary text-background"
                  : "text-foreground hover:bg-border"
              } flex items-center justify-center truncate`}
              onClick={() => setSelectedButton(button)}
            >
              {button}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);

  const [selectedButton, setSelectedButton] = useState(
    localStorage.getItem("selectedButton") || "projects"
  );
  const buttons = ["projects", "experience", "magnus"];
  const [isShift, setIsShift] = useState(false);

  const tabsRef = useRef();
  const isTabsVisible = useOnScreen(tabsRef);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://se1.smhaley.xyz/pf/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data.data));

    fetch("https://se1.smhaley.xyz/pf/experience")
      .then((response) => response.json())
      .then((data) => setExperience(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedButton", selectedButton);
  }, [selectedButton]);

  useEffect(() => {
    function handleKeyDown(event) {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          if (isShift) {
            setSelectedButton(
              buttons[
                (buttons.indexOf(selectedButton) - 1 + buttons.length) %
                  buttons.length
              ]
            );
          } else {
            setSelectedButton(
              buttons[(buttons.indexOf(selectedButton) + 1) % buttons.length]
            );
          }
          break;
        case "ArrowLeft":
          event.preventDefault();
          setSelectedButton(
            buttons[
              (buttons.indexOf(selectedButton) - 1 + buttons.length) %
                buttons.length
            ]
          );
          break;
        case "Enter":
        default:
          break;
      }
    }

    function handleKeyUp(event) {
      if (event.key === "Shift") {
        setIsShift(false);
      }
    }

    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedButton, navigate, buttons, isShift]);

  // useEffect(() => {
  //   setIsLoading(!(projects.length && experience.length));
  // }, [projects, experience]);

  return (
    <>
      <title>haley summerfield | {selectedButton}</title>
      <div className="w-full h-full flex flex-col items-center justify-center p-4 pt-20 pb-40 text-pretty">
        <img
          src="https://github.com/sniiz.png?size=200"
          alt="profile picture"
          className="rounded-lg w-40 h-40 min-w-40 min-h-40"
        />
        <div className="flex flex-row items-center justify-center space-x-4 mt-8">
          {/* proper design patterns are for losers */}
          <a
            className="border rounded-md p-2 hover:bg-border transition-all"
            href="https://se1.smhaley.xyz/link/email"
            target="_blank"
            rel="noreferrer"
          >
            <Mail
              size={24}
              className="text-muted-foreground"
              strokeWidth={1.5}
            />
          </a>
          <a
            className="border rounded-md p-2 hover:bg-border transition-all"
            href="https://se1.smhaley.xyz/link/github"
            target="_blank"
            rel="noreferrer"
          >
            <Github
              size={24}
              className="text-muted-foreground"
              strokeWidth={1.5}
            />
          </a>
          <a
            className="border rounded-md p-2 hover:bg-border transition-all"
            href="https://se1.smhaley.xyz/link/twitter"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter
              size={24}
              className="text-muted-foreground"
              strokeWidth={1.5}
            />
          </a>
          <a
            className="border rounded-md p-2 hover:bg-border transition-all"
            href="https://se1.smhaley.xyz/link/youtube"
            target="_blank"
            rel="noreferrer"
          >
            <Youtube
              size={24}
              className="text-muted-foreground"
              strokeWidth={1.5}
            />
          </a>
        </div>
        <h1 className="text-4xl font-bold mt-12 text-center mx-4">
          hi! i'm haley.
        </h1>
        <p className="text-muted-foreground text-center mx-4 flex items-center justify-center flex-wrap">
          she/her {bullet} 15yo {bullet} aroace
        </p>
        <p className="text-lg mt-4 text-center mx-4 text-muted-foreground">
          i'm a mostly self-taught fullstack developer. i make stuff for fun.
        </p>
        {Tabs(
          buttons,
          selectedButton,
          setSelectedButton,
          isTabsVisible,
          tabsRef
        )}
        <Body
          selectedButton={selectedButton}
          projects={projects}
          experience={experience}
        />
        <p className="text-muted-foreground text-center mt-16 text-xs">
          made with{" "}
          <a
            href="https://vitejs.dev/"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            vite
          </a>
          ,{" "}
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            react
          </a>
          , and{" "}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            tailwindcss
          </a>
          <br />© 2024 haley summerfield. all rights reserved.
        </p>
      </div>
    </>
  );
}
