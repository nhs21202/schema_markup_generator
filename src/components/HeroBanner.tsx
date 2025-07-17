import React from "react";

const HeroBanner = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1500px" }}>
        <h1
          style={{
            color: "white",
            fontSize: "4rem",
            fontWeight: "bold",
            lineHeight: "1.1",
          }}
        >
          Review and Rating Schema
          <h2
            style={{
              color: "#57A06A",
              fontWeight: "bold",
              lineHeight: "1.1",
              margin: "0 0 4rem 0",
            }}
          >
            Markup Generator
          </h2>
        </h1>

        <p
          style={{
            color: "white",
            fontSize: "1.4rem",
            lineHeight: "1.5",
            opacity: "0.9",
            maxWidth: "1050px",
            margin: "0 auto",
          }}
        >
          A Review and Rating Schema Markup Generator helps websites and
          businesses build trust online. By adding rich snippets—such as star
          ratings and user reviews—it gives visitors quick, useful insights,
          which can increase click-through rates and support better customer
          decisions. It also benefits SEO by making it easier for search engines
          like Google to understand and index your content more accurately.
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
