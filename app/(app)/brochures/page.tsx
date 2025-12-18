"use client";

export default function BrochuresPage() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-primary mb-4  decoration-2 underline-offset-4">
            Brochure
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col h-full ">
            <img
              src="/images/brochures.jpg"
              alt="Brochure 1"
              className="w-auto max-w-full h-60 object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-primary mb-3 mt-4">
              Brosur_REXCO-indo.pdf
            </h3>
            <a
              href="/documents/brochures/rexco50-brochure.pdf"
              download
              className="mt-auto text-[#77716a] font-bold py-2 mr-auto rounded hover:text-black transition-colors flex items-center gap-2"
            >
              Unduh
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12"
                />
              </svg>
            </a>
          </div>

          <div className="flex flex-col h-full ">
            <img
              src="/images/brochures.jpg"
              alt="Brochure 1"
              className="w-auto max-w-full h-60 object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-primary mb-3 mt-4">
              Brosur_REXCO-indo.pdf
            </h3>
            <a
              href="/documents/brochures/rexco50-brochure.pdf"
              download
              className="mt-auto text-[#77716a] font-bold py-2 mr-auto rounded hover:text-black transition-colors flex items-center gap-2"
            >
              Unduh
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
