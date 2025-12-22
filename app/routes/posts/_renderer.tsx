import type { MiddlewareHandler } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import ContentWrapper from "../../islands/ContentWrapper";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
  const _title = `${frontmatter?.title} | Aleeyoo`;
  return (
    <Layout title={_title} description={frontmatter?.description}>
      <div class="text-right mt-3">
        <ContentWrapper content={children?.toString() as string}>
          <h1>{frontmatter?.title}</h1>
          <dl class="flex items-center gap-3">
            <div class="flex items-center gap-1">
              <dt>发布于： </dt>
              <dd>{frontmatter?.date}</dd>
            </div>
          </dl>
          <dl class="flex items-center gap-3">
            <div class="flex items-center gap-1">
              <dt>概述： </dt>
              <dd>{frontmatter?.description}</dd>
            </div>
          </dl>
        </ContentWrapper>
      </div>
    </Layout>
  );
}) satisfies MiddlewareHandler as MiddlewareHandler;
