import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id='backdrop-root' />
          <div id='overlay-root' />
        </body>
      </Html>
    );
  };
};

export default MyDocument;