const redirect = async (e) => {
e.preventDefault();
document.location.replace('/signin');
};

document.querySelector('.signup-btn').addEventListener('click', redirect);
