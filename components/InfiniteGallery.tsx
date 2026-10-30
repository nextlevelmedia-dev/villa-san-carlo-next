"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

const images = [
  {
    src: "/images/location-villa-san-carlo.jpg",
    alt: "Villa San Carlo durante un ricevimento",
  },
  {
    src: "/images/villa-sera.jpg",
    alt: "Villa San Carlo alla sera",
  },
  {
    src: "/images/portico.jpg",
    alt: "Portico storico di Villa San Carlo",
  },
  {
    src: "/images/value-ospitalita.jpg",
    alt: "Spazi esterni di Villa San Carlo",
  },
  {
    src: "/images/value-event.jpg",
    alt: "Allestimento per evento a Villa San Carlo",
  },
  {
    src: "/images/eventi-privati.jpg",
    alt: "Evento privato a Villa San Carlo",
  },
  {
    src: "/images/location-eventi.jpg",
    alt: "Sala per eventi e meeting",
  },
  {
    src: "/images/soggiorno.jpg",
    alt: "Soggiorno a Villa San Carlo",
  },
  {
    src: "/images/giardino.jpg",
    alt: "Giardino di Villa San Carlo",
  },
  {
    src: "/images/about-villa.jpg",
    alt: "Villa San Carlo",
  },
  {
    src: "/images/evento01.jpg",
    alt: "Evento a Villa San Carlo",
  },
  {
    src: "/images/festa.jpg",
    alt: "Festa a Villa San Carlo",
  },
  {
    src: "/images/ospitalita.jpg",
    alt: "Ospitalità a Villa San Carlo",
  },
  {
    src: "/images/buchirale.jpg",
    alt: "Sala storica di Villa San Carlo",
  },
  {
    src: "/images/cortile-agri.jpg",
    alt: "Cortile di Villa San Carlo",
  },
  {
    src: "/images/matrimonio-cortile.jpg",
    alt: "Matrimonio nel cortile di Villa San Carlo",
  },
  {
    src: "/images/matrimonio-giardino.jpg",
    alt: "Ricevimento nel giardino di Villa San Carlo",
  },
  {
    src: "/images/final-cta.jpg",
    alt: "Atmosfera di Villa San Carlo",
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

  const previousImage = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  /* =========================================================
     LIGHTBOX
  ========================================================= */

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === 0 ? images.length - 1 : current - 1
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === images.length - 1 ? 0 : current + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [lightboxOpen]);

  /* =========================================================
     INFINITE GRID
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

    /* MOVIMENTO COME PRIMA VERSIONE */

    const wheelSpeed = 0.32;
    const dragSpeed = 0.7;

    const gridOverscan = 1;

    const startOffsetY = 0.22;

    const positionLerp = 0.07;

    const xToYInfluence = 0.08;

    const columnSpeedPattern = [1, 0.96, 1.03];

    const minCardScale = 0.92;

    const scaleLerp = 0.06;

    let observer: Observer | undefined;

    let cards: CardPosition[] = [];

    let cardElements: HTMLElement[] = [];

    const size = {
      itemW: 0,
      itemH: 0,
      totalW: 0,
      totalH: 0,
    };

    const position = {
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

    const createIndexes = (columns: number, rows: number) => {
      const total = originalItems.length;

      const indexes: number[][] = Array.from(
        { length: rows },
        () => []
      );

      let imageIndex = 0;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          indexes[row][column] = imageIndex % total;

          imageIndex++;
        }
      }

      return indexes;
    };

    /* =========================================================
       ANIMATION LOOP
    ========================================================= */

    const updateGrid = () => {
      position.x +=
        (position.targetX - position.x) * positionLerp;

      position.y +=
        (position.targetY - position.y) * positionLerp;

      scale.current +=
        (scale.target - scale.current) * scaleLerp;

      const offsetX = size.itemW * gridOverscan;

      const offsetY = size.itemH * gridOverscan;

      const scrollY =
        position.y - position.startY;

      cards.forEach((card) => {
        card.xSetter(
          wrapValue(
            card.baseX +
              position.x +
              offsetX,
            size.totalW
          ) - offsetX
        );

        card.ySetter(
          wrapValue(
            card.baseY +
              position.startY +
              card.startY +
              scrollY * card.ySpeed +
              offsetY,
            size.totalH
          ) - offsetY
        );
      });

      gsap.set(cardElements, {
        scale: scale.current,
      });
    };

    /* =========================================================
       BUILD GRID
    ========================================================= */

    const buildGrid = () => {
      observer?.kill();

      clearTimeout(scaleTimer);

      gsap.ticker.remove(updateGrid);

      sourceList.innerHTML = "";

      const measurementItem =
        originalItems[0].cloneNode(true) as HTMLElement;

      measurementItem.style.position = "absolute";

      measurementItem.style.visibility = "hidden";

      measurementItem.style.pointerEvents = "none";

      wrapper.appendChild(measurementItem);

      const rect =
        measurementItem.getBoundingClientRect();

      size.itemW = rect.width;
      size.itemH = rect.height;

      measurementItem.remove();

      if (!size.itemW || !size.itemH) return;

      const columns = Math.max(
        1,
        Math.ceil(wrapper.clientWidth / size.itemW) +
          gridOverscan * 2
      );

      const rows = Math.max(
        Math.ceil(wrapper.clientHeight / size.itemH) +
          gridOverscan * 2,

        Math.ceil(originalItems.length / columns)
      );

      const indexes =
        createIndexes(columns, rows);

      const columnSpeeds =
        createColumnSpeeds(columns);

      const centerColumn =
        Math.floor(columns / 2);

      const centerRow =
        Math.floor(rows / 2);

      size.totalW =
        columns * size.itemW;

      size.totalH =
        rows * size.itemH;

      collection.style.width =
        `${size.totalW}px`;

      collection.style.height =
        `${size.totalH}px`;

      cards = [];

      cardElements = [];

      const fragment =
        document.createDocumentFragment();

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const sourceIndex =
            indexes[row][column];

          const item =
            originalItems[sourceIndex].cloneNode(
              true
            ) as HTMLElement;

          const card =
            item.querySelector<HTMLElement>(
              "[data-gallery-card]"
            );

          /*
            cloneNode non copia gli onClick React.

            Quindi mettiamo l'indice direttamente
            sull'elemento clonato.
          */

          if (card) {
            card.dataset.galleryOpen =
              String(sourceIndex);

            cardElements.push(card);
          }

          cards.push({
            baseX:
              column * size.itemW,

            baseY:
              row * size.itemH,

            startY:
              (column - centerColumn) *
              size.itemH *
              startOffsetY,

            ySpeed:
              columnSpeeds[column],

            xSetter:
              gsap.quickSetter(
                item,
                "x",
                "px"
              ),

            ySetter:
              gsap.quickSetter(
                item,
                "y",
                "px"
              ),
          });

          if (
            cards.length >
            originalItems.length
          ) {
            item.setAttribute(
              "aria-hidden",
              "true"
            );
          }

          fragment.appendChild(item);
        }
      }

      sourceList.appendChild(fragment);

      gsap.set(cardElements, {
        force3D: true,
      });

      position.startX =
        wrapper.clientWidth * 0.5 -
        centerColumn * size.itemW -
        size.itemW * 0.5;

      position.startY =
        wrapper.clientHeight * 0.5 -
        centerRow * size.itemH -
        size.itemH * 0.5;

      position.x =
        position.startX;

      position.y =
        position.startY;

      position.targetX =
        position.x;

      position.targetY =
        position.y;

      scale.current = 1;

      scale.target = 1;

      updateGrid();

      gsap.ticker.add(updateGrid);

      /* =========================================================
         OBSERVER
      ========================================================= */

      observer = Observer.create({
        target: wrapper,

        type: "wheel,touch,pointer",

        preventDefault: true,

        dragMinimum: 3,

        onChange(self) {
          const isWheel =
            self.event.type === "wheel";

          const speed =
            isWheel
              ? wheelSpeed
              : dragSpeed;

          const deltaX =
            gsap.utils.clamp(
              -80,
              80,
              self.deltaX * speed
            );

          const deltaY =
            gsap.utils.clamp(
              -80,
              80,
              self.deltaY * speed
            );

          const moveX =
            isWheel
              ? -deltaX
              : deltaX;

          const moveY =
            isWheel
              ? -deltaY
              : deltaY;

          const strength =
            gsap.utils.clamp(
              0,
              1,
              Math.max(
                Math.abs(deltaX),
                Math.abs(deltaY)
              ) / 80
            );

          scale.target =
            gsap.utils.interpolate(
              1,
              minCardScale,
              strength
            );

          clearTimeout(scaleTimer);

          scaleTimer =
            setTimeout(() => {
              scale.target = 1;
            }, 120);

          position.targetX +=
            moveX;

          position.targetY +=
            moveY +
            moveX * xToYInfluence;
        },
      });
    };

    /* =========================================================
       CLICK DELEGATION
    ========================================================= */

    let startX = 0;
    let startY = 0;

    let dragging = false;

    const handlePointerDown = (
      event: PointerEvent
    ) => {
      startX = event.clientX;
      startY = event.clientY;

      dragging = false;
    };

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const x =
        Math.abs(
          event.clientX - startX
        );

      const y =
        Math.abs(
          event.clientY - startY
        );

      if (x > 8 || y > 8) {
        dragging = true;
      }
    };

    const handleClick = (
      event: MouseEvent
    ) => {
      if (dragging) {
        dragging = false;
        return;
      }

      const target =
        event.target as HTMLElement;

      const card =
        target.closest<HTMLElement>(
          "[data-gallery-open]"
        );

      if (!card) return;

      const index =
        Number(
          card.dataset.galleryOpen
        );

      if (Number.isNaN(index)) {
        return;
      }

      setActiveIndex(index);

      setLightboxOpen(true);
    };

    wrapper.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    wrapper.addEventListener(
      "pointermove",
      handlePointerMove
    );

    wrapper.addEventListener(
      "click",
      handleClick
    );

    buildGrid();

    /* =========================================================
       RESIZE
    ========================================================= */

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(() => {
          buildGrid();
        }, 250);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      observer?.kill();

      clearTimeout(resizeTimer);

      clearTimeout(scaleTimer);

      gsap.ticker.remove(updateGrid);

      window.removeEventListener(
        "resize",
        handleResize
      );

      wrapper.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      wrapper.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      wrapper.removeEventListener(
        "click",
        handleClick
      );
    };
  }, []);

  return (
    <>
      {/* =========================================================
          GALLERY
      ========================================================= */}

      <div
        ref={wrapperRef}
        className="
          relative
          h-[calc(100svh-80px)]
          w-full
          cursor-grab
          touch-none
          overflow-hidden
          bg-[#F8F5F0]
          active:cursor-grabbing
        "
      >
        <div
          data-gallery-collection
          className="
            absolute
            inset-0
            will-change-transform
          "
        >
          <div
            data-gallery-list
            className="absolute inset-0"
          >
            {images.map(
              (
                image,
                index
              ) => (
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
                    willChange:
                      "transform",

                    backfaceVisibility:
                      "hidden",
                  }}
                >
                  <button
                    type="button"
                    data-gallery-card
                    data-gallery-open={
                      index
                    }
                    aria-label={`Apri immagine ${
                      index + 1
                    }`}
                    className="
                      group
                      relative
                      h-full
                      w-full
                      overflow-hidden
                      bg-[#E8DED4]
                      shadow-[0_8px_24px_rgba(59,33,24,0.05)]
                    "
                  >
                    <Image
                      src={
                        image.src
                      }
                      alt={
                        image.alt
                      }
                      fill
                      quality={75}
                      loading={
                        index < 6
                          ? "eager"
                          : "lazy"
                      }
                      sizes="
                        (max-width: 640px) 190px,
                        (max-width: 768px) 220px,
                        (max-width: 1024px) 280px,
                        360px
                      "
                      draggable={
                        false
                      }
                      className="
                        pointer-events-none
                        select-none
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.025]
                      "
                    />

                    {/* ICONA + DESKTOP */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        bottom-4
                        right-4
                        hidden
                        h-9
                        w-9
                        items-center
                        justify-center
                        bg-[#F8F5F0]/90
                        text-[#4A281B]
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100

                        md:flex
                      "
                    >
                      +
                    </div>
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* HINT */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-6
            left-1/2
            z-20
            -translate-x-1/2
            border
            border-[#D8CABB]/70
            bg-[#F8F5F0]/90
            px-5
            py-3
            backdrop-blur-sm
          "
        >
          <p className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.2em] text-[#8A7160] md:text-[10px]">
            Trascina · Clicca per ingrandire
          </p>
        </div>
      </div>

      {/* =========================================================
          LIGHTBOX
      ========================================================= */}

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery Villa San Carlo"
          onClick={() =>
            setLightboxOpen(false)
          }
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-[#21140F]/95
            px-4
            py-5
            backdrop-blur-sm

            md:px-10
            md:py-8
          "
        >
          {/* TOPBAR */}
          <div className="absolute left-5 right-5 top-5 z-30 flex items-center justify-between md:left-10 md:right-10 md:top-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/65">
              Villa San Carlo
            </p>

            <div className="flex items-center gap-5">
              <span className="text-[10px] tracking-[0.16em] text-white/60">
                {String(
                  activeIndex + 1
                ).padStart(2, "0")}
                {" / "}
                {String(
                  images.length
                ).padStart(2, "0")}
              </span>

              <button
                type="button"
                aria-label="Chiudi gallery"
                onClick={(event) => {
                  event.stopPropagation();

                  setLightboxOpen(false);
                }}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  border
                  border-white/20
                  text-white
                  transition-colors
                  hover:border-white/60
                "
              >
                <span className="relative block h-4 w-4">
                  <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />

                  <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              </button>
            </div>
          </div>

          {/* FOTO GRANDE */}
          <div
            className="
              relative
              h-[76svh]
              w-full
              max-w-[1300px]

              md:h-[82svh]
            "
            onClick={(event) =>
              event.stopPropagation()
            }
            onTouchStart={(event) => {
              touchStartX.current =
                event.touches[0]?.clientX ??
                null;
            }}
            onTouchEnd={(event) => {
              if (
                touchStartX.current === null
              ) {
                return;
              }

              const endX =
                event.changedTouches[0]?.clientX ??
                0;

              const distance =
                endX -
                touchStartX.current;

              if (distance > 50) {
                previousImage();
              }

              if (distance < -50) {
                nextImage();
              }

              touchStartX.current = null;
            }}
          >
            <Image
              src={
                images[activeIndex].src
              }
              alt={
                images[activeIndex].alt
              }
              fill
              loading="eager"
              quality={85}
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* PREVIOUS */}
          <button
            type="button"
            aria-label="Foto precedente"
            onClick={(event) => {
              event.stopPropagation();

              previousImage();
            }}
            className="
              absolute
              left-3
              top-1/2
              z-30
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              border
              border-white/20
              bg-[#21140F]/25
              text-white
              backdrop-blur-sm

              md:left-8
              md:h-14
              md:w-14
            "
          >
            ←
          </button>

          {/* NEXT */}
          <button
            type="button"
            aria-label="Foto successiva"
            onClick={(event) => {
              event.stopPropagation();

              nextImage();
            }}
            className="
              absolute
              right-3
              top-1/2
              z-30
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              border
              border-white/20
              bg-[#21140F]/25
              text-white
              backdrop-blur-sm

              md:right-8
              md:h-14
              md:w-14
            "
          >
            →
          </button>

          {/* CAPTION */}
          <div className="absolute bottom-5 left-1/2 z-30 w-[calc(100%-40px)] max-w-[700px] -translate-x-1/2 text-center md:bottom-8">
            <p className="text-xs leading-5 text-white/60 md:text-sm">
              {images[activeIndex].alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}