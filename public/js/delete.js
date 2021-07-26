const runDelete = async (event) => {
  event.preventDefault();
  debugger;
  var deleteType = document.querySelector("[data-delete]").getAttribute("id");
  var deleteURL = document.querySelector("[data-delete]").getAttribute("data-url");

  switch(deleteType) {
    case "/categories/":
      var id = "/categories/" + deleteURL;
      break;
    case "/items/":
      var id = "/items/" + deleteURL;
      break;
    default:
    break;
  }


    const response = await fetch(id, {
      method: 'DELETE',
      body: JSON.stringify({
        category_url: deleteURL,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      toastr.success('Successfully deleted!');
      document.location.replace('/dashboard');
    
    } else {
      toastr.error('Failed to delete');
    }
};


document.querySelector('#delete').addEventListener('click', runDelete);
