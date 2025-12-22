import { type FC, Fragment } from "hono/jsx";
import type { JSX } from "hono/jsx/jsx-runtime";
import { Heading } from "../components/Heading";
import { MyCard } from "../islands/MyCard";

export default function Top(): JSX.Element {
  return (
    <>
      <Heading title="我等春雪又一年" />
      <MyCard />
      <Posts />
    </>
  );
}
type PostEntry = {
  [key: string]: {
    frontmatter: {
      title: string;
      date: string;
    };
  };
};

const FIRST_BLOG_POST_YEAR = 2025;

const Posts: FC = () => {
  const posts = import.meta.glob<{
    frontmatter: { title: string; date: string; published: boolean };
  }>("./posts/*.mdx", { eager: true });
  const entries = Object.entries(posts).filter(
    ([_, module]) =>
      module.frontmatter.published,
  );

  const sortedEntries = entries
    .sort((a, b) => {
      const dateA = new Date(a[1].frontmatter.date).getTime();
      const dateB = new Date(b[1].frontmatter.date).getTime();
      return dateA - dateB;
    })
    .reverse();
  const sortedPosts = sortedEntries.reduce<PostEntry>((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  const yearlyBlogs = () => {
    const blogData = [];
    const thisYear = new Date().getFullYear();
    for (let year = FIRST_BLOG_POST_YEAR; year <= thisYear; year++) {
      const arrBlog = Object.entries(sortedPosts)
        .filter(([_, post]) => {
          const date = "frontmatter" in post ? post.frontmatter.date : "";
          const postYear = new Date(date).getFullYear();
          return postYear === year;
        })
        .map(([id, post]) => ({
          id,
          date: "frontmatter" in post ? post.frontmatter.date : "",
          title: "frontmatter" in post ? post.frontmatter.title : "",
          link: id.replace(/\.mdx$/, "").replace(/\./g, ""),
          postedIn: "blog",
        }));
      const posts = [...arrBlog];

      blogData.push({
        year: year,
        posts: posts.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        }),
      });
    }
    return blogData;
  };

  return (
    <div class="mt-16">
      <Heading title="文章" />
      <ul class="mt-10">
        {yearlyBlogs()
          .reverse()
          .map((res, index) => {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: enable index
              <Fragment key={`${index}`}>
                <h3 class="text-xl my-5">{res.year}</h3>
                {res.posts.map(({ id, title, date, link }) => {
                  return (
                    <li key={id} class="text-lg mt-2 md:mt-1">
                      <time class="tabular-nums tnum date pr-3 text-gray-800 dark:text-gray-dcd">
                        {date}
                      </time>
                      <br class="block md:hidden" />
                      <a
                        class="underline hover:bg-black-900 hover:text-white dark:hover:bg-white dark:hover:text-black-900 hover:no-underline"
                        href={link}
                      >
                        {title}
                      </a>




                    </li>
                  );
                })}
              </Fragment>
            );
          })}
      </ul>
    </div>
  );
};
