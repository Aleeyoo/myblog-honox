import type { MiddlewareHandler } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";
import { LINK } from "../constants";

const POEM_API =
    "https://poetry.palemoky.com/api/poems/random?type=" + encodeURIComponent("七言绝句");

interface Poem {
    title: string;
    content: string[];
    author: { name: string };
    dynasty: { name: string };
}

async function fetchPoem(): Promise<Poem | null> {
    try {
        const res = await fetch(POEM_API, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(3000),
            cf: { cacheTtl: 3600 },
        } as RequestInit & { cf?: { cacheTtl: number } });
        if (!res.ok) return null;
        const data = (await res.json()) as { data?: Poem };
        if (!data.data || !Array.isArray(data.data.content) || data.data.content.length === 0) return null;
        return data.data;
    } catch {
        return null;
    }
}

const PoemFooter = async () => {
    const poem = await fetchPoem();
    if (!poem) {
        return <p>自洽而内求，达观而自省</p>;
    }
    return (
        <div>
            <p>
                {poem.title} · {poem.dynasty.name}·{poem.author.name}
            </p>
            {poem.content.map((line) => (
                <p key={line}>{line}</p>
            ))}
        </div>
    );
};

export default jsxRenderer(({ children, title, description }) => {
    const _title = title ?? "Aleeyoo";
    const _description = description ?? "All about Aleeyoo !!!";
    const _image = "/static/icon.png";

    return (
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{_title}</title>
                <link rel="icon" href={_image} />
                <meta property="og:title" content={_title} />
                <meta property="og:description" content={_description} />
                <meta property="og:image" content={_image} />
                <meta name="twitter:site" content="" />
                <meta name="twitter:image" content={_image} />
                <meta name="twitter:card" content="summary" />
                <meta
                    http-equiv="origin-trial"
                    content="AkwxmXeiTVIX8BZoXBhoT6N+EgwJbwpLsr/ryGyFsPE538JL2YK/pnkwhv2EIXqCe77Qrw5TcHsC/AHmZfommAUAAABkeyJvcmlnaW4iOiJodHRwczovL3lvc3N5LmRldjo0NDMiLCJmZWF0dXJlIjoiVHJhbnNsYXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDAsImlzU3ViZG9tYWluIjp0cnVlfQ=="
                />
                <Script src="/app/client.ts" />
                <script src="/scripts/hover-effect.js"></script>
                {import.meta.env.PROD ? (
                    <link href="/static/assets/style.css" rel="stylesheet" />
                ) : (
                    <link href="/app/style.css" rel="stylesheet" />
                )}
            </head>
            <body class="main-container lg:max-w-4xl bg-white dark:bg-black-900 m-auto text-black dark:text-white">
                <header>
                    <div class="max-w-(--breakpoint-2xl) mx-auto flex h-16 items-center justify-between">
                        <a href="/" class="text-black dark:text-white text-base font-bold">
                            Aleeyoo
                        </a>
                        <div class="flex items-center gap-4">
                            <a
                                href={LINK.HOMEPAGE}
                                target={"_blank"}
                                rel={"noreferrer"}
                                class="dark:hover:bg-white dark:hover:text-black-900 dark:hover:no-underline"
                            >
                                主页
                            </a>
                            <a
                                href={LINK.CONTACTS}
                                target={"_blank"}
                                rel={"noreferrer"}
                                class="dark:hover:bg-white dark:hover:text-black-900 dark:hover:no-underline"
                            >
                                联系我
                            </a>

                            {/* <a
                href="/rss.xml"
                class="dark:hover:bg-white dark:hover:text-black-900 dark:hover:no-underline"
                title="RSS订阅"
              >
                订阅
              </a> */}
                            <a
                                href={LINK.GITHUB}
                                target={"_blank"}
                                rel="noreferrer"
                                class="dark:hover:bg-white dark:hover:text-black-900 dark:hover:no-underline"
                            >
                                原仓库
                            </a>
                        </div>
                    </div>
                </header>
                <main class="w-full px-4 lg:max-w-4xl lg:px-0 mx-auto">{children}</main>
                <footer class="mt-10 text-center py-4 border-t border-black">
                    <PoemFooter />
                    <p>&copy; {new Date().getFullYear()} Aleeyoo | 承诺非 AI 创作</p>
                </footer>
            </body>
        </html>
    );
}) satisfies MiddlewareHandler as MiddlewareHandler;
