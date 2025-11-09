export function InstallmentBanner() {
  return (
    <div className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-shadow overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">
      <div className="relative h-64 md:h-80 flex items-center justify-center p-8">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-pink-300/30"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Pay 9 Installments
          </h3>

          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full">
            <p className="text-2xl md:text-3xl font-black">
              Get the 10th FREE!
            </p>
          </div>

          <p className="mt-6 text-purple-800 text-lg font-semibold">
            Shop now and enjoy flexible payment options
          </p>
        </div>
      </div>
    </div>
  );
}
