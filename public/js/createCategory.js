var imgPreview = document.getElementById('img-preview');

const createCategory = async (event) => {
  event.preventDefault();
  
  var title = document.querySelector('#newCategoryTitle').innerHTML;
  var description = document.querySelector('#newCategoryDescription').innerHTML;
  var image = window.document.getElementById('img-preview').src;

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

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'garden-getaways', 
  uploadPreset: 'op9zdn6l'}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info); 

      imgPreview.src = result.info.url;
    }
  }
)

document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);

document.querySelector('#createCategory').addEventListener('click', createCategory);
