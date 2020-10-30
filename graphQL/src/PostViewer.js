import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
//import { Table } from 'reactstrap';

export const GET_POSTS = gql`
  query GetPosts {
     works{
      id
      filename
      imageWidth
      imageHeight
      urls{
        link
        type
      }
      exif {
      model
      make
    }
  }
  }
`;

export default () => (
  <Query query={GET_POSTS}>
    {({ loading, data }) => !loading && (
       <div className="flex-grid">
          {data.works.map(post => (  
            <div className="col">
            <div className="content">
            {post.urls.map(it=>(
             it.type==='small'?
            <div>
             <img src={it.link} alt={post.id} ></img>
           </div>:''
              )

              )}
            {post.exif.model?

              <p> {post.exif.model} </p> : <p> Unknown Model </p>
            }
            {post.exif.make?

              <p> {post.exif.make} </p> : <p> Unknown Make </p>
            }
            
            
            </div>
            </div>
         ))}
         </div>
      )}
  </Query>
);