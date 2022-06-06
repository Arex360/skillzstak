import Document, { Html, Head, Main, NextScript } from "next/document";


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
        <link href="https://vjs.zencdn.net/7.19.2/video-js.css" rel="stylesheet" />
        <script src="https://vjs.zencdn.net/7.19.2/video.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.3/web3.min.js" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript  />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
