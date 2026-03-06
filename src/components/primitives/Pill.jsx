import { T } from "../../styles/tokens";

export default function Pill({ children, green }) {

  return (

    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 10px",
        borderRadius: 100,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.02em",

        background: green
          ? "rgba(93,214,44,0.1)"
          : "rgba(248,248,248,0.06)",

        color: green ? T.green : T.muted,

        border: `1px solid ${
          green ? "rgba(93,214,44,0.2)" : T.border
        }`,
      }}
    >

      {children}

    </span>

  );

}