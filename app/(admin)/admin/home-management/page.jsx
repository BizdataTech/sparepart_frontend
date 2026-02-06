import Logo from "./logo/Logo.jsx";
import Sections from "./section/Sections.jsx";

const HomeManagement = () => {
  return (
    <main className="flex gap-4">
      <Sections />
      <Logo />
    </main>
  );
};

export default HomeManagement;
