
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function addBookmark ()
{
  const siteName = document.getElementById('siteName').value.trim();
  const siteURL = document.getElementById('siteUrl').value.trim();
  if (!siteName || !siteURL) {
        showMsg("Please enter both name and URL","red");
        return;
      }
  let isDuplicate = false;
  bookmarks.forEach((b)=>
  {
    if(b.name ===siteName || b.url ===siteURL)
    {
      isDuplicate=true;
    }
  })

  if(isDuplicate)
  {
    showMsg("Bookmark Already Added!!","orange");
    return;
  }
  bookmarks.push({name:siteName,url:siteURL});
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  showMsg("Bookmark Successfully Added","green");
  showBookmarks();
   document.getElementById("siteName").value = "";
  document.getElementById("siteUrl").value = "";

}

function showMsg(message,colorr)
{
  const errorMsg = document.getElementById('toast');
  errorMsg.innerHTML=message;
  errorMsg.style.backgroundColor=colorr;
  errorMsg.style.opacity = "1";
  setTimeout(()=>
  {
    errorMsg.style.opacity="0";
  },1000)
}

function deleteBookmark() {
  deleteMode = true; 
  showBookmarks();
  showMsg("Click on a bookmark to delete it", "orange");
   const listItems = document.querySelectorAll("#bookmarkList li a");
   listItems.forEach((item,index)=>{
    item.style.cursor="pointer";
    item.onclick=function(e){
      e.preventDefault();
      bookmarks.splice(index,1);
       localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
       showMsg("Bookmark deleted!", "yellow");
       showBookmarks();}
    });
   }


function showBookmarks()
{
  const sidebar = document.getElementById("sidebar");
  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-300px";
  } else {
    sidebar.style.right = "0px";
  }

  const list =document.getElementById("bookmarkList");
  list.innerHTML="";
  bookmarks.forEach((item,index)=> {
    const li = document.createElement("li");
    const a = document.createElement("a");
     a.href = item.url;
    a.target = "_blank";
    a.innerText = item.name;
    li.appendChild(a);
    list.append(li);
  });

}
