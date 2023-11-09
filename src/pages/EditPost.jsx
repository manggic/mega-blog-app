import { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import appwriteService from "../appwrite/service_config";
import { useNavigate, useParams } from "react-router-dom";
const EditForm = () => {
  const [posts, setPosts] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();


  console.log('slug ????',slug);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {

        console.log('post ??????',post);
        setPosts(post);
      });
    }else{
      navigate('/')
    }
  }, [slug, navigate]);

  return posts ? (
    <div className="py-8">
      <Container>
        <PostForm post={posts} />
      </Container>
    </div>
  ) : (
    ""
  );
};

export default EditForm;
