import HeroSlider from "@/components/HeroSlider";
import Categories from "@/components/Categories";
import EventTabs from "@/components/EventTabs";

export default function Home() {
  return (
    <main className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="relative">

        <HeroSlider />

        {/* HERO OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-transparent flex items-center">

          <div className="max-w-7xl mx-auto px-6 text-white">

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Amazing <span className="text-blue-300">Events</span>
            </h1>

            <p className="mt-4 text-lg max-w-lg">
              Find concerts, tech talks, workshops and unforgettable
              experiences happening near you.
            </p>

            {/* SEARCH BAR */}
            <div className="mt-8 max-w-xl">

              <div className="flex bg-white rounded-full shadow-xl overflow-hidden">

                <input
                  type="text"
                  placeholder="Search events..."
                  className="flex-1 px-6 py-4 text-gray-700 outline-none"
                />

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 font-semibold transition">
                  Search
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* CATEGORIES */}
      <section className="py-16 bg-blue-50">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Browse by Category
          </h2>

          <Categories />

        </div>

      </section>


      {/* EVENTS */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold text-gray-800">
              Explore Events
            </h2>

            <p className="text-gray-500 mt-2">
              Trending and upcoming events around you
            </p>

          </div>

          <EventTabs />

        </div>

      </section>

    </main>
  );
}