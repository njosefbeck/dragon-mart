/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"
import { ShopProvider } from "./src/ShopProvider";

export const wrapRootElement = ({ element }) => {
  return (
    <ShopProvider>
      {element}
    </ShopProvider>
  )
};
