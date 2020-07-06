import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled, { css } from "styled-components"

import LayoutBlog from "../components/layout-blog"
import SEO from "../components/seo"

const Container = styled.div`
  padding: 10px 0;
`

const Posts = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`

const Post = styled(Link)`
  text-decoration: none;
  display: block;
  margin-bottom: 20px;
  width: 200px;
  margin-right: 30px;
  color: #000;
`

const PostTitle = styled.h3`
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: navy;
`

const PostImage = styled.img`
  display: block;
  margin-bottom: 10px;
`

const PostText = styled.div`
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 10px;
`

const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 30px 0;
`

const Tag = styled.li`
  color: green;
  margin: 0 40px 0 0;
  padding-bottom: 10px;
  cursor: pointer;
  ${({ current }) => current && css`
    color navy;
  `}
`

const PostItems = ({ posts }) => posts.map(({
  id,
  slug,
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
}) => {
  const abstractHtml = abstract ? abstract.childMarkdownRemark.html : textHtml

  return (
    <Post key={id} to={`/blog/${slug}/`}>
      <PostImage src={src} alt={imageTitle} />
      <PostTitle>{title}</PostTitle>
      <PostText dangerouslySetInnerHTML={{ __html: abstractHtml }} />
    </Post>
  )
})

const Blog = () => {
  const [currentTag, setCurrentTag] = useState("all");
  const { items, tags } = useStaticQuery(getPosts)

  const allTags = [{
      tag: "all",
      label: "All",
    },
    ...tags.nodes,
  ]

  const handleClick = (tag) => () => {
    setCurrentTag(tag)
  }

  const tagLinks = allTags.map(({ tag, label }) => (
    <Tag
      key={tag}
      current={tag === currentTag ? 1 : 0}
      onClick={handleClick(tag)}
    >
      { label }
    </Tag>
  ))

  const filteredPosts = items.nodes.filter((post) => {
    if (currentTag === "all") {
      return true;
    }

    return post.tags && post.tags.map(({ tag }) => tag).includes(currentTag)
  })

  return (
    <LayoutBlog>
      <SEO title="Blog" />
      <Container>
        <Tags>{ tagLinks }</Tags>
        <Posts>
          <PostItems posts={filteredPosts} />
        </Posts> 
      </Container>
    </LayoutBlog>
  )
}

const getPosts = graphql`
  {
    items: allContentfulPost(limit: 1000, sort: { fields: [createdAt], order: DESC }) {
      totalCount
      nodes {
        id
        slug
        title
        image {
          title
          fluid(maxHeight: 150, maxWidth: 200, resizingBehavior: SCALE) {
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
        }
      }
    }
    tags: allContentfulTag(sort: { fields: [label], order: ASC }) {
      nodes {
        tag
        label
      }
    }
  }
`

export default Blog
