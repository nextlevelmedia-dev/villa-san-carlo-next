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
    alt: "Villa San Carlo alla sera",
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
    alt: "Soggiorno a Villa San Carlo",
  },
  {
    src: "/image/giardino.png",
    alt: "Giardino di Villa San Carlo",
  },
  {
    src: "/image/about-villa.PNG",
    alt: "Villa San Carlo",
  },
  {
    src: "/image/evento01.JPG",
    alt: "Evento a Villa San Carlo",
  },
  {
    src: "/image/festa.png",
    alt: "Festa a Villa San Carlo",
  },
  {
    src: "/image/ospitalita.png",
    alt: "Ospitalità a Villa San Carlo",
  },
  {
    src: "/image/buchirale.png",
    alt: "Sala storica di Villa San Carlo",
  },
  {
    src: "/image/cortile-agri.png",
    alt: "Cortile di Villa San Carlo",
  },
  {
    src: "/image/matrimonio-cortile.png",
    alt: "Matrimonio nel cortile di Villa San Carlo",
  },
  {
    src: "/image/matrimonio-giardino.png",
    alt: "Matrimonio nel giardino di Villa San Carlo",
  },
  {
    src: "/image/final-cta.jpg",
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
     LIGHTBOX
  ========================================================= */

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyboard = (event: KeyboardEvent) => {
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

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyboard);
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

    let observer: Observer | undefined;

    let cards: CardPosition[] = [];

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

    let resizeTimer: ReturnType<typeof setTimeout>;

    let isMobile = window.innerWidth < 768;

    /*
      MOBILE:
      - meno celle
      - niente scale
      - niente wheel interception
      - movimento più diretto
    */

    const getSettings = () => {
      isMobile = window.innerWidth < 768;

      return {
        dragSpeed: isMobile ? 0.44 : 0.68,
        wheelSpeed: isMobile ? 0 : 0.22,
        overscan: isMobile ? 0 : 1,
        offsetY: isMobile ? 0.12 : 0.2,
        lerp: isMobile ? 0.14 : 0.075,
        xToY: isMobile ? 0.015 : 0.055,
        columnSpeeds: isMobile
          ? [1, 0.98]
          : [1, 0.97, 1.02],
      };
    };

    let settings = getSettings();

    const wrap = (value: number, max: number) => {
      if (!max) return 0;

      return ((value % max) + max) % max;
    };

    const updateGrid = () => {
      pos.x += (pos.targetX - pos.x) * settings.lerp;
      pos.y += (pos.targetY - pos.y) * settings.lerp;

      const offsetX = size.itemW * settings.overscan;
      const offsetY = size.itemH * settings.overscan;

      const scrollY = pos.y - pos.startY;

      cards.forEach((card) => {
        card.xSetter(
          wrap(
            card.baseX + pos.x + offsetX,
            size.totalW
          ) - offsetX
        );

        card.ySetter(
          wrap(
            card.baseY +
              pos.startY +
              card.startY +
              scrollY * card.ySpeed +
              offsetY,
            size.totalH
          ) - offsetY
        );
      });
    };

    const buildGrid = () => {
      observer?.kill();

      gsap.ticker.remove(updateGrid);

      settings = getSettings();

      sourceList.innerHTML = "";

      const measureItem = originalItems[0].cloneNode(true) as HTMLElement;

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
          settings.overscan * 2
      );

      /*
        Su mobile teniamo poche righe.
        È una delle ottimizzazioni più importanti.
      */
      const rows = isMobile
        ? 4
        : Math.max(
            4,
            Math.ceil(wrapper.clientHeight / size.itemH) +
              settings.overscan * 2
          );

      const centerColumn = Math.floor(columns / 2);
      const centerRow = Math.floor(rows / 2);

      size.totalW = columns * size.itemW;
      size.totalH = rows * size.itemH;

      collection.style.width = `${size.totalW}px`;
      collection.style.height = `${size.totalH}px`;

      cards = [];

      const fragment = document.createDocumentFragment();

      let imageIndex = 0;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const sourceIndex = imageIndex % originalItems.length;

          const item = originalItems[sourceIndex].cloneNode(
            true
          ) as HTMLElement;

          /*
            IMPORTANTISSIMO:
            cloneNode non copia gli event listener React.

            Salviamo quindi l'indice nel DOM e poi
            intercettiamo il click dal wrapper.
          */
          const button = item.querySelector<HTMLElement>(
            "[data-gallery-card]"
          );

          if (button) {
            button.dataset.galleryOpen = String(sourceIndex);
          }

          cards.push({
            baseX: column * size.itemW,

            baseY: row * size.itemH,

            startY:
              (column - centerColumn) *
              size.itemH *
              settings.offsetY,

            ySpeed:
              settings.columnSpeeds[
                column % settings.columnSpeeds.length
              ],

            xSetter: gsap.quickSetter(item, "x", "px"),

            ySetter: gsap.quickSetter(item, "y", "px"),
          });

          /*
            Le copie extra non devono essere
            lette dagli screen reader.
          */
          if (imageIndex >= originalItems.length) {
            item.setAttribute("aria-hidden", "true");
          }

          fragment.appendChild(item);

          imageIndex++;
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

      updateGrid();

      gsap.ticker.add(updateGrid);

      observer = Observer.create({
        target: wrapper,

        /*
          MOBILE:
          niente wheel.
          Solo touch/pointer.

          DESKTOP:
          anche wheel.
        */
        type: isMobile
          ? "touch,pointer"
          : "wheel,touch,pointer",

        /*
          FONDAMENTALE:
          FALSE.

          Così la gallery NON intrappola la pagina
          e puoi continuare a scrollare fino al footer.
        */
        preventDefault: false,

        dragMinimum: isMobile ? 6 : 4,

        onChange(self) {
          const type = self.event?.type;

          const wheel = type === "wheel";

          const speed = wheel
            ? settings.wheelSpeed
            : settings.dragSpeed;

          const deltaX = gsap.utils.clamp(
            -65,
            65,
            self.deltaX * speed
          );

          const deltaY = gsap.utils.clamp(
            -65,
            65,
            self.deltaY * speed
          );

          const moveX = wheel ? -deltaX : deltaX;
          const moveY = wheel ? -deltaY : deltaY;

          pos.targetX += moveX;

          /*
            Su mobile diamo priorità all'orizzontale,
            così il gesto verticale continua a scrollare
            naturalmente la pagina.
          */
          if (isMobile) {
            pos.targetY += moveY * 0.35;
          } else {
            pos.targetY +=
              moveY + moveX * settings.xToY;
          }
        },
      });
    };

    /* =========================================================
       CLICK DELEGATION
    ========================================================= */

    let pointerStartX = 0;
    let pointerStartY = 0;
    let didDrag = false;

    const handlePointerDown = (event: PointerEvent) => {
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;

      didDrag = false;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = Math.abs(
        event.clientX - pointerStartX
      );

      const deltaY = Math.abs(
        event.clientY - pointerStartY
      );

      if (deltaX > 8 || deltaY > 8) {
        didDrag = true;
      }
    };

    const handleClick = (event: MouseEvent) => {
      /*
        Se l'utente stava trascinando,
        NON apriamo la lightbox.
      */
      if (didDrag) {
        didDrag = false;
        return;
      }

      const target = event.target as HTMLElement;

      const card = target.closest<HTMLElement>(
        "[data-gallery-open]"
      );

      if (!card) return;

      const index = Number(card.dataset.galleryOpen);

      if (Number.isNaN(index)) return;

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

    wrapper.addEventListener("click", handleClick);

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
          GALLERY FULLSCREEN
      ========================================================= */}

      <div
        ref={wrapperRef}
        className="
          relative
          h-[calc(100svh-80px)]
          w-full
          overflow-hidden
          bg-[#F8F5F0]
          cursor-grab
          active:cursor-grabbing
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
                  w-[185px]
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
                  transform: "translateZ(0)",
                }}
              >
                <button
                  type="button"
                  data-gallery-card
                  data-gallery-open={index}
                  aria-label={`Apri immagine ${index + 1}`}
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
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={70}
                    loading={index < 6 ? "eager" : "lazy"}
                    sizes="
                      (max-width: 640px) 185px,
                      (max-width: 768px) 220px,
                      (max-width: 1024px) 280px,
                      360px
                    "
                    draggable={false}
                    className="
                      pointer-events-none
                      select-none
                      object-cover
                      md:transition-transform
                      md:duration-700
                      md:group-hover:scale-[1.02]
                    "
                  />

                  {/* PLUS SOLO DESKTOP */}
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
            ))}
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
          onClick={() => setLightboxOpen(false)}
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
          {/* HEADER LIGHTBOX */}
          <div className="absolute left-5 right-5 top-5 z-30 flex items-center justify-between md:left-10 md:right-10 md:top-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/65">
              Villa San Carlo
            </p>

            <div className="flex items-center gap-5">
              <span className="text-[10px] tracking-[0.16em] text-white/60">
                {String(activeIndex + 1).padStart(2, "0")}
                {" / "}
                {String(images.length).padStart(2, "0")}
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

          {/* FOTO */}
          <div
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStartX.current =
                event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;

              const endX =
                event.changedTouches[0]?.clientX ?? 0;

              const distance =
                endX - touchStartX.current;

              if (distance > 50) {
                showPrevious();
              }

              if (distance < -50) {
                showNext();
              }

              touchStartX.current = null;
            }}
            className="
              relative
              h-[74svh]
              w-full
              max-w-[1300px]

              md:h-[82svh]
            "
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              priority
              quality={88}
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
              showPrevious();
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
              bg-[#21140F]/20
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
              showNext();
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
              bg-[#21140F]/20
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