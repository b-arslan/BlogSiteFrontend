import axios from 'axios';

const backendUrl: string = 'http://localhost:5000';

interface Blog {
    id: number;
    title: string;
    content: string;
    created_by: string;
}

export const fetchBlogs = async (): Promise<Blog[]> => {

    const response = await axios.get(`${backendUrl}/api/blogs`);
    return response.data.blogs;

}