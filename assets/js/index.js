$("#add_user").submit(function (e) {
  alert("Data Inserted Successfully");
});

$("#update_user").submit(function (e) {
  event.preventDefault();

  var unIndexed_array = $(this).serializeArray();
  var data = {};

  $.map(unIndexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var req = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(req).done(function (res) {
    alert("Data Updated Successfully");
  });
});

if (window.location.pathname == "/") {
  $onDelete = $(".table tbody td a.delete");
  $onDelete.click(function () {
    var id = $(this).attr("data-id");

    var req = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Are you sure?")) {
      $.ajax(req).done(function (res) {
        alert("Data Deleted Successfully");
        location.reload;
      });
    }
  });
}
