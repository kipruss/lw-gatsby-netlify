import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import LayoutBlog from "../components/layout-blog"
import { PageTitle, PostText } from "../utils/common-styles"

const Container = styled.div`
  padding: 10px 0;
`

const PostImage = styled.img`
  display: block;
  border-raduis: 10px;
  margin-bottom: 40px;
`

const Tags = styled.ul`
  list-style: none;
  display: flex;
  margin: 0 0 30px 0;
`

const Tag = styled.li`
  color: green;
  margin: 0 20px 0 0;
`

const PostTemplate = ({
  data: {
    contentfulPost: {
      title,
      image: {
        title: imageTitle,
        fluid: {
          src,
        },
      },
      abstract,
      text: {
        childMarkdownRemark: {
          html: textHtml,
        },
      },
      tags,
    }
  }
}) => {
  const abstractHtml = abstract ? (
    <PostText dangerouslySetInnerHTML={{ __html: abstract.childMarkdownRemark.html }} />
  ) : null

  const tagsList = tags ? (
    <Tags>{
      tags.map(({ tag, label }) => (
        <Tag key={tag}>{ `#${label}` }</Tag>
      ))
    }</Tags>
  ) : null

  return (
    <LayoutBlog>
      <SEO title={`${title} | Blog`} />
      <Link to="/blog/">Back to Blog</Link><br />
      <Container>
        <PageTitle>{title}</PageTitle>
        <PostImage src={src} alt={imageTitle} />
        { abstractHtml }
        <PostText dangerouslySetInnerHTML={{ __html: textHtml }} />
        { tagsList }
      </Container>
    </LayoutBlog>
  )
} 

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulPost(slug: {eq: $slug}) {
      id
      slug
      title
      date
      image {
        title
        fluid(maxWidth: 960) {
          src
        }
      }
      abstract {
        childMarkdownRemark {
          html
        }
      }
      text {
        childMarkdownRemark {
          html
        }
      }
      tags {
        tag
        label
      }
    }
  }
`
