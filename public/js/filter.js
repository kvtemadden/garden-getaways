const filterJobs = async (category_url) => {
      document.location.replace(`/dashboard/${category_url}`); 
};

var id = window.location.href.toString().split('dashboard/')[1];

debugger;
if (id) {
  document.querySelector('#filter-jobs').value = id;
}
else {
  document.querySelector('#filter-jobs').value = "0";
}