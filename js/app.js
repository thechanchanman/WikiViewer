
function checkSize(){
  if ($("#searchInput").css("margin-right") == "4px" ){

		$(".active .logo h1").html('W<span>V</span>');
  } else {
		$(".active .logo h1").html('Wiki<span>Viewer</span>');
	}
}

$(document).ready(function(){

	var urlRandom = "https://en.wikipedia.org/wiki/Special:Random";

	$("form").submit(function(e){
		e.preventDefault();
		var $searchTerm = $("#searchInput").val();



		if($searchTerm.match(/^[0-9a-zA-Z\s]{1,64}$/) && $("#searchInput").val() != ""){
    	//The id is fine
			var urlRequest = "https://en.wikipedia.org";
			urlRequest += "/w/api.php?action=opensearch&format=json&search="
			urlRequest += $searchTerm
			urlRequest += "&namespace=0&limit=20";

			$("body").addClass("active");
			checkSize();
			$("header").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
				function(e) {

				// code to execute after animation ends
				$(".content").css("display", "block");
				});

			$.ajax({
				dataType: "json",
				url: urlRequest + '&callback=?',
				success: function (data) {
					// console.log(data);
					var results = "You've searched for " + '<span class="searchTerm">' + $searchTerm + '</span>';
					var numberOfResults = data[1].length;
					// var hasResult = true;

					results += '<ul>';
					if (numberOfResults > 0) {
						$.each(data[1], function(i, val) {
							results += '<li>';
							results += '<h3 class="pageTitle">';
							results += '<a href="' + data[3][i] + '" target="_blank">';
							results += val;
							results += '</a>';
							results += '</h3>';
							results += '<p class="pageUrl">';
							results += '<span class="fa-stack fa-lg">';
							results += '<i class="fa fa-circle fa-stack-2x"></i>';
							results += '<i class="fa fa-stack-1x fa-inverse fa-wikipedia-w"></i>';
							results += '</span> '
							results += data[3][i];
							results += '</p>';
							results += '<p class="pageDesc">';
							results += data[2][i];
							results += '</p>';
							results += '</li>';
						});
					} else {
						results += '<li>';
						results += '<p class="noResults">';
						results += "No page was found";
						results += '</p>';
						results += '</li>';
					}

					results += '</ul>';
					$(".content").html(results);
				}
			});
		}
		else {
			$("#searchInput").addClass("shake");
			$("#searchInput").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
		    function(e) {
					$("#searchInput").removeClass("shake");
				});
		}
		 // end of else (checking of input)
	}); // end of form.submit

	$("#btnRandom").click(function(){
		window.open(urlRandom, '_blank');
	});

	// run test on initial page load
	checkSize();
	// run test on resize of the window
	$(window).resize(checkSize);


	$('#btnSearch, #btnRandom').tipso({
		position : 'bottom',
		delay : 600,
		background : '#d23e69'
	});
	// #d23e69
	// #3ed26a

	$(window).on("scroll", function(){
		$("header").addClass("shadow");
		if ($("header").offset().top === 0) {
			$("header").removeClass("shadow");
		}
	});


	$(".logo").click(function(){
		$(".content").html("");
		$("#searchInput").val("");
		$("body").removeClass("active");
	});

}); // end of document.ready
