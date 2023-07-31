const Notification = ( {message} ) => {

  if (message === null) {
      return null
  }
  else if (message.type === "success") {
      return (
          <div className='successMessage'>
              {message.message}
          </div>
      )
  }
  else if (message.type === "error") { 
    return (
          <div className='errorMessage'>
              {message.message}
          </div>
      )
  }
  
}

export default Notification