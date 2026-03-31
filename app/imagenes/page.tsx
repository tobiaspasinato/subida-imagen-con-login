'use client'
import React, { useState, useEffect } from 'react'
import { useMe } from '../hooks/useAuth'

interface Imagen {
  id: string
  nombre: string
  url: string
  fecha: string
}

interface ApiResponse {
  images: Imagen[]
  total: number
  pages: number
}

function Imagenes() {
  const { isError } = useMe()
  const [currentPage, setCurrentPage] = useState(1)
  const [images, setImages] = useState<Imagen[]>([])
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [totalPages, setTotalPages] = useState(0)

  const ITEMS_PER_PAGE = 4

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      setApiError(false)
      try {
        const response = await fetch(
          `/api/images?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        )
        if (!response.ok) throw new Error('Error fetching images')
        const data: ApiResponse = await response.json()
        setImages(data.images)
        setTotalPages(data.pages)
      } catch (error) {
        console.error('Error:', error)
        setApiError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [currentPage])

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">¡Acceso Denegado!</h1>
          <p className="text-gray-300">Debes iniciar sesión para acceder a tus imágenes</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-12">
          Mis Imágenes
        </h1>

        {apiError && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            Error al cargar las imágenes. Intenta de nuevo más tarde.
          </div>
        )}

        {/* Grid de Imágenes */}
        <div className="mb-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-slate-700/50 rounded-lg border border-purple-500/30 animate-pulse"
                />
              ))}
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((imagen) => (
                <div
                  key={imagen.id}
                  className="group relative aspect-square bg-slate-800 rounded-lg border border-purple-500/30 overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  <img
                    src={imagen.url}
                    alt={imagen.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold truncate">{imagen.nombre}</h3>
                    <p className="text-gray-300 text-sm">
                      {new Date(imagen.fecha).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center aspect-video bg-slate-800/50 rounded-lg border border-purple-500/30">
              <p className="text-gray-400 text-lg">No hay imágenes para mostrar</p>
            </div>
          )}
        </div>

        {/* Botonera de Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:text-gray-500 text-white rounded-lg transition-colors duration-200 font-semibold"
            >
              ← Anterior
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === i + 1
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600 border border-purple-500/30'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:text-gray-500 text-white rounded-lg transition-colors duration-200 font-semibold"
            >
              Siguiente →
            </button>
          </div>
        )}

        {/* Información de paginación */}
        {totalPages > 0 && (
          <p className="text-center mt-6 text-gray-400 text-sm">
            Página {currentPage} de {totalPages}
          </p>
        )}
      </div>
    </div>
  )
}

export default Imagenes