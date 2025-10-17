import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // pages that should NOT have a sidebar
  const noSidebarRoutes = ["/"];

  const showSidebar = !noSidebarRoutes.includes(router.pathname);

  return showSidebar ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}
