import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dishesBySlug, dishes } from "@/lib/kazakhCuisineData";

export function generateStaticParams() {
  return dishes.map((dish) => ({ slug: dish.slug }));
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = dishesBySlug[slug];

  if (!dish) {
    notFound();
  }

  return (
    <main className="ornament-grid min-h-screen px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur">
        <Link
          href="/"
          className="inline-flex rounded-full border border-gray-300 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-600 hover:bg-gray-50 transition"
        >
          ← Назад к карте
        </Link>

        {/* Фото блюда */}
        {dish.image ? (
          <div className="mt-6 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden">
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        ) : null}

        <p className="mt-6 text-xs uppercase tracking-[0.28em] text-amber-600 font-bold">{dish.category}</p>
        <h1 className="mt-2 font-[var(--font-display)] text-5xl text-gray-900">{dish.name}</h1>
        <p className="mt-4 text-lg text-gray-700">{dish.shortDescription}</p>

        {/* Острота и совет */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="rounded-xl bg-red-50 border border-red-100 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-red-500 font-bold">Острота</p>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} className={`inline-block h-3 w-3 rounded-full ${i < dish.spiceLevel ? "bg-red-500" : "bg-gray-200"}`} />
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-100 px-3 py-2 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-amber-600 font-bold">🧳 Совет путешественнику</p>
            <p className="text-xs text-gray-700 mt-0.5">{dish.touristTip}</p>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <h2 className="font-[var(--font-display)] text-2xl text-gray-900">Состав</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {dish.ingredients.map((ingredient) => (
              <span key={ingredient} className="rounded-full bg-white border border-gray-200 px-3 py-1 text-sm text-gray-800">
                {ingredient}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <h3 className="font-[var(--font-display)] text-2xl text-gray-900">История</h3>
            <p className="mt-3 text-sm text-gray-700">{dish.story}</p>
          </article>
          <article className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <h3 className="font-[var(--font-display)] text-2xl text-gray-900">Где попробовать</h3>
            <p className="mt-3 text-sm text-gray-700">{dish.whereToTry}</p>
          </article>
        </section>
      </div>
    </main>
  );
}
