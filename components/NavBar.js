import Link from "next/link";

const NavBar = () => {
  return (
    <div className="nav">
      <Link href="/">
        <div className="logo" style={{cursor:'pointer'}}></div>
      </Link>
    </div>
  );
};

export default NavBar;
