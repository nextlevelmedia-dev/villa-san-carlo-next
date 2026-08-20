"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

const images = [
  {
    src: "/image/location-villa-san-carlo.PNG",
    alt: "Villa San Carlo durante un ricevimento",
  },
  {
    src: "/image/villa-sera.PNG",
    alt: "Giardino di Villa San Carlo alla sera",
  },
  {
    src: "/image/portico.PNG",
    alt: "Portico storico di Villa San Carlo",
  },
  {
    src: "/image/value-ospitalita.PNG",
    alt: "Spazi esterni di Villa San Carlo",
  },
  {
    src: "/image/value-event.PNG",
    alt: "Allestimento per evento a Villa San Carlo",
  },
  {
    src: "/image/eventi-privati.PNG",
    alt: "Evento privato a Villa San Carlo",
  },
  {
    src: "/image/location-eventi.PNG",
    alt: "Sala per eventi e meeting",
  },
  {
    src: "/image/soggiorno.JPG",
    alt: "Camera per il soggiorno a Villa San Carlo",
  },
  {
    src: "/image/giardino.png",
    alt: "Giardino di Villa San Carlo",
  },
  {
    src: "/image/about-villa.PNG",
    alt: "Esterno storico di Villa San Carlo",
  },
  {
    src: "/image/evento01.JPG",
    alt: "Corte di Villa San Carlo",
  },
  {
    src: "/image/festa.png",
    alt: "Tavolo allestito per una festa",
  },
  {
    src: "/image/ospitalita.png",
    alt: "Spazio esterno per ospitalità",
  },
  {
    src: "/image/buchirale.png",
    alt: "Sala storica allestita",
  },
  {
    src: "/image/cortile-agri.png",
    alt: "Cortile di Villa San Carlo",
  },
  {
    src: "/image/matrimonio-cortile.png",
    alt: "Matrimonio nel cortile della villa",
  },
  {
    src: "/image/matrimonio-giardino.png",
    alt: "Ricevimento nel giardino",
  },
  {
    src: "/image/final-cta.jpg",
    alt: "Allestimento elegante a Villa San Carlo",
  },
];

type CardPosition = {
  baseX: number;
  baseY: number;
  startY: number;
  ySpeed: number;
  xSetter: ReturnType<typeof gsap.quickSetter>;
  ySetter: ReturnType<typeof gsap.quickSetter>;
};

