import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Github,
  Mail,
  Twitter,
  Youtube,
  ArrowUpRight,
  Loader2,
  Disc3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Survey() {
  const [takingSurvey, setTakingSurvey] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previousAnswer, setPreviousAnswer] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerValid, setAnswerValid] = useState(false);
  const [done, setDone] = useState(false);
  const [people, setPeople] = useState(0);

  useEffect(() => {
    (async () => {
      const promises = [
        fetch("https://se1.haley.lol/pf/survey/check"),
        fetch("https://se1.haley.lol/pf/survey/number"),
      ];
      const [checkResponse, numberResponse] = await Promise.all(promises);
      const checkData = await checkResponse.json();
      const numberData = await numberResponse.json();
      setPreviousAnswer(checkData.data);
      setPeople(numberData.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setAnswerValid(answer.length === 0 || !isNaN(answer));
  }, [answer]);

  if (done) {
    return (
      <>
        <title>the survey</title>
        <div className="w-full h-screen flex flex-col items-center justify-center p-4 text-pretty overflow-hidden">
          <h1 className="text-4xl font-bold text-center mx-4">that's it!</h1>
          <p className="mt-2 text-center text-muted-foreground text-sm">
            thanks for participating!
            <br />
            your response has been recorded.
          </p>
          <Button asChild>
            <a
              href="/"
              className="mt-4 text-center text-muted-foreground text-sm"
            >
              <ArrowUpRight className="inline-block mr-1" size={16} />
              back to home
            </a>
          </Button>
        </div>
      </>
    );
  }

  if (takingSurvey) {
    return (
      <>
        <title>the survey</title>
        <div className="w-full h-screen flex flex-col items-center justify-center p-4 text-pretty overflow-hidden">
          <h1 className="text-xl font-bold text-center mx-4">
            pick a random number between 1 and 100
          </h1>
          <p className="mt-1 text-center text-muted-foreground text-sm">
            don't overthink it
          </p>
          <Input
            className={`mt-4 w-full max-w-xs ${
              answerValid ? "" : "text-red-500"
            }`}
            type="text"
            placeholder="number"
            value={answer}
            onChange={(e) => {
              const value = e.target.value;
              setAnswer(value.trim().slice(0, 20));
            }}
          />
          {!answerValid && (
            <p className="mt-2 text-center text-red-500 text-sm max-w-xs">
              {answer} is not a valid number
            </p>
          )}
          <Button
            onClick={() => {
              if (answerValid && answer.length) {
                setSubmitting(true);
                fetch("https://se1.haley.lol/pf/survey/submit", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ number: parseInt(answer) }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.error) {
                      alert(res.error);
                      window.location.reload();
                      return;
                    }
                    setSubmitting(false);
                    setDone(true);
                  });
              }
            }}
            className="mt-4 w-full max-w-xs"
            variant={answerValid && answer.length ? undefined : "outline"}
          >
            submit
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {loading && (
        <div
          className="w-full h-screen flex flex-col items-center justify-center p-4 text-pretty absolute top-0 left-0 bg-tpbg backdrop-blur-lg z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-2xl font-bold text-center mx-4">loading...</p>
        </div>
      )}
      <title>the survey</title>
      <div className="w-full h-screen flex flex-col items-center justify-center p-4 text-pretty overflow-hidden">
        <h1 className="text-4xl font-bold text-center mx-4">the survey</h1>
        {previousAnswer !== null ? (
          <p className="mt-2 text-center text-muted-foreground text-sm">
            thanks for participating!
            <br />
            your response was{" "}
            <span className="font-bold">{previousAnswer}</span>
            <br />
            please don't spoil the survey for others.
          </p>
        ) : (
          <p className="mt-2 text-center text-muted-foreground text-sm">
            you can only take the survey once.
            <br />
            your response is completely anonymous.
          </p>
        )}
        <Button
          onClick={() => {
            setTakingSurvey(true);
          }}
          className="mt-8"
          variant={previousAnswer === null ? undefined : "outline"}
          disabled={loading || previousAnswer !== null}
        >
          start
        </Button>
        <p className="mt-8 -mb-8 text-center text-muted-foreground text-sm">
          {people.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} people have
          taken the survey so far
        </p>
      </div>
    </>
  );
}
