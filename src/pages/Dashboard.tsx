import SidePanel from "../components/SidePanel";

export default function Dashboard() {
  return (
    <div className="flex gap-10 h-screen">
      <SidePanel />
      <div className="h-full w-full text-white">Dashboard cards</div>
    </div>
  );
}
