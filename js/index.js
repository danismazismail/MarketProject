function loadCategories() {
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }

  fetch("https://localhost:7294/api/Categories/GetCategories")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      var table = document.getElementById("categories");

      table.innerHTML = "";

      data.forEach((category) => {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");
        var td8 = document.createElement("td");

        td1.appendChild(document.createTextNode(category.id));
        td2.appendChild(document.createTextNode(category.name));
        td3.appendChild(document.createTextNode(category.description));
        td4.appendChild(
          document.createTextNode(
            new Date(category.createdDate).toLocaleString("tr-TR")
          )
        );
        td5.appendChild(
          document.createTextNode(
            category.updatedDate != null
              ? new Date(category.updatedDate).toLocaleString("tr-TR")
              : "-"
          )
        );
        td6.appendChild(
          document.createTextNode(
            category.status == 1 ? "Aktif" : "Güncellenmiş"
          )
        );

        var buttonUpdate = document.createElement("a");
        buttonUpdate.id = "updateBtn" + category.id;
        buttonUpdate.classList.add("btn");
        buttonUpdate.classList.add("btn-primary");
        buttonUpdate.href = "UpdateCategory.html?id=" + category.id;
        buttonUpdate.appendChild(document.createTextNode("Update"));
        td7.appendChild(buttonUpdate);

        var buttonDelete = document.createElement("a");
        buttonDelete.id = "deleteBtn" + category.id;
        buttonDelete.classList.add("btn");
        buttonDelete.classList.add("btn-danger");
        buttonDelete.addEventListener("click", function () {
          deleteCategory(category.id);
        });
        buttonDelete.appendChild(document.createTextNode("Delete"));
        td8.appendChild(buttonDelete);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);

        table.appendChild(tr);
      });
    });
}

function createCategory() {
  let form = document.getElementById("form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      // console.log(Array.from(data));

      fetch("https://localhost:7294/api/Categories/CreateCategory", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          console.log(response);
        })
        .then((window.location.href = "index.html"))
        .catch((error) => {
          console.error(error);
        });
    });
  }
}

function updateCategoryGet() {
  var queryString = decodeURIComponent(window.location.search);
  // console.log(queryString.substring(4));

  var categoryID = queryString.substring(4);

  fetch(
    "https://localhost:7294/api/Categories/GetCategoryById?Id=" + categoryID
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      document.getElementById("id").value = data.id;
      document.getElementById("name").value = data.name;
      document.getElementById("description").value = data.description;
    });
}

function updateCategoryPost(event) {
  event.preventDefault();
  let form = document.getElementById("updateCategoryForm");
  const data = new FormData(form);

  fetch("https://localhost:7294/api/Categories/UpdateCategory", {
    method: "PUT",
    body: data,
  })
    .then((res) => console.log(res))
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => console.log(error));
}

function deleteCategory(id) {
  var result = confirm("Silmek istediğinize eminmisiniz");
  if (result) {
    fetch("https://localhost:7294/api/Categories/DeleteCategory?id=" + id, {
      method: "DELETE",
    })
      .then(() => {
        loadCategories();
      })
      .catch((error) => console.log(error));
  }
}
