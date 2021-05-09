import App from "next/app";
import React from "react";
import Main from "../layouts/Main";

class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout || Main;

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
