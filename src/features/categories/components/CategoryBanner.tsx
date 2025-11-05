import Image from "next/image";

interface CategoryBannerProps {
  slug: string;
  imageUrl?: string;
}

export function CategoryBanner({ slug, imageUrl }: CategoryBannerProps) {
  return (
    <div className="w-full rounded-2xl overflow-hidden relative bg-gray-100">
      <div className="relative h-40 md:h-56 lg:h-72">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${slug} category`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-amber-50" />
        )}
      </div>
      <div className="absolute left-6 top-6 md:top-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white drop-shadow-md capitalize">
          {slug}
        </h1>
      </div>
    </div>
  );
}
