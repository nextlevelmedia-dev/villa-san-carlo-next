"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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
    src: "/image/ospitalità.png",
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

    // MOVIMENTO PIÙ ELEGANTE DELLA REFERENCE
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

      gsap.set(cardElements, {
        scale: scale.current,
      });
    };

    const buildGrid = () => {
      observer?.kill();

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

      const columns =
        Math.ceil(wrapper.clientWidth / size.itemW) +
        gridOverscan * 2;

      const rows =
        Math.ceil(wrapper.clientHeight / size.itemH) +
        gridOverscan * 2;

      const indexes = createItemIndexes(columns, rows);

      const columnSpeeds =
        createColumnSpeeds(columns);

      const fragment =
        document.createDocumentFragment();

      const centerColumn = Math.floor(columns / 2);
      const centerRow = Math.floor(rows / 2);

      size.totalW = columns * size.itemW;
      size.totalH = rows * size.itemH;

      cards = [];
      cardElements = [];

      collection.style.width = `${size.totalW}px`;
      collection.style.height = `${size.totalH}px`;

      for (let row = 0; row < rows; row++) {
        for (
          let column = 0;
          column < columns;
          column++
        ) {
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

          if (
            cards.length > originalItems.length
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

        type: "wheel,touch,pointer",

        preventDefault: true,

        dragMinimum: 3,

        onChange(self) {
          const event = self.event as Event;

          const isWheel =
            event.type === "wheel";

          const speed = isWheel
            ? wheelSpeed
            : dragSpeed;

          const deltaX = gsap.utils.clamp(
            -80,
            80,
            self.deltaX * speed
          );

          const deltaY = gsap.utils.clamp(
            -80,
            80,
            self.deltaY * speed
          );

          const moveX = isWheel
            ? -deltaX
            : deltaX;

          const moveY = isWheel
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

          scaleTimer = setTimeout(() => {
            scale.target = 1;
          }, 140);

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
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="
        relative
        h-[78svh]
        min-h-[600px]
        w-full
        cursor-grab
        overflow-hidden
        bg-[#F8F5F0]
        active:cursor-grabbing

        md:h-[82svh]

        lg:h-[86svh]
      "
    >
      <div
        data-gallery-collection
        className="absolute inset-0 will-change-transform"
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
                w-[240px]
                items-center
                justify-center
                p-5

                sm:w-[280px]
                sm:p-6

                lg:w-[330px]
                lg:p-7

                xl:w-[360px]
              "
            >
              <div
                data-gallery-card
                className="
                  relative
                  h-full
                  w-full
                  overflow-hidden
                  bg-[#E9DFD4]
                  shadow-[0_14px_40px_rgba(59,33,24,0.08)]
                "
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 360px"
                  className="
                    pointer-events-none
                    select-none
                    object-cover
                  "
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HINT */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 bg-[#F8F5F0]/90 px-5 py-3 backdrop-blur-sm">
        <p className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.22em] text-[#8A7160]">
          Trascina per esplorare
        </p>
      </div>
    </div>
  );
}