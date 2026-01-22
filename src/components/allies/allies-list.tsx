import React, { useState, useEffect, useMemo } from "react";
import { Handshake, ChevronLeft, ChevronRight, ChevronDown, MapPin } from "lucide-react";
import Loader from "../ui/loader";

interface Ally {
    id?: string;
    nombre_prestador: string;
    cover?: string;
    nombre_municipio?: string;
    [key: string]: any;
}

interface AllyCarouselProps {
    items: Ally[];
    onSelect: (item: Ally) => void;
    type?: "page" | "carousel";
    loading?: boolean;
}

const AllyCarousel: React.FC<AllyCarouselProps> = (
    { items, onSelect, type = "page", loading = false },
) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [selectedCity, setSelectedCity] = useState<string>("");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setItemsPerPage(3);
            } else if (window.innerWidth >= 1024) {
                setItemsPerPage(3);
            } else if (window.innerWidth >= 640) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < totalPages - 1;

    const handlePrev = () => {
        if (canGoPrev) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (canGoNext) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    // Reset index if items change
    useEffect(() => {
        setCurrentIndex(0);
    }, [items.length, itemsPerPage]);

    // Reset filtro cuando cambian los items
    useEffect(() => {
        setSelectedCity("");
    }, [items.length]);



    const renderCard = (item: Ally, index: number | string) => (
        <div
            key={index}
            className="bg-gray-200 w-full h-[26rem] sm:h-auto xs:h-auto rounded-xl flex flex-col items-center shadow-lg space-y-8 mx-auto"
            style={{ maxWidth: "350px" }}
        >
            <div className="w-full h-[12rem] sm:h-[12rem] xs:h-[12rem] relative overflow-hidden rounded-t-xl">
                <img
                    src={item.cover || undefined}
                    alt="Prestadores de salud"
                    className="w-full h-full object-cover pointer-events-none select-none"
                />
            </div>
            <div className="flex flex-1 items-center px-4">
                <p className="text-center text-xl font-semibold text-gray-700">
                    {item.nombre_prestador}
                </p>
            </div>
            <div className="mt-auto pb-12">
                <button
                    className="mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primarydark transition-colors duration-300 cursor-pointer"
                    onClick={() => onSelect(item)}
                >
                    Ver días disponibles
                </button>
            </div>
        </div>
    );

    // Función para normalizar nombres de ciudades (evitar duplicados)
    const normalizeCityName = (cityName: string | undefined): string => {
        if (!cityName) return "sin ciudad";
        return cityName.trim().toLowerCase();
    };

    // Agrupar y procesar ciudades
    const citiesData = useMemo(() => {
        if (items.length === 0) {
            return [];
        }

        // Agrupar aliados por ciudad normalizada
        const grouped = items.reduce((acc, item) => {
            const normalizedCity = normalizeCityName(item.nombre_municipio);
            if (!acc[normalizedCity]) {
                acc[normalizedCity] = [];
            }
            acc[normalizedCity].push(item);
            return acc;
        }, {} as Record<string, Ally[]>);

        // Crear array de ciudades con cantidad de aliados
        // Usar el nombre original del primer item de cada grupo
        const cities = Object.keys(grouped).map(normalizedCity => {
            const firstItem = grouped[normalizedCity][0];
            const originalName = firstItem.nombre_municipio || "Sin ciudad";
            
            return {
                normalizedName: normalizedCity,
                originalName: originalName,
                count: grouped[normalizedCity].length,
                items: grouped[normalizedCity]
            };
        });

        // Ordenar por cantidad de aliados (mayor primero), luego alfabéticamente
        cities.sort((a, b) => {
            if (b.count !== a.count) {
                return b.count - a.count;
            }
            return a.originalName.localeCompare(b.originalName);
        });

        return cities;
    }, [items]);

    // Filtrar ciudades según selección
    const filteredCities = useMemo(() => {
        if (!selectedCity) {
            return citiesData;
        }
        return citiesData.filter(city => city.originalName === selectedCity);
    }, [selectedCity, citiesData]);

    const renderPageItems = () => {
        if (items.length === 0) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            );
        }

        return (
            <div className="w-full px-4 space-y-8">
                {/* Filtro de ciudades */}
                <div className="w-full max-w-md mx-auto mb-6">
                    <label 
                        htmlFor="city-filter" 
                        className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
                    >
                        <MapPin className="w-5 h-5 text-pink-600" />
                        Filtrar por ciudad
                    </label>
                    <div className="relative">
                        <select
                            id="city-filter"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-full px-4 py-3 pr-10 text-base bg-white border-2 border-gray-300 rounded-lg shadow-sm 
                                       focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
                                       hover:border-pink-400 transition-all cursor-pointer
                                       appearance-none font-medium text-gray-700"
                        >
                            <option value="">Todas las ciudades</option>
                            {citiesData.map((city) => (
                                <option key={city.normalizedName} value={city.originalName}>
                                    {city.originalName} ({city.count})
                                </option>
                            ))}
                        </select>
                        <ChevronDown 
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                        />
                    </div>
                </div>

                {/* Secciones de ciudades */}
                <div className="space-y-12">
                    {filteredCities.length > 0 ? (
                        filteredCities.map((city) => (
                            <div key={city.normalizedName} className="space-y-6">
                                {/* Título de la ciudad */}
                                <h3 className="text-3xl sm:text-2xl xs:text-2xl font-bold text-gray-800 text-left border-b-2 border-pink-400 pb-2 flex items-center gap-3">
                                    <MapPin className="w-7 h-7 text-pink-600" />
                                    {city.originalName}
                                    <span className="text-lg font-normal text-gray-500">
                                        ({city.count} {city.count === 1 ? 'aliado' : 'aliados'})
                                    </span>
                                </h3>
                                {/* Cards de aliados de esta ciudad */}
                                <div className="grid grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-2 gap-4 w-full place-items-center">
                                    {city.items.map((item, index) => 
                                        renderCard(item, `${city.normalizedName}-${index}`)
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-500">
                                No se encontraron aliados en la ciudad seleccionada.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    };
    

    const renderCarouselItems = () => {
        const startIndex = currentIndex * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleItems = items.slice(startIndex, endIndex);
        
        return (
        <div className="w-full relative">
            {items.length > 0 ? (
                <div className="relative">
                    {/* Contenedor del carrusel */}
                    <div className="w-full px-12 sm:px-4 xs:px-4">
                        <div 
                            className="flex gap-4 py-4 justify-center"
                            style={{
                                gridTemplateColumns: itemsPerPage === 1 ? '1fr' : itemsPerPage === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
                            }}
                        >
                            {visibleItems.map((item, index) => (
                                <div 
                                    key={startIndex + index} 
                                    className="flex justify-center"
                                    style={{ flex: itemsPerPage === 1 ? '0 0 100%' : `0 0 ${100 / itemsPerPage}%` }}
                                >
                                    {renderCard(item, startIndex + index)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botón Anterior */}
                    {canGoPrev && (
                        <button
                            onClick={handlePrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="text-gray-700" size={24} />
                        </button>
                    )}

                    {/* Botón Siguiente */}
                    {canGoNext && (
                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                            aria-label="Siguiente"
                        >
                            <ChevronRight className="text-gray-700" size={24} />
                        </button>
                    )}

                    {/* Indicadores de página */}
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentIndex 
                                        ? 'bg-pink-600 w-8' 
                                        : 'bg-gray-400 hover:bg-gray-500'
                                }`}
                                aria-label={`Ir a página ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            )}
        </div>
    );}
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-8 sm:p-2 xs:p-2 bg-gradient-to-b from-gray-100 to-pink-200 rounded-lg shadow-md min-h-auto flex items-center flex-col space-y-12">
            <div className="text-center space-y-2">
                <div className="flex justify-center items-center sm:flex-col space-x-4 sm:space-x-0  xs:space-x-0">
                    <Handshake className="text-pink-600" size={36} />
                    <h2 className="text-4xl font-extrabold text-gray-700 tracking-tight">
                        Aliados Comerciales
                    </h2>
                </div>
            </div>
            {type === "page" ? renderPageItems() : renderCarouselItems()}
        </div>
    );
};

export default AllyCarousel;