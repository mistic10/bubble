<?php
$assets = json_decode(file_get_contents('assets/manifest/assets.json'));

foreach($assets as $key => $val){
    $val->size = filesize($val->url);
}

$jAssets = json_encode($assets);

$jAssets = str_replace("{", "{\n\t", $jAssets);

$jAssets = str_replace(":{\n\t", ":{\n\t\t", $jAssets);

$jAssets = str_replace(",", ",\n\t\t", $jAssets);

$jAssets = str_replace("},\n\t\t", "\n\t},\n\t", $jAssets);

$jAssets = str_replace("}}", "\n\t}\n}", $jAssets);

//var_dump($jAssets);

var_dump(file_put_contents('assets/manifest/assets.json', $jAssets) != false);
?>