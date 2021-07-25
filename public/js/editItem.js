var imgPreview = document.getElementById('img-preview');
var fetchedItems;

var categoryID = document.getElementById('currentID').getAttribute('data-id');
var categoryDD = document.querySelector('#item-category');
categoryDD.value = categoryID;
//get current item url
  var id = window.location.href.toString().split('items/')[1];
 
  if (id.includes("edit/")) {
    id = id.split('edit/')[1];
  }

const updateItem = async (event) => {
  event.preventDefault();
  
  var title = document.querySelector('#newItemTitle').innerHTML;
  var description = document.querySelector('#newItemDescription').innerHTML;
  var category = document.querySelector('#item-category').value.trim();
  var image = window.document.getElementById('img-preview').src;
  var itemURL = title.replace(/\s+/g, '-').toLowerCase();  

  const response = await fetch("/items/edit/"+id, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        category: category,
        description: description,
        image: image,
        item_url: itemURL,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      toastr.success('Item updated!');
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

document.querySelector('#updateItem').addEventListener('click', updateItem);
