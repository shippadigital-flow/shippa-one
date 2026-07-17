import { useEffect, useState } from "react";

export type Plan = "start" | "pro";

const KEY = "shippa-plan";
const EVENT = "shippa-plan-change";

const startModules = new Set([
  "/",
  "/site",
  "/blog",
  "/biblioteca",
  "/crescimento",
  "/seo",
  "/configuracoes",
  "/suporte",
  "/planos",
]);

export function isLocked(path: string, plan: Plan) {
  if (plan === "pro") return false;
  return !startModules.has(path);
}

function read(): Plan {
  if (typeof window === "undefined") return "start";
  return (window.localStorage.getItem(KEY) as Plan) || "start";
}

export function usePlan() {
  const [plan, setPlanState] = useState<Plan>("start");

  useEffect(() => {
    setPlanState(read());
    const onChange = () => setPlanState(read());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const setPlan = (p: Plan) => {
    window.localStorage.setItem(KEY, p);
    window.dispatchEvent(new Event(EVENT));
    setPlanState(p);
  };

  return { plan, setPlan };
}
