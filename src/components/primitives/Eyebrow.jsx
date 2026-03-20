import { T } from "../../styles/tokens";

export default function Eyebrow({ children }) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
        fontFamily: "'Roboto Mono', monospace",
        fontSize: 11,
        fontWeight: 500,
        color: T.green,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >

      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: T.green,
        }}
      />

      {children}

    </div>

  );

}