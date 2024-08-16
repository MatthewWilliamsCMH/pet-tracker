module.exports = {
    isLoggedIn: () => {
      return sessionStorage.getItem('logged-in')
    }
  };