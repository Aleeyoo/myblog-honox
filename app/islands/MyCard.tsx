import type { FC } from "hono/jsx";

export const MyCard: FC = () => {
  return (
    // <div class="mt-10 rounded-lg overflow-hidden bg-transparent dark:text-white text-sm leading-relaxed p-4 border-2">
    //   <pre>
    //     <h1>
    //       https://cn.bing.com/images/search?q=%e6%9e%81%e7%ae%80%e8%83%8c%e6%99%af&id=D0AA7085963556E853B5C732C96910A9CCFB1D5C&FORM=IACFIR
    //     </h1>
    //   </pre>
    // </div>
    <div class="mt-10 mb-10 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg border-2 border-gray-200 dark:border-gray-700">
      <div class="overflow-hidden">
        <img
          src="/static/head.png"
          alt="头像"
          class="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};
