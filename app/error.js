"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: "20px" }}>
      Something went wrong.
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
