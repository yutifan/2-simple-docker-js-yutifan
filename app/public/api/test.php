<?php

//http://localhost:8080/api/test.php

$num = 2;
$foo = $num . " be";
$bar = "or not" .$num ."be.";

echo $foo . " ". $bar;

echo "\n"; //the browser would collapse all extra spaces 

echo $num *$num *$num;

$arr = [1,1,2,3,5,8];

$arr2 = [
    "first " => " Tom",
    "second " => " Bipin",
    "best " => " DS"
];

if (true){
    echo "TRUE \n";
} else {
    echo "FALSE \n";
}

while (true) {
    break;
}

foreach ($arr2 as $key => $val){
    echo "<li>".$key."is".$val."</li>\n";
} //it's a poor way to do this 
echo "</ul>";

// $arr as json
echo json_encode(
    $arr,
    JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR
); // it's okay to add () around json_encode 
echo json_encode(
    $arr2,
    JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR
);

//or in a longer version
$str = json_encode($arr);
echo $str;

//this a comment 
# this is also a comment 
/* this 
is a 
multi-line
comments */

/***
 * *variable naming 
 * 
 * PHP and JS: camelCase
 * Constants: UPPER_SNAKE_CASE
 * 
 * snake_case
 * PascalCase (we'll use for class names)
 * kebab-case
 */
