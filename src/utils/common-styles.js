import styled, { css } from "styled-components"
import { Link } from "gatsby"

import colors from "./colors"

export const mobileWidth = 768

export const outerStyles = css`
  min-width: 320px;
`;

export const Container = styled.div`
  padding: 20px 0;
`

export const innerStyles = css`
  margin: 0 auto;
  max-width: 960px;
  min-width: 320px;
  padding: 20px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  color: ${colors.DARK_BLUE};
`

export const Title = styled.h2`
  font-weight: 800;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: ${colors.WHITE};
  margin-bottom: 20px;
  @media (max-width: ${mobileWidth}px) {
    font-size: 28px;
    line-height: 32px;
  }
`

export const Subtitle = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: ${colors.WHITE};
  margin-bottom: 30px;
`

export const LinkToQuiz = styled(Link)`
  text-decoration: none;
  line-height: 30px;
  font-size: 14px;
  color: ${colors.WHITE};
  background: ${colors.GREEN};
  padding: 5px 30px;
  border-radius: 10px;
  margin-bottom: 5px;
  &:hover {
    background ${colors.SAND};
  }
`

export const PostText = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 40px;
`

// TODO: Move here some common styles, i.e. titles, descriptions, buttons etc.
