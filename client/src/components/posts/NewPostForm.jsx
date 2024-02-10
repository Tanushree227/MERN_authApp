/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useRef } from 'react';
import Card from '../ui/Card';
import classes from './NewPostForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from '../../redux/user/userSlice';

function NewPostForm(props) {

    const dispatch = useDispatch();
    const { currentUser, loading, error } = useSelector((state) => state.user);

    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredCategory = categoryInputRef.current.value;

        const postData = {
            title: enteredTitle,
            image: enteredImage,
            name: enteredName,
            description: enteredDescription,
            category: enteredCategory,
            userid: currentUser._id
        };

        props.onAddPost(postData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Post Title</label>
                    <input type="text" ref={titleInputRef} placeholder='Enter your Post Title' required autoComplete='off' id='title' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='category'>Post Category</label>
                    <input type="text" ref={categoryInputRef} placeholder='Enter your Post Category' required autoComplete='off' id='category' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='image'>Post Image URL</label>
                    <input placeholder='Enter Post Image URL' autoComplete='off' type="url" ref={imageInputRef} required id='image' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='name'>User Name</label>
                    <input defaultValue={currentUser.username} type="text" autoComplete='off' placeholder='Enter your Full Name' ref={nameInputRef} required id='name' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Post Caption</label>
                    <textarea placeholder='Enter Post Description' rows='5' id='description' ref={descriptionInputRef} required autoComplete='off'></textarea>
                </div>
                <div className={classes.actions}>
                    <button type='submit'>Share post</button>
                </div>
            </form>
        </Card>
    );
}

export default NewPostForm;
