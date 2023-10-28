import {useCallback, useEffect, useState} from 'react';
import {Input, Button, Select, RTE} from '../c.index';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dbService from '../../appwrite/database';
import {addPost, updatePost} from '../../store/postsSlice';
import { useForm } from 'react-hook-form';

function PostForm({post}) {
    const [btnLoader, setBtnLoader] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state)=> state.auth.userData);
    const {register, handleSubmit, watch, control, setValue, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const submit = async (data)=> {
        setBtnLoader(true);
        if(post) { //Update Post
            const file = data.image[0] ? await dbService.uploadFile(data.image[0]) : null;

            if(file) await dbService.deleteFile(post.featuredImage);

            const dbPost = await dbService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage
            })

            if(dbPost) {
                dispatch(updatePost({id: post.$id, newPost: dbPost}));
                navigate(`/post/${dbPost.$id}`)
            };

        } else { //New Post
            const file = await dbService.uploadFile(data.image[0]);

            const dbPost = await dbService.createPost(data.slug, {
                ...data,
                featuredImage: file.$id,
                userId: userData.$id,
            })

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`);
                dispatch(addPost(dbPost));
            }
        }
    }

    const slugTransform = useCallback((value)=> {
        if (value && typeof value === "string") 
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-z\d]+/g, "-");

        return '';
    }, [])

    useEffect(()=> {
        const subscription = watch((values, {name})=> {
            if(name === "title") {
                setValue("slug", slugTransform(values.title));
            }
        })

        return ()=>{
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
              />
              {!post &&
                  <Input
                      label="Slug :"
                      placeholder="Slug"
                      className="mb-4"
                      {...register("slug", { required: true })}
                      onInput={(e) => {
                          setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                      }}
                  />}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={dbService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" loaderState={btnLoader}>
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm