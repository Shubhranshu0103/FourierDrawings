function extractImage(path, skip = 1) {
  var processing = new Processing();

  var maps = processing.loadShape(path);
  //console.log(maps);

  let res = [];
  let arr = [];

  let strk = [];
  let i = 0;
  let j = 0;
  for (let map of maps.children) {
    //fetch the border shape - peaked at the path name using Illustrator
    //border = map.children[0].children[1];
    border = map;
    //border = map.getChild("IN-MP");
    //console.log(border);



    for (i = 0; i < border.vertices.length; i += skip) {
      arr.push({ x: border.vertices[i][0], y: border.vertices[i][1] });
      //console.log("arr["+i+"] :"+arr[i].penUp);
      if (border.vertices[i].moveTo)
        strk.push(i + j);
    }
    j = i;
    //res.push({ arr, strk });
  }



  return { arr, strk };
}

//function extractShape(map)