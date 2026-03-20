import { T } from "../../styles/tokens";

export default function Toast({ message, icon, removing }) {

  return (

    <div
      style={{
        background: T.surface2,
        border: `1px solid ${T.border}`,
        borderLeft: `2px solid ${T.green}`,
        borderRadius: 12,

        padding: "13px 16px",

        boxShadow: "0 12px 40px rgba(0,0,0,0.6)",

        display: "flex",
        alignItems: "center",
        gap: 10,

        fontSize: 13.5,
        fontWeight: 500,
        color: T.white,

        animation: removing
          ? "toastOut 0.3s ease forwards"
          : "toastIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards",

        minWidth: 220,
        maxWidth: 300,
      }}
    >

      <span style={{ fontSize: 15 }}>
        {icon}
      </span>

      <span>
        {message}
      </span>

    </div>

  );

}