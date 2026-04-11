'use client'
import React, { useState, useEffect } from 'react'
import { useMe } from '../hooks/useAuth'

interface Imagen {
  id: string
  nombre: string
  base64: string
  fecha_creacion?: string
}

function Imagenes() {
  const { isError } = useMe()
  const [images, setImages] = useState<Imagen[]>([])
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      setApiError(false)
      try {
        const response = await fetch(`/api/imagenes`)
        if (!response.ok) throw new Error('Error fetching images')
        const data = await response.json()
        
        // Extrae las imágenes del formato de mysql2/promise
        let imageList = data
        if (Array.isArray(data) && data.length > 0) {
          imageList = Array.isArray(data[0]) ? data[0] : data
        }
        
        setImages(Array.isArray(imageList) ? imageList : [])
      } catch (error) {
        console.error('Error:', error)
        setApiError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="aspect-square bg-slate-700/50 rounded-lg border border-purple-500/30 animate-pulse"
                />
              ))}
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((imagen, index) => (
                <div
                  key={imagen.id || `image-${index}`}
                  className="group relative aspect-square bg-slate-800 rounded-lg border border-purple-500/30 overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  <img
                    src={`data:image/jpeg;base64,${imagen.base64}`}
                    alt={imagen.nombre || 'Imagen'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold truncate">{imagen.nombre || 'Sin nombre'}</h3>
                    {imagen.fecha_creacion && (
                      <p className="text-gray-300 text-sm">
                        {new Date(imagen.fecha_creacion).toLocaleDateString('es-ES')}
                      </p>
                    )}
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
      </div>
    </div>
  )
}

export default Imagenes