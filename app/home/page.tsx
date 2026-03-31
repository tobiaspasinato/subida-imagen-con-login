'use client';
import { useMe } from "../hooks/useAuth";
import { useRef, useState } from "react";

export default function HomePage() {
  const {isError} = useMe()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      console.log('Archivo seleccionado:', file);
      setTimeout(() => setIsUploading(false), 1000);
    }
  };

  return (
    <div>
      {isError ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-white text-2xl">Error al cargar</span>
        </div>
      ) : (
        <div id="home" className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#2d1b4e] via-[#3d2d6b] to-[#1e3c72] p-4">
          <div className="bg-white/10 backdrop-blur-[10px] rounded-3xl p-12 w-full max-w-[700px] shadow-2xl border border-white/10 flex gap-12 items-center">
            {/* Contenedor derecho con botón */}
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <h2 className="text-white text-2xl font-semibold mb-2">
                  Sube tu contenido
                </h2>
                <p className="text-white/70 text-sm">
                  Haz clic en el botón para seleccionar una imagen
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={handleUploadClick}
                disabled={isUploading}
                className={`px-6 py-3.5 font-semibold tracking-wider rounded-lg border-2 border-white/20 transition-all duration-200 ${
                  isUploading
                    ? 'bg-purple-600/50 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-r from-[#6b3dd6] to-[#3b82f6] hover:shadow-xl hover:shadow-purple-500/50 hover:-translate-y-0.5 cursor-pointer'
                } text-white text-center shadow-lg shadow-purple-500/40`}
              >
                {isUploading ? 'CARGANDO...' : 'SUBIR IMAGEN'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
