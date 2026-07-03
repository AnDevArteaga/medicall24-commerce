import React, { useCallback, useEffect, useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { softwareSliderSlides, type SliderItem } from './software-slider-data'

const CARD_WIDTH =
  'w-full max-w-sm mx-auto sm:max-w-none sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-7.5rem)/4)] xl:w-[calc((100%-9rem)/4)] shrink-0'

const imageCache = new Map<string, string>()

const SlideImage: React.FC<{
  item: SliderItem
  index: number
  slideIndex: number
  priority?: boolean
}> = ({ item, index, slideIndex, priority = false }) => {
  const cacheKey = `${slideIndex}-${index}`
  const [src, setSrc] = useState<string | undefined>(
    () => imageCache.get(cacheKey),
  )

  useEffect(() => {
    if (!item.imageLoader) return
    if (imageCache.has(cacheKey)) {
      setSrc(imageCache.get(cacheKey))
      return
    }

    let cancelled = false
    item.imageLoader().then((mod) => {
      if (cancelled) return
      imageCache.set(cacheKey, mod.default)
      setSrc(mod.default)
    })

    return () => {
      cancelled = true
    }
  }, [item, cacheKey])

  if (src) {
    return (
      <div className="w-full overflow-hidden">
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>
    )
  }

  return (
    <div className="w-full aspect-[4/3] rounded-3xl border border-white/70 bg-slate-300/60 flex items-center justify-center shadow-sm animate-pulse">
      <span className="sr-only">Cargando imagen</span>
    </div>
  )
}

const SeguridadSlider: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const total = softwareSliderSlides.length

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + total) % total)
    },
    [total],
  )

  const goNext = useCallback(() => goTo(current + 1), [current, goTo])
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo])

  // Precarga el siguiente slide
  useEffect(() => {
    const next = (current + 1) % total
    const slide = softwareSliderSlides[next]
    const timer = window.setTimeout(() => {
      slide.items.forEach((item, index) => {
        const key = `${next}-${index}`
        if (imageCache.has(key) || !item.imageLoader) return
        void item.imageLoader().then((mod) => {
          imageCache.set(key, mod.default)
        })
      })
    }, 200)
    return () => window.clearTimeout(timer)
  }, [current, total])

  const slide = softwareSliderSlides[current]

  return (
    <section className="w-full bg-[#D1D8DC] px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.h2
            key={`title-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="text-center text-slate-800 text-lg sm:text-xl lg:text-2xl xl:text-5xl leading-snug max-w-5xl mx-auto mb-10 sm:mb-12 lg:mb-14 px-2"
          >
            {slide.title}
          </motion.h2>
        </AnimatePresence>

        <div className="relative">
          <button
            type="button"
            onClick={goPrev}
            className="hidden lg:flex xl:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 text-primary hover:text-primarydark transition-colors p-2"
            aria-label="Slide anterior"
          >
            <ChevronLeft
              className="w-8 h-8 xl:w-10 xl:h-10"
              strokeWidth={1.5}
            />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-primary hover:text-primarydark transition-colors p-2"
            aria-label="Slide siguiente"
          >
            <ChevronRight
              className="w-8 h-8 sm:w-10 sm:h-10 xl:w-12 xl:h-12"
              strokeWidth={1.5}
            />
          </button>

          <div className="px-8 sm:px-12 lg:px-14 xl:px-16 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12"
              >
                {slide.items.map((item, index) => (
                  <div
                    key={`${current}-${index}`}
                    className={`flex flex-col gap-3 sm:gap-4 ${CARD_WIDTH}`}
                  >
                    <SlideImage
                      item={item}
                      index={index}
                      slideIndex={current}
                      priority={current === 0 && index < 2}
                    />
                    <p className="text-center text-slate-700 text-xs sm:text-sm lg:text-base xl:text-base leading-relaxed px-1">
                      {item.caption}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-10 sm:mt-12 lg:mt-14 xl:mt-16">
          {softwareSliderSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ir al slide ${index + 1}`}
              aria-current={index === current ? 'true' : undefined}
              className={`rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-10 sm:w-12 h-2.5 bg-primary'
                  : 'w-2.5 h-2.5 bg-white border-2 border-primary hover:scale-110'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SeguridadSlider
