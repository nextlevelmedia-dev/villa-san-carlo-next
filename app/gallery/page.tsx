import InfiniteGallery from "@/components/InfiniteGallery";

export default function GalleryPage() {
  return (
    <main className="bg-[#F8F5F0]">
      {/* INTRO */}
      <section className="relative overflow-hidden">
        {/* BACKGROUND */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-[12%] -top-[50%] h-[620px] w-[620px] rounded-full bg-[#C8AD92]/18 blur-[140px]" />

          <div className="absolute -right-[12%] top-[10%] h-[560px] w-[560px] rounded-full bg-[#DCCABC]/16 blur-[150px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-14 pt-20 text-center lg:px-12 lg:pb-16 lg:pt-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#A58B73]">
            Gallery
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-[#CDB9A7]" />
            <span className="text-[9px] text-[#B69A82]">
              ✦
            </span>
            <span className="h-px w-12 bg-[#CDB9A7]" />
          </div>

          <h1 className="mx-auto mt-6 max-w-[900px] text-4xl leading-[1.05] tracking-[-0.035em] text-[#3B2118] md:text-5xl lg:text-[62px]">
            Scorci, dettagli e atmosfere di Villa San Carlo.
          </h1>

          <p className="mx-auto mt-6 max-w-[650px] text-base leading-7 text-[#6D625B] md:text-lg md:leading-8">
            Esplora liberamente gli ambienti, gli eventi e i dettagli che
            raccontano l&apos;atmosfera della villa.
          </p>
        </div>
      </section>

      {/* INFINITE GALLERY */}
      <InfiniteGallery />
    </main>
  );
}