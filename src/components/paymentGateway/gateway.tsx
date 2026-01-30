import React, { lazy, useState, useEffect, useRef, useCallback } from 'react'
import { Stepper } from '../ui/stepper'
import ButtonForm from '../ui/button-forms'
import { usePurchaseContext } from '../../contexts/checkout'
import useNavigationButton from '../../hooks/useButtonNavigationGateway'
import Slider from 'react-slick'
// import { useNavigate } from 'react-router-dom'

const StepOne = lazy(() => import('./step-one'))
const StepTwo = lazy(() => import('./step-two'))
const StepThree = lazy(() => import('./step-three'))
const FinalStep = lazy(() => import('./final-step'))

const PaginacionSlider: React.FC = () => {
  // Estado para el paso actual
  const {
    currentStep,
    // setCurrentStep,
    isRegistered,
    sliderRef,
    handlePrevious,
    setResizeCallback,
  } = usePurchaseContext()
  const { text, disabled, onClick } = useNavigationButton(
    currentStep,
    isRegistered,
  )
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [sliderHeight, setSliderHeight] = useState<number | 'auto'>('auto')
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  //   const navigate = useNavigate()
  // Función para ajustar la altura del slider según el contenido del slide actual
  const adjustSliderHeight = useCallback(() => {
    if (sliderRef.current && sliderContainerRef.current) {
      // Obtener el slide actual
      const slickList = sliderContainerRef.current.querySelector(
        '.slick-list',
      ) as HTMLElement
      if (slickList) {
        const slickTrack = slickList.querySelector(
          '.slick-track',
        ) as HTMLElement
        if (slickTrack) {
          // Buscar el slide activo (el que tiene la clase slick-active o el que corresponde al currentStep)
          const slides = slickTrack.querySelectorAll('.slick-slide')
          const currentSlide = Array.from(slides).find((slide: Element) => {
            const slideElement = slide as HTMLElement
            return (
              slideElement.classList.contains('slick-active') ||
              slideElement.getAttribute('data-index') === String(currentStep)
            )
          }) as HTMLElement

          if (currentSlide) {
            // Obtener la altura del contenido del slide (el div interno)
            const slideContent = currentSlide.firstElementChild as HTMLElement
            if (slideContent) {
              // Usar scrollHeight para obtener la altura real del contenido
              const height = Math.max(
                slideContent.scrollHeight,
                slideContent.offsetHeight,
                currentSlide.offsetHeight,
              )
              setSliderHeight(height)
            } else {
              // Si no hay contenido interno, usar la altura del slide mismo
              setSliderHeight(currentSlide.offsetHeight)
            }
          }
        }
      }
    }
  }, [currentStep])

  useEffect(() => {
    setResizeCallback(() => adjustSliderHeight())
  }, [adjustSliderHeight])

  // Configuración de Slick Slider
  const settings = {
    infinite: false,
    speed: 500,
    draggable: false,
    swipe: false,
    arrows: false,
    adaptiveHeight: true, // Esta opción ayuda pero no es suficiente
    beforeChange: () => {
      setIsTransitioning(true)
    },
    afterChange: () => {
      setIsTransitioning(false)
      // Ajustar altura después de que termine la transición
      setTimeout(() => {
        adjustSliderHeight()
      }, 100)
    },
  }

  // Manejar clic en el botón "Siguiente"
  const handleNext = () => {
    if (!isTransitioning && sliderRef.current) {
      const customOnClick = onClick
      customOnClick()
    }
  }

  // Manejar clic en el botón "Anterior"
  const handlePrev = () => {
    if (!isTransitioning && sliderRef.current) {
      handlePrevious()
    }
  }

  // const exit = () => {
  //     if (!isTransitioning && sliderRef.current) {
  //         navigate('/Examen-bexa');
  //     }
  // };

  // Sincronizar el slider con el estado del paso actual (importante para cuando el paso se actualiza fuera del slider)
  useEffect(() => {
    if (sliderRef.current && !isTransitioning) {
      // Solo actualizamos el slider si no hay una transición en progreso
      sliderRef.current.slickGoTo(currentStep)
      // Ajustar altura después de cambiar de slide
      setTimeout(() => {
        adjustSliderHeight()
      }, 100)
    }
  }, [currentStep, isTransitioning, adjustSliderHeight])

  // Ajustar altura cuando el contenido cambia o se carga
  useEffect(() => {
    adjustSliderHeight()
    // También ajustar cuando la ventana cambia de tamaño
    const handleResize = () => {
      setTimeout(() => adjustSliderHeight(), 100)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentStep, adjustSliderHeight])

  // Asegúrate de que el estado de transición se restablezca después de un tiempo máximo
  // Esto es importante para evitar que los botones queden bloqueados permanentemente si algo falla
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isTransitioning) {
      timeoutId = setTimeout(() => {
        setIsTransitioning(false)
      }, 1000)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isTransitioning])

  return (
    <div className="container mx-auto py-10 px-72 xl:px-28 lg:px-16 md:px-4 sm:px-4 xs:px-4">
      {/* Título */}
      <div className="flex justify-center items-center">
        <span className="text-center text-4xl text-gray-600 sm:text-2xl mb-4 xs:text-xl">
          PASOS PARA REALIZAR LA COMPRA
        </span>
      </div>

      <Stepper currentStep={currentStep} />

      {/* Slider */}
      <div
        ref={sliderContainerRef}
        style={{
          height: sliderHeight === 'auto' ? 'auto' : `${sliderHeight}px`,
          transition: 'height 0.3s ease-in-out',
          overflow: 'hidden',
          // paddingBottom: '100px'
        }}
      >
        <Slider {...settings} ref={sliderRef}>
          <div>
            <StepOne />
          </div>
          <div className="pb-10">
            <StepTwo />
          </div>
          <div>
            <StepThree />
          </div>
          <div>
            <FinalStep />
          </div>
        </Slider>
      </div>

      {/* Botones de navegación */}
      <div
        className={`flex justify-between px-6 ${
          currentStep === 0 ? 'justify-end' : 'justify-between'
        }`}
      >
        {currentStep !== 3 && (
          <>
            <ButtonForm
              onClick={handlePrev}
              disabled={isTransitioning}
              text="Anterior"
              className={currentStep === 0 ? 'hidden' : ''}
            />
            <ButtonForm
              onClick={handleNext}
              disabled={disabled || isTransitioning}
              text={text}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default PaginacionSlider
