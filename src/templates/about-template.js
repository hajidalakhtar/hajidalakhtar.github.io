import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const AboutTemplate = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark;
  const profileImage = getImage(frontmatter.profile_image);

  return (
    <Layout title={frontmatter.title}>
        <StyledPostListItem>
        <AboutWrapper>

        <AboutImageWrapper image={profileImage} alt="" />

        <AboutCopy dangerouslySetInnerHTML={{ __html: html }} />
       

    
      </AboutWrapper>
      </StyledPostListItem>
   
  
    </Layout>
  );
};

const PostListItem = ({
  title,
  description,
  slug,
}) => {
  return (
    <StyledPostListItem>

      <PostListTitle>
        <Link to={slug}>{title}</Link>
      </PostListTitle>
      <PostListExcerpt
        dangerouslySetInnerHTML={{
          __html: description 
        }}
      />
    
    </StyledPostListItem>
  );
};

export default AboutTemplate;

const AboutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;

  @media screen and (max-width: 1000px) {
    & {
      flex-direction: column;
    }

    & > * {
      margin-top: 2rem;
      width: 100%;
      text-align: center;
    }
  }
`;


const AboutImageWrapper = styled(GatsbyImage)`
  display: block;
  border-radius: 50%;
  height: 300px;
  width: 300px;
`;

const AboutCopy = styled.div`
  max-width: 60ch;

  & p {
    font-size: var(--size-400);
  }
`;


const StyledPostList = styled.ul`
  padding: 0;
  list-style: none;
  display: grid;
  justify-items: center;
  grid-gap: var(--size-600);
  grid-template-columns: repeat(auto-fit, minmax(35ch, 1fr));

  @media screen and (max-width: 500px) {
    & {
      display: block;
    }
  }
`;

const StyledPostListItem = styled.li`

  position: relative;
  display: flex;
  flex-direction: column;
  width:100%;
  
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 500px) {
    & {
      margin-top: var(--size-600);
    }
  }
`;

const PostListTitle = styled.h2`
  line-height: 1.2;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
  font-size: var(--size-600);
  font-weight: 700;

  & a {
    text-decoration: none;
    color: inherit;
  }

  & a::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const PostListExcerpt = styled.p`
  margin-top: auto;
  font-size: var(--size-400);
`;

const PostListMeta = styled.div`
  margin-top: 2rem;

  font-size: var(--size-300);
  display: flex;
  justify-content: space-between;
`;


export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        profile_image {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: PNG, height: 400)
          }
        }
      }
    }
  }
`;
