import Card from '../ui/Card';
import classes from './NewPostForm.module.css';

function NewPostForm()
{
    return(
        <Card>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='title'>Post Title</label>
                    <input type="text" placeholder='Enter your Post Title' required autoComplete='off' id='title' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='image'>Post Image URL</label>
                    <input placeholder='Enter Post Image URL' autoComplete='off' type="url" required id='image' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='name'>Full Name</label>
                    <input type="text" autoComplete='off' placeholder='Enter your Full Name' required id='name' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Post Caption</label>
                    <textarea placeholder='Enter Post Description' rows='5' id='description' required autoComplete='off'></textarea>
                </div>
                <div className={classes.actions}>
                <button type='button'>Share post</button>
                </div>
            </form>
        </Card>
    );
}

export default NewPostForm;