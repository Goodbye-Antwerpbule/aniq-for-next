import { Flex, Link } from "@chakra-ui/react";

import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Flex
            as="header"
            p={3}
            position="sticky"
            top={0}
            zIndex="docked"
            backgroundColor={"yellow.100"}
          >
            <Link href={"https://hyper-anime-quiz.vercel.app"}>
              {" "}
              当サイトはこちらへリニューアルしました！！
            </Link>
          </Flex>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
