
const createCategory = async (event) => {
  event.preventDefault();
  
  var title = document.querySelector('#newCategoryTitle').innerHTML;
  var description = document.querySelector('#newCategoryDescription').innerHTML;
  var image = window.document.getElementById('img-id').getAttribute('data-img-id');

  console.log(title, description, image);

    const response = await fetch("/categories/new", {
      method: 'POST',
      body: JSON.stringify({
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

document.querySelector('#createCategory').addEventListener('click', createCategory);
