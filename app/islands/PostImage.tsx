import type { FC } from "hono/jsx";

export const PostImage: FC<{ image: string }> = ({ image }) => {
  return (
    <div class="mt-4 mb-10 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg border-2 border-gray-200 dark:border-gray-700">
      <div class="overflow-hidden">
        <img
          src={image}
          alt="头图"
          class="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};
