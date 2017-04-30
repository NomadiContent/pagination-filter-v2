let countCreate = 1;
let newTag = "";
let divCount = 0;
let pageNumber;
let searchCount = 0;
let restoreCount = 0;

//create the intial page view with 10 students
function createPage () {
	$("ul li").each(function(index) {
		obj = $(this)
		divCount += 1
			if (divCount < 10) {
				obj.show()
			} else {
				obj.hide()
			}
			if (index % 10 === 0) {
				newTag += "<li id=\"page\"><a href=\"#\">" + countCreate + "</a></li>"
				countCreate++;
			}
	});
	if (newTag !== null) {
		$("ul").append("<nav aria-label=\"Page navigation\"><ul class=\"pagination\">" + newTag + "</ul></nav>");
	}

}

//update page to match page number selected
function updatePage() {
	let countUpdate = 0;
	$("ul li").each(function(index) {
		if (index % 10 === 0) {
			countUpdate++;
		}
		if (countUpdate === pageNumber) {
			$(this).show();
		} else if ($(this).attr("id") !== "page"){
			$(this).hide();
		}

	})

}

//restore the first page if the search bar has no characters in it
function restorePage(item)	{			
	if(item.length === 0) {
		$(".student-item").each(function(index) {
			obj = $(this)
			restoreCount += 1
			if (restoreCount > 10) {
				obj.hide()
			}
		});
	}
	restoreCount = 0;
}

//search each student element and return if text matches
function searchBar() {
	$(".page-header").append("<div class=\"searchBar\"><input type=\"text\" id=\"myInput\" placeholder=\"Search for names..\"></div>");
	$("#myInput").keyup(function () {
	    let filter = $(this).val();
		    $(".student-item").each(function () {
		        if ($(this).text().search(new RegExp(filter, "i")) < 0 && $(this).attr("id") !== "page") {
		            $(this).hide();
		        } else {
		        	$(".null").remove();
		            $(this).show()
		        }
		    });
		     	if($('.student-item').children(':visible').length < 1 && $('.null').length === 0)	 {	
		   			$(".student-list").prepend("<h1 class=\"null\">no matches</h1>");
				} 

				//if input box has no input, recreate first page with 10 elements
				restorePage(filter);
	});

}

//call create page when document is ready
$(document).ready(createPage());

//when a link is cricked update the page so that elements present reflext selection
$("li a").on( "click", function() {
	pageNumber = parseInt($(this).text(),10);
	updatePage();
});

//call the searchbar
searchBar();

