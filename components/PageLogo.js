import Image from "next/image";

export default function PageLogo({ title }) {
  return (
    <div className="page-logo">
      <Image
        src="/logo.png"
        alt="Phoenix Academy Logo"
        width={90}
        height={90}
        className="page-logo-img"
      />
      <h1>{title}</h1>
    </div>
  );
}
