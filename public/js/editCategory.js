var imgPreview = document.getElementById('img-preview');
var id = window.location.href.toString().split('categories/')[1];
 
  if (id.includes("edit/")) {
    id = id.split('edit/')[1];
  }

  console.log(id)
const updateCategory = async (event) => {
  debugger;
  event.preventDefault();
  
  var title = document.querySelector('#newCategoryTitle').innerHTML;
  var description = document.querySelector('#newCategoryDescription').innerHTML;
  var image = imgPreview.src;

  

  const response = await fetch("/categories/edit/"+id, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        description: description,
        image: image,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      toastr.success('Category added!');
      document.location.replace('/dashboard');
    
    } else {
      toastr.error('Failed to update category');
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

document.querySelector('#updateCategory').addEventListener('click', updateCategory);