export default function InfiniteGallery() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  /* =========================================================
     LIGHTBOX KEYBOARD + BODY LOCK
  ========================================================= */

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  /* =========================================================
     INFINITE GALLERY
  ========================================================= */

  useEffect(() => {
    gsap.registerPlugin(Observer);

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const collection = wrapper.querySelector<HTMLElement>(
      "[data-gallery-collection]"
    );

    const sourceList = wrapper.querySelector<HTMLElement>(
      "[data-gallery-list]"
    );

    if (!collection || !sourceList) return;

    const originalItems = Array.from(
      sourceList.querySelectorAll<HTMLElement>("[data-gallery-item]")
    ).map((item) => item.cloneNode(true) as HTMLElement);

    if (!originalItems.length) return;

    const isMobile = window.innerWidth < 768;

    const wheelSpeed = isMobile ? 0.2 : 0.32;
    const dragSpeed = isMobile ? 0.48 : 0.7;
    const gridOverscan = isMobile ? 0 : 1;
    const startOffsetY = isMobile ? 0.14 : 0.22;
    const positionLerp = isMobile ? 0.11 : 0.07;
    const xToYInfluence = isMobile ? 0.03 : 0.08;

    const columnSpeedPattern = isMobile
      ? [1, 0.98]
      : [1, 0.96, 1.03];

    const minCardScale = isMobile ? 0.98 : 0.92;
    const scaleLerp = isMobile ? 0.14 : 0.06;

    let observer: Observer | undefined;

    let cards: CardPosition[] = [];
    let cardElements: HTMLElement[] = [];

    const size = {
      itemW: 0,
      itemH: 0,
      totalW: 0,
      totalH: 0,
    };

    const pos = {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const scale = {
      current: 1,
      target: 1,
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    let scaleTimer: ReturnType<typeof setTimeout>;

    const wrapValue = (value: number, max: number) => {
      if (!max) return 0;
      return ((value % max) + max) % max;
    };

    const createColumnSpeeds = (columns: number) => {
      return Array.from(
        { length: columns },
        (_, index) =>
          columnSpeedPattern[index % columnSpeedPattern.length]
      );
    };

    const createItemIndexes = (columns: number, rows: number) => {
      const total = originalItems.length;

      const indexes: number[][] = Array.from(
        { length: rows },
        () => []
      );

      let currentIndex = 0;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          indexes[row][column] = currentIndex % total;
          currentIndex++;
        }
      }

      return indexes;
    };

    const updateGrid = () => {
      pos.x += (pos.targetX - pos.x) * positionLerp;
      pos.y += (pos.targetY - pos.y) * positionLerp;

      scale.current +=
        (scale.target - scale.current) * scaleLerp;

      const offsetX = size.itemW * gridOverscan;
      const offsetY = size.itemH * gridOverscan;

      const scrollY = pos.y - pos.startY;

      cards.forEach(
        ({
          baseX,
          baseY,
          startY,
          ySpeed,
          xSetter,
          ySetter,
        }) => {
          xSetter(
            wrapValue(
              baseX + pos.x + offsetX,
              size.totalW
            ) - offsetX
          );

          ySetter(
            wrapValue(
              baseY +
                pos.startY +
                startY +
                scrollY * ySpeed +
                offsetY,
              size.totalH
            ) - offsetY
          );
        }
      );

      if (!isMobile) {
        gsap.set(cardElements, {
          scale: scale.current,
        });
      }
    };

    const buildGrid = () => {
      observer?.kill();

      clearTimeout(resizeTimer);
      clearTimeout(scaleTimer);

      gsap.ticker.remove(updateGrid);

      sourceList.innerHTML = "";

      const measureItem = originalItems[0].cloneNode(
        true
      ) as HTMLElement;

      measureItem.style.position = "absolute";
      measureItem.style.visibility = "hidden";
      measureItem.style.pointerEvents = "none";

      wrapper.appendChild(measureItem);

      const rect = measureItem.getBoundingClientRect();

      size.itemW = rect.width;
      size.itemH = rect.height;

      measureItem.remove();

      if (!size.itemW || !size.itemH) return;

      const columns = Math.max(
        2,
        Math.ceil(wrapper.clientWidth / size.itemW) +
          gridOverscan * 2
      );

      const rows = Math.max(
        isMobile ? 3 : 4,
        Math.ceil(wrapper.clientHeight / size.itemH) +
          gridOverscan * 2
      );

      const indexes = createItemIndexes(columns, rows);
      const columnSpeeds = createColumnSpeeds(columns);

      const fragment = document.createDocumentFragment();

      const centerColumn = Math.floor(columns / 2);
      const centerRow = Math.floor(rows / 2);

      size.totalW = columns * size.itemW;
      size.totalH = rows * size.itemH;

      cards = [];
      cardElements = [];

      collection.style.width = `${size.totalW}px`;
      collection.style.height = `${size.totalH}px`;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const item = originalItems[
            indexes[row][column]
          ].cloneNode(true) as HTMLElement;

          const card =
            item.querySelector<HTMLElement>(
              "[data-gallery-card]"
            );

          cards.push({
            baseX: column * size.itemW,
            baseY: row * size.itemH,

            startY:
              (column - centerColumn) *
              size.itemH *
              startOffsetY,

            ySpeed: columnSpeeds[column],

            xSetter: gsap.quickSetter(
              item,
              "x",
              "px"
            ),

            ySetter: gsap.quickSetter(
              item,
              "y",
              "px"
            ),
          });

          if (card) {
            cardElements.push(card);
          }

          fragment.appendChild(item);
        }
      }

      sourceList.appendChild(fragment);

      pos.startX =
        wrapper.clientWidth * 0.5 -
        centerColumn * size.itemW -
        size.itemW * 0.5;

      pos.startY =
        wrapper.clientHeight * 0.5 -
        centerRow * size.itemH -
        size.itemH * 0.5;

      pos.x = pos.startX;
      pos.y = pos.startY;

      pos.targetX = pos.x;
      pos.targetY = pos.y;

      scale.current = 1;
      scale.target = 1;

      updateGrid();

      gsap.ticker.add(updateGrid);

      observer = Observer.create({
        target: wrapper,

        type: isMobile
          ? "touch,pointer"
          : "wheel,touch,pointer",

        preventDefault: true,

        dragMinimum: isMobile ? 5 : 3,

        onChange(self) {
          const event = self.event as Event;

          const isWheel = event.type === "wheel";

          const speed = isWheel
            ? wheelSpeed
            : dragSpeed;

          const deltaX = gsap.utils.clamp(
            -60,
            60,
            self.deltaX * speed
          );

          const deltaY = gsap.utils.clamp(
            -60,
            60,
            self.deltaY * speed
          );

          const moveX = isWheel
            ? -deltaX
            : deltaX;

          const moveY = isWheel
            ? -deltaY
            : deltaY;

          if (!isMobile) {
            const strength = gsap.utils.clamp(
              0,
              1,
              Math.max(
                Math.abs(deltaX),
                Math.abs(deltaY)
              ) / 60
            );

            scale.target = gsap.utils.interpolate(
              1,
              minCardScale,
              strength
            );

            clearTimeout(scaleTimer);

            scaleTimer = setTimeout(() => {
              scale.target = 1;
            }, 120);
          }

          pos.targetX += moveX;

          pos.targetY +=
            moveY +
            moveX * xToYInfluence;
        },
      });
    };

    buildGrid();

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        buildGrid();
      }, 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer?.kill();

      clearTimeout(resizeTimer);
      clearTimeout(scaleTimer);

      gsap.ticker.remove(updateGrid);

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <>
      {/* =========================================================
          INFINITE GRID
      ========================================================= */}

      <div
        ref={wrapperRef}
        className="
          relative
          h-[72svh]
          min-h-[540px]
          w-full
          cursor-grab
          overflow-hidden
          bg-[#F8F5F0]
          touch-none
          active:cursor-grabbing

          md:h-[82svh]
          md:min-h-[620px]

          lg:h-[86svh]
        "
      >
        <div
          data-gallery-collection
          className="absolute inset-0"
        >
          <div
            data-gallery-list
            className="absolute inset-0"
          >
            {images.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                data-gallery-item
                className="
                  absolute
                  left-0
                  top-0
                  flex
                  aspect-square
                  w-[190px]
                  items-center
                  justify-center
                  p-3

                  sm:w-[220px]
                  sm:p-4

                  md:w-[280px]
                  md:p-6

                  lg:w-[330px]
                  lg:p-7

                  xl:w-[360px]
                "
                style={{
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}
              >
                <button
                  type="button"
                  data-gallery-card
                  onClick={() => openLightbox(index)}
                  className="
                    group
                    relative
                    h-full
                    w-full
                    overflow-hidden
                    bg-[#E9DFD4]
                    text-left
                    shadow-[0_10px_28px_rgba(59,33,24,0.06)]
                  "
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                  aria-label={`Apri immagine ${index + 1}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={72}
                    sizes="
                      (max-width: 640px) 180px,
                      (max-width: 768px) 220px,
                      (max-width: 1024px) 280px,
                      360px
                    "
                    className="
                      pointer-events-none
                      select-none
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-[1.025]
                    "
                    draggable={false}
                  />

                  {/* HOVER DESKTOP */}
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.04]" />

                  <div className="pointer-events-none absolute bottom-4 right-4 hidden h-9 w-9 items-center justify-center bg-[#F8F5F0]/90 text-[#4A281B] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
                    <span className="text-lg leading-none">+</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* HINT */}
        <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 bg-[#F8F5F0]/90 px-4 py-2.5 backdrop-blur-sm md:bottom-6 md:px-5 md:py-3">
          <p className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.2em] text-[#8A7160] md:text-[10px] md:tracking-[0.22em]">
            Trascina per esplorare · Clicca per ingrandire
          </p>
        </div>
      </div>

      {/* =========================================================
          LIGHTBOX
      ========================================================= */}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#241711]/95 px-4 py-5 backdrop-blur-sm md:px-10 md:py-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Galleria immagini"
        >
          {/* TOP BAR */}
          <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between md:left-10 md:right-10 md:top-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#F8F5F0]/70">
              Villa San Carlo
            </p>

            <div className="flex items-center gap-5">
              <span className="text-[10px] tracking-[0.16em] text-[#F8F5F0]/60">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  closeLightbox();
                }}
                className="flex h-11 w-11 items-center justify-center border border-white/20 text-[#F8F5F0] transition-colors hover:border-white/60"
                aria-label="Chiudi galleria"
              >
                <span className="relative block h-4 w-4">
                  <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <div
            className="relative h-[72svh] w-full max-w-[1200px] md:h-[80svh]"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStartX.current =
                event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;

              const endX =
                event.changedTouches[0]?.clientX ?? 0;

              const difference =
                endX - touchStartX.current;

              if (difference > 50) {
                showPrevious();
              }

              if (difference < -50) {
                showNext();
              }

              touchStartX.current = null;
            }}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* PREVIOUS */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="
              absolute
              left-3
              top-1/2
              z-20
              flex
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              border
              border-white/20
              text-[#F8F5F0]
              transition-all
              hover:border-white/60

              md:left-8
              md:h-14
              md:w-14
            "
            aria-label="Immagine precedente"
          >
            ←
          </button>

          {/* NEXT */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="
              absolute
              right-3
              top-1/2
              z-20
              flex
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              border
              border-white/20
              text-[#F8F5F0]
              transition-all
              hover:border-white/60

              md:right-8
              md:h-14
              md:w-14
            "
            aria-label="Immagine successiva"
          >
            →
          </button>

          {/* CAPTION */}
          <div className="absolute bottom-5 left-1/2 z-20 w-[calc(100%-40px)] max-w-[700px] -translate-x-1/2 text-center md:bottom-8">
            <p className="text-xs leading-5 text-[#F8F5F0]/65 md:text-sm">
              {images[activeIndex].alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}