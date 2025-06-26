import { GiClothes } from "react-icons/gi";

export default function ChangeClothesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secoundary px-4 py-6">
      <div className="w-full max-w-6xl h-full bg-white shadow-xl rounded-2xl overflow-hidden border border-accent">
        <div className="bg-gradient-to-r from-secoundary to-primary text-white py-4 px-6 text-center text-2xl font-['Roboto'] tracking-wide flex items-center justify-center gap-3">
          <GiClothes className="text-3xl" /> AI Clothes Changer
        </div>
        <div className="h-[90vh]">
          <iframe
            src="https://www.picsman.ai/aireplace?action=ai_clothes_changer&page=common"
            title="AI Clothes Changer"
            className="w-full h-full border-none "
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
