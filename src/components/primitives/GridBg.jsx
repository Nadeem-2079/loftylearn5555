export default function GridBg({ opacity = 0.04 }) {

  return (

    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: `
        linear-gradient(rgba(248,248,248,${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(248,248,248,${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />

  );

}