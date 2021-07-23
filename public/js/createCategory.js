const createCategory = async (event) => {
  event.preventDefault();
  
  var role_id = document.querySelector('#job-type').value; 
  var title = document.querySelector('#newJobTitle').innerHTML;
  var description = document.querySelector('#newJobDescription').innerHTML;
  var image = document.querySelector('#newImage').innerHTML;


    const response = await fetch("/categories/new", {
      method: 'POST',
      body: JSON.stringify({
        role_id: role_id,
        categoryTitle: title,
        categoryDescription: description,
        categoryImage: image,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      toastr.success('Category added!');
      document.location.replace('/dashboard');
    
    } else {
      toastr.error('Failed to create category');
    }
};

document.querySelector('#postCategory').addEventListener('click', createCategory);
