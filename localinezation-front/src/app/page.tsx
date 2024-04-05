import NavbarComponent from "@/app/components/NavbarComponent";
import Homepage from "./Homepage/page";
import { useRouter } from "next/navigation";

export default function Home() {

  return (
    <div className="page">
      <Homepage />
    </div>
  );
}
