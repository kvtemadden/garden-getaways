var imgPreview = document.getElementById('img-preview');
var fetchedItems;

const categories = fetch('/items')
  .then(response => response.json())
  .then(data => fetchedItems = data);
  
const createItem = async (event) => {
  event.preventDefault();
  
  var title = document.querySelector('#newItemTitle').innerHTML;
  var description = document.querySelector('#newItemDescription').innerHTML;
  var category = document.querySelector('#item-category').value.trim();
  var image = window.document.getElementById('img-preview').src;
  var itemURL = title.replace(/\s+/g, '-').toLowerCase();

  //prevent duplicate url
  var count = [];

  function checkDupURL() {
  for(var i = 0; i < fetchedItems.length; i++) {
    if (fetchedItems[i].item_url == itemURL) {
      count.push(itemURL);
    }
  }
  }

  checkDupURL();

  if (count.length > 0) {
    let dupNum = count.length;
    itemURL = itemURL + dupNum;
    }

  const response = await fetch("/items/new", {
      method: 'POST',
      body: JSON.stringify({
        itemTitle: title,
        itemDescription: description,
        itemImage: image,
        itemCategory: category,
        itemURL: itemURL
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      toastr.success('Item added!');
      document.location.replace('/dashboard');
    
    } else {
      toastr.error('Failed to create item');
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

document.querySelector('#createItem').addEventListener('click', createItem);
