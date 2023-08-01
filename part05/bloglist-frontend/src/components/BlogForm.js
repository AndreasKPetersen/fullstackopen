const BlogForm = ({
    addBlog,
    handleLogout,
    user,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl,
    createVisible,
    setCreateVisible
}) => {

    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return (
        <div>
            <div>
            {user.username} logged in <button onClick={handleLogout}>logout</button>
            </div>
            <br/>
            
            <h2>create new</h2>
            <div style={hideWhenVisible}>
                <button onClick={() => setCreateVisible(true)}>add blog</button>
            </div>
            <div style={showWhenVisible}>
            <form onSubmit={addBlog}>
            <div>
                title
                <input
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                    type="text"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                    type="text"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
            </form>
            <button onClick={() => setCreateVisible(false)}>cancel</button>
            </div>
      </div>
    )
}

export default BlogForm