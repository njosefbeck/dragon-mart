/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
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
