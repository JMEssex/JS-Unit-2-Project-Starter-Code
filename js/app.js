/*
  Please add all Javascript code to this file.
*/

function sourceChange(source){
  $("#source").html(source);
}

function mashGet(){
  //  Originally i put the $("#main").empty at the end of my code, and only 1 artical was coming up. I speculated after a while that the data was loading async and would delete the first 9 articals.
  $("#main").empty();
  sourceChange("Mashable");
  $.get("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json", function(results){
    results.new.forEach(function(newItem){
      // comment here
      var $title = newItem.title;
      var $image = newItem.responsive_images[0].image;
      var $channel = newItem.channel;
      var $shares = newItem.shares.total;
      var $link = newItem.link;

      //comment here var sting
      // I have to use single quotes because the double quotes are what i am using to point to the html content string.
      var $contentSting =
          '<article class="article"> <section class="featuredImage"> <img src="'+$image+'" alt="" /> </section>';
          // adding the strings together.
          $contentSting += '<section class="articleContent"><a href="'+$link+'"><h3>'+$title+'</h3></a><h6>'+$channel+'</h6></section>';
          // adding the impressions section.  I am adding this as multi strings for readability.
          $contentSting += '<section class="impressions">'+$shares+'</section><div class= "clearfix"></div></article>';

      // I am using empty to clear the div prior to selecting the source.

      $("#main").append($contentSting);
    })
  })
}

function reddGet(){
  $("#main").empty();
  sourceChange("Reddit");
  $.get("https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/top.json", function(results){
    results.data.children.forEach(function(newItem){

      var $title = newItem.data.title;
      // arrays in arrays.  At first my code was resulting in an error, which I discovered that posts without images did not show up. This bit of code was probably the most difficult issue to figure out.  After research, I found a reference to the "Guard Pattern" on Stack Overflow.  Here this code is checking to see if the object even exists and if the error is resulting.  First I wanted to see if preview is even defined, and if it is then we check if the image is even defined.  We are guarding against going into an object further than needed should any of the children paths not exist.
      if (newItem.data.preview && newItem.data.preview.images[0].resolutions[1].url != 'undefined'){
        var $image = newItem.data.preview.images[0].resolutions[1].url;
      } else {
        var $image = "https://assets.ifttt.com/images/channels/1352860597/icons/on_color_large.png";
      }
      var $channel = newItem.data.subreddit;
      var $shares = newItem.data.score;
      var $link = newItem.data.url;



      var $contentSting =
          '<article class="article"> <section class="featuredImage"> <img src="'+$image+'" alt="" /> </section>';

          $contentSting += '<section class="articleContent"><a href="'+$link+'"><h3>'+$title+'</h3></a><h6>'+$channel+'</h6></section>';

          $contentSting += '<section class="impressions">'+$shares+'</section><div class= "clearfix"></div></article>';


      $("#main").append($contentSting);
    })
  })
}

function diggGet(){
  $("#main").empty();
  sourceChange("Digg");
  $.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json", function(results){
    results.data.feed.forEach(function(newItem){

      var $title = newItem.content.title_alt;
      var $image = newItem.content.media.images[3].url;
      var $channel = ""
      var $shares = newItem.digg_score;
      var $link = newItem.content.url;

      // this was a little bit more difficult to figure out. Digg's API had multiple tags and I had to add an additional forEach loop that created a string with all the tags in it.
      newItem.content.tags.forEach(function(tag){
        $channel += tag.display+" ";
      })

      var $contentSting =
          '<article class="article"> <section class="featuredImage"> <img src="'+$image+'" alt="" /> </section>';

          $contentSting += '<section class="articleContent"><a href="'+$link+'"><h3>'+$title+'</h3></a><h6>'+$channel+'</h6></section>';

          $contentSting += '<section class="impressions">'+$shares+'</section><div class= "clearfix"></div></article>';

      $("#main").append($contentSting);
    })
  })
}
