import "./styles.css";
import { useLayoutEffect, useRef, type LegacyRef } from "react";

export default function App() {
  const ref = useRef<HTMLDivElement>();
  useLayoutEffect(() => {
    ref.current?.style.setProperty("--br", "20px");
    ref.current?.style.setProperty("--color", "palegoldenrod");
  }, []);

  return (
    <div className="App" ref={ref as LegacyRef<HTMLDivElement>}>
      <style id="myStyle" />
      <button
        onClick={() => {
          ref.current?.style.setProperty("--br", "60px");
          ref.current?.style.setProperty("--color", "tomato");
          ref.current?.setAttribute("data-theme", "dark");
        }}
      >
        change theme
      </button>
      <h1
        style={{
          backgroundColor: "var(--color)",
          borderRadius: "var(--br)",
          height: "calc(2*50px)",
          borderBottomRightRadius: 0,
        }}
      >
        Hello Percy 👋
      </h1>
    </div>
  );
}
