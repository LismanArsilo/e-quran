import { Navbar } from "./Navbar";

export default function AppShell({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
    </>
  );
}
