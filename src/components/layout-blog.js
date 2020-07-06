import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Header from "./header"
import GlobalStyles from "./global-styles.js"

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`

const Layout = ({ children }) => (
  <>
    <Header siteTitle="Main page" />
    <Container>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </Container>
    <GlobalStyles />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
